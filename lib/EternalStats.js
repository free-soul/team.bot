const cheerio = require('cheerio');
const resps = require('./Http');
const GapRemove = require('./StringUtils');
 
/**
 * 
 * @param {string} name 
 */
module.exports = function (name) {

    return resps('https://dak.gg/bser/players/' + encodeURI(name) + '?season=SEASON_5')
        .then(html => {
            
            if (html === undefined) return false; 
            else {
                const $ = cheerio.load(html.data);
                var Data = {};

                if (GapRemove($('h5.player-title').text()) == '일반 게임') return false; 
                const Header = 'section.player-header';
                const Header_Data = {
                    Name: $(Header + ' h3.player-header__name').text(),
                    LastUpdated: $(Header + ' div.player-header__last-updated').text().replace('Last Updated: ', ''),
                    Level: GapRemove($(Header + ' div.player-header__tags div.player-header__tag-level').text())
                }
                Data.Header = Header_Data;

                $('div.row.row-normal div.col-lg-4').each(function(number) {
                    if ($(this).find('p.empty-text').text().length <= 0) {
                        const Rank_Data = {
                            Point: $(this).find('h3.player-tier__summary__lp b').text(),
                            Rank: $(this).find('div.player-tier__summary__rank span').first().text()
                        }

                        $(this).find('div.player-tier__stats__item').each(function(room) {
                            const value = GapRemove($(this).find('div.player-tier__stats__item__value').text());
                            if (room == 0) Rank_Data.AverageTop = value;
                            if (room == 1) Rank_Data.WinPercentage = value;
                            if (room == 2) Rank_Data.Games = value;
                            if (room == 3) Rank_Data.AverageKill = value;
                            if (room == 4) Rank_Data.Top2 = value;
                            if (room == 5) Rank_Data.AverageDamage = value;
                            if (room == 6) Rank_Data.AverageAssistant = value;
                            if (room == 7) Rank_Data.Top3 = value;
                            if (room == 8) Rank_Data.AverageAnimalKill = value;
                        })
                        if (number == 0) Data.Solo = Rank_Data;
                        if (number == 1) Data.Duo = Rank_Data;
                        if (number == 2) Data.Squad = Rank_Data;
                    }
                })
                return Data;
            }
        })
}