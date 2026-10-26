# AWDF_P9

## Practical 10 — Event-driven background notifications

The backend now uses Node.js's built-in `EventEmitter` (no new package required).

### Files added
- `backend/events.js` — shared event emitter.
- `backend/listeners.js` — listeners for `task-created`, `task-deleted`, and `error`.

The server loads `listeners.js` once at startup. Creating a task returns HTTP `201` and then emits `task-created`. The listener uses `setTimeout` to simulate a two-second notification delay. Because the delay is asynchronous, the route does not wait for notification completion.

### Test
1. Configure your local `backend/.env` with `MONGODB_URI` and `JWT_SECRET` (the original `.env` is intentionally not included in this archive).
2. In a terminal, run `cd backend && npm install && npm run dev`.
3. Sign in using your existing auth endpoint and copy the JWT.
4. In Postman, send `POST http://localhost:5000/tasks` with `Authorization: Bearer <token>`, `Content-Type: application/json`, and a JSON body such as:
   ```json
   { "title": "Practical 10 test", "description": "Check event processing", "completed": false }
   ```
5. Check the terminal: the `[API] Sending 201 response` timestamp should appear before `[Notification] Handler finished`, roughly two seconds later.
6. Delete a task using `DELETE /tasks/:id` to verify the `task-deleted` listener.

### Viva notes
- `emit()` invokes registered listeners synchronously; it does not automatically make listener code asynchronous.
- `setTimeout` schedules the slow part for later, letting the route finish without waiting two seconds.
- Slow synchronous CPU work inside a listener would still block Node.js's event loop.
- An in-process EventEmitter is simple for a small app, but events are not durable: they are lost if the process stops, and there is no built-in retry, persistence, or cross-process distribution. Large production workloads usually need a message broker/queue and worker processes.
