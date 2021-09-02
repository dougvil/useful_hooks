import { makeStyles } from '@material-ui/core';
import Shepherd from 'shepherd.js';
import 'shepherd.js/dist/css/shepherd.css';
import { useDidMountEffect } from './useDidMount';

const tourOptions = {
  scrollTo: false,
  keyboardNavigation: false,
  useModalOverlay: true
};

const useStyles = makeStyles((theme) => ({
  root: {
    '&.shepherd-has-title': {
      '& .shepherd-arrow:before': {
        backgroundColor: ['#fff', '!important']
      },
      '& .shepherd-header': {
        backgroundColor: 'transparent',
        borderRadius: '4px 4px 0 0',
        padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`
      },
      '& .shepherd-title': {
        fontSize: '18px',
        fontWeight: 'bold'
      }
    },
    borderRadius: '4px',
    '& .shepherd-header': {
      padding: 0
    },
    '& .shepherd-cancel-icon': { display: 'none' },
    '& .shepherd-text': {
      fontSize: '14px',
      lineHeight: 1.2,
      padding: `${theme.spacing(2)}px ${theme.spacing(2)}px ${theme.spacing(
        4
      )}px`
    },
    '& .shepherd-button': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      padding: '8px 12px',
      boxShadow: theme.shadows[1],
      textTransform: 'uppercase',
      fontSize: '12px',
      borderRadius: '4px',
      fontWeight: 'normal',
      '&:hover': {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText
      },
      '&.shepherd-button-secondary': {
        backgroundColor: theme.palette.light.main,
        color: theme.palette.light.contrastText
      }
    },
    '& .shepherd-footer': {
      backgroundColor: theme.palette.grey[200],
      padding: theme.spacing(1)
    }
  }
}));

export const useShepherdTour = ({ onCancel }) => {
  const classes = useStyles();
  const tour = new Shepherd.Tour({
    defaultStepOptions: {
      canClickTarget: false,
      cancelIcon: {
        enabled: true
      },
      modalOverlayOpeningRadius: 4,
      classes: classes.root
    },
    ...tourOptions
  });

  useDidMountEffect(() => {
    Shepherd.once('cancel', onCancel);
    Shepherd.once('sair', onCancel);
    Shepherd.once('complete', onCancel);
  });

  return [tour];
};
