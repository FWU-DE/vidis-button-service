import VuexORM from "@vuex-orm/core";

import SampleModel from "@/store/ORM-Stores/models/SampleModel";
import IdPs from "@/store/ORM-Stores/models/idps";
import Esc from "@/store/ORM-Stores/models/esc";

const database = new VuexORM.Database();

database.register(SampleModel);
database.register(IdPs);
database.register(Esc);
const installedDB = VuexORM.install(database);

export { database, installedDB };
