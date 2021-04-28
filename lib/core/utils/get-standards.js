import standards from '../../standards/index'
import clone from './clone'

export default function getStandards() {
  return clone(standards);
}
