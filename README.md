# DDD & Clean Architecture Study

**Brief Description**: A study project applying Domain-Driven Design (DDD) and Clean Architecture to model a [describe the domain, e.g., "customer support chat system"].

## 📌 Domain-Driven Design (DDD)

### Core Domain
- **Chat**: Communication system between customers, attendants, and suppliers.

### Ubiquitous Language
- **User**: Base entity for all system participants.
  - **Customer**: User requesting support via chat.
  - **Supplier**: User providing technical/product support.
  - **Attendant**: User mediating communication between Customer and Supplier.

### Domain Structure
| Concept           | Description                                                                 | Domain Example                     |
|-------------------|-----------------------------------------------------------------------------|------------------------------------|
| **Aggregates**    | Consistency boundaries with root entities                                   | `Order` (root) → `OrderItem[]`     |
| **Entities**      | Objects with unique identity and business logic                            | `User`, `ChatSession`              |
| **Value Objects** | Immutable objects defined by attributes                                     | `Address`, `PaymentDetails`        |
| **Domain Events** | Events representing meaningful business occurrences                       | `ChatStarted`, `OrderCompleted`    |
| **Repositories**  | Interfaces for persistent storage abstraction                              | `IUserRepository`, `IChatRepository` |
| **Services**      | Stateless operations that don’t fit in entities/VOs                        | `ChatNotificationService`          |

### Bounded Contexts (Subdomains)
| Type          | Description                                  | Examples                          |
|---------------|----------------------------------------------|-----------------------------------|
| **Core**      | Critical business differentiators           | Chat, Order Processing           |
| **Supporting**| Auxiliary but necessary functionalities     | User Management, Analytics        |
| **Generic**   | Common solutions with no competitive edge   | Logging, Email Notifications      |

---

## 🏗️ Clean Architecture

### Principles
- **Decoupling**: Layers depend on abstractions, not implementations.
- **Dependency Rule**: Inner layers (Domain) have no knowledge of outer layers (Infra/UI).
- **Testability**: Business logic is isolated from frameworks/databases.

### Layers
1. **Domain Layer**  
   - Entities, Aggregates, Value Objects, Domain Services.  
   - Pure business logic, no external dependencies.

2. **Application Layer**  
   - Use Cases, DTOs, Command/Query handlers.  
   - Orchestrates domain objects (thin layer).

3. **Infrastructure Layer**  
   - Implements interfaces from inner layers (e.g., databases, APIs).  
   - Example: `EFCoreUserRepository` → `IUserRepository`.

4. **Presentation Layer**  
   - UI/API endpoints (e.g., REST controllers, WebSocket handlers).  

---

## 🛠️ Key Concepts & Patterns

### Aggregates
- **Example**:  
  ```plaintext
  Order (Aggregate Root)
  ├── OrderItems (Value Objects)
  └── Shipping (Entity)
  ```
- **Invariants**: Rules enforced by the root (e.g., "Order must have ≥1 item").

### WatchedList Pattern
- Tracks changes to collections (add/remove/update) for transactional updates.  
- **Use Case**:  
  ```csharp
  // Editing a Question with Attachments
  question.UpdateAttachments(new[] { "file1.pdf" }, deleted: ["file2.pdf"]);
  ```

---

## 📂 Project Structure (Example)
```
src/
├── Domain/               # Core business logic
│   ├── Users/            # Bounded Context
│   │   ├── Entities/
│   │   ├── Aggregates/
│   │   └── Services/
│   └── Chat/             # Bounded Context
│       ├── Events/
│       └── ValueObjects/
├── Application/          # Use Cases & DTOs
├── Infrastructure/       # DB, External Services
└── Presentation/         # API/UI
```

---

## 🎯 Use Cases
1. **Start a Chat Session**  
   - Actors: Customer, Attendant.  
   - Flow: `ChatSession.Create()` → `ChatStartedEvent` → `NotifySupplier()`.  

2. **Edit Question with Attachments**  
   - Complexity: Handle concurrent attachment updates via `WatchedList`.

---

## 🔗 Dependencies
- **Domain**: Zero external dependencies.  
- **Application**: Depends only on `Domain`.  
- **Infrastructure**: Depends on `Application`/`Domain` (implements their interfaces).  

---

## 📚 Further Reading
- [Domain-Driven Design by Eric Evans](https://dddcommunity.org/book/evans_2003/)  
- [Clean Architecture by Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)  
