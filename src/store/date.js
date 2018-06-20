import Vue from 'Vue';
import moment from 'moment';

const actualDate = moment().format('YYYY-MM-DD');

const date = {
  state: {
    todays: actualDate,
    picked: actualDate,
    pickedWeek: moment(actualDate).add(-3, 'days').format('YYYY-MM-DD')
  },
  mutations: {
    CHANGE_PICKED_DATE (state, date) {
      state.picked = date;
    },
    INCREASE_PICKED_WEEK (state) {
      state.pickedWeek = moment(state.pickedWeek, 'YYYY-MM-DD').add(7, 'days').format('YYYY-MM-DD');
      state.picked = moment(state.pickedWeek, 'YYYY-MM-DD').add(3, 'days').format('YYYY-MM-DD');
    },
    DECREASE_PICKED_WEEK (state) {
      state.pickedWeek = moment(state.pickedWeek, 'YYYY-MM-DD').add(-7, 'days').format('YYYY-MM-DD');
      state.picked = moment(state.pickedWeek, 'YYYY-MM-DD').add(3, 'days').format('YYYY-MM-DD');
    }
  }
}

export default date;
