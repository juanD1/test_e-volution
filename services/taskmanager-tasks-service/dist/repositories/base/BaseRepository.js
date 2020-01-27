"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const inversify_1 = require("inversify");
let BaseRepository = class BaseRepository {
    constructor(connection, collectionName) {
        this._collection = connection.collection(collectionName);
        this._collectionName = collectionName;
    }
    create(item) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._collection.insert(item);
            if (!!result.result.ok) {
                return result.ops[0];
            }
            return Promise.reject('Error creating the item');
        });
    }
    update(id, item) {
        return __awaiter(this, void 0, void 0, function* () {
            const objectId = new mongodb_1.ObjectID(id);
            try {
                var updatedValues = { $set: item };
                const result = yield this._collection.updateOne({ _id: objectId }, updatedValues);
                if (!!result.result.ok) {
                    return Promise.resolve(item);
                }
                else {
                    return Promise.reject('Error updating the item');
                }
            }
            catch (e) {
                console.log('Error ...', e);
                return Promise.reject(e);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const objectId = new mongodb_1.ObjectID(id);
            const result = yield this._collection.deleteOne({ _id: objectId });
            if (!!result.result.ok) {
                return Promise.resolve(true);
            }
            else {
                return Promise.reject('Error updating the item');
            }
        });
    }
    find(item) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._collection.find(item).toArray();
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const objectId = new mongodb_1.ObjectID(id);
            return this._collection.findOne({ _id: objectId });
        });
    }
    findOnebyQuery(query) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("*** findOnebyQuery: ", query);
            return this._collection.findOne(query);
        });
    }
};
BaseRepository = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.unmanaged()), __param(1, inversify_1.unmanaged())
], BaseRepository);
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=BaseRepository.js.map