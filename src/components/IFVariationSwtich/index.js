import React from "react";

import Switch from "components/switch";

import { grey, darkBlack, silver } from "theme/variables";
import { labelDarkGrey } from "theme/mixins";

const thickness = 30;
const length = 65;

const styles = {
  wrapper: {
    minWidth: length * 1.8,
    height: 69,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between"
  },
  switchTitle: {
    ...labelDarkGrey,
    fontFeatureSettings: '"frac" 1, "liga" 1, "kern" 1'
  },
  label: labelDarkGrey,
  switchWrapper: {
    width: length,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  labelWrapper: {
    width: length - 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 5
  },
  switchOuter: {
    backgroundColor: darkBlack,
    borderRadius: thickness * 0.475
  },
  switchInner: {
    backgroundColor: silver,
    borderRadius: "50%",
    border: `solid ${grey} 2px`
  }
};

const switchValues = {
  A: "A",
  B: "B"
};

const IFVariationSwitch = props => {
  const { onChange, position } = props;
  return (
    <div style={styles.wrapper}>
      <div style={styles.switchTitle}>I / F - VARIATION</div>
      <div style={styles.switchWrapper}>
        <Switch
          name="I/F Variation"
          position={position}
          onChange={onChange}
          direction="horizontal"
          values={switchValues}
          thickness={thickness}
          length={length}
          padding={4}
          innerThickness={thickness - 8}
          outerStyle={styles.switchOuter}
          innerStyle={styles.switchInner}
        />
        <div style={styles.labelWrapper}>
          <div style={styles.label}>A</div>
          <div style={styles.label}>B</div>
        </div>
      </div>
    </div>
  );
};

export default IFVariationSwitch;
