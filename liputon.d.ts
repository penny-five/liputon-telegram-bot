interface EventResponse {
  event: Event;
  tickets: Ticket[];
  child_events: ChildEvent[];
}

interface ChildEvent {
  event: Event;
  tickets: Ticket[];
}

interface Event {
  age_info: null;
  age_info_en: null;
  cheapest_ticket: number | null;
  commission_rate_organizer: number;
  created_at: Date;
  description: null | string;
  description_en: null | string;
  end_date: Date;
  end_sale_date: Date;
  id: number;
  image: string;
  is_public: number;
  last_sales_date: Date;
  link: string;
  link_en: string;
  location_id: number;
  name: NameEnEnum;
  name_en: NameEnEnum;
  organizer_id: number;
  parent_child_type: ParentChildType;
  parent_id: number | null;
  section_map_id: null;
  slug: Slug;
  slug_en: null;
  start_date: Date;
  start_date_exact: Date;
  status: EventStatus;
  subevent_name: string;
  subevent_name_en: string;
  ticket_amount: number;
  time_info: string;
  time_info_en: string;
  updated_at: Date;
  views: number;
  location?: Location;
  categories?: Category[];
  genres?: Category[];
}

interface Category {
  id: number;
  name: string;
  name_en: string;
  tiketti_tag_id: number;
}

interface Location {
  address: Address;
  city: City;
  country: Country;
  id: number;
  name: LocationName;
}

enum Address {
  Kaasutehtaankatu1 = "Kaasutehtaankatu 1",
}

enum City {
  Helsinki = "Helsinki",
}

enum Country {
  Finland = "Finland",
}

enum LocationName {
  Suvilahti = "Suvilahti",
}

enum NameEnEnum {
  FlowFestival2026 = "Flow Festival 2026",
}

enum ParentChildType {
  Child = "CHILD",
  Parent = "PARENT",
}

enum Slug {
  FlowFestival2026 = "flow-festival-2026",
}

enum EventStatus {
  OnSale = "ON_SALE",
  SoldOut = "SOLD_OUT",
}

interface Ticket {
  address_ticket: number;
  batch_id: string;
  boundary: number;
  category_id: number | null;
  commission_vat_rate: null;
  created_at: Date;
  deleted_at: null;
  email_ticket: number;
  event_id: number;
  id: number;
  last_sales_time: Date;
  last_sell_date: Date;
  name: string;
  named_ticket: number;
  old_id: null;
  order_locked: number;
  organization_sepa_status: SepaStatus;
  original_price: number;
  pdf_name: null;
  phone_ticket: number;
  price: number;
  pricing_policy: number;
  row_name: string;
  sale_start_date: Date;
  seat_name: string;
  section_id: number;
  seller_id: number;
  sepa_status: SepaStatus;
  sold_at: null;
  status: TicketStatus;
  updated_at: Date | null;
  category: Section | null;
  section: Section;
  event: Event;
  batch: Batch;
}

interface Batch {
  batch_size: number;
  created_at: Date;
  id: string;
  private_token: null;
  seller_id: number;
  single_sell: number;
  updated_at: null;
  visibility: Visibility;
}

enum Visibility {
  Public = "PUBLIC",
}

interface Section {
  id: number;
  name: string | null;
}

enum SepaStatus {
  NotSepaed = "NOT_SEPAED",
}

enum TicketStatus {
  ForSale = "FOR_SALE",
}
