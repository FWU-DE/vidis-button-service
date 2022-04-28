import VuexORM from "@vuex-orm/core";

import SampleModel from "@/store/ORM-Stores/models/SampleModel";
import IdPs from "@/store/ORM-Stores/models/idps";

const database = new VuexORM.Database();

database.register(SampleModel);
database.register(IdPs);
const installedDB = VuexORM.install(database);

export { database, installedDB };
