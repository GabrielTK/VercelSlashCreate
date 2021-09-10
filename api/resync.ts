import { VercelRequest, VercelResponse } from "@vercel/node";
import { slash } from "..";

const api = async (req: VercelRequest, res: VercelResponse) => {
  slash.syncCommands();
  let awaiter = new Promise((resolve,reject) => {
  slash.on('synced', () => {
    console.log("Elapsed Sync")
   resolve(true);
  });
  });
  slash.syncCommands();
  await awaiter;
  res.status(200).send(JSON.stringify(slash.commands.map(c => [{name: c.commandName, description: c.description}])));
}
export default api;
