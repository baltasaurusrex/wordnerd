import Relation from "../models/Relation.js";
import Fuse from "fuse.js";
import { connectMongoDB, generateMongoId } from "../utils/mongoose.js";

export async function createRelationsFromNewEntry(newEntry) {
  try {
    let modifiedEntry = { ...newEntry };
    let { _id, relations, creator } = modifiedEntry;

    console.log("relations.length > 0 ", relations.length > 0);
    if (relations.length > 0) {
      // https://stackoverflow.com/questions/40140149/use-async-await-with-array-map
      console.log("mapping through the relations array,");
      console.log("creating actual relations for each related object,");
      console.log("and returning the newly created relations");
      // for each entry in the relation array

      console.log("modifiedEntry.relations, beg: ", modifiedEntry.relations);
      modifiedEntry.relations = await Promise.all(
        relations.map(async (entry) => {
          console.log("entry: ", entry);
          let relation = new Relation({
            origin: _id,
            entry: entry.id,
            creator,
            likes: [creator],
          });
          relation = await relation.save();
          console.log("returning newly saved relation", relation);
          return relation;
        })
      );
    }
    console.log("modifiedEntry.relations, end: ", modifiedEntry.relations);
    console.log("modifiedEntry, end: ", modifiedEntry);

    return modifiedEntry;
  } catch (err) {
    throw err;
  }
}

export async function deleteRelation(relation_id) {
  try {
    const res = await Relation.findByIdAndDelete(relation_id);
    console.log("deleteRelation res: ", res);
    return res;
  } catch (err) {
    return err;
  }
}
