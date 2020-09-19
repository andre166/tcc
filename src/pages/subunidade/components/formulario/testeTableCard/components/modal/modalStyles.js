
export const styles = theme => ({
    container: {
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'wrap',
    },
    buttonContainer: {
      display: 'flex',
      flexDirection: 'rowm',
      justifyContent: 'space-around',
      marginTop: 20
    },
    button: {
      fontSize: 12,
      padding: 4,
    },
    modal: {
      maxWidth: 500,
     padding: "10px 15px 20px 15px",
    },
    buttonSuccess: {
      backgroundColor: '#1d3724',
      height: 35,
      margin: '15px 0px 10px 0px',
      '&:hover': {
          background: "#4a5442",
      }
      },
      buttonDanger: {
          backgroundColor: '#ed3237',
          height: 35,
          margin: '15px 0px 10px 0px',
          '&:hover': {
            background: "#7f3436",
         },
      },

      buttonSuccessSm: {
        backgroundColor: '#1d3724',
        '&:hover': {
            background: "#4a5442",
        }
        },
        buttonDangerSm: {
            backgroundColor: '#ed3237',
            '&:hover': {
              background: "#7f3436",
           },
        },
  });