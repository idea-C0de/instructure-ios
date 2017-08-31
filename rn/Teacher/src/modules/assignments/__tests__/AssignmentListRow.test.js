//
// Copyright (C) 2016-present Instructure, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

/* @flow */

import 'react-native'
import React from 'react'
import AssignmentListRow from '../components/AssignmentListRow'
import moment from 'moment'

const template = {
  ...require('../../../__templates__/assignments'),
}

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

test('renders correctly', () => {
  let assignment = template.assignment({ due_at: null })
  assignment.needs_grading_count = 0
  let tree = renderer.create(
    <AssignmentListRow assignment={assignment} tintColor='#fff' />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

test('renders correctly with needs_grading_count', () => {
  let assignment = template.assignment({ due_at: null })
  assignment.needs_grading_count = 5
  let tree = renderer.create(
    <AssignmentListRow assignment={assignment} tintColor='#fff' />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

test('renders correctly with closed due dates', () => {
  const one = moment().subtract(1, 'day').format()
  const two = moment().subtract(2, 'day').format()
  const three = moment().subtract(3, 'day').format()
  const assignment = template.assignment({
    lock_at: null,
    all_dates: [template.assignmentDueDate({ lock_at: one }), template.assignmentDueDate({ lock_at: two }), template.assignmentDueDate({ lock_at: three })],
  })

  let tree = renderer.create(
    <AssignmentListRow assignment={assignment} tintColor='#fff' />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

test('renders correctly with open due dates', () => {
  const one = moment().add(1, 'day').format()
  const two = moment().add(2, 'day').format()
  const three = moment().add(3, 'day').format()
  const assignment = template.assignment({
    lock_at: null,
    all_dates: [template.assignmentDueDate({ lock_at: one }), template.assignmentDueDate({ lock_at: two }), template.assignmentDueDate({ lock_at: three })],
  })

  let tree = renderer.create(
    <AssignmentListRow assignment={assignment} tintColor='#fff' />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

test('renders correctly with selected props', () => {
  let assignment = template.assignment({ due_at: null })
  assignment.needs_grading_count = 0
  let tree = renderer.create(
    <AssignmentListRow assignment={assignment} tintColor='#fff' underlayColor='#eee' selectedColor='#f00'/>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

test('renders correctly published icon', () => {
  let assignment = template.assignment({ published: true })
  let tree = renderer.create(
    <AssignmentListRow assignment={assignment}/>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

test('renders correctly not published icon', () => {
  let assignment = template.assignment({ published: false })
  let tree = renderer.create(
    <AssignmentListRow assignment={assignment}/>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

test('renders correctly assignment icon', () => {
  let assignment = template.assignment({ submission_types: ['on_paper'] })
  let tree = renderer.create(
    <AssignmentListRow assignment={assignment}/>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

test('renders correctly quiz icon', () => {
  let assignment = template.assignment({ submission_types: ['online_quiz'] })
  let tree = renderer.create(
    <AssignmentListRow assignment={assignment}/>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

test('renders correctly discussion icon', () => {
  let assignment = template.assignment({ submission_types: ['discussion_topic'] })
  let tree = renderer.create(
    <AssignmentListRow assignment={assignment}/>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})