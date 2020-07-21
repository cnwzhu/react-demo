import React from 'react';
import ReactDOM from 'react-dom';
import { Map, Markers } from 'react-amap';
import { Loading } from '@@/plugin-dva/connect';
import { connect } from 'umi';
import { Avatar, Card, Col, Modal, Row } from 'antd';
import Flv from '@/components/flv';

type Props = {}

class MapPage extends React.Component<any, any> {
  private readonly mapCenter: { latitude: number; longitude: number };
  private readonly markersEvents: any;
  private readonly container: HTMLDivElement;

  constructor(props: any) {
    super(props);
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
                   videoUrl={`http://192.168.31.67:18080/live/${data.commonCode}.flv`}
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
    }, 30000);
  }

  render() {
    const { allDevice } = this.props;
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
        <Map plugins={['ToolBar']} zoom={10} center={this.mapCenter}>
          <Markers
            markers={allDevice.map((it: any) => ({
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
        <div className="site-card-wrapper">
          <Row gutter={16}>
            <Col span={8}>
              <Card title="所有设备" bordered={false}>
                <Avatar size={50}>{allDevice.length}</Avatar>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="在线设备" bordered={false}>
                <Avatar size={50}>{allDevice.filter((it: any) => it.offlineFlag === 1).length}</Avatar>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="推流设备" bordered={false}>
                <Avatar size={50}>{allDevice.filter((it: any) => it.pushFlag === 1).length}</Avatar>
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
