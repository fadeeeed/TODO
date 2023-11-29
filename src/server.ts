import App from '@/app';
import { ToDoRoute } from '@routes/todo.route';

const app = new App([new ToDoRoute()]);

app.listen();

export default app; // exporting for test cases
