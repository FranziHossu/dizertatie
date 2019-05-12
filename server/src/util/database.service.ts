import { Connection, Document } from 'mongoose';
import { Observable, BehaviorSubject } from 'rxjs';

class DatabaseService {
	private connection:Connection;
	private connectionSubject:BehaviorSubject<Connection> = new BehaviorSubject<Connection>(null);

	public connectionObservable:Observable<Connection> = this.connectionSubject.asObservable();

	/**
	 * Set the database connection and initiate the managers.
	 */
	public setConnection(connection:Connection) {
		this.connection = connection;
		this.connectionSubject.next(connection);
	}
}

export const databaseService:DatabaseService = new DatabaseService();