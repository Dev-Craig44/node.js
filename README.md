## Handling Errors

- Send a friendly error
- Log the exception

By default is there is no connection MongoDB will try to reconnect 30 times with 1 second intervals.

With our current implementation if MongoDB shuts down for more than 30secs it will not fire back up.

## Express Error Middleware

The problem w/ our implementation is that if we wanted to change the implementation/error message later, we would have to change it in several different places.
