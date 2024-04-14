<?php

declare(strict_types=1);

namespace App\Enums;

use BenSampo\Enum\Enum;

/**
 * @method static static SERVER_ERROR()
 */
final class MessageType extends Enum
{
    const SERVER_ERROR = 'Connection Failed. An error occurred while loading data from the server';
}
