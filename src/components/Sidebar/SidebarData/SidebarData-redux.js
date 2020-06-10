import { connect } from 'react-redux';

import SidebarData from './SidebarData';
import {setDataSets, setLoading} from '../../../actions/app_action';

const mapStateToProps = state => ({
  dataSets: state.app.dataSets
});

const mapDispatchToProps = dispatch => ({
  setDataSets(dataSets) {
    dispatch(setDataSets(dataSets));
  },
  setLoading(flag) {
    dispatch(setLoading(flag));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SidebarData);
