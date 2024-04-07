import { AccountRole } from "@/types/firebase/account_role";
import { Model } from "@/core/interfaces/model.interface";

import { DocumentSnapshot, SnapshotOptions } from "firebase/firestore";
import UserModel from "./user/user.model";

export default class AccountRoleModel implements Model {
    // * FIELDS
    private _uuid: string;
    private _fullName: string;
    private _shortName: string;
    private _weight: number;

    // METADATA FIELDS
    private _addedAt: Date;
    private _addedByRef: UserModel | string;
    private _updatedAt: Date;
    private _updatedByRef: UserModel | string;
    private _deletedAt: Date | null;
    private _deletedByRef: UserModel | string | null;

    // * CONSTRUCTOR
    constructor({
        uuid,
        fullName,
        shortName,
        weight,
        addedAt,
        addedByRef,
        updatedAt,
        updatedByRef,
        deletedAt = null,
        deletedByRef = null
    }: {
        uuid: string,
        fullName: string,
        shortName: string,
        weight: number,
        addedAt: Date,
        addedByRef: UserModel | string,
        updatedAt: Date,
        updatedByRef: UserModel | string,
        deletedAt?: Date | null,
        deletedByRef?: UserModel | string | null
    }) {
        this._uuid = uuid;
        this._fullName = fullName;
        this._shortName = shortName;
        this._weight = weight;
        this._addedAt = addedAt;
        this._addedByRef = addedByRef;
        this._updatedAt = updatedAt;
        this._updatedByRef = updatedByRef;
        this._deletedAt = deletedAt;
        this._deletedByRef = deletedByRef;
    };

    // * GETTERS
    get uuid(): string { return this._uuid; }
    get fullName(): string { return this._fullName; }
    get shortName(): string { return this._shortName; }
    get weight(): number { return this._weight; }
    get addedAt(): Date { return this._addedAt; }
    get addedByRef(): UserModel | string { return this._addedByRef; }
    get updatedAt(): Date { return this._updatedAt; }
    get updatedByRef(): UserModel | string { return this._updatedByRef; }
    get deletedAt(): Date | null { return this._deletedAt; }
    get deletedByRef(): UserModel | string | null { return this._deletedByRef; }

    // * UTILITIES
    public copyWith<AccountRoleModel>({
        uuid,
        fullName,
        shortName,
        weight,
        addedAt,
        addedByRef,
        updatedAt,
        updatedByRef,
        deletedAt,
        deletedByRef
    }: {
        uuid?: string,
        fullName?: string,
        shortName?: string,
        weight?: number,
        addedAt?: Date,
        addedByRef?: UserModel | string,
        updatedAt?: Date,
        updatedByRef?: UserModel | string,
        deletedAt?: Date | null,
        deletedByRef?: UserModel | string | null
    }): AccountRoleModel {
        return new AccountRoleModel({
            uuid: uuid ?? this.uuid,
            fullName: fullName ?? this.fullName,
            shortName: shortName ?? this.shortName,
            weight: weight ?? this.weight,
            addedAt: addedAt ?? this.addedAt,
            addedByRef: addedByRef ?? this.addedByRef,
            updatedAt: updatedAt ?? this.updatedAt,
            updatedByRef: updatedByRef ?? this.updatedByRef,
            deletedAt: deletedAt ?? this.deletedAt,
            deletedByRef: deletedByRef ?? this.deletedByRef
        }) as AccountRoleModel;
    }

    public fromFirestore<AccountRoleModel>({ snapshot, options }: {
        snapshot: DocumentSnapshot, options?: SnapshotOptions
    }): AccountRoleModel {
        const data = snapshot.data(options) as AccountRole;

        return new AccountRoleModel({
            uuid: data.uuid,
            fullName: data.fullName,
            shortName: data.shortName,
            weight: data.weight,

            // Metadata
            addedAt: data.addedAt,
            addedByRef: data.addedByRef,
            updatedAt: data.updatedAt,
            updatedByRef: data.updatedByRef,
            deletedAt: data.deletedAt,
            deletedByRef: data.deletedByRef
        }) as AccountRoleModel;
    }

    public toFirestore(): AccountRole {
        return {
            uuid: this.uuid,
            fullName: this.fullName,
            shortName: this.shortName,
            weight: this.weight,

            // Metadata
            addedAt: this.addedAt,
            addedByRef: this.addedByRef instanceof UserModel ? this.addedByRef.uuid : this.addedByRef,
            updatedAt: this.updatedAt,
            updatedByRef: this.updatedByRef instanceof UserModel ? this.updatedByRef.uuid : this.updatedByRef,
            deletedAt: this.deletedAt,
            deletedByRef: this.deletedByRef instanceof UserModel ? this.deletedByRef.uuid : this.deletedByRef
        };
    }
}