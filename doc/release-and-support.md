# Axe-core Release & Support Policy

## Release Cadence

Axe-core is used in many [projects and environments](./projects.md). Not all of these are able to upgrade at a rapid pace. Because of this, updates to axe-core are limited in the following ways. For details on what types of changes can come in these releases, see [backward compatibility](./backwards-compatibility-doc.md).

- **Major releases**: Major axe-core releases likely include breaking changes, and provide opportunities for Deque to remove previously deprecated features. As an absolute minimum, there will be a 12 month period between major releases of axe-core, except if this is necessary for security.

- **Minor Releases**: Axe-core strives to publish three to five minor releases every year. There will be at least 3 weeks between each minor release, except if this is necessary for security.

- **Patch Releases**: There are no restrictions on the number of patches released for axe-core.

For all major and minor releases a milestone will be created at least three weeks ahead of the release. The axe-core team strives to complete all issues in that milestone, although on occasion issues lower in the milestone may be dropped, and high priority issues may be added. Axe-core will observe a code freeze one week before releasing a major or minor version. Only documentation, metadata, and localizations may be modified during code freeze.

## Security Updates

Once a new major or minor version is released, the prior versions will no longer be updated, except if this is necessary for security. Security updates will be provided for major and minor versions **up to 18 months** old. For example, if version 4.0.0 was released 17 months ago, and a security issue is discovered a new patch will be released on the 4.0 line. However if 3.5.0 was released 20 months ago, even if 3.5.2 was released 17 months ago, a security patch for the 3.5 line may **not** be provided.

The axe-core team considers security its very highest priority. While security vulnerabilities in axe-core are rare, they do happen. When they do, resolving the issue becomes our highest priority. Any commitments made prior to the discovery may be dropped.

## Recommended Use of Versions

In order to ensure the best quality from axe-core, we encourage everyone to regularly upgrade their version of axe-core, to try to stay as close to the latest release as possible. Depending on how axe-core is used, upgrading to a new minor or major version may result in new issues getting reported. To handle this, we recommend that you set aside time to upgrade your version of axe-core at least twice a year.

Additionally, we recommend that you always use the latest patch version of whichever minor version you are on. For example if you are using axe-core 3.5.5, and 3.5.6 is released it is best to upgrade immediately. Patch releases of axe-core should not find new issues, although they occasionally resolve issues in the case of false positives.

Ensuring that you always use the latest available patch version of axe-core guarantees that you are using the most secure version. This minor line must have been released within the last 18 months. See [security updates](#security-updates).
