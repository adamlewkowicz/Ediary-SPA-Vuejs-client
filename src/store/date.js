import Vue from 'Vue';
import moment from 'moment';

const actualDate = moment();

const date = {
  state: {
    todays: actualDate.format('YYYY-MM-DD'),
    picked: actualDate.format('YYYY-MM-DD'),
    pickedObj: actualDate,
    pickedWeek: moment(actualDate).add(-3, 'days').format('YYYY-MM-DD')
  },
  mutations: {
    CHANGE_PICKED_DATE (state, date) {
      state.picked = date;
      state.pickedObj = moment(date, 'YYYY-MM-DD');
    },
    INCREASE_PICKED_WEEK (state) {
      state.pickedWeek = moment(state.pickedWeek, 'YYYY-MM-DD').add(7, 'days').format('YYYY-MM-DD');
      state.picked = moment(state.pickedWeek, 'YYYY-MM-DD').add(3, 'days').format('YYYY-MM-DD');
    },
    DECREASE_PICKED_WEEK (state) {
      state.pickedWeek = moment(state.pickedWeek, 'YYYY-MM-DD').add(-7, 'days').format('YYYY-MM-DD');
      state.picked = moment(state.pickedWeek, 'YYYY-MM-DD').add(3, 'days').format('YYYY-MM-DD');
    }
  },
}

export default date;
