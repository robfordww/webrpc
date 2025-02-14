/* eslint-disable */
// hello-webrpc v1.0.0 5ace0c3aa305e464d6a2c180f43e8876be34e155
// --
// Code generated by webrpc-gen@v0.7.0 with typescript generator. DO NOT EDIT.
//
// webrpc-gen -schema=hello-api.ridl -target=typescript -client -out=./webapp/src/client.gen.ts

// WebRPC description and code-gen version
export const WebRPCVersion = "v1"

// Schema version of your RIDL schema
export const WebRPCSchemaVersion = "v1.0.0"

// Schema hash generated from your RIDL schema
export const WebRPCSchemaHash = "5ace0c3aa305e464d6a2c180f43e8876be34e155"

//
// Types
//
export enum Kind {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export interface User {
  id: number
  USERNAME: string
  role: Kind
  meta: {[key: string]: any}
  
  created_at?: string
}

export interface Page {
  num: number
}

export interface ExampleService {
  ping(headers?: object): Promise<PingReturn>
  getUser(args: GetUserArgs, headers?: object): Promise<GetUserReturn>
  findUsers(args: FindUsersArgs, headers?: object): Promise<FindUsersReturn>
}

export interface PingArgs {
}

export interface PingReturn {
  status: boolean  
}
export interface GetUserArgs {
  userID: number
}

export interface GetUserReturn {
  user: User  
}
export interface FindUsersArgs {
  q: string
}

export interface FindUsersReturn {
  page: Page
  users: Array<User>  
}


  
//
// Client
//
export class ExampleService implements ExampleService {
  protected hostname: string
  protected fetch: Fetch
  protected path = '/rpc/ExampleService/'

  constructor(hostname: string, fetch: Fetch) {
    this.hostname = hostname
    this.fetch = fetch
  }

  private url(name: string): string {
    return this.hostname + this.path + name
  }
  
  ping = (headers?: object): Promise<PingReturn> => {
    return this.fetch(
      this.url('Ping'),
      createHTTPRequest({}, headers)
      ).then((res) => {
      return buildResponse(res).then(_data => {
        return {
          status: <boolean>(_data.status)
        }
      })
    })
  }
  
  getUser = (args: GetUserArgs, headers?: object): Promise<GetUserReturn> => {
    return this.fetch(
      this.url('GetUser'),
      createHTTPRequest(args, headers)).then((res) => {
      return buildResponse(res).then(_data => {
        return {
          user: <User>(_data.user)
        }
      })
    })
  }
  
  findUsers = (args: FindUsersArgs, headers?: object): Promise<FindUsersReturn> => {
    return this.fetch(
      this.url('FindUsers'),
      createHTTPRequest(args, headers)).then((res) => {
      return buildResponse(res).then(_data => {
        return {
          page: <Page>(_data.page), 
          users: <Array<User>>(_data.users)
        }
      })
    })
  }
  
}

  
export interface WebRPCError extends Error {
  code: string
  msg: string
	status: number
}

const createHTTPRequest = (body: object = {}, headers: object = {}): object => {
  return {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify(body || {})
  }
}

const buildResponse = (res: Response): Promise<any> => {
  return res.text().then(text => {
    let data
    try {
      data = JSON.parse(text)
    } catch(err) {
      throw { code: 'unknown', msg: `expecting JSON, got: ${text}`, status: res.status } as WebRPCError
    }
    if (!res.ok) {
      throw data // webrpc error response
    }
    return data
  })
}

export type Fetch = (input: RequestInfo, init?: RequestInit) => Promise<Response>
