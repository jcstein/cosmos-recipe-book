/* eslint-disable */
import { Reader, util, configure, Writer } from "protobufjs/minimal";
import * as Long from "long";

export const protobufPackage = "recipes.recipes";

export interface MsgCreateRecipe {
  creator: string;
  dish: string;
  ingredients: string;
}

export interface MsgCreateRecipeResponse {
  id: number;
}

const baseMsgCreateRecipe: object = { creator: "", dish: "", ingredients: "" };

export const MsgCreateRecipe = {
  encode(message: MsgCreateRecipe, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.dish !== "") {
      writer.uint32(18).string(message.dish);
    }
    if (message.ingredients !== "") {
      writer.uint32(26).string(message.ingredients);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCreateRecipe {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCreateRecipe } as MsgCreateRecipe;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.dish = reader.string();
          break;
        case 3:
          message.ingredients = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateRecipe {
    const message = { ...baseMsgCreateRecipe } as MsgCreateRecipe;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.dish !== undefined && object.dish !== null) {
      message.dish = String(object.dish);
    } else {
      message.dish = "";
    }
    if (object.ingredients !== undefined && object.ingredients !== null) {
      message.ingredients = String(object.ingredients);
    } else {
      message.ingredients = "";
    }
    return message;
  },

  toJSON(message: MsgCreateRecipe): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.dish !== undefined && (obj.dish = message.dish);
    message.ingredients !== undefined &&
      (obj.ingredients = message.ingredients);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgCreateRecipe>): MsgCreateRecipe {
    const message = { ...baseMsgCreateRecipe } as MsgCreateRecipe;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.dish !== undefined && object.dish !== null) {
      message.dish = object.dish;
    } else {
      message.dish = "";
    }
    if (object.ingredients !== undefined && object.ingredients !== null) {
      message.ingredients = object.ingredients;
    } else {
      message.ingredients = "";
    }
    return message;
  },
};

const baseMsgCreateRecipeResponse: object = { id: 0 };

export const MsgCreateRecipeResponse = {
  encode(
    message: MsgCreateRecipeResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCreateRecipeResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgCreateRecipeResponse,
    } as MsgCreateRecipeResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateRecipeResponse {
    const message = {
      ...baseMsgCreateRecipeResponse,
    } as MsgCreateRecipeResponse;
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    return message;
  },

  toJSON(message: MsgCreateRecipeResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgCreateRecipeResponse>
  ): MsgCreateRecipeResponse {
    const message = {
      ...baseMsgCreateRecipeResponse,
    } as MsgCreateRecipeResponse;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  /** this line is used by starport scaffolding # proto/tx/rpc */
  CreateRecipe(request: MsgCreateRecipe): Promise<MsgCreateRecipeResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  CreateRecipe(request: MsgCreateRecipe): Promise<MsgCreateRecipeResponse> {
    const data = MsgCreateRecipe.encode(request).finish();
    const promise = this.rpc.request(
      "recipes.recipes.Msg",
      "CreateRecipe",
      data
    );
    return promise.then((data) =>
      MsgCreateRecipeResponse.decode(new Reader(data))
    );
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}

declare var self: any | undefined;
declare var window: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
