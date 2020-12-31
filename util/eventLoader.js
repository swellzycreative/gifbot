const reqEvent = (event) => require(`../events/${event}`);
module.exports = client => {
  client.on('ready', () => reqEvent('ready')(client));
  client.on('message', reqEvent('message'));
};
//created by lrowsxrd videonda paylaşacaksan discorddan bana ulaşmak zorundasın yoksa telif xD