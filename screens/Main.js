/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, View, Text} from 'react-native';

import {
  ViroText,
  ViroARScene,
  ViroARSceneNavigator,
  ViroARPlaneSelector,
  ViroARPlane,
  ViroBox,
  ViroSphere,
  ViroNode,
  ViroPolyline,
} from 'react-viro';

import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import FinderView from './FinderView';
import {useDispatch, useSelector} from 'react-redux';
import {
  getFirstPoint,
  getSecondPoint,
  getViewFinder,
} from '../services/selectors/points-selector';
import {
  setFirstPoint,
  setSecondPoint,
  setViewFinderPoint,
} from '../services/actions/points-actions';
import {store} from '../store';

const AnchorScene = () => {
  return (
    <ViroARScene
      displayPointCloud={true}
      onAnchorFound={(a) => {
        console.log('[F] Anchor found ' + a.anchorId);
        // console.log(a.anchorId);
      }}
      // onAnchorUpdated={(a) => {
      //   console.log('[U] Anchor Updated ' + a.anchorId);
      //   // console.log(a);
      //   // console.log(a.anchorId);
      // }}
      onAnchorRemoved={(a) => {
        console.log('[D] Anchor Removed ' + a.anchorId);
        // console.log(a.anchorId);
      }}>
      <ViroARPlane minHeight={0.1} minWidth={0.1} alignment={'Horizontal'}>
        <ViroBox position={[0, 0.25, 0]} scale={[0.1, 0.1, 0.1]} />
      </ViroARPlane>
    </ViroARScene>
  );
};

const MainScene = () => {
  return (
    <ViroARScene>
      <ViroText
        text="Hello World"
        position={[0, -0.1, -1]}
        style={styles.helloWorldTextStyle}
      />
      <ViroARPlaneSelector />
    </ViroARScene>
  );
};

const MeasureScene = () => {
  const [coord, setCoord] = useState([]);
  const dispatch = useDispatch();

  const firstPoint = useSelector(getFirstPoint);
  const secondPoint = useSelector(getSecondPoint);

  const onArHitResult = ({hitTestResults, cameraOrientation}) => {
    // const forward = cameraOrientation.forward.map(
    //   (x) => Math.round((x + Number.EPSILON) * 100) / 100,
    // );
    // const position = cameraOrientation.position.map(
    //   (x) => Math.round((x + Number.EPSILON) * 100) / 100,
    // );
    // const rotation = cameraOrientation.rotation.map(
    //   (x) => Math.round((x + Number.EPSILON) * 100) / 100,
    // );

    // const planes = hitTestResults.filter((r) => r.type !== 'FeaturePoint');
    // if (planes.length > 0) {
    //   console.log(planes[0].type);
    // }

    // Filter only feature points
    const points = hitTestResults.filter((r) => r.type === 'FeaturePoint');

    if (points.length === 0) {
      setCoord([]);
      // console.log('0');
    } else {
      // console.log('Points ' + points.length);
      for (let i = 0; i < points.length; i++) {
        const {transform} = points[i];
        const position = transform.position.map(
          (p) => Math.round((p + Number.EPSILON) * 100) / 100,
        );
        // X Y Z
        // console.log(position);
        setCoord(transform.position);
        dispatch(setViewFinderPoint(transform.position));
      }
      // console.log(points[0]);
    }
    // console.log(points.length);
  };

  return (
    <ViroARScene onCameraARHitTest={onArHitResult}>
      {firstPoint && <ViroSphere radius={0.01} position={firstPoint} />}
      {secondPoint && <ViroSphere radius={0.01} position={secondPoint} />}
      {firstPoint && secondPoint && (
        <ViroPolyline points={[firstPoint, secondPoint]} thickness={0.004} />
      )}
      {firstPoint && !secondPoint && coord.length > 0 && (
        <ViroPolyline points={[firstPoint, coord]} thickness={0.002} />
      )}
      {coord.length > 0 && <FinderView position={coord} />}

      {/* <ViroBox position={[0, 0, -2]} scale={[0.1, 0.1, 0.1]} /> */}
    </ViroARScene>
  );
};

const Main = () => {
  useEffect(() => {
    check(PERMISSIONS.IOS.CAMERA)
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              'This feature is not available (on this device / in this context)',
            );
            break;
          case RESULTS.DENIED:
            request(PERMISSIONS.IOS.CAMERA).then((result) => {
              // …
            });
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch((error) => {
        // …
      });
  }, []);

  const [isSceneOpened, setIsSceneOpened] = useState(true);
  const dispatch = useDispatch();

  // return (
  //   <React.Fragment>
  //     <View
  //       style={{
  //         position: 'absolute',
  //         left: 0,
  //         right: 0,
  //         top: 0,
  //         bottom: 0,
  //         width: '100%',
  //         height: '100%',
  //       }}>
  //       <ViroARSceneNavigator
  //         initialScene={{scene: MeasureScene}}
  //         arSceneNavigator={{coordinates: coordinates}}
  //       />

  //       <View style={{height: 100, alignItems: 'center', flexDirection: 'row'}}>
  //         <Button
  //           title="TOGGLE"
  //           onPress={async () => {
  //             isSceneOpened ? setIsSceneOpened(false) : setIsSceneOpened(true);
  //           }}
  //         />
  //         <Button
  //           title="Add sphere"
  //           onPress={async () => {
  //             setCoordinates([[0, 0, -1]]);
  //           }}
  //         />
  //       </View>
  //     </View>
  //   </React.Fragment>
  // );

  console.log(') ) ) ) ) render');

  return (
    <View style={styles.container}>
      <View style={[styles.container, {backgroundColor: 'lightgray'}]}>
        {isSceneOpened && (
          <ViroARSceneNavigator initialScene={{scene: MeasureScene}} />
        )}
        {!isSceneOpened && <Text>Scene not opened</Text>}
      </View>
      <View style={styles.bottomContainer}>
        <Button
          title="TOGGLE"
          onPress={async () => {
            if (isSceneOpened) {
              setIsSceneOpened(false);
              dispatch(setViewFinderPoint());
              dispatch(setFirstPoint(undefined));
              dispatch(setSecondPoint(undefined));
            } else {
              setIsSceneOpened(true);
            }
          }}
        />

        <Button
          title="ADD POINT"
          onPress={async () => {
            const viewPoint = getViewFinder(store.getState());
            const firstPoint = getFirstPoint(store.getState());

            if (!viewPoint) alert('Focus on surface');
            else if (!firstPoint) dispatch(setFirstPoint(viewPoint));
            else dispatch(setSecondPoint(viewPoint));
          }}
        />

        <Button
          title="STORE"
          onPress={async () => {
            console.log(store.getState());
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomContainer: {
    height: 80,
    flexDirection: 'row',
  },
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 40,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

export default Main;
