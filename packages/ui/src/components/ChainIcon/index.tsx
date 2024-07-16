import chainCoing from '@/chainConfig';
import useStyles from '@/components/ChainIcon/useStyles';
import Image, { type ImageProps } from 'next/image';
import baseIconLight from 'shared-utils/assets/icons/base-light.svg?url';
import baseLogoLight from 'shared-utils/assets/logos/base-light.svg?url';
import int3faceIconDark from 'shared-utils/assets/icons/int3face-dark.svg?url';
import int3faceIconLight from 'shared-utils/assets/icons/int3face-light.svg?url';
import int3faceLogoDark from 'shared-utils/assets/logos/int3face-dark.svg?url';
import int3faceLogoLight from 'shared-utils/assets/logos/int3face-light.svg?url';

interface IconProps extends Omit<ImageProps, 'id' | 'src'> {
  type: 'icon' | 'logo';
  chainName?: string;
}

const ChainIcon = ({
  className,
  type,
  chainName = chainCoing().chainName,
  ...props
}: IconProps) => {
  const { classes, cx } = useStyles();

  let [iconDark, iconLight] =
    type === 'icon' ? [baseIconLight, baseIconLight] : [baseLogoLight, baseLogoLight];
  switch (chainName) {
    case 'int3face':
      [iconDark, iconLight] =
        type === 'icon'
          ? [int3faceIconDark, int3faceIconLight]
          : [int3faceLogoDark, int3faceLogoLight];
      break;
    default:
      throw new Error(`chain ${chainName} not supported`);
  }
  return (
    <span className={cx(className, classes.container)}>
      <Image width={0} height={0} src={iconDark} {...props} className={classes.dark} unoptimized />
      <Image
        width={0}
        height={0}
        src={iconLight}
        {...props}
        className={classes.light}
        unoptimized
      />
    </span>
  );
};

export default ChainIcon;
