import VuexORM from "@vuex-orm/core";

import SampleModel from "@/store/ORM-Stores/models/SampleModel";

const database = new VuexORM.Database();

database.register(SampleModel);
const installedDB = VuexORM.install(database);

export { database, installedDB };
