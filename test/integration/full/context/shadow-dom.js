describe('context test', () => {
  before(done => {
    axe.testUtils.awaitNestedLoad(done);
  });

  it('is able to include & exclude from frames in shadow DOM trees', async () => {
    const { violations } = await axe.run(
      {
        include: [
          [
            ['#shadowHost', '#shadowFrame1'],
            ['#shadowFrameHost', 'main']
          ],
          [
            ['#shadowHost', '#shadowFrame2'],
            ['#shadowFrameHost', 'main']
          ]
        ],
        exclude: [
          [
            ['#shadowHost', '#shadowFrame1'],
            ['#shadowFrameHost', 'main aside']
          ],
          [
            ['#shadowHost', '#shadowFrame2'],
            ['#shadowFrameHost', 'main aside']
          ]
        ]
      },
      { runOnly: 'label' }
    );

    const targets = violations[0].nodes.map(({ target }) => target);
    assert.deepEqual(targets, [
      [
        ['#shadowHost', '#shadowFrame1'],
        ['#shadowFrameHost', '#fail']
      ],
      [
        ['#shadowHost', '#shadowFrame2'],
        ['#shadowFrameHost', '#fail']
      ]
    ]);
  });
});
