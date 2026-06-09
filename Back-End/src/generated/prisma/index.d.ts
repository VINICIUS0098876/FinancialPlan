
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model checklist_items
 * 
 */
export type checklist_items = $Result.DefaultSelection<Prisma.$checklist_itemsPayload>
/**
 * Model exchange_goals
 * 
 */
export type exchange_goals = $Result.DefaultSelection<Prisma.$exchange_goalsPayload>
/**
 * Model transactions
 * 
 */
export type transactions = $Result.DefaultSelection<Prisma.$transactionsPayload>
/**
 * Model users
 * 
 */
export type users = $Result.DefaultSelection<Prisma.$usersPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const checklist_items_status: {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED'
};

export type checklist_items_status = (typeof checklist_items_status)[keyof typeof checklist_items_status]


export const transactions_platform: {
  WISE: 'WISE',
  NOMAD: 'NOMAD',
  CASH: 'CASH',
  OTHER: 'OTHER'
};

export type transactions_platform = (typeof transactions_platform)[keyof typeof transactions_platform]

}

export type checklist_items_status = $Enums.checklist_items_status

export const checklist_items_status: typeof $Enums.checklist_items_status

export type transactions_platform = $Enums.transactions_platform

export const transactions_platform: typeof $Enums.transactions_platform

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Checklist_items
 * const checklist_items = await prisma.checklist_items.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Checklist_items
   * const checklist_items = await prisma.checklist_items.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.checklist_items`: Exposes CRUD operations for the **checklist_items** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Checklist_items
    * const checklist_items = await prisma.checklist_items.findMany()
    * ```
    */
  get checklist_items(): Prisma.checklist_itemsDelegate<ExtArgs>;

  /**
   * `prisma.exchange_goals`: Exposes CRUD operations for the **exchange_goals** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Exchange_goals
    * const exchange_goals = await prisma.exchange_goals.findMany()
    * ```
    */
  get exchange_goals(): Prisma.exchange_goalsDelegate<ExtArgs>;

  /**
   * `prisma.transactions`: Exposes CRUD operations for the **transactions** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Transactions
    * const transactions = await prisma.transactions.findMany()
    * ```
    */
  get transactions(): Prisma.transactionsDelegate<ExtArgs>;

  /**
   * `prisma.users`: Exposes CRUD operations for the **users** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.users.findMany()
    * ```
    */
  get users(): Prisma.usersDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    checklist_items: 'checklist_items',
    exchange_goals: 'exchange_goals',
    transactions: 'transactions',
    users: 'users'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "checklist_items" | "exchange_goals" | "transactions" | "users"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      checklist_items: {
        payload: Prisma.$checklist_itemsPayload<ExtArgs>
        fields: Prisma.checklist_itemsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.checklist_itemsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$checklist_itemsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.checklist_itemsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$checklist_itemsPayload>
          }
          findFirst: {
            args: Prisma.checklist_itemsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$checklist_itemsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.checklist_itemsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$checklist_itemsPayload>
          }
          findMany: {
            args: Prisma.checklist_itemsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$checklist_itemsPayload>[]
          }
          create: {
            args: Prisma.checklist_itemsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$checklist_itemsPayload>
          }
          createMany: {
            args: Prisma.checklist_itemsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.checklist_itemsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$checklist_itemsPayload>
          }
          update: {
            args: Prisma.checklist_itemsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$checklist_itemsPayload>
          }
          deleteMany: {
            args: Prisma.checklist_itemsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.checklist_itemsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.checklist_itemsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$checklist_itemsPayload>
          }
          aggregate: {
            args: Prisma.Checklist_itemsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChecklist_items>
          }
          groupBy: {
            args: Prisma.checklist_itemsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Checklist_itemsGroupByOutputType>[]
          }
          count: {
            args: Prisma.checklist_itemsCountArgs<ExtArgs>
            result: $Utils.Optional<Checklist_itemsCountAggregateOutputType> | number
          }
        }
      }
      exchange_goals: {
        payload: Prisma.$exchange_goalsPayload<ExtArgs>
        fields: Prisma.exchange_goalsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.exchange_goalsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$exchange_goalsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.exchange_goalsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$exchange_goalsPayload>
          }
          findFirst: {
            args: Prisma.exchange_goalsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$exchange_goalsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.exchange_goalsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$exchange_goalsPayload>
          }
          findMany: {
            args: Prisma.exchange_goalsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$exchange_goalsPayload>[]
          }
          create: {
            args: Prisma.exchange_goalsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$exchange_goalsPayload>
          }
          createMany: {
            args: Prisma.exchange_goalsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.exchange_goalsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$exchange_goalsPayload>
          }
          update: {
            args: Prisma.exchange_goalsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$exchange_goalsPayload>
          }
          deleteMany: {
            args: Prisma.exchange_goalsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.exchange_goalsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.exchange_goalsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$exchange_goalsPayload>
          }
          aggregate: {
            args: Prisma.Exchange_goalsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExchange_goals>
          }
          groupBy: {
            args: Prisma.exchange_goalsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Exchange_goalsGroupByOutputType>[]
          }
          count: {
            args: Prisma.exchange_goalsCountArgs<ExtArgs>
            result: $Utils.Optional<Exchange_goalsCountAggregateOutputType> | number
          }
        }
      }
      transactions: {
        payload: Prisma.$transactionsPayload<ExtArgs>
        fields: Prisma.transactionsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.transactionsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$transactionsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.transactionsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$transactionsPayload>
          }
          findFirst: {
            args: Prisma.transactionsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$transactionsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.transactionsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$transactionsPayload>
          }
          findMany: {
            args: Prisma.transactionsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$transactionsPayload>[]
          }
          create: {
            args: Prisma.transactionsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$transactionsPayload>
          }
          createMany: {
            args: Prisma.transactionsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.transactionsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$transactionsPayload>
          }
          update: {
            args: Prisma.transactionsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$transactionsPayload>
          }
          deleteMany: {
            args: Prisma.transactionsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.transactionsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.transactionsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$transactionsPayload>
          }
          aggregate: {
            args: Prisma.TransactionsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTransactions>
          }
          groupBy: {
            args: Prisma.transactionsGroupByArgs<ExtArgs>
            result: $Utils.Optional<TransactionsGroupByOutputType>[]
          }
          count: {
            args: Prisma.transactionsCountArgs<ExtArgs>
            result: $Utils.Optional<TransactionsCountAggregateOutputType> | number
          }
        }
      }
      users: {
        payload: Prisma.$usersPayload<ExtArgs>
        fields: Prisma.usersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.usersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.usersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findFirst: {
            args: Prisma.usersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.usersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findMany: {
            args: Prisma.usersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          create: {
            args: Prisma.usersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          createMany: {
            args: Prisma.usersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.usersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          update: {
            args: Prisma.usersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          deleteMany: {
            args: Prisma.usersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.usersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.usersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          aggregate: {
            args: Prisma.UsersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsers>
          }
          groupBy: {
            args: Prisma.usersGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsersGroupByOutputType>[]
          }
          count: {
            args: Prisma.usersCountArgs<ExtArgs>
            result: $Utils.Optional<UsersCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type Exchange_goalsCountOutputType
   */

  export type Exchange_goalsCountOutputType = {
    checklist_items: number
    transactions: number
  }

  export type Exchange_goalsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    checklist_items?: boolean | Exchange_goalsCountOutputTypeCountChecklist_itemsArgs
    transactions?: boolean | Exchange_goalsCountOutputTypeCountTransactionsArgs
  }

  // Custom InputTypes
  /**
   * Exchange_goalsCountOutputType without action
   */
  export type Exchange_goalsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exchange_goalsCountOutputType
     */
    select?: Exchange_goalsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Exchange_goalsCountOutputType without action
   */
  export type Exchange_goalsCountOutputTypeCountChecklist_itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: checklist_itemsWhereInput
  }

  /**
   * Exchange_goalsCountOutputType without action
   */
  export type Exchange_goalsCountOutputTypeCountTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: transactionsWhereInput
  }


  /**
   * Count Type UsersCountOutputType
   */

  export type UsersCountOutputType = {
    exchange_goals: number
  }

  export type UsersCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    exchange_goals?: boolean | UsersCountOutputTypeCountExchange_goalsArgs
  }

  // Custom InputTypes
  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersCountOutputType
     */
    select?: UsersCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountExchange_goalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: exchange_goalsWhereInput
  }


  /**
   * Models
   */

  /**
   * Model checklist_items
   */

  export type AggregateChecklist_items = {
    _count: Checklist_itemsCountAggregateOutputType | null
    _min: Checklist_itemsMinAggregateOutputType | null
    _max: Checklist_itemsMaxAggregateOutputType | null
  }

  export type Checklist_itemsMinAggregateOutputType = {
    id_checklist_item: string | null
    id_exchange_goal: string | null
    title: string | null
    description: string | null
    status: $Enums.checklist_items_status | null
    due_date: Date | null
    created_at: Date | null
  }

  export type Checklist_itemsMaxAggregateOutputType = {
    id_checklist_item: string | null
    id_exchange_goal: string | null
    title: string | null
    description: string | null
    status: $Enums.checklist_items_status | null
    due_date: Date | null
    created_at: Date | null
  }

  export type Checklist_itemsCountAggregateOutputType = {
    id_checklist_item: number
    id_exchange_goal: number
    title: number
    description: number
    status: number
    due_date: number
    created_at: number
    _all: number
  }


  export type Checklist_itemsMinAggregateInputType = {
    id_checklist_item?: true
    id_exchange_goal?: true
    title?: true
    description?: true
    status?: true
    due_date?: true
    created_at?: true
  }

  export type Checklist_itemsMaxAggregateInputType = {
    id_checklist_item?: true
    id_exchange_goal?: true
    title?: true
    description?: true
    status?: true
    due_date?: true
    created_at?: true
  }

  export type Checklist_itemsCountAggregateInputType = {
    id_checklist_item?: true
    id_exchange_goal?: true
    title?: true
    description?: true
    status?: true
    due_date?: true
    created_at?: true
    _all?: true
  }

  export type Checklist_itemsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which checklist_items to aggregate.
     */
    where?: checklist_itemsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of checklist_items to fetch.
     */
    orderBy?: checklist_itemsOrderByWithRelationInput | checklist_itemsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: checklist_itemsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` checklist_items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` checklist_items.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned checklist_items
    **/
    _count?: true | Checklist_itemsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Checklist_itemsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Checklist_itemsMaxAggregateInputType
  }

  export type GetChecklist_itemsAggregateType<T extends Checklist_itemsAggregateArgs> = {
        [P in keyof T & keyof AggregateChecklist_items]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChecklist_items[P]>
      : GetScalarType<T[P], AggregateChecklist_items[P]>
  }




  export type checklist_itemsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: checklist_itemsWhereInput
    orderBy?: checklist_itemsOrderByWithAggregationInput | checklist_itemsOrderByWithAggregationInput[]
    by: Checklist_itemsScalarFieldEnum[] | Checklist_itemsScalarFieldEnum
    having?: checklist_itemsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Checklist_itemsCountAggregateInputType | true
    _min?: Checklist_itemsMinAggregateInputType
    _max?: Checklist_itemsMaxAggregateInputType
  }

  export type Checklist_itemsGroupByOutputType = {
    id_checklist_item: string
    id_exchange_goal: string | null
    title: string
    description: string | null
    status: $Enums.checklist_items_status | null
    due_date: Date | null
    created_at: Date | null
    _count: Checklist_itemsCountAggregateOutputType | null
    _min: Checklist_itemsMinAggregateOutputType | null
    _max: Checklist_itemsMaxAggregateOutputType | null
  }

  type GetChecklist_itemsGroupByPayload<T extends checklist_itemsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Checklist_itemsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Checklist_itemsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Checklist_itemsGroupByOutputType[P]>
            : GetScalarType<T[P], Checklist_itemsGroupByOutputType[P]>
        }
      >
    >


  export type checklist_itemsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_checklist_item?: boolean
    id_exchange_goal?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    due_date?: boolean
    created_at?: boolean
    exchange_goals?: boolean | checklist_items$exchange_goalsArgs<ExtArgs>
  }, ExtArgs["result"]["checklist_items"]>


  export type checklist_itemsSelectScalar = {
    id_checklist_item?: boolean
    id_exchange_goal?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    due_date?: boolean
    created_at?: boolean
  }

  export type checklist_itemsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    exchange_goals?: boolean | checklist_items$exchange_goalsArgs<ExtArgs>
  }

  export type $checklist_itemsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "checklist_items"
    objects: {
      exchange_goals: Prisma.$exchange_goalsPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id_checklist_item: string
      id_exchange_goal: string | null
      title: string
      description: string | null
      status: $Enums.checklist_items_status | null
      due_date: Date | null
      created_at: Date | null
    }, ExtArgs["result"]["checklist_items"]>
    composites: {}
  }

  type checklist_itemsGetPayload<S extends boolean | null | undefined | checklist_itemsDefaultArgs> = $Result.GetResult<Prisma.$checklist_itemsPayload, S>

  type checklist_itemsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<checklist_itemsFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: Checklist_itemsCountAggregateInputType | true
    }

  export interface checklist_itemsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['checklist_items'], meta: { name: 'checklist_items' } }
    /**
     * Find zero or one Checklist_items that matches the filter.
     * @param {checklist_itemsFindUniqueArgs} args - Arguments to find a Checklist_items
     * @example
     * // Get one Checklist_items
     * const checklist_items = await prisma.checklist_items.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends checklist_itemsFindUniqueArgs>(args: SelectSubset<T, checklist_itemsFindUniqueArgs<ExtArgs>>): Prisma__checklist_itemsClient<$Result.GetResult<Prisma.$checklist_itemsPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Checklist_items that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {checklist_itemsFindUniqueOrThrowArgs} args - Arguments to find a Checklist_items
     * @example
     * // Get one Checklist_items
     * const checklist_items = await prisma.checklist_items.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends checklist_itemsFindUniqueOrThrowArgs>(args: SelectSubset<T, checklist_itemsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__checklist_itemsClient<$Result.GetResult<Prisma.$checklist_itemsPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Checklist_items that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {checklist_itemsFindFirstArgs} args - Arguments to find a Checklist_items
     * @example
     * // Get one Checklist_items
     * const checklist_items = await prisma.checklist_items.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends checklist_itemsFindFirstArgs>(args?: SelectSubset<T, checklist_itemsFindFirstArgs<ExtArgs>>): Prisma__checklist_itemsClient<$Result.GetResult<Prisma.$checklist_itemsPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Checklist_items that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {checklist_itemsFindFirstOrThrowArgs} args - Arguments to find a Checklist_items
     * @example
     * // Get one Checklist_items
     * const checklist_items = await prisma.checklist_items.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends checklist_itemsFindFirstOrThrowArgs>(args?: SelectSubset<T, checklist_itemsFindFirstOrThrowArgs<ExtArgs>>): Prisma__checklist_itemsClient<$Result.GetResult<Prisma.$checklist_itemsPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Checklist_items that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {checklist_itemsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Checklist_items
     * const checklist_items = await prisma.checklist_items.findMany()
     * 
     * // Get first 10 Checklist_items
     * const checklist_items = await prisma.checklist_items.findMany({ take: 10 })
     * 
     * // Only select the `id_checklist_item`
     * const checklist_itemsWithId_checklist_itemOnly = await prisma.checklist_items.findMany({ select: { id_checklist_item: true } })
     * 
     */
    findMany<T extends checklist_itemsFindManyArgs>(args?: SelectSubset<T, checklist_itemsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$checklist_itemsPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Checklist_items.
     * @param {checklist_itemsCreateArgs} args - Arguments to create a Checklist_items.
     * @example
     * // Create one Checklist_items
     * const Checklist_items = await prisma.checklist_items.create({
     *   data: {
     *     // ... data to create a Checklist_items
     *   }
     * })
     * 
     */
    create<T extends checklist_itemsCreateArgs>(args: SelectSubset<T, checklist_itemsCreateArgs<ExtArgs>>): Prisma__checklist_itemsClient<$Result.GetResult<Prisma.$checklist_itemsPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Checklist_items.
     * @param {checklist_itemsCreateManyArgs} args - Arguments to create many Checklist_items.
     * @example
     * // Create many Checklist_items
     * const checklist_items = await prisma.checklist_items.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends checklist_itemsCreateManyArgs>(args?: SelectSubset<T, checklist_itemsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Checklist_items.
     * @param {checklist_itemsDeleteArgs} args - Arguments to delete one Checklist_items.
     * @example
     * // Delete one Checklist_items
     * const Checklist_items = await prisma.checklist_items.delete({
     *   where: {
     *     // ... filter to delete one Checklist_items
     *   }
     * })
     * 
     */
    delete<T extends checklist_itemsDeleteArgs>(args: SelectSubset<T, checklist_itemsDeleteArgs<ExtArgs>>): Prisma__checklist_itemsClient<$Result.GetResult<Prisma.$checklist_itemsPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Checklist_items.
     * @param {checklist_itemsUpdateArgs} args - Arguments to update one Checklist_items.
     * @example
     * // Update one Checklist_items
     * const checklist_items = await prisma.checklist_items.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends checklist_itemsUpdateArgs>(args: SelectSubset<T, checklist_itemsUpdateArgs<ExtArgs>>): Prisma__checklist_itemsClient<$Result.GetResult<Prisma.$checklist_itemsPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Checklist_items.
     * @param {checklist_itemsDeleteManyArgs} args - Arguments to filter Checklist_items to delete.
     * @example
     * // Delete a few Checklist_items
     * const { count } = await prisma.checklist_items.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends checklist_itemsDeleteManyArgs>(args?: SelectSubset<T, checklist_itemsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Checklist_items.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {checklist_itemsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Checklist_items
     * const checklist_items = await prisma.checklist_items.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends checklist_itemsUpdateManyArgs>(args: SelectSubset<T, checklist_itemsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Checklist_items.
     * @param {checklist_itemsUpsertArgs} args - Arguments to update or create a Checklist_items.
     * @example
     * // Update or create a Checklist_items
     * const checklist_items = await prisma.checklist_items.upsert({
     *   create: {
     *     // ... data to create a Checklist_items
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Checklist_items we want to update
     *   }
     * })
     */
    upsert<T extends checklist_itemsUpsertArgs>(args: SelectSubset<T, checklist_itemsUpsertArgs<ExtArgs>>): Prisma__checklist_itemsClient<$Result.GetResult<Prisma.$checklist_itemsPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Checklist_items.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {checklist_itemsCountArgs} args - Arguments to filter Checklist_items to count.
     * @example
     * // Count the number of Checklist_items
     * const count = await prisma.checklist_items.count({
     *   where: {
     *     // ... the filter for the Checklist_items we want to count
     *   }
     * })
    **/
    count<T extends checklist_itemsCountArgs>(
      args?: Subset<T, checklist_itemsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Checklist_itemsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Checklist_items.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Checklist_itemsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Checklist_itemsAggregateArgs>(args: Subset<T, Checklist_itemsAggregateArgs>): Prisma.PrismaPromise<GetChecklist_itemsAggregateType<T>>

    /**
     * Group by Checklist_items.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {checklist_itemsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends checklist_itemsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: checklist_itemsGroupByArgs['orderBy'] }
        : { orderBy?: checklist_itemsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, checklist_itemsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChecklist_itemsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the checklist_items model
   */
  readonly fields: checklist_itemsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for checklist_items.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__checklist_itemsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    exchange_goals<T extends checklist_items$exchange_goalsArgs<ExtArgs> = {}>(args?: Subset<T, checklist_items$exchange_goalsArgs<ExtArgs>>): Prisma__exchange_goalsClient<$Result.GetResult<Prisma.$exchange_goalsPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the checklist_items model
   */ 
  interface checklist_itemsFieldRefs {
    readonly id_checklist_item: FieldRef<"checklist_items", 'String'>
    readonly id_exchange_goal: FieldRef<"checklist_items", 'String'>
    readonly title: FieldRef<"checklist_items", 'String'>
    readonly description: FieldRef<"checklist_items", 'String'>
    readonly status: FieldRef<"checklist_items", 'checklist_items_status'>
    readonly due_date: FieldRef<"checklist_items", 'DateTime'>
    readonly created_at: FieldRef<"checklist_items", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * checklist_items findUnique
   */
  export type checklist_itemsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the checklist_items
     */
    select?: checklist_itemsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: checklist_itemsInclude<ExtArgs> | null
    /**
     * Filter, which checklist_items to fetch.
     */
    where: checklist_itemsWhereUniqueInput
  }

  /**
   * checklist_items findUniqueOrThrow
   */
  export type checklist_itemsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the checklist_items
     */
    select?: checklist_itemsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: checklist_itemsInclude<ExtArgs> | null
    /**
     * Filter, which checklist_items to fetch.
     */
    where: checklist_itemsWhereUniqueInput
  }

  /**
   * checklist_items findFirst
   */
  export type checklist_itemsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the checklist_items
     */
    select?: checklist_itemsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: checklist_itemsInclude<ExtArgs> | null
    /**
     * Filter, which checklist_items to fetch.
     */
    where?: checklist_itemsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of checklist_items to fetch.
     */
    orderBy?: checklist_itemsOrderByWithRelationInput | checklist_itemsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for checklist_items.
     */
    cursor?: checklist_itemsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` checklist_items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` checklist_items.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of checklist_items.
     */
    distinct?: Checklist_itemsScalarFieldEnum | Checklist_itemsScalarFieldEnum[]
  }

  /**
   * checklist_items findFirstOrThrow
   */
  export type checklist_itemsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the checklist_items
     */
    select?: checklist_itemsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: checklist_itemsInclude<ExtArgs> | null
    /**
     * Filter, which checklist_items to fetch.
     */
    where?: checklist_itemsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of checklist_items to fetch.
     */
    orderBy?: checklist_itemsOrderByWithRelationInput | checklist_itemsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for checklist_items.
     */
    cursor?: checklist_itemsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` checklist_items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` checklist_items.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of checklist_items.
     */
    distinct?: Checklist_itemsScalarFieldEnum | Checklist_itemsScalarFieldEnum[]
  }

  /**
   * checklist_items findMany
   */
  export type checklist_itemsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the checklist_items
     */
    select?: checklist_itemsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: checklist_itemsInclude<ExtArgs> | null
    /**
     * Filter, which checklist_items to fetch.
     */
    where?: checklist_itemsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of checklist_items to fetch.
     */
    orderBy?: checklist_itemsOrderByWithRelationInput | checklist_itemsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing checklist_items.
     */
    cursor?: checklist_itemsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` checklist_items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` checklist_items.
     */
    skip?: number
    distinct?: Checklist_itemsScalarFieldEnum | Checklist_itemsScalarFieldEnum[]
  }

  /**
   * checklist_items create
   */
  export type checklist_itemsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the checklist_items
     */
    select?: checklist_itemsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: checklist_itemsInclude<ExtArgs> | null
    /**
     * The data needed to create a checklist_items.
     */
    data: XOR<checklist_itemsCreateInput, checklist_itemsUncheckedCreateInput>
  }

  /**
   * checklist_items createMany
   */
  export type checklist_itemsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many checklist_items.
     */
    data: checklist_itemsCreateManyInput | checklist_itemsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * checklist_items update
   */
  export type checklist_itemsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the checklist_items
     */
    select?: checklist_itemsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: checklist_itemsInclude<ExtArgs> | null
    /**
     * The data needed to update a checklist_items.
     */
    data: XOR<checklist_itemsUpdateInput, checklist_itemsUncheckedUpdateInput>
    /**
     * Choose, which checklist_items to update.
     */
    where: checklist_itemsWhereUniqueInput
  }

  /**
   * checklist_items updateMany
   */
  export type checklist_itemsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update checklist_items.
     */
    data: XOR<checklist_itemsUpdateManyMutationInput, checklist_itemsUncheckedUpdateManyInput>
    /**
     * Filter which checklist_items to update
     */
    where?: checklist_itemsWhereInput
  }

  /**
   * checklist_items upsert
   */
  export type checklist_itemsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the checklist_items
     */
    select?: checklist_itemsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: checklist_itemsInclude<ExtArgs> | null
    /**
     * The filter to search for the checklist_items to update in case it exists.
     */
    where: checklist_itemsWhereUniqueInput
    /**
     * In case the checklist_items found by the `where` argument doesn't exist, create a new checklist_items with this data.
     */
    create: XOR<checklist_itemsCreateInput, checklist_itemsUncheckedCreateInput>
    /**
     * In case the checklist_items was found with the provided `where` argument, update it with this data.
     */
    update: XOR<checklist_itemsUpdateInput, checklist_itemsUncheckedUpdateInput>
  }

  /**
   * checklist_items delete
   */
  export type checklist_itemsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the checklist_items
     */
    select?: checklist_itemsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: checklist_itemsInclude<ExtArgs> | null
    /**
     * Filter which checklist_items to delete.
     */
    where: checklist_itemsWhereUniqueInput
  }

  /**
   * checklist_items deleteMany
   */
  export type checklist_itemsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which checklist_items to delete
     */
    where?: checklist_itemsWhereInput
  }

  /**
   * checklist_items.exchange_goals
   */
  export type checklist_items$exchange_goalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the exchange_goals
     */
    select?: exchange_goalsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: exchange_goalsInclude<ExtArgs> | null
    where?: exchange_goalsWhereInput
  }

  /**
   * checklist_items without action
   */
  export type checklist_itemsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the checklist_items
     */
    select?: checklist_itemsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: checklist_itemsInclude<ExtArgs> | null
  }


  /**
   * Model exchange_goals
   */

  export type AggregateExchange_goals = {
    _count: Exchange_goalsCountAggregateOutputType | null
    _avg: Exchange_goalsAvgAggregateOutputType | null
    _sum: Exchange_goalsSumAggregateOutputType | null
    _min: Exchange_goalsMinAggregateOutputType | null
    _max: Exchange_goalsMaxAggregateOutputType | null
  }

  export type Exchange_goalsAvgAggregateOutputType = {
    amount_needed: Decimal | null
  }

  export type Exchange_goalsSumAggregateOutputType = {
    amount_needed: Decimal | null
  }

  export type Exchange_goalsMinAggregateOutputType = {
    id_exchange_goal: string | null
    id_user: string | null
    destination: string | null
    target_currency: string | null
    amount_needed: Decimal | null
    deadline: Date | null
    created_at: Date | null
  }

  export type Exchange_goalsMaxAggregateOutputType = {
    id_exchange_goal: string | null
    id_user: string | null
    destination: string | null
    target_currency: string | null
    amount_needed: Decimal | null
    deadline: Date | null
    created_at: Date | null
  }

  export type Exchange_goalsCountAggregateOutputType = {
    id_exchange_goal: number
    id_user: number
    destination: number
    target_currency: number
    amount_needed: number
    deadline: number
    created_at: number
    _all: number
  }


  export type Exchange_goalsAvgAggregateInputType = {
    amount_needed?: true
  }

  export type Exchange_goalsSumAggregateInputType = {
    amount_needed?: true
  }

  export type Exchange_goalsMinAggregateInputType = {
    id_exchange_goal?: true
    id_user?: true
    destination?: true
    target_currency?: true
    amount_needed?: true
    deadline?: true
    created_at?: true
  }

  export type Exchange_goalsMaxAggregateInputType = {
    id_exchange_goal?: true
    id_user?: true
    destination?: true
    target_currency?: true
    amount_needed?: true
    deadline?: true
    created_at?: true
  }

  export type Exchange_goalsCountAggregateInputType = {
    id_exchange_goal?: true
    id_user?: true
    destination?: true
    target_currency?: true
    amount_needed?: true
    deadline?: true
    created_at?: true
    _all?: true
  }

  export type Exchange_goalsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which exchange_goals to aggregate.
     */
    where?: exchange_goalsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of exchange_goals to fetch.
     */
    orderBy?: exchange_goalsOrderByWithRelationInput | exchange_goalsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: exchange_goalsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` exchange_goals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` exchange_goals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned exchange_goals
    **/
    _count?: true | Exchange_goalsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Exchange_goalsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Exchange_goalsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Exchange_goalsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Exchange_goalsMaxAggregateInputType
  }

  export type GetExchange_goalsAggregateType<T extends Exchange_goalsAggregateArgs> = {
        [P in keyof T & keyof AggregateExchange_goals]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExchange_goals[P]>
      : GetScalarType<T[P], AggregateExchange_goals[P]>
  }




  export type exchange_goalsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: exchange_goalsWhereInput
    orderBy?: exchange_goalsOrderByWithAggregationInput | exchange_goalsOrderByWithAggregationInput[]
    by: Exchange_goalsScalarFieldEnum[] | Exchange_goalsScalarFieldEnum
    having?: exchange_goalsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Exchange_goalsCountAggregateInputType | true
    _avg?: Exchange_goalsAvgAggregateInputType
    _sum?: Exchange_goalsSumAggregateInputType
    _min?: Exchange_goalsMinAggregateInputType
    _max?: Exchange_goalsMaxAggregateInputType
  }

  export type Exchange_goalsGroupByOutputType = {
    id_exchange_goal: string
    id_user: string | null
    destination: string
    target_currency: string
    amount_needed: Decimal
    deadline: Date
    created_at: Date | null
    _count: Exchange_goalsCountAggregateOutputType | null
    _avg: Exchange_goalsAvgAggregateOutputType | null
    _sum: Exchange_goalsSumAggregateOutputType | null
    _min: Exchange_goalsMinAggregateOutputType | null
    _max: Exchange_goalsMaxAggregateOutputType | null
  }

  type GetExchange_goalsGroupByPayload<T extends exchange_goalsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Exchange_goalsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Exchange_goalsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Exchange_goalsGroupByOutputType[P]>
            : GetScalarType<T[P], Exchange_goalsGroupByOutputType[P]>
        }
      >
    >


  export type exchange_goalsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_exchange_goal?: boolean
    id_user?: boolean
    destination?: boolean
    target_currency?: boolean
    amount_needed?: boolean
    deadline?: boolean
    created_at?: boolean
    checklist_items?: boolean | exchange_goals$checklist_itemsArgs<ExtArgs>
    users?: boolean | exchange_goals$usersArgs<ExtArgs>
    transactions?: boolean | exchange_goals$transactionsArgs<ExtArgs>
    _count?: boolean | Exchange_goalsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["exchange_goals"]>


  export type exchange_goalsSelectScalar = {
    id_exchange_goal?: boolean
    id_user?: boolean
    destination?: boolean
    target_currency?: boolean
    amount_needed?: boolean
    deadline?: boolean
    created_at?: boolean
  }

  export type exchange_goalsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    checklist_items?: boolean | exchange_goals$checklist_itemsArgs<ExtArgs>
    users?: boolean | exchange_goals$usersArgs<ExtArgs>
    transactions?: boolean | exchange_goals$transactionsArgs<ExtArgs>
    _count?: boolean | Exchange_goalsCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $exchange_goalsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "exchange_goals"
    objects: {
      checklist_items: Prisma.$checklist_itemsPayload<ExtArgs>[]
      users: Prisma.$usersPayload<ExtArgs> | null
      transactions: Prisma.$transactionsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id_exchange_goal: string
      id_user: string | null
      destination: string
      target_currency: string
      amount_needed: Prisma.Decimal
      deadline: Date
      created_at: Date | null
    }, ExtArgs["result"]["exchange_goals"]>
    composites: {}
  }

  type exchange_goalsGetPayload<S extends boolean | null | undefined | exchange_goalsDefaultArgs> = $Result.GetResult<Prisma.$exchange_goalsPayload, S>

  type exchange_goalsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<exchange_goalsFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: Exchange_goalsCountAggregateInputType | true
    }

  export interface exchange_goalsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['exchange_goals'], meta: { name: 'exchange_goals' } }
    /**
     * Find zero or one Exchange_goals that matches the filter.
     * @param {exchange_goalsFindUniqueArgs} args - Arguments to find a Exchange_goals
     * @example
     * // Get one Exchange_goals
     * const exchange_goals = await prisma.exchange_goals.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends exchange_goalsFindUniqueArgs>(args: SelectSubset<T, exchange_goalsFindUniqueArgs<ExtArgs>>): Prisma__exchange_goalsClient<$Result.GetResult<Prisma.$exchange_goalsPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Exchange_goals that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {exchange_goalsFindUniqueOrThrowArgs} args - Arguments to find a Exchange_goals
     * @example
     * // Get one Exchange_goals
     * const exchange_goals = await prisma.exchange_goals.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends exchange_goalsFindUniqueOrThrowArgs>(args: SelectSubset<T, exchange_goalsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__exchange_goalsClient<$Result.GetResult<Prisma.$exchange_goalsPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Exchange_goals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {exchange_goalsFindFirstArgs} args - Arguments to find a Exchange_goals
     * @example
     * // Get one Exchange_goals
     * const exchange_goals = await prisma.exchange_goals.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends exchange_goalsFindFirstArgs>(args?: SelectSubset<T, exchange_goalsFindFirstArgs<ExtArgs>>): Prisma__exchange_goalsClient<$Result.GetResult<Prisma.$exchange_goalsPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Exchange_goals that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {exchange_goalsFindFirstOrThrowArgs} args - Arguments to find a Exchange_goals
     * @example
     * // Get one Exchange_goals
     * const exchange_goals = await prisma.exchange_goals.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends exchange_goalsFindFirstOrThrowArgs>(args?: SelectSubset<T, exchange_goalsFindFirstOrThrowArgs<ExtArgs>>): Prisma__exchange_goalsClient<$Result.GetResult<Prisma.$exchange_goalsPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Exchange_goals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {exchange_goalsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Exchange_goals
     * const exchange_goals = await prisma.exchange_goals.findMany()
     * 
     * // Get first 10 Exchange_goals
     * const exchange_goals = await prisma.exchange_goals.findMany({ take: 10 })
     * 
     * // Only select the `id_exchange_goal`
     * const exchange_goalsWithId_exchange_goalOnly = await prisma.exchange_goals.findMany({ select: { id_exchange_goal: true } })
     * 
     */
    findMany<T extends exchange_goalsFindManyArgs>(args?: SelectSubset<T, exchange_goalsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$exchange_goalsPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Exchange_goals.
     * @param {exchange_goalsCreateArgs} args - Arguments to create a Exchange_goals.
     * @example
     * // Create one Exchange_goals
     * const Exchange_goals = await prisma.exchange_goals.create({
     *   data: {
     *     // ... data to create a Exchange_goals
     *   }
     * })
     * 
     */
    create<T extends exchange_goalsCreateArgs>(args: SelectSubset<T, exchange_goalsCreateArgs<ExtArgs>>): Prisma__exchange_goalsClient<$Result.GetResult<Prisma.$exchange_goalsPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Exchange_goals.
     * @param {exchange_goalsCreateManyArgs} args - Arguments to create many Exchange_goals.
     * @example
     * // Create many Exchange_goals
     * const exchange_goals = await prisma.exchange_goals.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends exchange_goalsCreateManyArgs>(args?: SelectSubset<T, exchange_goalsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Exchange_goals.
     * @param {exchange_goalsDeleteArgs} args - Arguments to delete one Exchange_goals.
     * @example
     * // Delete one Exchange_goals
     * const Exchange_goals = await prisma.exchange_goals.delete({
     *   where: {
     *     // ... filter to delete one Exchange_goals
     *   }
     * })
     * 
     */
    delete<T extends exchange_goalsDeleteArgs>(args: SelectSubset<T, exchange_goalsDeleteArgs<ExtArgs>>): Prisma__exchange_goalsClient<$Result.GetResult<Prisma.$exchange_goalsPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Exchange_goals.
     * @param {exchange_goalsUpdateArgs} args - Arguments to update one Exchange_goals.
     * @example
     * // Update one Exchange_goals
     * const exchange_goals = await prisma.exchange_goals.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends exchange_goalsUpdateArgs>(args: SelectSubset<T, exchange_goalsUpdateArgs<ExtArgs>>): Prisma__exchange_goalsClient<$Result.GetResult<Prisma.$exchange_goalsPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Exchange_goals.
     * @param {exchange_goalsDeleteManyArgs} args - Arguments to filter Exchange_goals to delete.
     * @example
     * // Delete a few Exchange_goals
     * const { count } = await prisma.exchange_goals.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends exchange_goalsDeleteManyArgs>(args?: SelectSubset<T, exchange_goalsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Exchange_goals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {exchange_goalsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Exchange_goals
     * const exchange_goals = await prisma.exchange_goals.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends exchange_goalsUpdateManyArgs>(args: SelectSubset<T, exchange_goalsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Exchange_goals.
     * @param {exchange_goalsUpsertArgs} args - Arguments to update or create a Exchange_goals.
     * @example
     * // Update or create a Exchange_goals
     * const exchange_goals = await prisma.exchange_goals.upsert({
     *   create: {
     *     // ... data to create a Exchange_goals
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Exchange_goals we want to update
     *   }
     * })
     */
    upsert<T extends exchange_goalsUpsertArgs>(args: SelectSubset<T, exchange_goalsUpsertArgs<ExtArgs>>): Prisma__exchange_goalsClient<$Result.GetResult<Prisma.$exchange_goalsPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Exchange_goals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {exchange_goalsCountArgs} args - Arguments to filter Exchange_goals to count.
     * @example
     * // Count the number of Exchange_goals
     * const count = await prisma.exchange_goals.count({
     *   where: {
     *     // ... the filter for the Exchange_goals we want to count
     *   }
     * })
    **/
    count<T extends exchange_goalsCountArgs>(
      args?: Subset<T, exchange_goalsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Exchange_goalsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Exchange_goals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Exchange_goalsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Exchange_goalsAggregateArgs>(args: Subset<T, Exchange_goalsAggregateArgs>): Prisma.PrismaPromise<GetExchange_goalsAggregateType<T>>

    /**
     * Group by Exchange_goals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {exchange_goalsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends exchange_goalsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: exchange_goalsGroupByArgs['orderBy'] }
        : { orderBy?: exchange_goalsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, exchange_goalsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExchange_goalsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the exchange_goals model
   */
  readonly fields: exchange_goalsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for exchange_goals.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__exchange_goalsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    checklist_items<T extends exchange_goals$checklist_itemsArgs<ExtArgs> = {}>(args?: Subset<T, exchange_goals$checklist_itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$checklist_itemsPayload<ExtArgs>, T, "findMany"> | Null>
    users<T extends exchange_goals$usersArgs<ExtArgs> = {}>(args?: Subset<T, exchange_goals$usersArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    transactions<T extends exchange_goals$transactionsArgs<ExtArgs> = {}>(args?: Subset<T, exchange_goals$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$transactionsPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the exchange_goals model
   */ 
  interface exchange_goalsFieldRefs {
    readonly id_exchange_goal: FieldRef<"exchange_goals", 'String'>
    readonly id_user: FieldRef<"exchange_goals", 'String'>
    readonly destination: FieldRef<"exchange_goals", 'String'>
    readonly target_currency: FieldRef<"exchange_goals", 'String'>
    readonly amount_needed: FieldRef<"exchange_goals", 'Decimal'>
    readonly deadline: FieldRef<"exchange_goals", 'DateTime'>
    readonly created_at: FieldRef<"exchange_goals", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * exchange_goals findUnique
   */
  export type exchange_goalsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the exchange_goals
     */
    select?: exchange_goalsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: exchange_goalsInclude<ExtArgs> | null
    /**
     * Filter, which exchange_goals to fetch.
     */
    where: exchange_goalsWhereUniqueInput
  }

  /**
   * exchange_goals findUniqueOrThrow
   */
  export type exchange_goalsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the exchange_goals
     */
    select?: exchange_goalsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: exchange_goalsInclude<ExtArgs> | null
    /**
     * Filter, which exchange_goals to fetch.
     */
    where: exchange_goalsWhereUniqueInput
  }

  /**
   * exchange_goals findFirst
   */
  export type exchange_goalsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the exchange_goals
     */
    select?: exchange_goalsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: exchange_goalsInclude<ExtArgs> | null
    /**
     * Filter, which exchange_goals to fetch.
     */
    where?: exchange_goalsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of exchange_goals to fetch.
     */
    orderBy?: exchange_goalsOrderByWithRelationInput | exchange_goalsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for exchange_goals.
     */
    cursor?: exchange_goalsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` exchange_goals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` exchange_goals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of exchange_goals.
     */
    distinct?: Exchange_goalsScalarFieldEnum | Exchange_goalsScalarFieldEnum[]
  }

  /**
   * exchange_goals findFirstOrThrow
   */
  export type exchange_goalsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the exchange_goals
     */
    select?: exchange_goalsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: exchange_goalsInclude<ExtArgs> | null
    /**
     * Filter, which exchange_goals to fetch.
     */
    where?: exchange_goalsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of exchange_goals to fetch.
     */
    orderBy?: exchange_goalsOrderByWithRelationInput | exchange_goalsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for exchange_goals.
     */
    cursor?: exchange_goalsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` exchange_goals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` exchange_goals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of exchange_goals.
     */
    distinct?: Exchange_goalsScalarFieldEnum | Exchange_goalsScalarFieldEnum[]
  }

  /**
   * exchange_goals findMany
   */
  export type exchange_goalsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the exchange_goals
     */
    select?: exchange_goalsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: exchange_goalsInclude<ExtArgs> | null
    /**
     * Filter, which exchange_goals to fetch.
     */
    where?: exchange_goalsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of exchange_goals to fetch.
     */
    orderBy?: exchange_goalsOrderByWithRelationInput | exchange_goalsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing exchange_goals.
     */
    cursor?: exchange_goalsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` exchange_goals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` exchange_goals.
     */
    skip?: number
    distinct?: Exchange_goalsScalarFieldEnum | Exchange_goalsScalarFieldEnum[]
  }

  /**
   * exchange_goals create
   */
  export type exchange_goalsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the exchange_goals
     */
    select?: exchange_goalsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: exchange_goalsInclude<ExtArgs> | null
    /**
     * The data needed to create a exchange_goals.
     */
    data: XOR<exchange_goalsCreateInput, exchange_goalsUncheckedCreateInput>
  }

  /**
   * exchange_goals createMany
   */
  export type exchange_goalsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many exchange_goals.
     */
    data: exchange_goalsCreateManyInput | exchange_goalsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * exchange_goals update
   */
  export type exchange_goalsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the exchange_goals
     */
    select?: exchange_goalsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: exchange_goalsInclude<ExtArgs> | null
    /**
     * The data needed to update a exchange_goals.
     */
    data: XOR<exchange_goalsUpdateInput, exchange_goalsUncheckedUpdateInput>
    /**
     * Choose, which exchange_goals to update.
     */
    where: exchange_goalsWhereUniqueInput
  }

  /**
   * exchange_goals updateMany
   */
  export type exchange_goalsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update exchange_goals.
     */
    data: XOR<exchange_goalsUpdateManyMutationInput, exchange_goalsUncheckedUpdateManyInput>
    /**
     * Filter which exchange_goals to update
     */
    where?: exchange_goalsWhereInput
  }

  /**
   * exchange_goals upsert
   */
  export type exchange_goalsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the exchange_goals
     */
    select?: exchange_goalsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: exchange_goalsInclude<ExtArgs> | null
    /**
     * The filter to search for the exchange_goals to update in case it exists.
     */
    where: exchange_goalsWhereUniqueInput
    /**
     * In case the exchange_goals found by the `where` argument doesn't exist, create a new exchange_goals with this data.
     */
    create: XOR<exchange_goalsCreateInput, exchange_goalsUncheckedCreateInput>
    /**
     * In case the exchange_goals was found with the provided `where` argument, update it with this data.
     */
    update: XOR<exchange_goalsUpdateInput, exchange_goalsUncheckedUpdateInput>
  }

  /**
   * exchange_goals delete
   */
  export type exchange_goalsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the exchange_goals
     */
    select?: exchange_goalsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: exchange_goalsInclude<ExtArgs> | null
    /**
     * Filter which exchange_goals to delete.
     */
    where: exchange_goalsWhereUniqueInput
  }

  /**
   * exchange_goals deleteMany
   */
  export type exchange_goalsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which exchange_goals to delete
     */
    where?: exchange_goalsWhereInput
  }

  /**
   * exchange_goals.checklist_items
   */
  export type exchange_goals$checklist_itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the checklist_items
     */
    select?: checklist_itemsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: checklist_itemsInclude<ExtArgs> | null
    where?: checklist_itemsWhereInput
    orderBy?: checklist_itemsOrderByWithRelationInput | checklist_itemsOrderByWithRelationInput[]
    cursor?: checklist_itemsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Checklist_itemsScalarFieldEnum | Checklist_itemsScalarFieldEnum[]
  }

  /**
   * exchange_goals.users
   */
  export type exchange_goals$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    where?: usersWhereInput
  }

  /**
   * exchange_goals.transactions
   */
  export type exchange_goals$transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transactions
     */
    select?: transactionsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transactionsInclude<ExtArgs> | null
    where?: transactionsWhereInput
    orderBy?: transactionsOrderByWithRelationInput | transactionsOrderByWithRelationInput[]
    cursor?: transactionsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionsScalarFieldEnum | TransactionsScalarFieldEnum[]
  }

  /**
   * exchange_goals without action
   */
  export type exchange_goalsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the exchange_goals
     */
    select?: exchange_goalsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: exchange_goalsInclude<ExtArgs> | null
  }


  /**
   * Model transactions
   */

  export type AggregateTransactions = {
    _count: TransactionsCountAggregateOutputType | null
    _avg: TransactionsAvgAggregateOutputType | null
    _sum: TransactionsSumAggregateOutputType | null
    _min: TransactionsMinAggregateOutputType | null
    _max: TransactionsMaxAggregateOutputType | null
  }

  export type TransactionsAvgAggregateOutputType = {
    amount_brl: Decimal | null
    exchange_rate: Decimal | null
    amount_foreign: Decimal | null
  }

  export type TransactionsSumAggregateOutputType = {
    amount_brl: Decimal | null
    exchange_rate: Decimal | null
    amount_foreign: Decimal | null
  }

  export type TransactionsMinAggregateOutputType = {
    id_transaction: string | null
    id_exchange_goal: string | null
    description: string | null
    amount_brl: Decimal | null
    exchange_rate: Decimal | null
    amount_foreign: Decimal | null
    platform: $Enums.transactions_platform | null
    created_at: Date | null
  }

  export type TransactionsMaxAggregateOutputType = {
    id_transaction: string | null
    id_exchange_goal: string | null
    description: string | null
    amount_brl: Decimal | null
    exchange_rate: Decimal | null
    amount_foreign: Decimal | null
    platform: $Enums.transactions_platform | null
    created_at: Date | null
  }

  export type TransactionsCountAggregateOutputType = {
    id_transaction: number
    id_exchange_goal: number
    description: number
    amount_brl: number
    exchange_rate: number
    amount_foreign: number
    platform: number
    created_at: number
    _all: number
  }


  export type TransactionsAvgAggregateInputType = {
    amount_brl?: true
    exchange_rate?: true
    amount_foreign?: true
  }

  export type TransactionsSumAggregateInputType = {
    amount_brl?: true
    exchange_rate?: true
    amount_foreign?: true
  }

  export type TransactionsMinAggregateInputType = {
    id_transaction?: true
    id_exchange_goal?: true
    description?: true
    amount_brl?: true
    exchange_rate?: true
    amount_foreign?: true
    platform?: true
    created_at?: true
  }

  export type TransactionsMaxAggregateInputType = {
    id_transaction?: true
    id_exchange_goal?: true
    description?: true
    amount_brl?: true
    exchange_rate?: true
    amount_foreign?: true
    platform?: true
    created_at?: true
  }

  export type TransactionsCountAggregateInputType = {
    id_transaction?: true
    id_exchange_goal?: true
    description?: true
    amount_brl?: true
    exchange_rate?: true
    amount_foreign?: true
    platform?: true
    created_at?: true
    _all?: true
  }

  export type TransactionsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which transactions to aggregate.
     */
    where?: transactionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of transactions to fetch.
     */
    orderBy?: transactionsOrderByWithRelationInput | transactionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: transactionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned transactions
    **/
    _count?: true | TransactionsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TransactionsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TransactionsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TransactionsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TransactionsMaxAggregateInputType
  }

  export type GetTransactionsAggregateType<T extends TransactionsAggregateArgs> = {
        [P in keyof T & keyof AggregateTransactions]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTransactions[P]>
      : GetScalarType<T[P], AggregateTransactions[P]>
  }




  export type transactionsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: transactionsWhereInput
    orderBy?: transactionsOrderByWithAggregationInput | transactionsOrderByWithAggregationInput[]
    by: TransactionsScalarFieldEnum[] | TransactionsScalarFieldEnum
    having?: transactionsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TransactionsCountAggregateInputType | true
    _avg?: TransactionsAvgAggregateInputType
    _sum?: TransactionsSumAggregateInputType
    _min?: TransactionsMinAggregateInputType
    _max?: TransactionsMaxAggregateInputType
  }

  export type TransactionsGroupByOutputType = {
    id_transaction: string
    id_exchange_goal: string | null
    description: string
    amount_brl: Decimal
    exchange_rate: Decimal
    amount_foreign: Decimal
    platform: $Enums.transactions_platform | null
    created_at: Date | null
    _count: TransactionsCountAggregateOutputType | null
    _avg: TransactionsAvgAggregateOutputType | null
    _sum: TransactionsSumAggregateOutputType | null
    _min: TransactionsMinAggregateOutputType | null
    _max: TransactionsMaxAggregateOutputType | null
  }

  type GetTransactionsGroupByPayload<T extends transactionsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TransactionsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TransactionsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TransactionsGroupByOutputType[P]>
            : GetScalarType<T[P], TransactionsGroupByOutputType[P]>
        }
      >
    >


  export type transactionsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_transaction?: boolean
    id_exchange_goal?: boolean
    description?: boolean
    amount_brl?: boolean
    exchange_rate?: boolean
    amount_foreign?: boolean
    platform?: boolean
    created_at?: boolean
    exchange_goals?: boolean | transactions$exchange_goalsArgs<ExtArgs>
  }, ExtArgs["result"]["transactions"]>


  export type transactionsSelectScalar = {
    id_transaction?: boolean
    id_exchange_goal?: boolean
    description?: boolean
    amount_brl?: boolean
    exchange_rate?: boolean
    amount_foreign?: boolean
    platform?: boolean
    created_at?: boolean
  }

  export type transactionsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    exchange_goals?: boolean | transactions$exchange_goalsArgs<ExtArgs>
  }

  export type $transactionsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "transactions"
    objects: {
      exchange_goals: Prisma.$exchange_goalsPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id_transaction: string
      id_exchange_goal: string | null
      description: string
      amount_brl: Prisma.Decimal
      exchange_rate: Prisma.Decimal
      amount_foreign: Prisma.Decimal
      platform: $Enums.transactions_platform | null
      created_at: Date | null
    }, ExtArgs["result"]["transactions"]>
    composites: {}
  }

  type transactionsGetPayload<S extends boolean | null | undefined | transactionsDefaultArgs> = $Result.GetResult<Prisma.$transactionsPayload, S>

  type transactionsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<transactionsFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TransactionsCountAggregateInputType | true
    }

  export interface transactionsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['transactions'], meta: { name: 'transactions' } }
    /**
     * Find zero or one Transactions that matches the filter.
     * @param {transactionsFindUniqueArgs} args - Arguments to find a Transactions
     * @example
     * // Get one Transactions
     * const transactions = await prisma.transactions.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends transactionsFindUniqueArgs>(args: SelectSubset<T, transactionsFindUniqueArgs<ExtArgs>>): Prisma__transactionsClient<$Result.GetResult<Prisma.$transactionsPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Transactions that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {transactionsFindUniqueOrThrowArgs} args - Arguments to find a Transactions
     * @example
     * // Get one Transactions
     * const transactions = await prisma.transactions.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends transactionsFindUniqueOrThrowArgs>(args: SelectSubset<T, transactionsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__transactionsClient<$Result.GetResult<Prisma.$transactionsPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Transactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {transactionsFindFirstArgs} args - Arguments to find a Transactions
     * @example
     * // Get one Transactions
     * const transactions = await prisma.transactions.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends transactionsFindFirstArgs>(args?: SelectSubset<T, transactionsFindFirstArgs<ExtArgs>>): Prisma__transactionsClient<$Result.GetResult<Prisma.$transactionsPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Transactions that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {transactionsFindFirstOrThrowArgs} args - Arguments to find a Transactions
     * @example
     * // Get one Transactions
     * const transactions = await prisma.transactions.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends transactionsFindFirstOrThrowArgs>(args?: SelectSubset<T, transactionsFindFirstOrThrowArgs<ExtArgs>>): Prisma__transactionsClient<$Result.GetResult<Prisma.$transactionsPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Transactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {transactionsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Transactions
     * const transactions = await prisma.transactions.findMany()
     * 
     * // Get first 10 Transactions
     * const transactions = await prisma.transactions.findMany({ take: 10 })
     * 
     * // Only select the `id_transaction`
     * const transactionsWithId_transactionOnly = await prisma.transactions.findMany({ select: { id_transaction: true } })
     * 
     */
    findMany<T extends transactionsFindManyArgs>(args?: SelectSubset<T, transactionsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$transactionsPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Transactions.
     * @param {transactionsCreateArgs} args - Arguments to create a Transactions.
     * @example
     * // Create one Transactions
     * const Transactions = await prisma.transactions.create({
     *   data: {
     *     // ... data to create a Transactions
     *   }
     * })
     * 
     */
    create<T extends transactionsCreateArgs>(args: SelectSubset<T, transactionsCreateArgs<ExtArgs>>): Prisma__transactionsClient<$Result.GetResult<Prisma.$transactionsPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Transactions.
     * @param {transactionsCreateManyArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transactions = await prisma.transactions.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends transactionsCreateManyArgs>(args?: SelectSubset<T, transactionsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Transactions.
     * @param {transactionsDeleteArgs} args - Arguments to delete one Transactions.
     * @example
     * // Delete one Transactions
     * const Transactions = await prisma.transactions.delete({
     *   where: {
     *     // ... filter to delete one Transactions
     *   }
     * })
     * 
     */
    delete<T extends transactionsDeleteArgs>(args: SelectSubset<T, transactionsDeleteArgs<ExtArgs>>): Prisma__transactionsClient<$Result.GetResult<Prisma.$transactionsPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Transactions.
     * @param {transactionsUpdateArgs} args - Arguments to update one Transactions.
     * @example
     * // Update one Transactions
     * const transactions = await prisma.transactions.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends transactionsUpdateArgs>(args: SelectSubset<T, transactionsUpdateArgs<ExtArgs>>): Prisma__transactionsClient<$Result.GetResult<Prisma.$transactionsPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Transactions.
     * @param {transactionsDeleteManyArgs} args - Arguments to filter Transactions to delete.
     * @example
     * // Delete a few Transactions
     * const { count } = await prisma.transactions.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends transactionsDeleteManyArgs>(args?: SelectSubset<T, transactionsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {transactionsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Transactions
     * const transactions = await prisma.transactions.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends transactionsUpdateManyArgs>(args: SelectSubset<T, transactionsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Transactions.
     * @param {transactionsUpsertArgs} args - Arguments to update or create a Transactions.
     * @example
     * // Update or create a Transactions
     * const transactions = await prisma.transactions.upsert({
     *   create: {
     *     // ... data to create a Transactions
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Transactions we want to update
     *   }
     * })
     */
    upsert<T extends transactionsUpsertArgs>(args: SelectSubset<T, transactionsUpsertArgs<ExtArgs>>): Prisma__transactionsClient<$Result.GetResult<Prisma.$transactionsPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {transactionsCountArgs} args - Arguments to filter Transactions to count.
     * @example
     * // Count the number of Transactions
     * const count = await prisma.transactions.count({
     *   where: {
     *     // ... the filter for the Transactions we want to count
     *   }
     * })
    **/
    count<T extends transactionsCountArgs>(
      args?: Subset<T, transactionsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TransactionsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TransactionsAggregateArgs>(args: Subset<T, TransactionsAggregateArgs>): Prisma.PrismaPromise<GetTransactionsAggregateType<T>>

    /**
     * Group by Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {transactionsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends transactionsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: transactionsGroupByArgs['orderBy'] }
        : { orderBy?: transactionsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, transactionsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTransactionsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the transactions model
   */
  readonly fields: transactionsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for transactions.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__transactionsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    exchange_goals<T extends transactions$exchange_goalsArgs<ExtArgs> = {}>(args?: Subset<T, transactions$exchange_goalsArgs<ExtArgs>>): Prisma__exchange_goalsClient<$Result.GetResult<Prisma.$exchange_goalsPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the transactions model
   */ 
  interface transactionsFieldRefs {
    readonly id_transaction: FieldRef<"transactions", 'String'>
    readonly id_exchange_goal: FieldRef<"transactions", 'String'>
    readonly description: FieldRef<"transactions", 'String'>
    readonly amount_brl: FieldRef<"transactions", 'Decimal'>
    readonly exchange_rate: FieldRef<"transactions", 'Decimal'>
    readonly amount_foreign: FieldRef<"transactions", 'Decimal'>
    readonly platform: FieldRef<"transactions", 'transactions_platform'>
    readonly created_at: FieldRef<"transactions", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * transactions findUnique
   */
  export type transactionsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transactions
     */
    select?: transactionsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transactionsInclude<ExtArgs> | null
    /**
     * Filter, which transactions to fetch.
     */
    where: transactionsWhereUniqueInput
  }

  /**
   * transactions findUniqueOrThrow
   */
  export type transactionsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transactions
     */
    select?: transactionsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transactionsInclude<ExtArgs> | null
    /**
     * Filter, which transactions to fetch.
     */
    where: transactionsWhereUniqueInput
  }

  /**
   * transactions findFirst
   */
  export type transactionsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transactions
     */
    select?: transactionsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transactionsInclude<ExtArgs> | null
    /**
     * Filter, which transactions to fetch.
     */
    where?: transactionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of transactions to fetch.
     */
    orderBy?: transactionsOrderByWithRelationInput | transactionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for transactions.
     */
    cursor?: transactionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of transactions.
     */
    distinct?: TransactionsScalarFieldEnum | TransactionsScalarFieldEnum[]
  }

  /**
   * transactions findFirstOrThrow
   */
  export type transactionsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transactions
     */
    select?: transactionsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transactionsInclude<ExtArgs> | null
    /**
     * Filter, which transactions to fetch.
     */
    where?: transactionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of transactions to fetch.
     */
    orderBy?: transactionsOrderByWithRelationInput | transactionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for transactions.
     */
    cursor?: transactionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of transactions.
     */
    distinct?: TransactionsScalarFieldEnum | TransactionsScalarFieldEnum[]
  }

  /**
   * transactions findMany
   */
  export type transactionsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transactions
     */
    select?: transactionsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transactionsInclude<ExtArgs> | null
    /**
     * Filter, which transactions to fetch.
     */
    where?: transactionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of transactions to fetch.
     */
    orderBy?: transactionsOrderByWithRelationInput | transactionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing transactions.
     */
    cursor?: transactionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` transactions.
     */
    skip?: number
    distinct?: TransactionsScalarFieldEnum | TransactionsScalarFieldEnum[]
  }

  /**
   * transactions create
   */
  export type transactionsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transactions
     */
    select?: transactionsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transactionsInclude<ExtArgs> | null
    /**
     * The data needed to create a transactions.
     */
    data: XOR<transactionsCreateInput, transactionsUncheckedCreateInput>
  }

  /**
   * transactions createMany
   */
  export type transactionsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many transactions.
     */
    data: transactionsCreateManyInput | transactionsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * transactions update
   */
  export type transactionsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transactions
     */
    select?: transactionsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transactionsInclude<ExtArgs> | null
    /**
     * The data needed to update a transactions.
     */
    data: XOR<transactionsUpdateInput, transactionsUncheckedUpdateInput>
    /**
     * Choose, which transactions to update.
     */
    where: transactionsWhereUniqueInput
  }

  /**
   * transactions updateMany
   */
  export type transactionsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update transactions.
     */
    data: XOR<transactionsUpdateManyMutationInput, transactionsUncheckedUpdateManyInput>
    /**
     * Filter which transactions to update
     */
    where?: transactionsWhereInput
  }

  /**
   * transactions upsert
   */
  export type transactionsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transactions
     */
    select?: transactionsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transactionsInclude<ExtArgs> | null
    /**
     * The filter to search for the transactions to update in case it exists.
     */
    where: transactionsWhereUniqueInput
    /**
     * In case the transactions found by the `where` argument doesn't exist, create a new transactions with this data.
     */
    create: XOR<transactionsCreateInput, transactionsUncheckedCreateInput>
    /**
     * In case the transactions was found with the provided `where` argument, update it with this data.
     */
    update: XOR<transactionsUpdateInput, transactionsUncheckedUpdateInput>
  }

  /**
   * transactions delete
   */
  export type transactionsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transactions
     */
    select?: transactionsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transactionsInclude<ExtArgs> | null
    /**
     * Filter which transactions to delete.
     */
    where: transactionsWhereUniqueInput
  }

  /**
   * transactions deleteMany
   */
  export type transactionsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which transactions to delete
     */
    where?: transactionsWhereInput
  }

  /**
   * transactions.exchange_goals
   */
  export type transactions$exchange_goalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the exchange_goals
     */
    select?: exchange_goalsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: exchange_goalsInclude<ExtArgs> | null
    where?: exchange_goalsWhereInput
  }

  /**
   * transactions without action
   */
  export type transactionsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transactions
     */
    select?: transactionsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transactionsInclude<ExtArgs> | null
  }


  /**
   * Model users
   */

  export type AggregateUsers = {
    _count: UsersCountAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  export type UsersMinAggregateOutputType = {
    id_user: string | null
    name: string | null
    email: string | null
    password: string | null
    created_at: Date | null
    update_at: Date | null
  }

  export type UsersMaxAggregateOutputType = {
    id_user: string | null
    name: string | null
    email: string | null
    password: string | null
    created_at: Date | null
    update_at: Date | null
  }

  export type UsersCountAggregateOutputType = {
    id_user: number
    name: number
    email: number
    password: number
    created_at: number
    update_at: number
    _all: number
  }


  export type UsersMinAggregateInputType = {
    id_user?: true
    name?: true
    email?: true
    password?: true
    created_at?: true
    update_at?: true
  }

  export type UsersMaxAggregateInputType = {
    id_user?: true
    name?: true
    email?: true
    password?: true
    created_at?: true
    update_at?: true
  }

  export type UsersCountAggregateInputType = {
    id_user?: true
    name?: true
    email?: true
    password?: true
    created_at?: true
    update_at?: true
    _all?: true
  }

  export type UsersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to aggregate.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UsersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsersMaxAggregateInputType
  }

  export type GetUsersAggregateType<T extends UsersAggregateArgs> = {
        [P in keyof T & keyof AggregateUsers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsers[P]>
      : GetScalarType<T[P], AggregateUsers[P]>
  }




  export type usersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: usersWhereInput
    orderBy?: usersOrderByWithAggregationInput | usersOrderByWithAggregationInput[]
    by: UsersScalarFieldEnum[] | UsersScalarFieldEnum
    having?: usersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsersCountAggregateInputType | true
    _min?: UsersMinAggregateInputType
    _max?: UsersMaxAggregateInputType
  }

  export type UsersGroupByOutputType = {
    id_user: string
    name: string
    email: string
    password: string
    created_at: Date | null
    update_at: Date | null
    _count: UsersCountAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  type GetUsersGroupByPayload<T extends usersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsersGroupByOutputType[P]>
            : GetScalarType<T[P], UsersGroupByOutputType[P]>
        }
      >
    >


  export type usersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_user?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    created_at?: boolean
    update_at?: boolean
    exchange_goals?: boolean | users$exchange_goalsArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["users"]>


  export type usersSelectScalar = {
    id_user?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    created_at?: boolean
    update_at?: boolean
  }

  export type usersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    exchange_goals?: boolean | users$exchange_goalsArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $usersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "users"
    objects: {
      exchange_goals: Prisma.$exchange_goalsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id_user: string
      name: string
      email: string
      password: string
      created_at: Date | null
      update_at: Date | null
    }, ExtArgs["result"]["users"]>
    composites: {}
  }

  type usersGetPayload<S extends boolean | null | undefined | usersDefaultArgs> = $Result.GetResult<Prisma.$usersPayload, S>

  type usersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<usersFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UsersCountAggregateInputType | true
    }

  export interface usersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['users'], meta: { name: 'users' } }
    /**
     * Find zero or one Users that matches the filter.
     * @param {usersFindUniqueArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends usersFindUniqueArgs>(args: SelectSubset<T, usersFindUniqueArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Users that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {usersFindUniqueOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends usersFindUniqueOrThrowArgs>(args: SelectSubset<T, usersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends usersFindFirstArgs>(args?: SelectSubset<T, usersFindFirstArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Users that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends usersFindFirstOrThrowArgs>(args?: SelectSubset<T, usersFindFirstOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.users.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.users.findMany({ take: 10 })
     * 
     * // Only select the `id_user`
     * const usersWithId_userOnly = await prisma.users.findMany({ select: { id_user: true } })
     * 
     */
    findMany<T extends usersFindManyArgs>(args?: SelectSubset<T, usersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Users.
     * @param {usersCreateArgs} args - Arguments to create a Users.
     * @example
     * // Create one Users
     * const Users = await prisma.users.create({
     *   data: {
     *     // ... data to create a Users
     *   }
     * })
     * 
     */
    create<T extends usersCreateArgs>(args: SelectSubset<T, usersCreateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {usersCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends usersCreateManyArgs>(args?: SelectSubset<T, usersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Users.
     * @param {usersDeleteArgs} args - Arguments to delete one Users.
     * @example
     * // Delete one Users
     * const Users = await prisma.users.delete({
     *   where: {
     *     // ... filter to delete one Users
     *   }
     * })
     * 
     */
    delete<T extends usersDeleteArgs>(args: SelectSubset<T, usersDeleteArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Users.
     * @param {usersUpdateArgs} args - Arguments to update one Users.
     * @example
     * // Update one Users
     * const users = await prisma.users.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends usersUpdateArgs>(args: SelectSubset<T, usersUpdateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {usersDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.users.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends usersDeleteManyArgs>(args?: SelectSubset<T, usersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends usersUpdateManyArgs>(args: SelectSubset<T, usersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Users.
     * @param {usersUpsertArgs} args - Arguments to update or create a Users.
     * @example
     * // Update or create a Users
     * const users = await prisma.users.upsert({
     *   create: {
     *     // ... data to create a Users
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Users we want to update
     *   }
     * })
     */
    upsert<T extends usersUpsertArgs>(args: SelectSubset<T, usersUpsertArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.users.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends usersCountArgs>(
      args?: Subset<T, usersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsersAggregateArgs>(args: Subset<T, UsersAggregateArgs>): Prisma.PrismaPromise<GetUsersAggregateType<T>>

    /**
     * Group by Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends usersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: usersGroupByArgs['orderBy'] }
        : { orderBy?: usersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, usersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the users model
   */
  readonly fields: usersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for users.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__usersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    exchange_goals<T extends users$exchange_goalsArgs<ExtArgs> = {}>(args?: Subset<T, users$exchange_goalsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$exchange_goalsPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the users model
   */ 
  interface usersFieldRefs {
    readonly id_user: FieldRef<"users", 'String'>
    readonly name: FieldRef<"users", 'String'>
    readonly email: FieldRef<"users", 'String'>
    readonly password: FieldRef<"users", 'String'>
    readonly created_at: FieldRef<"users", 'DateTime'>
    readonly update_at: FieldRef<"users", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * users findUnique
   */
  export type usersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findUniqueOrThrow
   */
  export type usersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findFirst
   */
  export type usersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findFirstOrThrow
   */
  export type usersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findMany
   */
  export type usersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users create
   */
  export type usersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to create a users.
     */
    data: XOR<usersCreateInput, usersUncheckedCreateInput>
  }

  /**
   * users createMany
   */
  export type usersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * users update
   */
  export type usersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to update a users.
     */
    data: XOR<usersUpdateInput, usersUncheckedUpdateInput>
    /**
     * Choose, which users to update.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users updateMany
   */
  export type usersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
  }

  /**
   * users upsert
   */
  export type usersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The filter to search for the users to update in case it exists.
     */
    where: usersWhereUniqueInput
    /**
     * In case the users found by the `where` argument doesn't exist, create a new users with this data.
     */
    create: XOR<usersCreateInput, usersUncheckedCreateInput>
    /**
     * In case the users was found with the provided `where` argument, update it with this data.
     */
    update: XOR<usersUpdateInput, usersUncheckedUpdateInput>
  }

  /**
   * users delete
   */
  export type usersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter which users to delete.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users deleteMany
   */
  export type usersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to delete
     */
    where?: usersWhereInput
  }

  /**
   * users.exchange_goals
   */
  export type users$exchange_goalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the exchange_goals
     */
    select?: exchange_goalsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: exchange_goalsInclude<ExtArgs> | null
    where?: exchange_goalsWhereInput
    orderBy?: exchange_goalsOrderByWithRelationInput | exchange_goalsOrderByWithRelationInput[]
    cursor?: exchange_goalsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Exchange_goalsScalarFieldEnum | Exchange_goalsScalarFieldEnum[]
  }

  /**
   * users without action
   */
  export type usersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const Checklist_itemsScalarFieldEnum: {
    id_checklist_item: 'id_checklist_item',
    id_exchange_goal: 'id_exchange_goal',
    title: 'title',
    description: 'description',
    status: 'status',
    due_date: 'due_date',
    created_at: 'created_at'
  };

  export type Checklist_itemsScalarFieldEnum = (typeof Checklist_itemsScalarFieldEnum)[keyof typeof Checklist_itemsScalarFieldEnum]


  export const Exchange_goalsScalarFieldEnum: {
    id_exchange_goal: 'id_exchange_goal',
    id_user: 'id_user',
    destination: 'destination',
    target_currency: 'target_currency',
    amount_needed: 'amount_needed',
    deadline: 'deadline',
    created_at: 'created_at'
  };

  export type Exchange_goalsScalarFieldEnum = (typeof Exchange_goalsScalarFieldEnum)[keyof typeof Exchange_goalsScalarFieldEnum]


  export const TransactionsScalarFieldEnum: {
    id_transaction: 'id_transaction',
    id_exchange_goal: 'id_exchange_goal',
    description: 'description',
    amount_brl: 'amount_brl',
    exchange_rate: 'exchange_rate',
    amount_foreign: 'amount_foreign',
    platform: 'platform',
    created_at: 'created_at'
  };

  export type TransactionsScalarFieldEnum = (typeof TransactionsScalarFieldEnum)[keyof typeof TransactionsScalarFieldEnum]


  export const UsersScalarFieldEnum: {
    id_user: 'id_user',
    name: 'name',
    email: 'email',
    password: 'password',
    created_at: 'created_at',
    update_at: 'update_at'
  };

  export type UsersScalarFieldEnum = (typeof UsersScalarFieldEnum)[keyof typeof UsersScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'checklist_items_status'
   */
  export type Enumchecklist_items_statusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'checklist_items_status'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'transactions_platform'
   */
  export type Enumtransactions_platformFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'transactions_platform'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    
  /**
   * Deep Input Types
   */


  export type checklist_itemsWhereInput = {
    AND?: checklist_itemsWhereInput | checklist_itemsWhereInput[]
    OR?: checklist_itemsWhereInput[]
    NOT?: checklist_itemsWhereInput | checklist_itemsWhereInput[]
    id_checklist_item?: StringFilter<"checklist_items"> | string
    id_exchange_goal?: StringNullableFilter<"checklist_items"> | string | null
    title?: StringFilter<"checklist_items"> | string
    description?: StringNullableFilter<"checklist_items"> | string | null
    status?: Enumchecklist_items_statusNullableFilter<"checklist_items"> | $Enums.checklist_items_status | null
    due_date?: DateTimeNullableFilter<"checklist_items"> | Date | string | null
    created_at?: DateTimeNullableFilter<"checklist_items"> | Date | string | null
    exchange_goals?: XOR<Exchange_goalsNullableRelationFilter, exchange_goalsWhereInput> | null
  }

  export type checklist_itemsOrderByWithRelationInput = {
    id_checklist_item?: SortOrder
    id_exchange_goal?: SortOrderInput | SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    due_date?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    exchange_goals?: exchange_goalsOrderByWithRelationInput
  }

  export type checklist_itemsWhereUniqueInput = Prisma.AtLeast<{
    id_checklist_item?: string
    AND?: checklist_itemsWhereInput | checklist_itemsWhereInput[]
    OR?: checklist_itemsWhereInput[]
    NOT?: checklist_itemsWhereInput | checklist_itemsWhereInput[]
    id_exchange_goal?: StringNullableFilter<"checklist_items"> | string | null
    title?: StringFilter<"checklist_items"> | string
    description?: StringNullableFilter<"checklist_items"> | string | null
    status?: Enumchecklist_items_statusNullableFilter<"checklist_items"> | $Enums.checklist_items_status | null
    due_date?: DateTimeNullableFilter<"checklist_items"> | Date | string | null
    created_at?: DateTimeNullableFilter<"checklist_items"> | Date | string | null
    exchange_goals?: XOR<Exchange_goalsNullableRelationFilter, exchange_goalsWhereInput> | null
  }, "id_checklist_item">

  export type checklist_itemsOrderByWithAggregationInput = {
    id_checklist_item?: SortOrder
    id_exchange_goal?: SortOrderInput | SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    due_date?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    _count?: checklist_itemsCountOrderByAggregateInput
    _max?: checklist_itemsMaxOrderByAggregateInput
    _min?: checklist_itemsMinOrderByAggregateInput
  }

  export type checklist_itemsScalarWhereWithAggregatesInput = {
    AND?: checklist_itemsScalarWhereWithAggregatesInput | checklist_itemsScalarWhereWithAggregatesInput[]
    OR?: checklist_itemsScalarWhereWithAggregatesInput[]
    NOT?: checklist_itemsScalarWhereWithAggregatesInput | checklist_itemsScalarWhereWithAggregatesInput[]
    id_checklist_item?: StringWithAggregatesFilter<"checklist_items"> | string
    id_exchange_goal?: StringNullableWithAggregatesFilter<"checklist_items"> | string | null
    title?: StringWithAggregatesFilter<"checklist_items"> | string
    description?: StringNullableWithAggregatesFilter<"checklist_items"> | string | null
    status?: Enumchecklist_items_statusNullableWithAggregatesFilter<"checklist_items"> | $Enums.checklist_items_status | null
    due_date?: DateTimeNullableWithAggregatesFilter<"checklist_items"> | Date | string | null
    created_at?: DateTimeNullableWithAggregatesFilter<"checklist_items"> | Date | string | null
  }

  export type exchange_goalsWhereInput = {
    AND?: exchange_goalsWhereInput | exchange_goalsWhereInput[]
    OR?: exchange_goalsWhereInput[]
    NOT?: exchange_goalsWhereInput | exchange_goalsWhereInput[]
    id_exchange_goal?: StringFilter<"exchange_goals"> | string
    id_user?: StringNullableFilter<"exchange_goals"> | string | null
    destination?: StringFilter<"exchange_goals"> | string
    target_currency?: StringFilter<"exchange_goals"> | string
    amount_needed?: DecimalFilter<"exchange_goals"> | Decimal | DecimalJsLike | number | string
    deadline?: DateTimeFilter<"exchange_goals"> | Date | string
    created_at?: DateTimeNullableFilter<"exchange_goals"> | Date | string | null
    checklist_items?: Checklist_itemsListRelationFilter
    users?: XOR<UsersNullableRelationFilter, usersWhereInput> | null
    transactions?: TransactionsListRelationFilter
  }

  export type exchange_goalsOrderByWithRelationInput = {
    id_exchange_goal?: SortOrder
    id_user?: SortOrderInput | SortOrder
    destination?: SortOrder
    target_currency?: SortOrder
    amount_needed?: SortOrder
    deadline?: SortOrder
    created_at?: SortOrderInput | SortOrder
    checklist_items?: checklist_itemsOrderByRelationAggregateInput
    users?: usersOrderByWithRelationInput
    transactions?: transactionsOrderByRelationAggregateInput
  }

  export type exchange_goalsWhereUniqueInput = Prisma.AtLeast<{
    id_exchange_goal?: string
    AND?: exchange_goalsWhereInput | exchange_goalsWhereInput[]
    OR?: exchange_goalsWhereInput[]
    NOT?: exchange_goalsWhereInput | exchange_goalsWhereInput[]
    id_user?: StringNullableFilter<"exchange_goals"> | string | null
    destination?: StringFilter<"exchange_goals"> | string
    target_currency?: StringFilter<"exchange_goals"> | string
    amount_needed?: DecimalFilter<"exchange_goals"> | Decimal | DecimalJsLike | number | string
    deadline?: DateTimeFilter<"exchange_goals"> | Date | string
    created_at?: DateTimeNullableFilter<"exchange_goals"> | Date | string | null
    checklist_items?: Checklist_itemsListRelationFilter
    users?: XOR<UsersNullableRelationFilter, usersWhereInput> | null
    transactions?: TransactionsListRelationFilter
  }, "id_exchange_goal">

  export type exchange_goalsOrderByWithAggregationInput = {
    id_exchange_goal?: SortOrder
    id_user?: SortOrderInput | SortOrder
    destination?: SortOrder
    target_currency?: SortOrder
    amount_needed?: SortOrder
    deadline?: SortOrder
    created_at?: SortOrderInput | SortOrder
    _count?: exchange_goalsCountOrderByAggregateInput
    _avg?: exchange_goalsAvgOrderByAggregateInput
    _max?: exchange_goalsMaxOrderByAggregateInput
    _min?: exchange_goalsMinOrderByAggregateInput
    _sum?: exchange_goalsSumOrderByAggregateInput
  }

  export type exchange_goalsScalarWhereWithAggregatesInput = {
    AND?: exchange_goalsScalarWhereWithAggregatesInput | exchange_goalsScalarWhereWithAggregatesInput[]
    OR?: exchange_goalsScalarWhereWithAggregatesInput[]
    NOT?: exchange_goalsScalarWhereWithAggregatesInput | exchange_goalsScalarWhereWithAggregatesInput[]
    id_exchange_goal?: StringWithAggregatesFilter<"exchange_goals"> | string
    id_user?: StringNullableWithAggregatesFilter<"exchange_goals"> | string | null
    destination?: StringWithAggregatesFilter<"exchange_goals"> | string
    target_currency?: StringWithAggregatesFilter<"exchange_goals"> | string
    amount_needed?: DecimalWithAggregatesFilter<"exchange_goals"> | Decimal | DecimalJsLike | number | string
    deadline?: DateTimeWithAggregatesFilter<"exchange_goals"> | Date | string
    created_at?: DateTimeNullableWithAggregatesFilter<"exchange_goals"> | Date | string | null
  }

  export type transactionsWhereInput = {
    AND?: transactionsWhereInput | transactionsWhereInput[]
    OR?: transactionsWhereInput[]
    NOT?: transactionsWhereInput | transactionsWhereInput[]
    id_transaction?: StringFilter<"transactions"> | string
    id_exchange_goal?: StringNullableFilter<"transactions"> | string | null
    description?: StringFilter<"transactions"> | string
    amount_brl?: DecimalFilter<"transactions"> | Decimal | DecimalJsLike | number | string
    exchange_rate?: DecimalFilter<"transactions"> | Decimal | DecimalJsLike | number | string
    amount_foreign?: DecimalFilter<"transactions"> | Decimal | DecimalJsLike | number | string
    platform?: Enumtransactions_platformNullableFilter<"transactions"> | $Enums.transactions_platform | null
    created_at?: DateTimeNullableFilter<"transactions"> | Date | string | null
    exchange_goals?: XOR<Exchange_goalsNullableRelationFilter, exchange_goalsWhereInput> | null
  }

  export type transactionsOrderByWithRelationInput = {
    id_transaction?: SortOrder
    id_exchange_goal?: SortOrderInput | SortOrder
    description?: SortOrder
    amount_brl?: SortOrder
    exchange_rate?: SortOrder
    amount_foreign?: SortOrder
    platform?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    exchange_goals?: exchange_goalsOrderByWithRelationInput
  }

  export type transactionsWhereUniqueInput = Prisma.AtLeast<{
    id_transaction?: string
    AND?: transactionsWhereInput | transactionsWhereInput[]
    OR?: transactionsWhereInput[]
    NOT?: transactionsWhereInput | transactionsWhereInput[]
    id_exchange_goal?: StringNullableFilter<"transactions"> | string | null
    description?: StringFilter<"transactions"> | string
    amount_brl?: DecimalFilter<"transactions"> | Decimal | DecimalJsLike | number | string
    exchange_rate?: DecimalFilter<"transactions"> | Decimal | DecimalJsLike | number | string
    amount_foreign?: DecimalFilter<"transactions"> | Decimal | DecimalJsLike | number | string
    platform?: Enumtransactions_platformNullableFilter<"transactions"> | $Enums.transactions_platform | null
    created_at?: DateTimeNullableFilter<"transactions"> | Date | string | null
    exchange_goals?: XOR<Exchange_goalsNullableRelationFilter, exchange_goalsWhereInput> | null
  }, "id_transaction">

  export type transactionsOrderByWithAggregationInput = {
    id_transaction?: SortOrder
    id_exchange_goal?: SortOrderInput | SortOrder
    description?: SortOrder
    amount_brl?: SortOrder
    exchange_rate?: SortOrder
    amount_foreign?: SortOrder
    platform?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    _count?: transactionsCountOrderByAggregateInput
    _avg?: transactionsAvgOrderByAggregateInput
    _max?: transactionsMaxOrderByAggregateInput
    _min?: transactionsMinOrderByAggregateInput
    _sum?: transactionsSumOrderByAggregateInput
  }

  export type transactionsScalarWhereWithAggregatesInput = {
    AND?: transactionsScalarWhereWithAggregatesInput | transactionsScalarWhereWithAggregatesInput[]
    OR?: transactionsScalarWhereWithAggregatesInput[]
    NOT?: transactionsScalarWhereWithAggregatesInput | transactionsScalarWhereWithAggregatesInput[]
    id_transaction?: StringWithAggregatesFilter<"transactions"> | string
    id_exchange_goal?: StringNullableWithAggregatesFilter<"transactions"> | string | null
    description?: StringWithAggregatesFilter<"transactions"> | string
    amount_brl?: DecimalWithAggregatesFilter<"transactions"> | Decimal | DecimalJsLike | number | string
    exchange_rate?: DecimalWithAggregatesFilter<"transactions"> | Decimal | DecimalJsLike | number | string
    amount_foreign?: DecimalWithAggregatesFilter<"transactions"> | Decimal | DecimalJsLike | number | string
    platform?: Enumtransactions_platformNullableWithAggregatesFilter<"transactions"> | $Enums.transactions_platform | null
    created_at?: DateTimeNullableWithAggregatesFilter<"transactions"> | Date | string | null
  }

  export type usersWhereInput = {
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    id_user?: StringFilter<"users"> | string
    name?: StringFilter<"users"> | string
    email?: StringFilter<"users"> | string
    password?: StringFilter<"users"> | string
    created_at?: DateTimeNullableFilter<"users"> | Date | string | null
    update_at?: DateTimeNullableFilter<"users"> | Date | string | null
    exchange_goals?: Exchange_goalsListRelationFilter
  }

  export type usersOrderByWithRelationInput = {
    id_user?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    created_at?: SortOrderInput | SortOrder
    update_at?: SortOrderInput | SortOrder
    exchange_goals?: exchange_goalsOrderByRelationAggregateInput
  }

  export type usersWhereUniqueInput = Prisma.AtLeast<{
    id_user?: string
    email?: string
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    name?: StringFilter<"users"> | string
    password?: StringFilter<"users"> | string
    created_at?: DateTimeNullableFilter<"users"> | Date | string | null
    update_at?: DateTimeNullableFilter<"users"> | Date | string | null
    exchange_goals?: Exchange_goalsListRelationFilter
  }, "id_user" | "email">

  export type usersOrderByWithAggregationInput = {
    id_user?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    created_at?: SortOrderInput | SortOrder
    update_at?: SortOrderInput | SortOrder
    _count?: usersCountOrderByAggregateInput
    _max?: usersMaxOrderByAggregateInput
    _min?: usersMinOrderByAggregateInput
  }

  export type usersScalarWhereWithAggregatesInput = {
    AND?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    OR?: usersScalarWhereWithAggregatesInput[]
    NOT?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    id_user?: StringWithAggregatesFilter<"users"> | string
    name?: StringWithAggregatesFilter<"users"> | string
    email?: StringWithAggregatesFilter<"users"> | string
    password?: StringWithAggregatesFilter<"users"> | string
    created_at?: DateTimeNullableWithAggregatesFilter<"users"> | Date | string | null
    update_at?: DateTimeNullableWithAggregatesFilter<"users"> | Date | string | null
  }

  export type checklist_itemsCreateInput = {
    id_checklist_item?: string
    title: string
    description?: string | null
    status?: $Enums.checklist_items_status | null
    due_date?: Date | string | null
    created_at?: Date | string | null
    exchange_goals?: exchange_goalsCreateNestedOneWithoutChecklist_itemsInput
  }

  export type checklist_itemsUncheckedCreateInput = {
    id_checklist_item?: string
    id_exchange_goal?: string | null
    title: string
    description?: string | null
    status?: $Enums.checklist_items_status | null
    due_date?: Date | string | null
    created_at?: Date | string | null
  }

  export type checklist_itemsUpdateInput = {
    id_checklist_item?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableEnumchecklist_items_statusFieldUpdateOperationsInput | $Enums.checklist_items_status | null
    due_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    exchange_goals?: exchange_goalsUpdateOneWithoutChecklist_itemsNestedInput
  }

  export type checklist_itemsUncheckedUpdateInput = {
    id_checklist_item?: StringFieldUpdateOperationsInput | string
    id_exchange_goal?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableEnumchecklist_items_statusFieldUpdateOperationsInput | $Enums.checklist_items_status | null
    due_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type checklist_itemsCreateManyInput = {
    id_checklist_item?: string
    id_exchange_goal?: string | null
    title: string
    description?: string | null
    status?: $Enums.checklist_items_status | null
    due_date?: Date | string | null
    created_at?: Date | string | null
  }

  export type checklist_itemsUpdateManyMutationInput = {
    id_checklist_item?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableEnumchecklist_items_statusFieldUpdateOperationsInput | $Enums.checklist_items_status | null
    due_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type checklist_itemsUncheckedUpdateManyInput = {
    id_checklist_item?: StringFieldUpdateOperationsInput | string
    id_exchange_goal?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableEnumchecklist_items_statusFieldUpdateOperationsInput | $Enums.checklist_items_status | null
    due_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type exchange_goalsCreateInput = {
    id_exchange_goal?: string
    destination: string
    target_currency: string
    amount_needed: Decimal | DecimalJsLike | number | string
    deadline: Date | string
    created_at?: Date | string | null
    checklist_items?: checklist_itemsCreateNestedManyWithoutExchange_goalsInput
    users?: usersCreateNestedOneWithoutExchange_goalsInput
    transactions?: transactionsCreateNestedManyWithoutExchange_goalsInput
  }

  export type exchange_goalsUncheckedCreateInput = {
    id_exchange_goal?: string
    id_user?: string | null
    destination: string
    target_currency: string
    amount_needed: Decimal | DecimalJsLike | number | string
    deadline: Date | string
    created_at?: Date | string | null
    checklist_items?: checklist_itemsUncheckedCreateNestedManyWithoutExchange_goalsInput
    transactions?: transactionsUncheckedCreateNestedManyWithoutExchange_goalsInput
  }

  export type exchange_goalsUpdateInput = {
    id_exchange_goal?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    target_currency?: StringFieldUpdateOperationsInput | string
    amount_needed?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checklist_items?: checklist_itemsUpdateManyWithoutExchange_goalsNestedInput
    users?: usersUpdateOneWithoutExchange_goalsNestedInput
    transactions?: transactionsUpdateManyWithoutExchange_goalsNestedInput
  }

  export type exchange_goalsUncheckedUpdateInput = {
    id_exchange_goal?: StringFieldUpdateOperationsInput | string
    id_user?: NullableStringFieldUpdateOperationsInput | string | null
    destination?: StringFieldUpdateOperationsInput | string
    target_currency?: StringFieldUpdateOperationsInput | string
    amount_needed?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checklist_items?: checklist_itemsUncheckedUpdateManyWithoutExchange_goalsNestedInput
    transactions?: transactionsUncheckedUpdateManyWithoutExchange_goalsNestedInput
  }

  export type exchange_goalsCreateManyInput = {
    id_exchange_goal?: string
    id_user?: string | null
    destination: string
    target_currency: string
    amount_needed: Decimal | DecimalJsLike | number | string
    deadline: Date | string
    created_at?: Date | string | null
  }

  export type exchange_goalsUpdateManyMutationInput = {
    id_exchange_goal?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    target_currency?: StringFieldUpdateOperationsInput | string
    amount_needed?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type exchange_goalsUncheckedUpdateManyInput = {
    id_exchange_goal?: StringFieldUpdateOperationsInput | string
    id_user?: NullableStringFieldUpdateOperationsInput | string | null
    destination?: StringFieldUpdateOperationsInput | string
    target_currency?: StringFieldUpdateOperationsInput | string
    amount_needed?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type transactionsCreateInput = {
    id_transaction?: string
    description: string
    amount_brl: Decimal | DecimalJsLike | number | string
    exchange_rate: Decimal | DecimalJsLike | number | string
    amount_foreign: Decimal | DecimalJsLike | number | string
    platform?: $Enums.transactions_platform | null
    created_at?: Date | string | null
    exchange_goals?: exchange_goalsCreateNestedOneWithoutTransactionsInput
  }

  export type transactionsUncheckedCreateInput = {
    id_transaction?: string
    id_exchange_goal?: string | null
    description: string
    amount_brl: Decimal | DecimalJsLike | number | string
    exchange_rate: Decimal | DecimalJsLike | number | string
    amount_foreign: Decimal | DecimalJsLike | number | string
    platform?: $Enums.transactions_platform | null
    created_at?: Date | string | null
  }

  export type transactionsUpdateInput = {
    id_transaction?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    amount_brl?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    exchange_rate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amount_foreign?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    platform?: NullableEnumtransactions_platformFieldUpdateOperationsInput | $Enums.transactions_platform | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    exchange_goals?: exchange_goalsUpdateOneWithoutTransactionsNestedInput
  }

  export type transactionsUncheckedUpdateInput = {
    id_transaction?: StringFieldUpdateOperationsInput | string
    id_exchange_goal?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    amount_brl?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    exchange_rate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amount_foreign?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    platform?: NullableEnumtransactions_platformFieldUpdateOperationsInput | $Enums.transactions_platform | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type transactionsCreateManyInput = {
    id_transaction?: string
    id_exchange_goal?: string | null
    description: string
    amount_brl: Decimal | DecimalJsLike | number | string
    exchange_rate: Decimal | DecimalJsLike | number | string
    amount_foreign: Decimal | DecimalJsLike | number | string
    platform?: $Enums.transactions_platform | null
    created_at?: Date | string | null
  }

  export type transactionsUpdateManyMutationInput = {
    id_transaction?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    amount_brl?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    exchange_rate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amount_foreign?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    platform?: NullableEnumtransactions_platformFieldUpdateOperationsInput | $Enums.transactions_platform | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type transactionsUncheckedUpdateManyInput = {
    id_transaction?: StringFieldUpdateOperationsInput | string
    id_exchange_goal?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    amount_brl?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    exchange_rate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amount_foreign?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    platform?: NullableEnumtransactions_platformFieldUpdateOperationsInput | $Enums.transactions_platform | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type usersCreateInput = {
    id_user?: string
    name: string
    email: string
    password: string
    created_at?: Date | string | null
    update_at?: Date | string | null
    exchange_goals?: exchange_goalsCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateInput = {
    id_user?: string
    name: string
    email: string
    password: string
    created_at?: Date | string | null
    update_at?: Date | string | null
    exchange_goals?: exchange_goalsUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersUpdateInput = {
    id_user?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    update_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    exchange_goals?: exchange_goalsUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateInput = {
    id_user?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    update_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    exchange_goals?: exchange_goalsUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type usersCreateManyInput = {
    id_user?: string
    name: string
    email: string
    password: string
    created_at?: Date | string | null
    update_at?: Date | string | null
  }

  export type usersUpdateManyMutationInput = {
    id_user?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    update_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type usersUncheckedUpdateManyInput = {
    id_user?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    update_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type Enumchecklist_items_statusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.checklist_items_status | Enumchecklist_items_statusFieldRefInput<$PrismaModel> | null
    in?: $Enums.checklist_items_status[] | null
    notIn?: $Enums.checklist_items_status[] | null
    not?: NestedEnumchecklist_items_statusNullableFilter<$PrismaModel> | $Enums.checklist_items_status | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type Exchange_goalsNullableRelationFilter = {
    is?: exchange_goalsWhereInput | null
    isNot?: exchange_goalsWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type checklist_itemsCountOrderByAggregateInput = {
    id_checklist_item?: SortOrder
    id_exchange_goal?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    due_date?: SortOrder
    created_at?: SortOrder
  }

  export type checklist_itemsMaxOrderByAggregateInput = {
    id_checklist_item?: SortOrder
    id_exchange_goal?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    due_date?: SortOrder
    created_at?: SortOrder
  }

  export type checklist_itemsMinOrderByAggregateInput = {
    id_checklist_item?: SortOrder
    id_exchange_goal?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    due_date?: SortOrder
    created_at?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type Enumchecklist_items_statusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.checklist_items_status | Enumchecklist_items_statusFieldRefInput<$PrismaModel> | null
    in?: $Enums.checklist_items_status[] | null
    notIn?: $Enums.checklist_items_status[] | null
    not?: NestedEnumchecklist_items_statusNullableWithAggregatesFilter<$PrismaModel> | $Enums.checklist_items_status | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumchecklist_items_statusNullableFilter<$PrismaModel>
    _max?: NestedEnumchecklist_items_statusNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type Checklist_itemsListRelationFilter = {
    every?: checklist_itemsWhereInput
    some?: checklist_itemsWhereInput
    none?: checklist_itemsWhereInput
  }

  export type UsersNullableRelationFilter = {
    is?: usersWhereInput | null
    isNot?: usersWhereInput | null
  }

  export type TransactionsListRelationFilter = {
    every?: transactionsWhereInput
    some?: transactionsWhereInput
    none?: transactionsWhereInput
  }

  export type checklist_itemsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type transactionsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type exchange_goalsCountOrderByAggregateInput = {
    id_exchange_goal?: SortOrder
    id_user?: SortOrder
    destination?: SortOrder
    target_currency?: SortOrder
    amount_needed?: SortOrder
    deadline?: SortOrder
    created_at?: SortOrder
  }

  export type exchange_goalsAvgOrderByAggregateInput = {
    amount_needed?: SortOrder
  }

  export type exchange_goalsMaxOrderByAggregateInput = {
    id_exchange_goal?: SortOrder
    id_user?: SortOrder
    destination?: SortOrder
    target_currency?: SortOrder
    amount_needed?: SortOrder
    deadline?: SortOrder
    created_at?: SortOrder
  }

  export type exchange_goalsMinOrderByAggregateInput = {
    id_exchange_goal?: SortOrder
    id_user?: SortOrder
    destination?: SortOrder
    target_currency?: SortOrder
    amount_needed?: SortOrder
    deadline?: SortOrder
    created_at?: SortOrder
  }

  export type exchange_goalsSumOrderByAggregateInput = {
    amount_needed?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type Enumtransactions_platformNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.transactions_platform | Enumtransactions_platformFieldRefInput<$PrismaModel> | null
    in?: $Enums.transactions_platform[] | null
    notIn?: $Enums.transactions_platform[] | null
    not?: NestedEnumtransactions_platformNullableFilter<$PrismaModel> | $Enums.transactions_platform | null
  }

  export type transactionsCountOrderByAggregateInput = {
    id_transaction?: SortOrder
    id_exchange_goal?: SortOrder
    description?: SortOrder
    amount_brl?: SortOrder
    exchange_rate?: SortOrder
    amount_foreign?: SortOrder
    platform?: SortOrder
    created_at?: SortOrder
  }

  export type transactionsAvgOrderByAggregateInput = {
    amount_brl?: SortOrder
    exchange_rate?: SortOrder
    amount_foreign?: SortOrder
  }

  export type transactionsMaxOrderByAggregateInput = {
    id_transaction?: SortOrder
    id_exchange_goal?: SortOrder
    description?: SortOrder
    amount_brl?: SortOrder
    exchange_rate?: SortOrder
    amount_foreign?: SortOrder
    platform?: SortOrder
    created_at?: SortOrder
  }

  export type transactionsMinOrderByAggregateInput = {
    id_transaction?: SortOrder
    id_exchange_goal?: SortOrder
    description?: SortOrder
    amount_brl?: SortOrder
    exchange_rate?: SortOrder
    amount_foreign?: SortOrder
    platform?: SortOrder
    created_at?: SortOrder
  }

  export type transactionsSumOrderByAggregateInput = {
    amount_brl?: SortOrder
    exchange_rate?: SortOrder
    amount_foreign?: SortOrder
  }

  export type Enumtransactions_platformNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.transactions_platform | Enumtransactions_platformFieldRefInput<$PrismaModel> | null
    in?: $Enums.transactions_platform[] | null
    notIn?: $Enums.transactions_platform[] | null
    not?: NestedEnumtransactions_platformNullableWithAggregatesFilter<$PrismaModel> | $Enums.transactions_platform | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumtransactions_platformNullableFilter<$PrismaModel>
    _max?: NestedEnumtransactions_platformNullableFilter<$PrismaModel>
  }

  export type Exchange_goalsListRelationFilter = {
    every?: exchange_goalsWhereInput
    some?: exchange_goalsWhereInput
    none?: exchange_goalsWhereInput
  }

  export type exchange_goalsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type usersCountOrderByAggregateInput = {
    id_user?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    created_at?: SortOrder
    update_at?: SortOrder
  }

  export type usersMaxOrderByAggregateInput = {
    id_user?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    created_at?: SortOrder
    update_at?: SortOrder
  }

  export type usersMinOrderByAggregateInput = {
    id_user?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    created_at?: SortOrder
    update_at?: SortOrder
  }

  export type exchange_goalsCreateNestedOneWithoutChecklist_itemsInput = {
    create?: XOR<exchange_goalsCreateWithoutChecklist_itemsInput, exchange_goalsUncheckedCreateWithoutChecklist_itemsInput>
    connectOrCreate?: exchange_goalsCreateOrConnectWithoutChecklist_itemsInput
    connect?: exchange_goalsWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableEnumchecklist_items_statusFieldUpdateOperationsInput = {
    set?: $Enums.checklist_items_status | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type exchange_goalsUpdateOneWithoutChecklist_itemsNestedInput = {
    create?: XOR<exchange_goalsCreateWithoutChecklist_itemsInput, exchange_goalsUncheckedCreateWithoutChecklist_itemsInput>
    connectOrCreate?: exchange_goalsCreateOrConnectWithoutChecklist_itemsInput
    upsert?: exchange_goalsUpsertWithoutChecklist_itemsInput
    disconnect?: exchange_goalsWhereInput | boolean
    delete?: exchange_goalsWhereInput | boolean
    connect?: exchange_goalsWhereUniqueInput
    update?: XOR<XOR<exchange_goalsUpdateToOneWithWhereWithoutChecklist_itemsInput, exchange_goalsUpdateWithoutChecklist_itemsInput>, exchange_goalsUncheckedUpdateWithoutChecklist_itemsInput>
  }

  export type checklist_itemsCreateNestedManyWithoutExchange_goalsInput = {
    create?: XOR<checklist_itemsCreateWithoutExchange_goalsInput, checklist_itemsUncheckedCreateWithoutExchange_goalsInput> | checklist_itemsCreateWithoutExchange_goalsInput[] | checklist_itemsUncheckedCreateWithoutExchange_goalsInput[]
    connectOrCreate?: checklist_itemsCreateOrConnectWithoutExchange_goalsInput | checklist_itemsCreateOrConnectWithoutExchange_goalsInput[]
    createMany?: checklist_itemsCreateManyExchange_goalsInputEnvelope
    connect?: checklist_itemsWhereUniqueInput | checklist_itemsWhereUniqueInput[]
  }

  export type usersCreateNestedOneWithoutExchange_goalsInput = {
    create?: XOR<usersCreateWithoutExchange_goalsInput, usersUncheckedCreateWithoutExchange_goalsInput>
    connectOrCreate?: usersCreateOrConnectWithoutExchange_goalsInput
    connect?: usersWhereUniqueInput
  }

  export type transactionsCreateNestedManyWithoutExchange_goalsInput = {
    create?: XOR<transactionsCreateWithoutExchange_goalsInput, transactionsUncheckedCreateWithoutExchange_goalsInput> | transactionsCreateWithoutExchange_goalsInput[] | transactionsUncheckedCreateWithoutExchange_goalsInput[]
    connectOrCreate?: transactionsCreateOrConnectWithoutExchange_goalsInput | transactionsCreateOrConnectWithoutExchange_goalsInput[]
    createMany?: transactionsCreateManyExchange_goalsInputEnvelope
    connect?: transactionsWhereUniqueInput | transactionsWhereUniqueInput[]
  }

  export type checklist_itemsUncheckedCreateNestedManyWithoutExchange_goalsInput = {
    create?: XOR<checklist_itemsCreateWithoutExchange_goalsInput, checklist_itemsUncheckedCreateWithoutExchange_goalsInput> | checklist_itemsCreateWithoutExchange_goalsInput[] | checklist_itemsUncheckedCreateWithoutExchange_goalsInput[]
    connectOrCreate?: checklist_itemsCreateOrConnectWithoutExchange_goalsInput | checklist_itemsCreateOrConnectWithoutExchange_goalsInput[]
    createMany?: checklist_itemsCreateManyExchange_goalsInputEnvelope
    connect?: checklist_itemsWhereUniqueInput | checklist_itemsWhereUniqueInput[]
  }

  export type transactionsUncheckedCreateNestedManyWithoutExchange_goalsInput = {
    create?: XOR<transactionsCreateWithoutExchange_goalsInput, transactionsUncheckedCreateWithoutExchange_goalsInput> | transactionsCreateWithoutExchange_goalsInput[] | transactionsUncheckedCreateWithoutExchange_goalsInput[]
    connectOrCreate?: transactionsCreateOrConnectWithoutExchange_goalsInput | transactionsCreateOrConnectWithoutExchange_goalsInput[]
    createMany?: transactionsCreateManyExchange_goalsInputEnvelope
    connect?: transactionsWhereUniqueInput | transactionsWhereUniqueInput[]
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type checklist_itemsUpdateManyWithoutExchange_goalsNestedInput = {
    create?: XOR<checklist_itemsCreateWithoutExchange_goalsInput, checklist_itemsUncheckedCreateWithoutExchange_goalsInput> | checklist_itemsCreateWithoutExchange_goalsInput[] | checklist_itemsUncheckedCreateWithoutExchange_goalsInput[]
    connectOrCreate?: checklist_itemsCreateOrConnectWithoutExchange_goalsInput | checklist_itemsCreateOrConnectWithoutExchange_goalsInput[]
    upsert?: checklist_itemsUpsertWithWhereUniqueWithoutExchange_goalsInput | checklist_itemsUpsertWithWhereUniqueWithoutExchange_goalsInput[]
    createMany?: checklist_itemsCreateManyExchange_goalsInputEnvelope
    set?: checklist_itemsWhereUniqueInput | checklist_itemsWhereUniqueInput[]
    disconnect?: checklist_itemsWhereUniqueInput | checklist_itemsWhereUniqueInput[]
    delete?: checklist_itemsWhereUniqueInput | checklist_itemsWhereUniqueInput[]
    connect?: checklist_itemsWhereUniqueInput | checklist_itemsWhereUniqueInput[]
    update?: checklist_itemsUpdateWithWhereUniqueWithoutExchange_goalsInput | checklist_itemsUpdateWithWhereUniqueWithoutExchange_goalsInput[]
    updateMany?: checklist_itemsUpdateManyWithWhereWithoutExchange_goalsInput | checklist_itemsUpdateManyWithWhereWithoutExchange_goalsInput[]
    deleteMany?: checklist_itemsScalarWhereInput | checklist_itemsScalarWhereInput[]
  }

  export type usersUpdateOneWithoutExchange_goalsNestedInput = {
    create?: XOR<usersCreateWithoutExchange_goalsInput, usersUncheckedCreateWithoutExchange_goalsInput>
    connectOrCreate?: usersCreateOrConnectWithoutExchange_goalsInput
    upsert?: usersUpsertWithoutExchange_goalsInput
    disconnect?: usersWhereInput | boolean
    delete?: usersWhereInput | boolean
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutExchange_goalsInput, usersUpdateWithoutExchange_goalsInput>, usersUncheckedUpdateWithoutExchange_goalsInput>
  }

  export type transactionsUpdateManyWithoutExchange_goalsNestedInput = {
    create?: XOR<transactionsCreateWithoutExchange_goalsInput, transactionsUncheckedCreateWithoutExchange_goalsInput> | transactionsCreateWithoutExchange_goalsInput[] | transactionsUncheckedCreateWithoutExchange_goalsInput[]
    connectOrCreate?: transactionsCreateOrConnectWithoutExchange_goalsInput | transactionsCreateOrConnectWithoutExchange_goalsInput[]
    upsert?: transactionsUpsertWithWhereUniqueWithoutExchange_goalsInput | transactionsUpsertWithWhereUniqueWithoutExchange_goalsInput[]
    createMany?: transactionsCreateManyExchange_goalsInputEnvelope
    set?: transactionsWhereUniqueInput | transactionsWhereUniqueInput[]
    disconnect?: transactionsWhereUniqueInput | transactionsWhereUniqueInput[]
    delete?: transactionsWhereUniqueInput | transactionsWhereUniqueInput[]
    connect?: transactionsWhereUniqueInput | transactionsWhereUniqueInput[]
    update?: transactionsUpdateWithWhereUniqueWithoutExchange_goalsInput | transactionsUpdateWithWhereUniqueWithoutExchange_goalsInput[]
    updateMany?: transactionsUpdateManyWithWhereWithoutExchange_goalsInput | transactionsUpdateManyWithWhereWithoutExchange_goalsInput[]
    deleteMany?: transactionsScalarWhereInput | transactionsScalarWhereInput[]
  }

  export type checklist_itemsUncheckedUpdateManyWithoutExchange_goalsNestedInput = {
    create?: XOR<checklist_itemsCreateWithoutExchange_goalsInput, checklist_itemsUncheckedCreateWithoutExchange_goalsInput> | checklist_itemsCreateWithoutExchange_goalsInput[] | checklist_itemsUncheckedCreateWithoutExchange_goalsInput[]
    connectOrCreate?: checklist_itemsCreateOrConnectWithoutExchange_goalsInput | checklist_itemsCreateOrConnectWithoutExchange_goalsInput[]
    upsert?: checklist_itemsUpsertWithWhereUniqueWithoutExchange_goalsInput | checklist_itemsUpsertWithWhereUniqueWithoutExchange_goalsInput[]
    createMany?: checklist_itemsCreateManyExchange_goalsInputEnvelope
    set?: checklist_itemsWhereUniqueInput | checklist_itemsWhereUniqueInput[]
    disconnect?: checklist_itemsWhereUniqueInput | checklist_itemsWhereUniqueInput[]
    delete?: checklist_itemsWhereUniqueInput | checklist_itemsWhereUniqueInput[]
    connect?: checklist_itemsWhereUniqueInput | checklist_itemsWhereUniqueInput[]
    update?: checklist_itemsUpdateWithWhereUniqueWithoutExchange_goalsInput | checklist_itemsUpdateWithWhereUniqueWithoutExchange_goalsInput[]
    updateMany?: checklist_itemsUpdateManyWithWhereWithoutExchange_goalsInput | checklist_itemsUpdateManyWithWhereWithoutExchange_goalsInput[]
    deleteMany?: checklist_itemsScalarWhereInput | checklist_itemsScalarWhereInput[]
  }

  export type transactionsUncheckedUpdateManyWithoutExchange_goalsNestedInput = {
    create?: XOR<transactionsCreateWithoutExchange_goalsInput, transactionsUncheckedCreateWithoutExchange_goalsInput> | transactionsCreateWithoutExchange_goalsInput[] | transactionsUncheckedCreateWithoutExchange_goalsInput[]
    connectOrCreate?: transactionsCreateOrConnectWithoutExchange_goalsInput | transactionsCreateOrConnectWithoutExchange_goalsInput[]
    upsert?: transactionsUpsertWithWhereUniqueWithoutExchange_goalsInput | transactionsUpsertWithWhereUniqueWithoutExchange_goalsInput[]
    createMany?: transactionsCreateManyExchange_goalsInputEnvelope
    set?: transactionsWhereUniqueInput | transactionsWhereUniqueInput[]
    disconnect?: transactionsWhereUniqueInput | transactionsWhereUniqueInput[]
    delete?: transactionsWhereUniqueInput | transactionsWhereUniqueInput[]
    connect?: transactionsWhereUniqueInput | transactionsWhereUniqueInput[]
    update?: transactionsUpdateWithWhereUniqueWithoutExchange_goalsInput | transactionsUpdateWithWhereUniqueWithoutExchange_goalsInput[]
    updateMany?: transactionsUpdateManyWithWhereWithoutExchange_goalsInput | transactionsUpdateManyWithWhereWithoutExchange_goalsInput[]
    deleteMany?: transactionsScalarWhereInput | transactionsScalarWhereInput[]
  }

  export type exchange_goalsCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<exchange_goalsCreateWithoutTransactionsInput, exchange_goalsUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: exchange_goalsCreateOrConnectWithoutTransactionsInput
    connect?: exchange_goalsWhereUniqueInput
  }

  export type NullableEnumtransactions_platformFieldUpdateOperationsInput = {
    set?: $Enums.transactions_platform | null
  }

  export type exchange_goalsUpdateOneWithoutTransactionsNestedInput = {
    create?: XOR<exchange_goalsCreateWithoutTransactionsInput, exchange_goalsUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: exchange_goalsCreateOrConnectWithoutTransactionsInput
    upsert?: exchange_goalsUpsertWithoutTransactionsInput
    disconnect?: exchange_goalsWhereInput | boolean
    delete?: exchange_goalsWhereInput | boolean
    connect?: exchange_goalsWhereUniqueInput
    update?: XOR<XOR<exchange_goalsUpdateToOneWithWhereWithoutTransactionsInput, exchange_goalsUpdateWithoutTransactionsInput>, exchange_goalsUncheckedUpdateWithoutTransactionsInput>
  }

  export type exchange_goalsCreateNestedManyWithoutUsersInput = {
    create?: XOR<exchange_goalsCreateWithoutUsersInput, exchange_goalsUncheckedCreateWithoutUsersInput> | exchange_goalsCreateWithoutUsersInput[] | exchange_goalsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: exchange_goalsCreateOrConnectWithoutUsersInput | exchange_goalsCreateOrConnectWithoutUsersInput[]
    createMany?: exchange_goalsCreateManyUsersInputEnvelope
    connect?: exchange_goalsWhereUniqueInput | exchange_goalsWhereUniqueInput[]
  }

  export type exchange_goalsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<exchange_goalsCreateWithoutUsersInput, exchange_goalsUncheckedCreateWithoutUsersInput> | exchange_goalsCreateWithoutUsersInput[] | exchange_goalsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: exchange_goalsCreateOrConnectWithoutUsersInput | exchange_goalsCreateOrConnectWithoutUsersInput[]
    createMany?: exchange_goalsCreateManyUsersInputEnvelope
    connect?: exchange_goalsWhereUniqueInput | exchange_goalsWhereUniqueInput[]
  }

  export type exchange_goalsUpdateManyWithoutUsersNestedInput = {
    create?: XOR<exchange_goalsCreateWithoutUsersInput, exchange_goalsUncheckedCreateWithoutUsersInput> | exchange_goalsCreateWithoutUsersInput[] | exchange_goalsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: exchange_goalsCreateOrConnectWithoutUsersInput | exchange_goalsCreateOrConnectWithoutUsersInput[]
    upsert?: exchange_goalsUpsertWithWhereUniqueWithoutUsersInput | exchange_goalsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: exchange_goalsCreateManyUsersInputEnvelope
    set?: exchange_goalsWhereUniqueInput | exchange_goalsWhereUniqueInput[]
    disconnect?: exchange_goalsWhereUniqueInput | exchange_goalsWhereUniqueInput[]
    delete?: exchange_goalsWhereUniqueInput | exchange_goalsWhereUniqueInput[]
    connect?: exchange_goalsWhereUniqueInput | exchange_goalsWhereUniqueInput[]
    update?: exchange_goalsUpdateWithWhereUniqueWithoutUsersInput | exchange_goalsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: exchange_goalsUpdateManyWithWhereWithoutUsersInput | exchange_goalsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: exchange_goalsScalarWhereInput | exchange_goalsScalarWhereInput[]
  }

  export type exchange_goalsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<exchange_goalsCreateWithoutUsersInput, exchange_goalsUncheckedCreateWithoutUsersInput> | exchange_goalsCreateWithoutUsersInput[] | exchange_goalsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: exchange_goalsCreateOrConnectWithoutUsersInput | exchange_goalsCreateOrConnectWithoutUsersInput[]
    upsert?: exchange_goalsUpsertWithWhereUniqueWithoutUsersInput | exchange_goalsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: exchange_goalsCreateManyUsersInputEnvelope
    set?: exchange_goalsWhereUniqueInput | exchange_goalsWhereUniqueInput[]
    disconnect?: exchange_goalsWhereUniqueInput | exchange_goalsWhereUniqueInput[]
    delete?: exchange_goalsWhereUniqueInput | exchange_goalsWhereUniqueInput[]
    connect?: exchange_goalsWhereUniqueInput | exchange_goalsWhereUniqueInput[]
    update?: exchange_goalsUpdateWithWhereUniqueWithoutUsersInput | exchange_goalsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: exchange_goalsUpdateManyWithWhereWithoutUsersInput | exchange_goalsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: exchange_goalsScalarWhereInput | exchange_goalsScalarWhereInput[]
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumchecklist_items_statusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.checklist_items_status | Enumchecklist_items_statusFieldRefInput<$PrismaModel> | null
    in?: $Enums.checklist_items_status[] | null
    notIn?: $Enums.checklist_items_status[] | null
    not?: NestedEnumchecklist_items_statusNullableFilter<$PrismaModel> | $Enums.checklist_items_status | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumchecklist_items_statusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.checklist_items_status | Enumchecklist_items_statusFieldRefInput<$PrismaModel> | null
    in?: $Enums.checklist_items_status[] | null
    notIn?: $Enums.checklist_items_status[] | null
    not?: NestedEnumchecklist_items_statusNullableWithAggregatesFilter<$PrismaModel> | $Enums.checklist_items_status | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumchecklist_items_statusNullableFilter<$PrismaModel>
    _max?: NestedEnumchecklist_items_statusNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumtransactions_platformNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.transactions_platform | Enumtransactions_platformFieldRefInput<$PrismaModel> | null
    in?: $Enums.transactions_platform[] | null
    notIn?: $Enums.transactions_platform[] | null
    not?: NestedEnumtransactions_platformNullableFilter<$PrismaModel> | $Enums.transactions_platform | null
  }

  export type NestedEnumtransactions_platformNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.transactions_platform | Enumtransactions_platformFieldRefInput<$PrismaModel> | null
    in?: $Enums.transactions_platform[] | null
    notIn?: $Enums.transactions_platform[] | null
    not?: NestedEnumtransactions_platformNullableWithAggregatesFilter<$PrismaModel> | $Enums.transactions_platform | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumtransactions_platformNullableFilter<$PrismaModel>
    _max?: NestedEnumtransactions_platformNullableFilter<$PrismaModel>
  }

  export type exchange_goalsCreateWithoutChecklist_itemsInput = {
    id_exchange_goal?: string
    destination: string
    target_currency: string
    amount_needed: Decimal | DecimalJsLike | number | string
    deadline: Date | string
    created_at?: Date | string | null
    users?: usersCreateNestedOneWithoutExchange_goalsInput
    transactions?: transactionsCreateNestedManyWithoutExchange_goalsInput
  }

  export type exchange_goalsUncheckedCreateWithoutChecklist_itemsInput = {
    id_exchange_goal?: string
    id_user?: string | null
    destination: string
    target_currency: string
    amount_needed: Decimal | DecimalJsLike | number | string
    deadline: Date | string
    created_at?: Date | string | null
    transactions?: transactionsUncheckedCreateNestedManyWithoutExchange_goalsInput
  }

  export type exchange_goalsCreateOrConnectWithoutChecklist_itemsInput = {
    where: exchange_goalsWhereUniqueInput
    create: XOR<exchange_goalsCreateWithoutChecklist_itemsInput, exchange_goalsUncheckedCreateWithoutChecklist_itemsInput>
  }

  export type exchange_goalsUpsertWithoutChecklist_itemsInput = {
    update: XOR<exchange_goalsUpdateWithoutChecklist_itemsInput, exchange_goalsUncheckedUpdateWithoutChecklist_itemsInput>
    create: XOR<exchange_goalsCreateWithoutChecklist_itemsInput, exchange_goalsUncheckedCreateWithoutChecklist_itemsInput>
    where?: exchange_goalsWhereInput
  }

  export type exchange_goalsUpdateToOneWithWhereWithoutChecklist_itemsInput = {
    where?: exchange_goalsWhereInput
    data: XOR<exchange_goalsUpdateWithoutChecklist_itemsInput, exchange_goalsUncheckedUpdateWithoutChecklist_itemsInput>
  }

  export type exchange_goalsUpdateWithoutChecklist_itemsInput = {
    id_exchange_goal?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    target_currency?: StringFieldUpdateOperationsInput | string
    amount_needed?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users?: usersUpdateOneWithoutExchange_goalsNestedInput
    transactions?: transactionsUpdateManyWithoutExchange_goalsNestedInput
  }

  export type exchange_goalsUncheckedUpdateWithoutChecklist_itemsInput = {
    id_exchange_goal?: StringFieldUpdateOperationsInput | string
    id_user?: NullableStringFieldUpdateOperationsInput | string | null
    destination?: StringFieldUpdateOperationsInput | string
    target_currency?: StringFieldUpdateOperationsInput | string
    amount_needed?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    transactions?: transactionsUncheckedUpdateManyWithoutExchange_goalsNestedInput
  }

  export type checklist_itemsCreateWithoutExchange_goalsInput = {
    id_checklist_item?: string
    title: string
    description?: string | null
    status?: $Enums.checklist_items_status | null
    due_date?: Date | string | null
    created_at?: Date | string | null
  }

  export type checklist_itemsUncheckedCreateWithoutExchange_goalsInput = {
    id_checklist_item?: string
    title: string
    description?: string | null
    status?: $Enums.checklist_items_status | null
    due_date?: Date | string | null
    created_at?: Date | string | null
  }

  export type checklist_itemsCreateOrConnectWithoutExchange_goalsInput = {
    where: checklist_itemsWhereUniqueInput
    create: XOR<checklist_itemsCreateWithoutExchange_goalsInput, checklist_itemsUncheckedCreateWithoutExchange_goalsInput>
  }

  export type checklist_itemsCreateManyExchange_goalsInputEnvelope = {
    data: checklist_itemsCreateManyExchange_goalsInput | checklist_itemsCreateManyExchange_goalsInput[]
    skipDuplicates?: boolean
  }

  export type usersCreateWithoutExchange_goalsInput = {
    id_user?: string
    name: string
    email: string
    password: string
    created_at?: Date | string | null
    update_at?: Date | string | null
  }

  export type usersUncheckedCreateWithoutExchange_goalsInput = {
    id_user?: string
    name: string
    email: string
    password: string
    created_at?: Date | string | null
    update_at?: Date | string | null
  }

  export type usersCreateOrConnectWithoutExchange_goalsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutExchange_goalsInput, usersUncheckedCreateWithoutExchange_goalsInput>
  }

  export type transactionsCreateWithoutExchange_goalsInput = {
    id_transaction?: string
    description: string
    amount_brl: Decimal | DecimalJsLike | number | string
    exchange_rate: Decimal | DecimalJsLike | number | string
    amount_foreign: Decimal | DecimalJsLike | number | string
    platform?: $Enums.transactions_platform | null
    created_at?: Date | string | null
  }

  export type transactionsUncheckedCreateWithoutExchange_goalsInput = {
    id_transaction?: string
    description: string
    amount_brl: Decimal | DecimalJsLike | number | string
    exchange_rate: Decimal | DecimalJsLike | number | string
    amount_foreign: Decimal | DecimalJsLike | number | string
    platform?: $Enums.transactions_platform | null
    created_at?: Date | string | null
  }

  export type transactionsCreateOrConnectWithoutExchange_goalsInput = {
    where: transactionsWhereUniqueInput
    create: XOR<transactionsCreateWithoutExchange_goalsInput, transactionsUncheckedCreateWithoutExchange_goalsInput>
  }

  export type transactionsCreateManyExchange_goalsInputEnvelope = {
    data: transactionsCreateManyExchange_goalsInput | transactionsCreateManyExchange_goalsInput[]
    skipDuplicates?: boolean
  }

  export type checklist_itemsUpsertWithWhereUniqueWithoutExchange_goalsInput = {
    where: checklist_itemsWhereUniqueInput
    update: XOR<checklist_itemsUpdateWithoutExchange_goalsInput, checklist_itemsUncheckedUpdateWithoutExchange_goalsInput>
    create: XOR<checklist_itemsCreateWithoutExchange_goalsInput, checklist_itemsUncheckedCreateWithoutExchange_goalsInput>
  }

  export type checklist_itemsUpdateWithWhereUniqueWithoutExchange_goalsInput = {
    where: checklist_itemsWhereUniqueInput
    data: XOR<checklist_itemsUpdateWithoutExchange_goalsInput, checklist_itemsUncheckedUpdateWithoutExchange_goalsInput>
  }

  export type checklist_itemsUpdateManyWithWhereWithoutExchange_goalsInput = {
    where: checklist_itemsScalarWhereInput
    data: XOR<checklist_itemsUpdateManyMutationInput, checklist_itemsUncheckedUpdateManyWithoutExchange_goalsInput>
  }

  export type checklist_itemsScalarWhereInput = {
    AND?: checklist_itemsScalarWhereInput | checklist_itemsScalarWhereInput[]
    OR?: checklist_itemsScalarWhereInput[]
    NOT?: checklist_itemsScalarWhereInput | checklist_itemsScalarWhereInput[]
    id_checklist_item?: StringFilter<"checklist_items"> | string
    id_exchange_goal?: StringNullableFilter<"checklist_items"> | string | null
    title?: StringFilter<"checklist_items"> | string
    description?: StringNullableFilter<"checklist_items"> | string | null
    status?: Enumchecklist_items_statusNullableFilter<"checklist_items"> | $Enums.checklist_items_status | null
    due_date?: DateTimeNullableFilter<"checklist_items"> | Date | string | null
    created_at?: DateTimeNullableFilter<"checklist_items"> | Date | string | null
  }

  export type usersUpsertWithoutExchange_goalsInput = {
    update: XOR<usersUpdateWithoutExchange_goalsInput, usersUncheckedUpdateWithoutExchange_goalsInput>
    create: XOR<usersCreateWithoutExchange_goalsInput, usersUncheckedCreateWithoutExchange_goalsInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutExchange_goalsInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutExchange_goalsInput, usersUncheckedUpdateWithoutExchange_goalsInput>
  }

  export type usersUpdateWithoutExchange_goalsInput = {
    id_user?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    update_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type usersUncheckedUpdateWithoutExchange_goalsInput = {
    id_user?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    update_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type transactionsUpsertWithWhereUniqueWithoutExchange_goalsInput = {
    where: transactionsWhereUniqueInput
    update: XOR<transactionsUpdateWithoutExchange_goalsInput, transactionsUncheckedUpdateWithoutExchange_goalsInput>
    create: XOR<transactionsCreateWithoutExchange_goalsInput, transactionsUncheckedCreateWithoutExchange_goalsInput>
  }

  export type transactionsUpdateWithWhereUniqueWithoutExchange_goalsInput = {
    where: transactionsWhereUniqueInput
    data: XOR<transactionsUpdateWithoutExchange_goalsInput, transactionsUncheckedUpdateWithoutExchange_goalsInput>
  }

  export type transactionsUpdateManyWithWhereWithoutExchange_goalsInput = {
    where: transactionsScalarWhereInput
    data: XOR<transactionsUpdateManyMutationInput, transactionsUncheckedUpdateManyWithoutExchange_goalsInput>
  }

  export type transactionsScalarWhereInput = {
    AND?: transactionsScalarWhereInput | transactionsScalarWhereInput[]
    OR?: transactionsScalarWhereInput[]
    NOT?: transactionsScalarWhereInput | transactionsScalarWhereInput[]
    id_transaction?: StringFilter<"transactions"> | string
    id_exchange_goal?: StringNullableFilter<"transactions"> | string | null
    description?: StringFilter<"transactions"> | string
    amount_brl?: DecimalFilter<"transactions"> | Decimal | DecimalJsLike | number | string
    exchange_rate?: DecimalFilter<"transactions"> | Decimal | DecimalJsLike | number | string
    amount_foreign?: DecimalFilter<"transactions"> | Decimal | DecimalJsLike | number | string
    platform?: Enumtransactions_platformNullableFilter<"transactions"> | $Enums.transactions_platform | null
    created_at?: DateTimeNullableFilter<"transactions"> | Date | string | null
  }

  export type exchange_goalsCreateWithoutTransactionsInput = {
    id_exchange_goal?: string
    destination: string
    target_currency: string
    amount_needed: Decimal | DecimalJsLike | number | string
    deadline: Date | string
    created_at?: Date | string | null
    checklist_items?: checklist_itemsCreateNestedManyWithoutExchange_goalsInput
    users?: usersCreateNestedOneWithoutExchange_goalsInput
  }

  export type exchange_goalsUncheckedCreateWithoutTransactionsInput = {
    id_exchange_goal?: string
    id_user?: string | null
    destination: string
    target_currency: string
    amount_needed: Decimal | DecimalJsLike | number | string
    deadline: Date | string
    created_at?: Date | string | null
    checklist_items?: checklist_itemsUncheckedCreateNestedManyWithoutExchange_goalsInput
  }

  export type exchange_goalsCreateOrConnectWithoutTransactionsInput = {
    where: exchange_goalsWhereUniqueInput
    create: XOR<exchange_goalsCreateWithoutTransactionsInput, exchange_goalsUncheckedCreateWithoutTransactionsInput>
  }

  export type exchange_goalsUpsertWithoutTransactionsInput = {
    update: XOR<exchange_goalsUpdateWithoutTransactionsInput, exchange_goalsUncheckedUpdateWithoutTransactionsInput>
    create: XOR<exchange_goalsCreateWithoutTransactionsInput, exchange_goalsUncheckedCreateWithoutTransactionsInput>
    where?: exchange_goalsWhereInput
  }

  export type exchange_goalsUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: exchange_goalsWhereInput
    data: XOR<exchange_goalsUpdateWithoutTransactionsInput, exchange_goalsUncheckedUpdateWithoutTransactionsInput>
  }

  export type exchange_goalsUpdateWithoutTransactionsInput = {
    id_exchange_goal?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    target_currency?: StringFieldUpdateOperationsInput | string
    amount_needed?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checklist_items?: checklist_itemsUpdateManyWithoutExchange_goalsNestedInput
    users?: usersUpdateOneWithoutExchange_goalsNestedInput
  }

  export type exchange_goalsUncheckedUpdateWithoutTransactionsInput = {
    id_exchange_goal?: StringFieldUpdateOperationsInput | string
    id_user?: NullableStringFieldUpdateOperationsInput | string | null
    destination?: StringFieldUpdateOperationsInput | string
    target_currency?: StringFieldUpdateOperationsInput | string
    amount_needed?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checklist_items?: checklist_itemsUncheckedUpdateManyWithoutExchange_goalsNestedInput
  }

  export type exchange_goalsCreateWithoutUsersInput = {
    id_exchange_goal?: string
    destination: string
    target_currency: string
    amount_needed: Decimal | DecimalJsLike | number | string
    deadline: Date | string
    created_at?: Date | string | null
    checklist_items?: checklist_itemsCreateNestedManyWithoutExchange_goalsInput
    transactions?: transactionsCreateNestedManyWithoutExchange_goalsInput
  }

  export type exchange_goalsUncheckedCreateWithoutUsersInput = {
    id_exchange_goal?: string
    destination: string
    target_currency: string
    amount_needed: Decimal | DecimalJsLike | number | string
    deadline: Date | string
    created_at?: Date | string | null
    checklist_items?: checklist_itemsUncheckedCreateNestedManyWithoutExchange_goalsInput
    transactions?: transactionsUncheckedCreateNestedManyWithoutExchange_goalsInput
  }

  export type exchange_goalsCreateOrConnectWithoutUsersInput = {
    where: exchange_goalsWhereUniqueInput
    create: XOR<exchange_goalsCreateWithoutUsersInput, exchange_goalsUncheckedCreateWithoutUsersInput>
  }

  export type exchange_goalsCreateManyUsersInputEnvelope = {
    data: exchange_goalsCreateManyUsersInput | exchange_goalsCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type exchange_goalsUpsertWithWhereUniqueWithoutUsersInput = {
    where: exchange_goalsWhereUniqueInput
    update: XOR<exchange_goalsUpdateWithoutUsersInput, exchange_goalsUncheckedUpdateWithoutUsersInput>
    create: XOR<exchange_goalsCreateWithoutUsersInput, exchange_goalsUncheckedCreateWithoutUsersInput>
  }

  export type exchange_goalsUpdateWithWhereUniqueWithoutUsersInput = {
    where: exchange_goalsWhereUniqueInput
    data: XOR<exchange_goalsUpdateWithoutUsersInput, exchange_goalsUncheckedUpdateWithoutUsersInput>
  }

  export type exchange_goalsUpdateManyWithWhereWithoutUsersInput = {
    where: exchange_goalsScalarWhereInput
    data: XOR<exchange_goalsUpdateManyMutationInput, exchange_goalsUncheckedUpdateManyWithoutUsersInput>
  }

  export type exchange_goalsScalarWhereInput = {
    AND?: exchange_goalsScalarWhereInput | exchange_goalsScalarWhereInput[]
    OR?: exchange_goalsScalarWhereInput[]
    NOT?: exchange_goalsScalarWhereInput | exchange_goalsScalarWhereInput[]
    id_exchange_goal?: StringFilter<"exchange_goals"> | string
    id_user?: StringNullableFilter<"exchange_goals"> | string | null
    destination?: StringFilter<"exchange_goals"> | string
    target_currency?: StringFilter<"exchange_goals"> | string
    amount_needed?: DecimalFilter<"exchange_goals"> | Decimal | DecimalJsLike | number | string
    deadline?: DateTimeFilter<"exchange_goals"> | Date | string
    created_at?: DateTimeNullableFilter<"exchange_goals"> | Date | string | null
  }

  export type checklist_itemsCreateManyExchange_goalsInput = {
    id_checklist_item?: string
    title: string
    description?: string | null
    status?: $Enums.checklist_items_status | null
    due_date?: Date | string | null
    created_at?: Date | string | null
  }

  export type transactionsCreateManyExchange_goalsInput = {
    id_transaction?: string
    description: string
    amount_brl: Decimal | DecimalJsLike | number | string
    exchange_rate: Decimal | DecimalJsLike | number | string
    amount_foreign: Decimal | DecimalJsLike | number | string
    platform?: $Enums.transactions_platform | null
    created_at?: Date | string | null
  }

  export type checklist_itemsUpdateWithoutExchange_goalsInput = {
    id_checklist_item?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableEnumchecklist_items_statusFieldUpdateOperationsInput | $Enums.checklist_items_status | null
    due_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type checklist_itemsUncheckedUpdateWithoutExchange_goalsInput = {
    id_checklist_item?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableEnumchecklist_items_statusFieldUpdateOperationsInput | $Enums.checklist_items_status | null
    due_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type checklist_itemsUncheckedUpdateManyWithoutExchange_goalsInput = {
    id_checklist_item?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableEnumchecklist_items_statusFieldUpdateOperationsInput | $Enums.checklist_items_status | null
    due_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type transactionsUpdateWithoutExchange_goalsInput = {
    id_transaction?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    amount_brl?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    exchange_rate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amount_foreign?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    platform?: NullableEnumtransactions_platformFieldUpdateOperationsInput | $Enums.transactions_platform | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type transactionsUncheckedUpdateWithoutExchange_goalsInput = {
    id_transaction?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    amount_brl?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    exchange_rate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amount_foreign?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    platform?: NullableEnumtransactions_platformFieldUpdateOperationsInput | $Enums.transactions_platform | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type transactionsUncheckedUpdateManyWithoutExchange_goalsInput = {
    id_transaction?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    amount_brl?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    exchange_rate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    amount_foreign?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    platform?: NullableEnumtransactions_platformFieldUpdateOperationsInput | $Enums.transactions_platform | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type exchange_goalsCreateManyUsersInput = {
    id_exchange_goal?: string
    destination: string
    target_currency: string
    amount_needed: Decimal | DecimalJsLike | number | string
    deadline: Date | string
    created_at?: Date | string | null
  }

  export type exchange_goalsUpdateWithoutUsersInput = {
    id_exchange_goal?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    target_currency?: StringFieldUpdateOperationsInput | string
    amount_needed?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checklist_items?: checklist_itemsUpdateManyWithoutExchange_goalsNestedInput
    transactions?: transactionsUpdateManyWithoutExchange_goalsNestedInput
  }

  export type exchange_goalsUncheckedUpdateWithoutUsersInput = {
    id_exchange_goal?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    target_currency?: StringFieldUpdateOperationsInput | string
    amount_needed?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checklist_items?: checklist_itemsUncheckedUpdateManyWithoutExchange_goalsNestedInput
    transactions?: transactionsUncheckedUpdateManyWithoutExchange_goalsNestedInput
  }

  export type exchange_goalsUncheckedUpdateManyWithoutUsersInput = {
    id_exchange_goal?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    target_currency?: StringFieldUpdateOperationsInput | string
    amount_needed?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use Exchange_goalsCountOutputTypeDefaultArgs instead
     */
    export type Exchange_goalsCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Exchange_goalsCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UsersCountOutputTypeDefaultArgs instead
     */
    export type UsersCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UsersCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use checklist_itemsDefaultArgs instead
     */
    export type checklist_itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = checklist_itemsDefaultArgs<ExtArgs>
    /**
     * @deprecated Use exchange_goalsDefaultArgs instead
     */
    export type exchange_goalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = exchange_goalsDefaultArgs<ExtArgs>
    /**
     * @deprecated Use transactionsDefaultArgs instead
     */
    export type transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = transactionsDefaultArgs<ExtArgs>
    /**
     * @deprecated Use usersDefaultArgs instead
     */
    export type usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = usersDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}