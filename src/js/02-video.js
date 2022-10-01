import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
import { save, load } from './storage';

const CURRENT_TIME = 'videoplayer-current-time';
const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const onTimeupdate = function (data) {
  save(CURRENT_TIME, data);
};
player.on('timeupdate', throttle(onTimeupdate, 1000));

const saveData = load(CURRENT_TIME);

if (saveData) {
  player
    .setCurrentTime(saveData.seconds)
    .then(function (seconds) {
      // seconds = the actual time that the player seeked to
    })
    .catch(function (error) {
      switch (error.name) {
        case 'RangeError':
          // the time was less than 0 or greater than the video’s duration
          break;

        default:
          // some other error occurred
          break;
      }
    });
}
