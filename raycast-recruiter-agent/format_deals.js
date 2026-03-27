const fs = require('fs');
const path = require('path');

console.log("Reading big JSON file...");
const dataPath = path.join(__dirname, '../deals_cache_2026-03-22_12-18-41.json');
const rawData = fs.readFileSync(dataPath, 'utf8');
const deals = JSON.parse(rawData);

console.log(`Parsed ${deals.length} deals. Formatting top 100 open deals...`);

const formattedDeals = deals
  .filter(d => d.status === 'open')
  .slice(0, 500)
  .map(d => ({
    id: d.id.toString(),
    title: d.title,
    status: d.status,
    value: d.value,
    date: d.add_time,
    pipeline_id: d.pipeline_id,
    stage_id: d.stage_id,
    website: d.custom_fields ? d.custom_fields["709ea88df13e3523682236ce2a84af2dca3d1c79"] : null,
    linkedin: d.custom_fields ? d.custom_fields["6eb91f2874ba783af0c2251ad9f03a9797f59746"] : null
  }));

const outPath = path.join(__dirname, 'src/deals.json');
fs.writeFileSync(outPath, JSON.stringify(formattedDeals, null, 2));
console.log(`Wrote ${formattedDeals.length} deals to src/deals.json`);
