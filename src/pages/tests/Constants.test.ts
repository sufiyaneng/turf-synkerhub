import { days, getDay, tabs } from "../../constants";


describe('Constants',()=>{
    it('tabs values match correctly',()=>{
        expect(tabs).toStrictEqual([
            {
              label: "Upcoming",
              value: "UPCOMING",
            },
            {
              label: "Previous",
              value: "PREVIOUS",
            },
            {
              label: "Cancelled",
              value: "CANCELLED",
            }
          ])
    })

    it('getDay function works correctly',()=>{
      expect(getDay('')).toStrictEqual("-")
      expect(getDay('1')).toStrictEqual("Mon")
      expect(getDay('2')).toStrictEqual("Tue")
      expect(getDay('3')).toStrictEqual("Wed")
      expect(getDay('4')).toStrictEqual("Thu")
      expect(getDay('5')).toStrictEqual("Fri")
      expect(getDay('6')).toStrictEqual("Sat")
      expect(getDay('7')).toStrictEqual("Sun")

    })

    it('its a array', ()=>{
      expect(days).toStrictEqual(["1", "2", "3", "4", "5", "6", "7"])
    })
})