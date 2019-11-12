import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import ProjectList from './ProjectList';

Enzyme.configure({ adapter: new Adapter() });

describe('<ProjectList />', () => {
  let wrapper;
  let initialProps;
  beforeEach(() => {
    initialProps = {
      jwtoken: 'jwtoken',
      projectList: [{ token: 1 }, { token: 2 }],
      totalProjectsLength: 2,
      currentPageNo: 0,
      handleModalOpen: jest.fn(),
      handleModalClose: jest.fn(),
      isModalOpened: false,
      listCreateFailMessage: null,
      onProjectCreate: jest.fn(),
      onProjectListLoad: jest.fn()
    }
    wrapper = shallow(
      <ProjectList
        {...initialProps}
      />
    );
  });

  it('renders ProjectList page', () => {
    expect(wrapper.find('.app-content')).toHaveLength(1);
    expect(wrapper.find('.content-title')).toHaveLength(1);
    expect(wrapper.find('.content-title').text()).toEqual('My Projects');
    expect(wrapper.find('tbody > tr')).toHaveLength(initialProps.projectList.length);
  });

  it('renders tr.no-data if projectList is an empty array', () => {
    wrapper = shallow(
      <ProjectList
        {...initialProps}
        projectList={[]}
      />
    );

    expect(wrapper.find('tr.no-data')).toHaveLength(1);
    expect(wrapper.find('tbody > tr')).toHaveLength(1);
  });

  it('renders pagination if totalProjectsLength is greater than 10', () => {
    expect(wrapper.find('.pagination')).toHaveLength(0);
    wrapper = shallow(
      <ProjectList
        {...initialProps}
        totalProjectsLength={11}
      />
    );
    expect(wrapper.find('.pagination')).toHaveLength(1);
  });

  it('calls onProjectListLoad function if user click Prev button and currentPageNo is not 0', () => {
    wrapper = shallow(
      <ProjectList
        {...initialProps}
        totalProjectsLength={11}
      />
    );

    let btn = wrapper.find('.btn-page').first();
    expect(btn.hasClass('disabled')).toEqual(true);
    btn.simulate('click');
    expect(initialProps.onProjectListLoad).not.toHaveBeenCalled();

    let currentPageNo = 1;
    wrapper = shallow(
      <ProjectList
        {...initialProps}
        totalProjectsLength={11}
        currentPageNo={currentPageNo}
      />
    );

    btn = wrapper.find('.btn-page').first();
    expect(btn.hasClass('disabled')).toEqual(false);
    btn.simulate('click');
    expect(initialProps.onProjectListLoad).toHaveBeenCalledWith(initialProps.jwtoken, currentPageNo - 1);
  });

  it('calls onProjectListLoad function if user click Next button with certain condition', () => {
    let currentPageNo = 1;
    wrapper = shallow(
      <ProjectList
        {...initialProps}
        totalProjectsLength={11}
        currentPageNo={currentPageNo}
      />
    );

    let btn = wrapper.find('.btn-page').last();
    expect(btn.hasClass('disabled')).toEqual(true);
    btn.simulate('click');
    expect(initialProps.onProjectListLoad).not.toHaveBeenCalled();

    currentPageNo = 0;
    wrapper = shallow(
      <ProjectList
        {...initialProps}
        totalProjectsLength={11}
      />
    );

    btn = wrapper.find('.btn-page').last();
    expect(btn.hasClass('disabled')).toEqual(false);
    btn.simulate('click');
    expect(initialProps.onProjectListLoad).toHaveBeenCalledWith(initialProps.jwtoken, currentPageNo + 1);
  });
});
