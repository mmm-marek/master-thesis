/*
NOTE: 
svgo is used by svgr to optimize SVGs.
By default, svgo removes the viewBox from SVGs which breaks the ability to resize SVGs with CSS.
The following: 

import Icon from './icon.svg';
...
<Icon style={{ width: '100px', height: '100px' }} />

Does not work - icon will not resize.
We need to turn off the removeViewBox option in svgo. 
*/
module.exports = {
	multipass: true,
	plugins: [
		{
			name: 'preset-default',
			params: {
				overrides: {
					// viewBox is required to resize SVGs with CSS.
					// @see https://github.com/svg/svgo/issues/1128
					removeViewBox: false
				}
			}
		}
	]
}
