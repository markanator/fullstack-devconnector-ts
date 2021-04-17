import React from "react";
import { connect } from "react-redux";
import { RootState } from "../state/store";
import { useDispatch } from "react-redux";
import { removeAlert } from "../state/AlertSlice";

const Alert = ({ alerts }) => {
  const dispatch = useDispatch();

  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => {
      setTimeout(() => {
        dispatch(removeAlert(alert.id));
      }, 5000);
      return (
        <div key={alert.id} className={`alert alert-${alert.alertType}`}>
          {alert.msg}
        </div>
      );
    })
  );
};

const mapStateToProps = (state: RootState) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
