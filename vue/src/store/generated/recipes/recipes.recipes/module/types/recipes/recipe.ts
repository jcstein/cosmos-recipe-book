/* eslint-disable */
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "recipes.recipes";

export interface Recipe {
  creator: string;
  id: number;
  dish: string;
  ingredients: string;
}

const baseRecipe: object = { creator: "", id: 0, dish: "", ingredients: "" };

export const Recipe = {
  encode(message: Recipe, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    if (message.dish !== "") {
      writer.uint32(26).string(message.dish);
    }
    if (message.ingredients !== "") {
      writer.uint32(34).string(message.ingredients);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Recipe {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRecipe } as Recipe;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.dish = reader.string();
          break;
        case 4:
          message.ingredients = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Recipe {
    const message = { ...baseRecipe } as Recipe;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
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

  toJSON(message: Recipe): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.dish !== undefined && (obj.dish = message.dish);
    message.ingredients !== undefined &&
      (obj.ingredients = message.ingredients);
    return obj;
  },

  fromPartial(object: DeepPartial<Recipe>): Recipe {
    const message = { ...baseRecipe } as Recipe;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
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
