## 数据库初始化说明文件

- 采用`MySQL` + `Sequelize`的实现方式。
- `bin/` 目录下是数据库初始化脚本，在配置或更改数据库及表的时候使用。

## 删除并重新创建表

```bash
SET foreign_key_checks = 0
drop table dbms.departments;
SET foreign_key_checks = 1

-- 删除用
SET sql_safe_updates = 0;

set global secure_file_priv='';
```

### Create Tables

```shell script
$ npx sequelize-cli model:create --name User --attributes name:String
$ npx sequelize-cli model:create --name Seed --attributes name:String
$ npx sequelize-cli model:create --name Single --attributes name:String
$ npx sequelize-cli model:create --name Multiple --attributes name:String
$ npx sequelize-cli model:create --name Photo --attributes name:string,description:string,photoPath:string

$ npx sequelize-cli db:migrate
```

## SQL TIPS

- 要更新关联，用`findByPk`而不是`findById`
