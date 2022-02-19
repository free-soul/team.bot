const cheerio = require('cheerio');
const resps = require('./Http');
const GapRemove = require('./StringUtils');

module.exports = function(name) {
    return resps('https://poro.gg/summoner/kr/' + encodeURI(name))
        .then(html => {
            if (html === undefined) return false;
            const $ = cheerio.load(html.data);
            const Header = $('div.summoner-tab-content.active div.row.row-small');
            var return_data = {
                    Name: name,
                    IconURL: 'https:' + $('div.summoner-header__portrait img').attr('src'),
                    Level: GapRemove($('div.level').text())
            };

            Header.find('div.col-12.col-lg-4.order-1 div.row.no-gutters div.col-12').each(function(number) {

                const Rank = GapRemove($(this).find('div.summoner-tier__description div.tier-string').text());
                if (Rank != '언랭') {
                    const Data = {
                        Rank: Rank,
                        Point: $(this).find('div.league-point ').text().replace(' LP', ''),
                        WinRate: GapRemove($(this).find('div.win-rate').text()).replace('승률', ''),
                    }
                    var _div = GapRemove($(this).find('div.summoner-tier__rate div').next().text())
                                    .replace('(', '').replace(')', '').replace('승', ' ').replace('패', '').split(' ');
                    Data.Div = {
                        Win: _div[0],
                        Lose: _div[1]
                    } 

                    if (number == 0) return_data.Solo = Data; 
                    else if (number == 1) return_data.Free = Data;
                }

            });
            return return_data;
        })
}