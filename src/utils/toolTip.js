import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

const LightTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: "#222831",
      color: theme.palette.common.white,
      boxShadow: theme.shadows[1],
      fontSize: 14,
      padding: '8px 12px 8px 12px'
    },
  }))(Tooltip);

  export default LightTooltip;