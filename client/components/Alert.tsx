import React from "react";
import { connect } from "react-redux";
import { RootState } from "../state/store";

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));

const mapStateToProps = (state: RootState) => ({
  alerts: state.alert.alerts,
});

export default connect(mapStateToProps)(Alert);
