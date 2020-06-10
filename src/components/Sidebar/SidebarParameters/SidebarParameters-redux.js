import { connect } from 'react-redux';

import SidebarParameters from './SidebarParameters';
import {setReportParameters} from '../../../actions/app_action';

const mapStateToProps = state => ({
  parameters: state.app.parameters,
  dataSets: state.app.dataSets
});

const mapDispatchToProps = dispatch => ({
  setReportParameters(parameters) {
    dispatch(setReportParameters(parameters));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SidebarParameters);
