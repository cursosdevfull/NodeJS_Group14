import { In } from "typeorm";

import { AppDataSource } from "./datasource";
import { MedicEntity } from "./entities/medic";

AppDataSource.initialize()
  .then(async () => {
    const PAGE_SIZE = 3;
    const currentPage = 0;

    const medicRepository = AppDataSource.getRepository(MedicEntity);
    const [records, count] = await medicRepository.findAndCount({
      skip: PAGE_SIZE * currentPage,
      take: PAGE_SIZE,
      where: { age: In([25, 28]) },
    });

    console.log(`Total records: ${count}`);
    console.log(JSON.stringify(records, null, "\t"));
  })
  .catch(console.log);
