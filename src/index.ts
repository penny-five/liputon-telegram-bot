import * as axios from "axios";
import { htmlEscape } from "escape-goat";
import { Bot } from "grammy";
import pino from "pino";

export interface Env {
  // Persistent state for this CF worker
  LIPUTON_CF_WORKER_STATE: KVNamespace;
  LIPUTON_EVENT_ID: string;
  TELEGRAM_BOT_TOKEN: string;
  TELEGRAM_USER_ID: string;
}

const logger = pino({
  level: "debug",
});

export default {
  async scheduled(_controller, env): Promise<void> {
    const kv = env.LIPUTON_CF_WORKER_STATE;
    const telegramUserID = parseInt(env.TELEGRAM_USER_ID, 10);
    const telegramToken = env.TELEGRAM_BOT_TOKEN;
    const eventID = env.LIPUTON_EVENT_ID;
    const lastProcessedTicketID = parseInt(
      (await kv.get("LAST_PROCESSED_TICKET_ID")) || "",
      10,
    );
    const isFirstRun = Number.isInteger(lastProcessedTicketID);

    const httpClient = axios.create({
      baseURL: "https://api.liputon.fi/v1",
    });

    const httpResponse = await httpClient.get<EventResponse>(
      `events/${eventID}`,
    );

    const tickets = httpResponse.data.tickets;

    let unprocessedTickets = tickets
      // Dismiss tickets that have already been notified of
      .filter((ticket) => {
        return isFirstRun ? true : ticket.id > lastProcessedTicketID;
      })
      .filter((ticket) => ticket.status === TicketStatus.ForSale)
      .map((ticket) => ({
        id: ticket.id,
        created_at: ticket.created_at,
        updated_at: ticket.updated_at,
        name: ticket.name,
        status: ticket.status,
        price: Intl.NumberFormat("en-EN", {
          style: "currency",
          currency: "EUR",
        }).format(ticket.price / 100),
      }))
      // newest first
      .toSorted((first, second) => first.id - second.id);

    if (unprocessedTickets.length > 0) {
      if (isFirstRun) {
        // If this is the first time running the cron job,
        // notify only of the latest added ticket to avoid spamming
        unprocessedTickets = unprocessedTickets.slice(-1);
      }

      const bot = new Bot(telegramToken);

      for (const ticket of unprocessedTickets) {
        await bot.api.sendMessage(
          telegramUserID,
          [
            "<b>New ticket added to liputon.fi:</b>",
            htmlEscape(ticket.name),
            `Price: <b>${htmlEscape(ticket.price)}</b>`,
          ].join("\n"),
          {
            parse_mode: "HTML",
          },
        );

        logger.info(ticket, "Notified of");
      }

      await kv.put(
        "LAST_PROCESSED_TICKET_ID",
        `${Math.max(...unprocessedTickets.map((ticket) => ticket.id))}`,
      );
    }
  },
} satisfies ExportedHandler<Env>;
