import React from 'react';
import ReactDOM from 'react-dom';
import { Map, Markers } from 'react-amap';
import { Loading } from '@@/plugin-dva/connect';
import { connect } from 'umi';
import { Card, Col, Divider, Modal, Row } from 'antd';
import Flv from '@/components/flv';

class MapPage extends React.Component<any, any> {
  private readonly mapCenter: { latitude: number; longitude: number };
  private readonly markersEvents: any;
  private readonly container: HTMLDivElement;

  constructor(props: any) {
    super(props);
    // @ts-ignore
    const flvBaseUrl = FLV_BASE_URL;
    this.mapCenter = { longitude: 118.79585266113283, latitude: 32.058789484402304 };
    this.container = document.createElement('div');
    document.body.appendChild(this.container);
    this.markersEvents = {
      click: (MapsOption: any, marker: any) => {
        const data = marker.B.extData.extData;

        if (data.pushFlag === 1) {
          ReactDOM.render(
            <Modal visible={true}
                   title="直播"
                   closable={true}
                   destroyOnClose={true}
                   footer={null}
                   onCancel={() => {
                     ReactDOM.unmountComponentAtNode(this.container);
                   }}>
              <Flv videoId={data.commonCode}
                   videoRef={data.commonCode}
                   controls={true}
                   videoUrl={`${flvBaseUrl}/${data.commonCode}.flv`}
              />
            </Modal>, this.container);
        } else {
          Modal.error({
            title: '警告',
            content: '设备未推流',
          });
        }
      },
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.props.dispatch({
        type: 'map/queryAll',
      });
    }, 5000);
  }

  render() {
    const allDevice = this.props.allDevice ? this.props.allDevice : [];
    const redIcon: any = {
      background: `url(${require('@/assets/location-off.svg')})`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      width: '30px',
      height: '40px',
      color: '#000',
      textAlign: 'center',
      lineHeight: '40px',
    };
    const blueIcon: any = {
      background: `url(${require('@/assets/location-on.svg')})`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      width: '30px',
      height: '40px',
      color: '#000',
      textAlign: 'center',
      lineHeight: '40px',
    };
    return (
      <div style={{ width: '100%', height: '80%' }}>
        <Map plugins={['ToolBar']}
             zoom={12}
             center={this.mapCenter}
             amapkey={'5ed31dcef8805f7574cf3d7247cb9cbe'}>
          <Markers
            markers={allDevice.filter((it:any)=>it.locationInfo!==null).map((it: any) => ({
              position: {
                longitude: it.locationInfo.lng,
                latitude: it.locationInfo.lat,
              },
              extData: it,
            }))}
            events={this.markersEvents}
            render={(value: any) => {
              return <div style={value.extData.pushFlag === 1 ? blueIcon : redIcon}/>;
            }}
          />
        </Map>
        <Divider orientation="left">设备状态</Divider>
        <div className="site-card-wrapper">
          <Row gutter={16}>
            <Col span={8}>
              <Card title="所有设备" bordered={false} size={'small'}>
                {allDevice.length}
              </Card>
            </Col>
            <Col span={8}>
              <Card title="在线设备" bordered={false} size={'small'}>
                {allDevice.filter((it: any) => it.offlineFlag === 1).length}
              </Card>
            </Col>
            <Col span={8}>
              <Card title="推流设备" bordered={false} size={'small'}>
                {allDevice.filter((it: any) => it.pushFlag === 1).length}
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ map, loading }: { map: any; loading: Loading }) => {
  return {
    ...map,
    loading: loading.models.map,
  };
};

export default connect(mapStateToProps)(MapPage);
