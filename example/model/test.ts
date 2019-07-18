import { Sequelize } from 'sequelize';
import { Model, DataTypes } from 'sequelize';
export class Account extends Model {
    public id!: number;
    public mobile!: string;
    public password!: string;
    public status: EAccountStatus = EAccountStatus.UNACTIVE;
}

export enum EAccountStatus {
    UNACTIVE = 0,
    FORBIDDEN = -1,
    ACTIVE = 1
}

export async function init(sequelize: Sequelize) {
    let options = Object.assign({}, {
        sequelize,
        tableName: 'account',
        indexes: [{ fields: ['mobile'] }],
    });
    let columns = {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        mobile: {
            type: DataTypes.STRING(20),
            comment: "手机号"
        },
        password: {
            type: DataTypes.STRING(50),
            comment: "密码"
        },
        status: {
            type: DataTypes.INTEGER,
            comment: "状态"
        },
    }
    return Account.init(columns, options);
}
