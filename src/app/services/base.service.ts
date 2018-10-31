import { IdbService } from './idb.service';
import { IDataBase, DATA_TYPE, ITable } from 'jsstore';
import { User } from '../models/user';
import { Template } from '../models/template';
import { Step } from '../models/step';
import { Injectable } from '@angular/core';


export class BaseService {
  dbname = 'memo';

  didRun = false;

  constructor() {
    // turn on jsstore log status - help you to debug
    // turn off it in production or when you dont need
    this.connection.setLogStatus(true);
    this.initJsStore();
  }

  get connection() {
    return IdbService.idbCon;
  }

  initJsStore() {
    this.connection.isDbExist(this.dbname).then(isExist => {
      if (isExist) {
        this.connection.openDb(this.dbname);
      } else {
        const dataBase = this.getDatabase();
        this.connection.createDb(dataBase);

        //first time
        alert("New version");
        this.seed();
      }
    }).catch(err => {
      // this will be fired when indexedDB is not supported.
      alert(err.message);
    });
  }

  private getDatabase() {
    const tblStudent: ITable = {
      name: 'Students',
      columns: [{
        name: 'id',
        primaryKey: true,
        autoIncrement: true
      },
      {
        name: 'name',
        notNull: true,
        dataType: DATA_TYPE.String
      },
      {
        name: 'gender',
        dataType: DATA_TYPE.String,
        default: 'male'
      },
      {
        name: 'country',
        notNull: true,
        dataType: DATA_TYPE.String
      },
      {
        name: 'city',
        dataType: DATA_TYPE.String,
        notNull: true
      }
      ]
    };


    const tblUser: ITable = {
      name: 'Users',
      columns: [{
        name: 'id',
        primaryKey: true,
        autoIncrement: true
      },
      {
        name: 'name',
        notNull: true,
        dataType: DATA_TYPE.String
      },
      {
        name: 'email',
        dataType: DATA_TYPE.String,
        notNull: true,
      },
      {
        name: 'password',
        dataType: DATA_TYPE.String,
        notNull: true,
      }
      ]
    };

    const tblTemplate: ITable = {
      name: 'Templates',
      columns: [{
        name: 'id',
        primaryKey: true,
        autoIncrement: true
      },
      {
        name: 'title',
        notNull: true,
        dataType: DATA_TYPE.String
      },
      {
        name: 'description',
        dataType: DATA_TYPE.String,
      },
      ]
    };

    const tblStep: ITable = {
      name: 'Steps',
      columns: [{
        name: 'id',
        primaryKey: true,
        autoIncrement: true
      },
      {
        name: 'title',
        notNull: true,
        dataType: DATA_TYPE.String
      },
      {
        name: 'description',
        dataType: DATA_TYPE.String,
      },
      {
        name: 'type',
        dataType: DATA_TYPE.String,
      },
      {
        name: 'templateId',
        dataType: DATA_TYPE.Number,
      },
      {
        name: 'userId',
        dataType: DATA_TYPE.Number,
      },
      ]
    };
    const tblProcesses: ITable = {
      name: 'Processes',
      columns: []
    }

    const dataBase: IDataBase = {
      name: this.dbname,
      tables: [tblStudent, tblUser, tblTemplate, tblStep, tblProcesses]
    };
    return dataBase;
  }

  seed() {
    let myCon = this.connection;

    let users: User[] = [];
    users.push(new User().init("user1", "user1@mail.com", "pass1"));
    users.push(new User().init("user2", "user2@mail.com", "pass2"));
    users.push(new User().init("user3", "user3@mail.com", "pass3"));
    users.push(new User().init("user4", "user4@mail.com", "pass4"));
    users.push(new User().init("user5", "user5@mail.com", "pass5"));


    this.connection.insert<User>({
      into: 'Users',
      values: users
    });

    let templates: Template[] = [];
    let sArr = [];
    sArr.push({ title: 'step 1-1', description: 'desc 1-1', type: 'task', userId: 1, order: 1 });
    sArr.push({ title: 'step 1-2', description: 'desc 1-2', type: 'task', userId: 1, order: 2 });
    sArr.push({ title: 'step 1-3', description: 'desc 1-3', type: 'task', userId: 1, order: 3 });

    let t = new Template();
    t = { title: 'Template 1', description: 'desc 1', steps: sArr };
    templates.push(t);

    sArr = [];
    sArr.push({ title: 'step 2-1', description: 'desc 2-1', type: 'task', userId: 1, order: 1 });
    sArr.push({ title: 'step 2-2', description: 'desc 2-2', type: 'task', userId: 1, order: 2 });
    sArr.push({ title: 'step 2-3', description: 'desc 2-3', type: 'task', userId: 1, order: 3 });
    t = { title: 'Template 2', description: 'desc 2', steps: sArr };
    templates.push(t);


    this.connection.insert<Template>({
      into: 'Templates',
      values: templates
    });

  }
}
