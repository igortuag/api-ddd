DDD (Domain-driven Design)

## Domain

- Domain Experts
  - Chat
- Ubiquitous language

- User
  - Customer
  - Supplier
  - Attendant

- Aggregates
- Object Value
- Domain Event
- Subdomain (Bounded Contexts)
- Entities
- Use Cases

## Clean Architecture 

- Decoupling
- Dependency inversion

# Concepts

- Aggregate
- WatchedList

## Examples

- Oder -> OrderItem[]
- Order -> Shipping

- Question -> Attachment[] (Aggregate)

### Create

- Title
- Content
- Attachment

### Edit

- Title and content is simple (just updated)
- Attachment is complex: (delete, add, update)

## Subdomain

- Core: what the business is pay for
- Supporting: support the core domains
- Generic

### Examples

#### Core
- Purchase
- Catalogue
- Payment
- Delivery

#### Supporting
- Stock