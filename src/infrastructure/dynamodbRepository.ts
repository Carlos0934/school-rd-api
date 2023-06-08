import { DynamoDBDocumentClient, GetCommand, PutCommand } from 'dynamodb'
import { DynamoDBClient } from 'dynamodb-client'
import { Key, KvRepository } from '../types.ts'

export class DynamoDbRepository<T extends Record<string, unknown>>
	implements KvRepository<T>
{
	private readonly client: DynamoDBDocumentClient

	constructor(private readonly tableName: string) {
		const client = new DynamoDBClient({
			region: Deno.env.get('AWS_REGION')!,
			credentials: {
				accessKeyId: Deno.env.get('AWS_ACCESS_KEY_ID')!,
				secretAccessKey: Deno.env.get('AWS_SECRET_ACCESS_KEY')!,
			},
		})
		this.client = DynamoDBDocumentClient.from(client)
	}
	async get(key: Key): Promise<T | undefined> {
		const isPrimitiveKey = typeof key === 'string' || typeof key === 'number'
		const command = new GetCommand({
			TableName: this.tableName,
			Key: isPrimitiveKey ? { id: key } : key,
		})

		const { Item } = await this.client.send(command)

		const data = Item as T | undefined

		return data
	}

	async set(key: Key, value: T): Promise<void> {
		const isPrimitiveKey = typeof key === 'string' || typeof key === 'number'

		const command = new PutCommand({
			TableName: this.tableName,
			Item: isPrimitiveKey ? { id: key, ...value } : { ...key, ...value },
		})

		await this.client.send(command)
	}
}
