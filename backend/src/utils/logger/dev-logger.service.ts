import { Injectable, ConsoleLogger } from '@nestjs/common';

@Injectable()
export class DevLogger extends ConsoleLogger {}

/** Пока что не реализованы дополнительные методы логирования,
 * поэтому тесты не требуются. В будущем, когда будут добавлены новые методы логирования,
 * необходимо будет написать соответствующие тесты для них.
 */
