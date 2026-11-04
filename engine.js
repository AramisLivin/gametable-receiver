(function() {
    if (typeof globalThis === 'object') return;
    Object.defineProperty(Object.prototype, '__magic__', {
        get: function() {
            return this;
        },
        configurable: true
    });
    __magic__.globalThis = __magic__;
    delete Object.prototype.__magic__;
})();

if (typeof Math.imul === 'undefined') {
    Math.imul = function imul(a, b) {
        return (a & 4294901760) * (b & 65535) + (a & 65535) * (b | 0) | 0;
    };
}

if (typeof ArrayBuffer.isView === 'undefined') {
    ArrayBuffer.isView = function(a) {
        return a != null && a.__proto__ != null && a.__proto__.__proto__ === Int8Array.prototype.__proto__;
    };
}

if (typeof Array.prototype.fill === 'undefined') {
    Object.defineProperty(Array.prototype, 'fill', {
        value: function(value) {
            if (this == null) {
                throw new TypeError('this is null or not defined');
            }
            var O = Object(this);
            var len = O.length >>> 0;
            var start = arguments[1];
            var relativeStart = start >> 0;
            var k = relativeStart < 0 ? Math.max(len + relativeStart, 0) : Math.min(relativeStart, len);
            var end = arguments[2];
            var relativeEnd = end === undefined ? len : end >> 0;
            var finalValue = relativeEnd < 0 ? Math.max(len + relativeEnd, 0) : Math.min(relativeEnd, len);
            while (k < finalValue) {
                O[k] = value;
                k++;
            }
            return O;
        }
    });
}

[ Int8Array, Int16Array, Uint16Array, Int32Array, Float32Array, Float64Array ].forEach((function(TypedArray) {
    if (typeof TypedArray.prototype.fill === 'undefined') {
        Object.defineProperty(TypedArray.prototype, 'fill', {
            value: Array.prototype.fill
        });
    }
}));

if (typeof Math.clz32 === 'undefined') {
    Math.clz32 = function(log, LN2) {
        return function(x) {
            var asUint = x >>> 0;
            if (asUint === 0) {
                return 32;
            }
            return 31 - (log(asUint) / LN2 | 0) | 0;
        };
    }(Math.log, Math.LN2);
}

if (typeof Math.hypot === 'undefined') {
    Math.hypot = function() {
        var y = 0;
        var length = arguments.length;
        for (var i = 0; i < length; i++) {
            if (arguments[i] === Infinity || arguments[i] === -Infinity) {
                return Infinity;
            }
            y += arguments[i] * arguments[i];
        }
        return Math.sqrt(y);
    };
}

if (typeof String.prototype.startsWith === 'undefined') {
    Object.defineProperty(String.prototype, 'startsWith', {
        value: function(searchString, position) {
            position = position || 0;
            return this.lastIndexOf(searchString, position) === position;
        }
    });
}

(function(factory) {
    if (typeof define === 'function' && define.amd) define([ 'exports' ], factory); else if (typeof exports === 'object') factory(module.exports); else globalThis['GameTable:core'] = factory(typeof globalThis['GameTable:core'] === 'undefined' ? {} : globalThis['GameTable:core']);
})((function(_) {
    'use strict';
    var imul = Math.imul;
    var isView = ArrayBuffer.isView;
    var clz32 = Math.clz32;
    var hypot = Math.hypot;
    initMetadataForInterface(CharSequence, 'CharSequence');
    initMetadataForInterface(Comparable, 'Comparable');
    initMetadataForClass(Number_0, 'Number');
    initMetadataForInterface(Sequence, 'Sequence');
    initMetadataForClass(asSequence$$inlined$Sequence$1, VOID, VOID, VOID, [ Sequence ]);
    initMetadataForCompanion(Companion);
    initMetadataForClass(Char, 'Char', VOID, VOID, [ Comparable ]);
    initMetadataForInterface(Collection, 'Collection');
    initMetadataForInterface(KtSet, 'Set', VOID, VOID, [ Collection ]);
    initMetadataForInterface(KtList, 'List', VOID, VOID, [ Collection ]);
    initMetadataForInterface(Entry, 'Entry');
    initMetadataForInterface(KtMap, 'Map');
    initMetadataForInterface(KtMutableMap, 'MutableMap', VOID, VOID, [ KtMap ]);
    initMetadataForInterface(MutableIterable, 'MutableIterable');
    initMetadataForCompanion(Companion_0);
    initMetadataForClass(Enum, 'Enum', VOID, VOID, [ Comparable ]);
    initMetadataForCompanion(Companion_1);
    initMetadataForClass(Long, 'Long', VOID, Number_0, [ Comparable ]);
    initMetadataForInterface(FunctionAdapter, 'FunctionAdapter');
    initMetadataForClass(arrayIterator$1);
    initMetadataForObject(ByteCompanionObject, 'ByteCompanionObject');
    initMetadataForObject(ShortCompanionObject, 'ShortCompanionObject');
    initMetadataForObject(IntCompanionObject, 'IntCompanionObject');
    initMetadataForObject(FloatCompanionObject, 'FloatCompanionObject');
    initMetadataForObject(DoubleCompanionObject, 'DoubleCompanionObject');
    initMetadataForObject(StringCompanionObject, 'StringCompanionObject');
    initMetadataForObject(BooleanCompanionObject, 'BooleanCompanionObject');
    initMetadataForObject(Digit, 'Digit');
    initMetadataForInterface(Comparator, 'Comparator');
    initMetadataForObject(Unit, 'Unit');
    initMetadataForClass(AbstractCollection, 'AbstractCollection', VOID, VOID, [ Collection ]);
    initMetadataForClass(AbstractMutableCollection, 'AbstractMutableCollection', VOID, AbstractCollection, [ MutableIterable, Collection ]);
    initMetadataForClass(IteratorImpl, 'IteratorImpl');
    initMetadataForClass(ListIteratorImpl, 'ListIteratorImpl', VOID, IteratorImpl);
    initMetadataForClass(AbstractMutableList, 'AbstractMutableList', VOID, AbstractMutableCollection, [ MutableIterable, KtList, Collection ]);
    initMetadataForClass(AbstractMap, 'AbstractMap', VOID, VOID, [ KtMap ]);
    initMetadataForClass(AbstractMutableMap, 'AbstractMutableMap', VOID, AbstractMap, [ KtMutableMap ]);
    initMetadataForClass(AbstractMutableSet, 'AbstractMutableSet', VOID, AbstractMutableCollection, [ MutableIterable, KtSet, Collection ]);
    initMetadataForCompanion(Companion_2);
    initMetadataForInterface(RandomAccess, 'RandomAccess');
    initMetadataForClass(ArrayList, 'ArrayList', ArrayList_init_$Create$, AbstractMutableList, [ MutableIterable, KtList, Collection, RandomAccess ]);
    initMetadataForClass(HashMap, 'HashMap', HashMap_init_$Create$, AbstractMutableMap, [ KtMutableMap ]);
    initMetadataForClass(HashMapKeys, 'HashMapKeys', VOID, AbstractMutableSet, [ MutableIterable, KtSet, Collection ]);
    initMetadataForClass(HashMapValues, 'HashMapValues', VOID, AbstractMutableCollection, [ MutableIterable, Collection ]);
    initMetadataForClass(HashMapEntrySetBase, 'HashMapEntrySetBase', VOID, AbstractMutableSet, [ MutableIterable, KtSet, Collection ]);
    initMetadataForClass(HashMapEntrySet, 'HashMapEntrySet', VOID, HashMapEntrySetBase);
    initMetadataForClass(HashMapKeysDefault$iterator$1);
    initMetadataForClass(HashMapKeysDefault, 'HashMapKeysDefault', VOID, AbstractMutableSet);
    initMetadataForClass(HashMapValuesDefault$iterator$1);
    initMetadataForClass(HashMapValuesDefault, 'HashMapValuesDefault', VOID, AbstractMutableCollection);
    initMetadataForClass(HashSet, 'HashSet', HashSet_init_$Create$, AbstractMutableSet, [ MutableIterable, KtSet, Collection ]);
    initMetadataForCompanion(Companion_3);
    initMetadataForClass(Itr, 'Itr');
    initMetadataForClass(KeysItr, 'KeysItr', VOID, Itr);
    initMetadataForClass(ValuesItr, 'ValuesItr', VOID, Itr);
    initMetadataForClass(EntriesItr, 'EntriesItr', VOID, Itr);
    initMetadataForClass(EntryRef, 'EntryRef', VOID, VOID, [ Entry ]);
    function containsAllEntries(m) {
        var tmp$ret$0;
        $l$block_0: {
            var tmp;
            if (isInterface(m, Collection)) {
                tmp = m.n();
            } else {
                tmp = false;
            }
            if (tmp) {
                tmp$ret$0 = true;
                break $l$block_0;
            }
            var _iterator__ex2g4s = m.j();
            while (_iterator__ex2g4s.k()) {
                var element = _iterator__ex2g4s.l();
                var entry = element;
                var tmp_0;
                if (!(entry == null) ? isInterface(entry, Entry) : false) {
                    tmp_0 = this.a7(entry);
                } else {
                    tmp_0 = false;
                }
                if (!tmp_0) {
                    tmp$ret$0 = false;
                    break $l$block_0;
                }
            }
            tmp$ret$0 = true;
        }
        return tmp$ret$0;
    }
    initMetadataForInterface(InternalMap, 'InternalMap');
    initMetadataForClass(InternalHashMap, 'InternalHashMap', InternalHashMap_init_$Create$, VOID, [ InternalMap ]);
    initMetadataForClass(LinkedHashMap, 'LinkedHashMap', LinkedHashMap_init_$Create$, HashMap, [ KtMutableMap ]);
    initMetadataForClass(LinkedHashSet, 'LinkedHashSet', LinkedHashSet_init_$Create$, HashSet, [ MutableIterable, KtSet, Collection ]);
    initMetadataForInterface(Continuation, 'Continuation');
    initMetadataForClass(InterceptedCoroutine, 'InterceptedCoroutine', VOID, VOID, [ Continuation ]);
    initMetadataForClass(CoroutineImpl, 'CoroutineImpl', VOID, InterceptedCoroutine, [ Continuation ]);
    initMetadataForObject(CompletedContinuation, 'CompletedContinuation', VOID, VOID, [ Continuation ]);
    initMetadataForClass(createCoroutineUnintercepted$$inlined$createCoroutineFromSuspendFunction$1, VOID, VOID, CoroutineImpl);
    initMetadataForClass(createSimpleCoroutineForSuspendFunction$1, VOID, VOID, CoroutineImpl);
    initMetadataForClass(Exception, 'Exception', Exception_init_$Create$, Error);
    initMetadataForClass(RuntimeException, 'RuntimeException', RuntimeException_init_$Create$, Exception);
    initMetadataForClass(UnsupportedOperationException, 'UnsupportedOperationException', UnsupportedOperationException_init_$Create$, RuntimeException);
    initMetadataForClass(IllegalArgumentException, 'IllegalArgumentException', IllegalArgumentException_init_$Create$, RuntimeException);
    initMetadataForClass(NoSuchElementException, 'NoSuchElementException', NoSuchElementException_init_$Create$, RuntimeException);
    initMetadataForClass(IndexOutOfBoundsException, 'IndexOutOfBoundsException', IndexOutOfBoundsException_init_$Create$, RuntimeException);
    initMetadataForClass(IllegalStateException, 'IllegalStateException', IllegalStateException_init_$Create$, RuntimeException);
    initMetadataForClass(ConcurrentModificationException, 'ConcurrentModificationException', ConcurrentModificationException_init_$Create$, RuntimeException);
    initMetadataForClass(ArithmeticException, 'ArithmeticException', ArithmeticException_init_$Create$, RuntimeException);
    initMetadataForClass(Error_0, 'Error', Error_init_$Create$, Error);
    initMetadataForClass(AssertionError, 'AssertionError', AssertionError_init_$Create$, Error_0);
    initMetadataForClass(NumberFormatException, 'NumberFormatException', NumberFormatException_init_$Create$, IllegalArgumentException);
    initMetadataForClass(NoWhenBranchMatchedException, 'NoWhenBranchMatchedException', NoWhenBranchMatchedException_init_$Create$, RuntimeException);
    initMetadataForClass(NullPointerException, 'NullPointerException', NullPointerException_init_$Create$, RuntimeException);
    initMetadataForClass(ClassCastException, 'ClassCastException', ClassCastException_init_$Create$, RuntimeException);
    initMetadataForInterface(KClass, 'KClass');
    initMetadataForClass(KClassImpl, 'KClassImpl', VOID, VOID, [ KClass ]);
    initMetadataForClass(PrimitiveKClassImpl, 'PrimitiveKClassImpl', VOID, KClassImpl);
    initMetadataForObject(NothingKClassImpl, 'NothingKClassImpl', VOID, KClassImpl);
    initMetadataForClass(SimpleKClassImpl, 'SimpleKClassImpl', VOID, KClassImpl);
    initMetadataForInterface(KProperty1, 'KProperty1');
    initMetadataForObject(PrimitiveClasses, 'PrimitiveClasses');
    initMetadataForClass(CharacterCodingException, 'CharacterCodingException', CharacterCodingException_init_$Create$, Exception);
    initMetadataForClass(StringBuilder, 'StringBuilder', StringBuilder_init_$Create$_0, VOID, [ CharSequence ]);
    initMetadataForClass(sam$kotlin_Comparator$0, 'sam$kotlin_Comparator$0', VOID, VOID, [ Comparator, FunctionAdapter ]);
    initMetadataForClass(DurationUnit, 'DurationUnit', VOID, Enum);
    initMetadataForClass(AbstractIterator, 'AbstractIterator');
    initMetadataForClass(IteratorImpl_0, 'IteratorImpl');
    initMetadataForClass(ListIteratorImpl_0, 'ListIteratorImpl', VOID, IteratorImpl_0);
    initMetadataForCompanion(Companion_4);
    initMetadataForClass(AbstractList, 'AbstractList', VOID, AbstractCollection, [ KtList ]);
    initMetadataForClass(AbstractMap$keys$1$iterator$1);
    initMetadataForClass(AbstractMap$values$1$iterator$1);
    initMetadataForCompanion(Companion_5);
    initMetadataForClass(AbstractSet, 'AbstractSet', VOID, AbstractCollection, [ KtSet ]);
    initMetadataForClass(AbstractMap$keys$1, VOID, VOID, AbstractSet);
    initMetadataForClass(AbstractMap$values$1, VOID, VOID, AbstractCollection);
    initMetadataForCompanion(Companion_6);
    initMetadataForObject(EmptyList, 'EmptyList', VOID, VOID, [ KtList, RandomAccess ]);
    initMetadataForObject(EmptyIterator, 'EmptyIterator');
    initMetadataForClass(IndexedValue, 'IndexedValue');
    initMetadataForClass(IndexingIterable, 'IndexingIterable');
    initMetadataForClass(IndexingIterator, 'IndexingIterator');
    initMetadataForInterface(MapWithDefault, 'MapWithDefault', VOID, VOID, [ KtMap ]);
    initMetadataForObject(EmptyMap, 'EmptyMap', VOID, VOID, [ KtMap ]);
    initMetadataForClass(IntIterator, 'IntIterator');
    initMetadataForClass(SequenceScope, 'SequenceScope', VOID, VOID, VOID, [ 1 ]);
    initMetadataForClass(SequenceBuilderIterator, 'SequenceBuilderIterator', SequenceBuilderIterator, SequenceScope, [ Continuation ], [ 1 ]);
    initMetadataForClass(TransformingSequence$iterator$1);
    initMetadataForClass(TransformingSequence, 'TransformingSequence', VOID, VOID, [ Sequence ]);
    initMetadataForClass(FilteringSequence$iterator$1);
    initMetadataForClass(FilteringSequence, 'FilteringSequence', VOID, VOID, [ Sequence ]);
    initMetadataForObject(EmptySet, 'EmptySet', VOID, VOID, [ KtSet ]);
    initMetadataForClass(RingBuffer$iterator$1, VOID, VOID, AbstractIterator);
    initMetadataForClass(RingBuffer, 'RingBuffer', VOID, AbstractList, [ RandomAccess ]);
    initMetadataForLambda(windowedIterator$slambda, CoroutineImpl, VOID, [ 1 ]);
    initMetadataForObject(Key, 'Key');
    function releaseInterceptedContinuation(continuation) {}
    initMetadataForInterface(ContinuationInterceptor, 'ContinuationInterceptor');
    initMetadataForObject(EmptyCoroutineContext, 'EmptyCoroutineContext');
    initMetadataForClass(CoroutineSingletons, 'CoroutineSingletons', VOID, Enum);
    initMetadataForClass(Random, 'Random');
    initMetadataForObject(Default, 'Default', VOID, Random);
    initMetadataForCompanion(Companion_7);
    initMetadataForClass(XorWowRandom, 'XorWowRandom', VOID, Random);
    initMetadataForCompanion(Companion_8);
    initMetadataForClass(IntProgression, 'IntProgression');
    function contains(value) {
        return compareTo(value, this.qe()) >= 0 && compareTo(value, this.re()) <= 0;
    }
    initMetadataForInterface(ClosedRange, 'ClosedRange');
    initMetadataForClass(IntRange, 'IntRange', VOID, IntProgression, [ ClosedRange ]);
    initMetadataForClass(IntProgressionIterator, 'IntProgressionIterator', VOID, IntIterator);
    initMetadataForCompanion(Companion_9);
    initMetadataForObject(State, 'State');
    initMetadataForClass(LinesIterator, 'LinesIterator');
    initMetadataForClass(lineSequence$$inlined$Sequence$1, VOID, VOID, VOID, [ Sequence ]);
    initMetadataForCompanion(Companion_10);
    initMetadataForClass(Duration, 'Duration', VOID, VOID, [ Comparable ]);
    initMetadataForCompanion(Companion_11);
    initMetadataForClass(LongParser, 'LongParser');
    initMetadataForObject(FractionalParser, 'FractionalParser');
    initMetadataForCompanion(Companion_12);
    initMetadataForClass(Instant, 'Instant', VOID, VOID, [ Comparable ]);
    initMetadataForClass(Success, 'Success');
    initMetadataForClass(Failure, 'Failure');
    initMetadataForCompanion(Companion_13);
    initMetadataForClass(UnboundLocalDateTime, 'UnboundLocalDateTime');
    initMetadataForClass(InstantFormatException, 'InstantFormatException', VOID, IllegalArgumentException);
    initMetadataForClass(DeepRecursiveScope, 'DeepRecursiveScope', VOID, VOID, VOID, [ 1, 2 ]);
    initMetadataForClass(DeepRecursiveFunction, 'DeepRecursiveFunction');
    initMetadataForClass(DeepRecursiveScopeImpl, 'DeepRecursiveScopeImpl', VOID, DeepRecursiveScope, [ Continuation ], [ 1, 2 ]);
    initMetadataForClass(LazyThreadSafetyMode, 'LazyThreadSafetyMode', VOID, Enum);
    initMetadataForClass(UnsafeLazyImpl, 'UnsafeLazyImpl');
    initMetadataForObject(UNINITIALIZED_VALUE, 'UNINITIALIZED_VALUE');
    initMetadataForCompanion(Companion_14);
    initMetadataForClass(Failure_0, 'Failure');
    initMetadataForClass(Result, 'Result');
    initMetadataForClass(NotImplementedError, 'NotImplementedError', NotImplementedError, Error_0);
    initMetadataForClass(Pair, 'Pair');
    initMetadataForClass(Triple, 'Triple');
    initMetadataForCompanion(Companion_15);
    initMetadataForClass(Uuid, 'Uuid', VOID, VOID, [ Comparable ]);
    initMetadataForCompanion(Companion_16);
    initMetadataForClass(UByte, 'UByte', VOID, VOID, [ Comparable ]);
    initMetadataForClass(Iterator, 'Iterator');
    initMetadataForClass(UByteArray, 'UByteArray', VOID, VOID, [ Collection ]);
    initMetadataForCompanion(Companion_17);
    initMetadataForClass(UInt, 'UInt', VOID, VOID, [ Comparable ]);
    initMetadataForClass(Iterator_0, 'Iterator');
    initMetadataForClass(UIntArray, 'UIntArray', VOID, VOID, [ Collection ]);
    initMetadataForCompanion(Companion_18);
    initMetadataForClass(ULong, 'ULong', VOID, VOID, [ Comparable ]);
    initMetadataForClass(Iterator_1, 'Iterator');
    initMetadataForClass(ULongArray, 'ULongArray', VOID, VOID, [ Collection ]);
    initMetadataForCompanion(Companion_19);
    initMetadataForClass(UShort, 'UShort', VOID, VOID, [ Comparable ]);
    initMetadataForClass(Iterator_2, 'Iterator');
    initMetadataForClass(UShortArray, 'UShortArray', VOID, VOID, [ Collection ]);
    initMetadataForInterface(DeserializationStrategy, 'DeserializationStrategy');
    initMetadataForInterface(KSerializer, 'KSerializer', VOID, VOID, [ DeserializationStrategy ]);
    initMetadataForClass(SerializationException, 'SerializationException', SerializationException_init_$Create$, IllegalArgumentException);
    initMetadataForClass(MissingFieldException, 'MissingFieldException', VOID, SerializationException);
    function get_isNullable() {
        return false;
    }
    function get_isInline() {
        return false;
    }
    function get_annotations() {
        return emptyList();
    }
    initMetadataForInterface(SerialDescriptor, 'SerialDescriptor');
    initMetadataForClass(ContextDescriptor, 'ContextDescriptor', VOID, VOID, [ SerialDescriptor ]);
    initMetadataForClass(elementDescriptors$1);
    initMetadataForClass(elementDescriptors$$inlined$Iterable$1);
    initMetadataForClass(ClassSerialDescriptorBuilder, 'ClassSerialDescriptorBuilder');
    initMetadataForClass(SerialDescriptorImpl, 'SerialDescriptorImpl', VOID, VOID, [ SerialDescriptor ]);
    initMetadataForClass(SerialKind, 'SerialKind');
    initMetadataForObject(ENUM, 'ENUM', VOID, SerialKind);
    initMetadataForObject(CONTEXTUAL, 'CONTEXTUAL', VOID, SerialKind);
    initMetadataForClass(StructureKind, 'StructureKind', VOID, SerialKind);
    initMetadataForObject(CLASS, 'CLASS', VOID, StructureKind);
    initMetadataForObject(LIST, 'LIST', VOID, StructureKind);
    initMetadataForObject(MAP, 'MAP', VOID, StructureKind);
    initMetadataForObject(OBJECT, 'OBJECT', VOID, StructureKind);
    initMetadataForClass(PrimitiveKind, 'PrimitiveKind', VOID, SerialKind);
    initMetadataForObject(BOOLEAN, 'BOOLEAN', VOID, PrimitiveKind);
    initMetadataForObject(BYTE, 'BYTE', VOID, PrimitiveKind);
    initMetadataForObject(CHAR, 'CHAR', VOID, PrimitiveKind);
    initMetadataForObject(SHORT, 'SHORT', VOID, PrimitiveKind);
    initMetadataForObject(INT, 'INT', VOID, PrimitiveKind);
    initMetadataForObject(LONG, 'LONG', VOID, PrimitiveKind);
    initMetadataForObject(FLOAT, 'FLOAT', VOID, PrimitiveKind);
    initMetadataForObject(DOUBLE, 'DOUBLE', VOID, PrimitiveKind);
    initMetadataForObject(STRING, 'STRING', VOID, PrimitiveKind);
    initMetadataForClass(PolymorphicKind, 'PolymorphicKind', VOID, SerialKind);
    initMetadataForObject(SEALED, 'SEALED', VOID, PolymorphicKind);
    function decodeSerializableValue(deserializer) {
        return deserializer.aj(this);
    }
    initMetadataForInterface(Decoder, 'Decoder');
    function decodeSequentially() {
        return false;
    }
    function decodeCollectionSize(descriptor) {
        return -1;
    }
    function decodeSerializableElement$default(descriptor, index, deserializer, previousValue, $super) {
        previousValue = previousValue === VOID ? null : previousValue;
        return $super === VOID ? this.rl(descriptor, index, deserializer, previousValue) : $super.rl.call(this, descriptor, index, deserializer, previousValue);
    }
    initMetadataForInterface(CompositeDecoder, 'CompositeDecoder');
    initMetadataForClass(AbstractDecoder, 'AbstractDecoder', VOID, VOID, [ Decoder, CompositeDecoder ]);
    initMetadataForClass(AbstractPolymorphicSerializer, 'AbstractPolymorphicSerializer', VOID, VOID, [ KSerializer ]);
    initMetadataForObject(NothingSerializer_0, 'NothingSerializer', VOID, VOID, [ KSerializer ]);
    initMetadataForObject(DurationSerializer, 'DurationSerializer', VOID, VOID, [ KSerializer ]);
    initMetadataForObject(InstantSerializer, 'InstantSerializer', VOID, VOID, [ KSerializer ]);
    initMetadataForObject(UuidSerializer, 'UuidSerializer', VOID, VOID, [ KSerializer ]);
    initMetadataForClass(ListLikeDescriptor, 'ListLikeDescriptor', VOID, VOID, [ SerialDescriptor ]);
    initMetadataForClass(ArrayListClassDesc, 'ArrayListClassDesc', VOID, ListLikeDescriptor);
    initMetadataForClass(MapLikeDescriptor, 'MapLikeDescriptor', VOID, VOID, [ SerialDescriptor ]);
    initMetadataForClass(LinkedHashMapClassDesc, 'LinkedHashMapClassDesc', VOID, MapLikeDescriptor);
    initMetadataForClass(PrimitiveArrayDescriptor, 'PrimitiveArrayDescriptor', VOID, ListLikeDescriptor);
    initMetadataForClass(AbstractCollectionSerializer, 'AbstractCollectionSerializer', VOID, VOID, [ KSerializer ]);
    initMetadataForClass(CollectionLikeSerializer, 'CollectionLikeSerializer', VOID, AbstractCollectionSerializer);
    initMetadataForClass(CollectionSerializer, 'CollectionSerializer', VOID, CollectionLikeSerializer);
    initMetadataForClass(ArrayListSerializer, 'ArrayListSerializer', VOID, CollectionSerializer);
    initMetadataForClass(MapLikeSerializer, 'MapLikeSerializer', VOID, AbstractCollectionSerializer);
    initMetadataForClass(LinkedHashMapSerializer, 'LinkedHashMapSerializer', VOID, MapLikeSerializer);
    initMetadataForClass(PrimitiveArraySerializer, 'PrimitiveArraySerializer', VOID, CollectionLikeSerializer);
    initMetadataForClass(PrimitiveArrayBuilder, 'PrimitiveArrayBuilder');
    initMetadataForCompanion(Companion_20);
    initMetadataForClass(ElementMarker, 'ElementMarker');
    initMetadataForClass(PluginGeneratedSerialDescriptor, 'PluginGeneratedSerialDescriptor', VOID, VOID, [ SerialDescriptor ]);
    initMetadataForClass(InlineClassDescriptor, 'InlineClassDescriptor', VOID, PluginGeneratedSerialDescriptor);
    function typeParametersSerializers() {
        return get_EMPTY_SERIALIZER_ARRAY();
    }
    initMetadataForInterface(GeneratedSerializer, 'GeneratedSerializer', VOID, VOID, [ KSerializer ]);
    initMetadataForClass(InlinePrimitiveDescriptor$1, VOID, VOID, VOID, [ GeneratedSerializer ]);
    initMetadataForObject(NothingSerialDescriptor, 'NothingSerialDescriptor', VOID, VOID, [ SerialDescriptor ]);
    initMetadataForClass(SerialDescriptorForNullable, 'SerialDescriptorForNullable', VOID, VOID, [ SerialDescriptor ]);
    initMetadataForClass(ObjectSerializer, 'ObjectSerializer', VOID, VOID, [ KSerializer ]);
    initMetadataForObject(CharArraySerializer_0, 'CharArraySerializer', VOID, PrimitiveArraySerializer, [ KSerializer ]);
    initMetadataForObject(DoubleArraySerializer_0, 'DoubleArraySerializer', VOID, PrimitiveArraySerializer, [ KSerializer ]);
    initMetadataForObject(FloatArraySerializer_0, 'FloatArraySerializer', VOID, PrimitiveArraySerializer, [ KSerializer ]);
    initMetadataForObject(LongArraySerializer_0, 'LongArraySerializer', VOID, PrimitiveArraySerializer, [ KSerializer ]);
    initMetadataForObject(ULongArraySerializer_0, 'ULongArraySerializer', VOID, PrimitiveArraySerializer, [ KSerializer ]);
    initMetadataForObject(IntArraySerializer_0, 'IntArraySerializer', VOID, PrimitiveArraySerializer, [ KSerializer ]);
    initMetadataForObject(UIntArraySerializer_0, 'UIntArraySerializer', VOID, PrimitiveArraySerializer, [ KSerializer ]);
    initMetadataForObject(ShortArraySerializer_0, 'ShortArraySerializer', VOID, PrimitiveArraySerializer, [ KSerializer ]);
    initMetadataForObject(UShortArraySerializer_0, 'UShortArraySerializer', VOID, PrimitiveArraySerializer, [ KSerializer ]);
    initMetadataForObject(ByteArraySerializer_0, 'ByteArraySerializer', VOID, PrimitiveArraySerializer, [ KSerializer ]);
    initMetadataForObject(UByteArraySerializer_0, 'UByteArraySerializer', VOID, PrimitiveArraySerializer, [ KSerializer ]);
    initMetadataForObject(BooleanArraySerializer_0, 'BooleanArraySerializer', VOID, PrimitiveArraySerializer, [ KSerializer ]);
    initMetadataForClass(CharArrayBuilder, 'CharArrayBuilder', VOID, PrimitiveArrayBuilder);
    initMetadataForClass(DoubleArrayBuilder, 'DoubleArrayBuilder', VOID, PrimitiveArrayBuilder);
    initMetadataForClass(FloatArrayBuilder, 'FloatArrayBuilder', VOID, PrimitiveArrayBuilder);
    initMetadataForClass(LongArrayBuilder, 'LongArrayBuilder', VOID, PrimitiveArrayBuilder);
    initMetadataForClass(ULongArrayBuilder, 'ULongArrayBuilder', VOID, PrimitiveArrayBuilder);
    initMetadataForClass(IntArrayBuilder, 'IntArrayBuilder', VOID, PrimitiveArrayBuilder);
    initMetadataForClass(UIntArrayBuilder, 'UIntArrayBuilder', VOID, PrimitiveArrayBuilder);
    initMetadataForClass(ShortArrayBuilder, 'ShortArrayBuilder', VOID, PrimitiveArrayBuilder);
    initMetadataForClass(UShortArrayBuilder, 'UShortArrayBuilder', VOID, PrimitiveArrayBuilder);
    initMetadataForClass(ByteArrayBuilder, 'ByteArrayBuilder', VOID, PrimitiveArrayBuilder);
    initMetadataForClass(UByteArrayBuilder, 'UByteArrayBuilder', VOID, PrimitiveArrayBuilder);
    initMetadataForClass(BooleanArrayBuilder, 'BooleanArrayBuilder', VOID, PrimitiveArrayBuilder);
    initMetadataForObject(StringSerializer, 'StringSerializer', VOID, VOID, [ KSerializer ]);
    initMetadataForClass(PrimitiveSerialDescriptor_0, 'PrimitiveSerialDescriptor', VOID, VOID, [ SerialDescriptor ]);
    initMetadataForObject(IntSerializer, 'IntSerializer', VOID, VOID, [ KSerializer ]);
    initMetadataForObject(LongSerializer, 'LongSerializer', VOID, VOID, [ KSerializer ]);
    initMetadataForObject(ByteSerializer, 'ByteSerializer', VOID, VOID, [ KSerializer ]);
    initMetadataForObject(ShortSerializer, 'ShortSerializer', VOID, VOID, [ KSerializer ]);
    initMetadataForObject(CharSerializer, 'CharSerializer', VOID, VOID, [ KSerializer ]);
    initMetadataForObject(DoubleSerializer, 'DoubleSerializer', VOID, VOID, [ KSerializer ]);
    initMetadataForObject(FloatSerializer, 'FloatSerializer', VOID, VOID, [ KSerializer ]);
    initMetadataForObject(BooleanSerializer, 'BooleanSerializer', VOID, VOID, [ KSerializer ]);
    initMetadataForObject(UnitSerializer, 'UnitSerializer', VOID, VOID, [ KSerializer ]);
    initMetadataForClass(TaggedDecoder, 'TaggedDecoder', VOID, VOID, [ Decoder, CompositeDecoder ]);
    initMetadataForClass(NamedValueDecoder, 'NamedValueDecoder', VOID, TaggedDecoder);
    initMetadataForObject(UIntSerializer, 'UIntSerializer', VOID, VOID, [ KSerializer ]);
    initMetadataForObject(ULongSerializer, 'ULongSerializer', VOID, VOID, [ KSerializer ]);
    initMetadataForObject(UByteSerializer, 'UByteSerializer', VOID, VOID, [ KSerializer ]);
    initMetadataForObject(UShortSerializer, 'UShortSerializer', VOID, VOID, [ KSerializer ]);
    initMetadataForClass(SerializersModule, 'SerializersModule');
    initMetadataForClass(SerialModuleImpl, 'SerialModuleImpl', VOID, SerializersModule);
    initMetadataForClass(SerializableWith, 'SerializableWith', VOID, VOID, VOID, VOID, 0);
    initMetadataForClass(Json, 'Json');
    initMetadataForObject(Default_0, 'Default', VOID, Json);
    initMetadataForClass(JsonClassDiscriminator, 'JsonClassDiscriminator');
    initMetadataForClass(JsonIgnoreUnknownKeys, 'JsonIgnoreUnknownKeys');
    initMetadataForClass(JsonNames, 'JsonNames');
    initMetadataForClass(JsonConfiguration, 'JsonConfiguration');
    initMetadataForClass(ClassDiscriminatorMode, 'ClassDiscriminatorMode', VOID, Enum);
    initMetadataForInterface(JsonDecoder, 'JsonDecoder', VOID, VOID, [ Decoder, CompositeDecoder ]);
    initMetadataForCompanion(Companion_21);
    initMetadataForClass(JsonElement, 'JsonElement', VOID, VOID, VOID, VOID, VOID, {
        0: JsonElementSerializer_getInstance
    });
    initMetadataForClass(JsonObject, 'JsonObject', VOID, JsonElement, [ KtMap ], VOID, VOID, {
        0: JsonObjectSerializer_getInstance
    });
    initMetadataForCompanion(Companion_22);
    initMetadataForClass(JsonPrimitive, 'JsonPrimitive', VOID, JsonElement, VOID, VOID, VOID, {
        0: JsonPrimitiveSerializer_getInstance
    });
    initMetadataForCompanion(Companion_23);
    initMetadataForCompanion(Companion_24);
    initMetadataForClass(JsonArray, 'JsonArray', VOID, JsonElement, [ KtList ], VOID, VOID, {
        0: JsonArraySerializer_getInstance
    });
    initMetadataForObject(JsonNull, 'JsonNull', VOID, JsonPrimitive, VOID, VOID, VOID, {
        0: JsonNullSerializer_getInstance
    });
    initMetadataForClass(JsonLiteral, 'JsonLiteral', VOID, JsonPrimitive);
    initMetadataForClass(JsonObjectBuilder, 'JsonObjectBuilder');
    initMetadataForObject(JsonObjectDescriptor, 'JsonObjectDescriptor', VOID, VOID, [ SerialDescriptor ]);
    initMetadataForObject(JsonObjectSerializer, 'JsonObjectSerializer', VOID, VOID, [ KSerializer ]);
    initMetadataForObject(JsonPrimitiveSerializer, 'JsonPrimitiveSerializer', VOID, VOID, [ KSerializer ]);
    initMetadataForObject(JsonElementSerializer, 'JsonElementSerializer', VOID, VOID, [ KSerializer ]);
    initMetadataForObject(JsonArrayDescriptor, 'JsonArrayDescriptor', VOID, VOID, [ SerialDescriptor ]);
    initMetadataForObject(JsonArraySerializer, 'JsonArraySerializer', VOID, VOID, [ KSerializer ]);
    initMetadataForObject(JsonNullSerializer, 'JsonNullSerializer', VOID, VOID, [ KSerializer ]);
    initMetadataForObject(JsonLiteralSerializer, 'JsonLiteralSerializer', VOID, VOID, [ KSerializer ]);
    initMetadataForClass(defer$1, VOID, VOID, VOID, [ SerialDescriptor ]);
    initMetadataForClass(JsonException, 'JsonException', VOID, SerializationException);
    initMetadataForClass(JsonDecodingException, 'JsonDecodingException', VOID, JsonException);
    initMetadataForClass(JsonEncodingException, 'JsonEncodingException', VOID, JsonException);
    initMetadataForClass(JsonElementMarker, 'JsonElementMarker');
    initMetadataForObject(Tombstone, 'Tombstone');
    initMetadataForObject(RedactedKey, 'RedactedKey');
    initMetadataForClass(JsonPath, 'JsonPath');
    initMetadataForLambda(JsonTreeReader$readDeepRecursive$slambda, CoroutineImpl, VOID, [ 2 ]);
    initMetadataForCoroutine($readObjectCOROUTINE$, CoroutineImpl);
    initMetadataForClass(JsonTreeReader, 'JsonTreeReader', VOID, VOID, VOID, [ 1 ]);
    initMetadataForClass(LexerMode, 'LexerMode', VOID, Enum);
    initMetadataForClass(Key_0, 'Key', Key_0);
    initMetadataForClass(DescriptorSchemaCache, 'DescriptorSchemaCache', DescriptorSchemaCache);
    initMetadataForClass(DiscriminatorHolder, 'DiscriminatorHolder');
    initMetadataForClass(StreamingJsonDecoder, 'StreamingJsonDecoder', VOID, AbstractDecoder, [ JsonDecoder ]);
    initMetadataForClass(JsonDecoderForUnsignedTypes, 'JsonDecoderForUnsignedTypes', VOID, AbstractDecoder);
    initMetadataForClass(AbstractJsonTreeDecoder, 'AbstractJsonTreeDecoder', VOID, NamedValueDecoder, [ JsonDecoder ]);
    initMetadataForClass(JsonTreeDecoder, 'JsonTreeDecoder', VOID, AbstractJsonTreeDecoder);
    initMetadataForClass(JsonTreeListDecoder, 'JsonTreeListDecoder', VOID, AbstractJsonTreeDecoder);
    initMetadataForClass(JsonPrimitiveDecoder, 'JsonPrimitiveDecoder', VOID, AbstractJsonTreeDecoder);
    initMetadataForClass(JsonTreeMapDecoder, 'JsonTreeMapDecoder', VOID, JsonTreeDecoder);
    initMetadataForClass(AbstractJsonLexer, 'AbstractJsonLexer');
    initMetadataForObject(CharMappings, 'CharMappings');
    initMetadataForClass(StringJsonLexer, 'StringJsonLexer', VOID, AbstractJsonLexer);
    initMetadataForClass(StringJsonLexerWithComments, 'StringJsonLexerWithComments', VOID, StringJsonLexer);
    initMetadataForClass(Crate, 'Crate');
    initMetadataForClass(Blast, 'Blast');
    initMetadataForClass(Landing, 'Landing');
    initMetadataForClass(Flight, 'Flight');
    initMetadataForClass(BlastStyle, 'BlastStyle');
    initMetadataForCompanion(Companion_25);
    initMetadataForClass(sam$kotlin_Comparator$0_0, 'sam$kotlin_Comparator$0', VOID, VOID, [ Comparator, FunctionAdapter ]);
    function tick() {
        return false;
    }
    function frame() {
        return Frame_NONE_getInstance();
    }
    initMetadataForInterface(Game, 'Game');
    initMetadataForClass(ArtilleryGame, 'ArtilleryGame', VOID, VOID, [ Game ]);
    initMetadataForObject(Artillery, 'Artillery');
    initMetadataForClass(Ship, 'Ship');
    initMetadataForCompanion(Companion_26);
    initMetadataForClass(BattleshipGame, 'BattleshipGame', VOID, VOID, [ Game ]);
    initMetadataForObject(Battleship, 'Battleship');
    initMetadataForClass(Mark, 'Mark');
    initMetadataForCompanion(Companion_27);
    initMetadataForClass(DoodleGame, 'DoodleGame', VOID, VOID, [ Game ]);
    initMetadataForClass(CarpetGame, 'CarpetGame', VOID, DoodleGame);
    initMetadataForObject(Carpet, 'Carpet');
    initMetadataForClass(Dot, 'Dot');
    initMetadataForCompanion(Companion_28);
    initMetadataForClass(Frame, 'Frame', VOID, Enum);
    initMetadataForClass(Body, 'Body');
    initMetadataForClass(Shape, 'Shape');
    initMetadataForCompanion(Companion_29);
    initMetadataForClass(RamGame, 'RamGame', VOID, DoodleGame);
    initMetadataForObject(Ram, 'Ram');
    initMetadataForCompanion(Companion_30);
    initMetadataForClass(RecallGame, 'RecallGame', VOID, DoodleGame);
    initMetadataForObject(Recall, 'Recall');
    initMetadataForClass(Flyer, 'Flyer');
    initMetadataForCompanion(Companion_31);
    initMetadataForClass(RocketsGame, 'RocketsGame', VOID, DoodleGame);
    initMetadataForObject(Rockets, 'Rockets');
    initMetadataForClass(Delivery, 'Delivery');
    initMetadataForClass(Player, 'Player');
    initMetadataForCompanion(Companion_32);
    initMetadataForClass(Table, 'Table', Table);
    initMetadataForClass(Engine, 'Engine', Engine);
    function CharSequence() {}
    function Comparable() {}
    function Number_0() {}
    function get_indices(_this__u8e3s4) {
        return new IntRange(0, get_lastIndex(_this__u8e3s4));
    }
    function indexOf(_this__u8e3s4, element) {
        if (element == null) {
            var inductionVariable = 0;
            var last = _this__u8e3s4.length - 1 | 0;
            if (inductionVariable <= last) do {
                var index = inductionVariable;
                inductionVariable = inductionVariable + 1 | 0;
                if (_this__u8e3s4[index] == null) {
                    return index;
                }
            } while (inductionVariable <= last);
        } else {
            var inductionVariable_0 = 0;
            var last_0 = _this__u8e3s4.length - 1 | 0;
            if (inductionVariable_0 <= last_0) do {
                var index_0 = inductionVariable_0;
                inductionVariable_0 = inductionVariable_0 + 1 | 0;
                if (equals(element, _this__u8e3s4[index_0])) {
                    return index_0;
                }
            } while (inductionVariable_0 <= last_0);
        }
        return -1;
    }
    function get_lastIndex(_this__u8e3s4) {
        return _this__u8e3s4.length - 1 | 0;
    }
    function get_lastIndex_0(_this__u8e3s4) {
        return _this__u8e3s4.length - 1 | 0;
    }
    function joinToString(_this__u8e3s4, separator, prefix, postfix, limit, truncated, transform) {
        separator = separator === VOID ? ', ' : separator;
        prefix = prefix === VOID ? '' : prefix;
        postfix = postfix === VOID ? '' : postfix;
        limit = limit === VOID ? -1 : limit;
        truncated = truncated === VOID ? '...' : truncated;
        transform = transform === VOID ? null : transform;
        return joinTo(_this__u8e3s4, StringBuilder_init_$Create$_0(), separator, prefix, postfix, limit, truncated, transform).toString();
    }
    function joinTo(_this__u8e3s4, buffer, separator, prefix, postfix, limit, truncated, transform) {
        separator = separator === VOID ? ', ' : separator;
        prefix = prefix === VOID ? '' : prefix;
        postfix = postfix === VOID ? '' : postfix;
        limit = limit === VOID ? -1 : limit;
        truncated = truncated === VOID ? '...' : truncated;
        transform = transform === VOID ? null : transform;
        buffer.e(prefix);
        var count = 0;
        var inductionVariable = 0;
        var last = _this__u8e3s4.length;
        $l$loop: while (inductionVariable < last) {
            var element = _this__u8e3s4[inductionVariable];
            inductionVariable = inductionVariable + 1 | 0;
            count = count + 1 | 0;
            if (count > 1) {
                buffer.e(separator);
            }
            if (limit < 0 || count <= limit) {
                appendElement(buffer, element, transform);
            } else break $l$loop;
        }
        if (limit >= 0 && count > limit) {
            buffer.e(truncated);
        }
        buffer.e(postfix);
        return buffer;
    }
    function get_indices_0(_this__u8e3s4) {
        return new IntRange(0, get_lastIndex_1(_this__u8e3s4));
    }
    function toList(_this__u8e3s4) {
        var tmp;
        switch (_this__u8e3s4.length) {
          case 0:
            tmp = emptyList();
            break;

          case 1:
            tmp = listOf(_this__u8e3s4[0]);
            break;

          default:
            var tmp$ret$0 = _this__u8e3s4.slice();
            tmp = asList(tmp$ret$0);
            break;
        }
        return tmp;
    }
    function withIndex(_this__u8e3s4) {
        return new IndexingIterable(withIndex$lambda(_this__u8e3s4));
    }
    function toList_0(_this__u8e3s4) {
        switch (_this__u8e3s4.length) {
          case 0:
            return emptyList();

          case 1:
            return listOf(_this__u8e3s4[0]);

          default:
            return toMutableList(_this__u8e3s4);
        }
    }
    function toSet(_this__u8e3s4) {
        switch (_this__u8e3s4.length) {
          case 0:
            return emptySet();

          case 1:
            return setOf(_this__u8e3s4[0]);

          default:
            return toCollection(_this__u8e3s4, LinkedHashSet_init_$Create$_0(mapCapacity(_this__u8e3s4.length)));
        }
    }
    function get_lastIndex_1(_this__u8e3s4) {
        return _this__u8e3s4.length - 1 | 0;
    }
    function toMutableList(_this__u8e3s4) {
        var list = ArrayList_init_$Create$_0(_this__u8e3s4.length);
        var inductionVariable = 0;
        var last = _this__u8e3s4.length;
        while (inductionVariable < last) {
            var item = _this__u8e3s4[inductionVariable];
            inductionVariable = inductionVariable + 1 | 0;
            list.i(item);
        }
        return list;
    }
    function toCollection(_this__u8e3s4, destination) {
        var inductionVariable = 0;
        var last = _this__u8e3s4.length;
        while (inductionVariable < last) {
            var item = _this__u8e3s4[inductionVariable];
            inductionVariable = inductionVariable + 1 | 0;
            destination.i(item);
        }
        return destination;
    }
    function single(_this__u8e3s4) {
        var tmp;
        switch (_this__u8e3s4.length) {
          case 0:
            throw NoSuchElementException_init_$Create$_0('Array is empty.');

          case 1:
            tmp = _this__u8e3s4[0];
            break;

          default:
            throw IllegalArgumentException_init_$Create$_0('Array has more than one element.');
        }
        return tmp;
    }
    function withIndex$lambda($this_withIndex) {
        return function() {
            return arrayIterator($this_withIndex);
        };
    }
    function joinToString_0(_this__u8e3s4, separator, prefix, postfix, limit, truncated, transform) {
        separator = separator === VOID ? ', ' : separator;
        prefix = prefix === VOID ? '' : prefix;
        postfix = postfix === VOID ? '' : postfix;
        limit = limit === VOID ? -1 : limit;
        truncated = truncated === VOID ? '...' : truncated;
        transform = transform === VOID ? null : transform;
        return joinTo_0(_this__u8e3s4, StringBuilder_init_$Create$_0(), separator, prefix, postfix, limit, truncated, transform).toString();
    }
    function joinTo_0(_this__u8e3s4, buffer, separator, prefix, postfix, limit, truncated, transform) {
        separator = separator === VOID ? ', ' : separator;
        prefix = prefix === VOID ? '' : prefix;
        postfix = postfix === VOID ? '' : postfix;
        limit = limit === VOID ? -1 : limit;
        truncated = truncated === VOID ? '...' : truncated;
        transform = transform === VOID ? null : transform;
        buffer.e(prefix);
        var count = 0;
        var _iterator__ex2g4s = _this__u8e3s4.j();
        $l$loop: while (_iterator__ex2g4s.k()) {
            var element = _iterator__ex2g4s.l();
            count = count + 1 | 0;
            if (count > 1) {
                buffer.e(separator);
            }
            if (limit < 0 || count <= limit) {
                appendElement(buffer, element, transform);
            } else break $l$loop;
        }
        if (limit >= 0 && count > limit) {
            buffer.e(truncated);
        }
        buffer.e(postfix);
        return buffer;
    }
    function toHashSet(_this__u8e3s4) {
        return toCollection_0(_this__u8e3s4, HashSet_init_$Create$_0(mapCapacity(collectionSizeOrDefault(_this__u8e3s4, 12))));
    }
    function toBooleanArray(_this__u8e3s4) {
        var result = booleanArray(_this__u8e3s4.m());
        var index = 0;
        var _iterator__ex2g4s = _this__u8e3s4.j();
        while (_iterator__ex2g4s.k()) {
            var element = _iterator__ex2g4s.l();
            var _unary__edvuaz = index;
            index = _unary__edvuaz + 1 | 0;
            result[_unary__edvuaz] = element;
        }
        return result;
    }
    function random(_this__u8e3s4, random) {
        if (_this__u8e3s4.n()) throw NoSuchElementException_init_$Create$_0('Collection is empty.');
        return elementAt(_this__u8e3s4, random.o(_this__u8e3s4.m()));
    }
    function toList_1(_this__u8e3s4) {
        if (isInterface(_this__u8e3s4, Collection)) {
            var tmp;
            switch (_this__u8e3s4.m()) {
              case 0:
                tmp = emptyList();
                break;

              case 1:
                var tmp_0;
                if (isInterface(_this__u8e3s4, KtList)) {
                    tmp_0 = _this__u8e3s4.p(0);
                } else {
                    tmp_0 = _this__u8e3s4.j().l();
                }
                tmp = listOf(tmp_0);
                break;

              default:
                tmp = toMutableList_0(_this__u8e3s4);
                break;
            }
            return tmp;
        }
        return optimizeReadOnlyList(toMutableList_1(_this__u8e3s4));
    }
    function maxOrNull(_this__u8e3s4) {
        var iterator = _this__u8e3s4.j();
        if (!iterator.k()) return null;
        var max = iterator.l();
        while (iterator.k()) {
            var e = iterator.l();
            var a = max;
            max = Math.max(a, e);
        }
        return max;
    }
    function plus(_this__u8e3s4, elements) {
        if (isInterface(elements, Collection)) {
            var result = ArrayList_init_$Create$_0(_this__u8e3s4.m() + elements.m() | 0);
            result.q(_this__u8e3s4);
            result.q(elements);
            return result;
        } else {
            var result_0 = ArrayList_init_$Create$_1(_this__u8e3s4);
            addAll(result_0, elements);
            return result_0;
        }
    }
    function max(_this__u8e3s4) {
        var iterator = _this__u8e3s4.j();
        if (!iterator.k()) throw NoSuchElementException_init_$Create$();
        var max = iterator.l();
        while (iterator.k()) {
            var e = iterator.l();
            var a = max;
            max = Math.max(a, e);
        }
        return max;
    }
    function plus_0(_this__u8e3s4, element) {
        var result = ArrayList_init_$Create$_0(_this__u8e3s4.m() + 1 | 0);
        result.q(_this__u8e3s4);
        result.i(element);
        return result;
    }
    function toMutableList_0(_this__u8e3s4) {
        return ArrayList_init_$Create$_1(_this__u8e3s4);
    }
    function minus(_this__u8e3s4, element) {
        var result = ArrayList_init_$Create$_0(collectionSizeOrDefault(_this__u8e3s4, 10));
        var removed = false;
        var _iterator__ex2g4s = _this__u8e3s4.j();
        while (_iterator__ex2g4s.k()) {
            var element_0 = _iterator__ex2g4s.l();
            var tmp;
            if (!removed && equals(element_0, element)) {
                removed = true;
                tmp = false;
            } else {
                tmp = true;
            }
            if (tmp) {
                result.i(element_0);
            }
        }
        return result;
    }
    function toSet_0(_this__u8e3s4) {
        if (isInterface(_this__u8e3s4, Collection)) {
            var tmp;
            switch (_this__u8e3s4.m()) {
              case 0:
                tmp = emptySet();
                break;

              case 1:
                var tmp_0;
                if (isInterface(_this__u8e3s4, KtList)) {
                    tmp_0 = _this__u8e3s4.p(0);
                } else {
                    tmp_0 = _this__u8e3s4.j().l();
                }
                tmp = setOf(tmp_0);
                break;

              default:
                tmp = toCollection_0(_this__u8e3s4, LinkedHashSet_init_$Create$_0(mapCapacity(_this__u8e3s4.m())));
                break;
            }
            return tmp;
        }
        return optimizeReadOnlySet(toCollection_0(_this__u8e3s4, LinkedHashSet_init_$Create$()));
    }
    function asSequence(_this__u8e3s4) {
        return new asSequence$$inlined$Sequence$1(_this__u8e3s4);
    }
    function firstOrNull(_this__u8e3s4) {
        return _this__u8e3s4.n() ? null : _this__u8e3s4.p(0);
    }
    function first(_this__u8e3s4) {
        if (_this__u8e3s4.n()) throw NoSuchElementException_init_$Create$_0('List is empty.');
        return _this__u8e3s4.p(0);
    }
    function sum(_this__u8e3s4) {
        var sum = 0;
        var _iterator__ex2g4s = _this__u8e3s4.j();
        while (_iterator__ex2g4s.k()) {
            var element = _iterator__ex2g4s.l();
            sum = sum + element;
        }
        return sum;
    }
    function last(_this__u8e3s4) {
        if (_this__u8e3s4.n()) throw NoSuchElementException_init_$Create$_0('List is empty.');
        return _this__u8e3s4.p(get_lastIndex_2(_this__u8e3s4));
    }
    function take(_this__u8e3s4, n) {
        if (!(n >= 0)) {
            var message = 'Requested element count ' + n + ' is less than zero.';
            throw IllegalArgumentException_init_$Create$_0(toString_1(message));
        }
        if (n === 0) return emptyList();
        if (isInterface(_this__u8e3s4, Collection)) {
            if (n >= _this__u8e3s4.m()) return toList_1(_this__u8e3s4);
            if (n === 1) return listOf(first_0(_this__u8e3s4));
        }
        var count = 0;
        var list = ArrayList_init_$Create$_0(n);
        var _iterator__ex2g4s = _this__u8e3s4.j();
        $l$loop: while (_iterator__ex2g4s.k()) {
            var item = _iterator__ex2g4s.l();
            list.i(item);
            count = count + 1 | 0;
            if (count === n) break $l$loop;
        }
        return optimizeReadOnlyList(list);
    }
    function chunked(_this__u8e3s4, size) {
        return windowed(_this__u8e3s4, size, size, true);
    }
    function drop(_this__u8e3s4, n) {
        if (!(n >= 0)) {
            var message = 'Requested element count ' + n + ' is less than zero.';
            throw IllegalArgumentException_init_$Create$_0(toString_1(message));
        }
        if (n === 0) return toList_1(_this__u8e3s4);
        var list;
        if (isInterface(_this__u8e3s4, Collection)) {
            var resultSize = _this__u8e3s4.m() - n | 0;
            if (resultSize <= 0) return emptyList();
            if (resultSize === 1) return listOf(last_0(_this__u8e3s4));
            list = ArrayList_init_$Create$_0(resultSize);
            if (isInterface(_this__u8e3s4, KtList)) {
                if (isInterface(_this__u8e3s4, RandomAccess)) {
                    var inductionVariable = n;
                    var last = _this__u8e3s4.m();
                    if (inductionVariable < last) do {
                        var index = inductionVariable;
                        inductionVariable = inductionVariable + 1 | 0;
                        list.i(_this__u8e3s4.p(index));
                    } while (inductionVariable < last);
                } else {
                    var _iterator__ex2g4s = _this__u8e3s4.r(n);
                    while (_iterator__ex2g4s.k()) {
                        var item = _iterator__ex2g4s.l();
                        list.i(item);
                    }
                }
                return list;
            }
        } else {
            list = ArrayList_init_$Create$();
        }
        var count = 0;
        var _iterator__ex2g4s_0 = _this__u8e3s4.j();
        while (_iterator__ex2g4s_0.k()) {
            var item_0 = _iterator__ex2g4s_0.l();
            if (count >= n) list.i(item_0); else {
                count = count + 1 | 0;
            }
        }
        return optimizeReadOnlyList(list);
    }
    function toMutableList_1(_this__u8e3s4) {
        if (isInterface(_this__u8e3s4, Collection)) return toMutableList_0(_this__u8e3s4);
        return toCollection_0(_this__u8e3s4, ArrayList_init_$Create$());
    }
    function shuffle(_this__u8e3s4, random) {
        var inductionVariable = get_lastIndex_2(_this__u8e3s4);
        if (1 <= inductionVariable) do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + -1 | 0;
            var j = random.o(i + 1 | 0);
            _this__u8e3s4.s(j, _this__u8e3s4.s(i, _this__u8e3s4.p(j)));
        } while (1 <= inductionVariable);
    }
    function toCollection_0(_this__u8e3s4, destination) {
        var _iterator__ex2g4s = _this__u8e3s4.j();
        while (_iterator__ex2g4s.k()) {
            var item = _iterator__ex2g4s.l();
            destination.i(item);
        }
        return destination;
    }
    function elementAt(_this__u8e3s4, index) {
        if (isInterface(_this__u8e3s4, KtList)) return _this__u8e3s4.p(index);
        return elementAtOrElse(_this__u8e3s4, index, elementAt$lambda(index));
    }
    function sortedWith(_this__u8e3s4, comparator) {
        if (isInterface(_this__u8e3s4, Collection)) {
            if (_this__u8e3s4.m() <= 1) return toList_1(_this__u8e3s4);
            var tmp = copyToArray(_this__u8e3s4);
            var this_0 = isArray(tmp) ? tmp : THROW_CCE();
            sortWith(this_0, comparator);
            return asList(this_0);
        }
        var this_1 = toMutableList_1(_this__u8e3s4);
        sortWith_0(this_1, comparator);
        return this_1;
    }
    function first_0(_this__u8e3s4) {
        if (isInterface(_this__u8e3s4, KtList)) return first(_this__u8e3s4); else {
            var iterator = _this__u8e3s4.j();
            if (!iterator.k()) throw NoSuchElementException_init_$Create$_0('Collection is empty.');
            return iterator.l();
        }
    }
    function windowed(_this__u8e3s4, size, step, partialWindows) {
        step = step === VOID ? 1 : step;
        partialWindows = partialWindows === VOID ? false : partialWindows;
        checkWindowSizeStep(size, step);
        var tmp;
        if (isInterface(_this__u8e3s4, RandomAccess)) {
            tmp = isInterface(_this__u8e3s4, KtList);
        } else {
            tmp = false;
        }
        if (tmp) {
            var thisSize = _this__u8e3s4.m();
            var resultCapacity = (thisSize / step | 0) + ((thisSize % step | 0) === 0 ? 0 : 1) | 0;
            var result = ArrayList_init_$Create$_0(resultCapacity);
            var index = 0;
            $l$loop: while (0 <= index ? index < thisSize : false) {
                var windowSize = coerceAtMost(size, thisSize - index | 0);
                if (windowSize < size && !partialWindows) break $l$loop;
                var list = ArrayList_init_$Create$_0(windowSize);
                var inductionVariable = 0;
                if (inductionVariable < windowSize) do {
                    var index_0 = inductionVariable;
                    inductionVariable = inductionVariable + 1 | 0;
                    var tmp$ret$4 = _this__u8e3s4.p(index_0 + index | 0);
                    list.i(tmp$ret$4);
                } while (inductionVariable < windowSize);
                result.i(list);
                index = index + step | 0;
            }
            return result;
        }
        var result_0 = ArrayList_init_$Create$();
        var _iterator__ex2g4s = windowedIterator(_this__u8e3s4.j(), size, step, partialWindows, false);
        while (_iterator__ex2g4s.k()) {
            var element = _iterator__ex2g4s.l();
            result_0.i(element);
        }
        return result_0;
    }
    function last_0(_this__u8e3s4) {
        if (isInterface(_this__u8e3s4, KtList)) return last(_this__u8e3s4); else {
            var iterator = _this__u8e3s4.j();
            if (!iterator.k()) throw NoSuchElementException_init_$Create$_0('Collection is empty.');
            var last_0 = iterator.l();
            while (iterator.k()) last_0 = iterator.l();
            return last_0;
        }
    }
    function elementAtOrElse(_this__u8e3s4, index, defaultValue) {
        if (isInterface(_this__u8e3s4, KtList)) {
            return (0 <= index ? index < _this__u8e3s4.m() : false) ? _this__u8e3s4.p(index) : defaultValue(index);
        }
        if (index < 0) return defaultValue(index);
        var iterator = _this__u8e3s4.j();
        var count = 0;
        while (iterator.k()) {
            var element = iterator.l();
            var _unary__edvuaz = count;
            count = _unary__edvuaz + 1 | 0;
            if (index === _unary__edvuaz) return element;
        }
        return defaultValue(index);
    }
    function singleOrNull(_this__u8e3s4) {
        return _this__u8e3s4.m() === 1 ? _this__u8e3s4.p(0) : null;
    }
    function lastOrNull(_this__u8e3s4) {
        return _this__u8e3s4.n() ? null : _this__u8e3s4.p(_this__u8e3s4.m() - 1 | 0);
    }
    function minOrNull(_this__u8e3s4) {
        var iterator = _this__u8e3s4.j();
        if (!iterator.k()) return null;
        var min = iterator.l();
        while (iterator.k()) {
            var e = iterator.l();
            if (compareTo(min, e) > 0) min = e;
        }
        return min;
    }
    function asSequence$$inlined$Sequence$1($this_asSequence) {
        this.t_1 = $this_asSequence;
    }
    protoOf(asSequence$$inlined$Sequence$1).j = function() {
        return this.t_1.j();
    };
    function elementAt$lambda($index) {
        return function(it) {
            throw IndexOutOfBoundsException_init_$Create$_0("Collection doesn't contain element at index " + $index + '.');
        };
    }
    function until(_this__u8e3s4, to) {
        if (to <= -2147483648) return Companion_getInstance_8().u_1;
        return numberRangeToNumber(_this__u8e3s4, to - 1 | 0);
    }
    function downTo(_this__u8e3s4, to) {
        return Companion_instance_9.v(_this__u8e3s4, to, -1);
    }
    function coerceAtMost(_this__u8e3s4, maximumValue) {
        return _this__u8e3s4 > maximumValue ? maximumValue : _this__u8e3s4;
    }
    function coerceAtLeast(_this__u8e3s4, minimumValue) {
        return _this__u8e3s4 < minimumValue ? minimumValue : _this__u8e3s4;
    }
    function step(_this__u8e3s4, step) {
        checkStepIsPositive(step > 0, step);
        return Companion_instance_9.v(_this__u8e3s4.w_1, _this__u8e3s4.x_1, _this__u8e3s4.y_1 > 0 ? step : -step | 0);
    }
    function coerceIn(_this__u8e3s4, minimumValue, maximumValue) {
        if (minimumValue > maximumValue) throw IllegalArgumentException_init_$Create$_0('Cannot coerce value to an empty range: maximum ' + maximumValue + ' is less than minimum ' + minimumValue + '.');
        if (_this__u8e3s4 < minimumValue) return minimumValue;
        if (_this__u8e3s4 > maximumValue) return maximumValue;
        return _this__u8e3s4;
    }
    function coerceIn_0(_this__u8e3s4, minimumValue, maximumValue) {
        if (compare(minimumValue, maximumValue) > 0) throw IllegalArgumentException_init_$Create$_0('Cannot coerce value to an empty range: maximum ' + maximumValue.toString() + ' is less than minimum ' + minimumValue.toString() + '.');
        if (compare(_this__u8e3s4, minimumValue) < 0) return minimumValue;
        if (compare(_this__u8e3s4, maximumValue) > 0) return maximumValue;
        return _this__u8e3s4;
    }
    function coerceAtLeast_0(_this__u8e3s4, minimumValue) {
        return compare(_this__u8e3s4, minimumValue) < 0 ? minimumValue : _this__u8e3s4;
    }
    function coerceAtMost_0(_this__u8e3s4, maximumValue) {
        return compare(_this__u8e3s4, maximumValue) > 0 ? maximumValue : _this__u8e3s4;
    }
    function contains_0(_this__u8e3s4, value) {
        var it = toIntExactOrNull(value);
        return !(it == null) ? _this__u8e3s4.z(it) : false;
    }
    function toIntExactOrNull(_this__u8e3s4) {
        return (compare(new Long(-2147483648, -1), _this__u8e3s4) <= 0 ? compare(_this__u8e3s4, new Long(2147483647, 0)) <= 0 : false) ? convertToInt(_this__u8e3s4) : null;
    }
    function mapNotNull(_this__u8e3s4, transform) {
        return filterNotNull(new TransformingSequence(_this__u8e3s4, transform));
    }
    function firstOrNull_0(_this__u8e3s4) {
        var iterator = _this__u8e3s4.j();
        if (!iterator.k()) return null;
        return iterator.l();
    }
    function filterNotNull(_this__u8e3s4) {
        var tmp = filterNot(_this__u8e3s4, filterNotNull$lambda);
        return isInterface(tmp, Sequence) ? tmp : THROW_CCE();
    }
    function filterNot(_this__u8e3s4, predicate) {
        return new FilteringSequence(_this__u8e3s4, false, predicate);
    }
    function toList_2(_this__u8e3s4) {
        var it = _this__u8e3s4.j();
        if (!it.k()) return emptyList();
        var element = it.l();
        if (!it.k()) return listOf(element);
        var dst = ArrayList_init_$Create$();
        dst.i(element);
        while (it.k()) {
            dst.i(it.l());
        }
        return dst;
    }
    function filterNotNull$lambda(it) {
        return it == null;
    }
    function take_0(_this__u8e3s4, n) {
        if (!(n >= 0)) {
            var message = 'Requested character count ' + n + ' is less than zero.';
            throw IllegalArgumentException_init_$Create$_0(toString_1(message));
        }
        return substring(_this__u8e3s4, 0, coerceAtMost(n, _this__u8e3s4.length));
    }
    function single_0(_this__u8e3s4) {
        var tmp;
        switch (charSequenceLength(_this__u8e3s4)) {
          case 0:
            throw NoSuchElementException_init_$Create$_0('Char sequence is empty.');

          case 1:
            tmp = charSequenceGet(_this__u8e3s4, 0);
            break;

          default:
            throw IllegalArgumentException_init_$Create$_0('Char sequence has more than one element.');
        }
        return tmp;
    }
    function drop_0(_this__u8e3s4, n) {
        if (!(n >= 0)) {
            var message = 'Requested character count ' + n + ' is less than zero.';
            throw IllegalArgumentException_init_$Create$_0(toString_1(message));
        }
        return substring_0(_this__u8e3s4, coerceAtMost(n, _this__u8e3s4.length));
    }
    function _Char___init__impl__6a9atx(value) {
        return value;
    }
    function _get_value__a43j40($this) {
        return $this;
    }
    function _Char___init__impl__6a9atx_0(code) {
        var tmp$ret$0 = _UShort___get_data__impl__g0245(code) & 65535;
        return _Char___init__impl__6a9atx(tmp$ret$0);
    }
    function Char__compareTo_impl_ypi4mb($this, other) {
        return _get_value__a43j40($this) - _get_value__a43j40(other) | 0;
    }
    function Char__compareTo_impl_ypi4mb_0($this, other) {
        return Char__compareTo_impl_ypi4mb($this.a1_1, other instanceof Char ? other.a1_1 : THROW_CCE());
    }
    function Char__minus_impl_a2frrh($this, other) {
        return _get_value__a43j40($this) - _get_value__a43j40(other) | 0;
    }
    function Char__toInt_impl_vasixd($this) {
        return _get_value__a43j40($this);
    }
    function toString($this) {
        return String.fromCharCode(_get_value__a43j40($this));
    }
    function Char__equals_impl_x6719k($this, other) {
        if (!(other instanceof Char)) return false;
        return _get_value__a43j40($this) === _get_value__a43j40(other.a1_1);
    }
    function Char__hashCode_impl_otmys($this) {
        return _get_value__a43j40($this);
    }
    function Companion() {
        Companion_instance = this;
        this.b1_1 = _Char___init__impl__6a9atx(0);
        this.c1_1 = _Char___init__impl__6a9atx(65535);
        this.d1_1 = _Char___init__impl__6a9atx(55296);
        this.e1_1 = _Char___init__impl__6a9atx(56319);
        this.f1_1 = _Char___init__impl__6a9atx(56320);
        this.g1_1 = _Char___init__impl__6a9atx(57343);
        this.h1_1 = _Char___init__impl__6a9atx(55296);
        this.i1_1 = _Char___init__impl__6a9atx(57343);
        this.j1_1 = 2;
        this.k1_1 = 16;
    }
    var Companion_instance;
    function Companion_getInstance() {
        if (Companion_instance == null) new Companion;
        return Companion_instance;
    }
    function Char(value) {
        Companion_getInstance();
        this.a1_1 = value;
    }
    protoOf(Char).l1 = function(other) {
        return Char__compareTo_impl_ypi4mb(this.a1_1, other);
    };
    protoOf(Char).d = function(other) {
        return Char__compareTo_impl_ypi4mb_0(this, other);
    };
    protoOf(Char).toString = function() {
        return toString(this.a1_1);
    };
    protoOf(Char).equals = function(other) {
        return Char__equals_impl_x6719k(this.a1_1, other);
    };
    protoOf(Char).hashCode = function() {
        return Char__hashCode_impl_otmys(this.a1_1);
    };
    function Collection() {}
    function KtSet() {}
    function KtList() {}
    function Entry() {}
    function KtMap() {}
    function KtMutableMap() {}
    function MutableIterable() {}
    function Companion_0() {}
    var Companion_instance_0;
    function Companion_getInstance_0() {
        return Companion_instance_0;
    }
    function Enum(name, ordinal) {
        this.a2_1 = name;
        this.b2_1 = ordinal;
    }
    protoOf(Enum).c2 = function(other) {
        return compareTo(this.b2_1, other.b2_1);
    };
    protoOf(Enum).d = function(other) {
        return this.c2(other instanceof Enum ? other : THROW_CCE());
    };
    protoOf(Enum).equals = function(other) {
        return this === other;
    };
    protoOf(Enum).hashCode = function() {
        return identityHashCode(this);
    };
    protoOf(Enum).toString = function() {
        return this.a2_1;
    };
    function toString_0(_this__u8e3s4) {
        var tmp1_elvis_lhs = _this__u8e3s4 == null ? null : toString_1(_this__u8e3s4);
        return tmp1_elvis_lhs == null ? 'null' : tmp1_elvis_lhs;
    }
    function plus_1(_this__u8e3s4, other) {
        var tmp = _this__u8e3s4 == null ? 'null' : _this__u8e3s4;
        var tmp2_elvis_lhs = other == null ? null : toString_1(other);
        return tmp + (tmp2_elvis_lhs == null ? 'null' : tmp2_elvis_lhs);
    }
    function Companion_1() {
        Companion_instance_1 = this;
        this.d2_1 = new Long(0, -2147483648);
        this.e2_1 = new Long(-1, 2147483647);
        this.f2_1 = 8;
        this.g2_1 = 64;
    }
    var Companion_instance_1;
    function Companion_getInstance_1() {
        if (Companion_instance_1 == null) new Companion_1;
        return Companion_instance_1;
    }
    function Long(low, high) {
        Companion_getInstance_1();
        Number_0.call(this);
        this.h2_1 = low;
        this.i2_1 = high;
    }
    protoOf(Long).j2 = function(other) {
        return compare(this, other);
    };
    protoOf(Long).d = function(other) {
        return this.j2(other instanceof Long ? other : THROW_CCE());
    };
    protoOf(Long).toString = function() {
        return toStringImpl(this, 10);
    };
    protoOf(Long).equals = function(other) {
        var tmp;
        if (other instanceof Long) {
            tmp = equalsLong(this, other);
        } else {
            tmp = false;
        }
        return tmp;
    };
    protoOf(Long).hashCode = function() {
        return hashCode(this);
    };
    protoOf(Long).valueOf = function() {
        return toNumber(this);
    };
    function abs(_this__u8e3s4) {
        var tmp;
        if (_this__u8e3s4 < 0) {
            tmp = -_this__u8e3s4;
        } else {
            tmp = _this__u8e3s4;
        }
        return tmp;
    }
    function FunctionAdapter() {}
    function arrayIterator(array) {
        return new arrayIterator$1(array);
    }
    function booleanArray(size) {
        var tmp0 = 'BooleanArray';
        var array = fillArrayVal(Array(size), false);
        array.$type$ = tmp0;
        return array;
    }
    function fillArrayVal(array, initValue) {
        var inductionVariable = 0;
        var last = array.length - 1 | 0;
        if (inductionVariable <= last) do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            array[i] = initValue;
        } while (!(i === last));
        return array;
    }
    function charArray(size) {
        var tmp0 = 'CharArray';
        var array = new Uint16Array(size);
        array.$type$ = tmp0;
        return array;
    }
    function longArray(size) {
        var tmp0 = 'LongArray';
        var array = fillArrayVal(Array(size), new Long(0, 0));
        array.$type$ = tmp0;
        return array;
    }
    function charArrayOf(arr) {
        var tmp0 = 'CharArray';
        var array = new Uint16Array(arr);
        array.$type$ = tmp0;
        return array;
    }
    function arrayIterator$1($array) {
        this.m2_1 = $array;
        this.l2_1 = 0;
    }
    protoOf(arrayIterator$1).k = function() {
        return !(this.l2_1 === this.m2_1.length);
    };
    protoOf(arrayIterator$1).l = function() {
        var tmp;
        if (!(this.l2_1 === this.m2_1.length)) {
            var _unary__edvuaz = this.l2_1;
            this.l2_1 = _unary__edvuaz + 1 | 0;
            tmp = this.m2_1[_unary__edvuaz];
        } else {
            throw NoSuchElementException_init_$Create$_0('' + this.l2_1);
        }
        return tmp;
    };
    function get_buf() {
        _init_properties_bitUtils_kt__nfcg4k();
        return buf;
    }
    var buf;
    function get_bufFloat64() {
        _init_properties_bitUtils_kt__nfcg4k();
        return bufFloat64;
    }
    var bufFloat64;
    var bufFloat32;
    function get_bufInt32() {
        _init_properties_bitUtils_kt__nfcg4k();
        return bufInt32;
    }
    var bufInt32;
    function get_lowIndex() {
        _init_properties_bitUtils_kt__nfcg4k();
        return lowIndex;
    }
    var lowIndex;
    function get_highIndex() {
        _init_properties_bitUtils_kt__nfcg4k();
        return highIndex;
    }
    var highIndex;
    function doubleFromBits(value) {
        _init_properties_bitUtils_kt__nfcg4k();
        get_bufInt32()[get_lowIndex()] = value.h2_1;
        get_bufInt32()[get_highIndex()] = value.i2_1;
        return get_bufFloat64()[0];
    }
    function doubleToRawBits(value) {
        _init_properties_bitUtils_kt__nfcg4k();
        get_bufFloat64()[0] = value;
        return new Long(get_bufInt32()[get_lowIndex()], get_bufInt32()[get_highIndex()]);
    }
    function getNumberHashCode(obj) {
        _init_properties_bitUtils_kt__nfcg4k();
        if ((obj | 0) === obj) {
            return numberToInt(obj);
        }
        get_bufFloat64()[0] = obj;
        return imul(get_bufInt32()[get_highIndex()], 31) + get_bufInt32()[get_lowIndex()] | 0;
    }
    var properties_initialized_bitUtils_kt_i2bo3e;
    function _init_properties_bitUtils_kt__nfcg4k() {
        if (!properties_initialized_bitUtils_kt_i2bo3e) {
            properties_initialized_bitUtils_kt_i2bo3e = true;
            buf = new ArrayBuffer(8);
            bufFloat64 = new Float64Array(get_buf());
            bufFloat32 = new Float32Array(get_buf());
            bufInt32 = new Int32Array(get_buf());
            get_bufFloat64()[0] = -1;
            lowIndex = !(get_bufInt32()[0] === 0) ? 1 : 0;
            highIndex = 1 - get_lowIndex() | 0;
        }
    }
    function get_ZERO() {
        _init_properties_boxedLong_kt__v24qrw();
        return ZERO;
    }
    var ZERO;
    function get_ONE() {
        _init_properties_boxedLong_kt__v24qrw();
        return ONE;
    }
    var ONE;
    function get_NEG_ONE() {
        _init_properties_boxedLong_kt__v24qrw();
        return NEG_ONE;
    }
    var NEG_ONE;
    function get_MAX_VALUE() {
        _init_properties_boxedLong_kt__v24qrw();
        return MAX_VALUE;
    }
    var MAX_VALUE;
    function get_MIN_VALUE() {
        _init_properties_boxedLong_kt__v24qrw();
        return MIN_VALUE;
    }
    var MIN_VALUE;
    function get_TWO_PWR_24_() {
        _init_properties_boxedLong_kt__v24qrw();
        return TWO_PWR_24_;
    }
    var TWO_PWR_24_;
    var longArrayClass;
    function compare(_this__u8e3s4, other) {
        _init_properties_boxedLong_kt__v24qrw();
        if (equalsLong(_this__u8e3s4, other)) {
            return 0;
        }
        var thisNeg = isNegative(_this__u8e3s4);
        var otherNeg = isNegative(other);
        return thisNeg && !otherNeg ? -1 : !thisNeg && otherNeg ? 1 : isNegative(subtract(_this__u8e3s4, other)) ? -1 : 1;
    }
    function convertToByte(_this__u8e3s4) {
        _init_properties_boxedLong_kt__v24qrw();
        return toByte(_this__u8e3s4.h2_1);
    }
    function convertToShort(_this__u8e3s4) {
        _init_properties_boxedLong_kt__v24qrw();
        return toShort(_this__u8e3s4.h2_1);
    }
    function convertToInt(_this__u8e3s4) {
        _init_properties_boxedLong_kt__v24qrw();
        return _this__u8e3s4.h2_1;
    }
    function toNumber(_this__u8e3s4) {
        _init_properties_boxedLong_kt__v24qrw();
        return _this__u8e3s4.i2_1 * 4294967296 + getLowBitsUnsigned(_this__u8e3s4);
    }
    function toStringImpl(_this__u8e3s4, radix) {
        _init_properties_boxedLong_kt__v24qrw();
        if (isZero(_this__u8e3s4)) {
            return '0';
        }
        if (isNegative(_this__u8e3s4)) {
            if (equalsLong(_this__u8e3s4, get_MIN_VALUE())) {
                var radixLong = fromInt(radix);
                var div = divide(_this__u8e3s4, radixLong);
                var rem = convertToInt(subtract(multiply(div, radixLong), _this__u8e3s4));
                var tmp = toStringImpl(div, radix);
                return tmp + rem.toString(radix);
            } else {
                return '-' + toStringImpl(negate(_this__u8e3s4), radix);
            }
        }
        var digitsPerTime = radix === 2 ? 31 : radix <= 10 ? 9 : radix <= 21 ? 7 : radix <= 35 ? 6 : 5;
        var radixToPower = fromNumber(Math.pow(radix, digitsPerTime));
        var rem_0 = _this__u8e3s4;
        var result = '';
        while (true) {
            var remDiv = divide(rem_0, radixToPower);
            var intval = convertToInt(subtract(rem_0, multiply(remDiv, radixToPower)));
            var digits = intval.toString(radix);
            rem_0 = remDiv;
            if (isZero(rem_0)) {
                return digits + result;
            } else {
                while (digits.length < digitsPerTime) {
                    digits = '0' + digits;
                }
                result = digits + result;
            }
        }
    }
    function equalsLong(_this__u8e3s4, other) {
        _init_properties_boxedLong_kt__v24qrw();
        return _this__u8e3s4.i2_1 === other.i2_1 && _this__u8e3s4.h2_1 === other.h2_1;
    }
    function hashCode(l) {
        _init_properties_boxedLong_kt__v24qrw();
        return l.h2_1 ^ l.i2_1;
    }
    function fromInt(value) {
        _init_properties_boxedLong_kt__v24qrw();
        return new Long(value, value < 0 ? -1 : 0);
    }
    function isNegative(_this__u8e3s4) {
        _init_properties_boxedLong_kt__v24qrw();
        return _this__u8e3s4.i2_1 < 0;
    }
    function subtract(_this__u8e3s4, other) {
        _init_properties_boxedLong_kt__v24qrw();
        return add(_this__u8e3s4, negate(other));
    }
    function getLowBitsUnsigned(_this__u8e3s4) {
        _init_properties_boxedLong_kt__v24qrw();
        return _this__u8e3s4.h2_1 >= 0 ? _this__u8e3s4.h2_1 : 4294967296 + _this__u8e3s4.h2_1;
    }
    function isZero(_this__u8e3s4) {
        _init_properties_boxedLong_kt__v24qrw();
        return _this__u8e3s4.i2_1 === 0 && _this__u8e3s4.h2_1 === 0;
    }
    function multiply(_this__u8e3s4, other) {
        _init_properties_boxedLong_kt__v24qrw();
        if (isZero(_this__u8e3s4)) {
            return get_ZERO();
        } else if (isZero(other)) {
            return get_ZERO();
        }
        if (equalsLong(_this__u8e3s4, get_MIN_VALUE())) {
            return isOdd(other) ? get_MIN_VALUE() : get_ZERO();
        } else if (equalsLong(other, get_MIN_VALUE())) {
            return isOdd(_this__u8e3s4) ? get_MIN_VALUE() : get_ZERO();
        }
        if (isNegative(_this__u8e3s4)) {
            var tmp;
            if (isNegative(other)) {
                tmp = multiply(negate(_this__u8e3s4), negate(other));
            } else {
                tmp = negate(multiply(negate(_this__u8e3s4), other));
            }
            return tmp;
        } else if (isNegative(other)) {
            return negate(multiply(_this__u8e3s4, negate(other)));
        }
        if (lessThan(_this__u8e3s4, get_TWO_PWR_24_()) && lessThan(other, get_TWO_PWR_24_())) {
            return fromNumber(toNumber(_this__u8e3s4) * toNumber(other));
        }
        var a48 = _this__u8e3s4.i2_1 >>> 16 | 0;
        var a32 = _this__u8e3s4.i2_1 & 65535;
        var a16 = _this__u8e3s4.h2_1 >>> 16 | 0;
        var a00 = _this__u8e3s4.h2_1 & 65535;
        var b48 = other.i2_1 >>> 16 | 0;
        var b32 = other.i2_1 & 65535;
        var b16 = other.h2_1 >>> 16 | 0;
        var b00 = other.h2_1 & 65535;
        var c48 = 0;
        var c32 = 0;
        var c16 = 0;
        var c00 = 0;
        c00 = c00 + imul(a00, b00) | 0;
        c16 = c16 + (c00 >>> 16 | 0) | 0;
        c00 = c00 & 65535;
        c16 = c16 + imul(a16, b00) | 0;
        c32 = c32 + (c16 >>> 16 | 0) | 0;
        c16 = c16 & 65535;
        c16 = c16 + imul(a00, b16) | 0;
        c32 = c32 + (c16 >>> 16 | 0) | 0;
        c16 = c16 & 65535;
        c32 = c32 + imul(a32, b00) | 0;
        c48 = c48 + (c32 >>> 16 | 0) | 0;
        c32 = c32 & 65535;
        c32 = c32 + imul(a16, b16) | 0;
        c48 = c48 + (c32 >>> 16 | 0) | 0;
        c32 = c32 & 65535;
        c32 = c32 + imul(a00, b32) | 0;
        c48 = c48 + (c32 >>> 16 | 0) | 0;
        c32 = c32 & 65535;
        c48 = c48 + (((imul(a48, b00) + imul(a32, b16) | 0) + imul(a16, b32) | 0) + imul(a00, b48) | 0) | 0;
        c48 = c48 & 65535;
        return new Long(c16 << 16 | c00, c48 << 16 | c32);
    }
    function negate(_this__u8e3s4) {
        _init_properties_boxedLong_kt__v24qrw();
        return add(invert(_this__u8e3s4), new Long(1, 0));
    }
    function fromNumber(value) {
        _init_properties_boxedLong_kt__v24qrw();
        if (isNaN_0(value)) {
            return get_ZERO();
        } else if (value <= -0x8000000000000000) {
            return get_MIN_VALUE();
        } else if (value + 1 >= 0x8000000000000000) {
            return get_MAX_VALUE();
        } else if (value < 0) {
            return negate(fromNumber(-value));
        } else {
            var twoPwr32 = 4294967296;
            var tmp = value % twoPwr32 | 0;
            var tmp$ret$1 = value / twoPwr32 | 0;
            return new Long(tmp, tmp$ret$1);
        }
    }
    function add(_this__u8e3s4, other) {
        _init_properties_boxedLong_kt__v24qrw();
        var a48 = _this__u8e3s4.i2_1 >>> 16 | 0;
        var a32 = _this__u8e3s4.i2_1 & 65535;
        var a16 = _this__u8e3s4.h2_1 >>> 16 | 0;
        var a00 = _this__u8e3s4.h2_1 & 65535;
        var b48 = other.i2_1 >>> 16 | 0;
        var b32 = other.i2_1 & 65535;
        var b16 = other.h2_1 >>> 16 | 0;
        var b00 = other.h2_1 & 65535;
        var c48 = 0;
        var c32 = 0;
        var c16 = 0;
        var c00 = 0;
        c00 = c00 + (a00 + b00 | 0) | 0;
        c16 = c16 + (c00 >>> 16 | 0) | 0;
        c00 = c00 & 65535;
        c16 = c16 + (a16 + b16 | 0) | 0;
        c32 = c32 + (c16 >>> 16 | 0) | 0;
        c16 = c16 & 65535;
        c32 = c32 + (a32 + b32 | 0) | 0;
        c48 = c48 + (c32 >>> 16 | 0) | 0;
        c32 = c32 & 65535;
        c48 = c48 + (a48 + b48 | 0) | 0;
        c48 = c48 & 65535;
        return new Long(c16 << 16 | c00, c48 << 16 | c32);
    }
    function isOdd(_this__u8e3s4) {
        _init_properties_boxedLong_kt__v24qrw();
        return (_this__u8e3s4.h2_1 & 1) === 1;
    }
    function lessThan(_this__u8e3s4, other) {
        _init_properties_boxedLong_kt__v24qrw();
        return compare(_this__u8e3s4, other) < 0;
    }
    function invert(_this__u8e3s4) {
        _init_properties_boxedLong_kt__v24qrw();
        return new Long(~_this__u8e3s4.h2_1, ~_this__u8e3s4.i2_1);
    }
    function divide(_this__u8e3s4, other) {
        _init_properties_boxedLong_kt__v24qrw();
        if (isZero(other)) {
            throw Exception_init_$Create$_0('division by zero');
        } else if (isZero(_this__u8e3s4)) {
            return get_ZERO();
        }
        if (equalsLong(_this__u8e3s4, get_MIN_VALUE())) {
            if (equalsLong(other, get_ONE()) || equalsLong(other, get_NEG_ONE())) {
                return get_MIN_VALUE();
            } else if (equalsLong(other, get_MIN_VALUE())) {
                return get_ONE();
            } else {
                var halfThis = shiftRight(_this__u8e3s4, 1);
                var approx = shiftLeft(divide(halfThis, other), 1);
                if (equalsLong(approx, get_ZERO())) {
                    return isNegative(other) ? get_ONE() : get_NEG_ONE();
                } else {
                    var rem = subtract(_this__u8e3s4, multiply(other, approx));
                    return add(approx, divide(rem, other));
                }
            }
        } else if (equalsLong(other, get_MIN_VALUE())) {
            return get_ZERO();
        }
        if (isNegative(_this__u8e3s4)) {
            var tmp;
            if (isNegative(other)) {
                tmp = divide(negate(_this__u8e3s4), negate(other));
            } else {
                tmp = negate(divide(negate(_this__u8e3s4), other));
            }
            return tmp;
        } else if (isNegative(other)) {
            return negate(divide(_this__u8e3s4, negate(other)));
        }
        var res = get_ZERO();
        var rem_0 = _this__u8e3s4;
        while (greaterThanOrEqual(rem_0, other)) {
            var approxDouble = toNumber(rem_0) / toNumber(other);
            var approx2 = Math.max(1, Math.floor(approxDouble));
            var log2 = Math.ceil(Math.log(approx2) / Math.LN2);
            var delta = log2 <= 48 ? 1 : Math.pow(2, log2 - 48);
            var approxRes = fromNumber(approx2);
            var approxRem = multiply(approxRes, other);
            while (isNegative(approxRem) || greaterThan(approxRem, rem_0)) {
                approx2 = approx2 - delta;
                approxRes = fromNumber(approx2);
                approxRem = multiply(approxRes, other);
            }
            if (isZero(approxRes)) {
                approxRes = get_ONE();
            }
            res = add(res, approxRes);
            rem_0 = subtract(rem_0, approxRem);
        }
        return res;
    }
    function shiftRight(_this__u8e3s4, numBits) {
        _init_properties_boxedLong_kt__v24qrw();
        var numBits_0 = numBits & 63;
        if (numBits_0 === 0) {
            return _this__u8e3s4;
        } else {
            if (numBits_0 < 32) {
                return new Long(_this__u8e3s4.h2_1 >>> numBits_0 | 0 | _this__u8e3s4.i2_1 << (32 - numBits_0 | 0), _this__u8e3s4.i2_1 >> numBits_0);
            } else {
                return new Long(_this__u8e3s4.i2_1 >> (numBits_0 - 32 | 0), _this__u8e3s4.i2_1 >= 0 ? 0 : -1);
            }
        }
    }
    function shiftLeft(_this__u8e3s4, numBits) {
        _init_properties_boxedLong_kt__v24qrw();
        var numBits_0 = numBits & 63;
        if (numBits_0 === 0) {
            return _this__u8e3s4;
        } else {
            if (numBits_0 < 32) {
                return new Long(_this__u8e3s4.h2_1 << numBits_0, _this__u8e3s4.i2_1 << numBits_0 | (_this__u8e3s4.h2_1 >>> (32 - numBits_0 | 0) | 0));
            } else {
                return new Long(0, _this__u8e3s4.h2_1 << (numBits_0 - 32 | 0));
            }
        }
    }
    function greaterThan(_this__u8e3s4, other) {
        _init_properties_boxedLong_kt__v24qrw();
        return compare(_this__u8e3s4, other) > 0;
    }
    function greaterThanOrEqual(_this__u8e3s4, other) {
        _init_properties_boxedLong_kt__v24qrw();
        return compare(_this__u8e3s4, other) >= 0;
    }
    function modulo(_this__u8e3s4, other) {
        _init_properties_boxedLong_kt__v24qrw();
        return subtract(_this__u8e3s4, multiply(divide(_this__u8e3s4, other), other));
    }
    function bitwiseAnd(_this__u8e3s4, other) {
        _init_properties_boxedLong_kt__v24qrw();
        return new Long(_this__u8e3s4.h2_1 & other.h2_1, _this__u8e3s4.i2_1 & other.i2_1);
    }
    function bitwiseOr(_this__u8e3s4, other) {
        _init_properties_boxedLong_kt__v24qrw();
        return new Long(_this__u8e3s4.h2_1 | other.h2_1, _this__u8e3s4.i2_1 | other.i2_1);
    }
    function bitwiseXor(_this__u8e3s4, other) {
        _init_properties_boxedLong_kt__v24qrw();
        return new Long(_this__u8e3s4.h2_1 ^ other.h2_1, _this__u8e3s4.i2_1 ^ other.i2_1);
    }
    function shiftRightUnsigned(_this__u8e3s4, numBits) {
        _init_properties_boxedLong_kt__v24qrw();
        var numBits_0 = numBits & 63;
        if (numBits_0 === 0) {
            return _this__u8e3s4;
        } else {
            if (numBits_0 < 32) {
                return new Long(_this__u8e3s4.h2_1 >>> numBits_0 | 0 | _this__u8e3s4.i2_1 << (32 - numBits_0 | 0), _this__u8e3s4.i2_1 >>> numBits_0 | 0);
            } else {
                var tmp;
                if (numBits_0 === 32) {
                    tmp = new Long(_this__u8e3s4.i2_1, 0);
                } else {
                    tmp = new Long(_this__u8e3s4.i2_1 >>> (numBits_0 - 32 | 0) | 0, 0);
                }
                return tmp;
            }
        }
    }
    function numberToLong(a) {
        _init_properties_boxedLong_kt__v24qrw();
        var tmp;
        if (a instanceof Long) {
            tmp = a;
        } else {
            tmp = fromNumber(a);
        }
        return tmp;
    }
    function isLongArray(a) {
        _init_properties_boxedLong_kt__v24qrw();
        return isJsArray(a) && a.$type$ === 'LongArray';
    }
    function longArrayClass$lambda(it) {
        _init_properties_boxedLong_kt__v24qrw();
        return !(it == null) ? isLongArray(it) : false;
    }
    var properties_initialized_boxedLong_kt_lfwt2;
    function _init_properties_boxedLong_kt__v24qrw() {
        if (!properties_initialized_boxedLong_kt_lfwt2) {
            properties_initialized_boxedLong_kt_lfwt2 = true;
            ZERO = fromInt(0);
            ONE = fromInt(1);
            NEG_ONE = fromInt(-1);
            MAX_VALUE = new Long(-1, 2147483647);
            MIN_VALUE = new Long(0, -2147483648);
            TWO_PWR_24_ = fromInt(16777216);
            var tmp = Array;
            longArrayClass = new PrimitiveKClassImpl(tmp, 'LongArray', longArrayClass$lambda);
        }
    }
    function charSequenceGet(a, index) {
        var tmp;
        if (isString(a)) {
            tmp = charCodeAt(a, index);
        } else {
            tmp = a.b(index);
        }
        return tmp;
    }
    function isString(a) {
        return typeof a === 'string';
    }
    function charCodeAt(_this__u8e3s4, index) {
        return _this__u8e3s4.charCodeAt(index);
    }
    function charSequenceLength(a) {
        var tmp;
        if (isString(a)) {
            tmp = a.length;
        } else {
            tmp = a.a();
        }
        return tmp;
    }
    function charSequenceSubSequence(a, startIndex, endIndex) {
        var tmp;
        if (isString(a)) {
            tmp = substring(a, startIndex, endIndex);
        } else {
            tmp = a.c(startIndex, endIndex);
        }
        return tmp;
    }
    function arrayToString(array) {
        return joinToString(array, ', ', '[', ']', VOID, VOID, arrayToString$lambda);
    }
    function contentEqualsInternal(_this__u8e3s4, other) {
        var a = _this__u8e3s4;
        var b = other;
        if (a === b) return true;
        if (a == null || b == null || !isArrayish(b) || a.length != b.length) return false;
        var inductionVariable = 0;
        var last = a.length;
        if (inductionVariable < last) do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            if (!equals(a[i], b[i])) {
                return false;
            }
        } while (inductionVariable < last);
        return true;
    }
    function contentHashCodeInternal(_this__u8e3s4) {
        var a = _this__u8e3s4;
        if (a == null) return 0;
        var result = 1;
        var inductionVariable = 0;
        var last = a.length;
        if (inductionVariable < last) do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            result = imul(result, 31) + hashCode_0(a[i]) | 0;
        } while (inductionVariable < last);
        return result;
    }
    function arrayToString$lambda(it) {
        return toString_1(it);
    }
    function compareTo(a, b) {
        var tmp;
        switch (typeof a) {
          case 'number':
            var tmp_0;
            if (typeof b === 'number') {
                tmp_0 = doubleCompareTo(a, b);
            } else {
                if (b instanceof Long) {
                    tmp_0 = doubleCompareTo(a, toNumber(b));
                } else {
                    tmp_0 = primitiveCompareTo(a, b);
                }
            }
            tmp = tmp_0;
            break;

          case 'string':
          case 'boolean':
          case 'bigint':
            tmp = primitiveCompareTo(a, b);
            break;

          default:
            tmp = compareToDoNotIntrinsicify(a, b);
            break;
        }
        return tmp;
    }
    function doubleCompareTo(a, b) {
        var tmp;
        if (a < b) {
            tmp = -1;
        } else if (a > b) {
            tmp = 1;
        } else if (a === b) {
            var tmp_0;
            if (a !== 0) {
                tmp_0 = 0;
            } else {
                var ia = 1 / a;
                var tmp_1;
                if (ia === 1 / b) {
                    tmp_1 = 0;
                } else {
                    if (ia < 0) {
                        tmp_1 = -1;
                    } else {
                        tmp_1 = 1;
                    }
                }
                tmp_0 = tmp_1;
            }
            tmp = tmp_0;
        } else if (a !== a) {
            tmp = b !== b ? 0 : 1;
        } else {
            tmp = -1;
        }
        return tmp;
    }
    function primitiveCompareTo(a, b) {
        return a < b ? -1 : a > b ? 1 : 0;
    }
    function compareToDoNotIntrinsicify(a, b) {
        return a.d(b);
    }
    function identityHashCode(obj) {
        return getObjectHashCode(obj);
    }
    function objectCreate(proto) {
        proto = proto === VOID ? null : proto;
        return Object.create(proto);
    }
    function defineProp(obj, name, getter, setter, enumerable) {
        return Object.defineProperty(obj, name, {
            configurable: true,
            get: getter,
            set: setter,
            enumerable: enumerable
        });
    }
    function getObjectHashCode(obj) {
        if (!('kotlinHashCodeValue$' in obj)) {
            var hash = calculateRandomHash();
            var descriptor = new Object;
            descriptor.value = hash;
            descriptor.enumerable = false;
            Object.defineProperty(obj, 'kotlinHashCodeValue$', descriptor);
        }
        return obj['kotlinHashCodeValue$'];
    }
    function calculateRandomHash() {
        return Math.random() * 4294967296 | 0;
    }
    function toString_1(o) {
        var tmp;
        if (o == null) {
            tmp = 'null';
        } else if (isArrayish(o)) {
            tmp = '[...]';
        } else if (!(typeof o.toString === 'function')) {
            tmp = anyToString(o);
        } else {
            tmp = o.toString();
        }
        return tmp;
    }
    function anyToString(o) {
        return Object.prototype.toString.call(o);
    }
    function equals(obj1, obj2) {
        if (obj1 == null) {
            return obj2 == null;
        }
        if (obj2 == null) {
            return false;
        }
        if (typeof obj1 === 'object' && typeof obj1.equals === 'function') {
            return obj1.equals(obj2);
        }
        if (obj1 !== obj1) {
            return obj2 !== obj2;
        }
        if (typeof obj1 === 'number' && typeof obj2 === 'number') {
            var tmp;
            if (obj1 === obj2) {
                var tmp_0;
                if (obj1 !== 0) {
                    tmp_0 = true;
                } else {
                    var tmp_1 = 1 / obj1;
                    tmp_0 = tmp_1 === 1 / obj2;
                }
                tmp = tmp_0;
            } else {
                tmp = false;
            }
            return tmp;
        }
        if (isCallableReference(obj1) && isCallableReference(obj2)) {
            if (obj1 === obj2) return true;
            if (obj1.$id != obj2.$id) return false;
            if (obj1.$flags != obj2.$flags) return false;
            if (obj1.$arity != obj2.$arity) return false;
            if (obj1.$bound == null && obj2.$bound == null) return true;
            if (obj1.$bound === obj2.$bound) return true;
            if (!isJsArray(obj1.$bound) || !isJsArray(obj2.$bound)) return false;
            var bound1 = obj1.$bound;
            var bound2 = obj2.$bound;
            return contentEqualsInternal(bound1, bound2);
        }
        return obj1 === obj2;
    }
    function hashCode_0(obj) {
        if (obj == null) return 0;
        var typeOf = typeof obj;
        var tmp;
        switch (typeOf) {
          case 'object':
            tmp = 'function' === typeof obj.hashCode ? obj.hashCode() : getObjectHashCode(obj);
            break;

          case 'function':
            tmp = isCallableReference(obj) ? getCallableReferenceHashCode(obj) : getObjectHashCode(obj);
            break;

          case 'number':
            tmp = getNumberHashCode(obj);
            break;

          case 'boolean':
            tmp = getBooleanHashCode(obj);
            break;

          case 'string':
            tmp = getStringHashCode(String(obj));
            break;

          case 'bigint':
            tmp = getBigIntHashCode(obj);
            break;

          case 'symbol':
            tmp = getSymbolHashCode(obj);
            break;

          default:
            tmp = function() {
                throw new Error('Unexpected typeof `' + typeOf + '`');
            }();
            break;
        }
        return tmp;
    }
    function getCallableReferenceHashCode(obj) {
        var hash = obj.$flags;
        hash = imul(31, hash) + hashCode_0(obj.$id) | 0;
        var tmp = imul(31, hash);
        var tmp0_elvis_lhs = obj.$arity;
        hash = tmp + (tmp0_elvis_lhs == null ? -1 : tmp0_elvis_lhs) | 0;
        var bound = obj.$bound;
        if (bound != null && isJsArray(bound)) {
            var boundArray = bound;
            hash = imul(31, hash) + contentHashCodeInternal(boundArray) | 0;
        }
        return hash;
    }
    function getBooleanHashCode(value) {
        return value ? 1231 : 1237;
    }
    function getStringHashCode(str) {
        var hash = 0;
        var length = str.length;
        var inductionVariable = 0;
        var last = length - 1 | 0;
        if (inductionVariable <= last) do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var code = str.charCodeAt(i);
            hash = imul(hash, 31) + code | 0;
        } while (!(i === last));
        return hash;
    }
    function getBigIntHashCode(value) {
        var shiftNumber = BigInt(32);
        var mask = BigInt(4294967295);
        var bigNumber = abs(value);
        var hashCode = 0;
        var tmp;
        if (value < 0) {
            tmp = -1;
        } else {
            tmp = 1;
        }
        var signum = tmp;
        $l$loop: while (true) {
            if (!!(bigNumber == 0)) {
                break $l$loop;
            }
            var self_0 = bigNumber & mask;
            var chunk = Number(self_0);
            hashCode = imul(31, hashCode) + chunk | 0;
            bigNumber = bigNumber >> shiftNumber;
        }
        return imul(hashCode, signum);
    }
    function getSymbolHashCode(value) {
        var hashCodeMap = symbolIsSharable(value) ? getSymbolMap() : getSymbolWeakMap();
        var cachedHashCode = hashCodeMap.get(value);
        if (cachedHashCode !== VOID) return cachedHashCode;
        var hash = calculateRandomHash();
        hashCodeMap.set(value, hash);
        return hash;
    }
    function symbolIsSharable(symbol) {
        return Symbol.keyFor(symbol) != VOID;
    }
    function getSymbolMap() {
        if (symbolMap === VOID) {
            symbolMap = new Map;
        }
        return symbolMap;
    }
    function getSymbolWeakMap() {
        if (symbolWeakMap === VOID) {
            symbolWeakMap = new WeakMap;
        }
        return symbolWeakMap;
    }
    var symbolMap;
    var symbolWeakMap;
    function boxIntrinsic(x) {
        var message = 'Should be lowered';
        throw IllegalStateException_init_$Create$_0(toString_1(message));
    }
    function unboxIntrinsic(x) {
        var message = 'Should be lowered';
        throw IllegalStateException_init_$Create$_0(toString_1(message));
    }
    function captureStack(instance, constructorFunction) {
        if (Error.captureStackTrace != null) {
            Error.captureStackTrace(instance, constructorFunction);
        } else {
            instance.stack = (new Error).stack;
        }
    }
    function protoOf(constructor) {
        return constructor.prototype;
    }
    function defineMessage(message, cause) {
        var tmp;
        if (isUndefined(message)) {
            var tmp_0;
            if (isUndefined(cause)) {
                tmp_0 = message;
            } else {
                var tmp1_elvis_lhs = cause == null ? null : cause.toString();
                tmp_0 = tmp1_elvis_lhs == null ? VOID : tmp1_elvis_lhs;
            }
            tmp = tmp_0;
        } else {
            tmp = message == null ? VOID : message;
        }
        return tmp;
    }
    function isUndefined(value) {
        return value === VOID;
    }
    function extendThrowable(this_, message, cause) {
        defineFieldOnInstance(this_, 'message', defineMessage(message, cause));
        defineFieldOnInstance(this_, 'cause', cause);
        defineFieldOnInstance(this_, 'name', Object.getPrototypeOf(this_).constructor.name);
    }
    function defineFieldOnInstance(this_, name, value) {
        Object.defineProperty(this_, name, {
            configurable: true,
            writable: true,
            value: value
        });
    }
    function noWhenBranchMatchedException() {
        throw NoWhenBranchMatchedException_init_$Create$();
    }
    function THROW_NPE() {
        throw NullPointerException_init_$Create$();
    }
    function THROW_CCE() {
        throw ClassCastException_init_$Create$();
    }
    function ensureNotNull(v) {
        var tmp;
        if (v == null) {
            THROW_NPE();
        } else {
            tmp = v;
        }
        return tmp;
    }
    function jsGenerateInterfaceSymbol() {
        return generateInterfaceSymbolById();
    }
    function createMetadata(kind, name, defaultConstructor, associatedObjectKey, associatedObjects, suspendArity) {
        var undef = VOID;
        return {
            kind: kind,
            simpleName: name,
            associatedObjectKey: associatedObjectKey,
            associatedObjects: associatedObjects,
            suspendArity: suspendArity,
            $kClass$: undef,
            defaultConstructor: defaultConstructor
        };
    }
    function initMetadataForClass(ctor, name, defaultConstructor, parent, interfaces, suspendArity, associatedObjectKey, associatedObjects) {
        var kind = 'class';
        initMetadataFor(kind, ctor, name, defaultConstructor, parent, interfaces, suspendArity, associatedObjectKey, associatedObjects);
    }
    function initMetadataFor(kind, ctor, name, defaultConstructor, parent, interfaces, suspendArity, associatedObjectKey, associatedObjects) {
        if (!(parent == null)) {
            ctor.prototype = Object.create(parent.prototype);
            ctor.prototype.constructor = ctor;
        }
        var metadata = createMetadata(kind, name, defaultConstructor, associatedObjectKey, associatedObjects, suspendArity);
        ctor.$metadata$ = metadata;
        var prototype = ctor.prototype;
        if (!(interfaces == null)) {
            var inductionVariable = 0;
            var last = interfaces.length;
            while (inductionVariable < last) {
                var i = interfaces[inductionVariable];
                inductionVariable = inductionVariable + 1 | 0;
                Object.assign(prototype, i.prototype);
                prototype[i.Symbol] = true;
            }
        }
        if (kind === 'interface') {
            ctor.Symbol = generateInterfaceSymbolById();
        }
    }
    function generateInterfaceSymbolById() {
        return '#__interface_' + generateInterfaceId();
    }
    function generateInterfaceId() {
        if (globalInterfaceId === VOID) {
            globalInterfaceId = 0;
        }
        globalInterfaceId = globalInterfaceId + 1 | 0;
        return globalInterfaceId;
    }
    var globalInterfaceId;
    function initMetadataForObject(ctor, name, defaultConstructor, parent, interfaces, suspendArity, associatedObjectKey, associatedObjects) {
        var kind = 'object';
        initMetadataFor(kind, ctor, name, defaultConstructor, parent, interfaces, suspendArity, associatedObjectKey, associatedObjects);
    }
    function initMetadataForInterface(ctor, name, defaultConstructor, parent, interfaces, suspendArity, associatedObjectKey, associatedObjects) {
        var kind = 'interface';
        initMetadataFor(kind, ctor, name, defaultConstructor, parent, interfaces, suspendArity, associatedObjectKey, associatedObjects);
    }
    function initMetadataForLambda(ctor, parent, interfaces, suspendArity) {
        initMetadataForClass(ctor, 'Lambda', VOID, parent, interfaces, suspendArity, VOID, VOID);
    }
    function initMetadataForCoroutine(ctor, parent, interfaces, suspendArity) {
        initMetadataForClass(ctor, 'Coroutine', VOID, parent, interfaces, suspendArity, VOID, VOID);
    }
    function initMetadataForFunctionReference(ctor, parent, interfaces, suspendArity) {
        initMetadataForClass(ctor, 'FunctionReference', VOID, parent, interfaces, suspendArity, VOID, VOID);
    }
    function initMetadataForCompanion(ctor, parent, interfaces, suspendArity) {
        initMetadataForObject(ctor, 'Companion', VOID, parent, interfaces, suspendArity, VOID, VOID);
    }
    function toByte(a) {
        return a << 24 >> 24;
    }
    function numberToInt(a) {
        var tmp;
        if (a instanceof Long) {
            tmp = convertToInt(a);
        } else {
            tmp = doubleToInt(a);
        }
        return tmp;
    }
    function doubleToInt(a) {
        var tmp;
        if (a > 2147483647) {
            tmp = 2147483647;
        } else if (a < -2147483648) {
            tmp = -2147483648;
        } else {
            tmp = a | 0;
        }
        return tmp;
    }
    function toShort(a) {
        return a << 16 >> 16;
    }
    function numberToChar(a) {
        var this_0 = numberToInt(a);
        var tmp$ret$0 = _UShort___init__impl__jigrne(toShort(this_0));
        return _Char___init__impl__6a9atx_0(tmp$ret$0);
    }
    function ByteCompanionObject() {
        this.MIN_VALUE = -128;
        this.MAX_VALUE = 127;
        this.SIZE_BYTES = 1;
        this.SIZE_BITS = 8;
    }
    protoOf(ByteCompanionObject).n2 = function() {
        return this.MIN_VALUE;
    };
    protoOf(ByteCompanionObject).o2 = function() {
        return this.MAX_VALUE;
    };
    protoOf(ByteCompanionObject).p2 = function() {
        return this.SIZE_BYTES;
    };
    protoOf(ByteCompanionObject).q2 = function() {
        return this.SIZE_BITS;
    };
    var ByteCompanionObject_instance;
    function ByteCompanionObject_getInstance() {
        return ByteCompanionObject_instance;
    }
    function ShortCompanionObject() {
        this.MIN_VALUE = -32768;
        this.MAX_VALUE = 32767;
        this.SIZE_BYTES = 2;
        this.SIZE_BITS = 16;
    }
    protoOf(ShortCompanionObject).n2 = function() {
        return this.MIN_VALUE;
    };
    protoOf(ShortCompanionObject).o2 = function() {
        return this.MAX_VALUE;
    };
    protoOf(ShortCompanionObject).p2 = function() {
        return this.SIZE_BYTES;
    };
    protoOf(ShortCompanionObject).q2 = function() {
        return this.SIZE_BITS;
    };
    var ShortCompanionObject_instance;
    function ShortCompanionObject_getInstance() {
        return ShortCompanionObject_instance;
    }
    function IntCompanionObject() {
        this.MIN_VALUE = -2147483648;
        this.MAX_VALUE = 2147483647;
        this.SIZE_BYTES = 4;
        this.SIZE_BITS = 32;
    }
    protoOf(IntCompanionObject).n2 = function() {
        return this.MIN_VALUE;
    };
    protoOf(IntCompanionObject).o2 = function() {
        return this.MAX_VALUE;
    };
    protoOf(IntCompanionObject).p2 = function() {
        return this.SIZE_BYTES;
    };
    protoOf(IntCompanionObject).q2 = function() {
        return this.SIZE_BITS;
    };
    var IntCompanionObject_instance;
    function IntCompanionObject_getInstance() {
        return IntCompanionObject_instance;
    }
    function FloatCompanionObject() {
        this.MIN_VALUE = 14e-46;
        this.MAX_VALUE = 34028235e31;
        this.POSITIVE_INFINITY = Infinity;
        this.NEGATIVE_INFINITY = -Infinity;
        this.NaN = NaN;
        this.SIZE_BYTES = 4;
        this.SIZE_BITS = 32;
    }
    protoOf(FloatCompanionObject).n2 = function() {
        return this.MIN_VALUE;
    };
    protoOf(FloatCompanionObject).o2 = function() {
        return this.MAX_VALUE;
    };
    protoOf(FloatCompanionObject).r2 = function() {
        return this.POSITIVE_INFINITY;
    };
    protoOf(FloatCompanionObject).s2 = function() {
        return this.NEGATIVE_INFINITY;
    };
    protoOf(FloatCompanionObject).t2 = function() {
        return this.NaN;
    };
    protoOf(FloatCompanionObject).p2 = function() {
        return this.SIZE_BYTES;
    };
    protoOf(FloatCompanionObject).q2 = function() {
        return this.SIZE_BITS;
    };
    var FloatCompanionObject_instance;
    function FloatCompanionObject_getInstance() {
        return FloatCompanionObject_instance;
    }
    function DoubleCompanionObject() {
        this.MIN_VALUE = 5e-324;
        this.MAX_VALUE = 17976931348623157e292;
        this.POSITIVE_INFINITY = Infinity;
        this.NEGATIVE_INFINITY = -Infinity;
        this.NaN = NaN;
        this.SIZE_BYTES = 8;
        this.SIZE_BITS = 64;
    }
    protoOf(DoubleCompanionObject).n2 = function() {
        return this.MIN_VALUE;
    };
    protoOf(DoubleCompanionObject).o2 = function() {
        return this.MAX_VALUE;
    };
    protoOf(DoubleCompanionObject).r2 = function() {
        return this.POSITIVE_INFINITY;
    };
    protoOf(DoubleCompanionObject).s2 = function() {
        return this.NEGATIVE_INFINITY;
    };
    protoOf(DoubleCompanionObject).t2 = function() {
        return this.NaN;
    };
    protoOf(DoubleCompanionObject).p2 = function() {
        return this.SIZE_BYTES;
    };
    protoOf(DoubleCompanionObject).q2 = function() {
        return this.SIZE_BITS;
    };
    var DoubleCompanionObject_instance;
    function DoubleCompanionObject_getInstance() {
        return DoubleCompanionObject_instance;
    }
    function StringCompanionObject() {}
    var StringCompanionObject_instance;
    function StringCompanionObject_getInstance() {
        return StringCompanionObject_instance;
    }
    function BooleanCompanionObject() {}
    var BooleanCompanionObject_instance;
    function BooleanCompanionObject_getInstance() {
        return BooleanCompanionObject_instance;
    }
    function numberRangeToNumber(start, endInclusive) {
        return new IntRange(start, endInclusive);
    }
    function get_propertyRefClassMetadataCache() {
        _init_properties_reflectRuntime_kt__5r4uu3();
        return propertyRefClassMetadataCache;
    }
    var propertyRefClassMetadataCache;
    function metadataObject() {
        _init_properties_reflectRuntime_kt__5r4uu3();
        return createMetadata('class', VOID, VOID, VOID, VOID, VOID);
    }
    function getPropertyCallableRef(name, paramCount, superType, getter, setter, linkageError) {
        _init_properties_reflectRuntime_kt__5r4uu3();
        getter.get = getter;
        getter.set = setter;
        getter.callableName = name;
        return getPropertyRefClass(getter, getKPropMetadata(paramCount, setter), superType);
    }
    function getPropertyRefClass(obj, metadata, superType) {
        _init_properties_reflectRuntime_kt__5r4uu3();
        obj.$metadata$ = metadata;
        obj.constructor = obj;
        var symbol = superType.Symbol;
        if (symbol != null) {
            obj[symbol] = true;
        }
        Object.assign(obj, superType.prototype);
        return obj;
    }
    function getKPropMetadata(paramCount, setter) {
        _init_properties_reflectRuntime_kt__5r4uu3();
        return get_propertyRefClassMetadataCache()[paramCount][setter == null ? 0 : 1];
    }
    function constructCallableReference(callable, arity, flags, signatureId, name, bounds) {
        _init_properties_reflectRuntime_kt__5r4uu3();
        callable.callableName = name;
        callable.$flags = flags;
        callable.$arity = arity;
        callable.$id = signatureId;
        callable.$bound = bounds;
        return callable;
    }
    var properties_initialized_reflectRuntime_kt_inkhwd;
    function _init_properties_reflectRuntime_kt__5r4uu3() {
        if (!properties_initialized_reflectRuntime_kt_inkhwd) {
            properties_initialized_reflectRuntime_kt_inkhwd = true;
            var tmp = [ metadataObject(), metadataObject() ];
            var tmp_0 = [ metadataObject(), metadataObject() ];
            propertyRefClassMetadataCache = [ tmp, tmp_0, [ metadataObject(), metadataObject() ] ];
        }
    }
    function isArrayish(o) {
        return isJsArray(o) || isView(o);
    }
    function isJsArray(obj) {
        return Array.isArray(obj);
    }
    function isCallableReference(value) {
        return typeof value === 'function' && value.$flags != null && value.$arity != null;
    }
    function isInterface(obj, iface) {
        return obj[iface.Symbol] === true;
    }
    function isArray(obj) {
        var tmp;
        if (isJsArray(obj)) {
            tmp = !obj.$type$;
        } else {
            tmp = false;
        }
        return tmp;
    }
    function isSuspendFunction(obj, arity) {
        var objTypeOf = typeof obj;
        if (objTypeOf === 'function') {
            return obj.$arity === arity;
        }
        var tmp1_safe_receiver = obj == null ? null : obj.constructor;
        var tmp2_safe_receiver = tmp1_safe_receiver == null ? null : tmp1_safe_receiver.$metadata$;
        var tmp3_elvis_lhs = tmp2_safe_receiver == null ? null : tmp2_safe_receiver.suspendArity;
        var tmp;
        if (tmp3_elvis_lhs == null) {
            return false;
        } else {
            tmp = tmp3_elvis_lhs;
        }
        var suspendArity = tmp;
        var result = false;
        var inductionVariable = 0;
        var last = suspendArity.length;
        $l$loop: while (inductionVariable < last) {
            var item = suspendArity[inductionVariable];
            inductionVariable = inductionVariable + 1 | 0;
            if (arity === item) {
                result = true;
                break $l$loop;
            }
        }
        return result;
    }
    function isNumber(a) {
        var tmp;
        if (typeof a === 'number') {
            tmp = true;
        } else {
            tmp = a instanceof Long;
        }
        return tmp;
    }
    function isComparable(value) {
        var type = typeof value;
        return type === 'string' || type === 'boolean' || isNumber(value) || isInterface(value, Comparable);
    }
    function isCharSequence(value) {
        return typeof value === 'string' || isInterface(value, CharSequence);
    }
    function isBooleanArray(a) {
        return isJsArray(a) && a.$type$ === 'BooleanArray';
    }
    function isByteArray(a) {
        return a instanceof Int8Array;
    }
    function isShortArray(a) {
        return a instanceof Int16Array;
    }
    function isCharArray(a) {
        var tmp;
        if (a instanceof Uint16Array) {
            tmp = a.$type$ === 'CharArray';
        } else {
            tmp = false;
        }
        return tmp;
    }
    function isIntArray(a) {
        return a instanceof Int32Array;
    }
    function isFloatArray(a) {
        return a instanceof Float32Array;
    }
    function isDoubleArray(a) {
        return a instanceof Float64Array;
    }
    function get_VOID() {
        _init_properties_void_kt__3zg9as();
        return VOID;
    }
    var VOID;
    var properties_initialized_void_kt_e4ret2;
    function _init_properties_void_kt__3zg9as() {
        if (!properties_initialized_void_kt_e4ret2) {
            properties_initialized_void_kt_e4ret2 = true;
            VOID = void 0;
        }
    }
    function copyOf(_this__u8e3s4, newSize) {
        if (!(newSize >= 0)) {
            var message = 'Invalid new array size: ' + newSize + '.';
            throw IllegalArgumentException_init_$Create$_0(toString_1(message));
        }
        var size = _this__u8e3s4.length;
        var tmp;
        if (newSize < 16 || size < 16) {
            tmp = fillFrom(_this__u8e3s4, new Int32Array(newSize));
        } else if (newSize > size) {
            var this_0 = new Int32Array(newSize);
            this_0.set(_this__u8e3s4);
            tmp = this_0;
        } else {
            tmp = _this__u8e3s4.slice(0, newSize);
        }
        return tmp;
    }
    function copyOf_0(_this__u8e3s4, newSize) {
        if (!(newSize >= 0)) {
            var message = 'Invalid new array size: ' + newSize + '.';
            throw IllegalArgumentException_init_$Create$_0(toString_1(message));
        }
        return arrayCopyResize(_this__u8e3s4, newSize, null);
    }
    function contentEquals(_this__u8e3s4, other) {
        return contentEqualsInternal(_this__u8e3s4, other);
    }
    function contentHashCode(_this__u8e3s4) {
        return contentHashCodeInternal(_this__u8e3s4);
    }
    function asList(_this__u8e3s4) {
        return new ArrayList(_this__u8e3s4);
    }
    function copyOf_1(_this__u8e3s4, newSize) {
        if (!(newSize >= 0)) {
            var message = 'Invalid new array size: ' + newSize + '.';
            throw IllegalArgumentException_init_$Create$_0(toString_1(message));
        }
        var size = _this__u8e3s4.length;
        var tmp;
        if (newSize < 16 || size < 16) {
            tmp = fillFrom(_this__u8e3s4, charArray(newSize));
        } else if (newSize > size) {
            var this_0 = charArray(newSize);
            this_0.set(_this__u8e3s4);
            tmp = this_0;
        } else {
            tmp = _this__u8e3s4.slice(0, newSize);
        }
        var copy = tmp;
        copy.$type$ = 'CharArray';
        return copy;
    }
    function copyOf_2(_this__u8e3s4, newSize) {
        if (!(newSize >= 0)) {
            var message = 'Invalid new array size: ' + newSize + '.';
            throw IllegalArgumentException_init_$Create$_0(toString_1(message));
        }
        var size = _this__u8e3s4.length;
        var tmp;
        if (newSize < 16 || size < 16) {
            tmp = fillFrom(_this__u8e3s4, new Float64Array(newSize));
        } else if (newSize > size) {
            var this_0 = new Float64Array(newSize);
            this_0.set(_this__u8e3s4);
            tmp = this_0;
        } else {
            tmp = _this__u8e3s4.slice(0, newSize);
        }
        return tmp;
    }
    function copyOf_3(_this__u8e3s4, newSize) {
        if (!(newSize >= 0)) {
            var message = 'Invalid new array size: ' + newSize + '.';
            throw IllegalArgumentException_init_$Create$_0(toString_1(message));
        }
        var size = _this__u8e3s4.length;
        var tmp;
        if (newSize < 16 || size < 16) {
            tmp = fillFrom(_this__u8e3s4, new Float32Array(newSize));
        } else if (newSize > size) {
            var this_0 = new Float32Array(newSize);
            this_0.set(_this__u8e3s4);
            tmp = this_0;
        } else {
            tmp = _this__u8e3s4.slice(0, newSize);
        }
        return tmp;
    }
    function copyOf_4(_this__u8e3s4, newSize) {
        if (!(newSize >= 0)) {
            var message = 'Invalid new array size: ' + newSize + '.';
            throw IllegalArgumentException_init_$Create$_0(toString_1(message));
        }
        if (!false) return fillFrom(_this__u8e3s4, longArray(newSize));
        var size = _this__u8e3s4.length;
        var tmp;
        if (newSize < 16 || size < 16) {
            tmp = fillFrom(_this__u8e3s4, longArray(newSize));
        } else if (newSize > size) {
            var this_0 = longArray(newSize);
            this_0.set(_this__u8e3s4);
            tmp = this_0;
        } else {
            tmp = _this__u8e3s4.slice(0, newSize);
        }
        return tmp;
    }
    function copyOf_5(_this__u8e3s4, newSize) {
        if (!(newSize >= 0)) {
            var message = 'Invalid new array size: ' + newSize + '.';
            throw IllegalArgumentException_init_$Create$_0(toString_1(message));
        }
        var size = _this__u8e3s4.length;
        var tmp;
        if (newSize < 16 || size < 16) {
            tmp = fillFrom(_this__u8e3s4, new Int16Array(newSize));
        } else if (newSize > size) {
            var this_0 = new Int16Array(newSize);
            this_0.set(_this__u8e3s4);
            tmp = this_0;
        } else {
            tmp = _this__u8e3s4.slice(0, newSize);
        }
        return tmp;
    }
    function copyOf_6(_this__u8e3s4, newSize) {
        if (!(newSize >= 0)) {
            var message = 'Invalid new array size: ' + newSize + '.';
            throw IllegalArgumentException_init_$Create$_0(toString_1(message));
        }
        var size = _this__u8e3s4.length;
        var tmp;
        if (newSize < 16 || size < 16) {
            tmp = fillFrom(_this__u8e3s4, new Int8Array(newSize));
        } else if (newSize > size) {
            var this_0 = new Int8Array(newSize);
            this_0.set(_this__u8e3s4);
            tmp = this_0;
        } else {
            tmp = _this__u8e3s4.slice(0, newSize);
        }
        return tmp;
    }
    function copyOf_7(_this__u8e3s4, newSize) {
        if (!(newSize >= 0)) {
            var message = 'Invalid new array size: ' + newSize + '.';
            throw IllegalArgumentException_init_$Create$_0(toString_1(message));
        }
        var tmp0 = 'BooleanArray';
        var array = arrayCopyResize(_this__u8e3s4, newSize, false);
        array.$type$ = tmp0;
        return array;
    }
    function fill(_this__u8e3s4, element, fromIndex, toIndex) {
        fromIndex = fromIndex === VOID ? 0 : fromIndex;
        toIndex = toIndex === VOID ? _this__u8e3s4.length : toIndex;
        Companion_instance_4.v2(fromIndex, toIndex, _this__u8e3s4.length);
        _this__u8e3s4.fill(element, fromIndex, toIndex);
    }
    function sortWith(_this__u8e3s4, comparator) {
        if (_this__u8e3s4.length > 1) {
            sortArrayWith(_this__u8e3s4, comparator);
        }
    }
    function fill_0(_this__u8e3s4, element, fromIndex, toIndex) {
        fromIndex = fromIndex === VOID ? 0 : fromIndex;
        toIndex = toIndex === VOID ? _this__u8e3s4.length : toIndex;
        Companion_instance_4.v2(fromIndex, toIndex, _this__u8e3s4.length);
        _this__u8e3s4.fill(element, fromIndex, toIndex);
    }
    function digitToIntImpl(_this__u8e3s4) {
        var ch = Char__toInt_impl_vasixd(_this__u8e3s4);
        var index = binarySearchRange(Digit_getInstance().w2_1, ch);
        var diff = ch - Digit_getInstance().w2_1[index] | 0;
        return diff < 10 ? diff : -1;
    }
    function binarySearchRange(array, needle) {
        var bottom = 0;
        var top = array.length - 1 | 0;
        var middle = -1;
        var value = 0;
        while (bottom <= top) {
            middle = (bottom + top | 0) / 2 | 0;
            value = array[middle];
            if (needle > value) bottom = middle + 1 | 0; else if (needle === value) return middle; else top = middle - 1 | 0;
        }
        return middle - (needle < value ? 1 : 0) | 0;
    }
    function Digit() {
        Digit_instance = this;
        var tmp = this;
        tmp.w2_1 = new Int32Array([ 48, 1632, 1776, 1984, 2406, 2534, 2662, 2790, 2918, 3046, 3174, 3302, 3430, 3558, 3664, 3792, 3872, 4160, 4240, 6112, 6160, 6470, 6608, 6784, 6800, 6992, 7088, 7232, 7248, 42528, 43216, 43264, 43472, 43504, 43600, 44016, 65296 ]);
    }
    var Digit_instance;
    function Digit_getInstance() {
        if (Digit_instance == null) new Digit;
        return Digit_instance;
    }
    function isWhitespaceImpl(_this__u8e3s4) {
        var ch = Char__toInt_impl_vasixd(_this__u8e3s4);
        return (9 <= ch ? ch <= 13 : false) || (28 <= ch ? ch <= 32 : false) || ch === 160 || ch > 4096 && (ch === 5760 || (8192 <= ch ? ch <= 8202 : false) || ch === 8232 || ch === 8233 || ch === 8239 || ch === 8287 || ch === 12288);
    }
    function Comparator() {}
    function isNaN_0(_this__u8e3s4) {
        return !(_this__u8e3s4 === _this__u8e3s4);
    }
    function takeHighestOneBit(_this__u8e3s4) {
        var tmp;
        if (_this__u8e3s4 === 0) {
            tmp = 0;
        } else {
            tmp = 1 << (31 - clz32(_this__u8e3s4) | 0);
        }
        return tmp;
    }
    function isInfinite(_this__u8e3s4) {
        return _this__u8e3s4 === Infinity || _this__u8e3s4 === -Infinity;
    }
    function isFinite(_this__u8e3s4) {
        return !isInfinite(_this__u8e3s4) && !isNaN_0(_this__u8e3s4);
    }
    function toRawBits(_this__u8e3s4) {
        return doubleToRawBits(_this__u8e3s4);
    }
    function countLeadingZeroBits(_this__u8e3s4) {
        var high = _this__u8e3s4.i2_1;
        var tmp;
        if (high === 0) {
            var this_0 = _this__u8e3s4.h2_1;
            tmp = 32 + clz32(this_0) | 0;
        } else {
            tmp = clz32(high);
        }
        return tmp;
    }
    function isFinite_0(_this__u8e3s4) {
        return !isInfinite_0(_this__u8e3s4) && !isNaN_1(_this__u8e3s4);
    }
    function countTrailingZeroBits(_this__u8e3s4) {
        var low = _this__u8e3s4.h2_1;
        return low === 0 ? 32 + countTrailingZeroBits_0(_this__u8e3s4.i2_1) | 0 : countTrailingZeroBits_0(low);
    }
    function isInfinite_0(_this__u8e3s4) {
        return _this__u8e3s4 === Infinity || _this__u8e3s4 === -Infinity;
    }
    function isNaN_1(_this__u8e3s4) {
        return !(_this__u8e3s4 === _this__u8e3s4);
    }
    function countTrailingZeroBits_0(_this__u8e3s4) {
        var this_0 = ~(_this__u8e3s4 | (-_this__u8e3s4 | 0));
        return 32 - clz32(this_0) | 0;
    }
    function Unit() {}
    protoOf(Unit).toString = function() {
        return 'kotlin.Unit';
    };
    var Unit_instance;
    function Unit_getInstance() {
        return Unit_instance;
    }
    function uintCompare(v1, v2) {
        var tmp;
        if (v1 === v2) {
            tmp = 0;
        } else {
            var tmp_0 = v1 >>> 0;
            if (tmp_0 < v2 >>> 0) {
                tmp = -1;
            } else {
                tmp = 1;
            }
        }
        return tmp;
    }
    function ulongCompare(v1, v2) {
        return bitwiseXor(v1, new Long(0, -2147483648)).j2(bitwiseXor(v2, new Long(0, -2147483648)));
    }
    function uintDivide(v1, v2) {
        var tmp = _UInt___get_data__impl__f0vqqw(v1) >>> 0;
        var this_0 = tmp / (_UInt___get_data__impl__f0vqqw(v2) >>> 0) | 0;
        return _UInt___init__impl__l7qpdl(this_0);
    }
    function ulongDivide(v1, v2) {
        var dividend = _ULong___get_data__impl__fggpzb(v1);
        var divisor = _ULong___get_data__impl__fggpzb(v2);
        if (compare(divisor, new Long(0, 0)) < 0) {
            var tmp;
            if (ulongCompare(_ULong___get_data__impl__fggpzb(v1), _ULong___get_data__impl__fggpzb(v2)) < 0) {
                tmp = _ULong___init__impl__c78o9k(new Long(0, 0));
            } else {
                tmp = _ULong___init__impl__c78o9k(new Long(1, 0));
            }
            return tmp;
        }
        if (compare(dividend, new Long(0, 0)) >= 0) {
            return _ULong___init__impl__c78o9k(divide(dividend, divisor));
        }
        var quotient = shiftLeft(divide(shiftRightUnsigned(dividend, 1), divisor), 1);
        var rem = subtract(dividend, multiply(quotient, divisor));
        var tmp_0;
        var tmp0 = _ULong___init__impl__c78o9k(rem);
        var other = _ULong___init__impl__c78o9k(divisor);
        if (ulongCompare(_ULong___get_data__impl__fggpzb(tmp0), _ULong___get_data__impl__fggpzb(other)) >= 0) {
            tmp_0 = 1;
        } else {
            tmp_0 = 0;
        }
        var other_0 = tmp_0;
        var tmp$ret$4 = add(quotient, fromInt(other_0));
        return _ULong___init__impl__c78o9k(tmp$ret$4);
    }
    function ulongToString(value, base) {
        if (compare(value, new Long(0, 0)) >= 0) return toString_2(value, base);
        var this_0 = shiftRightUnsigned(value, 1);
        var tmp$ret$0 = divide(this_0, fromInt(base));
        var quotient = shiftLeft(tmp$ret$0, 1);
        var this_1 = quotient;
        var tmp$ret$1 = multiply(this_1, fromInt(base));
        var rem = subtract(value, tmp$ret$1);
        if (compare(rem, fromInt(base)) >= 0) {
            var this_2 = rem;
            rem = subtract(this_2, fromInt(base));
            var this_3 = quotient;
            quotient = add(this_3, fromInt(1));
        }
        return toString_2(quotient, base) + toString_2(rem, base);
    }
    function copyToArray(collection) {
        var tmp;
        if (collection.toArray !== undefined) {
            tmp = collection.toArray();
        } else {
            tmp = collectionToArray(collection);
        }
        return tmp;
    }
    function checkIndexOverflow(index) {
        if (index < 0) {
            throwIndexOverflow();
        }
        return index;
    }
    function arrayCopy(source, destination, destinationOffset, startIndex, endIndex) {
        Companion_instance_4.v2(startIndex, endIndex, source.length);
        var rangeSize = endIndex - startIndex | 0;
        Companion_instance_4.v2(destinationOffset, destinationOffset + rangeSize | 0, destination.length);
        if (isView(destination) && isView(source)) {
            var subrange = source.subarray(startIndex, endIndex);
            destination.set(subrange, destinationOffset);
        } else {
            if (!(source === destination) || destinationOffset <= startIndex) {
                var inductionVariable = 0;
                if (inductionVariable < rangeSize) do {
                    var index = inductionVariable;
                    inductionVariable = inductionVariable + 1 | 0;
                    destination[destinationOffset + index | 0] = source[startIndex + index | 0];
                } while (inductionVariable < rangeSize);
            } else {
                var inductionVariable_0 = rangeSize - 1 | 0;
                if (0 <= inductionVariable_0) do {
                    var index_0 = inductionVariable_0;
                    inductionVariable_0 = inductionVariable_0 + -1 | 0;
                    destination[destinationOffset + index_0 | 0] = source[startIndex + index_0 | 0];
                } while (0 <= inductionVariable_0);
            }
        }
    }
    function terminateCollectionToArray(collectionSize, array) {
        return array;
    }
    function collectionToArray(collection) {
        return collectionToArrayCommonImpl(collection);
    }
    function listOf(element) {
        var tmp$ret$0 = [ element ];
        return new ArrayList(tmp$ret$0);
    }
    function mapCapacity(expectedSize) {
        return expectedSize;
    }
    function mapOf(pair) {
        return hashMapOf([ pair ]);
    }
    function setOf(element) {
        return hashSetOf([ element ]);
    }
    function sortWith_0(_this__u8e3s4, comparator) {
        collectionsSort(_this__u8e3s4, comparator);
    }
    function collectionsSort(list, comparator) {
        if (list.m() <= 1) return Unit_instance;
        var array = copyToArray(list);
        sortArrayWith(array, comparator);
        var inductionVariable = 0;
        var last = array.length;
        if (inductionVariable < last) do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            list.s(i, array[i]);
        } while (inductionVariable < last);
    }
    function AbstractMutableCollection() {
        AbstractCollection.call(this);
    }
    protoOf(AbstractMutableCollection).x2 = function(element) {
        this.y2();
        var iterator = this.j();
        while (iterator.k()) {
            if (equals(iterator.l(), element)) {
                iterator.z2();
                return true;
            }
        }
        return false;
    };
    protoOf(AbstractMutableCollection).q = function(elements) {
        this.y2();
        var modified = false;
        var _iterator__ex2g4s = elements.j();
        while (_iterator__ex2g4s.k()) {
            var element = _iterator__ex2g4s.l();
            if (this.i(element)) modified = true;
        }
        return modified;
    };
    protoOf(AbstractMutableCollection).toJSON = function() {
        return this.toArray();
    };
    protoOf(AbstractMutableCollection).y2 = function() {};
    function IteratorImpl($outer) {
        this.c3_1 = $outer;
        this.a3_1 = 0;
        this.b3_1 = -1;
    }
    protoOf(IteratorImpl).k = function() {
        return this.a3_1 < this.c3_1.m();
    };
    protoOf(IteratorImpl).l = function() {
        if (!this.k()) throw NoSuchElementException_init_$Create$();
        var tmp = this;
        var _unary__edvuaz = this.a3_1;
        this.a3_1 = _unary__edvuaz + 1 | 0;
        tmp.b3_1 = _unary__edvuaz;
        return this.c3_1.p(this.b3_1);
    };
    protoOf(IteratorImpl).z2 = function() {
        if (!!(this.b3_1 === -1)) {
            var message = 'Call next() or previous() before removing element from the iterator.';
            throw IllegalStateException_init_$Create$_0(toString_1(message));
        }
        this.c3_1.e3(this.b3_1);
        this.a3_1 = this.b3_1;
        this.b3_1 = -1;
    };
    function ListIteratorImpl($outer, index) {
        this.i3_1 = $outer;
        IteratorImpl.call(this, $outer);
        Companion_instance_4.j3(index, this.i3_1.m());
        this.a3_1 = index;
    }
    function AbstractMutableList() {
        AbstractMutableCollection.call(this);
        this.d3_1 = 0;
    }
    protoOf(AbstractMutableList).i = function(element) {
        this.y2();
        this.k3(this.m(), element);
        return true;
    };
    protoOf(AbstractMutableList).l3 = function() {
        this.y2();
        this.m3(0, this.m());
    };
    protoOf(AbstractMutableList).j = function() {
        return new IteratorImpl(this);
    };
    protoOf(AbstractMutableList).m1 = function(element) {
        return this.o1(element) >= 0;
    };
    protoOf(AbstractMutableList).o1 = function(element) {
        var tmp$ret$0;
        $l$block: {
            var index = 0;
            var _iterator__ex2g4s = this.j();
            while (_iterator__ex2g4s.k()) {
                var item = _iterator__ex2g4s.l();
                if (equals(item, element)) {
                    tmp$ret$0 = index;
                    break $l$block;
                }
                index = index + 1 | 0;
            }
            tmp$ret$0 = -1;
        }
        return tmp$ret$0;
    };
    protoOf(AbstractMutableList).r = function(index) {
        return new ListIteratorImpl(this, index);
    };
    protoOf(AbstractMutableList).m3 = function(fromIndex, toIndex) {
        var iterator = this.r(fromIndex);
        var times = toIndex - fromIndex | 0;
        var inductionVariable = 0;
        if (inductionVariable < times) do {
            var index = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            iterator.l();
            iterator.z2();
        } while (inductionVariable < times);
    };
    protoOf(AbstractMutableList).equals = function(other) {
        if (other === this) return true;
        if (!(!(other == null) ? isInterface(other, KtList) : false)) return false;
        return Companion_instance_4.n3(this, other);
    };
    protoOf(AbstractMutableList).hashCode = function() {
        return Companion_instance_4.o3(this);
    };
    function AbstractMutableMap() {
        AbstractMap.call(this);
        this.r3_1 = null;
        this.s3_1 = null;
    }
    protoOf(AbstractMutableMap).t3 = function() {
        return new HashMapKeysDefault(this);
    };
    protoOf(AbstractMutableMap).u3 = function() {
        return new HashMapValuesDefault(this);
    };
    protoOf(AbstractMutableMap).u1 = function() {
        var tmp0_elvis_lhs = this.r3_1;
        var tmp;
        if (tmp0_elvis_lhs == null) {
            var this_0 = this.t3();
            this.r3_1 = this_0;
            tmp = this_0;
        } else {
            tmp = tmp0_elvis_lhs;
        }
        return tmp;
    };
    protoOf(AbstractMutableMap).v1 = function() {
        var tmp0_elvis_lhs = this.s3_1;
        var tmp;
        if (tmp0_elvis_lhs == null) {
            var this_0 = this.u3();
            this.s3_1 = this_0;
            tmp = this_0;
        } else {
            tmp = tmp0_elvis_lhs;
        }
        return tmp;
    };
    protoOf(AbstractMutableMap).y1 = function(key) {
        this.y2();
        var iter = this.w1().j();
        while (iter.k()) {
            var entry = iter.l();
            var k = entry.p1();
            if (equals(key, k)) {
                var value = entry.q1();
                iter.z2();
                return value;
            }
        }
        return null;
    };
    protoOf(AbstractMutableMap).y2 = function() {};
    function AbstractMutableSet() {
        AbstractMutableCollection.call(this);
    }
    protoOf(AbstractMutableSet).equals = function(other) {
        if (other === this) return true;
        if (!(!(other == null) ? isInterface(other, KtSet) : false)) return false;
        return Companion_instance_6.y3(this, other);
    };
    protoOf(AbstractMutableSet).hashCode = function() {
        return Companion_instance_6.z3(this);
    };
    function arrayOfUninitializedElements(capacity) {
        if (!(capacity >= 0)) {
            var message = 'capacity must be non-negative.';
            throw IllegalArgumentException_init_$Create$_0(toString_1(message));
        }
        return Array(capacity);
    }
    function resetRange(_this__u8e3s4, fromIndex, toIndex) {
        _this__u8e3s4.fill(null, fromIndex, toIndex);
    }
    function copyOfUninitializedElements(_this__u8e3s4, newSize) {
        return copyOf_0(_this__u8e3s4, newSize);
    }
    function resetAt(_this__u8e3s4, index) {
        _this__u8e3s4[index] = null;
    }
    function Companion_2() {
        Companion_instance_2 = this;
        var tmp = this;
        var this_0 = ArrayList_init_$Create$_0(0);
        this_0.h_1 = true;
        tmp.a4_1 = this_0;
    }
    var Companion_instance_2;
    function Companion_getInstance_2() {
        if (Companion_instance_2 == null) new Companion_2;
        return Companion_instance_2;
    }
    function ArrayList_init_$Init$($this) {
        var tmp$ret$0 = [];
        ArrayList.call($this, tmp$ret$0);
        return $this;
    }
    function ArrayList_init_$Create$() {
        return ArrayList_init_$Init$(objectCreate(protoOf(ArrayList)));
    }
    function ArrayList_init_$Init$_0(initialCapacity, $this) {
        var tmp$ret$0 = [];
        ArrayList.call($this, tmp$ret$0);
        if (!(initialCapacity >= 0)) {
            var message = 'Negative initial capacity: ' + initialCapacity;
            throw IllegalArgumentException_init_$Create$_0(toString_1(message));
        }
        return $this;
    }
    function ArrayList_init_$Create$_0(initialCapacity) {
        return ArrayList_init_$Init$_0(initialCapacity, objectCreate(protoOf(ArrayList)));
    }
    function ArrayList_init_$Init$_1(elements, $this) {
        var tmp$ret$0 = copyToArray(elements);
        ArrayList.call($this, tmp$ret$0);
        return $this;
    }
    function ArrayList_init_$Create$_1(elements) {
        return ArrayList_init_$Init$_1(elements, objectCreate(protoOf(ArrayList)));
    }
    function increaseLength($this, amount) {
        var previous = $this.m();
        $this.g_1.length = $this.m() + amount | 0;
        return previous;
    }
    function rangeCheck($this, index) {
        Companion_instance_4.b4(index, $this.m());
        return index;
    }
    function insertionRangeCheck($this, index) {
        Companion_instance_4.j3(index, $this.m());
        return index;
    }
    function ArrayList(array) {
        Companion_getInstance_2();
        AbstractMutableList.call(this);
        this.g_1 = array;
        this.h_1 = false;
    }
    protoOf(ArrayList).c4 = function() {
        this.y2();
        this.h_1 = true;
        return this.m() > 0 ? this : Companion_getInstance_2().a4_1;
    };
    protoOf(ArrayList).d4 = function(minCapacity) {};
    protoOf(ArrayList).m = function() {
        return this.g_1.length;
    };
    protoOf(ArrayList).p = function(index) {
        return this.g_1[rangeCheck(this, index)];
    };
    protoOf(ArrayList).s = function(index, element) {
        this.y2();
        rangeCheck(this, index);
        var this_0 = this.g_1[index];
        this.g_1[index] = element;
        return this_0;
    };
    protoOf(ArrayList).i = function(element) {
        this.y2();
        this.g_1.push(element);
        this.d3_1 = this.d3_1 + 1 | 0;
        return true;
    };
    protoOf(ArrayList).k3 = function(index, element) {
        this.y2();
        this.g_1.splice(insertionRangeCheck(this, index), 0, element);
        this.d3_1 = this.d3_1 + 1 | 0;
    };
    protoOf(ArrayList).q = function(elements) {
        this.y2();
        if (elements.n()) return false;
        var offset = increaseLength(this, elements.m());
        var index = 0;
        var _iterator__ex2g4s = elements.j();
        while (_iterator__ex2g4s.k()) {
            var item = _iterator__ex2g4s.l();
            var _unary__edvuaz = index;
            index = _unary__edvuaz + 1 | 0;
            var index_0 = checkIndexOverflow(_unary__edvuaz);
            this.g_1[offset + index_0 | 0] = item;
        }
        this.d3_1 = this.d3_1 + 1 | 0;
        return true;
    };
    protoOf(ArrayList).e3 = function(index) {
        this.y2();
        rangeCheck(this, index);
        this.d3_1 = this.d3_1 + 1 | 0;
        var tmp;
        if (index === get_lastIndex_2(this)) {
            tmp = this.g_1.pop();
        } else {
            tmp = this.g_1.splice(index, 1)[0];
        }
        return tmp;
    };
    protoOf(ArrayList).x2 = function(element) {
        this.y2();
        var inductionVariable = 0;
        var last = this.g_1.length - 1 | 0;
        if (inductionVariable <= last) do {
            var index = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            if (equals(this.g_1[index], element)) {
                this.g_1.splice(index, 1);
                this.d3_1 = this.d3_1 + 1 | 0;
                return true;
            }
        } while (inductionVariable <= last);
        return false;
    };
    protoOf(ArrayList).m3 = function(fromIndex, toIndex) {
        this.y2();
        this.d3_1 = this.d3_1 + 1 | 0;
        this.g_1.splice(fromIndex, toIndex - fromIndex | 0);
    };
    protoOf(ArrayList).l3 = function() {
        this.y2();
        var tmp = this;
        tmp.g_1 = [];
        this.d3_1 = this.d3_1 + 1 | 0;
    };
    protoOf(ArrayList).o1 = function(element) {
        return indexOf(this.g_1, element);
    };
    protoOf(ArrayList).toString = function() {
        return arrayToString(this.g_1);
    };
    protoOf(ArrayList).e4 = function() {
        return [].slice.call(this.g_1);
    };
    protoOf(ArrayList).toArray = function() {
        return this.e4();
    };
    protoOf(ArrayList).y2 = function() {
        if (this.h_1) throw UnsupportedOperationException_init_$Create$();
    };
    var _stableSortingIsSupported;
    function sortArrayWith(array, comparator) {
        if (getStableSortingIsSupported()) {
            var comparison = sortArrayWith$lambda(comparator);
            array.sort(comparison);
        } else {
            mergeSort(array, 0, get_lastIndex(array), comparator);
        }
    }
    function getStableSortingIsSupported() {
        var tmp0_safe_receiver = _stableSortingIsSupported;
        if (tmp0_safe_receiver == null) null; else {
            return tmp0_safe_receiver;
        }
        _stableSortingIsSupported = false;
        var array = [];
        var inductionVariable = 0;
        if (inductionVariable < 600) do {
            var index = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            array.push(index);
        } while (inductionVariable < 600);
        var comparison = getStableSortingIsSupported$lambda;
        array.sort(comparison);
        var inductionVariable_0 = 1;
        var last = array.length;
        if (inductionVariable_0 < last) do {
            var index_0 = inductionVariable_0;
            inductionVariable_0 = inductionVariable_0 + 1 | 0;
            var a = array[index_0 - 1 | 0];
            var b = array[index_0];
            if ((a & 3) === (b & 3) && a >= b) return false;
        } while (inductionVariable_0 < last);
        _stableSortingIsSupported = true;
        return true;
    }
    function mergeSort(array, start, endInclusive, comparator) {
        var size = array.length;
        var buffer = Array(size);
        var result = mergeSort_0(array, buffer, start, endInclusive, comparator);
        if (!(result === array)) {
            var inductionVariable = start;
            if (inductionVariable <= endInclusive) do {
                var i = inductionVariable;
                inductionVariable = inductionVariable + 1 | 0;
                array[i] = result[i];
            } while (!(i === endInclusive));
        }
    }
    function mergeSort_0(array, buffer, start, end, comparator) {
        if (start === end) {
            return array;
        }
        var median = (start + end | 0) / 2 | 0;
        var left = mergeSort_0(array, buffer, start, median, comparator);
        var right = mergeSort_0(array, buffer, median + 1 | 0, end, comparator);
        var target = left === buffer ? array : buffer;
        var leftIndex = start;
        var rightIndex = median + 1 | 0;
        var inductionVariable = start;
        if (inductionVariable <= end) do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            if (leftIndex <= median && rightIndex <= end) {
                var leftValue = left[leftIndex];
                var rightValue = right[rightIndex];
                if (comparator.compare(leftValue, rightValue) <= 0) {
                    target[i] = leftValue;
                    leftIndex = leftIndex + 1 | 0;
                } else {
                    target[i] = rightValue;
                    rightIndex = rightIndex + 1 | 0;
                }
            } else if (leftIndex <= median) {
                target[i] = left[leftIndex];
                leftIndex = leftIndex + 1 | 0;
            } else {
                target[i] = right[rightIndex];
                rightIndex = rightIndex + 1 | 0;
            }
        } while (!(i === end));
        return target;
    }
    function sortArrayWith$lambda($comparator) {
        return function(a, b) {
            return $comparator.compare(a, b);
        };
    }
    function getStableSortingIsSupported$lambda(a, b) {
        return (a & 3) - (b & 3) | 0;
    }
    function HashMap_init_$Init$(internalMap, $this) {
        AbstractMutableMap.call($this);
        HashMap.call($this);
        $this.j4_1 = internalMap;
        return $this;
    }
    function HashMap_init_$Init$_0($this) {
        HashMap_init_$Init$(InternalHashMap_init_$Create$(), $this);
        return $this;
    }
    function HashMap_init_$Create$() {
        return HashMap_init_$Init$_0(objectCreate(protoOf(HashMap)));
    }
    function HashMap_init_$Init$_1(initialCapacity, loadFactor, $this) {
        HashMap_init_$Init$(InternalHashMap_init_$Create$_1(initialCapacity, loadFactor), $this);
        return $this;
    }
    function HashMap_init_$Init$_2(initialCapacity, $this) {
        HashMap_init_$Init$_1(initialCapacity, 1, $this);
        return $this;
    }
    function HashMap_init_$Create$_0(initialCapacity) {
        return HashMap_init_$Init$_2(initialCapacity, objectCreate(protoOf(HashMap)));
    }
    function HashMap_init_$Init$_3(original, $this) {
        HashMap_init_$Init$(InternalHashMap_init_$Create$_0(original), $this);
        return $this;
    }
    protoOf(HashMap).r1 = function(key) {
        return this.j4_1.l4(key);
    };
    protoOf(HashMap).s1 = function(value) {
        return this.j4_1.s1(value);
    };
    protoOf(HashMap).t3 = function() {
        return new HashMapKeys(this.j4_1);
    };
    protoOf(HashMap).u3 = function() {
        return new HashMapValues(this.j4_1);
    };
    protoOf(HashMap).w1 = function() {
        var tmp0_elvis_lhs = this.k4_1;
        var tmp;
        if (tmp0_elvis_lhs == null) {
            var this_0 = new HashMapEntrySet(this.j4_1);
            this.k4_1 = this_0;
            tmp = this_0;
        } else {
            tmp = tmp0_elvis_lhs;
        }
        return tmp;
    };
    protoOf(HashMap).t1 = function(key) {
        return this.j4_1.t1(key);
    };
    protoOf(HashMap).x1 = function(key, value) {
        return this.j4_1.x1(key, value);
    };
    protoOf(HashMap).y1 = function(key) {
        return this.j4_1.y1(key);
    };
    protoOf(HashMap).m = function() {
        return this.j4_1.m();
    };
    protoOf(HashMap).z1 = function(from) {
        return this.j4_1.z1(from);
    };
    function HashMap() {
        this.k4_1 = null;
    }
    function HashMapKeys(backing) {
        AbstractMutableSet.call(this);
        this.m4_1 = backing;
    }
    protoOf(HashMapKeys).m = function() {
        return this.m4_1.m();
    };
    protoOf(HashMapKeys).n = function() {
        return this.m4_1.m() === 0;
    };
    protoOf(HashMapKeys).m1 = function(element) {
        return this.m4_1.l4(element);
    };
    protoOf(HashMapKeys).i = function(element) {
        throw UnsupportedOperationException_init_$Create$();
    };
    protoOf(HashMapKeys).q = function(elements) {
        throw UnsupportedOperationException_init_$Create$();
    };
    protoOf(HashMapKeys).x2 = function(element) {
        return this.m4_1.n4(element);
    };
    protoOf(HashMapKeys).j = function() {
        return this.m4_1.o4();
    };
    protoOf(HashMapKeys).y2 = function() {
        return this.m4_1.p4();
    };
    function HashMapValues(backing) {
        AbstractMutableCollection.call(this);
        this.q4_1 = backing;
    }
    protoOf(HashMapValues).m = function() {
        return this.q4_1.m();
    };
    protoOf(HashMapValues).n = function() {
        return this.q4_1.m() === 0;
    };
    protoOf(HashMapValues).r4 = function(element) {
        return this.q4_1.s1(element);
    };
    protoOf(HashMapValues).m1 = function(element) {
        if (!true) return false;
        return this.r4(element);
    };
    protoOf(HashMapValues).s4 = function(element) {
        throw UnsupportedOperationException_init_$Create$();
    };
    protoOf(HashMapValues).i = function(element) {
        return this.s4(element);
    };
    protoOf(HashMapValues).t4 = function(elements) {
        throw UnsupportedOperationException_init_$Create$();
    };
    protoOf(HashMapValues).q = function(elements) {
        return this.t4(elements);
    };
    protoOf(HashMapValues).j = function() {
        return this.q4_1.u4();
    };
    protoOf(HashMapValues).y2 = function() {
        return this.q4_1.p4();
    };
    function HashMapEntrySet(backing) {
        HashMapEntrySetBase.call(this, backing);
    }
    protoOf(HashMapEntrySet).j = function() {
        return this.w4_1.x4();
    };
    function HashMapEntrySetBase(backing) {
        AbstractMutableSet.call(this);
        this.w4_1 = backing;
    }
    protoOf(HashMapEntrySetBase).m = function() {
        return this.w4_1.m();
    };
    protoOf(HashMapEntrySetBase).n = function() {
        return this.w4_1.m() === 0;
    };
    protoOf(HashMapEntrySetBase).y4 = function(element) {
        return this.w4_1.b5(element);
    };
    protoOf(HashMapEntrySetBase).m1 = function(element) {
        if (!(!(element == null) ? isInterface(element, Entry) : false)) return false;
        return this.y4((!(element == null) ? isInterface(element, Entry) : false) ? element : THROW_CCE());
    };
    protoOf(HashMapEntrySetBase).z4 = function(element) {
        throw UnsupportedOperationException_init_$Create$();
    };
    protoOf(HashMapEntrySetBase).i = function(element) {
        return this.z4((!(element == null) ? isInterface(element, Entry) : false) ? element : THROW_CCE());
    };
    protoOf(HashMapEntrySetBase).q = function(elements) {
        throw UnsupportedOperationException_init_$Create$();
    };
    protoOf(HashMapEntrySetBase).a5 = function(element) {
        return this.w4_1.c5(element);
    };
    protoOf(HashMapEntrySetBase).x2 = function(element) {
        if (!(!(element == null) ? isInterface(element, Entry) : false)) return false;
        return this.a5((!(element == null) ? isInterface(element, Entry) : false) ? element : THROW_CCE());
    };
    protoOf(HashMapEntrySetBase).n1 = function(elements) {
        return this.w4_1.d5(elements);
    };
    protoOf(HashMapEntrySetBase).y2 = function() {
        return this.w4_1.p4();
    };
    function HashMapKeysDefault$iterator$1($entryIterator) {
        this.e5_1 = $entryIterator;
    }
    protoOf(HashMapKeysDefault$iterator$1).k = function() {
        return this.e5_1.k();
    };
    protoOf(HashMapKeysDefault$iterator$1).l = function() {
        return this.e5_1.l().p1();
    };
    protoOf(HashMapKeysDefault$iterator$1).z2 = function() {
        return this.e5_1.z2();
    };
    function HashMapKeysDefault(backingMap) {
        AbstractMutableSet.call(this);
        this.f5_1 = backingMap;
    }
    protoOf(HashMapKeysDefault).g5 = function(element) {
        throw UnsupportedOperationException_init_$Create$_0('Add is not supported on keys');
    };
    protoOf(HashMapKeysDefault).i = function(element) {
        return this.g5(element);
    };
    protoOf(HashMapKeysDefault).l4 = function(element) {
        return this.f5_1.r1(element);
    };
    protoOf(HashMapKeysDefault).m1 = function(element) {
        if (!true) return false;
        return this.l4(element);
    };
    protoOf(HashMapKeysDefault).j = function() {
        var entryIterator = this.f5_1.w1().j();
        return new HashMapKeysDefault$iterator$1(entryIterator);
    };
    protoOf(HashMapKeysDefault).y1 = function(element) {
        this.y2();
        if (this.f5_1.r1(element)) {
            this.f5_1.y1(element);
            return true;
        }
        return false;
    };
    protoOf(HashMapKeysDefault).x2 = function(element) {
        if (!true) return false;
        return this.y1(element);
    };
    protoOf(HashMapKeysDefault).m = function() {
        return this.f5_1.m();
    };
    protoOf(HashMapKeysDefault).y2 = function() {
        return this.f5_1.y2();
    };
    function HashMapValuesDefault$iterator$1($entryIterator) {
        this.h5_1 = $entryIterator;
    }
    protoOf(HashMapValuesDefault$iterator$1).k = function() {
        return this.h5_1.k();
    };
    protoOf(HashMapValuesDefault$iterator$1).l = function() {
        return this.h5_1.l().q1();
    };
    protoOf(HashMapValuesDefault$iterator$1).z2 = function() {
        return this.h5_1.z2();
    };
    function HashMapValuesDefault(backingMap) {
        AbstractMutableCollection.call(this);
        this.i5_1 = backingMap;
    }
    protoOf(HashMapValuesDefault).s4 = function(element) {
        throw UnsupportedOperationException_init_$Create$_0('Add is not supported on values');
    };
    protoOf(HashMapValuesDefault).i = function(element) {
        return this.s4(element);
    };
    protoOf(HashMapValuesDefault).r4 = function(element) {
        return this.i5_1.s1(element);
    };
    protoOf(HashMapValuesDefault).m1 = function(element) {
        if (!true) return false;
        return this.r4(element);
    };
    protoOf(HashMapValuesDefault).j = function() {
        var entryIterator = this.i5_1.w1().j();
        return new HashMapValuesDefault$iterator$1(entryIterator);
    };
    protoOf(HashMapValuesDefault).m = function() {
        return this.i5_1.m();
    };
    protoOf(HashMapValuesDefault).y2 = function() {
        return this.i5_1.y2();
    };
    function HashSet_init_$Init$(map, $this) {
        AbstractMutableSet.call($this);
        HashSet.call($this);
        $this.j5_1 = map;
        return $this;
    }
    function HashSet_init_$Init$_0($this) {
        HashSet_init_$Init$(InternalHashMap_init_$Create$(), $this);
        return $this;
    }
    function HashSet_init_$Create$() {
        return HashSet_init_$Init$_0(objectCreate(protoOf(HashSet)));
    }
    function HashSet_init_$Init$_1(initialCapacity, loadFactor, $this) {
        HashSet_init_$Init$(InternalHashMap_init_$Create$_1(initialCapacity, loadFactor), $this);
        return $this;
    }
    function HashSet_init_$Init$_2(initialCapacity, $this) {
        HashSet_init_$Init$_1(initialCapacity, 1, $this);
        return $this;
    }
    function HashSet_init_$Create$_0(initialCapacity) {
        return HashSet_init_$Init$_2(initialCapacity, objectCreate(protoOf(HashSet)));
    }
    protoOf(HashSet).i = function(element) {
        return this.j5_1.x1(element, true) == null;
    };
    protoOf(HashSet).m1 = function(element) {
        return this.j5_1.l4(element);
    };
    protoOf(HashSet).n = function() {
        return this.j5_1.m() === 0;
    };
    protoOf(HashSet).j = function() {
        return this.j5_1.o4();
    };
    protoOf(HashSet).x2 = function(element) {
        return !(this.j5_1.y1(element) == null);
    };
    protoOf(HashSet).m = function() {
        return this.j5_1.m();
    };
    function HashSet() {}
    function computeHashSize($this, capacity) {
        return takeHighestOneBit(imul(coerceAtLeast(capacity, 1), 3));
    }
    function computeShift($this, hashSize) {
        return clz32(hashSize) + 1 | 0;
    }
    function checkForComodification($this) {
        if (!($this.u5_1.r5_1 === $this.w5_1)) throw ConcurrentModificationException_init_$Create$_0('The backing map has been modified after this entry was obtained.');
    }
    function InternalHashMap_init_$Init$($this) {
        InternalHashMap_init_$Init$_0(8, $this);
        return $this;
    }
    function InternalHashMap_init_$Create$() {
        return InternalHashMap_init_$Init$(objectCreate(protoOf(InternalHashMap)));
    }
    function InternalHashMap_init_$Init$_0(initialCapacity, $this) {
        InternalHashMap.call($this, arrayOfUninitializedElements(initialCapacity), null, new Int32Array(initialCapacity), new Int32Array(computeHashSize(Companion_instance_3, initialCapacity)), 2, 0);
        return $this;
    }
    function InternalHashMap_init_$Init$_1(original, $this) {
        InternalHashMap_init_$Init$_0(original.m(), $this);
        $this.z1(original);
        return $this;
    }
    function InternalHashMap_init_$Create$_0(original) {
        return InternalHashMap_init_$Init$_1(original, objectCreate(protoOf(InternalHashMap)));
    }
    function InternalHashMap_init_$Init$_2(initialCapacity, loadFactor, $this) {
        InternalHashMap_init_$Init$_0(initialCapacity, $this);
        if (!(loadFactor > 0)) {
            var message = 'Non-positive load factor: ' + loadFactor;
            throw IllegalArgumentException_init_$Create$_0(toString_1(message));
        }
        return $this;
    }
    function InternalHashMap_init_$Create$_1(initialCapacity, loadFactor) {
        return InternalHashMap_init_$Init$_2(initialCapacity, loadFactor, objectCreate(protoOf(InternalHashMap)));
    }
    function _get_capacity__a9k9f3($this) {
        return $this.k5_1.length;
    }
    function _get_hashSize__tftcho($this) {
        return $this.n5_1.length;
    }
    function registerModification($this) {
        $this.r5_1 = $this.r5_1 + 1 | 0;
    }
    function ensureExtraCapacity($this, n) {
        if (shouldCompact($this, n)) {
            compact($this, true);
        } else {
            ensureCapacity($this, $this.p5_1 + n | 0);
        }
    }
    function shouldCompact($this, extraCapacity) {
        var spareCapacity = _get_capacity__a9k9f3($this) - $this.p5_1 | 0;
        var gaps = $this.p5_1 - $this.m() | 0;
        return spareCapacity < extraCapacity && (gaps + spareCapacity | 0) >= extraCapacity && gaps >= (_get_capacity__a9k9f3($this) / 4 | 0);
    }
    function ensureCapacity($this, minCapacity) {
        if (minCapacity < 0) throw RuntimeException_init_$Create$_0('too many elements');
        if (minCapacity > _get_capacity__a9k9f3($this)) {
            var newSize = Companion_instance_4.x5(_get_capacity__a9k9f3($this), minCapacity);
            $this.k5_1 = copyOfUninitializedElements($this.k5_1, newSize);
            var tmp = $this;
            var tmp0_safe_receiver = $this.l5_1;
            tmp.l5_1 = tmp0_safe_receiver == null ? null : copyOfUninitializedElements(tmp0_safe_receiver, newSize);
            $this.m5_1 = copyOf($this.m5_1, newSize);
            var newHashSize = computeHashSize(Companion_instance_3, newSize);
            if (newHashSize > _get_hashSize__tftcho($this)) {
                rehash($this, newHashSize);
            }
        }
    }
    function allocateValuesArray($this) {
        var curValuesArray = $this.l5_1;
        if (!(curValuesArray == null)) return curValuesArray;
        var newValuesArray = arrayOfUninitializedElements(_get_capacity__a9k9f3($this));
        $this.l5_1 = newValuesArray;
        return newValuesArray;
    }
    function hash($this, key) {
        return key == null ? 0 : imul(hashCode_0(key), -1640531527) >>> $this.q5_1 | 0;
    }
    function compact($this, updateHashArray) {
        var i = 0;
        var j = 0;
        var valuesArray = $this.l5_1;
        while (i < $this.p5_1) {
            var hash = $this.m5_1[i];
            if (hash >= 0) {
                $this.k5_1[j] = $this.k5_1[i];
                if (!(valuesArray == null)) {
                    valuesArray[j] = valuesArray[i];
                }
                if (updateHashArray) {
                    $this.m5_1[j] = hash;
                    $this.n5_1[hash] = j + 1 | 0;
                }
                j = j + 1 | 0;
            }
            i = i + 1 | 0;
        }
        resetRange($this.k5_1, j, $this.p5_1);
        if (valuesArray == null) null; else {
            resetRange(valuesArray, j, $this.p5_1);
        }
        $this.p5_1 = j;
    }
    function rehash($this, newHashSize) {
        registerModification($this);
        if ($this.p5_1 > $this.s5_1) {
            compact($this, false);
        }
        $this.n5_1 = new Int32Array(newHashSize);
        $this.q5_1 = computeShift(Companion_instance_3, newHashSize);
        var i = 0;
        while (i < $this.p5_1) {
            var _unary__edvuaz = i;
            i = _unary__edvuaz + 1 | 0;
            if (!putRehash($this, _unary__edvuaz)) {
                throw IllegalStateException_init_$Create$_0('This cannot happen with fixed magic multiplier and grow-only hash array. Have object hashCodes changed?');
            }
        }
    }
    function putRehash($this, i) {
        var hash_0 = hash($this, $this.k5_1[i]);
        var probesLeft = $this.o5_1;
        while (true) {
            var index = $this.n5_1[hash_0];
            if (index === 0) {
                $this.n5_1[hash_0] = i + 1 | 0;
                $this.m5_1[i] = hash_0;
                return true;
            }
            probesLeft = probesLeft - 1 | 0;
            if (probesLeft < 0) return false;
            var _unary__edvuaz = hash_0;
            hash_0 = _unary__edvuaz - 1 | 0;
            if (_unary__edvuaz === 0) hash_0 = _get_hashSize__tftcho($this) - 1 | 0;
        }
    }
    function findKey($this, key) {
        var hash_0 = hash($this, key);
        var probesLeft = $this.o5_1;
        while (true) {
            var index = $this.n5_1[hash_0];
            if (index === 0) return -1;
            if (equals($this.k5_1[index - 1 | 0], key)) return index - 1 | 0;
            probesLeft = probesLeft - 1 | 0;
            if (probesLeft < 0) return -1;
            var _unary__edvuaz = hash_0;
            hash_0 = _unary__edvuaz - 1 | 0;
            if (_unary__edvuaz === 0) hash_0 = _get_hashSize__tftcho($this) - 1 | 0;
        }
    }
    function findValue($this, value) {
        var i = $this.p5_1;
        $l$loop: while (true) {
            i = i - 1 | 0;
            if (!(i >= 0)) {
                break $l$loop;
            }
            if ($this.m5_1[i] >= 0 && equals(ensureNotNull($this.l5_1)[i], value)) return i;
        }
        return -1;
    }
    function addKey($this, key) {
        $this.p4();
        retry: while (true) {
            var hash_0 = hash($this, key);
            var tentativeMaxProbeDistance = coerceAtMost(imul($this.o5_1, 2), _get_hashSize__tftcho($this) / 2 | 0);
            var probeDistance = 0;
            while (true) {
                var index = $this.n5_1[hash_0];
                if (index === 0) {
                    if ($this.p5_1 >= _get_capacity__a9k9f3($this)) {
                        ensureExtraCapacity($this, 1);
                        continue retry;
                    }
                    var _unary__edvuaz = $this.p5_1;
                    $this.p5_1 = _unary__edvuaz + 1 | 0;
                    var putIndex = _unary__edvuaz;
                    $this.k5_1[putIndex] = key;
                    $this.m5_1[putIndex] = hash_0;
                    $this.n5_1[hash_0] = putIndex + 1 | 0;
                    $this.s5_1 = $this.s5_1 + 1 | 0;
                    registerModification($this);
                    if (probeDistance > $this.o5_1) $this.o5_1 = probeDistance;
                    return putIndex;
                }
                if (equals($this.k5_1[index - 1 | 0], key)) {
                    return -index | 0;
                }
                probeDistance = probeDistance + 1 | 0;
                if (probeDistance > tentativeMaxProbeDistance) {
                    rehash($this, imul(_get_hashSize__tftcho($this), 2));
                    continue retry;
                }
                var _unary__edvuaz_0 = hash_0;
                hash_0 = _unary__edvuaz_0 - 1 | 0;
                if (_unary__edvuaz_0 === 0) hash_0 = _get_hashSize__tftcho($this) - 1 | 0;
            }
        }
    }
    function removeEntryAt($this, index) {
        resetAt($this.k5_1, index);
        var tmp0_safe_receiver = $this.l5_1;
        if (tmp0_safe_receiver == null) null; else {
            resetAt(tmp0_safe_receiver, index);
        }
        removeHashAt($this, $this.m5_1[index]);
        $this.m5_1[index] = -1;
        $this.s5_1 = $this.s5_1 - 1 | 0;
        registerModification($this);
    }
    function removeHashAt($this, removedHash) {
        var hash_0 = removedHash;
        var hole = removedHash;
        var probeDistance = 0;
        while (true) {
            var _unary__edvuaz = hash_0;
            hash_0 = _unary__edvuaz - 1 | 0;
            if (_unary__edvuaz === 0) hash_0 = _get_hashSize__tftcho($this) - 1 | 0;
            var index = $this.n5_1[hash_0];
            probeDistance = probeDistance + 1 | 0;
            if (probeDistance > $this.o5_1) {
                $this.n5_1[hole] = 0;
                return Unit_instance;
            }
            if (index === 0) {
                $this.n5_1[hole] = 0;
                return Unit_instance;
            }
            var otherHash = hash($this, $this.k5_1[index - 1 | 0]);
            if (((otherHash - hash_0 | 0) & (_get_hashSize__tftcho($this) - 1 | 0)) >= probeDistance) {
                $this.n5_1[hole] = index;
                $this.m5_1[index - 1 | 0] = hole;
                hole = hash_0;
                probeDistance = 0;
            }
        }
    }
    function contentEquals_0($this, other) {
        return $this.s5_1 === other.m() && $this.d5(other.w1());
    }
    function putEntry($this, entry) {
        var index = addKey($this, entry.p1());
        var valuesArray = allocateValuesArray($this);
        if (index >= 0) {
            valuesArray[index] = entry.q1();
            return true;
        }
        var oldValue = valuesArray[(-index | 0) - 1 | 0];
        if (!equals(entry.q1(), oldValue)) {
            valuesArray[(-index | 0) - 1 | 0] = entry.q1();
            return true;
        }
        return false;
    }
    function putAllEntries($this, from) {
        if (from.n()) return false;
        ensureExtraCapacity($this, from.m());
        var it = from.j();
        var updated = false;
        while (it.k()) {
            if (putEntry($this, it.l())) updated = true;
        }
        return updated;
    }
    function Companion_3() {
        this.y5_1 = -1640531527;
        this.z5_1 = 8;
        this.a6_1 = 2;
        this.b6_1 = -1;
    }
    var Companion_instance_3;
    function Companion_getInstance_3() {
        return Companion_instance_3;
    }
    function Itr(map) {
        this.c6_1 = map;
        this.d6_1 = 0;
        this.e6_1 = -1;
        this.f6_1 = this.c6_1.r5_1;
        this.g6();
    }
    protoOf(Itr).g6 = function() {
        while (this.d6_1 < this.c6_1.p5_1 && this.c6_1.m5_1[this.d6_1] < 0) {
            this.d6_1 = this.d6_1 + 1 | 0;
        }
    };
    protoOf(Itr).k = function() {
        return this.d6_1 < this.c6_1.p5_1;
    };
    protoOf(Itr).z2 = function() {
        this.h6();
        if (!!(this.e6_1 === -1)) {
            var message = 'Call next() before removing element from the iterator.';
            throw IllegalStateException_init_$Create$_0(toString_1(message));
        }
        this.c6_1.p4();
        removeEntryAt(this.c6_1, this.e6_1);
        this.e6_1 = -1;
        this.f6_1 = this.c6_1.r5_1;
    };
    protoOf(Itr).h6 = function() {
        if (!(this.c6_1.r5_1 === this.f6_1)) throw ConcurrentModificationException_init_$Create$();
    };
    function KeysItr(map) {
        Itr.call(this, map);
    }
    protoOf(KeysItr).l = function() {
        this.h6();
        if (this.d6_1 >= this.c6_1.p5_1) throw NoSuchElementException_init_$Create$();
        var tmp = this;
        var _unary__edvuaz = this.d6_1;
        this.d6_1 = _unary__edvuaz + 1 | 0;
        tmp.e6_1 = _unary__edvuaz;
        var result = this.c6_1.k5_1[this.e6_1];
        this.g6();
        return result;
    };
    function ValuesItr(map) {
        Itr.call(this, map);
    }
    protoOf(ValuesItr).l = function() {
        this.h6();
        if (this.d6_1 >= this.c6_1.p5_1) throw NoSuchElementException_init_$Create$();
        var tmp = this;
        var _unary__edvuaz = this.d6_1;
        this.d6_1 = _unary__edvuaz + 1 | 0;
        tmp.e6_1 = _unary__edvuaz;
        var result = ensureNotNull(this.c6_1.l5_1)[this.e6_1];
        this.g6();
        return result;
    };
    function EntriesItr(map) {
        Itr.call(this, map);
    }
    protoOf(EntriesItr).l = function() {
        this.h6();
        if (this.d6_1 >= this.c6_1.p5_1) throw NoSuchElementException_init_$Create$();
        var tmp = this;
        var _unary__edvuaz = this.d6_1;
        this.d6_1 = _unary__edvuaz + 1 | 0;
        tmp.e6_1 = _unary__edvuaz;
        var result = new EntryRef(this.c6_1, this.e6_1);
        this.g6();
        return result;
    };
    protoOf(EntriesItr).u6 = function() {
        if (this.d6_1 >= this.c6_1.p5_1) throw NoSuchElementException_init_$Create$();
        var tmp = this;
        var _unary__edvuaz = this.d6_1;
        this.d6_1 = _unary__edvuaz + 1 | 0;
        tmp.e6_1 = _unary__edvuaz;
        var tmp0_safe_receiver = this.c6_1.k5_1[this.e6_1];
        var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : hashCode_0(tmp0_safe_receiver);
        var tmp_0 = tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
        var tmp0_safe_receiver_0 = ensureNotNull(this.c6_1.l5_1)[this.e6_1];
        var tmp1_elvis_lhs_0 = tmp0_safe_receiver_0 == null ? null : hashCode_0(tmp0_safe_receiver_0);
        var result = tmp_0 ^ (tmp1_elvis_lhs_0 == null ? 0 : tmp1_elvis_lhs_0);
        this.g6();
        return result;
    };
    protoOf(EntriesItr).v6 = function(sb) {
        if (this.d6_1 >= this.c6_1.p5_1) throw NoSuchElementException_init_$Create$();
        var tmp = this;
        var _unary__edvuaz = this.d6_1;
        this.d6_1 = _unary__edvuaz + 1 | 0;
        tmp.e6_1 = _unary__edvuaz;
        var key = this.c6_1.k5_1[this.e6_1];
        if (equals(key, this.c6_1)) sb.y6('(this Map)'); else sb.x6(key);
        sb.z6(_Char___init__impl__6a9atx(61));
        var value = ensureNotNull(this.c6_1.l5_1)[this.e6_1];
        if (equals(value, this.c6_1)) sb.y6('(this Map)'); else sb.x6(value);
        this.g6();
    };
    function EntryRef(map, index) {
        this.u5_1 = map;
        this.v5_1 = index;
        this.w5_1 = this.u5_1.r5_1;
    }
    protoOf(EntryRef).p1 = function() {
        checkForComodification(this);
        return this.u5_1.k5_1[this.v5_1];
    };
    protoOf(EntryRef).q1 = function() {
        checkForComodification(this);
        return ensureNotNull(this.u5_1.l5_1)[this.v5_1];
    };
    protoOf(EntryRef).equals = function(other) {
        var tmp;
        var tmp_0;
        if (!(other == null) ? isInterface(other, Entry) : false) {
            tmp_0 = equals(other.p1(), this.p1());
        } else {
            tmp_0 = false;
        }
        if (tmp_0) {
            tmp = equals(other.q1(), this.q1());
        } else {
            tmp = false;
        }
        return tmp;
    };
    protoOf(EntryRef).hashCode = function() {
        var tmp0_safe_receiver = this.p1();
        var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : hashCode_0(tmp0_safe_receiver);
        var tmp = tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
        var tmp0_safe_receiver_0 = this.q1();
        var tmp1_elvis_lhs_0 = tmp0_safe_receiver_0 == null ? null : hashCode_0(tmp0_safe_receiver_0);
        return tmp ^ (tmp1_elvis_lhs_0 == null ? 0 : tmp1_elvis_lhs_0);
    };
    protoOf(EntryRef).toString = function() {
        return toString_0(this.p1()) + '=' + toString_0(this.q1());
    };
    function InternalHashMap(keysArray, valuesArray, presenceArray, hashArray, maxProbeDistance, length) {
        this.k5_1 = keysArray;
        this.l5_1 = valuesArray;
        this.m5_1 = presenceArray;
        this.n5_1 = hashArray;
        this.o5_1 = maxProbeDistance;
        this.p5_1 = length;
        this.q5_1 = computeShift(Companion_instance_3, _get_hashSize__tftcho(this));
        this.r5_1 = 0;
        this.s5_1 = 0;
        this.t5_1 = false;
    }
    protoOf(InternalHashMap).m = function() {
        return this.s5_1;
    };
    protoOf(InternalHashMap).s1 = function(value) {
        return findValue(this, value) >= 0;
    };
    protoOf(InternalHashMap).t1 = function(key) {
        var index = findKey(this, key);
        if (index < 0) return null;
        return ensureNotNull(this.l5_1)[index];
    };
    protoOf(InternalHashMap).l4 = function(key) {
        return findKey(this, key) >= 0;
    };
    protoOf(InternalHashMap).x1 = function(key, value) {
        var index = addKey(this, key);
        var valuesArray = allocateValuesArray(this);
        if (index < 0) {
            var oldValue = valuesArray[(-index | 0) - 1 | 0];
            valuesArray[(-index | 0) - 1 | 0] = value;
            return oldValue;
        } else {
            valuesArray[index] = value;
            return null;
        }
    };
    protoOf(InternalHashMap).z1 = function(from) {
        this.p4();
        putAllEntries(this, from.w1());
    };
    protoOf(InternalHashMap).y1 = function(key) {
        this.p4();
        var index = findKey(this, key);
        if (index < 0) return null;
        var oldValue = ensureNotNull(this.l5_1)[index];
        removeEntryAt(this, index);
        return oldValue;
    };
    protoOf(InternalHashMap).equals = function(other) {
        var tmp;
        if (other === this) {
            tmp = true;
        } else {
            var tmp_0;
            if (!(other == null) ? isInterface(other, KtMap) : false) {
                tmp_0 = contentEquals_0(this, other);
            } else {
                tmp_0 = false;
            }
            tmp = tmp_0;
        }
        return tmp;
    };
    protoOf(InternalHashMap).hashCode = function() {
        var result = 0;
        var it = this.x4();
        while (it.k()) {
            result = result + it.u6() | 0;
        }
        return result;
    };
    protoOf(InternalHashMap).toString = function() {
        var sb = StringBuilder_init_$Create$(2 + imul(this.s5_1, 3) | 0);
        sb.y6('{');
        var i = 0;
        var it = this.x4();
        while (it.k()) {
            if (i > 0) {
                sb.y6(', ');
            }
            it.v6(sb);
            i = i + 1 | 0;
        }
        sb.y6('}');
        return sb.toString();
    };
    protoOf(InternalHashMap).p4 = function() {
        if (this.t5_1) throw UnsupportedOperationException_init_$Create$();
    };
    protoOf(InternalHashMap).n4 = function(key) {
        this.p4();
        var index = findKey(this, key);
        if (index < 0) return false;
        removeEntryAt(this, index);
        return true;
    };
    protoOf(InternalHashMap).b5 = function(entry) {
        var index = findKey(this, entry.p1());
        if (index < 0) return false;
        return equals(ensureNotNull(this.l5_1)[index], entry.q1());
    };
    protoOf(InternalHashMap).a7 = function(entry) {
        return this.b5(isInterface(entry, Entry) ? entry : THROW_CCE());
    };
    protoOf(InternalHashMap).c5 = function(entry) {
        this.p4();
        var index = findKey(this, entry.p1());
        if (index < 0) return false;
        if (!equals(ensureNotNull(this.l5_1)[index], entry.q1())) return false;
        removeEntryAt(this, index);
        return true;
    };
    protoOf(InternalHashMap).o4 = function() {
        return new KeysItr(this);
    };
    protoOf(InternalHashMap).u4 = function() {
        return new ValuesItr(this);
    };
    protoOf(InternalHashMap).x4 = function() {
        return new EntriesItr(this);
    };
    function InternalMap() {}
    function LinkedHashMap_init_$Init$($this) {
        HashMap_init_$Init$_0($this);
        LinkedHashMap.call($this);
        return $this;
    }
    function LinkedHashMap_init_$Create$() {
        return LinkedHashMap_init_$Init$(objectCreate(protoOf(LinkedHashMap)));
    }
    function LinkedHashMap_init_$Init$_0(initialCapacity, $this) {
        HashMap_init_$Init$_2(initialCapacity, $this);
        LinkedHashMap.call($this);
        return $this;
    }
    function LinkedHashMap_init_$Create$_0(initialCapacity) {
        return LinkedHashMap_init_$Init$_0(initialCapacity, objectCreate(protoOf(LinkedHashMap)));
    }
    function LinkedHashMap_init_$Init$_1(original, $this) {
        HashMap_init_$Init$_3(original, $this);
        LinkedHashMap.call($this);
        return $this;
    }
    function LinkedHashMap_init_$Create$_1(original) {
        return LinkedHashMap_init_$Init$_1(original, objectCreate(protoOf(LinkedHashMap)));
    }
    protoOf(LinkedHashMap).y2 = function() {
        return this.j4_1.p4();
    };
    function LinkedHashMap() {}
    function LinkedHashSet_init_$Init$($this) {
        HashSet_init_$Init$_0($this);
        LinkedHashSet.call($this);
        return $this;
    }
    function LinkedHashSet_init_$Create$() {
        return LinkedHashSet_init_$Init$(objectCreate(protoOf(LinkedHashSet)));
    }
    function LinkedHashSet_init_$Init$_0(initialCapacity, loadFactor, $this) {
        HashSet_init_$Init$_1(initialCapacity, loadFactor, $this);
        LinkedHashSet.call($this);
        return $this;
    }
    function LinkedHashSet_init_$Init$_1(initialCapacity, $this) {
        LinkedHashSet_init_$Init$_0(initialCapacity, 1, $this);
        return $this;
    }
    function LinkedHashSet_init_$Create$_0(initialCapacity) {
        return LinkedHashSet_init_$Init$_1(initialCapacity, objectCreate(protoOf(LinkedHashSet)));
    }
    protoOf(LinkedHashSet).y2 = function() {
        return this.j5_1.p4();
    };
    function LinkedHashSet() {}
    function RandomAccess() {}
    function CoroutineImpl(resultContinuation) {
        InterceptedCoroutine.call(this);
        this.j7_1 = resultContinuation;
        this.k7_1 = 0;
        this.l7_1 = 0;
        this.m7_1 = null;
        this.n7_1 = null;
        this.o7_1 = null;
        var tmp = this;
        var tmp0_safe_receiver = this.j7_1;
        tmp.p7_1 = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.q7();
    }
    protoOf(CoroutineImpl).q7 = function() {
        return ensureNotNull(this.p7_1);
    };
    protoOf(CoroutineImpl).r7 = function(result) {
        var current = this;
        var currentResult = _Result___get_isFailure__impl__jpiriv(result) ? null : _Result___get_value__impl__bjfvqg(result);
        var currentException = Result__exceptionOrNull_impl_p6xea9(result);
        while (true) {
            var $this$with = current;
            if (currentException == null) {
                $this$with.m7_1 = currentResult;
            } else {
                $this$with.k7_1 = $this$with.l7_1;
                $this$with.n7_1 = currentException;
            }
            try {
                var outcome = $this$with.s7();
                if (outcome === get_COROUTINE_SUSPENDED()) return Unit_instance;
                currentResult = outcome;
                currentException = null;
            } catch ($p) {
                var exception = $p;
                currentResult = null;
                currentException = exception;
            }
            $this$with.u7();
            var completion = ensureNotNull($this$with.j7_1);
            if (completion instanceof CoroutineImpl) {
                current = completion;
            } else {
                if (!(currentException == null)) {
                    var exception_0 = currentException;
                    var tmp$ret$5 = _Result___init__impl__xyqfz8(createFailure(exception_0));
                    completion.v7(tmp$ret$5);
                } else {
                    var value = currentResult;
                    var tmp$ret$7 = _Result___init__impl__xyqfz8(value);
                    completion.v7(tmp$ret$7);
                }
                return Unit_instance;
            }
        }
    };
    protoOf(CoroutineImpl).v7 = function(result) {
        return this.r7(result);
    };
    function CompletedContinuation() {}
    protoOf(CompletedContinuation).q7 = function() {
        var message = 'This continuation is already complete';
        throw IllegalStateException_init_$Create$_0(toString_1(message));
    };
    protoOf(CompletedContinuation).r7 = function(result) {
        var message = 'This continuation is already complete';
        throw IllegalStateException_init_$Create$_0(toString_1(message));
    };
    protoOf(CompletedContinuation).v7 = function(result) {
        return this.r7(result);
    };
    protoOf(CompletedContinuation).toString = function() {
        return 'This continuation is already complete';
    };
    var CompletedContinuation_instance;
    function CompletedContinuation_getInstance() {
        return CompletedContinuation_instance;
    }
    function InterceptedCoroutine() {
        this.t7_1 = null;
    }
    protoOf(InterceptedCoroutine).u7 = function() {
        var intercepted = this.t7_1;
        if (!(intercepted == null) && !(intercepted === this)) {
            ensureNotNull(this.q7().w7(Key_instance)).x7(intercepted);
        }
        this.t7_1 = CompletedContinuation_instance;
    };
    function createCoroutineUnintercepted(_this__u8e3s4, receiver, completion) {
        return new createCoroutineUnintercepted$$inlined$createCoroutineFromSuspendFunction$1(completion, _this__u8e3s4, receiver, completion);
    }
    function invokeSuspendSuperTypeWithReceiver(_this__u8e3s4, receiver, completion) {
        throw new NotImplementedError('It is intrinsic method');
    }
    function startCoroutineUninterceptedOrReturnNonGeneratorVersion(_this__u8e3s4, receiver, param, completion) {
        var tmp;
        if (!(completion instanceof InterceptedCoroutine)) {
            tmp = createSimpleCoroutineForSuspendFunction(completion);
        } else {
            tmp = completion;
        }
        var wrappedCompletion = tmp;
        var a = _this__u8e3s4;
        return typeof a === 'function' ? a(receiver, param, wrappedCompletion) : _this__u8e3s4.y7(receiver, param, wrappedCompletion);
    }
    function createSimpleCoroutineForSuspendFunction(completion) {
        return new createSimpleCoroutineForSuspendFunction$1(completion);
    }
    function invokeSuspendSuperTypeWithReceiverAndParam(_this__u8e3s4, receiver, param, completion) {
        throw new NotImplementedError('It is intrinsic method');
    }
    function createCoroutineUnintercepted$$inlined$createCoroutineFromSuspendFunction$1($completion, $this_createCoroutineUnintercepted, $receiver, $completion$1) {
        this.h8_1 = $this_createCoroutineUnintercepted;
        this.i8_1 = $receiver;
        this.j8_1 = $completion$1;
        CoroutineImpl.call(this, isInterface($completion, Continuation) ? $completion : THROW_CCE());
    }
    protoOf(createCoroutineUnintercepted$$inlined$createCoroutineFromSuspendFunction$1).s7 = function() {
        if (this.n7_1 != null) throw this.n7_1;
        var a = this.h8_1;
        return typeof a === 'function' ? a(this.i8_1, this.j8_1) : this.h8_1.k8(this.i8_1, this.j8_1);
    };
    function createSimpleCoroutineForSuspendFunction$1($completion) {
        CoroutineImpl.call(this, isInterface($completion, Continuation) ? $completion : THROW_CCE());
    }
    protoOf(createSimpleCoroutineForSuspendFunction$1).s7 = function() {
        if (this.n7_1 != null) throw this.n7_1;
        return this.m7_1;
    };
    function UnsupportedOperationException_init_$Init$($this) {
        RuntimeException_init_$Init$($this);
        UnsupportedOperationException.call($this);
        return $this;
    }
    function UnsupportedOperationException_init_$Create$() {
        var tmp = UnsupportedOperationException_init_$Init$(objectCreate(protoOf(UnsupportedOperationException)));
        captureStack(tmp, UnsupportedOperationException_init_$Create$);
        return tmp;
    }
    function UnsupportedOperationException_init_$Init$_0(message, $this) {
        RuntimeException_init_$Init$_0(message, $this);
        UnsupportedOperationException.call($this);
        return $this;
    }
    function UnsupportedOperationException_init_$Create$_0(message) {
        var tmp = UnsupportedOperationException_init_$Init$_0(message, objectCreate(protoOf(UnsupportedOperationException)));
        captureStack(tmp, UnsupportedOperationException_init_$Create$_0);
        return tmp;
    }
    function UnsupportedOperationException() {
        captureStack(this, UnsupportedOperationException);
    }
    function IllegalArgumentException_init_$Init$($this) {
        RuntimeException_init_$Init$($this);
        IllegalArgumentException.call($this);
        return $this;
    }
    function IllegalArgumentException_init_$Create$() {
        var tmp = IllegalArgumentException_init_$Init$(objectCreate(protoOf(IllegalArgumentException)));
        captureStack(tmp, IllegalArgumentException_init_$Create$);
        return tmp;
    }
    function IllegalArgumentException_init_$Init$_0(message, $this) {
        RuntimeException_init_$Init$_0(message, $this);
        IllegalArgumentException.call($this);
        return $this;
    }
    function IllegalArgumentException_init_$Create$_0(message) {
        var tmp = IllegalArgumentException_init_$Init$_0(message, objectCreate(protoOf(IllegalArgumentException)));
        captureStack(tmp, IllegalArgumentException_init_$Create$_0);
        return tmp;
    }
    function IllegalArgumentException_init_$Init$_1(message, cause, $this) {
        RuntimeException_init_$Init$_1(message, cause, $this);
        IllegalArgumentException.call($this);
        return $this;
    }
    function IllegalArgumentException_init_$Create$_1(message, cause) {
        var tmp = IllegalArgumentException_init_$Init$_1(message, cause, objectCreate(protoOf(IllegalArgumentException)));
        captureStack(tmp, IllegalArgumentException_init_$Create$_1);
        return tmp;
    }
    function IllegalArgumentException() {
        captureStack(this, IllegalArgumentException);
    }
    function RuntimeException_init_$Init$($this) {
        Exception_init_$Init$($this);
        RuntimeException.call($this);
        return $this;
    }
    function RuntimeException_init_$Create$() {
        var tmp = RuntimeException_init_$Init$(objectCreate(protoOf(RuntimeException)));
        captureStack(tmp, RuntimeException_init_$Create$);
        return tmp;
    }
    function RuntimeException_init_$Init$_0(message, $this) {
        Exception_init_$Init$_0(message, $this);
        RuntimeException.call($this);
        return $this;
    }
    function RuntimeException_init_$Create$_0(message) {
        var tmp = RuntimeException_init_$Init$_0(message, objectCreate(protoOf(RuntimeException)));
        captureStack(tmp, RuntimeException_init_$Create$_0);
        return tmp;
    }
    function RuntimeException_init_$Init$_1(message, cause, $this) {
        Exception_init_$Init$_1(message, cause, $this);
        RuntimeException.call($this);
        return $this;
    }
    function RuntimeException() {
        captureStack(this, RuntimeException);
    }
    function Exception_init_$Init$($this) {
        extendThrowable($this);
        Exception.call($this);
        return $this;
    }
    function Exception_init_$Create$() {
        var tmp = Exception_init_$Init$(objectCreate(protoOf(Exception)));
        captureStack(tmp, Exception_init_$Create$);
        return tmp;
    }
    function Exception_init_$Init$_0(message, $this) {
        extendThrowable($this, message);
        Exception.call($this);
        return $this;
    }
    function Exception_init_$Create$_0(message) {
        var tmp = Exception_init_$Init$_0(message, objectCreate(protoOf(Exception)));
        captureStack(tmp, Exception_init_$Create$_0);
        return tmp;
    }
    function Exception_init_$Init$_1(message, cause, $this) {
        extendThrowable($this, message, cause);
        Exception.call($this);
        return $this;
    }
    function Exception() {
        captureStack(this, Exception);
    }
    function NoSuchElementException_init_$Init$($this) {
        RuntimeException_init_$Init$($this);
        NoSuchElementException.call($this);
        return $this;
    }
    function NoSuchElementException_init_$Create$() {
        var tmp = NoSuchElementException_init_$Init$(objectCreate(protoOf(NoSuchElementException)));
        captureStack(tmp, NoSuchElementException_init_$Create$);
        return tmp;
    }
    function NoSuchElementException_init_$Init$_0(message, $this) {
        RuntimeException_init_$Init$_0(message, $this);
        NoSuchElementException.call($this);
        return $this;
    }
    function NoSuchElementException_init_$Create$_0(message) {
        var tmp = NoSuchElementException_init_$Init$_0(message, objectCreate(protoOf(NoSuchElementException)));
        captureStack(tmp, NoSuchElementException_init_$Create$_0);
        return tmp;
    }
    function NoSuchElementException() {
        captureStack(this, NoSuchElementException);
    }
    function IndexOutOfBoundsException_init_$Init$($this) {
        RuntimeException_init_$Init$($this);
        IndexOutOfBoundsException.call($this);
        return $this;
    }
    function IndexOutOfBoundsException_init_$Create$() {
        var tmp = IndexOutOfBoundsException_init_$Init$(objectCreate(protoOf(IndexOutOfBoundsException)));
        captureStack(tmp, IndexOutOfBoundsException_init_$Create$);
        return tmp;
    }
    function IndexOutOfBoundsException_init_$Init$_0(message, $this) {
        RuntimeException_init_$Init$_0(message, $this);
        IndexOutOfBoundsException.call($this);
        return $this;
    }
    function IndexOutOfBoundsException_init_$Create$_0(message) {
        var tmp = IndexOutOfBoundsException_init_$Init$_0(message, objectCreate(protoOf(IndexOutOfBoundsException)));
        captureStack(tmp, IndexOutOfBoundsException_init_$Create$_0);
        return tmp;
    }
    function IndexOutOfBoundsException() {
        captureStack(this, IndexOutOfBoundsException);
    }
    function IllegalStateException_init_$Init$($this) {
        RuntimeException_init_$Init$($this);
        IllegalStateException.call($this);
        return $this;
    }
    function IllegalStateException_init_$Create$() {
        var tmp = IllegalStateException_init_$Init$(objectCreate(protoOf(IllegalStateException)));
        captureStack(tmp, IllegalStateException_init_$Create$);
        return tmp;
    }
    function IllegalStateException_init_$Init$_0(message, $this) {
        RuntimeException_init_$Init$_0(message, $this);
        IllegalStateException.call($this);
        return $this;
    }
    function IllegalStateException_init_$Create$_0(message) {
        var tmp = IllegalStateException_init_$Init$_0(message, objectCreate(protoOf(IllegalStateException)));
        captureStack(tmp, IllegalStateException_init_$Create$_0);
        return tmp;
    }
    function IllegalStateException() {
        captureStack(this, IllegalStateException);
    }
    function ConcurrentModificationException_init_$Init$($this) {
        RuntimeException_init_$Init$($this);
        ConcurrentModificationException.call($this);
        return $this;
    }
    function ConcurrentModificationException_init_$Create$() {
        var tmp = ConcurrentModificationException_init_$Init$(objectCreate(protoOf(ConcurrentModificationException)));
        captureStack(tmp, ConcurrentModificationException_init_$Create$);
        return tmp;
    }
    function ConcurrentModificationException_init_$Init$_0(message, $this) {
        RuntimeException_init_$Init$_0(message, $this);
        ConcurrentModificationException.call($this);
        return $this;
    }
    function ConcurrentModificationException_init_$Create$_0(message) {
        var tmp = ConcurrentModificationException_init_$Init$_0(message, objectCreate(protoOf(ConcurrentModificationException)));
        captureStack(tmp, ConcurrentModificationException_init_$Create$_0);
        return tmp;
    }
    function ConcurrentModificationException() {
        captureStack(this, ConcurrentModificationException);
    }
    function ArithmeticException_init_$Init$($this) {
        RuntimeException_init_$Init$($this);
        ArithmeticException.call($this);
        return $this;
    }
    function ArithmeticException_init_$Create$() {
        var tmp = ArithmeticException_init_$Init$(objectCreate(protoOf(ArithmeticException)));
        captureStack(tmp, ArithmeticException_init_$Create$);
        return tmp;
    }
    function ArithmeticException_init_$Init$_0(message, $this) {
        RuntimeException_init_$Init$_0(message, $this);
        ArithmeticException.call($this);
        return $this;
    }
    function ArithmeticException_init_$Create$_0(message) {
        var tmp = ArithmeticException_init_$Init$_0(message, objectCreate(protoOf(ArithmeticException)));
        captureStack(tmp, ArithmeticException_init_$Create$_0);
        return tmp;
    }
    function ArithmeticException() {
        captureStack(this, ArithmeticException);
    }
    function AssertionError_init_$Init$($this) {
        Error_init_$Init$($this);
        AssertionError.call($this);
        return $this;
    }
    function AssertionError_init_$Create$() {
        var tmp = AssertionError_init_$Init$(objectCreate(protoOf(AssertionError)));
        captureStack(tmp, AssertionError_init_$Create$);
        return tmp;
    }
    function AssertionError_init_$Init$_0(message, $this) {
        var tmp = message == null ? null : toString_1(message);
        Error_init_$Init$_1(tmp, message instanceof Error ? message : null, $this);
        AssertionError.call($this);
        return $this;
    }
    function AssertionError_init_$Create$_0(message) {
        var tmp = AssertionError_init_$Init$_0(message, objectCreate(protoOf(AssertionError)));
        captureStack(tmp, AssertionError_init_$Create$_0);
        return tmp;
    }
    function AssertionError() {
        captureStack(this, AssertionError);
    }
    function Error_init_$Init$($this) {
        extendThrowable($this);
        Error_0.call($this);
        return $this;
    }
    function Error_init_$Create$() {
        var tmp = Error_init_$Init$(objectCreate(protoOf(Error_0)));
        captureStack(tmp, Error_init_$Create$);
        return tmp;
    }
    function Error_init_$Init$_0(message, $this) {
        extendThrowable($this, message);
        Error_0.call($this);
        return $this;
    }
    function Error_init_$Init$_1(message, cause, $this) {
        extendThrowable($this, message, cause);
        Error_0.call($this);
        return $this;
    }
    function Error_0() {
        captureStack(this, Error_0);
    }
    function NumberFormatException_init_$Init$($this) {
        IllegalArgumentException_init_$Init$($this);
        NumberFormatException.call($this);
        return $this;
    }
    function NumberFormatException_init_$Create$() {
        var tmp = NumberFormatException_init_$Init$(objectCreate(protoOf(NumberFormatException)));
        captureStack(tmp, NumberFormatException_init_$Create$);
        return tmp;
    }
    function NumberFormatException_init_$Init$_0(message, $this) {
        IllegalArgumentException_init_$Init$_0(message, $this);
        NumberFormatException.call($this);
        return $this;
    }
    function NumberFormatException_init_$Create$_0(message) {
        var tmp = NumberFormatException_init_$Init$_0(message, objectCreate(protoOf(NumberFormatException)));
        captureStack(tmp, NumberFormatException_init_$Create$_0);
        return tmp;
    }
    function NumberFormatException() {
        captureStack(this, NumberFormatException);
    }
    function NoWhenBranchMatchedException_init_$Init$($this) {
        RuntimeException_init_$Init$($this);
        NoWhenBranchMatchedException.call($this);
        return $this;
    }
    function NoWhenBranchMatchedException_init_$Create$() {
        var tmp = NoWhenBranchMatchedException_init_$Init$(objectCreate(protoOf(NoWhenBranchMatchedException)));
        captureStack(tmp, NoWhenBranchMatchedException_init_$Create$);
        return tmp;
    }
    function NoWhenBranchMatchedException() {
        captureStack(this, NoWhenBranchMatchedException);
    }
    function NullPointerException_init_$Init$($this) {
        RuntimeException_init_$Init$($this);
        NullPointerException.call($this);
        return $this;
    }
    function NullPointerException_init_$Create$() {
        var tmp = NullPointerException_init_$Init$(objectCreate(protoOf(NullPointerException)));
        captureStack(tmp, NullPointerException_init_$Create$);
        return tmp;
    }
    function NullPointerException() {
        captureStack(this, NullPointerException);
    }
    function ClassCastException_init_$Init$($this) {
        RuntimeException_init_$Init$($this);
        ClassCastException.call($this);
        return $this;
    }
    function ClassCastException_init_$Create$() {
        var tmp = ClassCastException_init_$Init$(objectCreate(protoOf(ClassCastException)));
        captureStack(tmp, ClassCastException_init_$Create$);
        return tmp;
    }
    function ClassCastException() {
        captureStack(this, ClassCastException);
    }
    function fillFrom(src, dst) {
        var srcLen = src.length;
        var dstLen = dst.length;
        var index = 0;
        var arr = dst;
        while (index < srcLen && index < dstLen) {
            var tmp = index;
            var _unary__edvuaz = index;
            index = _unary__edvuaz + 1 | 0;
            arr[tmp] = src[_unary__edvuaz];
        }
        return dst;
    }
    function arrayCopyResize(source, newSize, defaultValue) {
        var result = source.slice(0, newSize);
        if (source.$type$ !== undefined) {
            result.$type$ = source.$type$;
        }
        var index = source.length;
        if (newSize > index) {
            result.length = newSize;
            while (index < newSize) {
                var _unary__edvuaz = index;
                index = _unary__edvuaz + 1 | 0;
                result[_unary__edvuaz] = defaultValue;
            }
        }
        return result;
    }
    function lazy(mode, initializer) {
        return new UnsafeLazyImpl(initializer);
    }
    function lazy_0(initializer) {
        return new UnsafeLazyImpl(initializer);
    }
    function roundToInt(_this__u8e3s4) {
        var tmp;
        if (isNaN_0(_this__u8e3s4)) {
            throw IllegalArgumentException_init_$Create$_0('Cannot round NaN value.');
        } else if (_this__u8e3s4 > 2147483647) {
            tmp = 2147483647;
        } else if (_this__u8e3s4 < -2147483648) {
            tmp = -2147483648;
        } else {
            tmp = numberToInt(Math.round(_this__u8e3s4));
        }
        return tmp;
    }
    function round(x) {
        if (!(x % .5 === 0)) {
            return Math.round(x);
        }
        var floor = Math.floor(x);
        var tmp;
        if (floor % 2 === 0) {
            tmp = floor;
        } else {
            tmp = Math.ceil(x);
        }
        return tmp;
    }
    function abs_0(n) {
        return n < 0 ? -n | 0 : n;
    }
    function get_sign(_this__u8e3s4) {
        return convertToInt(bitwiseOr(shiftRight(_this__u8e3s4, 63), shiftRightUnsigned(negate(_this__u8e3s4), 63)));
    }
    function abs_1(n) {
        return compare(n, new Long(0, 0)) < 0 ? negate(n) : n;
    }
    function roundToLong(_this__u8e3s4) {
        var tmp;
        if (isNaN_0(_this__u8e3s4)) {
            throw IllegalArgumentException_init_$Create$_0('Cannot round NaN value.');
        } else if (_this__u8e3s4 > toNumber(new Long(-1, 2147483647))) {
            tmp = new Long(-1, 2147483647);
        } else if (_this__u8e3s4 < toNumber(new Long(0, -2147483648))) {
            tmp = new Long(0, -2147483648);
        } else {
            tmp = numberToLong(Math.round(_this__u8e3s4));
        }
        return tmp;
    }
    function nextDown(_this__u8e3s4) {
        var tmp;
        if (isNaN_0(_this__u8e3s4) || _this__u8e3s4 === -Infinity) {
            tmp = _this__u8e3s4;
        } else if (_this__u8e3s4 === 0) {
            tmp = -5e-324;
        } else {
            var tmp0 = toRawBits(_this__u8e3s4);
            var other = _this__u8e3s4 > 0 ? -1 : 1;
            var bits = add(tmp0, fromInt(other));
            tmp = doubleFromBits(bits);
        }
        return tmp;
    }
    function get_INV_2_26() {
        _init_properties_PlatformRandom_kt__6kjv62();
        return INV_2_26;
    }
    var INV_2_26;
    function get_INV_2_53() {
        _init_properties_PlatformRandom_kt__6kjv62();
        return INV_2_53;
    }
    var INV_2_53;
    function doubleFromParts(hi26, low27) {
        _init_properties_PlatformRandom_kt__6kjv62();
        return hi26 * get_INV_2_26() + low27 * get_INV_2_53();
    }
    function defaultPlatformRandom() {
        _init_properties_PlatformRandom_kt__6kjv62();
        var tmp$ret$0 = Math.random() * Math.pow(2, 32) | 0;
        return Random_0(tmp$ret$0);
    }
    var properties_initialized_PlatformRandom_kt_uibhw8;
    function _init_properties_PlatformRandom_kt__6kjv62() {
        if (!properties_initialized_PlatformRandom_kt_uibhw8) {
            properties_initialized_PlatformRandom_kt_uibhw8 = true;
            INV_2_26 = Math.pow(2, -26);
            INV_2_53 = Math.pow(2, -53);
        }
    }
    function KClass() {}
    function PrimitiveKClassImpl(jClass, simpleName, isInstanceFunction) {
        KClassImpl.call(this);
        this.w8_1 = jClass;
        this.x8_1 = simpleName;
        this.y8_1 = isInstanceFunction;
    }
    protoOf(PrimitiveKClassImpl).z8 = function() {
        return this.w8_1;
    };
    protoOf(PrimitiveKClassImpl).v8 = function() {
        return this.x8_1;
    };
    function KClassImpl() {}
    protoOf(KClassImpl).equals = function(other) {
        var tmp;
        if (other instanceof NothingKClassImpl) {
            tmp = false;
        } else {
            if (other instanceof KClassImpl) {
                tmp = equals(this.z8(), other.z8()) && this.v8() == other.v8();
            } else {
                tmp = false;
            }
        }
        return tmp;
    };
    protoOf(KClassImpl).hashCode = function() {
        var tmp0_safe_receiver = this.v8();
        var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : getStringHashCode(tmp0_safe_receiver);
        return tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
    };
    protoOf(KClassImpl).toString = function() {
        return 'class ' + this.v8();
    };
    function NothingKClassImpl() {
        NothingKClassImpl_instance = this;
        KClassImpl.call(this);
        this.a9_1 = 'Nothing';
    }
    protoOf(NothingKClassImpl).v8 = function() {
        return this.a9_1;
    };
    protoOf(NothingKClassImpl).z8 = function() {
        throw UnsupportedOperationException_init_$Create$_0("There's no native JS class for Nothing type");
    };
    protoOf(NothingKClassImpl).equals = function(other) {
        return other === this;
    };
    protoOf(NothingKClassImpl).hashCode = function() {
        return 0;
    };
    var NothingKClassImpl_instance;
    function NothingKClassImpl_getInstance() {
        if (NothingKClassImpl_instance == null) new NothingKClassImpl;
        return NothingKClassImpl_instance;
    }
    function SimpleKClassImpl(jClass) {
        KClassImpl.call(this);
        this.b9_1 = jClass;
        var tmp = this;
        var tmp0_safe_receiver = this.b9_1.$metadata$;
        tmp.c9_1 = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.simpleName;
    }
    protoOf(SimpleKClassImpl).z8 = function() {
        return this.b9_1;
    };
    protoOf(SimpleKClassImpl).v8 = function() {
        return this.c9_1;
    };
    function KProperty1() {}
    function get_functionClasses() {
        _init_properties_primitives_kt__3fums4();
        return functionClasses;
    }
    var functionClasses;
    function PrimitiveClasses$anyClass$lambda(it) {
        return !(it == null);
    }
    function PrimitiveClasses$numberClass$lambda(it) {
        return isNumber(it);
    }
    function PrimitiveClasses$booleanClass$lambda(it) {
        return !(it == null) ? typeof it === 'boolean' : false;
    }
    function PrimitiveClasses$byteClass$lambda(it) {
        return !(it == null) ? typeof it === 'number' : false;
    }
    function PrimitiveClasses$shortClass$lambda(it) {
        return !(it == null) ? typeof it === 'number' : false;
    }
    function PrimitiveClasses$intClass$lambda(it) {
        return !(it == null) ? typeof it === 'number' : false;
    }
    function PrimitiveClasses$longClass$lambda(it) {
        return it instanceof Long;
    }
    function PrimitiveClasses$floatClass$lambda(it) {
        return !(it == null) ? typeof it === 'number' : false;
    }
    function PrimitiveClasses$doubleClass$lambda(it) {
        return !(it == null) ? typeof it === 'number' : false;
    }
    function PrimitiveClasses$arrayClass$lambda(it) {
        return !(it == null) ? isArray(it) : false;
    }
    function PrimitiveClasses$stringClass$lambda(it) {
        return !(it == null) ? typeof it === 'string' : false;
    }
    function PrimitiveClasses$throwableClass$lambda(it) {
        return it instanceof Error;
    }
    function PrimitiveClasses$booleanArrayClass$lambda(it) {
        return !(it == null) ? isBooleanArray(it) : false;
    }
    function PrimitiveClasses$charArrayClass$lambda(it) {
        return !(it == null) ? isCharArray(it) : false;
    }
    function PrimitiveClasses$byteArrayClass$lambda(it) {
        return !(it == null) ? isByteArray(it) : false;
    }
    function PrimitiveClasses$shortArrayClass$lambda(it) {
        return !(it == null) ? isShortArray(it) : false;
    }
    function PrimitiveClasses$intArrayClass$lambda(it) {
        return !(it == null) ? isIntArray(it) : false;
    }
    function PrimitiveClasses$bigintClass$lambda(it) {
        return typeof it === 'bigint';
    }
    function PrimitiveClasses$longArrayClass$lambda(it) {
        return !(it == null) ? isLongArray(it) : false;
    }
    function PrimitiveClasses$floatArrayClass$lambda(it) {
        return !(it == null) ? isFloatArray(it) : false;
    }
    function PrimitiveClasses$doubleArrayClass$lambda(it) {
        return !(it == null) ? isDoubleArray(it) : false;
    }
    function PrimitiveClasses$functionClass$lambda($arity) {
        return function(it) {
            var tmp;
            if (typeof it === 'function') {
                tmp = it.length === $arity;
            } else {
                tmp = false;
            }
            return tmp;
        };
    }
    function PrimitiveClasses() {
        PrimitiveClasses_instance = this;
        var tmp = this;
        var tmp_0 = Object;
        tmp.anyClass = new PrimitiveKClassImpl(tmp_0, 'Any', PrimitiveClasses$anyClass$lambda);
        var tmp_1 = this;
        var tmp_2 = Number;
        tmp_1.numberClass = new PrimitiveKClassImpl(tmp_2, 'Number', PrimitiveClasses$numberClass$lambda);
        this.nothingClass = NothingKClassImpl_getInstance();
        var tmp_3 = this;
        var tmp_4 = Boolean;
        tmp_3.booleanClass = new PrimitiveKClassImpl(tmp_4, 'Boolean', PrimitiveClasses$booleanClass$lambda);
        var tmp_5 = this;
        var tmp_6 = Number;
        tmp_5.byteClass = new PrimitiveKClassImpl(tmp_6, 'Byte', PrimitiveClasses$byteClass$lambda);
        var tmp_7 = this;
        var tmp_8 = Number;
        tmp_7.shortClass = new PrimitiveKClassImpl(tmp_8, 'Short', PrimitiveClasses$shortClass$lambda);
        var tmp_9 = this;
        var tmp_10 = Number;
        tmp_9.intClass = new PrimitiveKClassImpl(tmp_10, 'Int', PrimitiveClasses$intClass$lambda);
        var tmp_11 = this;
        var tmp_12 = Long;
        tmp_11.longClass = new PrimitiveKClassImpl(tmp_12, 'Long', PrimitiveClasses$longClass$lambda);
        var tmp_13 = this;
        var tmp_14 = Number;
        tmp_13.floatClass = new PrimitiveKClassImpl(tmp_14, 'Float', PrimitiveClasses$floatClass$lambda);
        var tmp_15 = this;
        var tmp_16 = Number;
        tmp_15.doubleClass = new PrimitiveKClassImpl(tmp_16, 'Double', PrimitiveClasses$doubleClass$lambda);
        var tmp_17 = this;
        var tmp_18 = Array;
        tmp_17.arrayClass = new PrimitiveKClassImpl(tmp_18, 'Array', PrimitiveClasses$arrayClass$lambda);
        var tmp_19 = this;
        var tmp_20 = String;
        tmp_19.stringClass = new PrimitiveKClassImpl(tmp_20, 'String', PrimitiveClasses$stringClass$lambda);
        var tmp_21 = this;
        var tmp_22 = Error;
        tmp_21.throwableClass = new PrimitiveKClassImpl(tmp_22, 'Throwable', PrimitiveClasses$throwableClass$lambda);
        var tmp_23 = this;
        var tmp_24 = Array;
        tmp_23.booleanArrayClass = new PrimitiveKClassImpl(tmp_24, 'BooleanArray', PrimitiveClasses$booleanArrayClass$lambda);
        var tmp_25 = this;
        var tmp_26 = Uint16Array;
        tmp_25.charArrayClass = new PrimitiveKClassImpl(tmp_26, 'CharArray', PrimitiveClasses$charArrayClass$lambda);
        var tmp_27 = this;
        var tmp_28 = Int8Array;
        tmp_27.byteArrayClass = new PrimitiveKClassImpl(tmp_28, 'ByteArray', PrimitiveClasses$byteArrayClass$lambda);
        var tmp_29 = this;
        var tmp_30 = Int16Array;
        tmp_29.shortArrayClass = new PrimitiveKClassImpl(tmp_30, 'ShortArray', PrimitiveClasses$shortArrayClass$lambda);
        var tmp_31 = this;
        var tmp_32 = Int32Array;
        tmp_31.intArrayClass = new PrimitiveKClassImpl(tmp_32, 'IntArray', PrimitiveClasses$intArrayClass$lambda);
        var tmp_33 = this;
        var tmp_34 = typeof BigInt === 'undefined' ? VOID : BigInt;
        tmp_33.bigIntClass = new PrimitiveKClassImpl(tmp_34, 'BigInt', PrimitiveClasses$bigintClass$lambda);
        var tmp_35 = this;
        var tmp_36 = Array;
        tmp_35.longArrayClass = new PrimitiveKClassImpl(tmp_36, 'LongArray', PrimitiveClasses$longArrayClass$lambda);
        var tmp_37 = this;
        var tmp_38 = Float32Array;
        tmp_37.floatArrayClass = new PrimitiveKClassImpl(tmp_38, 'FloatArray', PrimitiveClasses$floatArrayClass$lambda);
        var tmp_39 = this;
        var tmp_40 = Float64Array;
        tmp_39.doubleArrayClass = new PrimitiveKClassImpl(tmp_40, 'DoubleArray', PrimitiveClasses$doubleArrayClass$lambda);
    }
    protoOf(PrimitiveClasses).d9 = function() {
        return this.anyClass;
    };
    protoOf(PrimitiveClasses).e9 = function() {
        return this.numberClass;
    };
    protoOf(PrimitiveClasses).f9 = function() {
        return this.nothingClass;
    };
    protoOf(PrimitiveClasses).g9 = function() {
        return this.booleanClass;
    };
    protoOf(PrimitiveClasses).h9 = function() {
        return this.byteClass;
    };
    protoOf(PrimitiveClasses).i9 = function() {
        return this.shortClass;
    };
    protoOf(PrimitiveClasses).j9 = function() {
        return this.intClass;
    };
    protoOf(PrimitiveClasses).k9 = function() {
        return this.longClass;
    };
    protoOf(PrimitiveClasses).l9 = function() {
        return this.floatClass;
    };
    protoOf(PrimitiveClasses).m9 = function() {
        return this.doubleClass;
    };
    protoOf(PrimitiveClasses).n9 = function() {
        return this.arrayClass;
    };
    protoOf(PrimitiveClasses).o9 = function() {
        return this.stringClass;
    };
    protoOf(PrimitiveClasses).p9 = function() {
        return this.throwableClass;
    };
    protoOf(PrimitiveClasses).q9 = function() {
        return this.booleanArrayClass;
    };
    protoOf(PrimitiveClasses).r9 = function() {
        return this.charArrayClass;
    };
    protoOf(PrimitiveClasses).s9 = function() {
        return this.byteArrayClass;
    };
    protoOf(PrimitiveClasses).t9 = function() {
        return this.shortArrayClass;
    };
    protoOf(PrimitiveClasses).u9 = function() {
        return this.intArrayClass;
    };
    protoOf(PrimitiveClasses).v9 = function() {
        return this.bigIntClass;
    };
    protoOf(PrimitiveClasses).w9 = function() {
        return this.longArrayClass;
    };
    protoOf(PrimitiveClasses).x9 = function() {
        return this.floatArrayClass;
    };
    protoOf(PrimitiveClasses).y9 = function() {
        return this.doubleArrayClass;
    };
    protoOf(PrimitiveClasses).functionClass = function(arity) {
        var tmp0_elvis_lhs = get_functionClasses()[arity];
        var tmp;
        if (tmp0_elvis_lhs == null) {
            var tmp_0 = Function;
            var tmp_1 = 'Function' + arity;
            var result = new PrimitiveKClassImpl(tmp_0, tmp_1, PrimitiveClasses$functionClass$lambda(arity));
            get_functionClasses()[arity] = result;
            tmp = result;
        } else {
            tmp = tmp0_elvis_lhs;
        }
        return tmp;
    };
    var PrimitiveClasses_instance;
    function PrimitiveClasses_getInstance() {
        if (PrimitiveClasses_instance == null) new PrimitiveClasses;
        return PrimitiveClasses_instance;
    }
    var properties_initialized_primitives_kt_jle18u;
    function _init_properties_primitives_kt__3fums4() {
        if (!properties_initialized_primitives_kt_jle18u) {
            properties_initialized_primitives_kt_jle18u = true;
            functionClasses = Array(0);
        }
    }
    function getKClass(jClass) {
        if (jClass === String) {
            return PrimitiveClasses_getInstance().stringClass;
        }
        var metadata = jClass.$metadata$;
        var tmp;
        if (metadata != null) {
            var tmp_0;
            if (metadata.$kClass$ == null) {
                var kClass = new SimpleKClassImpl(jClass);
                metadata.$kClass$ = kClass;
                tmp_0 = kClass;
            } else {
                tmp_0 = metadata.$kClass$;
            }
            tmp = tmp_0;
        } else {
            tmp = new SimpleKClassImpl(jClass);
        }
        return tmp;
    }
    function getKClassFromExpression(e) {
        var tmp;
        switch (typeof e) {
          case 'string':
            tmp = PrimitiveClasses_getInstance().stringClass;
            break;

          case 'number':
            var tmp_0;
            if ((e | 0) === e) {
                tmp_0 = PrimitiveClasses_getInstance().intClass;
            } else {
                tmp_0 = PrimitiveClasses_getInstance().doubleClass;
            }
            tmp = tmp_0;
            break;

          case 'bigint':
            tmp = false && BigInt.asIntN(64, e) === e ? PrimitiveClasses_getInstance().longClass : PrimitiveClasses_getInstance().bigIntClass;
            break;

          case 'boolean':
            tmp = PrimitiveClasses_getInstance().booleanClass;
            break;

          case 'function':
            var tmp_1 = PrimitiveClasses_getInstance();
            tmp = tmp_1.functionClass(e.length);
            break;

          default:
            var tmp_2;
            if (isBooleanArray(e)) {
                tmp_2 = PrimitiveClasses_getInstance().booleanArrayClass;
            } else {
                if (isCharArray(e)) {
                    tmp_2 = PrimitiveClasses_getInstance().charArrayClass;
                } else {
                    if (isByteArray(e)) {
                        tmp_2 = PrimitiveClasses_getInstance().byteArrayClass;
                    } else {
                        if (isShortArray(e)) {
                            tmp_2 = PrimitiveClasses_getInstance().shortArrayClass;
                        } else {
                            if (isIntArray(e)) {
                                tmp_2 = PrimitiveClasses_getInstance().intArrayClass;
                            } else {
                                if (isLongArray(e)) {
                                    tmp_2 = PrimitiveClasses_getInstance().w9();
                                } else {
                                    if (isFloatArray(e)) {
                                        tmp_2 = PrimitiveClasses_getInstance().floatArrayClass;
                                    } else {
                                        if (isDoubleArray(e)) {
                                            tmp_2 = PrimitiveClasses_getInstance().doubleArrayClass;
                                        } else {
                                            if (isInterface(e, KClass)) {
                                                tmp_2 = getKClass(KClass);
                                            } else {
                                                if (isArray(e)) {
                                                    tmp_2 = PrimitiveClasses_getInstance().arrayClass;
                                                } else {
                                                    var constructor = Object.getPrototypeOf(e).constructor;
                                                    var tmp_3;
                                                    if (constructor === Object) {
                                                        tmp_3 = PrimitiveClasses_getInstance().anyClass;
                                                    } else if (constructor === Error) {
                                                        tmp_3 = PrimitiveClasses_getInstance().throwableClass;
                                                    } else {
                                                        var jsClass = constructor;
                                                        tmp_3 = getKClass(jsClass);
                                                    }
                                                    tmp_2 = tmp_3;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            tmp = tmp_2;
            break;
        }
        return tmp;
    }
    function CharacterCodingException_init_$Init$($this) {
        CharacterCodingException.call($this, null);
        return $this;
    }
    function CharacterCodingException_init_$Create$() {
        var tmp = CharacterCodingException_init_$Init$(objectCreate(protoOf(CharacterCodingException)));
        captureStack(tmp, CharacterCodingException_init_$Create$);
        return tmp;
    }
    function CharacterCodingException(message) {
        Exception_init_$Init$_0(message, this);
        captureStack(this, CharacterCodingException);
    }
    function StringBuilder_init_$Init$(capacity, $this) {
        StringBuilder_init_$Init$_0($this);
        return $this;
    }
    function StringBuilder_init_$Create$(capacity) {
        return StringBuilder_init_$Init$(capacity, objectCreate(protoOf(StringBuilder)));
    }
    function StringBuilder_init_$Init$_0($this) {
        StringBuilder.call($this, '');
        return $this;
    }
    function StringBuilder_init_$Create$_0() {
        return StringBuilder_init_$Init$_0(objectCreate(protoOf(StringBuilder)));
    }
    function StringBuilder(content) {
        this.w6_1 = content;
    }
    protoOf(StringBuilder).a = function() {
        return this.w6_1.length;
    };
    protoOf(StringBuilder).b = function(index) {
        var this_0 = this.w6_1;
        var tmp;
        if (0 <= index ? index <= (charSequenceLength(this_0) - 1 | 0) : false) {
            tmp = charSequenceGet(this_0, index);
        } else {
            throw IndexOutOfBoundsException_init_$Create$_0('index: ' + index + ', length: ' + this.a() + '}');
        }
        return tmp;
    };
    protoOf(StringBuilder).c = function(startIndex, endIndex) {
        return substring(this.w6_1, startIndex, endIndex);
    };
    protoOf(StringBuilder).z6 = function(value) {
        this.w6_1 = this.w6_1 + toString(value);
        return this;
    };
    protoOf(StringBuilder).e = function(value) {
        this.w6_1 = this.w6_1 + toString_0(value);
        return this;
    };
    protoOf(StringBuilder).z9 = function(value, startIndex, endIndex) {
        return this.aa(value == null ? 'null' : value, startIndex, endIndex);
    };
    protoOf(StringBuilder).x6 = function(value) {
        this.w6_1 = this.w6_1 + toString_0(value);
        return this;
    };
    protoOf(StringBuilder).ba = function(value) {
        return this.y6(value.toString());
    };
    protoOf(StringBuilder).ca = function(value) {
        return this.y6(value.toString());
    };
    protoOf(StringBuilder).y6 = function(value) {
        var tmp = this;
        var tmp_0 = this.w6_1;
        tmp.w6_1 = tmp_0 + (value == null ? 'null' : value);
        return this;
    };
    protoOf(StringBuilder).da = function(index, value) {
        Companion_instance_4.j3(index, this.a());
        this.w6_1 = substring(this.w6_1, 0, index) + toString(value) + substring_0(this.w6_1, index);
        return this;
    };
    protoOf(StringBuilder).ea = function(newLength) {
        if (newLength < 0) {
            throw IllegalArgumentException_init_$Create$_0('Negative new length: ' + newLength + '.');
        }
        if (newLength <= this.a()) {
            this.w6_1 = substring(this.w6_1, 0, newLength);
        } else {
            var inductionVariable = this.a();
            if (inductionVariable < newLength) do {
                var i = inductionVariable;
                inductionVariable = inductionVariable + 1 | 0;
                this.w6_1 = this.w6_1 + toString(_Char___init__impl__6a9atx(0));
            } while (inductionVariable < newLength);
        }
    };
    protoOf(StringBuilder).toString = function() {
        return this.w6_1;
    };
    protoOf(StringBuilder).fa = function(index) {
        Companion_instance_4.b4(index, this.a());
        this.w6_1 = substring(this.w6_1, 0, index) + substring_0(this.w6_1, index + 1 | 0);
        return this;
    };
    protoOf(StringBuilder).aa = function(value, startIndex, endIndex) {
        var stringCsq = toString_1(value);
        Companion_instance_4.ga(startIndex, endIndex, stringCsq.length);
        this.w6_1 = this.w6_1 + substring(stringCsq, startIndex, endIndex);
        return this;
    };
    function uppercaseChar(_this__u8e3s4) {
        var uppercase = toString(_this__u8e3s4).toUpperCase();
        return uppercase.length > 1 ? _this__u8e3s4 : charCodeAt(uppercase, 0);
    }
    function isWhitespace(_this__u8e3s4) {
        return isWhitespaceImpl(_this__u8e3s4);
    }
    function toString_2(_this__u8e3s4, radix) {
        return toStringImpl(_this__u8e3s4, checkRadix(radix));
    }
    function checkRadix(radix) {
        if (!(2 <= radix ? radix <= 36 : false)) {
            throw IllegalArgumentException_init_$Create$_0('radix ' + radix + ' was not in valid range 2..36');
        }
        return radix;
    }
    function toDouble(_this__u8e3s4) {
        var this_0 = +_this__u8e3s4;
        if (isNaN_0(this_0) && !isNaN_2(_this__u8e3s4) || this_0 === 0 && isBlank(_this__u8e3s4)) {
            numberFormatError(_this__u8e3s4);
        }
        return this_0;
    }
    function digitOf(char, radix) {
        var it = Char__compareTo_impl_ypi4mb(char, _Char___init__impl__6a9atx(48)) >= 0 && Char__compareTo_impl_ypi4mb(char, _Char___init__impl__6a9atx(57)) <= 0 ? Char__minus_impl_a2frrh(char, _Char___init__impl__6a9atx(48)) : Char__compareTo_impl_ypi4mb(char, _Char___init__impl__6a9atx(65)) >= 0 && Char__compareTo_impl_ypi4mb(char, _Char___init__impl__6a9atx(90)) <= 0 ? Char__minus_impl_a2frrh(char, _Char___init__impl__6a9atx(65)) + 10 | 0 : Char__compareTo_impl_ypi4mb(char, _Char___init__impl__6a9atx(97)) >= 0 && Char__compareTo_impl_ypi4mb(char, _Char___init__impl__6a9atx(122)) <= 0 ? Char__minus_impl_a2frrh(char, _Char___init__impl__6a9atx(97)) + 10 | 0 : Char__compareTo_impl_ypi4mb(char, _Char___init__impl__6a9atx(128)) < 0 ? -1 : Char__compareTo_impl_ypi4mb(char, _Char___init__impl__6a9atx(65313)) >= 0 && Char__compareTo_impl_ypi4mb(char, _Char___init__impl__6a9atx(65338)) <= 0 ? Char__minus_impl_a2frrh(char, _Char___init__impl__6a9atx(65313)) + 10 | 0 : Char__compareTo_impl_ypi4mb(char, _Char___init__impl__6a9atx(65345)) >= 0 && Char__compareTo_impl_ypi4mb(char, _Char___init__impl__6a9atx(65370)) <= 0 ? Char__minus_impl_a2frrh(char, _Char___init__impl__6a9atx(65345)) + 10 | 0 : digitToIntImpl(char);
        return it >= radix ? -1 : it;
    }
    function isNaN_2(_this__u8e3s4) {
        switch (_this__u8e3s4.toLowerCase()) {
          case 'nan':
          case '+nan':
          case '-nan':
            return true;

          default:
            return false;
        }
    }
    function toDoubleOrNull(_this__u8e3s4) {
        var this_0 = +_this__u8e3s4;
        var tmp;
        if (!(isNaN_0(this_0) && !isNaN_2(_this__u8e3s4) || this_0 === 0 && isBlank(_this__u8e3s4))) {
            tmp = this_0;
        } else {
            tmp = null;
        }
        return tmp;
    }
    function toInt(_this__u8e3s4) {
        var tmp0_elvis_lhs = toIntOrNull(_this__u8e3s4);
        var tmp;
        if (tmp0_elvis_lhs == null) {
            numberFormatError(_this__u8e3s4);
        } else {
            tmp = tmp0_elvis_lhs;
        }
        return tmp;
    }
    var STRING_CASE_INSENSITIVE_ORDER;
    function substring(_this__u8e3s4, startIndex, endIndex) {
        _init_properties_stringJs_kt__bg7zye();
        return _this__u8e3s4.substring(startIndex, endIndex);
    }
    function substring_0(_this__u8e3s4, startIndex) {
        _init_properties_stringJs_kt__bg7zye();
        return _this__u8e3s4.substring(startIndex);
    }
    function compareTo_0(_this__u8e3s4, other, ignoreCase) {
        ignoreCase = ignoreCase === VOID ? false : ignoreCase;
        _init_properties_stringJs_kt__bg7zye();
        if (ignoreCase) {
            var n1 = _this__u8e3s4.length;
            var n2 = other.length;
            var min = Math.min(n1, n2);
            if (min === 0) return n1 - n2 | 0;
            var inductionVariable = 0;
            if (inductionVariable < min) do {
                var index = inductionVariable;
                inductionVariable = inductionVariable + 1 | 0;
                var thisChar = charCodeAt(_this__u8e3s4, index);
                var otherChar = charCodeAt(other, index);
                if (!(thisChar === otherChar)) {
                    thisChar = uppercaseChar(thisChar);
                    otherChar = uppercaseChar(otherChar);
                    if (!(thisChar === otherChar)) {
                        var this_0 = thisChar;
                        var tmp$ret$2 = toString(this_0).toLowerCase();
                        thisChar = charCodeAt(tmp$ret$2, 0);
                        var this_1 = otherChar;
                        var tmp$ret$6 = toString(this_1).toLowerCase();
                        otherChar = charCodeAt(tmp$ret$6, 0);
                        if (!(thisChar === otherChar)) {
                            return Char__compareTo_impl_ypi4mb(thisChar, otherChar);
                        }
                    }
                }
            } while (inductionVariable < min);
            return n1 - n2 | 0;
        } else {
            return compareTo(_this__u8e3s4, other);
        }
    }
    function concatToString(_this__u8e3s4) {
        _init_properties_stringJs_kt__bg7zye();
        if (_this__u8e3s4.length <= 4096) {
            return String.fromCharCode.apply(null, _this__u8e3s4);
        }
        var result = '';
        var start = 0;
        while (start < _this__u8e3s4.length) {
            var tmp0 = start + 4096 | 0;
            var b = _this__u8e3s4.length;
            var end = Math.min(tmp0, b);
            var chunk = _this__u8e3s4.subarray(start, end);
            result = result + String.fromCharCode.apply(null, chunk);
            start = end;
        }
        return result;
    }
    function decodeToString(_this__u8e3s4) {
        _init_properties_stringJs_kt__bg7zye();
        return decodeUtf8(_this__u8e3s4, 0, _this__u8e3s4.length, false);
    }
    function sam$kotlin_Comparator$0(function_0) {
        this.ha_1 = function_0;
    }
    protoOf(sam$kotlin_Comparator$0).ia = function(a, b) {
        return this.ha_1(a, b);
    };
    protoOf(sam$kotlin_Comparator$0).compare = function(a, b) {
        return this.ia(a, b);
    };
    protoOf(sam$kotlin_Comparator$0).k2 = function() {
        return this.ha_1;
    };
    protoOf(sam$kotlin_Comparator$0).equals = function(other) {
        var tmp;
        if (!(other == null) ? isInterface(other, Comparator) : false) {
            var tmp_0;
            if (!(other == null) ? isInterface(other, FunctionAdapter) : false) {
                tmp_0 = equals(this.k2(), other.k2());
            } else {
                tmp_0 = false;
            }
            tmp = tmp_0;
        } else {
            tmp = false;
        }
        return tmp;
    };
    protoOf(sam$kotlin_Comparator$0).hashCode = function() {
        return hashCode_0(this.k2());
    };
    function STRING_CASE_INSENSITIVE_ORDER$lambda(a, b) {
        _init_properties_stringJs_kt__bg7zye();
        return compareTo_0(a, b, true);
    }
    var properties_initialized_stringJs_kt_nta8o4;
    function _init_properties_stringJs_kt__bg7zye() {
        if (!properties_initialized_stringJs_kt_nta8o4) {
            properties_initialized_stringJs_kt_nta8o4 = true;
            var tmp = STRING_CASE_INSENSITIVE_ORDER$lambda;
            STRING_CASE_INSENSITIVE_ORDER = new sam$kotlin_Comparator$0(tmp);
        }
    }
    function regionMatches(_this__u8e3s4, thisOffset, other, otherOffset, length, ignoreCase) {
        ignoreCase = ignoreCase === VOID ? false : ignoreCase;
        return regionMatchesImpl(_this__u8e3s4, thisOffset, other, otherOffset, length, ignoreCase);
    }
    function equals_0(_this__u8e3s4, other, ignoreCase) {
        ignoreCase = ignoreCase === VOID ? false : ignoreCase;
        if (_this__u8e3s4 == null) return other == null;
        if (other == null) return false;
        if (!ignoreCase) return _this__u8e3s4 == other;
        if (!(_this__u8e3s4.length === other.length)) return false;
        var inductionVariable = 0;
        var last = _this__u8e3s4.length;
        if (inductionVariable < last) do {
            var index = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var thisChar = charCodeAt(_this__u8e3s4, index);
            var otherChar = charCodeAt(other, index);
            if (!equals_1(thisChar, otherChar, ignoreCase)) {
                return false;
            }
        } while (inductionVariable < last);
        return true;
    }
    function startsWith(_this__u8e3s4, prefix, ignoreCase) {
        ignoreCase = ignoreCase === VOID ? false : ignoreCase;
        if (!ignoreCase) {
            return _this__u8e3s4.startsWith(prefix, 0);
        } else return regionMatches(_this__u8e3s4, 0, prefix, 0, prefix.length, ignoreCase);
    }
    var REPLACEMENT_BYTE_SEQUENCE;
    function decodeUtf8(bytes, startIndex, endIndex, throwOnMalformed) {
        _init_properties_utf8Encoding_kt__9thjs4();
        if (!(startIndex >= 0 && endIndex <= bytes.length && startIndex <= endIndex)) {
            var message = 'Failed requirement.';
            throw IllegalArgumentException_init_$Create$_0(toString_1(message));
        }
        var byteIndex = startIndex;
        var stringBuilder = StringBuilder_init_$Create$_0();
        while (byteIndex < endIndex) {
            var _unary__edvuaz = byteIndex;
            byteIndex = _unary__edvuaz + 1 | 0;
            var byte = bytes[_unary__edvuaz];
            if (byte >= 0) stringBuilder.z6(numberToChar(byte)); else if (byte >> 5 === -2) {
                var code = codePointFrom2(bytes, byte, byteIndex, endIndex, throwOnMalformed);
                if (code <= 0) {
                    stringBuilder.z6(_Char___init__impl__6a9atx(65533));
                    byteIndex = byteIndex + (-code | 0) | 0;
                } else {
                    stringBuilder.z6(numberToChar(code));
                    byteIndex = byteIndex + 1 | 0;
                }
            } else if (byte >> 4 === -2) {
                var code_0 = codePointFrom3(bytes, byte, byteIndex, endIndex, throwOnMalformed);
                if (code_0 <= 0) {
                    stringBuilder.z6(_Char___init__impl__6a9atx(65533));
                    byteIndex = byteIndex + (-code_0 | 0) | 0;
                } else {
                    stringBuilder.z6(numberToChar(code_0));
                    byteIndex = byteIndex + 2 | 0;
                }
            } else if (byte >> 3 === -2) {
                var code_1 = codePointFrom4(bytes, byte, byteIndex, endIndex, throwOnMalformed);
                if (code_1 <= 0) {
                    stringBuilder.z6(_Char___init__impl__6a9atx(65533));
                    byteIndex = byteIndex + (-code_1 | 0) | 0;
                } else {
                    var high = (code_1 - 65536 | 0) >> 10 | 55296;
                    var low = code_1 & 1023 | 56320;
                    stringBuilder.z6(numberToChar(high));
                    stringBuilder.z6(numberToChar(low));
                    byteIndex = byteIndex + 3 | 0;
                }
            } else {
                malformed(0, byteIndex, throwOnMalformed);
                stringBuilder.z6(_Char___init__impl__6a9atx(65533));
            }
        }
        return stringBuilder.toString();
    }
    function codePointFrom2(bytes, byte1, index, endIndex, throwOnMalformed) {
        _init_properties_utf8Encoding_kt__9thjs4();
        if ((byte1 & 30) === 0 || index >= endIndex) {
            return malformed(0, index, throwOnMalformed);
        }
        var byte2 = bytes[index];
        if (!((byte2 & 192) === 128)) {
            return malformed(0, index, throwOnMalformed);
        }
        return byte1 << 6 ^ byte2 ^ 3968;
    }
    function codePointFrom3(bytes, byte1, index, endIndex, throwOnMalformed) {
        _init_properties_utf8Encoding_kt__9thjs4();
        if (index >= endIndex) {
            return malformed(0, index, throwOnMalformed);
        }
        var byte2 = bytes[index];
        if ((byte1 & 15) === 0) {
            if (!((byte2 & 224) === 160)) {
                return malformed(0, index, throwOnMalformed);
            }
        } else if ((byte1 & 15) === 13) {
            if (!((byte2 & 224) === 128)) {
                return malformed(0, index, throwOnMalformed);
            }
        } else if (!((byte2 & 192) === 128)) {
            return malformed(0, index, throwOnMalformed);
        }
        if ((index + 1 | 0) === endIndex) {
            return malformed(1, index, throwOnMalformed);
        }
        var byte3 = bytes[index + 1 | 0];
        if (!((byte3 & 192) === 128)) {
            return malformed(1, index, throwOnMalformed);
        }
        return byte1 << 12 ^ byte2 << 6 ^ byte3 ^ -123008;
    }
    function codePointFrom4(bytes, byte1, index, endIndex, throwOnMalformed) {
        _init_properties_utf8Encoding_kt__9thjs4();
        if (index >= endIndex) {
            return malformed(0, index, throwOnMalformed);
        }
        var byte2 = bytes[index];
        if ((byte1 & 15) === 0) {
            if ((byte2 & 240) <= 128) {
                return malformed(0, index, throwOnMalformed);
            }
        } else if ((byte1 & 15) === 4) {
            if (!((byte2 & 240) === 128)) {
                return malformed(0, index, throwOnMalformed);
            }
        } else if ((byte1 & 15) > 4) {
            return malformed(0, index, throwOnMalformed);
        }
        if (!((byte2 & 192) === 128)) {
            return malformed(0, index, throwOnMalformed);
        }
        if ((index + 1 | 0) === endIndex) {
            return malformed(1, index, throwOnMalformed);
        }
        var byte3 = bytes[index + 1 | 0];
        if (!((byte3 & 192) === 128)) {
            return malformed(1, index, throwOnMalformed);
        }
        if ((index + 2 | 0) === endIndex) {
            return malformed(2, index, throwOnMalformed);
        }
        var byte4 = bytes[index + 2 | 0];
        if (!((byte4 & 192) === 128)) {
            return malformed(2, index, throwOnMalformed);
        }
        return byte1 << 18 ^ byte2 << 12 ^ byte3 << 6 ^ byte4 ^ 3678080;
    }
    function malformed(size, index, throwOnMalformed) {
        _init_properties_utf8Encoding_kt__9thjs4();
        if (throwOnMalformed) throw new CharacterCodingException('Malformed sequence starting at ' + (index - 1 | 0));
        return -size | 0;
    }
    var properties_initialized_utf8Encoding_kt_eee1vq;
    function _init_properties_utf8Encoding_kt__9thjs4() {
        if (!properties_initialized_utf8Encoding_kt_eee1vq) {
            properties_initialized_utf8Encoding_kt_eee1vq = true;
            REPLACEMENT_BYTE_SEQUENCE = new Int8Array([ -17, -65, -67 ]);
        }
    }
    var static_init_called;
    function static_init() {
        if (static_init_called) return Unit_instance;
        static_init_called = true;
        DurationUnit_NANOSECONDS_instance = new DurationUnit('NANOSECONDS', 0, 1);
        DurationUnit_MICROSECONDS_instance = new DurationUnit('MICROSECONDS', 1, 1e3);
        DurationUnit_MILLISECONDS_instance = new DurationUnit('MILLISECONDS', 2, 1e6);
        DurationUnit_SECONDS_instance = new DurationUnit('SECONDS', 3, 1e9);
        DurationUnit_MINUTES_instance = new DurationUnit('MINUTES', 4, 6e10);
        DurationUnit_HOURS_instance = new DurationUnit('HOURS', 5, 36e11);
        DurationUnit_DAYS_instance = new DurationUnit('DAYS', 6, 864e11);
    }
    var DurationUnit_NANOSECONDS_instance;
    var DurationUnit_MICROSECONDS_instance;
    var DurationUnit_MILLISECONDS_instance;
    var DurationUnit_SECONDS_instance;
    var DurationUnit_MINUTES_instance;
    var DurationUnit_HOURS_instance;
    var DurationUnit_DAYS_instance;
    function DurationUnit(name, ordinal, scale) {
        Enum.call(this, name, ordinal);
        this.la_1 = scale;
    }
    function convertDurationUnit(value, sourceUnit, targetUnit) {
        var sourceCompareTarget = compareTo(sourceUnit.la_1, targetUnit.la_1);
        var tmp;
        if (sourceCompareTarget > 0) {
            var scale = numberToLong(sourceUnit.la_1 / targetUnit.la_1);
            var result = multiply(value, scale);
            tmp = equalsLong(divide(result, scale), value) ? result : compare(value, new Long(0, 0)) > 0 ? new Long(-1, 2147483647) : new Long(0, -2147483648);
        } else if (sourceCompareTarget < 0) {
            tmp = divide(value, numberToLong(targetUnit.la_1 / sourceUnit.la_1));
        } else {
            tmp = value;
        }
        return tmp;
    }
    function convertDurationUnitOverflow(value, sourceUnit, targetUnit) {
        var sourceCompareTarget = compareTo(sourceUnit.la_1, targetUnit.la_1);
        return sourceCompareTarget > 0 ? multiply(value, numberToLong(sourceUnit.la_1 / targetUnit.la_1)) : sourceCompareTarget < 0 ? divide(value, numberToLong(targetUnit.la_1 / sourceUnit.la_1)) : value;
    }
    function DurationUnit_NANOSECONDS_getInstance() {
        static_init();
        return DurationUnit_NANOSECONDS_instance;
    }
    function DurationUnit_MICROSECONDS_getInstance() {
        static_init();
        return DurationUnit_MICROSECONDS_instance;
    }
    function DurationUnit_MILLISECONDS_getInstance() {
        static_init();
        return DurationUnit_MILLISECONDS_instance;
    }
    function DurationUnit_SECONDS_getInstance() {
        static_init();
        return DurationUnit_SECONDS_instance;
    }
    function DurationUnit_MINUTES_getInstance() {
        static_init();
        return DurationUnit_MINUTES_instance;
    }
    function DurationUnit_HOURS_getInstance() {
        static_init();
        return DurationUnit_HOURS_instance;
    }
    function DurationUnit_DAYS_getInstance() {
        static_init();
        return DurationUnit_DAYS_instance;
    }
    function formatBytesInto(_this__u8e3s4, dst, dstOffset, startIndex, endIndex) {
        var dstIndex = dstOffset;
        if (startIndex < 4) {
            dstIndex = formatBytesInto_0(_this__u8e3s4.i2_1, dst, dstIndex, startIndex, coerceAtMost(endIndex, 4));
        }
        if (endIndex > 4) {
            formatBytesInto_0(_this__u8e3s4.h2_1, dst, dstIndex, coerceAtLeast(startIndex - 4 | 0, 0), endIndex - 4 | 0);
        }
    }
    function uuidParseHexDash(hexDashString) {
        var hexDigitExpectedMessage = 'a hexadecimal digit';
        var result = 0;
        var inductionVariable = 0;
        if (inductionVariable < 8) do {
            var index = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var tmp = result << 4;
            var tmp$ret$2;
            $l$block: {
                var this_0 = charCodeAt(hexDashString, index);
                var code = Char__toInt_impl_vasixd(this_0);
                if ((code >>> 8 | 0) === 0 && access$_get_HEX_DIGITS_TO_DECIMAL_$tHexExtensionsKt_n4nhcp()[code] >= 0) {
                    tmp$ret$2 = access$_get_HEX_DIGITS_TO_DECIMAL_$tHexExtensionsKt_n4nhcp()[code];
                    break $l$block;
                }
                uuidThrowUnexpectedCharacterException(hexDashString, hexDigitExpectedMessage, index);
            }
            result = tmp | tmp$ret$2;
        } while (inductionVariable < 8);
        var part1 = result;
        if (!(charCodeAt(hexDashString, 8) === _Char___init__impl__6a9atx(45))) {
            var errorDescription = "'-' (hyphen)";
            uuidThrowUnexpectedCharacterException(hexDashString, errorDescription, 8);
        }
        var result_0 = 0;
        var inductionVariable_0 = 9;
        if (inductionVariable_0 < 13) do {
            var index_0 = inductionVariable_0;
            inductionVariable_0 = inductionVariable_0 + 1 | 0;
            var tmp_0 = result_0 << 4;
            var tmp$ret$10;
            $l$block_0: {
                var this_1 = charCodeAt(hexDashString, index_0);
                var code_0 = Char__toInt_impl_vasixd(this_1);
                if ((code_0 >>> 8 | 0) === 0 && access$_get_HEX_DIGITS_TO_DECIMAL_$tHexExtensionsKt_n4nhcp()[code_0] >= 0) {
                    tmp$ret$10 = access$_get_HEX_DIGITS_TO_DECIMAL_$tHexExtensionsKt_n4nhcp()[code_0];
                    break $l$block_0;
                }
                uuidThrowUnexpectedCharacterException(hexDashString, hexDigitExpectedMessage, index_0);
            }
            result_0 = tmp_0 | tmp$ret$10;
        } while (inductionVariable_0 < 13);
        var part2 = result_0;
        if (!(charCodeAt(hexDashString, 13) === _Char___init__impl__6a9atx(45))) {
            var errorDescription_0 = "'-' (hyphen)";
            uuidThrowUnexpectedCharacterException(hexDashString, errorDescription_0, 13);
        }
        var result_1 = 0;
        var inductionVariable_1 = 14;
        if (inductionVariable_1 < 18) do {
            var index_1 = inductionVariable_1;
            inductionVariable_1 = inductionVariable_1 + 1 | 0;
            var tmp_1 = result_1 << 4;
            var tmp$ret$18;
            $l$block_1: {
                var this_2 = charCodeAt(hexDashString, index_1);
                var code_1 = Char__toInt_impl_vasixd(this_2);
                if ((code_1 >>> 8 | 0) === 0 && access$_get_HEX_DIGITS_TO_DECIMAL_$tHexExtensionsKt_n4nhcp()[code_1] >= 0) {
                    tmp$ret$18 = access$_get_HEX_DIGITS_TO_DECIMAL_$tHexExtensionsKt_n4nhcp()[code_1];
                    break $l$block_1;
                }
                uuidThrowUnexpectedCharacterException(hexDashString, hexDigitExpectedMessage, index_1);
            }
            result_1 = tmp_1 | tmp$ret$18;
        } while (inductionVariable_1 < 18);
        var part3 = result_1;
        if (!(charCodeAt(hexDashString, 18) === _Char___init__impl__6a9atx(45))) {
            var errorDescription_1 = "'-' (hyphen)";
            uuidThrowUnexpectedCharacterException(hexDashString, errorDescription_1, 18);
        }
        var result_2 = 0;
        var inductionVariable_2 = 19;
        if (inductionVariable_2 < 23) do {
            var index_2 = inductionVariable_2;
            inductionVariable_2 = inductionVariable_2 + 1 | 0;
            var tmp_2 = result_2 << 4;
            var tmp$ret$26;
            $l$block_2: {
                var this_3 = charCodeAt(hexDashString, index_2);
                var code_2 = Char__toInt_impl_vasixd(this_3);
                if ((code_2 >>> 8 | 0) === 0 && access$_get_HEX_DIGITS_TO_DECIMAL_$tHexExtensionsKt_n4nhcp()[code_2] >= 0) {
                    tmp$ret$26 = access$_get_HEX_DIGITS_TO_DECIMAL_$tHexExtensionsKt_n4nhcp()[code_2];
                    break $l$block_2;
                }
                uuidThrowUnexpectedCharacterException(hexDashString, hexDigitExpectedMessage, index_2);
            }
            result_2 = tmp_2 | tmp$ret$26;
        } while (inductionVariable_2 < 23);
        var part4 = result_2;
        if (!(charCodeAt(hexDashString, 23) === _Char___init__impl__6a9atx(45))) {
            var errorDescription_2 = "'-' (hyphen)";
            uuidThrowUnexpectedCharacterException(hexDashString, errorDescription_2, 23);
        }
        var result_3 = 0;
        var inductionVariable_3 = 24;
        if (inductionVariable_3 < 28) do {
            var index_3 = inductionVariable_3;
            inductionVariable_3 = inductionVariable_3 + 1 | 0;
            var tmp_3 = result_3 << 4;
            var tmp$ret$34;
            $l$block_3: {
                var this_4 = charCodeAt(hexDashString, index_3);
                var code_3 = Char__toInt_impl_vasixd(this_4);
                if ((code_3 >>> 8 | 0) === 0 && access$_get_HEX_DIGITS_TO_DECIMAL_$tHexExtensionsKt_n4nhcp()[code_3] >= 0) {
                    tmp$ret$34 = access$_get_HEX_DIGITS_TO_DECIMAL_$tHexExtensionsKt_n4nhcp()[code_3];
                    break $l$block_3;
                }
                uuidThrowUnexpectedCharacterException(hexDashString, hexDigitExpectedMessage, index_3);
            }
            result_3 = tmp_3 | tmp$ret$34;
        } while (inductionVariable_3 < 28);
        var part5a = result_3;
        var result_4 = 0;
        var inductionVariable_4 = 28;
        if (inductionVariable_4 < 36) do {
            var index_4 = inductionVariable_4;
            inductionVariable_4 = inductionVariable_4 + 1 | 0;
            var tmp_4 = result_4 << 4;
            var tmp$ret$40;
            $l$block_4: {
                var this_5 = charCodeAt(hexDashString, index_4);
                var code_4 = Char__toInt_impl_vasixd(this_5);
                if ((code_4 >>> 8 | 0) === 0 && access$_get_HEX_DIGITS_TO_DECIMAL_$tHexExtensionsKt_n4nhcp()[code_4] >= 0) {
                    tmp$ret$40 = access$_get_HEX_DIGITS_TO_DECIMAL_$tHexExtensionsKt_n4nhcp()[code_4];
                    break $l$block_4;
                }
                uuidThrowUnexpectedCharacterException(hexDashString, hexDigitExpectedMessage, index_4);
            }
            result_4 = tmp_4 | tmp$ret$40;
        } while (inductionVariable_4 < 36);
        var part5b = result_4;
        var tmp0_low = part2 << 16 | part3;
        var msb = new Long(tmp0_low, part1);
        var tmp1_high = part4 << 16 | part5a;
        var lsb = new Long(part5b, tmp1_high);
        return Companion_getInstance_15().pa(msb, lsb);
    }
    function uuidParseHex(hexString) {
        var result = 0;
        var inductionVariable = 0;
        if (inductionVariable < 8) do {
            var index = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var tmp = result << 4;
            var tmp$ret$2;
            $l$block: {
                var this_0 = charCodeAt(hexString, index);
                var code = Char__toInt_impl_vasixd(this_0);
                if ((code >>> 8 | 0) === 0 && access$_get_HEX_DIGITS_TO_DECIMAL_$tHexExtensionsKt_n4nhcp()[code] >= 0) {
                    tmp$ret$2 = access$_get_HEX_DIGITS_TO_DECIMAL_$tHexExtensionsKt_n4nhcp()[code];
                    break $l$block;
                }
                var errorDescription = 'a hexadecimal digit';
                uuidThrowUnexpectedCharacterException(hexString, errorDescription, index);
            }
            result = tmp | tmp$ret$2;
        } while (inductionVariable < 8);
        var tmp0_high = result;
        var result_0 = 0;
        var inductionVariable_0 = 8;
        if (inductionVariable_0 < 16) do {
            var index_0 = inductionVariable_0;
            inductionVariable_0 = inductionVariable_0 + 1 | 0;
            var tmp_0 = result_0 << 4;
            var tmp$ret$8;
            $l$block_0: {
                var this_1 = charCodeAt(hexString, index_0);
                var code_0 = Char__toInt_impl_vasixd(this_1);
                if ((code_0 >>> 8 | 0) === 0 && access$_get_HEX_DIGITS_TO_DECIMAL_$tHexExtensionsKt_n4nhcp()[code_0] >= 0) {
                    tmp$ret$8 = access$_get_HEX_DIGITS_TO_DECIMAL_$tHexExtensionsKt_n4nhcp()[code_0];
                    break $l$block_0;
                }
                var errorDescription_0 = 'a hexadecimal digit';
                uuidThrowUnexpectedCharacterException(hexString, errorDescription_0, index_0);
            }
            result_0 = tmp_0 | tmp$ret$8;
        } while (inductionVariable_0 < 16);
        var tmp1_low = result_0;
        var msb = new Long(tmp1_low, tmp0_high);
        var result_1 = 0;
        var inductionVariable_1 = 16;
        if (inductionVariable_1 < 24) do {
            var index_1 = inductionVariable_1;
            inductionVariable_1 = inductionVariable_1 + 1 | 0;
            var tmp_1 = result_1 << 4;
            var tmp$ret$14;
            $l$block_1: {
                var this_2 = charCodeAt(hexString, index_1);
                var code_1 = Char__toInt_impl_vasixd(this_2);
                if ((code_1 >>> 8 | 0) === 0 && access$_get_HEX_DIGITS_TO_DECIMAL_$tHexExtensionsKt_n4nhcp()[code_1] >= 0) {
                    tmp$ret$14 = access$_get_HEX_DIGITS_TO_DECIMAL_$tHexExtensionsKt_n4nhcp()[code_1];
                    break $l$block_1;
                }
                var errorDescription_1 = 'a hexadecimal digit';
                uuidThrowUnexpectedCharacterException(hexString, errorDescription_1, index_1);
            }
            result_1 = tmp_1 | tmp$ret$14;
        } while (inductionVariable_1 < 24);
        var tmp2_high = result_1;
        var result_2 = 0;
        var inductionVariable_2 = 24;
        if (inductionVariable_2 < 32) do {
            var index_2 = inductionVariable_2;
            inductionVariable_2 = inductionVariable_2 + 1 | 0;
            var tmp_2 = result_2 << 4;
            var tmp$ret$20;
            $l$block_2: {
                var this_3 = charCodeAt(hexString, index_2);
                var code_2 = Char__toInt_impl_vasixd(this_3);
                if ((code_2 >>> 8 | 0) === 0 && access$_get_HEX_DIGITS_TO_DECIMAL_$tHexExtensionsKt_n4nhcp()[code_2] >= 0) {
                    tmp$ret$20 = access$_get_HEX_DIGITS_TO_DECIMAL_$tHexExtensionsKt_n4nhcp()[code_2];
                    break $l$block_2;
                }
                var errorDescription_2 = 'a hexadecimal digit';
                uuidThrowUnexpectedCharacterException(hexString, errorDescription_2, index_2);
            }
            result_2 = tmp_2 | tmp$ret$20;
        } while (inductionVariable_2 < 32);
        var tmp3_low = result_2;
        var lsb = new Long(tmp3_low, tmp2_high);
        return Companion_getInstance_15().pa(msb, lsb);
    }
    function formatBytesInto_0(_this__u8e3s4, dst, dstOffset, startIndex, endIndex) {
        var dstIndex = dstOffset;
        var inductionVariable = 3 - startIndex | 0;
        var last = 4 - endIndex | 0;
        if (last <= inductionVariable) do {
            var reversedIndex = inductionVariable;
            inductionVariable = inductionVariable + -1 | 0;
            var shift = reversedIndex << 3;
            var byte = _this__u8e3s4 >> shift & 255;
            var byteDigits = get_BYTE_TO_LOWER_CASE_HEX_DIGITS()[byte];
            var _unary__edvuaz = dstIndex;
            dstIndex = _unary__edvuaz + 1 | 0;
            dst[_unary__edvuaz] = toByte(byteDigits >> 8);
            var _unary__edvuaz_0 = dstIndex;
            dstIndex = _unary__edvuaz_0 + 1 | 0;
            dst[_unary__edvuaz_0] = toByte(byteDigits);
        } while (!(reversedIndex === last));
        return dstIndex;
    }
    function AbstractCollection$toString$lambda(this$0) {
        return function(it) {
            return it === this$0 ? '(this Collection)' : toString_0(it);
        };
    }
    function AbstractCollection() {}
    protoOf(AbstractCollection).m1 = function(element) {
        var tmp$ret$0;
        $l$block_0: {
            var tmp;
            if (isInterface(this, Collection)) {
                tmp = this.n();
            } else {
                tmp = false;
            }
            if (tmp) {
                tmp$ret$0 = false;
                break $l$block_0;
            }
            var _iterator__ex2g4s = this.j();
            while (_iterator__ex2g4s.k()) {
                var element_0 = _iterator__ex2g4s.l();
                if (equals(element_0, element)) {
                    tmp$ret$0 = true;
                    break $l$block_0;
                }
            }
            tmp$ret$0 = false;
        }
        return tmp$ret$0;
    };
    protoOf(AbstractCollection).n1 = function(elements) {
        var tmp$ret$0;
        $l$block_0: {
            var tmp;
            if (isInterface(elements, Collection)) {
                tmp = elements.n();
            } else {
                tmp = false;
            }
            if (tmp) {
                tmp$ret$0 = true;
                break $l$block_0;
            }
            var _iterator__ex2g4s = elements.j();
            while (_iterator__ex2g4s.k()) {
                var element = _iterator__ex2g4s.l();
                if (!this.m1(element)) {
                    tmp$ret$0 = false;
                    break $l$block_0;
                }
            }
            tmp$ret$0 = true;
        }
        return tmp$ret$0;
    };
    protoOf(AbstractCollection).n = function() {
        return this.m() === 0;
    };
    protoOf(AbstractCollection).toString = function() {
        return joinToString_0(this, ', ', '[', ']', VOID, VOID, AbstractCollection$toString$lambda(this));
    };
    protoOf(AbstractCollection).toArray = function() {
        return collectionToArray(this);
    };
    function tryToComputeNext($this) {
        $this.qa_1 = 3;
        $this.sa();
        return $this.qa_1 === 1;
    }
    function AbstractIterator() {
        this.qa_1 = 0;
        this.ra_1 = null;
    }
    protoOf(AbstractIterator).k = function() {
        var tmp;
        switch (this.qa_1) {
          case 2:
            tmp = false;
            break;

          case 1:
            tmp = true;
            break;

          case 0:
            tmp = tryToComputeNext(this);
            break;

          default:
            throw IllegalArgumentException_init_$Create$_0('hasNext called when the iterator is in the FAILED state.');
        }
        return tmp;
    };
    protoOf(AbstractIterator).l = function() {
        if (this.qa_1 === 1) {
            this.qa_1 = 0;
            return this.ra_1;
        }
        if (this.qa_1 === 2 || !tryToComputeNext(this)) {
            throw NoSuchElementException_init_$Create$();
        }
        this.qa_1 = 0;
        return this.ra_1;
    };
    protoOf(AbstractIterator).ta = function(value) {
        this.ra_1 = value;
        this.qa_1 = 1;
    };
    protoOf(AbstractIterator).ua = function() {
        this.qa_1 = 2;
    };
    function IteratorImpl_0($outer) {
        this.wa_1 = $outer;
        this.va_1 = 0;
    }
    protoOf(IteratorImpl_0).k = function() {
        return this.va_1 < this.wa_1.m();
    };
    protoOf(IteratorImpl_0).l = function() {
        if (!this.k()) throw NoSuchElementException_init_$Create$();
        var _unary__edvuaz = this.va_1;
        this.va_1 = _unary__edvuaz + 1 | 0;
        return this.wa_1.p(_unary__edvuaz);
    };
    function ListIteratorImpl_0($outer, index) {
        this.za_1 = $outer;
        IteratorImpl_0.call(this, $outer);
        Companion_instance_4.j3(index, this.za_1.m());
        this.va_1 = index;
    }
    function Companion_4() {
        this.u2_1 = 2147483639;
    }
    protoOf(Companion_4).b4 = function(index, size) {
        if (index < 0 || index >= size) {
            throw IndexOutOfBoundsException_init_$Create$_0('index: ' + index + ', size: ' + size);
        }
    };
    protoOf(Companion_4).j3 = function(index, size) {
        if (index < 0 || index > size) {
            throw IndexOutOfBoundsException_init_$Create$_0('index: ' + index + ', size: ' + size);
        }
    };
    protoOf(Companion_4).v2 = function(fromIndex, toIndex, size) {
        if (fromIndex < 0 || toIndex > size) {
            throw IndexOutOfBoundsException_init_$Create$_0('fromIndex: ' + fromIndex + ', toIndex: ' + toIndex + ', size: ' + size);
        }
        if (fromIndex > toIndex) {
            throw IllegalArgumentException_init_$Create$_0('fromIndex: ' + fromIndex + ' > toIndex: ' + toIndex);
        }
    };
    protoOf(Companion_4).ga = function(startIndex, endIndex, size) {
        if (startIndex < 0 || endIndex > size) {
            throw IndexOutOfBoundsException_init_$Create$_0('startIndex: ' + startIndex + ', endIndex: ' + endIndex + ', size: ' + size);
        }
        if (startIndex > endIndex) {
            throw IllegalArgumentException_init_$Create$_0('startIndex: ' + startIndex + ' > endIndex: ' + endIndex);
        }
    };
    protoOf(Companion_4).x5 = function(oldCapacity, minCapacity) {
        var newCapacity = oldCapacity + (oldCapacity >> 1) | 0;
        if ((newCapacity - minCapacity | 0) < 0) newCapacity = minCapacity;
        if ((newCapacity - 2147483639 | 0) > 0) newCapacity = minCapacity > 2147483639 ? 2147483647 : 2147483639;
        return newCapacity;
    };
    protoOf(Companion_4).o3 = function(c) {
        var hashCode = 1;
        var _iterator__ex2g4s = c.j();
        while (_iterator__ex2g4s.k()) {
            var e = _iterator__ex2g4s.l();
            var tmp = imul(31, hashCode);
            var tmp1_elvis_lhs = e == null ? null : hashCode_0(e);
            hashCode = tmp + (tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs) | 0;
        }
        return hashCode;
    };
    protoOf(Companion_4).n3 = function(c, other) {
        if (!(c.m() === other.m())) return false;
        var otherIterator = other.j();
        var _iterator__ex2g4s = c.j();
        while (_iterator__ex2g4s.k()) {
            var elem = _iterator__ex2g4s.l();
            var elemOther = otherIterator.l();
            if (!equals(elem, elemOther)) {
                return false;
            }
        }
        return true;
    };
    var Companion_instance_4;
    function Companion_getInstance_4() {
        return Companion_instance_4;
    }
    function AbstractList() {
        AbstractCollection.call(this);
    }
    protoOf(AbstractList).j = function() {
        return new IteratorImpl_0(this);
    };
    protoOf(AbstractList).o1 = function(element) {
        var tmp$ret$0;
        $l$block: {
            var index = 0;
            var _iterator__ex2g4s = this.j();
            while (_iterator__ex2g4s.k()) {
                var item = _iterator__ex2g4s.l();
                if (equals(item, element)) {
                    tmp$ret$0 = index;
                    break $l$block;
                }
                index = index + 1 | 0;
            }
            tmp$ret$0 = -1;
        }
        return tmp$ret$0;
    };
    protoOf(AbstractList).r = function(index) {
        return new ListIteratorImpl_0(this, index);
    };
    protoOf(AbstractList).equals = function(other) {
        if (other === this) return true;
        if (!(!(other == null) ? isInterface(other, KtList) : false)) return false;
        return Companion_instance_4.n3(this, other);
    };
    protoOf(AbstractList).hashCode = function() {
        return Companion_instance_4.o3(this);
    };
    function AbstractMap$keys$1$iterator$1($entryIterator) {
        this.ab_1 = $entryIterator;
    }
    protoOf(AbstractMap$keys$1$iterator$1).k = function() {
        return this.ab_1.k();
    };
    protoOf(AbstractMap$keys$1$iterator$1).l = function() {
        return this.ab_1.l().p1();
    };
    function AbstractMap$values$1$iterator$1($entryIterator) {
        this.bb_1 = $entryIterator;
    }
    protoOf(AbstractMap$values$1$iterator$1).k = function() {
        return this.bb_1.k();
    };
    protoOf(AbstractMap$values$1$iterator$1).l = function() {
        return this.bb_1.l().q1();
    };
    function toString_3($this, entry) {
        return toString_4($this, entry.p1()) + '=' + toString_4($this, entry.q1());
    }
    function toString_4($this, o) {
        return o === $this ? '(this Map)' : toString_0(o);
    }
    function implFindEntry($this, key) {
        var tmp0 = $this.w1();
        var tmp$ret$0;
        $l$block: {
            var _iterator__ex2g4s = tmp0.j();
            while (_iterator__ex2g4s.k()) {
                var element = _iterator__ex2g4s.l();
                if (equals(element.p1(), key)) {
                    tmp$ret$0 = element;
                    break $l$block;
                }
            }
            tmp$ret$0 = null;
        }
        return tmp$ret$0;
    }
    function Companion_5() {}
    var Companion_instance_5;
    function Companion_getInstance_5() {
        return Companion_instance_5;
    }
    function AbstractMap$keys$1(this$0) {
        this.cb_1 = this$0;
        AbstractSet.call(this);
    }
    protoOf(AbstractMap$keys$1).l4 = function(element) {
        return this.cb_1.r1(element);
    };
    protoOf(AbstractMap$keys$1).m1 = function(element) {
        if (!true) return false;
        return this.l4(element);
    };
    protoOf(AbstractMap$keys$1).j = function() {
        var entryIterator = this.cb_1.w1().j();
        return new AbstractMap$keys$1$iterator$1(entryIterator);
    };
    protoOf(AbstractMap$keys$1).m = function() {
        return this.cb_1.m();
    };
    function AbstractMap$toString$lambda(this$0) {
        return function(it) {
            return toString_3(this$0, it);
        };
    }
    function AbstractMap$values$1(this$0) {
        this.db_1 = this$0;
        AbstractCollection.call(this);
    }
    protoOf(AbstractMap$values$1).r4 = function(element) {
        return this.db_1.s1(element);
    };
    protoOf(AbstractMap$values$1).m1 = function(element) {
        if (!true) return false;
        return this.r4(element);
    };
    protoOf(AbstractMap$values$1).j = function() {
        var entryIterator = this.db_1.w1().j();
        return new AbstractMap$values$1$iterator$1(entryIterator);
    };
    protoOf(AbstractMap$values$1).m = function() {
        return this.db_1.m();
    };
    function AbstractMap() {
        this.v3_1 = null;
        this.w3_1 = null;
    }
    protoOf(AbstractMap).r1 = function(key) {
        return !(implFindEntry(this, key) == null);
    };
    protoOf(AbstractMap).s1 = function(value) {
        var tmp0 = this.w1();
        var tmp$ret$0;
        $l$block_0: {
            var tmp;
            if (isInterface(tmp0, Collection)) {
                tmp = tmp0.n();
            } else {
                tmp = false;
            }
            if (tmp) {
                tmp$ret$0 = false;
                break $l$block_0;
            }
            var _iterator__ex2g4s = tmp0.j();
            while (_iterator__ex2g4s.k()) {
                var element = _iterator__ex2g4s.l();
                if (equals(element.q1(), value)) {
                    tmp$ret$0 = true;
                    break $l$block_0;
                }
            }
            tmp$ret$0 = false;
        }
        return tmp$ret$0;
    };
    protoOf(AbstractMap).x3 = function(entry) {
        if (!(!(entry == null) ? isInterface(entry, Entry) : false)) return false;
        var key = entry.p1();
        var value = entry.q1();
        var ourValue = (isInterface(this, KtMap) ? this : THROW_CCE()).t1(key);
        if (!equals(value, ourValue)) {
            return false;
        }
        var tmp;
        if (ourValue == null) {
            tmp = !(isInterface(this, KtMap) ? this : THROW_CCE()).r1(key);
        } else {
            tmp = false;
        }
        if (tmp) {
            return false;
        }
        return true;
    };
    protoOf(AbstractMap).equals = function(other) {
        if (other === this) return true;
        if (!(!(other == null) ? isInterface(other, KtMap) : false)) return false;
        if (!(this.m() === other.m())) return false;
        var tmp0 = other.w1();
        var tmp$ret$0;
        $l$block_0: {
            var tmp;
            if (isInterface(tmp0, Collection)) {
                tmp = tmp0.n();
            } else {
                tmp = false;
            }
            if (tmp) {
                tmp$ret$0 = true;
                break $l$block_0;
            }
            var _iterator__ex2g4s = tmp0.j();
            while (_iterator__ex2g4s.k()) {
                var element = _iterator__ex2g4s.l();
                if (!this.x3(element)) {
                    tmp$ret$0 = false;
                    break $l$block_0;
                }
            }
            tmp$ret$0 = true;
        }
        return tmp$ret$0;
    };
    protoOf(AbstractMap).t1 = function(key) {
        var tmp0_safe_receiver = implFindEntry(this, key);
        return tmp0_safe_receiver == null ? null : tmp0_safe_receiver.q1();
    };
    protoOf(AbstractMap).hashCode = function() {
        return hashCode_0(this.w1());
    };
    protoOf(AbstractMap).n = function() {
        return this.m() === 0;
    };
    protoOf(AbstractMap).m = function() {
        return this.w1().m();
    };
    protoOf(AbstractMap).u1 = function() {
        if (this.v3_1 == null) {
            var tmp = this;
            tmp.v3_1 = new AbstractMap$keys$1(this);
        }
        return ensureNotNull(this.v3_1);
    };
    protoOf(AbstractMap).toString = function() {
        var tmp = this.w1();
        return joinToString_0(tmp, ', ', '{', '}', VOID, VOID, AbstractMap$toString$lambda(this));
    };
    protoOf(AbstractMap).v1 = function() {
        if (this.w3_1 == null) {
            var tmp = this;
            tmp.w3_1 = new AbstractMap$values$1(this);
        }
        return ensureNotNull(this.w3_1);
    };
    function Companion_6() {}
    protoOf(Companion_6).z3 = function(c) {
        var hashCode = 0;
        var _iterator__ex2g4s = c.j();
        while (_iterator__ex2g4s.k()) {
            var element = _iterator__ex2g4s.l();
            var tmp = hashCode;
            var tmp1_elvis_lhs = element == null ? null : hashCode_0(element);
            hashCode = tmp + (tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs) | 0;
        }
        return hashCode;
    };
    protoOf(Companion_6).y3 = function(c, other) {
        if (!(c.m() === other.m())) return false;
        return c.n1(other);
    };
    var Companion_instance_6;
    function Companion_getInstance_6() {
        return Companion_instance_6;
    }
    function AbstractSet() {
        AbstractCollection.call(this);
    }
    protoOf(AbstractSet).equals = function(other) {
        if (other === this) return true;
        if (!(!(other == null) ? isInterface(other, KtSet) : false)) return false;
        return Companion_instance_6.y3(this, other);
    };
    protoOf(AbstractSet).hashCode = function() {
        return Companion_instance_6.z3(this);
    };
    function get_lastIndex_2(_this__u8e3s4) {
        return _this__u8e3s4.m() - 1 | 0;
    }
    function throwIndexOverflow() {
        throw ArithmeticException_init_$Create$_0('Index overflow has happened.');
    }
    function collectionToArrayCommonImpl(collection) {
        if (collection.n()) {
            return [];
        }
        var size = collection.m();
        var destination = Array(size);
        var iterator = collection.j();
        var index = 0;
        while (iterator.k()) {
            var _unary__edvuaz = index;
            index = _unary__edvuaz + 1 | 0;
            destination[_unary__edvuaz] = iterator.l();
        }
        return destination;
    }
    function emptyList() {
        return EmptyList_getInstance();
    }
    function mutableListOf(elements) {
        var tmp;
        if (elements.length === 0) {
            tmp = ArrayList_init_$Create$();
        } else {
            tmp = new ArrayList(elements);
        }
        return tmp;
    }
    function listOf_0(elements) {
        return elements.length > 0 ? asList(elements) : emptyList();
    }
    function shuffled(_this__u8e3s4, random) {
        var this_0 = toMutableList_1(_this__u8e3s4);
        shuffle(this_0, random);
        return this_0;
    }
    function listOfNotNull(element) {
        return !(element == null) ? listOf(element) : emptyList();
    }
    function EmptyList() {
        EmptyList_instance = this;
        this.eb_1 = new Long(-1478467534, -1720727600);
    }
    protoOf(EmptyList).equals = function(other) {
        var tmp;
        if (!(other == null) ? isInterface(other, KtList) : false) {
            tmp = other.n();
        } else {
            tmp = false;
        }
        return tmp;
    };
    protoOf(EmptyList).hashCode = function() {
        return 1;
    };
    protoOf(EmptyList).toString = function() {
        return '[]';
    };
    protoOf(EmptyList).m = function() {
        return 0;
    };
    protoOf(EmptyList).n = function() {
        return true;
    };
    protoOf(EmptyList).fb = function(element) {
        return false;
    };
    protoOf(EmptyList).m1 = function(element) {
        if (!false) return false;
        var tmp;
        if (false) {
            tmp = element;
        } else {
            tmp = THROW_CCE();
        }
        return this.fb(tmp);
    };
    protoOf(EmptyList).p = function(index) {
        throw IndexOutOfBoundsException_init_$Create$_0("Empty list doesn't contain element at index " + index + '.');
    };
    protoOf(EmptyList).gb = function(element) {
        return -1;
    };
    protoOf(EmptyList).o1 = function(element) {
        if (!false) return -1;
        var tmp;
        if (false) {
            tmp = element;
        } else {
            tmp = THROW_CCE();
        }
        return this.gb(tmp);
    };
    protoOf(EmptyList).j = function() {
        return EmptyIterator_instance;
    };
    protoOf(EmptyList).r = function(index) {
        if (!(index === 0)) throw IndexOutOfBoundsException_init_$Create$_0('Index: ' + index);
        return EmptyIterator_instance;
    };
    var EmptyList_instance;
    function EmptyList_getInstance() {
        if (EmptyList_instance == null) new EmptyList;
        return EmptyList_instance;
    }
    function EmptyIterator() {}
    protoOf(EmptyIterator).k = function() {
        return false;
    };
    protoOf(EmptyIterator).l = function() {
        throw NoSuchElementException_init_$Create$();
    };
    var EmptyIterator_instance;
    function EmptyIterator_getInstance() {
        return EmptyIterator_instance;
    }
    function optimizeReadOnlyList(_this__u8e3s4) {
        switch (_this__u8e3s4.m()) {
          case 0:
            return emptyList();

          case 1:
            return listOf(_this__u8e3s4.p(0));

          default:
            return _this__u8e3s4;
        }
    }
    function IndexedValue(index, value) {
        this.hb_1 = index;
        this.ib_1 = value;
    }
    protoOf(IndexedValue).toString = function() {
        return 'IndexedValue(index=' + this.hb_1 + ', value=' + toString_0(this.ib_1) + ')';
    };
    protoOf(IndexedValue).hashCode = function() {
        var result = this.hb_1;
        result = imul(result, 31) + (this.ib_1 == null ? 0 : hashCode_0(this.ib_1)) | 0;
        return result;
    };
    protoOf(IndexedValue).equals = function(other) {
        if (this === other) return true;
        if (!(other instanceof IndexedValue)) return false;
        if (!(this.hb_1 === other.hb_1)) return false;
        if (!equals(this.ib_1, other.ib_1)) return false;
        return true;
    };
    function flatten(_this__u8e3s4) {
        var result = ArrayList_init_$Create$();
        var _iterator__ex2g4s = _this__u8e3s4.j();
        while (_iterator__ex2g4s.k()) {
            var element = _iterator__ex2g4s.l();
            addAll(result, element);
        }
        return result;
    }
    function IndexingIterable(iteratorFactory) {
        this.jb_1 = iteratorFactory;
    }
    protoOf(IndexingIterable).j = function() {
        return new IndexingIterator(this.jb_1());
    };
    function collectionSizeOrDefault(_this__u8e3s4, default_0) {
        var tmp;
        if (isInterface(_this__u8e3s4, Collection)) {
            tmp = _this__u8e3s4.m();
        } else {
            tmp = default_0;
        }
        return tmp;
    }
    function IndexingIterator(iterator) {
        this.kb_1 = iterator;
        this.lb_1 = 0;
    }
    protoOf(IndexingIterator).k = function() {
        return this.kb_1.k();
    };
    protoOf(IndexingIterator).l = function() {
        var _unary__edvuaz = this.lb_1;
        this.lb_1 = _unary__edvuaz + 1 | 0;
        return new IndexedValue(checkIndexOverflow(_unary__edvuaz), this.kb_1.l());
    };
    function getOrImplicitDefault(_this__u8e3s4, key) {
        if (isInterface(_this__u8e3s4, MapWithDefault)) return _this__u8e3s4.mb(key);
        var tmp$ret$0;
        $l$block_0: {
            var value = _this__u8e3s4.t1(key);
            if (value == null && !_this__u8e3s4.r1(key)) {
                throw NoSuchElementException_init_$Create$_0('Key ' + toString_0(key) + ' is missing in the map.');
            } else {
                tmp$ret$0 = value;
                break $l$block_0;
            }
        }
        return tmp$ret$0;
    }
    function MapWithDefault() {}
    function emptyMap() {
        var tmp = EmptyMap_getInstance();
        return isInterface(tmp, KtMap) ? tmp : THROW_CCE();
    }
    function mapOf_0(pairs) {
        return pairs.length > 0 ? toMap_0(pairs, LinkedHashMap_init_$Create$_0(mapCapacity(pairs.length))) : emptyMap();
    }
    function getValue(_this__u8e3s4, key) {
        return getOrImplicitDefault(_this__u8e3s4, key);
    }
    function toMap(_this__u8e3s4) {
        if (isInterface(_this__u8e3s4, Collection)) {
            var tmp;
            switch (_this__u8e3s4.m()) {
              case 0:
                tmp = emptyMap();
                break;

              case 1:
                var tmp_0;
                if (isInterface(_this__u8e3s4, KtList)) {
                    tmp_0 = _this__u8e3s4.p(0);
                } else {
                    tmp_0 = _this__u8e3s4.j().l();
                }
                tmp = mapOf(tmp_0);
                break;

              default:
                tmp = toMap_1(_this__u8e3s4, LinkedHashMap_init_$Create$_0(mapCapacity(_this__u8e3s4.m())));
                break;
            }
            return tmp;
        }
        return optimizeReadOnlyMap(toMap_1(_this__u8e3s4, LinkedHashMap_init_$Create$()));
    }
    function toMutableMap(_this__u8e3s4) {
        return LinkedHashMap_init_$Create$_1(_this__u8e3s4);
    }
    function plus_2(_this__u8e3s4, pair) {
        var tmp;
        if (_this__u8e3s4.n()) {
            tmp = mapOf(pair);
        } else {
            var this_0 = LinkedHashMap_init_$Create$_1(_this__u8e3s4);
            this_0.x1(pair.nb_1, pair.ob_1);
            tmp = this_0;
        }
        return tmp;
    }
    function plus_3(_this__u8e3s4, pairs) {
        var tmp;
        if (_this__u8e3s4.n()) {
            tmp = toMap(pairs);
        } else {
            var this_0 = LinkedHashMap_init_$Create$_1(_this__u8e3s4);
            putAll(this_0, pairs);
            tmp = this_0;
        }
        return tmp;
    }
    function EmptyMap() {
        EmptyMap_instance = this;
        this.pb_1 = new Long(-888910638, 1920087921);
    }
    protoOf(EmptyMap).equals = function(other) {
        var tmp;
        if (!(other == null) ? isInterface(other, KtMap) : false) {
            tmp = other.n();
        } else {
            tmp = false;
        }
        return tmp;
    };
    protoOf(EmptyMap).hashCode = function() {
        return 0;
    };
    protoOf(EmptyMap).toString = function() {
        return '{}';
    };
    protoOf(EmptyMap).m = function() {
        return 0;
    };
    protoOf(EmptyMap).n = function() {
        return true;
    };
    protoOf(EmptyMap).qb = function(key) {
        return false;
    };
    protoOf(EmptyMap).r1 = function(key) {
        if (!true) return false;
        return this.qb(key);
    };
    protoOf(EmptyMap).rb = function(key) {
        return null;
    };
    protoOf(EmptyMap).t1 = function(key) {
        if (!true) return null;
        return this.rb(key);
    };
    protoOf(EmptyMap).w1 = function() {
        return EmptySet_getInstance();
    };
    protoOf(EmptyMap).u1 = function() {
        return EmptySet_getInstance();
    };
    protoOf(EmptyMap).v1 = function() {
        return EmptyList_getInstance();
    };
    var EmptyMap_instance;
    function EmptyMap_getInstance() {
        if (EmptyMap_instance == null) new EmptyMap;
        return EmptyMap_instance;
    }
    function toMap_0(_this__u8e3s4, destination) {
        putAll_0(destination, _this__u8e3s4);
        return destination;
    }
    function toMap_1(_this__u8e3s4, destination) {
        putAll(destination, _this__u8e3s4);
        return destination;
    }
    function optimizeReadOnlyMap(_this__u8e3s4) {
        var tmp;
        switch (_this__u8e3s4.m()) {
          case 0:
            tmp = emptyMap();
            break;

          case 1:
            tmp = _this__u8e3s4;
            break;

          default:
            tmp = _this__u8e3s4;
            break;
        }
        return tmp;
    }
    function putAll(_this__u8e3s4, pairs) {
        var _iterator__ex2g4s = pairs.j();
        while (_iterator__ex2g4s.k()) {
            var _destruct__k2r9zo = _iterator__ex2g4s.l();
            var key = _destruct__k2r9zo.sb();
            var value = _destruct__k2r9zo.tb();
            _this__u8e3s4.x1(key, value);
        }
    }
    function putAll_0(_this__u8e3s4, pairs) {
        var inductionVariable = 0;
        var last = pairs.length;
        while (inductionVariable < last) {
            var _destruct__k2r9zo = pairs[inductionVariable];
            inductionVariable = inductionVariable + 1 | 0;
            var key = _destruct__k2r9zo.sb();
            var value = _destruct__k2r9zo.tb();
            _this__u8e3s4.x1(key, value);
        }
    }
    function hashMapOf(pairs) {
        var this_0 = HashMap_init_$Create$_0(mapCapacity(pairs.length));
        putAll_0(this_0, pairs);
        return this_0;
    }
    function removeAll(_this__u8e3s4, predicate) {
        return filterInPlace(_this__u8e3s4, predicate, true);
    }
    function filterInPlace(_this__u8e3s4, predicate, predicateResultToRemove) {
        if (!isInterface(_this__u8e3s4, RandomAccess)) {
            return filterInPlace_0(isInterface(_this__u8e3s4, MutableIterable) ? _this__u8e3s4 : THROW_CCE(), predicate, predicateResultToRemove);
        }
        var writeIndex = 0;
        var inductionVariable = 0;
        var last = get_lastIndex_2(_this__u8e3s4);
        if (inductionVariable <= last) $l$loop: do {
            var readIndex = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var element = _this__u8e3s4.p(readIndex);
            if (predicate(element) === predicateResultToRemove) continue $l$loop;
            if (!(writeIndex === readIndex)) {
                _this__u8e3s4.s(writeIndex, element);
            }
            writeIndex = writeIndex + 1 | 0;
        } while (!(readIndex === last));
        if (writeIndex < _this__u8e3s4.m()) {
            var inductionVariable_0 = get_lastIndex_2(_this__u8e3s4);
            var last_0 = writeIndex;
            if (last_0 <= inductionVariable_0) do {
                var removeIndex = inductionVariable_0;
                inductionVariable_0 = inductionVariable_0 + -1 | 0;
                _this__u8e3s4.e3(removeIndex);
            } while (!(removeIndex === last_0));
            return true;
        } else {
            return false;
        }
    }
    function filterInPlace_0(_this__u8e3s4, predicate, predicateResultToRemove) {
        var result = false;
        var $this$with = _this__u8e3s4.j();
        while ($this$with.k()) if (predicate($this$with.l()) === predicateResultToRemove) {
            $this$with.z2();
            result = true;
        }
        return result;
    }
    function removeLast(_this__u8e3s4) {
        var tmp;
        if (_this__u8e3s4.n()) {
            throw NoSuchElementException_init_$Create$_0('List is empty.');
        } else {
            tmp = _this__u8e3s4.e3(get_lastIndex_2(_this__u8e3s4));
        }
        return tmp;
    }
    function addAll(_this__u8e3s4, elements) {
        if (isInterface(elements, Collection)) return _this__u8e3s4.q(elements); else {
            var result = false;
            var _iterator__ex2g4s = elements.j();
            while (_iterator__ex2g4s.k()) {
                var item = _iterator__ex2g4s.l();
                if (_this__u8e3s4.i(item)) result = true;
            }
            return result;
        }
    }
    function IntIterator() {}
    protoOf(IntIterator).l = function() {
        return this.ub();
    };
    function Sequence() {}
    function iterator(block) {
        var iterator = new SequenceBuilderIterator;
        iterator.yb_1 = createCoroutineUnintercepted(block, iterator, iterator);
        return iterator;
    }
    function SequenceScope() {}
    function nextNotReady($this) {
        if (!$this.k()) throw NoSuchElementException_init_$Create$(); else return $this.l();
    }
    function exceptionalState($this) {
        switch ($this.vb_1) {
          case 4:
            return NoSuchElementException_init_$Create$();

          case 5:
            return IllegalStateException_init_$Create$_0('Iterator has failed.');

          default:
            return IllegalStateException_init_$Create$_0('Unexpected state of the iterator: ' + $this.vb_1);
        }
    }
    function SequenceBuilderIterator() {
        SequenceScope.call(this);
        this.vb_1 = 0;
        this.wb_1 = null;
        this.xb_1 = null;
        this.yb_1 = null;
    }
    protoOf(SequenceBuilderIterator).k = function() {
        while (true) {
            switch (this.vb_1) {
              case 0:
                break;

              case 1:
                if (ensureNotNull(this.xb_1).k()) {
                    this.vb_1 = 2;
                    return true;
                } else {
                    this.xb_1 = null;
                }
                break;

              case 4:
                return false;

              case 3:
              case 2:
                return true;

              default:
                throw exceptionalState(this);
            }
            this.vb_1 = 5;
            var step = ensureNotNull(this.yb_1);
            this.yb_1 = null;
            var tmp$ret$1 = _Result___init__impl__xyqfz8(Unit_instance);
            step.v7(tmp$ret$1);
        }
    };
    protoOf(SequenceBuilderIterator).l = function() {
        switch (this.vb_1) {
          case 0:
          case 1:
            return nextNotReady(this);

          case 2:
            this.vb_1 = 1;
            return ensureNotNull(this.xb_1).l();

          case 3:
            this.vb_1 = 0;
            var result = this.wb_1;
            this.wb_1 = null;
            return result;

          default:
            throw exceptionalState(this);
        }
    };
    protoOf(SequenceBuilderIterator).zb = function(value, $completion) {
        this.wb_1 = value;
        this.vb_1 = 3;
        this.yb_1 = $completion;
        return get_COROUTINE_SUSPENDED();
    };
    protoOf(SequenceBuilderIterator).ac = function(result) {
        throwOnFailure(result);
        _Result___get_value__impl__bjfvqg(result);
        this.vb_1 = 4;
    };
    protoOf(SequenceBuilderIterator).v7 = function(result) {
        return this.ac(result);
    };
    protoOf(SequenceBuilderIterator).q7 = function() {
        return EmptyCoroutineContext_getInstance();
    };
    function TransformingSequence$iterator$1(this$0) {
        this.cc_1 = this$0;
        this.bc_1 = this$0.dc_1.j();
    }
    protoOf(TransformingSequence$iterator$1).l = function() {
        return this.cc_1.ec_1(this.bc_1.l());
    };
    protoOf(TransformingSequence$iterator$1).k = function() {
        return this.bc_1.k();
    };
    function TransformingSequence(sequence, transformer) {
        this.dc_1 = sequence;
        this.ec_1 = transformer;
    }
    protoOf(TransformingSequence).j = function() {
        return new TransformingSequence$iterator$1(this);
    };
    function calcNext($this) {
        while ($this.fc_1.k()) {
            var item = $this.fc_1.l();
            if ($this.ic_1.lc_1(item) === $this.ic_1.kc_1) {
                $this.hc_1 = item;
                $this.gc_1 = 1;
                return Unit_instance;
            }
        }
        $this.gc_1 = 0;
    }
    function FilteringSequence$iterator$1(this$0) {
        this.ic_1 = this$0;
        this.fc_1 = this$0.jc_1.j();
        this.gc_1 = -1;
        this.hc_1 = null;
    }
    protoOf(FilteringSequence$iterator$1).l = function() {
        if (this.gc_1 === -1) {
            calcNext(this);
        }
        if (this.gc_1 === 0) throw NoSuchElementException_init_$Create$();
        var result = this.hc_1;
        this.hc_1 = null;
        this.gc_1 = -1;
        return result;
    };
    protoOf(FilteringSequence$iterator$1).k = function() {
        if (this.gc_1 === -1) {
            calcNext(this);
        }
        return this.gc_1 === 1;
    };
    function FilteringSequence(sequence, sendWhen, predicate) {
        sendWhen = sendWhen === VOID ? true : sendWhen;
        this.jc_1 = sequence;
        this.kc_1 = sendWhen;
        this.lc_1 = predicate;
    }
    protoOf(FilteringSequence).j = function() {
        return new FilteringSequence$iterator$1(this);
    };
    function setOf_0(elements) {
        return toSet(elements);
    }
    function emptySet() {
        return EmptySet_getInstance();
    }
    function EmptySet() {
        EmptySet_instance = this;
        this.mc_1 = new Long(1993859828, 793161749);
    }
    protoOf(EmptySet).equals = function(other) {
        var tmp;
        if (!(other == null) ? isInterface(other, KtSet) : false) {
            tmp = other.n();
        } else {
            tmp = false;
        }
        return tmp;
    };
    protoOf(EmptySet).hashCode = function() {
        return 0;
    };
    protoOf(EmptySet).toString = function() {
        return '[]';
    };
    protoOf(EmptySet).m = function() {
        return 0;
    };
    protoOf(EmptySet).n = function() {
        return true;
    };
    protoOf(EmptySet).fb = function(element) {
        return false;
    };
    protoOf(EmptySet).m1 = function(element) {
        if (!false) return false;
        var tmp;
        if (false) {
            tmp = element;
        } else {
            tmp = THROW_CCE();
        }
        return this.fb(tmp);
    };
    protoOf(EmptySet).nc = function(elements) {
        return elements.n();
    };
    protoOf(EmptySet).n1 = function(elements) {
        return this.nc(elements);
    };
    protoOf(EmptySet).j = function() {
        return EmptyIterator_instance;
    };
    var EmptySet_instance;
    function EmptySet_getInstance() {
        if (EmptySet_instance == null) new EmptySet;
        return EmptySet_instance;
    }
    function optimizeReadOnlySet(_this__u8e3s4) {
        switch (_this__u8e3s4.m()) {
          case 0:
            return emptySet();

          case 1:
            return setOf(_this__u8e3s4.j().l());

          default:
            return _this__u8e3s4;
        }
    }
    function hashSetOf(elements) {
        return toCollection(elements, HashSet_init_$Create$_0(mapCapacity(elements.length)));
    }
    function checkWindowSizeStep(size, step) {
        if (!(size > 0 && step > 0)) {
            var message = !(size === step) ? 'Both size ' + size + ' and step ' + step + ' must be greater than zero.' : 'size ' + size + ' must be greater than zero.';
            throw IllegalArgumentException_init_$Create$_0(toString_1(message));
        }
    }
    function windowedIterator(iterator_0, size, step, partialWindows, reuseBuffer) {
        if (!iterator_0.k()) return EmptyIterator_instance;
        return iterator(windowedIterator$slambda_0(size, step, iterator_0, reuseBuffer, partialWindows, null));
    }
    function RingBuffer_init_$Init$(capacity, $this) {
        var tmp$ret$0 = Array(capacity);
        RingBuffer.call($this, tmp$ret$0, 0);
        return $this;
    }
    function RingBuffer_init_$Create$(capacity) {
        return RingBuffer_init_$Init$(capacity, objectCreate(protoOf(RingBuffer)));
    }
    function RingBuffer$iterator$1(this$0) {
        this.sc_1 = this$0;
        AbstractIterator.call(this);
        this.qc_1 = this$0.wc_1;
        this.rc_1 = this$0.vc_1;
    }
    protoOf(RingBuffer$iterator$1).sa = function() {
        if (this.qc_1 === 0) {
            this.ua();
        } else {
            this.ta(this.sc_1.tc_1[this.rc_1]);
            var tmp = this;
            var tmp0 = this.sc_1;
            tmp.rc_1 = (this.rc_1 + 1 | 0) % tmp0.uc_1 | 0;
            this.qc_1 = this.qc_1 - 1 | 0;
        }
    };
    function RingBuffer(buffer, filledSize) {
        AbstractList.call(this);
        this.tc_1 = buffer;
        if (!(filledSize >= 0)) {
            var message = 'ring buffer filled size should not be negative but it is ' + filledSize;
            throw IllegalArgumentException_init_$Create$_0(toString_1(message));
        }
        if (!(filledSize <= this.tc_1.length)) {
            var message_0 = 'ring buffer filled size: ' + filledSize + ' cannot be larger than the buffer size: ' + this.tc_1.length;
            throw IllegalArgumentException_init_$Create$_0(toString_1(message_0));
        }
        this.uc_1 = this.tc_1.length;
        this.vc_1 = 0;
        this.wc_1 = filledSize;
    }
    protoOf(RingBuffer).m = function() {
        return this.wc_1;
    };
    protoOf(RingBuffer).p = function(index) {
        Companion_instance_4.b4(index, this.wc_1);
        var tmp$ret$0 = (this.vc_1 + index | 0) % this.uc_1 | 0;
        return this.tc_1[tmp$ret$0];
    };
    protoOf(RingBuffer).xc = function() {
        return this.wc_1 === this.uc_1;
    };
    protoOf(RingBuffer).j = function() {
        return new RingBuffer$iterator$1(this);
    };
    protoOf(RingBuffer).yc = function(array) {
        var tmp;
        if (array.length < this.wc_1) {
            var newSize = this.wc_1;
            tmp = copyOf_0(array, newSize);
        } else {
            tmp = isArray(array) ? array : THROW_CCE();
        }
        var result = tmp;
        var size = this.wc_1;
        var widx = 0;
        var idx = this.vc_1;
        while (widx < size && idx < this.uc_1) {
            result[widx] = this.tc_1[idx];
            widx = widx + 1 | 0;
            idx = idx + 1 | 0;
        }
        idx = 0;
        while (widx < size) {
            result[widx] = this.tc_1[idx];
            widx = widx + 1 | 0;
            idx = idx + 1 | 0;
        }
        var tmp_0 = terminateCollectionToArray(size, result);
        return isArray(tmp_0) ? tmp_0 : THROW_CCE();
    };
    protoOf(RingBuffer).e4 = function() {
        var size = this.wc_1;
        var tmp$ret$0 = Array(size);
        return this.yc(tmp$ret$0);
    };
    protoOf(RingBuffer).toArray = function() {
        return this.e4();
    };
    protoOf(RingBuffer).zc = function(maxCapacity) {
        var newCapacity = coerceAtMost((this.uc_1 + (this.uc_1 >> 1) | 0) + 1 | 0, maxCapacity);
        var tmp;
        if (this.vc_1 === 0) {
            var this_0 = this.tc_1;
            tmp = copyOf_0(this_0, newCapacity);
        } else {
            var tmp$ret$1 = Array(newCapacity);
            tmp = this.yc(tmp$ret$1);
        }
        var newBuffer = tmp;
        return new RingBuffer(newBuffer, this.wc_1);
    };
    protoOf(RingBuffer).ad = function(element) {
        if (this.xc()) {
            throw IllegalStateException_init_$Create$_0('ring buffer is full');
        }
        var tmp$ret$0 = (this.vc_1 + this.wc_1 | 0) % this.uc_1 | 0;
        this.tc_1[tmp$ret$0] = element;
        this.wc_1 = this.wc_1 + 1 | 0;
    };
    protoOf(RingBuffer).bd = function(n) {
        if (!(n >= 0)) {
            var message = "n shouldn't be negative but it is " + n;
            throw IllegalArgumentException_init_$Create$_0(toString_1(message));
        }
        if (!(n <= this.wc_1)) {
            var message_0 = "n shouldn't be greater than the buffer size: n = " + n + ', size = ' + this.wc_1;
            throw IllegalArgumentException_init_$Create$_0(toString_1(message_0));
        }
        if (n > 0) {
            var start = this.vc_1;
            var end = (start + n | 0) % this.uc_1 | 0;
            if (start > end) {
                fill_0(this.tc_1, null, start, this.uc_1);
                fill_0(this.tc_1, null, 0, end);
            } else {
                fill_0(this.tc_1, null, start, end);
            }
            this.vc_1 = end;
            this.wc_1 = this.wc_1 - n | 0;
        }
    };
    function windowedIterator$slambda($size, $step, $iterator, $reuseBuffer, $partialWindows, resultContinuation) {
        this.kd_1 = $size;
        this.ld_1 = $step;
        this.md_1 = $iterator;
        this.nd_1 = $reuseBuffer;
        this.od_1 = $partialWindows;
        CoroutineImpl.call(this, resultContinuation);
    }
    protoOf(windowedIterator$slambda).xd = function($this$iterator, $completion) {
        var tmp = this.yd($this$iterator, $completion);
        tmp.m7_1 = Unit_instance;
        tmp.n7_1 = null;
        return tmp.s7();
    };
    protoOf(windowedIterator$slambda).k8 = function(p1, $completion) {
        return this.xd(p1 instanceof SequenceScope ? p1 : THROW_CCE(), $completion);
    };
    protoOf(windowedIterator$slambda).s7 = function() {
        var suspendResult = this.m7_1;
        $sm: do {
            try {
                var tmp = this.k7_1;
                switch (tmp) {
                  case 0:
                    this.l7_1 = 21;
                    var bufferInitialCapacity = coerceAtMost(this.kd_1, 1024);
                    this.sd_1 = this.ld_1 - this.kd_1 | 0;
                    if (this.sd_1 >= 0) {
                        this.qd_1 = ArrayList_init_$Create$_0(bufferInitialCapacity);
                        this.rd_1 = 0;
                        var tmp_0 = this;
                        tmp_0.ud_1 = this.md_1;
                        this.k7_1 = 12;
                        continue $sm;
                    } else {
                        this.vd_1 = RingBuffer_init_$Create$(bufferInitialCapacity);
                        var tmp_1 = this;
                        tmp_1.wd_1 = this.md_1;
                        this.k7_1 = 1;
                        continue $sm;
                    }

                  case 1:
                    if (!this.wd_1.k()) {
                        this.k7_1 = 5;
                        continue $sm;
                    }
                    var e = this.wd_1.l();
                    this.vd_1.ad(e);
                    if (this.vd_1.xc()) {
                        if (this.vd_1.wc_1 < this.kd_1) {
                            this.vd_1 = this.vd_1.zc(this.kd_1);
                            this.k7_1 = 1;
                            continue $sm;
                        } else {
                            this.k7_1 = 2;
                            continue $sm;
                        }
                    } else {
                        this.k7_1 = 4;
                        continue $sm;
                    }

                  case 2:
                    this.k7_1 = 3;
                    suspendResult = this.pd_1.zb(this.nd_1 ? this.vd_1 : ArrayList_init_$Create$_1(this.vd_1), this);
                    if (suspendResult === get_COROUTINE_SUSPENDED()) {
                        return suspendResult;
                    }
                    continue $sm;

                  case 3:
                    this.vd_1.bd(this.ld_1);
                    this.k7_1 = 4;
                    continue $sm;

                  case 4:
                    this.k7_1 = 1;
                    continue $sm;

                  case 5:
                    if (this.od_1) {
                        this.k7_1 = 6;
                        continue $sm;
                    } else {
                        this.k7_1 = 11;
                        continue $sm;
                    }

                  case 6:
                    if (!(this.vd_1.wc_1 > this.ld_1)) {
                        this.k7_1 = 8;
                        continue $sm;
                    }
                    this.k7_1 = 7;
                    suspendResult = this.pd_1.zb(this.nd_1 ? this.vd_1 : ArrayList_init_$Create$_1(this.vd_1), this);
                    if (suspendResult === get_COROUTINE_SUSPENDED()) {
                        return suspendResult;
                    }
                    continue $sm;

                  case 7:
                    this.vd_1.bd(this.ld_1);
                    this.k7_1 = 6;
                    continue $sm;

                  case 8:
                    if (!this.vd_1.n()) {
                        this.k7_1 = 9;
                        suspendResult = this.pd_1.zb(this.vd_1, this);
                        if (suspendResult === get_COROUTINE_SUSPENDED()) {
                            return suspendResult;
                        }
                        continue $sm;
                    } else {
                        this.k7_1 = 10;
                        continue $sm;
                    }

                  case 9:
                    this.k7_1 = 10;
                    continue $sm;

                  case 10:
                    this.k7_1 = 11;
                    continue $sm;

                  case 11:
                    this.k7_1 = 20;
                    continue $sm;

                  case 12:
                    if (!this.ud_1.k()) {
                        this.k7_1 = 16;
                        continue $sm;
                    }
                    this.td_1 = this.ud_1.l();
                    if (this.rd_1 > 0) {
                        this.rd_1 = this.rd_1 - 1 | 0;
                        this.k7_1 = 12;
                        continue $sm;
                    } else {
                        this.k7_1 = 13;
                        continue $sm;
                    }

                  case 13:
                    this.qd_1.i(this.td_1);
                    if (this.qd_1.m() === this.kd_1) {
                        this.k7_1 = 14;
                        suspendResult = this.pd_1.zb(this.qd_1, this);
                        if (suspendResult === get_COROUTINE_SUSPENDED()) {
                            return suspendResult;
                        }
                        continue $sm;
                    } else {
                        this.k7_1 = 15;
                        continue $sm;
                    }

                  case 14:
                    if (this.nd_1) {
                        this.qd_1.l3();
                    } else this.qd_1 = ArrayList_init_$Create$_0(this.kd_1);
                    this.rd_1 = this.sd_1;
                    this.k7_1 = 15;
                    continue $sm;

                  case 15:
                    this.k7_1 = 12;
                    continue $sm;

                  case 16:
                    if (!this.qd_1.n()) {
                        if (this.od_1 || this.qd_1.m() === this.kd_1) {
                            this.k7_1 = 17;
                            suspendResult = this.pd_1.zb(this.qd_1, this);
                            if (suspendResult === get_COROUTINE_SUSPENDED()) {
                                return suspendResult;
                            }
                            continue $sm;
                        } else {
                            this.k7_1 = 18;
                            continue $sm;
                        }
                    } else {
                        this.k7_1 = 19;
                        continue $sm;
                    }

                  case 17:
                    this.k7_1 = 18;
                    continue $sm;

                  case 18:
                    this.k7_1 = 19;
                    continue $sm;

                  case 19:
                    this.k7_1 = 20;
                    continue $sm;

                  case 20:
                    return Unit_instance;

                  case 21:
                    throw this.n7_1;
                }
            } catch ($p) {
                var e_0 = $p;
                if (this.l7_1 === 21) {
                    throw e_0;
                } else {
                    this.k7_1 = this.l7_1;
                    this.n7_1 = e_0;
                }
            }
        } while (true);
    };
    protoOf(windowedIterator$slambda).yd = function($this$iterator, completion) {
        var i = new windowedIterator$slambda(this.kd_1, this.ld_1, this.md_1, this.nd_1, this.od_1, completion);
        i.pd_1 = $this$iterator;
        return i;
    };
    function windowedIterator$slambda_0($size, $step, $iterator, $reuseBuffer, $partialWindows, resultContinuation) {
        var i = new windowedIterator$slambda($size, $step, $iterator, $reuseBuffer, $partialWindows, resultContinuation);
        return constructCallableReference((function($this$iterator, $completion) {
            return i.xd($this$iterator, $completion);
        }), 1);
    }
    function compareValues(a, b) {
        if (a == null) return b == null ? 0 : -1;
        if (b == null) return 1;
        return compareTo((!(a == null) ? isComparable(a) : false) ? a : THROW_CCE(), b);
    }
    function Continuation() {}
    function Key() {}
    var Key_instance;
    function Key_getInstance() {
        return Key_instance;
    }
    function ContinuationInterceptor() {}
    function EmptyCoroutineContext() {
        EmptyCoroutineContext_instance = this;
        this.zd_1 = new Long(0, 0);
    }
    protoOf(EmptyCoroutineContext).w7 = function(key) {
        return null;
    };
    protoOf(EmptyCoroutineContext).hashCode = function() {
        return 0;
    };
    protoOf(EmptyCoroutineContext).toString = function() {
        return 'EmptyCoroutineContext';
    };
    var EmptyCoroutineContext_instance;
    function EmptyCoroutineContext_getInstance() {
        if (EmptyCoroutineContext_instance == null) new EmptyCoroutineContext;
        return EmptyCoroutineContext_instance;
    }
    function get_COROUTINE_SUSPENDED() {
        return CoroutineSingletons_COROUTINE_SUSPENDED_getInstance();
    }
    var static_init_called_0;
    function static_init_0() {
        if (static_init_called_0) return Unit_instance;
        static_init_called_0 = true;
        CoroutineSingletons_COROUTINE_SUSPENDED_instance = new CoroutineSingletons('COROUTINE_SUSPENDED', 0);
        CoroutineSingletons_UNDECIDED_instance = new CoroutineSingletons('UNDECIDED', 1);
        CoroutineSingletons_RESUMED_instance = new CoroutineSingletons('RESUMED', 2);
    }
    var CoroutineSingletons_COROUTINE_SUSPENDED_instance;
    var CoroutineSingletons_UNDECIDED_instance;
    var CoroutineSingletons_RESUMED_instance;
    function CoroutineSingletons(name, ordinal) {
        Enum.call(this, name, ordinal);
    }
    function CoroutineSingletons_COROUTINE_SUSPENDED_getInstance() {
        static_init_0();
        return CoroutineSingletons_COROUTINE_SUSPENDED_instance;
    }
    function getProgressionLastElement(start, end, step) {
        var tmp;
        if (step > 0) {
            tmp = start >= end ? end : end - differenceModulo(end, start, step) | 0;
        } else if (step < 0) {
            tmp = start <= end ? end : end + differenceModulo(start, end, -step | 0) | 0;
        } else {
            throw IllegalArgumentException_init_$Create$_0('Step is zero.');
        }
        return tmp;
    }
    function differenceModulo(a, b, c) {
        return mod(mod(a, c) - mod(b, c) | 0, c);
    }
    function mod(a, b) {
        var mod = a % b | 0;
        return mod >= 0 ? mod : mod + b | 0;
    }
    function Default() {
        Default_instance = this;
        Random.call(this);
        this.ae_1 = defaultPlatformRandom();
    }
    protoOf(Default).be = function(bitCount) {
        return this.ae_1.be(bitCount);
    };
    protoOf(Default).ub = function() {
        return this.ae_1.ub();
    };
    protoOf(Default).o = function(until) {
        return this.ae_1.o(until);
    };
    protoOf(Default).ce = function(from, until) {
        return this.ae_1.ce(from, until);
    };
    protoOf(Default).de = function() {
        return this.ae_1.de();
    };
    protoOf(Default).ee = function(until) {
        return this.ae_1.ee(until);
    };
    protoOf(Default).fe = function(from, until) {
        return this.ae_1.fe(from, until);
    };
    var Default_instance;
    function Default_getInstance() {
        if (Default_instance == null) new Default;
        return Default_instance;
    }
    function Random() {
        Default_getInstance();
    }
    protoOf(Random).ub = function() {
        return this.be(32);
    };
    protoOf(Random).o = function(until) {
        return this.ce(0, until);
    };
    protoOf(Random).ce = function(from, until) {
        checkRangeBounds(from, until);
        var n = until - from | 0;
        if (n > 0 || n === -2147483648) {
            var tmp;
            if ((n & (-n | 0)) === n) {
                var bitCount = fastLog2(n);
                tmp = this.be(bitCount);
            } else {
                var v;
                do {
                    var bits = this.ub() >>> 1 | 0;
                    v = bits % n | 0;
                } while (((bits - v | 0) + (n - 1 | 0) | 0) < 0);
                tmp = v;
            }
            var rnd = tmp;
            return from + rnd | 0;
        } else {
            while (true) {
                var rnd_0 = this.ub();
                if (from <= rnd_0 ? rnd_0 < until : false) return rnd_0;
            }
        }
    };
    protoOf(Random).de = function() {
        return doubleFromParts(this.be(26), this.be(27));
    };
    protoOf(Random).ee = function(until) {
        return this.fe(0, until);
    };
    protoOf(Random).fe = function(from, until) {
        checkRangeBounds_0(from, until);
        var size = until - from;
        var tmp;
        if (isInfinite(size) && isFinite(from) && isFinite(until)) {
            var r1 = this.de() * (until / 2 - from / 2);
            tmp = from + r1 + r1;
        } else {
            tmp = from + this.de() * size;
        }
        var r = tmp;
        return r >= until ? nextDown(until) : r;
    };
    function checkRangeBounds(from, until) {
        if (!(until > from)) {
            var message = boundsErrorMessage(from, until);
            throw IllegalArgumentException_init_$Create$_0(toString_1(message));
        }
        return Unit_instance;
    }
    function fastLog2(value) {
        return 31 - clz32(value) | 0;
    }
    function checkRangeBounds_0(from, until) {
        if (!(until > from)) {
            var message = boundsErrorMessage(from, until);
            throw IllegalArgumentException_init_$Create$_0(toString_1(message));
        }
        return Unit_instance;
    }
    function boundsErrorMessage(from, until) {
        return 'Random range is empty: [' + toString_1(from) + ', ' + toString_1(until) + ').';
    }
    function Random_0(seed) {
        return XorWowRandom_init_$Create$(seed, seed >> 31);
    }
    function takeUpperBits(_this__u8e3s4, bitCount) {
        return (_this__u8e3s4 >>> (32 - bitCount | 0) | 0) & (-bitCount | 0) >> 31;
    }
    function XorWowRandom_init_$Init$(seed1, seed2, $this) {
        XorWowRandom.call($this, seed1, seed2, 0, 0, ~seed1, seed1 << 10 ^ (seed2 >>> 4 | 0));
        return $this;
    }
    function XorWowRandom_init_$Create$(seed1, seed2) {
        return XorWowRandom_init_$Init$(seed1, seed2, objectCreate(protoOf(XorWowRandom)));
    }
    function checkInvariants($this) {
        if (!!(($this.ge_1 | $this.he_1 | $this.ie_1 | $this.je_1 | $this.ke_1) === 0)) {
            var message = 'Initial state must have at least one non-zero element.';
            throw IllegalArgumentException_init_$Create$_0(toString_1(message));
        }
    }
    function Companion_7() {
        Companion_instance_7 = this;
        this.me_1 = new Long(0, 0);
    }
    var Companion_instance_7;
    function Companion_getInstance_7() {
        if (Companion_instance_7 == null) {
            Default_getInstance();
            new Companion_7;
        }
        return Companion_instance_7;
    }
    function XorWowRandom(x, y, z, w, v, addend) {
        Companion_getInstance_7();
        Random.call(this);
        this.ge_1 = x;
        this.he_1 = y;
        this.ie_1 = z;
        this.je_1 = w;
        this.ke_1 = v;
        this.le_1 = addend;
        checkInvariants(this);
        var inductionVariable = 0;
        if (inductionVariable < 64) do {
            var index = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            this.ub();
        } while (inductionVariable < 64);
    }
    protoOf(XorWowRandom).ub = function() {
        var t = this.ge_1;
        t = t ^ (t >>> 2 | 0);
        this.ge_1 = this.he_1;
        this.he_1 = this.ie_1;
        this.ie_1 = this.je_1;
        var v0 = this.ke_1;
        this.je_1 = v0;
        t = t ^ t << 1 ^ v0 ^ v0 << 4;
        this.ke_1 = t;
        this.le_1 = this.le_1 + 362437 | 0;
        return t + this.le_1 | 0;
    };
    protoOf(XorWowRandom).be = function(bitCount) {
        return takeUpperBits(this.ub(), bitCount);
    };
    function Companion_8() {
        Companion_instance_8 = this;
        this.u_1 = new IntRange(1, 0);
    }
    var Companion_instance_8;
    function Companion_getInstance_8() {
        if (Companion_instance_8 == null) {
            Companion_instance_9;
            new Companion_8;
        }
        return Companion_instance_8;
    }
    function IntRange(start, endInclusive) {
        Companion_getInstance_8();
        IntProgression.call(this, start, endInclusive, 1);
    }
    protoOf(IntRange).qe = function() {
        return this.w_1;
    };
    protoOf(IntRange).re = function() {
        return this.x_1;
    };
    protoOf(IntRange).se = function(value) {
        return this.w_1 <= value && value <= this.x_1;
    };
    protoOf(IntRange).z = function(value) {
        return this.se(typeof value === 'number' ? value : THROW_CCE());
    };
    protoOf(IntRange).n = function() {
        return this.w_1 > this.x_1;
    };
    protoOf(IntRange).equals = function(other) {
        var tmp;
        if (other instanceof IntRange) {
            tmp = this.n() && other.n() || this.w_1 === other.w_1 && this.x_1 === other.x_1;
        } else {
            tmp = false;
        }
        return tmp;
    };
    protoOf(IntRange).hashCode = function() {
        return this.n() ? -1 : imul(31, this.w_1) + this.x_1 | 0;
    };
    protoOf(IntRange).toString = function() {
        return '' + this.w_1 + '..' + this.x_1;
    };
    function IntProgressionIterator(first, last, step) {
        IntIterator.call(this);
        this.te_1 = step;
        this.ue_1 = last;
        this.ve_1 = this.te_1 > 0 ? first <= last : first >= last;
        this.we_1 = this.ve_1 ? first : this.ue_1;
    }
    protoOf(IntProgressionIterator).k = function() {
        return this.ve_1;
    };
    protoOf(IntProgressionIterator).ub = function() {
        var value = this.we_1;
        if (value === this.ue_1) {
            if (!this.ve_1) throw NoSuchElementException_init_$Create$();
            this.ve_1 = false;
        } else {
            this.we_1 = this.we_1 + this.te_1 | 0;
        }
        return value;
    };
    function Companion_9() {}
    protoOf(Companion_9).v = function(rangeStart, rangeEnd, step) {
        return new IntProgression(rangeStart, rangeEnd, step);
    };
    var Companion_instance_9;
    function Companion_getInstance_9() {
        return Companion_instance_9;
    }
    function IntProgression(start, endInclusive, step) {
        if (step === 0) throw IllegalArgumentException_init_$Create$_0('Step must be non-zero.');
        if (step === -2147483648) throw IllegalArgumentException_init_$Create$_0('Step must be greater than Int.MIN_VALUE to avoid overflow on negation.');
        this.w_1 = start;
        this.x_1 = getProgressionLastElement(start, endInclusive, step);
        this.y_1 = step;
    }
    protoOf(IntProgression).j = function() {
        return new IntProgressionIterator(this.w_1, this.x_1, this.y_1);
    };
    protoOf(IntProgression).n = function() {
        return this.y_1 > 0 ? this.w_1 > this.x_1 : this.w_1 < this.x_1;
    };
    protoOf(IntProgression).equals = function(other) {
        var tmp;
        if (other instanceof IntProgression) {
            tmp = this.n() && other.n() || this.w_1 === other.w_1 && this.x_1 === other.x_1 && this.y_1 === other.y_1;
        } else {
            tmp = false;
        }
        return tmp;
    };
    protoOf(IntProgression).hashCode = function() {
        return this.n() ? -1 : imul(31, imul(31, this.w_1) + this.x_1 | 0) + this.y_1 | 0;
    };
    protoOf(IntProgression).toString = function() {
        return this.y_1 > 0 ? '' + this.w_1 + '..' + this.x_1 + ' step ' + this.y_1 : '' + this.w_1 + ' downTo ' + this.x_1 + ' step ' + (-this.y_1 | 0);
    };
    function ClosedRange() {}
    function checkStepIsPositive(isPositive, step) {
        if (!isPositive) throw IllegalArgumentException_init_$Create$_0('Step must be positive, was: ' + toString_1(step) + '.');
    }
    function appendElement(_this__u8e3s4, element, transform) {
        if (!(transform == null)) _this__u8e3s4.e(transform(element)); else {
            if (element == null ? true : isCharSequence(element)) _this__u8e3s4.e(element); else {
                if (element instanceof Char) _this__u8e3s4.z6(element.a1_1); else {
                    _this__u8e3s4.e(toString_1(element));
                }
            }
        }
    }
    function equals_1(_this__u8e3s4, other, ignoreCase) {
        ignoreCase = ignoreCase === VOID ? false : ignoreCase;
        if (_this__u8e3s4 === other) return true;
        if (!ignoreCase) return false;
        var thisUpper = uppercaseChar(_this__u8e3s4);
        var otherUpper = uppercaseChar(other);
        var tmp;
        if (thisUpper === otherUpper) {
            tmp = true;
        } else {
            var tmp$ret$1 = toString(thisUpper).toLowerCase();
            var tmp_0 = charCodeAt(tmp$ret$1, 0);
            var tmp$ret$5 = toString(otherUpper).toLowerCase();
            tmp = tmp_0 === charCodeAt(tmp$ret$5, 0);
        }
        return tmp;
    }
    function get_BYTE_TO_LOWER_CASE_HEX_DIGITS() {
        _init_properties_HexExtensions_kt__wu8rc3();
        return BYTE_TO_LOWER_CASE_HEX_DIGITS;
    }
    var BYTE_TO_LOWER_CASE_HEX_DIGITS;
    var BYTE_TO_UPPER_CASE_HEX_DIGITS;
    function get_HEX_DIGITS_TO_DECIMAL() {
        _init_properties_HexExtensions_kt__wu8rc3();
        return HEX_DIGITS_TO_DECIMAL;
    }
    var HEX_DIGITS_TO_DECIMAL;
    var HEX_DIGITS_TO_LONG_DECIMAL;
    function access$_get_HEX_DIGITS_TO_DECIMAL_$tHexExtensionsKt_n4nhcp() {
        return get_HEX_DIGITS_TO_DECIMAL();
    }
    var properties_initialized_HexExtensions_kt_h16sbl;
    function _init_properties_HexExtensions_kt__wu8rc3() {
        if (!properties_initialized_HexExtensions_kt_h16sbl) {
            properties_initialized_HexExtensions_kt_h16sbl = true;
            var tmp = 0;
            var tmp_0 = new Int32Array(256);
            while (tmp < 256) {
                var tmp_1 = tmp;
                var this_0 = charCodeAt('0123456789abcdef', tmp_1 >> 4);
                var tmp_2 = Char__toInt_impl_vasixd(this_0) << 8;
                var this_1 = charCodeAt('0123456789abcdef', tmp_1 & 15);
                tmp_0[tmp_1] = tmp_2 | Char__toInt_impl_vasixd(this_1);
                tmp = tmp + 1 | 0;
            }
            BYTE_TO_LOWER_CASE_HEX_DIGITS = tmp_0;
            var tmp_3 = 0;
            var tmp_4 = new Int32Array(256);
            while (tmp_3 < 256) {
                var tmp_5 = tmp_3;
                var this_2 = charCodeAt('0123456789ABCDEF', tmp_5 >> 4);
                var tmp_6 = Char__toInt_impl_vasixd(this_2) << 8;
                var this_3 = charCodeAt('0123456789ABCDEF', tmp_5 & 15);
                tmp_4[tmp_5] = tmp_6 | Char__toInt_impl_vasixd(this_3);
                tmp_3 = tmp_3 + 1 | 0;
            }
            BYTE_TO_UPPER_CASE_HEX_DIGITS = tmp_4;
            var tmp_7 = 0;
            var tmp_8 = new Int32Array(256);
            while (tmp_7 < 256) {
                tmp_8[tmp_7] = -1;
                tmp_7 = tmp_7 + 1 | 0;
            }
            var index = 0;
            var indexedObject = '0123456789abcdef';
            var inductionVariable = 0;
            while (inductionVariable < charSequenceLength(indexedObject)) {
                var item = charSequenceGet(indexedObject, inductionVariable);
                inductionVariable = inductionVariable + 1 | 0;
                var _unary__edvuaz = index;
                index = _unary__edvuaz + 1 | 0;
                tmp_8[Char__toInt_impl_vasixd(item)] = _unary__edvuaz;
            }
            var index_0 = 0;
            var indexedObject_0 = '0123456789ABCDEF';
            var inductionVariable_0 = 0;
            while (inductionVariable_0 < charSequenceLength(indexedObject_0)) {
                var item_0 = charSequenceGet(indexedObject_0, inductionVariable_0);
                inductionVariable_0 = inductionVariable_0 + 1 | 0;
                var _unary__edvuaz_0 = index_0;
                index_0 = _unary__edvuaz_0 + 1 | 0;
                tmp_8[Char__toInt_impl_vasixd(item_0)] = _unary__edvuaz_0;
            }
            HEX_DIGITS_TO_DECIMAL = tmp_8;
            var tmp_9 = 0;
            var tmp_10 = longArray(256);
            while (tmp_9 < 256) {
                tmp_10[tmp_9] = new Long(-1, -1);
                tmp_9 = tmp_9 + 1 | 0;
            }
            var index_1 = 0;
            var indexedObject_1 = '0123456789abcdef';
            var inductionVariable_1 = 0;
            while (inductionVariable_1 < charSequenceLength(indexedObject_1)) {
                var item_1 = charSequenceGet(indexedObject_1, inductionVariable_1);
                inductionVariable_1 = inductionVariable_1 + 1 | 0;
                var _unary__edvuaz_1 = index_1;
                index_1 = _unary__edvuaz_1 + 1 | 0;
                tmp_10[Char__toInt_impl_vasixd(item_1)] = fromInt(_unary__edvuaz_1);
            }
            var index_2 = 0;
            var indexedObject_2 = '0123456789ABCDEF';
            var inductionVariable_2 = 0;
            while (inductionVariable_2 < charSequenceLength(indexedObject_2)) {
                var item_2 = charSequenceGet(indexedObject_2, inductionVariable_2);
                inductionVariable_2 = inductionVariable_2 + 1 | 0;
                var _unary__edvuaz_2 = index_2;
                index_2 = _unary__edvuaz_2 + 1 | 0;
                tmp_10[Char__toInt_impl_vasixd(item_2)] = fromInt(_unary__edvuaz_2);
            }
            HEX_DIGITS_TO_LONG_DECIMAL = tmp_10;
        }
    }
    function trimIndent(_this__u8e3s4) {
        return replaceIndent(_this__u8e3s4, '');
    }
    function replaceIndent(_this__u8e3s4, newIndent) {
        newIndent = newIndent === VOID ? '' : newIndent;
        var lines_0 = lines(_this__u8e3s4);
        var destination = ArrayList_init_$Create$();
        var _iterator__ex2g4s = lines_0.j();
        while (_iterator__ex2g4s.k()) {
            var element = _iterator__ex2g4s.l();
            if (!isBlank(element)) {
                destination.i(element);
            }
        }
        var destination_0 = ArrayList_init_$Create$_0(collectionSizeOrDefault(destination, 10));
        var _iterator__ex2g4s_0 = destination.j();
        while (_iterator__ex2g4s_0.k()) {
            var item = _iterator__ex2g4s_0.l();
            var tmp$ret$6 = indentWidth(item);
            destination_0.i(tmp$ret$6);
        }
        var tmp0_elvis_lhs = minOrNull(destination_0);
        var minCommonIndent = tmp0_elvis_lhs == null ? 0 : tmp0_elvis_lhs;
        var tmp2 = _this__u8e3s4.length + imul(newIndent.length, lines_0.m()) | 0;
        var indentAddFunction = getIndentFunction(newIndent);
        var lastIndex = get_lastIndex_2(lines_0);
        var destination_1 = ArrayList_init_$Create$();
        var index = 0;
        var _iterator__ex2g4s_1 = lines_0.j();
        while (_iterator__ex2g4s_1.k()) {
            var item_0 = _iterator__ex2g4s_1.l();
            var _unary__edvuaz = index;
            index = _unary__edvuaz + 1 | 0;
            var index_0 = checkIndexOverflow(_unary__edvuaz);
            var tmp;
            if ((index_0 === 0 || index_0 === lastIndex) && isBlank(item_0)) {
                tmp = null;
            } else {
                var tmp0_safe_receiver = drop_0(item_0, minCommonIndent);
                var tmp_0;
                if (tmp0_safe_receiver == null) {
                    tmp_0 = null;
                } else {
                    tmp_0 = indentAddFunction(tmp0_safe_receiver);
                }
                var tmp1_elvis_lhs = tmp_0;
                tmp = tmp1_elvis_lhs == null ? item_0 : tmp1_elvis_lhs;
            }
            var tmp0_safe_receiver_0 = tmp;
            if (tmp0_safe_receiver_0 == null) null; else {
                destination_1.i(tmp0_safe_receiver_0);
            }
        }
        return joinTo_0(destination_1, StringBuilder_init_$Create$(tmp2), '\n').toString();
    }
    function indentWidth(_this__u8e3s4) {
        var tmp$ret$0;
        $l$block: {
            var inductionVariable = 0;
            var last = charSequenceLength(_this__u8e3s4) - 1 | 0;
            if (inductionVariable <= last) do {
                var index = inductionVariable;
                inductionVariable = inductionVariable + 1 | 0;
                var it = charSequenceGet(_this__u8e3s4, index);
                if (!isWhitespace(it)) {
                    tmp$ret$0 = index;
                    break $l$block;
                }
            } while (inductionVariable <= last);
            tmp$ret$0 = -1;
        }
        var it_0 = tmp$ret$0;
        return it_0 === -1 ? _this__u8e3s4.length : it_0;
    }
    function getIndentFunction(indent) {
        var tmp;
        if (charSequenceLength(indent) === 0) {
            tmp = getIndentFunction$lambda;
        } else {
            tmp = getIndentFunction$lambda_0(indent);
        }
        return tmp;
    }
    function getIndentFunction$lambda(line) {
        return line;
    }
    function getIndentFunction$lambda_0($indent) {
        return function(line) {
            return $indent + line;
        };
    }
    function toIntOrNull(_this__u8e3s4) {
        return toIntOrNull_0(_this__u8e3s4, 10);
    }
    function toIntOrNull_0(_this__u8e3s4, radix) {
        checkRadix(radix);
        var length = _this__u8e3s4.length;
        if (length === 0) return null;
        var start;
        var isNegative;
        var limit;
        var firstChar = charCodeAt(_this__u8e3s4, 0);
        if (Char__compareTo_impl_ypi4mb(firstChar, _Char___init__impl__6a9atx(48)) < 0) {
            if (length === 1) return null;
            start = 1;
            if (firstChar === _Char___init__impl__6a9atx(45)) {
                isNegative = true;
                limit = -2147483648;
            } else if (firstChar === _Char___init__impl__6a9atx(43)) {
                isNegative = false;
                limit = -2147483647;
            } else return null;
        } else {
            start = 0;
            isNegative = false;
            limit = -2147483647;
        }
        var limitForMaxRadix = -59652323;
        var limitBeforeMul = limitForMaxRadix;
        var result = 0;
        var inductionVariable = start;
        if (inductionVariable < length) do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var digit = digitOf(charCodeAt(_this__u8e3s4, i), radix);
            if (digit < 0) return null;
            if (result < limitBeforeMul) {
                if (limitBeforeMul === limitForMaxRadix) {
                    limitBeforeMul = limit / radix | 0;
                    if (result < limitBeforeMul) {
                        return null;
                    }
                } else {
                    return null;
                }
            }
            result = imul(result, radix);
            if (result < (limit + digit | 0)) return null;
            result = result - digit | 0;
        } while (inductionVariable < length);
        return isNegative ? result : -result | 0;
    }
    function numberFormatError(input) {
        throw NumberFormatException_init_$Create$_0("Invalid number format: '" + input + "'");
    }
    function padStart(_this__u8e3s4, length, padChar) {
        padChar = padChar === VOID ? _Char___init__impl__6a9atx(32) : padChar;
        return toString_1(padStart_0(isCharSequence(_this__u8e3s4) ? _this__u8e3s4 : THROW_CCE(), length, padChar));
    }
    function get_lastIndex_3(_this__u8e3s4) {
        return charSequenceLength(_this__u8e3s4) - 1 | 0;
    }
    function isBlank(_this__u8e3s4) {
        var tmp$ret$0;
        $l$block: {
            var inductionVariable = 0;
            while (inductionVariable < charSequenceLength(_this__u8e3s4)) {
                var element = charSequenceGet(_this__u8e3s4, inductionVariable);
                inductionVariable = inductionVariable + 1 | 0;
                if (!isWhitespace(element)) {
                    tmp$ret$0 = false;
                    break $l$block;
                }
            }
            tmp$ret$0 = true;
        }
        return tmp$ret$0;
    }
    function trim(_this__u8e3s4) {
        var startIndex = 0;
        var endIndex = charSequenceLength(_this__u8e3s4) - 1 | 0;
        var startFound = false;
        $l$loop: while (startIndex <= endIndex) {
            var index = !startFound ? startIndex : endIndex;
            var p0 = charSequenceGet(_this__u8e3s4, index);
            var match = isWhitespace(p0);
            if (!startFound) {
                if (!match) startFound = true; else startIndex = startIndex + 1 | 0;
            } else {
                if (!match) break $l$loop; else endIndex = endIndex - 1 | 0;
            }
        }
        return charSequenceSubSequence(_this__u8e3s4, startIndex, endIndex + 1 | 0);
    }
    function padStart_0(_this__u8e3s4, length, padChar) {
        padChar = padChar === VOID ? _Char___init__impl__6a9atx(32) : padChar;
        if (length < 0) throw IllegalArgumentException_init_$Create$_0('Desired length ' + length + ' is less than zero.');
        if (length <= charSequenceLength(_this__u8e3s4)) return charSequenceSubSequence(_this__u8e3s4, 0, charSequenceLength(_this__u8e3s4));
        var sb = StringBuilder_init_$Create$(length);
        var inductionVariable = 1;
        var last = length - charSequenceLength(_this__u8e3s4) | 0;
        if (inductionVariable <= last) do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            sb.z6(padChar);
        } while (!(i === last));
        sb.e(_this__u8e3s4);
        return sb;
    }
    function regionMatchesImpl(_this__u8e3s4, thisOffset, other, otherOffset, length, ignoreCase) {
        if (otherOffset < 0 || thisOffset < 0 || thisOffset > (charSequenceLength(_this__u8e3s4) - length | 0) || otherOffset > (charSequenceLength(other) - length | 0)) {
            return false;
        }
        var inductionVariable = 0;
        if (inductionVariable < length) do {
            var index = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            if (!equals_1(charSequenceGet(_this__u8e3s4, thisOffset + index | 0), charSequenceGet(other, otherOffset + index | 0), ignoreCase)) return false;
        } while (inductionVariable < length);
        return true;
    }
    function indexOf_0(_this__u8e3s4, char, startIndex, ignoreCase) {
        startIndex = startIndex === VOID ? 0 : startIndex;
        ignoreCase = ignoreCase === VOID ? false : ignoreCase;
        var tmp;
        var tmp_0;
        if (ignoreCase) {
            tmp_0 = true;
        } else {
            tmp_0 = !(typeof _this__u8e3s4 === 'string');
        }
        if (tmp_0) {
            var tmp$ret$0 = charArrayOf([ char ]);
            tmp = indexOfAny(_this__u8e3s4, tmp$ret$0, startIndex, ignoreCase);
        } else {
            var str = toString(char);
            tmp = _this__u8e3s4.indexOf(str, startIndex);
        }
        return tmp;
    }
    function contains_1(_this__u8e3s4, other, ignoreCase) {
        ignoreCase = ignoreCase === VOID ? false : ignoreCase;
        var tmp;
        if (typeof other === 'string') {
            tmp = indexOf_1(_this__u8e3s4, other, VOID, ignoreCase) >= 0;
        } else {
            tmp = indexOf_2(_this__u8e3s4, other, 0, charSequenceLength(_this__u8e3s4), ignoreCase) >= 0;
        }
        return tmp;
    }
    function lastIndexOf(_this__u8e3s4, string, startIndex, ignoreCase) {
        startIndex = startIndex === VOID ? get_lastIndex_3(_this__u8e3s4) : startIndex;
        ignoreCase = ignoreCase === VOID ? false : ignoreCase;
        var tmp;
        var tmp_0;
        if (ignoreCase) {
            tmp_0 = true;
        } else {
            tmp_0 = !(typeof _this__u8e3s4 === 'string');
        }
        if (tmp_0) {
            tmp = indexOf_2(_this__u8e3s4, string, startIndex, 0, ignoreCase, true);
        } else {
            tmp = _this__u8e3s4.lastIndexOf(string, startIndex);
        }
        return tmp;
    }
    function indexOf_1(_this__u8e3s4, string, startIndex, ignoreCase) {
        startIndex = startIndex === VOID ? 0 : startIndex;
        ignoreCase = ignoreCase === VOID ? false : ignoreCase;
        var tmp;
        var tmp_0;
        if (ignoreCase) {
            tmp_0 = true;
        } else {
            tmp_0 = !(typeof _this__u8e3s4 === 'string');
        }
        if (tmp_0) {
            tmp = indexOf_2(_this__u8e3s4, string, startIndex, charSequenceLength(_this__u8e3s4), ignoreCase);
        } else {
            tmp = _this__u8e3s4.indexOf(string, startIndex);
        }
        return tmp;
    }
    function indexOfAny(_this__u8e3s4, chars, startIndex, ignoreCase) {
        startIndex = startIndex === VOID ? 0 : startIndex;
        ignoreCase = ignoreCase === VOID ? false : ignoreCase;
        var tmp;
        if (!ignoreCase && chars.length === 1) {
            tmp = typeof _this__u8e3s4 === 'string';
        } else {
            tmp = false;
        }
        if (tmp) {
            var char = single(chars);
            var str = toString(char);
            return _this__u8e3s4.indexOf(str, startIndex);
        }
        var inductionVariable = coerceAtLeast(startIndex, 0);
        var last = get_lastIndex_3(_this__u8e3s4);
        if (inductionVariable <= last) do {
            var index = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var charAtIndex = charSequenceGet(_this__u8e3s4, index);
            var tmp$ret$3;
            $l$block: {
                var inductionVariable_0 = 0;
                var last_0 = chars.length;
                while (inductionVariable_0 < last_0) {
                    var element = chars[inductionVariable_0];
                    inductionVariable_0 = inductionVariable_0 + 1 | 0;
                    if (equals_1(element, charAtIndex, ignoreCase)) {
                        tmp$ret$3 = true;
                        break $l$block;
                    }
                }
                tmp$ret$3 = false;
            }
            if (tmp$ret$3) return index;
        } while (!(index === last));
        return -1;
    }
    function indexOf_2(_this__u8e3s4, other, startIndex, endIndex, ignoreCase, last) {
        last = last === VOID ? false : last;
        var indices = !last ? numberRangeToNumber(coerceAtLeast(startIndex, 0), coerceAtMost(endIndex, charSequenceLength(_this__u8e3s4))) : downTo(coerceAtMost(startIndex, get_lastIndex_3(_this__u8e3s4)), coerceAtLeast(endIndex, 0));
        var tmp;
        if (typeof _this__u8e3s4 === 'string') {
            tmp = typeof other === 'string';
        } else {
            tmp = false;
        }
        if (tmp) {
            var inductionVariable = indices.w_1;
            var last_0 = indices.x_1;
            var step = indices.y_1;
            if (step > 0 && inductionVariable <= last_0 || step < 0 && last_0 <= inductionVariable) do {
                var index = inductionVariable;
                inductionVariable = inductionVariable + step | 0;
                if (regionMatches(other, 0, _this__u8e3s4, index, other.length, ignoreCase)) return index;
            } while (!(index === last_0));
        } else {
            var inductionVariable_0 = indices.w_1;
            var last_1 = indices.x_1;
            var step_0 = indices.y_1;
            if (step_0 > 0 && inductionVariable_0 <= last_1 || step_0 < 0 && last_1 <= inductionVariable_0) do {
                var index_0 = inductionVariable_0;
                inductionVariable_0 = inductionVariable_0 + step_0 | 0;
                if (regionMatchesImpl(other, 0, _this__u8e3s4, index_0, charSequenceLength(other), ignoreCase)) return index_0;
            } while (!(index_0 === last_1));
        }
        return -1;
    }
    function lines(_this__u8e3s4) {
        return toList_2(lineSequence(_this__u8e3s4));
    }
    function lineSequence(_this__u8e3s4) {
        return new lineSequence$$inlined$Sequence$1(_this__u8e3s4);
    }
    function State() {
        this.xe_1 = 0;
        this.ye_1 = 1;
        this.ze_1 = 2;
    }
    var State_instance;
    function State_getInstance() {
        return State_instance;
    }
    function LinesIterator(string) {
        this.af_1 = string;
        this.bf_1 = 0;
        this.cf_1 = 0;
        this.df_1 = 0;
        this.ef_1 = 0;
    }
    protoOf(LinesIterator).k = function() {
        if (!(this.bf_1 === 0)) {
            return this.bf_1 === 1;
        }
        if (this.ef_1 < 0) {
            this.bf_1 = 2;
            return false;
        }
        var _delimiterLength = -1;
        var _delimiterStartIndex = charSequenceLength(this.af_1);
        var inductionVariable = this.cf_1;
        var last = charSequenceLength(this.af_1);
        if (inductionVariable < last) $l$loop: do {
            var idx = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var c = charSequenceGet(this.af_1, idx);
            if (c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13)) {
                _delimiterLength = c === _Char___init__impl__6a9atx(13) && (idx + 1 | 0) < charSequenceLength(this.af_1) && charSequenceGet(this.af_1, idx + 1 | 0) === _Char___init__impl__6a9atx(10) ? 2 : 1;
                _delimiterStartIndex = idx;
                break $l$loop;
            }
        } while (inductionVariable < last);
        this.bf_1 = 1;
        this.ef_1 = _delimiterLength;
        this.df_1 = _delimiterStartIndex;
        return true;
    };
    protoOf(LinesIterator).l = function() {
        if (!this.k()) {
            throw NoSuchElementException_init_$Create$();
        }
        this.bf_1 = 0;
        var lastIndex = this.df_1;
        var firstIndex = this.cf_1;
        this.cf_1 = this.df_1 + this.ef_1 | 0;
        var this_0 = this.af_1;
        return toString_1(charSequenceSubSequence(this_0, firstIndex, lastIndex));
    };
    function lineSequence$$inlined$Sequence$1($this_lineSequence) {
        this.ff_1 = $this_lineSequence;
    }
    protoOf(lineSequence$$inlined$Sequence$1).j = function() {
        return new LinesIterator(this.ff_1);
    };
    function _Duration___init__impl__kdtzql(rawValue) {
        return rawValue;
    }
    function _get_rawValue__5zfu4e($this) {
        return $this;
    }
    function _get_value__a43j40_0($this) {
        return shiftRight(_get_rawValue__5zfu4e($this), 1);
    }
    function isInNanos($this) {
        return (convertToInt(_get_rawValue__5zfu4e($this)) & 1) === 0;
    }
    function isInMillis($this) {
        return (convertToInt(_get_rawValue__5zfu4e($this)) & 1) === 1;
    }
    function _get_storageUnit__szjgha($this) {
        return isInNanos($this) ? DurationUnit_NANOSECONDS_getInstance() : DurationUnit_MILLISECONDS_getInstance();
    }
    function Companion_10() {
        Companion_instance_10 = this;
        this.gf_1 = _Duration___init__impl__kdtzql(new Long(0, 0));
        this.hf_1 = durationOfMillis(new Long(-1, 1073741823));
        this.if_1 = durationOfMillis(new Long(1, -1073741824));
        this.jf_1 = new Long(-16162, 2147483647);
        this.kf_1 = _Duration___init__impl__kdtzql(new Long(-16162, 2147483647));
    }
    protoOf(Companion_10).lf = function(rawValue) {
        var this_0 = new Duration(_Duration___init__impl__kdtzql(rawValue));
        var $this$apply = this_0.mf_1;
        if (true) {
            if (isInNanos($this$apply)) {
                var containsArg = _get_value__a43j40_0($this$apply);
                if (!(compare(new Long(387905, -1073741824), containsArg) <= 0 ? compare(containsArg, new Long(-387905, 1073741823)) <= 0 : false)) throw AssertionError_init_$Create$_0(_get_value__a43j40_0($this$apply).toString() + ' ns is out of nanoseconds range');
            } else {
                var tmp;
                var this_1 = _get_value__a43j40_0($this$apply);
                if (!(compare(new Long(1, -1073741824), this_1) < 0 && compare(this_1, new Long(-1, 1073741823)) < 0)) {
                    var this_2 = _get_value__a43j40_0($this$apply);
                    tmp = !(equalsLong(this_2, new Long(-1, 1073741823)) || equalsLong(this_2, new Long(1, -1073741824)));
                } else {
                    tmp = false;
                }
                if (tmp) throw AssertionError_init_$Create$_0(_get_value__a43j40_0($this$apply).toString() + ' ms is out of milliseconds range');
                var containsArg_0 = _get_value__a43j40_0($this$apply);
                if (compare(new Long(1108857478, -1074), containsArg_0) <= 0 ? compare(containsArg_0, new Long(-1108857478, 1073)) <= 0 : false) throw AssertionError_init_$Create$_0(_get_value__a43j40_0($this$apply).toString() + ' ms is denormalized');
            }
        }
        return this_0.mf_1;
    };
    protoOf(Companion_10).nf = function(value) {
        var tmp;
        try {
            var this_0 = new Duration(parseDuration(value, true));
            var $this$apply = this_0.mf_1;
            if (!!equals(new Duration($this$apply), new Duration(Companion_getInstance_10().kf_1))) {
                var message = 'invariant failed';
                throw IllegalStateException_init_$Create$_0(toString_1(message));
            }
            tmp = this_0.mf_1;
        } catch ($p) {
            var tmp_0;
            if ($p instanceof IllegalArgumentException) {
                var e = $p;
                throw IllegalArgumentException_init_$Create$_1("Invalid ISO duration string format: '" + value + "'.", e);
            } else {
                throw $p;
            }
        }
        return tmp;
    };
    var Companion_instance_10;
    function Companion_getInstance_10() {
        if (Companion_instance_10 == null) new Companion_10;
        return Companion_instance_10;
    }
    function Duration__unaryMinus_impl_x2k1y0($this) {
        var tmp = negate(_get_value__a43j40_0($this));
        var tmp$ret$0 = convertToInt(_get_rawValue__5zfu4e($this)) & 1;
        return durationOf(tmp, tmp$ret$0);
    }
    function Duration__plus_impl_yu9v8f($this, other) {
        var tmp;
        var tmp_0 = convertToInt(_get_rawValue__5zfu4e($this)) & 1;
        if (tmp_0 === (convertToInt(_get_rawValue__5zfu4e(other)) & 1)) {
            var tmp_1;
            if (isInNanos($this)) {
                tmp_1 = durationOfNanosNormalized(add(_get_value__a43j40_0($this), _get_value__a43j40_0(other)));
            } else {
                var it = addMillisWithoutOverflow(_get_value__a43j40_0($this), _get_value__a43j40_0(other));
                var tmp_2;
                if (equalsLong(it, new Long(-16162, 2147483647))) {
                    throw IllegalArgumentException_init_$Create$_0('Summing infinite durations of different signs yields an undefined result.');
                } else {
                    if (equalsLong(it, new Long(-1, 1073741823)) || equalsLong(it, new Long(1, -1073741824))) {
                        tmp_2 = durationOfMillis(it);
                    } else {
                        tmp_2 = durationOfMillisNormalized(it);
                    }
                }
                tmp_1 = tmp_2;
            }
            tmp = tmp_1;
        } else {
            if (isInMillis($this)) {
                tmp = addValuesMixedRanges($this, _get_value__a43j40_0($this), _get_value__a43j40_0(other));
            } else {
                tmp = addValuesMixedRanges($this, _get_value__a43j40_0(other), _get_value__a43j40_0($this));
            }
        }
        return tmp;
    }
    function addValuesMixedRanges($this, thisMillis, otherNanos) {
        var otherMillis = nanosToMillis(otherNanos);
        var resultMillis = addMillisWithoutOverflow(thisMillis, otherMillis);
        var tmp;
        if (compare(new Long(1108857478, -1074), resultMillis) <= 0 ? compare(resultMillis, new Long(-1108857478, 1073)) <= 0 : false) {
            var otherNanoRemainder = subtract(otherNanos, millisToNanos(otherMillis));
            tmp = durationOfNanos(add(millisToNanos(resultMillis), otherNanoRemainder));
        } else {
            tmp = durationOfMillis(resultMillis);
        }
        return tmp;
    }
    function Duration__isNegative_impl_pbysfa($this) {
        return compare(_get_rawValue__5zfu4e($this), new Long(0, 0)) < 0;
    }
    function Duration__isInfinite_impl_tsn9y3($this) {
        return equalsLong(_get_rawValue__5zfu4e($this), _get_rawValue__5zfu4e(Companion_getInstance_10().hf_1)) || equalsLong(_get_rawValue__5zfu4e($this), _get_rawValue__5zfu4e(Companion_getInstance_10().if_1));
    }
    function _Duration___get_absoluteValue__impl__vr7i6w($this) {
        return Duration__isNegative_impl_pbysfa($this) ? Duration__unaryMinus_impl_x2k1y0($this) : $this;
    }
    function Duration__compareTo_impl_pchp0f($this, other) {
        var compareBits = bitwiseXor(_get_rawValue__5zfu4e($this), _get_rawValue__5zfu4e(other));
        if (compare(compareBits, new Long(0, 0)) < 0 || (convertToInt(compareBits) & 1) === 0) return _get_rawValue__5zfu4e($this).j2(_get_rawValue__5zfu4e(other));
        var tmp = convertToInt(_get_rawValue__5zfu4e($this)) & 1;
        var r = tmp - (convertToInt(_get_rawValue__5zfu4e(other)) & 1) | 0;
        return Duration__isNegative_impl_pbysfa($this) ? -r | 0 : r;
    }
    function Duration__compareTo_impl_pchp0f_0($this, other) {
        return Duration__compareTo_impl_pchp0f($this.mf_1, other instanceof Duration ? other.mf_1 : THROW_CCE());
    }
    function _Duration___get_hoursComponent__impl__7hllxa($this) {
        var tmp;
        if (Duration__isInfinite_impl_tsn9y3($this)) {
            tmp = 0;
        } else {
            var this_0 = _Duration___get_inWholeHours__impl__kb9f3j($this);
            var tmp$ret$0 = modulo(this_0, fromInt(24));
            tmp = convertToInt(tmp$ret$0);
        }
        return tmp;
    }
    function _Duration___get_minutesComponent__impl__ctvd8u($this) {
        var tmp;
        if (Duration__isInfinite_impl_tsn9y3($this)) {
            tmp = 0;
        } else {
            var this_0 = _Duration___get_inWholeMinutes__impl__dognoh($this);
            var tmp$ret$0 = modulo(this_0, fromInt(60));
            tmp = convertToInt(tmp$ret$0);
        }
        return tmp;
    }
    function _Duration___get_secondsComponent__impl__if34a6($this) {
        var tmp;
        if (Duration__isInfinite_impl_tsn9y3($this)) {
            tmp = 0;
        } else {
            var this_0 = _Duration___get_inWholeSeconds__impl__hpy7b3($this);
            var tmp$ret$0 = modulo(this_0, fromInt(60));
            tmp = convertToInt(tmp$ret$0);
        }
        return tmp;
    }
    function _Duration___get_nanosecondsComponent__impl__nh19kq($this) {
        var tmp;
        if (Duration__isInfinite_impl_tsn9y3($this)) {
            tmp = 0;
        } else if (isInMillis($this)) {
            var this_0 = _get_value__a43j40_0($this);
            var tmp$ret$0 = modulo(this_0, fromInt(1e3));
            tmp = convertToInt(millisToNanos(tmp$ret$0));
        } else {
            var tmp0 = _get_value__a43j40_0($this);
            var other = 1e9;
            var tmp$ret$1 = modulo(tmp0, fromInt(other));
            tmp = convertToInt(tmp$ret$1);
        }
        return tmp;
    }
    function Duration__toLong_impl_shr43i($this, unit) {
        var tmp0_subject = _get_rawValue__5zfu4e($this);
        return equalsLong(tmp0_subject, _get_rawValue__5zfu4e(Companion_getInstance_10().hf_1)) ? new Long(-1, 2147483647) : equalsLong(tmp0_subject, _get_rawValue__5zfu4e(Companion_getInstance_10().if_1)) ? new Long(0, -2147483648) : convertDurationUnit(_get_value__a43j40_0($this), _get_storageUnit__szjgha($this), unit);
    }
    function _Duration___get_inWholeDays__impl__7bvpxz($this) {
        return Duration__toLong_impl_shr43i($this, DurationUnit_DAYS_getInstance());
    }
    function _Duration___get_inWholeHours__impl__kb9f3j($this) {
        return Duration__toLong_impl_shr43i($this, DurationUnit_HOURS_getInstance());
    }
    function _Duration___get_inWholeMinutes__impl__dognoh($this) {
        return Duration__toLong_impl_shr43i($this, DurationUnit_MINUTES_getInstance());
    }
    function _Duration___get_inWholeSeconds__impl__hpy7b3($this) {
        return Duration__toLong_impl_shr43i($this, DurationUnit_SECONDS_getInstance());
    }
    function Duration__toString_impl_8d916b($this) {
        var tmp0_subject = _get_rawValue__5zfu4e($this);
        var tmp;
        if (equalsLong(tmp0_subject, new Long(0, 0))) {
            tmp = '0s';
        } else if (equalsLong(tmp0_subject, _get_rawValue__5zfu4e(Companion_getInstance_10().hf_1))) {
            tmp = 'Infinity';
        } else if (equalsLong(tmp0_subject, _get_rawValue__5zfu4e(Companion_getInstance_10().if_1))) {
            tmp = '-Infinity';
        } else {
            var isNegative = Duration__isNegative_impl_pbysfa($this);
            var this_0 = StringBuilder_init_$Create$_0();
            if (isNegative) {
                this_0.z6(_Char___init__impl__6a9atx(45));
            }
            var this_1 = _Duration___get_absoluteValue__impl__vr7i6w($this);
            var tmp0 = _Duration___get_inWholeDays__impl__7bvpxz(this_1);
            var tmp2 = _Duration___get_hoursComponent__impl__7hllxa(this_1);
            var tmp4 = _Duration___get_minutesComponent__impl__ctvd8u(this_1);
            var tmp6 = _Duration___get_secondsComponent__impl__if34a6(this_1);
            var nanoseconds = _Duration___get_nanosecondsComponent__impl__nh19kq(this_1);
            var hasDays = !equalsLong(tmp0, new Long(0, 0));
            var hasHours = !(tmp2 === 0);
            var hasMinutes = !(tmp4 === 0);
            var hasSeconds = !(tmp6 === 0) || !(nanoseconds === 0);
            var components = 0;
            if (hasDays) {
                this_0.ca(tmp0).z6(_Char___init__impl__6a9atx(100));
                components = components + 1 | 0;
            }
            if (hasHours || hasDays && (hasMinutes || hasSeconds)) {
                var _unary__edvuaz = components;
                components = _unary__edvuaz + 1 | 0;
                if (_unary__edvuaz > 0) {
                    this_0.z6(_Char___init__impl__6a9atx(32));
                }
                this_0.ba(tmp2).z6(_Char___init__impl__6a9atx(104));
            }
            if (hasMinutes || hasSeconds && (hasHours || hasDays)) {
                var _unary__edvuaz_0 = components;
                components = _unary__edvuaz_0 + 1 | 0;
                if (_unary__edvuaz_0 > 0) {
                    this_0.z6(_Char___init__impl__6a9atx(32));
                }
                this_0.ba(tmp4).z6(_Char___init__impl__6a9atx(109));
            }
            if (hasSeconds) {
                var _unary__edvuaz_1 = components;
                components = _unary__edvuaz_1 + 1 | 0;
                if (_unary__edvuaz_1 > 0) {
                    this_0.z6(_Char___init__impl__6a9atx(32));
                }
                if (!(tmp6 === 0) || hasDays || hasHours || hasMinutes) {
                    appendFractional($this, this_0, tmp6, nanoseconds, 9, 's', false);
                } else if (nanoseconds >= 1e6) {
                    appendFractional($this, this_0, nanoseconds / 1e6 | 0, nanoseconds % 1e6 | 0, 6, 'ms', false);
                } else if (nanoseconds >= 1e3) {
                    appendFractional($this, this_0, nanoseconds / 1e3 | 0, nanoseconds % 1e3 | 0, 3, 'us', false);
                } else this_0.ba(nanoseconds).y6('ns');
            }
            if (isNegative && components > 1) {
                this_0.da(1, _Char___init__impl__6a9atx(40)).z6(_Char___init__impl__6a9atx(41));
            }
            tmp = this_0.toString();
        }
        return tmp;
    }
    function appendFractional($this, $receiver, whole, fractional, fractionalSize, unit, isoZeroes) {
        $receiver.ba(whole);
        if (!(fractional === 0)) {
            $receiver.z6(_Char___init__impl__6a9atx(46));
            var fracString = padStart(fractional.toString(), fractionalSize, _Char___init__impl__6a9atx(48));
            var tmp$ret$0;
            $l$block: {
                var inductionVariable = charSequenceLength(fracString) - 1 | 0;
                if (0 <= inductionVariable) do {
                    var index = inductionVariable;
                    inductionVariable = inductionVariable + -1 | 0;
                    if (!(charSequenceGet(fracString, index) === _Char___init__impl__6a9atx(48))) {
                        tmp$ret$0 = index;
                        break $l$block;
                    }
                } while (0 <= inductionVariable);
                tmp$ret$0 = -1;
            }
            var nonZeroDigits = tmp$ret$0 + 1 | 0;
            if (!isoZeroes && nonZeroDigits < 3) {
                $receiver.aa(fracString, 0, nonZeroDigits);
            } else {
                var endIndex = imul((nonZeroDigits + 2 | 0) / 3 | 0, 3);
                $receiver.aa(fracString, 0, endIndex);
            }
        }
        $receiver.y6(unit);
    }
    function Duration__hashCode_impl_u4exz6($this) {
        return $this.hashCode();
    }
    function Duration__equals_impl_ygj6w6($this, other) {
        if (!(other instanceof Duration)) return false;
        var tmp0_other_with_cast = other.mf_1;
        if (!equalsLong($this, tmp0_other_with_cast)) return false;
        return true;
    }
    function Duration(rawValue) {
        Companion_getInstance_10();
        this.mf_1 = rawValue;
    }
    protoOf(Duration).of = function(other) {
        return Duration__compareTo_impl_pchp0f(this.mf_1, other);
    };
    protoOf(Duration).d = function(other) {
        return Duration__compareTo_impl_pchp0f_0(this, other);
    };
    protoOf(Duration).toString = function() {
        return Duration__toString_impl_8d916b(this.mf_1);
    };
    protoOf(Duration).hashCode = function() {
        return Duration__hashCode_impl_u4exz6(this.mf_1);
    };
    protoOf(Duration).equals = function(other) {
        return Duration__equals_impl_ygj6w6(this.mf_1, other);
    };
    function durationOfMillis(normalMillis) {
        var tmp = Companion_getInstance_10();
        var this_0 = shiftLeft(normalMillis, 1);
        var tmp$ret$0 = add(this_0, fromInt(1));
        return tmp.lf(tmp$ret$0);
    }
    function toDuration(_this__u8e3s4, unit) {
        var maxNsInUnit = convertDurationUnitOverflow(new Long(-387905, 1073741823), DurationUnit_NANOSECONDS_getInstance(), unit);
        var tmp;
        if (compare(negate(maxNsInUnit), _this__u8e3s4) <= 0 ? compare(_this__u8e3s4, maxNsInUnit) <= 0 : false) {
            tmp = durationOfNanos(convertDurationUnitOverflow(_this__u8e3s4, unit, DurationUnit_NANOSECONDS_getInstance()));
        } else if (unit.c2(DurationUnit_MILLISECONDS_getInstance()) >= 0) {
            var tmp_0 = get_sign(_this__u8e3s4);
            var this_0 = new Long(0, -2147483648);
            var tmp$ret$0 = add(this_0, fromInt(1));
            tmp = durationOfMillis(multiply(numberToLong(tmp_0), convertDurationUnitToMilliseconds(abs_1(coerceAtLeast_0(_this__u8e3s4, tmp$ret$0)), unit)));
        } else {
            tmp = durationOfMillis(coerceIn_0(convertDurationUnit(_this__u8e3s4, unit, DurationUnit_MILLISECONDS_getInstance()), new Long(1, -1073741824), new Long(-1, 1073741823)));
        }
        return tmp;
    }
    function parseDuration(value, strictIso, throwException) {
        throwException = throwException === VOID ? true : throwException;
        if (charSequenceLength(value) === 0) {
            var message = 'The string is empty';
            if (throwException) throw IllegalArgumentException_init_$Create$_0(message);
            return Companion_getInstance_10().kf_1;
        }
        var index = 0;
        var firstChar = charCodeAt(value, index);
        var isNegative = false;
        if (firstChar === _Char___init__impl__6a9atx(45)) {
            isNegative = true;
            index = index + 1 | 0;
        } else if (firstChar === _Char___init__impl__6a9atx(43)) {
            index = index + 1 | 0;
        }
        var hasSign = index > 0;
        var tmp;
        if (value.length <= index) {
            var message_0 = 'No components';
            if (throwException) throw IllegalArgumentException_init_$Create$_0(message_0);
            return Companion_getInstance_10().kf_1;
        } else {
            if (charCodeAt(value, index) === _Char___init__impl__6a9atx(80)) {
                tmp = parseIsoStringFormat(value, index + 1 | 0, throwException);
            } else {
                if (strictIso) {
                    if (throwException) throw IllegalArgumentException_init_$Create$_0('');
                    return Companion_getInstance_10().kf_1;
                } else {
                    var tmp_0 = index;
                    var a = value.length - index | 0;
                    var tmp$ret$4 = Math.max(a, 8);
                    if (regionMatches(value, tmp_0, 'Infinity', 0, tmp$ret$4, true)) {
                        tmp = Companion_getInstance_10().hf_1;
                    } else {
                        tmp = parseDefaultStringFormat(value, index, hasSign, throwException);
                    }
                }
            }
        }
        var result = tmp;
        return isNegative && !equals(new Duration(result), new Duration(Companion_getInstance_10().kf_1)) ? Duration__unaryMinus_impl_x2k1y0(result) : result;
    }
    function durationOf(normalValue, unitDiscriminator) {
        var tmp = Companion_getInstance_10();
        var this_0 = shiftLeft(normalValue, 1);
        var tmp$ret$0 = add(this_0, fromInt(unitDiscriminator));
        return tmp.lf(tmp$ret$0);
    }
    function durationOfNanosNormalized(nanos) {
        var tmp;
        if (compare(new Long(387905, -1073741824), nanos) <= 0 ? compare(nanos, new Long(-387905, 1073741823)) <= 0 : false) {
            tmp = durationOfNanos(nanos);
        } else {
            tmp = durationOfMillis(nanosToMillis(nanos));
        }
        return tmp;
    }
    function addMillisWithoutOverflow(_this__u8e3s4, other) {
        var tmp;
        if (equalsLong(_this__u8e3s4, new Long(-1, 1073741823)) || equalsLong(_this__u8e3s4, new Long(1, -1073741824))) {
            var tmp_0;
            var tmp_1;
            if (compare(new Long(1, -1073741824), other) < 0 && compare(other, new Long(-1, 1073741823)) < 0) {
                tmp_1 = true;
            } else {
                tmp_1 = compare(bitwiseXor(_this__u8e3s4, other), new Long(0, 0)) >= 0;
            }
            if (tmp_1) {
                tmp_0 = _this__u8e3s4;
            } else {
                tmp_0 = new Long(-16162, 2147483647);
            }
            tmp = tmp_0;
        } else {
            if (equalsLong(other, new Long(-1, 1073741823)) || equalsLong(other, new Long(1, -1073741824))) {
                tmp = other;
            } else {
                tmp = coerceIn_0(add(_this__u8e3s4, other), new Long(1, -1073741824), new Long(-1, 1073741823));
            }
        }
        return tmp;
    }
    function durationOfMillisNormalized(millis) {
        var tmp;
        if (compare(new Long(1108857478, -1074), millis) <= 0 ? compare(millis, new Long(-1108857478, 1073)) <= 0 : false) {
            tmp = durationOfNanos(millisToNanos(millis));
        } else {
            tmp = durationOfMillis(coerceIn_0(millis, new Long(1, -1073741824), new Long(-1, 1073741823)));
        }
        return tmp;
    }
    function nanosToMillis(nanos) {
        return divide(nanos, fromInt(1e6));
    }
    function millisToNanos(millis) {
        return multiply(millis, fromInt(1e6));
    }
    function durationOfNanos(normalNanos) {
        return Companion_getInstance_10().lf(shiftLeft(normalNanos, 1));
    }
    function parseIsoStringFormat(value, startIndex, throwException) {
        var index = startIndex;
        if (index === value.length) {
            if (throwException) throw IllegalArgumentException_init_$Create$_0('');
            return Companion_getInstance_10().kf_1;
        }
        var totalMillis = new Long(0, 0);
        var totalNanos = new Long(0, 0);
        var isTimeComponent = false;
        var prevUnit = null;
        $l$loop: while (index < value.length) {
            var ch = charCodeAt(value, index);
            if (ch === _Char___init__impl__6a9atx(84)) {
                var tmp;
                if (isTimeComponent) {
                    tmp = true;
                } else {
                    index = index + 1 | 0;
                    tmp = index === value.length;
                }
                if (tmp) {
                    if (throwException) throw IllegalArgumentException_init_$Create$_0('');
                    return Companion_getInstance_10().kf_1;
                }
                isTimeComponent = true;
                continue $l$loop;
            }
            var longStartIndex = index;
            var sign;
            var tmp0 = Companion_getInstance_11().pf_1;
            var tmp4 = index;
            var tmp$ret$2;
            $l$block: {
                var sign_0 = 1;
                var index_0 = tmp4;
                if (access$_get_allowSign__e988q3(tmp0)) {
                    var firstChar = charCodeAt(value, index_0);
                    if (firstChar === _Char___init__impl__6a9atx(45)) {
                        sign_0 = -1;
                        index_0 = index_0 + 1 | 0;
                    } else if (firstChar === _Char___init__impl__6a9atx(43)) {
                        index_0 = index_0 + 1 | 0;
                    }
                }
                var i = index_0;
                $l$loop_0: while (true) {
                    var tmp_0;
                    if (i < value.length) {
                        tmp_0 = charCodeAt(value, i) === _Char___init__impl__6a9atx(48);
                    } else {
                        tmp_0 = false;
                    }
                    if (!tmp_0) {
                        break $l$loop_0;
                    }
                    i = i + 1 | 0;
                }
                index_0 = i;
                var result = new Long(0, 0);
                $l$loop_1: while (index_0 < value.length) {
                    var ch_0 = charCodeAt(value, index_0);
                    if (!(_Char___init__impl__6a9atx(48) <= ch_0 ? ch_0 <= _Char___init__impl__6a9atx(57) : false)) break $l$loop_1;
                    var digit = Char__minus_impl_a2frrh(ch_0, _Char___init__impl__6a9atx(48));
                    if (compare(result, access$_get_overflowThreshold__7yqffs(tmp0)) > 0 || equalsLong(result, access$_get_overflowThreshold__7yqffs(tmp0)) && compare(fromInt(digit), access$_get_lastDigitMax__85wg2(tmp0)) > 0) {
                        var i_0 = index_0;
                        $l$loop_2: while (true) {
                            var tmp_1;
                            if (i_0 < value.length) {
                                var it = charCodeAt(value, i_0);
                                tmp_1 = _Char___init__impl__6a9atx(48) <= it ? it <= _Char___init__impl__6a9atx(57) : false;
                            } else {
                                tmp_1 = false;
                            }
                            if (!tmp_1) {
                                break $l$loop_2;
                            }
                            i_0 = i_0 + 1 | 0;
                        }
                        index_0 = i_0;
                        var tmp0_0 = index_0;
                        var localSign = sign_0;
                        index = tmp0_0;
                        if (index === value.length || index === (longStartIndex + (ch === _Char___init__impl__6a9atx(45) || ch === _Char___init__impl__6a9atx(43) ? 1 : 0) | 0)) {
                            if (throwException) throw IllegalArgumentException_init_$Create$_0('');
                            return Companion_getInstance_10().kf_1;
                        }
                        sign = localSign;
                        tmp$ret$2 = access$_get_overflowLimit__t4uhig(tmp0);
                        break $l$block;
                    }
                    var this_0 = result;
                    var this_1 = add(shiftLeft(this_0, 3), shiftLeft(this_0, 1));
                    result = add(this_1, fromInt(digit));
                    index_0 = index_0 + 1 | 0;
                }
                var tmp0_1 = index_0;
                var localSign_0 = sign_0;
                index = tmp0_1;
                if (index === value.length || index === (longStartIndex + (ch === _Char___init__impl__6a9atx(45) || ch === _Char___init__impl__6a9atx(43) ? 1 : 0) | 0)) {
                    if (throwException) throw IllegalArgumentException_init_$Create$_0('');
                    return Companion_getInstance_10().kf_1;
                }
                sign = localSign_0;
                tmp$ret$2 = result;
            }
            var longValue = tmp$ret$2;
            if (charCodeAt(value, index) === _Char___init__impl__6a9atx(46)) {
                index = index + 1 | 0;
                var index_1 = index;
                var startIndex_0 = index_1;
                var index_2 = startIndex_0;
                var tmp0_2 = index_2 + 6 | 0;
                var b = value.length;
                var endIndex = Math.min(tmp0_2, b);
                var result_0 = 0;
                $l$loop_3: while (index_2 < endIndex) {
                    var ch_1 = charCodeAt(value, index_2);
                    if (!(_Char___init__impl__6a9atx(48) <= ch_1 ? ch_1 <= _Char___init__impl__6a9atx(57) : false)) break $l$loop_3;
                    var this_2 = result_0;
                    result_0 = ((this_2 << 3) + (this_2 << 1) | 0) + Char__minus_impl_a2frrh(ch_1, _Char___init__impl__6a9atx(48)) | 0;
                    index_2 = index_2 + 1 | 0;
                }
                var times = 6 - (index_2 - startIndex_0 | 0) | 0;
                var inductionVariable = 0;
                if (inductionVariable < times) do {
                    var index_3 = inductionVariable;
                    inductionVariable = inductionVariable + 1 | 0;
                    var this_3 = result_0;
                    result_0 = (this_3 << 3) + (this_3 << 1) | 0;
                } while (inductionVariable < times);
                index_1 = index_2;
                var highPrecisionDigits = result_0;
                var startIndex_1 = index_1;
                var index_4 = startIndex_1;
                var tmp0_3 = index_4 + 9 | 0;
                var b_0 = value.length;
                var endIndex_0 = Math.min(tmp0_3, b_0);
                var result_1 = 0;
                $l$loop_4: while (index_4 < endIndex_0) {
                    var ch_2 = charCodeAt(value, index_4);
                    if (!(_Char___init__impl__6a9atx(48) <= ch_2 ? ch_2 <= _Char___init__impl__6a9atx(57) : false)) break $l$loop_4;
                    var this_4 = result_1;
                    result_1 = ((this_4 << 3) + (this_4 << 1) | 0) + Char__minus_impl_a2frrh(ch_2, _Char___init__impl__6a9atx(48)) | 0;
                    index_4 = index_4 + 1 | 0;
                }
                var times_0 = 9 - (index_4 - startIndex_1 | 0) | 0;
                var inductionVariable_0 = 0;
                if (inductionVariable_0 < times_0) do {
                    var index_5 = inductionVariable_0;
                    inductionVariable_0 = inductionVariable_0 + 1 | 0;
                    var this_5 = result_1;
                    result_1 = (this_5 << 3) + (this_5 << 1) | 0;
                } while (inductionVariable_0 < times_0);
                index_1 = index_4;
                var lowPrecisionDigits = result_1;
                var i_1 = index_1;
                $l$loop_5: while (true) {
                    var tmp_2;
                    if (i_1 < value.length) {
                        var it_0 = charCodeAt(value, i_1);
                        tmp_2 = _Char___init__impl__6a9atx(48) <= it_0 ? it_0 <= _Char___init__impl__6a9atx(57) : false;
                    } else {
                        tmp_2 = false;
                    }
                    if (!tmp_2) {
                        break $l$loop_5;
                    }
                    i_1 = i_1 + 1 | 0;
                }
                index_1 = i_1;
                var fractionEndIndex = index_1;
                if (fractionEndIndex === index || fractionEndIndex === value.length || !(charCodeAt(value, fractionEndIndex) === _Char___init__impl__6a9atx(83))) {
                    if (throwException) throw IllegalArgumentException_init_$Create$_0('');
                    return Companion_getInstance_10().kf_1;
                }
                index = fractionEndIndex;
                var tmp0_4 = fromInt(highPrecisionDigits);
                var other = 1e9;
                var this_6 = multiply(tmp0_4, fromInt(other));
                var fractionValue = add(this_6, fromInt(lowPrecisionDigits));
                totalNanos = multiply(numberToLong(sign), fractionDigitsToNanos(fractionValue, DurationUnit_SECONDS_getInstance()));
            }
            var tmp0_elvis_lhs = isoDurationUnitByShortNameOrNull(value, index);
            var tmp_3;
            if (tmp0_elvis_lhs == null) {
                var message = 'Unknown duration unit short name: ' + toString(charCodeAt(value, index));
                if (throwException) throw IllegalArgumentException_init_$Create$_0(message);
                return Companion_getInstance_10().kf_1;
            } else {
                tmp_3 = tmp0_elvis_lhs;
            }
            var unit = tmp_3;
            if (!(prevUnit == null) && prevUnit.c2(unit) <= 0) {
                var message_0 = 'Unexpected order of duration components';
                if (throwException) throw IllegalArgumentException_init_$Create$_0(message_0);
                return Companion_getInstance_10().kf_1;
            }
            prevUnit = unit;
            if (unit.equals(DurationUnit_DAYS_getInstance())) {
                if (isTimeComponent) {
                    if (throwException) throw IllegalArgumentException_init_$Create$_0('');
                    return Companion_getInstance_10().kf_1;
                }
                totalMillis = multiply(numberToLong(sign), convertDurationUnitToMilliseconds(longValue, unit));
            } else {
                if (!isTimeComponent) {
                    if (throwException) throw IllegalArgumentException_init_$Create$_0('');
                    return Companion_getInstance_10().kf_1;
                }
                var this_7 = addMillisWithoutOverflow(totalMillis, multiply(numberToLong(sign), convertDurationUnitToMilliseconds(longValue, unit)));
                if (equalsLong(this_7, new Long(-16162, 2147483647))) {
                    if (throwException) throw IllegalArgumentException_init_$Create$_0('');
                    return Companion_getInstance_10().kf_1;
                }
                totalMillis = this_7;
            }
            index = index + 1 | 0;
        }
        return Duration__plus_impl_yu9v8f(toDuration(totalMillis, DurationUnit_MILLISECONDS_getInstance()), toDuration(totalNanos, DurationUnit_NANOSECONDS_getInstance()));
    }
    function parseDefaultStringFormat(value, startIndex, hasSign, throwException) {
        var index = startIndex;
        var length = value.length;
        var allowSpaces = !hasSign;
        if (hasSign && charCodeAt(value, index) === _Char___init__impl__6a9atx(40) && charCodeAt(value, length - 1 | 0) === _Char___init__impl__6a9atx(41)) {
            allowSpaces = true;
            index = index + 1 | 0;
            length = length - 1 | 0;
            if (index === length) {
                var message = 'No components';
                if (throwException) throw IllegalArgumentException_init_$Create$_0(message);
                return Companion_getInstance_10().kf_1;
            }
        }
        var totalMillis = new Long(0, 0);
        var totalNanos = new Long(0, 0);
        var prevUnit = null;
        var isFirstComponent = true;
        while (index < length) {
            if (!isFirstComponent && allowSpaces) {
                var i = index;
                $l$loop: while (true) {
                    var tmp;
                    if (i < value.length) {
                        tmp = charCodeAt(value, i) === _Char___init__impl__6a9atx(32);
                    } else {
                        tmp = false;
                    }
                    if (!tmp) {
                        break $l$loop;
                    }
                    i = i + 1 | 0;
                }
                index = i;
            }
            isFirstComponent = false;
            var longStartIndex = index;
            var tmp0 = Companion_getInstance_11().qf_1;
            var tmp4 = index;
            var tmp$ret$3;
            $l$block: {
                var sign = 1;
                var index_0 = tmp4;
                if (access$_get_allowSign__e988q3(tmp0)) {
                    var firstChar = charCodeAt(value, index_0);
                    if (firstChar === _Char___init__impl__6a9atx(45)) {
                        sign = -1;
                        index_0 = index_0 + 1 | 0;
                    } else if (firstChar === _Char___init__impl__6a9atx(43)) {
                        index_0 = index_0 + 1 | 0;
                    }
                }
                var i_0 = index_0;
                $l$loop_0: while (true) {
                    var tmp_0;
                    if (i_0 < value.length) {
                        tmp_0 = charCodeAt(value, i_0) === _Char___init__impl__6a9atx(48);
                    } else {
                        tmp_0 = false;
                    }
                    if (!tmp_0) {
                        break $l$loop_0;
                    }
                    i_0 = i_0 + 1 | 0;
                }
                index_0 = i_0;
                var result = new Long(0, 0);
                $l$loop_1: while (index_0 < value.length) {
                    var ch = charCodeAt(value, index_0);
                    if (!(_Char___init__impl__6a9atx(48) <= ch ? ch <= _Char___init__impl__6a9atx(57) : false)) break $l$loop_1;
                    var digit = Char__minus_impl_a2frrh(ch, _Char___init__impl__6a9atx(48));
                    if (compare(result, access$_get_overflowThreshold__7yqffs(tmp0)) > 0 || equalsLong(result, access$_get_overflowThreshold__7yqffs(tmp0)) && compare(fromInt(digit), access$_get_lastDigitMax__85wg2(tmp0)) > 0) {
                        var i_1 = index_0;
                        $l$loop_2: while (true) {
                            var tmp_1;
                            if (i_1 < value.length) {
                                var it = charCodeAt(value, i_1);
                                tmp_1 = _Char___init__impl__6a9atx(48) <= it ? it <= _Char___init__impl__6a9atx(57) : false;
                            } else {
                                tmp_1 = false;
                            }
                            if (!tmp_1) {
                                break $l$loop_2;
                            }
                            i_1 = i_1 + 1 | 0;
                        }
                        index_0 = i_1;
                        var tmp0_0 = index_0;
                        if (tmp0_0 === longStartIndex || tmp0_0 === length || true) {
                            if (throwException) throw IllegalArgumentException_init_$Create$_0('');
                            return Companion_getInstance_10().kf_1;
                        }
                        index = tmp0_0;
                        tmp$ret$3 = access$_get_overflowLimit__t4uhig(tmp0);
                        break $l$block;
                    }
                    var this_0 = result;
                    var this_1 = add(shiftLeft(this_0, 3), shiftLeft(this_0, 1));
                    result = add(this_1, fromInt(digit));
                    index_0 = index_0 + 1 | 0;
                }
                var tmp0_1 = index_0;
                if (tmp0_1 === longStartIndex || tmp0_1 === length || false) {
                    if (throwException) throw IllegalArgumentException_init_$Create$_0('');
                    return Companion_getInstance_10().kf_1;
                }
                index = tmp0_1;
                tmp$ret$3 = result;
            }
            var longValue = tmp$ret$3;
            var hasFractionalPart = charCodeAt(value, index) === _Char___init__impl__6a9atx(46);
            var fractionStartIndex;
            var fractionValue;
            if (hasFractionalPart) {
                fractionStartIndex = index;
                index = index + 1 | 0;
                var index_1 = index;
                var startIndex_0 = index_1;
                var index_2 = startIndex_0;
                var tmp0_2 = index_2 + 6 | 0;
                var b = value.length;
                var endIndex = Math.min(tmp0_2, b);
                var result_0 = 0;
                $l$loop_3: while (index_2 < endIndex) {
                    var ch_0 = charCodeAt(value, index_2);
                    if (!(_Char___init__impl__6a9atx(48) <= ch_0 ? ch_0 <= _Char___init__impl__6a9atx(57) : false)) break $l$loop_3;
                    var this_2 = result_0;
                    result_0 = ((this_2 << 3) + (this_2 << 1) | 0) + Char__minus_impl_a2frrh(ch_0, _Char___init__impl__6a9atx(48)) | 0;
                    index_2 = index_2 + 1 | 0;
                }
                var times = 6 - (index_2 - startIndex_0 | 0) | 0;
                var inductionVariable = 0;
                if (inductionVariable < times) do {
                    var index_3 = inductionVariable;
                    inductionVariable = inductionVariable + 1 | 0;
                    var this_3 = result_0;
                    result_0 = (this_3 << 3) + (this_3 << 1) | 0;
                } while (inductionVariable < times);
                index_1 = index_2;
                var highPrecisionDigits = result_0;
                var startIndex_1 = index_1;
                var index_4 = startIndex_1;
                var tmp0_3 = index_4 + 9 | 0;
                var b_0 = value.length;
                var endIndex_0 = Math.min(tmp0_3, b_0);
                var result_1 = 0;
                $l$loop_4: while (index_4 < endIndex_0) {
                    var ch_1 = charCodeAt(value, index_4);
                    if (!(_Char___init__impl__6a9atx(48) <= ch_1 ? ch_1 <= _Char___init__impl__6a9atx(57) : false)) break $l$loop_4;
                    var this_4 = result_1;
                    result_1 = ((this_4 << 3) + (this_4 << 1) | 0) + Char__minus_impl_a2frrh(ch_1, _Char___init__impl__6a9atx(48)) | 0;
                    index_4 = index_4 + 1 | 0;
                }
                var times_0 = 9 - (index_4 - startIndex_1 | 0) | 0;
                var inductionVariable_0 = 0;
                if (inductionVariable_0 < times_0) do {
                    var index_5 = inductionVariable_0;
                    inductionVariable_0 = inductionVariable_0 + 1 | 0;
                    var this_5 = result_1;
                    result_1 = (this_5 << 3) + (this_5 << 1) | 0;
                } while (inductionVariable_0 < times_0);
                index_1 = index_4;
                var lowPrecisionDigits = result_1;
                var i_2 = index_1;
                $l$loop_5: while (true) {
                    var tmp_2;
                    if (i_2 < value.length) {
                        var it_0 = charCodeAt(value, i_2);
                        tmp_2 = _Char___init__impl__6a9atx(48) <= it_0 ? it_0 <= _Char___init__impl__6a9atx(57) : false;
                    } else {
                        tmp_2 = false;
                    }
                    if (!tmp_2) {
                        break $l$loop_5;
                    }
                    i_2 = i_2 + 1 | 0;
                }
                index_1 = i_2;
                var fractionEndIndex = index_1;
                if (fractionEndIndex === index || fractionEndIndex === length) {
                    if (throwException) throw IllegalArgumentException_init_$Create$_0('');
                    return Companion_getInstance_10().kf_1;
                }
                index = fractionEndIndex;
                var tmp0_4 = fromInt(highPrecisionDigits);
                var other = 1e9;
                var this_6 = multiply(tmp0_4, fromInt(other));
                fractionValue = add(this_6, fromInt(lowPrecisionDigits));
            } else {
                fractionStartIndex = -1;
                fractionValue = new Long(0, 0);
            }
            var tmp0_elvis_lhs = defaultDurationUnitByShortNameOrNull(value, index);
            var tmp_3;
            if (tmp0_elvis_lhs == null) {
                var message_0 = 'Unknown duration unit short name: ' + toString(charCodeAt(value, index));
                if (throwException) throw IllegalArgumentException_init_$Create$_0(message_0);
                return Companion_getInstance_10().kf_1;
            } else {
                tmp_3 = tmp0_elvis_lhs;
            }
            var unit = tmp_3;
            if (!(prevUnit == null) && prevUnit.c2(unit) <= 0) {
                var message_1 = 'Unexpected order of duration components';
                if (throwException) throw IllegalArgumentException_init_$Create$_0(message_1);
                return Companion_getInstance_10().kf_1;
            }
            prevUnit = unit;
            switch (unit.b2_1) {
              case 1:
                totalMillis = add(totalMillis, divide(longValue, new Long(1e3, 0)));
                var tmp_4 = totalMillis;
                var this_7 = new Long(-387905, 1073741823);
                var tmp$ret$37 = divide(this_7, fromInt(1e6));
                if (compare(tmp_4, tmp$ret$37) <= 0) {
                    totalNanos = multiply(modulo(longValue, new Long(1e3, 0)), new Long(1e3, 0));
                }
                break;

              case 0:
                var tmp_5 = totalMillis;
                var tmp$ret$38 = divide(longValue, fromInt(1e6));
                totalMillis = add(tmp_5, tmp$ret$38);
                var tmp_6 = totalNanos;
                var tmp$ret$39 = modulo(longValue, fromInt(1e6));
                totalNanos = add(tmp_6, tmp$ret$39);
                break;

              default:
                totalMillis = addMillisWithoutOverflow(totalMillis, convertDurationUnitToMilliseconds(longValue, unit));
                break;
            }
            index = index + get_shortNameLength(unit) | 0;
            if (hasFractionalPart) {
                if (index < length) {
                    var message_2 = 'Fractional component must be last';
                    if (throwException) throw IllegalArgumentException_init_$Create$_0(message_2);
                    return Companion_getInstance_10().kf_1;
                }
                totalNanos = add(totalNanos, unit.c2(DurationUnit_MINUTES_getInstance()) >= 0 && (index - fractionStartIndex | 0) > 15 ? parseFractionFallback(value, fractionStartIndex, index - get_shortNameLength(unit) | 0, unit) : fractionDigitsToNanos(fractionValue, unit));
            }
        }
        return Duration__plus_impl_yu9v8f(toDuration(totalMillis, DurationUnit_MILLISECONDS_getInstance()), toDuration(totalNanos, DurationUnit_NANOSECONDS_getInstance()));
    }
    function Companion_11() {
        Companion_instance_11 = this;
        this.pf_1 = new LongParser(new Long(-1, 1073741823), true);
        this.qf_1 = new LongParser(new Long(-1, 2147483647), false);
    }
    var Companion_instance_11;
    function Companion_getInstance_11() {
        if (Companion_instance_11 == null) new Companion_11;
        return Companion_instance_11;
    }
    function access$_get_overflowLimit__t4uhig($this) {
        return $this.rf_1;
    }
    function access$_get_allowSign__e988q3($this) {
        return $this.sf_1;
    }
    function access$_get_overflowThreshold__7yqffs($this) {
        return $this.tf_1;
    }
    function access$_get_lastDigitMax__85wg2($this) {
        return $this.uf_1;
    }
    function LongParser(overflowLimit, allowSign) {
        Companion_getInstance_11();
        this.rf_1 = overflowLimit;
        this.sf_1 = allowSign;
        var tmp = this;
        var this_0 = this.rf_1;
        tmp.tf_1 = divide(this_0, fromInt(10));
        var tmp_0 = this;
        var this_1 = this.rf_1;
        tmp_0.uf_1 = modulo(this_1, fromInt(10));
    }
    function FractionalParser() {}
    var FractionalParser_instance;
    function FractionalParser_getInstance() {
        return FractionalParser_instance;
    }
    function fractionDigitsToNanos(_this__u8e3s4, unit) {
        var other = get_fractionMultiplier(unit);
        var tmp$ret$0 = toNumber(_this__u8e3s4) * other;
        return roundToLong(tmp$ret$0);
    }
    function isoDurationUnitByShortNameOrNull(_this__u8e3s4, start) {
        var tmp0_subject = charCodeAt(_this__u8e3s4, start);
        return tmp0_subject === _Char___init__impl__6a9atx(68) ? DurationUnit_DAYS_getInstance() : tmp0_subject === _Char___init__impl__6a9atx(72) ? DurationUnit_HOURS_getInstance() : tmp0_subject === _Char___init__impl__6a9atx(77) ? DurationUnit_MINUTES_getInstance() : tmp0_subject === _Char___init__impl__6a9atx(83) ? DurationUnit_SECONDS_getInstance() : null;
    }
    function defaultDurationUnitByShortNameOrNull(_this__u8e3s4, start) {
        var first = charCodeAt(_this__u8e3s4, start);
        var second = start < get_lastIndex_3(_this__u8e3s4) ? charCodeAt(_this__u8e3s4, start + 1 | 0) : _Char___init__impl__6a9atx(0);
        return first === _Char___init__impl__6a9atx(100) ? DurationUnit_DAYS_getInstance() : first === _Char___init__impl__6a9atx(104) ? DurationUnit_HOURS_getInstance() : first === _Char___init__impl__6a9atx(115) ? DurationUnit_SECONDS_getInstance() : first === _Char___init__impl__6a9atx(109) ? second === _Char___init__impl__6a9atx(115) ? DurationUnit_MILLISECONDS_getInstance() : DurationUnit_MINUTES_getInstance() : first === _Char___init__impl__6a9atx(117) ? second === _Char___init__impl__6a9atx(115) ? DurationUnit_MICROSECONDS_getInstance() : null : first === _Char___init__impl__6a9atx(110) ? second === _Char___init__impl__6a9atx(115) ? DurationUnit_NANOSECONDS_getInstance() : null : null;
    }
    function get_shortNameLength(_this__u8e3s4) {
        switch (_this__u8e3s4.b2_1) {
          case 2:
          case 1:
          case 0:
            return 2;

          default:
            return 1;
        }
    }
    function parseFractionFallback(_this__u8e3s4, startIndex, endIndex, unit) {
        return roundToLong(toDouble(substring(_this__u8e3s4, startIndex, endIndex)) * toNumber(get_fallbackFractionMultiplier(unit)));
    }
    function get_fractionMultiplier(_this__u8e3s4) {
        var tmp;
        switch (_this__u8e3s4.b2_1) {
          case 0:
            tmp = 1e-15;
            break;

          case 1:
            tmp = 1e-12;
            break;

          case 2:
            tmp = 1e-9;
            break;

          case 3:
            tmp = 1e-6;
            break;

          case 4:
            tmp = 6e-5;
            break;

          case 5:
            tmp = .0036;
            break;

          case 6:
            tmp = .0864;
            break;

          default:
            var message = 'Unknown unit: ' + _this__u8e3s4.toString();
            throw IllegalStateException_init_$Create$_0(toString_1(message));
        }
        return tmp;
    }
    function get_fallbackFractionMultiplier(_this__u8e3s4) {
        var tmp;
        switch (_this__u8e3s4.b2_1) {
          case 4:
            tmp = new Long(-129542144, 13);
            break;

          case 5:
            tmp = new Long(817405952, 838);
            break;

          case 6:
            tmp = new Long(-1857093632, 20116);
            break;

          default:
            var message = 'Invalid unit: ' + _this__u8e3s4.toString() + ' for fallback fraction multiplier';
            throw IllegalStateException_init_$Create$_0(toString_1(message));
        }
        return tmp;
    }
    function convertDurationUnitToMilliseconds(value, unit) {
        return multiplyNonNegativeWithoutOverflow(value, get_millisMultiplier(unit));
    }
    function multiplyNonNegativeWithoutOverflow(_this__u8e3s4, other) {
        var tmp;
        if (equalsLong(_this__u8e3s4, new Long(0, 0))) {
            tmp = new Long(0, 0);
        } else if (equalsLong(_this__u8e3s4, new Long(1, 0))) {
            tmp = coerceAtMost_0(other, new Long(-1, 1073741823));
        } else if (equalsLong(other, new Long(1, 0))) {
            tmp = coerceAtMost_0(_this__u8e3s4, new Long(-1, 1073741823));
        } else {
            var bitSum = (128 - countLeadingZeroBits(_this__u8e3s4) | 0) - countLeadingZeroBits(other) | 0;
            tmp = bitSum < 63 ? multiply(_this__u8e3s4, other) : bitSum > 63 ? new Long(-1, 1073741823) : coerceAtMost_0(multiply(_this__u8e3s4, other), new Long(-1, 1073741823));
        }
        return tmp;
    }
    function get_millisMultiplier(_this__u8e3s4) {
        var tmp;
        switch (_this__u8e3s4.b2_1) {
          case 6:
            tmp = new Long(864e5, 0);
            break;

          case 5:
            tmp = new Long(36e5, 0);
            break;

          case 4:
            tmp = new Long(6e4, 0);
            break;

          case 3:
            tmp = new Long(1e3, 0);
            break;

          case 2:
            tmp = new Long(1, 0);
            break;

          default:
            var message = 'Wrong unit for millisMultiplier: ' + _this__u8e3s4.toString();
            throw IllegalStateException_init_$Create$_0(toString_1(message));
        }
        return tmp;
    }
    function get_POWERS_OF_TEN() {
        _init_properties_Instant_kt__2myitt();
        return POWERS_OF_TEN;
    }
    var POWERS_OF_TEN;
    function get_asciiDigitPositionsInIsoStringAfterYear() {
        _init_properties_Instant_kt__2myitt();
        return asciiDigitPositionsInIsoStringAfterYear;
    }
    var asciiDigitPositionsInIsoStringAfterYear;
    function get_colonsInIsoOffsetString() {
        _init_properties_Instant_kt__2myitt();
        return colonsInIsoOffsetString;
    }
    var colonsInIsoOffsetString;
    function get_asciiDigitsInIsoOffsetString() {
        _init_properties_Instant_kt__2myitt();
        return asciiDigitsInIsoOffsetString;
    }
    var asciiDigitsInIsoOffsetString;
    function Companion_12() {
        Companion_instance_12 = this;
        this.vf_1 = new Instant(new Long(342103040, -7347440), 0);
        this.wf_1 = new Instant(new Long(-90867457, 7347410), 999999999);
    }
    protoOf(Companion_12).xf = function(epochSeconds, nanosecondAdjustment) {
        var other = new Long(1e9, 0);
        var q = divide(nanosecondAdjustment, other);
        if (compare(bitwiseXor(nanosecondAdjustment, other), new Long(0, 0)) < 0 && !equalsLong(multiply(q, other), nanosecondAdjustment)) {
            var _unary__edvuaz = q;
            q = subtract(_unary__edvuaz, get_ONE());
        }
        var b = q;
        var sum = add(epochSeconds, b);
        if (compare(bitwiseXor(epochSeconds, sum), new Long(0, 0)) < 0 && compare(bitwiseXor(epochSeconds, b), new Long(0, 0)) >= 0) {
            return compare(epochSeconds, new Long(0, 0)) > 0 ? Companion_getInstance_12().wf_1 : Companion_getInstance_12().vf_1;
        }
        var seconds = sum;
        var tmp;
        if (compare(seconds, new Long(342103040, -7347440)) < 0) {
            tmp = this.vf_1;
        } else if (compare(seconds, new Long(-90867457, 7347410)) > 0) {
            tmp = this.wf_1;
        } else {
            var other_0 = new Long(1e9, 0);
            var r = modulo(nanosecondAdjustment, other_0);
            var tmp$ret$3 = add(r, bitwiseAnd(other_0, shiftRight(bitwiseAnd(bitwiseXor(r, other_0), bitwiseOr(r, negate(r))), 63)));
            var nanoseconds = convertToInt(tmp$ret$3);
            tmp = new Instant(seconds, nanoseconds);
        }
        return tmp;
    };
    protoOf(Companion_12).yf = function(epochSeconds, nanosecondAdjustment) {
        return this.xf(epochSeconds, fromInt(nanosecondAdjustment));
    };
    protoOf(Companion_12).zf = function(input) {
        return parseIso(input).ag();
    };
    var Companion_instance_12;
    function Companion_getInstance_12() {
        if (Companion_instance_12 == null) new Companion_12;
        return Companion_instance_12;
    }
    function Instant(epochSeconds, nanosecondsOfSecond) {
        Companion_getInstance_12();
        this.bg_1 = epochSeconds;
        this.cg_1 = nanosecondsOfSecond;
        var containsArg = this.bg_1;
        if (!(compare(new Long(342103040, -7347440), containsArg) <= 0 ? compare(containsArg, new Long(-90867457, 7347410)) <= 0 : false)) {
            var message = 'Instant exceeds minimum or maximum instant';
            throw IllegalArgumentException_init_$Create$_0(toString_1(message));
        }
    }
    protoOf(Instant).dg = function(other) {
        var s = this.bg_1.j2(other.bg_1);
        if (!(s === 0)) {
            return s;
        }
        return compareTo(this.cg_1, other.cg_1);
    };
    protoOf(Instant).d = function(other) {
        return this.dg(other instanceof Instant ? other : THROW_CCE());
    };
    protoOf(Instant).equals = function(other) {
        var tmp;
        if (this === other) {
            tmp = true;
        } else {
            var tmp_0;
            var tmp_1;
            if (other instanceof Instant) {
                tmp_1 = equalsLong(this.bg_1, other.bg_1);
            } else {
                tmp_1 = false;
            }
            if (tmp_1) {
                tmp_0 = this.cg_1 === other.cg_1;
            } else {
                tmp_0 = false;
            }
            tmp = tmp_0;
        }
        return tmp;
    };
    protoOf(Instant).hashCode = function() {
        return this.bg_1.hashCode() + imul(51, this.cg_1) | 0;
    };
    protoOf(Instant).toString = function() {
        return formatIso(this);
    };
    function formatIso(instant) {
        _init_properties_Instant_kt__2myitt();
        var this_0 = StringBuilder_init_$Create$_0();
        var ldt = Companion_instance_13.eg(instant);
        var number = ldt.fg_1;
        if (abs_0(number) < 1e3) {
            var innerBuilder = StringBuilder_init_$Create$_0();
            if (number >= 0) {
                innerBuilder.ba(number + 1e4 | 0).fa(0);
            } else {
                innerBuilder.ba(number - 1e4 | 0).fa(1);
            }
            this_0.e(innerBuilder);
        } else {
            if (number >= 1e4) {
                this_0.z6(_Char___init__impl__6a9atx(43));
            }
            this_0.ba(number);
        }
        this_0.z6(_Char___init__impl__6a9atx(45));
        formatIso$appendTwoDigits(this_0, this_0, ldt.gg_1);
        this_0.z6(_Char___init__impl__6a9atx(45));
        formatIso$appendTwoDigits(this_0, this_0, ldt.hg_1);
        this_0.z6(_Char___init__impl__6a9atx(84));
        formatIso$appendTwoDigits(this_0, this_0, ldt.ig_1);
        this_0.z6(_Char___init__impl__6a9atx(58));
        formatIso$appendTwoDigits(this_0, this_0, ldt.jg_1);
        this_0.z6(_Char___init__impl__6a9atx(58));
        formatIso$appendTwoDigits(this_0, this_0, ldt.kg_1);
        if (!(ldt.lg_1 === 0)) {
            this_0.z6(_Char___init__impl__6a9atx(46));
            var zerosToStrip = 0;
            while ((ldt.lg_1 % get_POWERS_OF_TEN()[zerosToStrip + 1 | 0] | 0) === 0) {
                zerosToStrip = zerosToStrip + 1 | 0;
            }
            zerosToStrip = zerosToStrip - (zerosToStrip % 3 | 0) | 0;
            var numberToOutput = ldt.lg_1 / get_POWERS_OF_TEN()[zerosToStrip] | 0;
            this_0.y6(substring_0((numberToOutput + get_POWERS_OF_TEN()[9 - zerosToStrip | 0] | 0).toString(), 1));
        }
        this_0.z6(_Char___init__impl__6a9atx(90));
        return this_0.toString();
    }
    function Success(epochSeconds, nanosecondsOfSecond) {
        this.mg_1 = epochSeconds;
        this.ng_1 = nanosecondsOfSecond;
    }
    protoOf(Success).ag = function() {
        if (compare(this.mg_1, Companion_getInstance_12().vf_1.bg_1) < 0 || compare(this.mg_1, Companion_getInstance_12().wf_1.bg_1) > 0) throw new InstantFormatException('The parsed date is outside the range representable by Instant (Unix epoch second ' + this.mg_1.toString() + ')');
        return Companion_getInstance_12().yf(this.mg_1, this.ng_1);
    };
    function Failure(error, input) {
        this.og_1 = error;
        this.pg_1 = input;
    }
    protoOf(Failure).ag = function() {
        throw new InstantFormatException(this.og_1 + ' when parsing an Instant from "' + truncateForErrorMessage(this.pg_1, 64) + '"');
    };
    function parseIso(isoString) {
        _init_properties_Instant_kt__2myitt();
        var s = isoString;
        var i = 0;
        if (charSequenceLength(s) === 0) {
            return new Failure('An empty string is not a valid Instant', isoString);
        }
        var c = charSequenceGet(s, i);
        var tmp;
        if (c === _Char___init__impl__6a9atx(43) || c === _Char___init__impl__6a9atx(45)) {
            i = i + 1 | 0;
            tmp = c;
        } else {
            tmp = _Char___init__impl__6a9atx(32);
        }
        var yearSign = tmp;
        var yearStart = i;
        var absYear = 0;
        $l$loop: while (true) {
            var tmp_0;
            if (i < charSequenceLength(s)) {
                var containsArg = charSequenceGet(s, i);
                tmp_0 = _Char___init__impl__6a9atx(48) <= containsArg ? containsArg <= _Char___init__impl__6a9atx(57) : false;
            } else {
                tmp_0 = false;
            }
            if (!tmp_0) {
                break $l$loop;
            }
            absYear = imul(absYear, 10) + Char__minus_impl_a2frrh(charSequenceGet(s, i), _Char___init__impl__6a9atx(48)) | 0;
            i = i + 1 | 0;
        }
        var yearStrLength = i - yearStart | 0;
        var tmp_1;
        if (yearStrLength > 10) {
            return parseIso$parseFailure(isoString, 'Expected at most 10 digits for the year number, got ' + yearStrLength + ' digits');
        } else if (yearStrLength === 10 && Char__compareTo_impl_ypi4mb(charSequenceGet(s, yearStart), _Char___init__impl__6a9atx(50)) >= 0) {
            return parseIso$parseFailure(isoString, 'Expected at most 9 digits for the year number or year 1000000000, got ' + yearStrLength + ' digits');
        } else if (yearStrLength < 4) {
            return parseIso$parseFailure(isoString, 'The year number must be padded to 4 digits, got ' + yearStrLength + ' digits');
        } else {
            if (yearSign === _Char___init__impl__6a9atx(43) && yearStrLength === 4) {
                return parseIso$parseFailure(isoString, "The '+' sign at the start is only valid for year numbers longer than 4 digits");
            }
            if (yearSign === _Char___init__impl__6a9atx(32) && !(yearStrLength === 4)) {
                return parseIso$parseFailure(isoString, "A '+' or '-' sign is required for year numbers longer than 4 digits");
            }
            tmp_1 = yearSign === _Char___init__impl__6a9atx(45) ? -absYear | 0 : absYear;
        }
        var year = tmp_1;
        if (charSequenceLength(s) < (i + 16 | 0)) {
            return parseIso$parseFailure(isoString, 'The input string is too short');
        }
        var tmp_2 = i;
        var tmp0_safe_receiver = parseIso$expect(isoString, "'-'", tmp_2, parseIso$lambda);
        if (tmp0_safe_receiver == null) null; else {
            return tmp0_safe_receiver;
        }
        var tmp_3 = i + 3 | 0;
        var tmp1_safe_receiver = parseIso$expect(isoString, "'-'", tmp_3, parseIso$lambda_0);
        if (tmp1_safe_receiver == null) null; else {
            return tmp1_safe_receiver;
        }
        var tmp_4 = i + 6 | 0;
        var tmp2_safe_receiver = parseIso$expect(isoString, "'T' or 't'", tmp_4, parseIso$lambda_1);
        if (tmp2_safe_receiver == null) null; else {
            return tmp2_safe_receiver;
        }
        var tmp_5 = i + 9 | 0;
        var tmp3_safe_receiver = parseIso$expect(isoString, "':'", tmp_5, parseIso$lambda_2);
        if (tmp3_safe_receiver == null) null; else {
            return tmp3_safe_receiver;
        }
        var tmp_6 = i + 12 | 0;
        var tmp4_safe_receiver = parseIso$expect(isoString, "':'", tmp_6, parseIso$lambda_3);
        if (tmp4_safe_receiver == null) null; else {
            return tmp4_safe_receiver;
        }
        var indexedObject = get_asciiDigitPositionsInIsoStringAfterYear();
        var inductionVariable = 0;
        var last = indexedObject.length;
        while (inductionVariable < last) {
            var j = indexedObject[inductionVariable];
            inductionVariable = inductionVariable + 1 | 0;
            var tmp_7 = i + j | 0;
            var tmp5_safe_receiver = parseIso$expect(isoString, 'an ASCII digit', tmp_7, parseIso$lambda_4);
            if (tmp5_safe_receiver == null) null; else {
                return tmp5_safe_receiver;
            }
        }
        var month = parseIso$twoDigitNumber(s, i + 1 | 0);
        var day = parseIso$twoDigitNumber(s, i + 4 | 0);
        var hour = parseIso$twoDigitNumber(s, i + 7 | 0);
        var minute = parseIso$twoDigitNumber(s, i + 10 | 0);
        var second = parseIso$twoDigitNumber(s, i + 13 | 0);
        var tmp_8;
        if (charSequenceGet(s, i + 15 | 0) === _Char___init__impl__6a9atx(46)) {
            var fractionStart = i + 16 | 0;
            i = fractionStart;
            var fraction = 0;
            $l$loop_0: while (true) {
                var tmp_9;
                if (i < charSequenceLength(s)) {
                    var containsArg_0 = charSequenceGet(s, i);
                    tmp_9 = _Char___init__impl__6a9atx(48) <= containsArg_0 ? containsArg_0 <= _Char___init__impl__6a9atx(57) : false;
                } else {
                    tmp_9 = false;
                }
                if (!tmp_9) {
                    break $l$loop_0;
                }
                fraction = imul(fraction, 10) + Char__minus_impl_a2frrh(charSequenceGet(s, i), _Char___init__impl__6a9atx(48)) | 0;
                i = i + 1 | 0;
            }
            var fractionStrLength = i - fractionStart | 0;
            var tmp_10;
            if (1 <= fractionStrLength ? fractionStrLength <= 9 : false) {
                tmp_10 = imul(fraction, get_POWERS_OF_TEN()[9 - fractionStrLength | 0]);
            } else {
                return parseIso$parseFailure(isoString, '1..9 digits are supported for the fraction of the second, got ' + fractionStrLength + ' digits');
            }
            tmp_8 = tmp_10;
        } else {
            i = i + 15 | 0;
            tmp_8 = 0;
        }
        var nanosecond = tmp_8;
        if (i >= charSequenceLength(s)) {
            return parseIso$parseFailure(isoString, 'The UTC offset at the end of the string is missing');
        }
        var sign = charSequenceGet(s, i);
        var tmp_11;
        if (sign === _Char___init__impl__6a9atx(122) || sign === _Char___init__impl__6a9atx(90)) {
            var tmp_12;
            if (charSequenceLength(s) === (i + 1 | 0)) {
                tmp_12 = 0;
            } else {
                return parseIso$parseFailure(isoString, 'Extra text after the instant at position ' + (i + 1 | 0));
            }
            tmp_11 = tmp_12;
        } else if (sign === _Char___init__impl__6a9atx(45) || sign === _Char___init__impl__6a9atx(43)) {
            var offsetStrLength = charSequenceLength(s) - i | 0;
            if (offsetStrLength > 9) {
                var startIndex = i;
                var endIndex = charSequenceLength(s);
                var tmp$ret$13 = toString_1(charSequenceSubSequence(s, startIndex, endIndex));
                return parseIso$parseFailure(isoString, 'The UTC offset string "' + truncateForErrorMessage(tmp$ret$13, 16) + '" is too long');
            }
            if (!((offsetStrLength % 3 | 0) === 0)) {
                var startIndex_0 = i;
                var endIndex_0 = charSequenceLength(s);
                var tmp$ret$14 = toString_1(charSequenceSubSequence(s, startIndex_0, endIndex_0));
                return parseIso$parseFailure(isoString, 'Invalid UTC offset string "' + tmp$ret$14 + '"');
            }
            var indexedObject_0 = get_colonsInIsoOffsetString();
            var inductionVariable_0 = 0;
            var last_0 = indexedObject_0.length;
            $l$loop_1: while (inductionVariable_0 < last_0) {
                var j_0 = indexedObject_0[inductionVariable_0];
                inductionVariable_0 = inductionVariable_0 + 1 | 0;
                if ((i + j_0 | 0) >= charSequenceLength(s)) break $l$loop_1;
                if (!(charSequenceGet(s, i + j_0 | 0) === _Char___init__impl__6a9atx(58))) return parseIso$parseFailure(isoString, "Expected ':' at index " + (i + j_0 | 0) + ", got '" + toString(charSequenceGet(s, i + j_0 | 0)) + "'");
            }
            var indexedObject_1 = get_asciiDigitsInIsoOffsetString();
            var inductionVariable_1 = 0;
            var last_1 = indexedObject_1.length;
            $l$loop_2: while (inductionVariable_1 < last_1) {
                var j_1 = indexedObject_1[inductionVariable_1];
                inductionVariable_1 = inductionVariable_1 + 1 | 0;
                if ((i + j_1 | 0) >= charSequenceLength(s)) break $l$loop_2;
                var containsArg_1 = charSequenceGet(s, i + j_1 | 0);
                if (!(_Char___init__impl__6a9atx(48) <= containsArg_1 ? containsArg_1 <= _Char___init__impl__6a9atx(57) : false)) return parseIso$parseFailure(isoString, 'Expected an ASCII digit at index ' + (i + j_1 | 0) + ", got '" + toString(charSequenceGet(s, i + j_1 | 0)) + "'");
            }
            var offsetHour = parseIso$twoDigitNumber(s, i + 1 | 0);
            var tmp_13;
            if (offsetStrLength > 3) {
                tmp_13 = parseIso$twoDigitNumber(s, i + 4 | 0);
            } else {
                tmp_13 = 0;
            }
            var offsetMinute = tmp_13;
            var tmp_14;
            if (offsetStrLength > 6) {
                tmp_14 = parseIso$twoDigitNumber(s, i + 7 | 0);
            } else {
                tmp_14 = 0;
            }
            var offsetSecond = tmp_14;
            if (offsetMinute > 59) {
                return parseIso$parseFailure(isoString, 'Expected offset-minute-of-hour in 0..59, got ' + offsetMinute);
            }
            if (offsetSecond > 59) {
                return parseIso$parseFailure(isoString, 'Expected offset-second-of-minute in 0..59, got ' + offsetSecond);
            }
            if (offsetHour > 17 && !(offsetHour === 18 && offsetMinute === 0 && offsetSecond === 0)) {
                var startIndex_1 = i;
                var endIndex_1 = charSequenceLength(s);
                var tmp$ret$15 = toString_1(charSequenceSubSequence(s, startIndex_1, endIndex_1));
                return parseIso$parseFailure(isoString, 'Expected an offset in -18:00..+18:00, got ' + tmp$ret$15);
            }
            tmp_11 = imul((imul(offsetHour, 3600) + imul(offsetMinute, 60) | 0) + offsetSecond | 0, sign === _Char___init__impl__6a9atx(45) ? -1 : 1);
        } else {
            return parseIso$parseFailure(isoString, 'Expected the UTC offset at position ' + i + ", got '" + toString(sign) + "'");
        }
        var offsetSeconds = tmp_11;
        if (!(1 <= month ? month <= 12 : false)) {
            return parseIso$parseFailure(isoString, 'Expected a month number in 1..12, got ' + month);
        }
        if (!(1 <= day ? day <= monthLength(month, isLeapYear(year)) : false)) {
            return parseIso$parseFailure(isoString, 'Expected a valid day-of-month for month ' + month + ' of year ' + year + ', got ' + day);
        }
        if (hour > 23) {
            return parseIso$parseFailure(isoString, 'Expected hour in 0..23, got ' + hour);
        }
        if (minute > 59) {
            return parseIso$parseFailure(isoString, 'Expected minute-of-hour in 0..59, got ' + minute);
        }
        if (second > 59) {
            return parseIso$parseFailure(isoString, 'Expected second-of-minute in 0..59, got ' + second);
        }
        var this_0 = new UnboundLocalDateTime(year, month, day, hour, minute, second, nanosecond);
        var y = fromInt(this_0.fg_1);
        var total = multiply(numberToLong(365), y);
        if (compare(y, new Long(0, 0)) >= 0) {
            var tmp_15 = total;
            var this_1 = add(y, fromInt(3));
            var tmp_16 = divide(this_1, fromInt(4));
            var this_2 = add(y, fromInt(99));
            var tmp$ret$24 = divide(this_2, fromInt(100));
            var tmp_17 = subtract(tmp_16, tmp$ret$24);
            var this_3 = add(y, fromInt(399));
            var tmp$ret$26 = divide(this_3, fromInt(400));
            total = add(tmp_15, add(tmp_17, tmp$ret$26));
        } else {
            var tmp_18 = total;
            var tmp_19 = divide(y, fromInt(-4));
            var tmp$ret$28 = divide(y, fromInt(-100));
            var tmp_20 = subtract(tmp_19, tmp$ret$28);
            var tmp$ret$29 = divide(y, fromInt(-400));
            total = subtract(tmp_18, add(tmp_20, tmp$ret$29));
        }
        var tmp0 = total;
        var other = (imul(367, this_0.gg_1) - 362 | 0) / 12 | 0;
        total = add(tmp0, fromInt(other));
        var tmp0_0 = total;
        var other_0 = this_0.hg_1 - 1 | 0;
        total = add(tmp0_0, fromInt(other_0));
        if (this_0.gg_1 > 2) {
            var _unary__edvuaz = total;
            total = subtract(_unary__edvuaz, get_ONE());
            if (!isLeapYear(this_0.fg_1)) {
                var _unary__edvuaz_0 = total;
                total = subtract(_unary__edvuaz_0, get_ONE());
            }
        }
        var this_4 = total;
        var epochDays = subtract(this_4, fromInt(719528));
        var daySeconds = (imul(this_0.ig_1, 3600) + imul(this_0.jg_1, 60) | 0) + this_0.kg_1 | 0;
        var this_5 = multiply(epochDays, fromInt(86400));
        var this_6 = add(this_5, fromInt(daySeconds));
        var epochSeconds = subtract(this_6, fromInt(offsetSeconds));
        var p1 = this_0.lg_1;
        return new Success(epochSeconds, p1);
    }
    function Companion_13() {}
    protoOf(Companion_13).eg = function(instant) {
        var localSecond = instant.bg_1;
        var other = new Long(86400, 0);
        var q = divide(localSecond, other);
        if (compare(bitwiseXor(localSecond, other), new Long(0, 0)) < 0 && !equalsLong(multiply(q, other), localSecond)) {
            var _unary__edvuaz = q;
            q = subtract(_unary__edvuaz, get_ONE());
        }
        var epochDays = q;
        var other_0 = new Long(86400, 0);
        var r = modulo(localSecond, other_0);
        var tmp$ret$1 = add(r, bitwiseAnd(other_0, shiftRight(bitwiseAnd(bitwiseXor(r, other_0), bitwiseOr(r, negate(r))), 63)));
        var secsOfDay = convertToInt(tmp$ret$1);
        var year;
        var month;
        var day;
        var zeroDay = add(epochDays, fromInt(719528));
        var this_0 = zeroDay;
        zeroDay = subtract(this_0, fromInt(60));
        var adjust = new Long(0, 0);
        if (compare(zeroDay, new Long(0, 0)) < 0) {
            var this_1 = zeroDay;
            var this_2 = add(this_1, fromInt(1));
            var this_3 = divide(this_2, fromInt(146097));
            var adjustCycles = subtract(this_3, fromInt(1));
            adjust = multiply(adjustCycles, fromInt(400));
            var tmp = zeroDay;
            var this_4 = negate(adjustCycles);
            var tmp$ret$10 = multiply(this_4, fromInt(146097));
            zeroDay = add(tmp, tmp$ret$10);
        }
        var this_5 = multiply(numberToLong(400), zeroDay);
        var this_6 = add(this_5, fromInt(591));
        var yearEst = divide(this_6, fromInt(146097));
        var tmp_0 = zeroDay;
        var tmp_1 = multiply(numberToLong(365), yearEst);
        var this_7 = yearEst;
        var tmp$ret$13 = divide(this_7, fromInt(4));
        var tmp_2 = add(tmp_1, tmp$ret$13);
        var this_8 = yearEst;
        var tmp$ret$14 = divide(this_8, fromInt(100));
        var tmp_3 = subtract(tmp_2, tmp$ret$14);
        var this_9 = yearEst;
        var tmp$ret$15 = divide(this_9, fromInt(400));
        var doyEst = subtract(tmp_0, add(tmp_3, tmp$ret$15));
        if (compare(doyEst, new Long(0, 0)) < 0) {
            var _unary__edvuaz_0 = yearEst;
            yearEst = subtract(_unary__edvuaz_0, get_ONE());
            var tmp_4 = zeroDay;
            var tmp_5 = multiply(numberToLong(365), yearEst);
            var this_10 = yearEst;
            var tmp$ret$16 = divide(this_10, fromInt(4));
            var tmp_6 = add(tmp_5, tmp$ret$16);
            var this_11 = yearEst;
            var tmp$ret$17 = divide(this_11, fromInt(100));
            var tmp_7 = subtract(tmp_6, tmp$ret$17);
            var this_12 = yearEst;
            var tmp$ret$18 = divide(this_12, fromInt(400));
            doyEst = subtract(tmp_4, add(tmp_7, tmp$ret$18));
        }
        yearEst = add(yearEst, adjust);
        var marchDoy0 = convertToInt(doyEst);
        var marchMonth0 = (imul(marchDoy0, 5) + 2 | 0) / 153 | 0;
        month = ((marchMonth0 + 2 | 0) % 12 | 0) + 1 | 0;
        day = (marchDoy0 - ((imul(marchMonth0, 306) + 5 | 0) / 10 | 0) | 0) + 1 | 0;
        var tmp0 = yearEst;
        var other_1 = marchMonth0 / 10 | 0;
        var tmp$ret$19 = add(tmp0, fromInt(other_1));
        year = convertToInt(tmp$ret$19);
        var hours = secsOfDay / 3600 | 0;
        var secondWithoutHours = secsOfDay - imul(hours, 3600) | 0;
        var minutes = secondWithoutHours / 60 | 0;
        var second = secondWithoutHours - imul(minutes, 60) | 0;
        return new UnboundLocalDateTime(year, month, day, hours, minutes, second, instant.cg_1);
    };
    var Companion_instance_13;
    function Companion_getInstance_13() {
        return Companion_instance_13;
    }
    function UnboundLocalDateTime(year, month, day, hour, minute, second, nanosecond) {
        this.fg_1 = year;
        this.gg_1 = month;
        this.hg_1 = day;
        this.ig_1 = hour;
        this.jg_1 = minute;
        this.kg_1 = second;
        this.lg_1 = nanosecond;
    }
    protoOf(UnboundLocalDateTime).toString = function() {
        return 'UnboundLocalDateTime(' + this.fg_1 + '-' + this.gg_1 + '-' + this.hg_1 + ' ' + this.ig_1 + ':' + this.jg_1 + ':' + this.kg_1 + '.' + this.lg_1 + ')';
    };
    function InstantFormatException(message) {
        IllegalArgumentException_init_$Init$_0(message, this);
        captureStack(this, InstantFormatException);
    }
    function truncateForErrorMessage(_this__u8e3s4, maxLength) {
        _init_properties_Instant_kt__2myitt();
        var tmp;
        if (charSequenceLength(_this__u8e3s4) <= maxLength) {
            tmp = toString_1(_this__u8e3s4);
        } else {
            tmp = toString_1(charSequenceSubSequence(_this__u8e3s4, 0, maxLength)) + '...';
        }
        return tmp;
    }
    function monthLength(_this__u8e3s4, isLeapYear) {
        _init_properties_Instant_kt__2myitt();
        switch (_this__u8e3s4) {
          case 2:
            return isLeapYear ? 29 : 28;

          case 4:
          case 6:
          case 9:
          case 11:
            return 30;

          default:
            return 31;
        }
    }
    function isLeapYear(year) {
        _init_properties_Instant_kt__2myitt();
        return (year & 3) === 0 && (!((year % 100 | 0) === 0) || (year % 400 | 0) === 0);
    }
    function formatIso$appendTwoDigits(_this__u8e3s4, $this_buildString, number) {
        if (number < 10) {
            _this__u8e3s4.z6(_Char___init__impl__6a9atx(48));
        }
        $this_buildString.ba(number);
    }
    function parseIso$parseFailure($isoString, error) {
        return new Failure(error + ' when parsing an Instant from "' + truncateForErrorMessage($isoString, 64) + '"', $isoString);
    }
    function parseIso$expect($isoString, what, where, predicate) {
        var c = charSequenceGet($isoString, where);
        var tmp;
        if (predicate(new Char(c))) {
            tmp = null;
        } else {
            tmp = parseIso$parseFailure($isoString, 'Expected ' + what + ", but got '" + toString(c) + "' at position " + where);
        }
        return tmp;
    }
    function parseIso$lambda(it) {
        _init_properties_Instant_kt__2myitt();
        return equals(it, new Char(_Char___init__impl__6a9atx(45)));
    }
    function parseIso$lambda_0(it) {
        _init_properties_Instant_kt__2myitt();
        return equals(it, new Char(_Char___init__impl__6a9atx(45)));
    }
    function parseIso$lambda_1(it) {
        _init_properties_Instant_kt__2myitt();
        return equals(it, new Char(_Char___init__impl__6a9atx(84))) || equals(it, new Char(_Char___init__impl__6a9atx(116)));
    }
    function parseIso$lambda_2(it) {
        _init_properties_Instant_kt__2myitt();
        return equals(it, new Char(_Char___init__impl__6a9atx(58)));
    }
    function parseIso$lambda_3(it) {
        _init_properties_Instant_kt__2myitt();
        return equals(it, new Char(_Char___init__impl__6a9atx(58)));
    }
    function parseIso$lambda_4(it) {
        _init_properties_Instant_kt__2myitt();
        var containsArg = it.a1_1;
        return _Char___init__impl__6a9atx(48) <= containsArg ? containsArg <= _Char___init__impl__6a9atx(57) : false;
    }
    function parseIso$twoDigitNumber(s, index) {
        return imul(Char__minus_impl_a2frrh(charSequenceGet(s, index), _Char___init__impl__6a9atx(48)), 10) + Char__minus_impl_a2frrh(charSequenceGet(s, index + 1 | 0), _Char___init__impl__6a9atx(48)) | 0;
    }
    var properties_initialized_Instant_kt_xip69;
    function _init_properties_Instant_kt__2myitt() {
        if (!properties_initialized_Instant_kt_xip69) {
            properties_initialized_Instant_kt_xip69 = true;
            POWERS_OF_TEN = new Int32Array([ 1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9 ]);
            asciiDigitPositionsInIsoStringAfterYear = new Int32Array([ 1, 2, 4, 5, 7, 8, 10, 11, 13, 14 ]);
            colonsInIsoOffsetString = new Int32Array([ 3, 6 ]);
            asciiDigitsInIsoOffsetString = new Int32Array([ 1, 2, 4, 5, 7, 8 ]);
        }
    }
    function get_UNDEFINED_RESULT() {
        _init_properties_DeepRecursive_kt__zbwcac();
        return UNDEFINED_RESULT;
    }
    var UNDEFINED_RESULT;
    function DeepRecursiveScope() {}
    function invoke(_this__u8e3s4, value) {
        _init_properties_DeepRecursive_kt__zbwcac();
        return new DeepRecursiveScopeImpl(_this__u8e3s4.rg_1, value).wg();
    }
    function DeepRecursiveFunction(block) {
        this.rg_1 = block;
    }
    function DeepRecursiveScopeImpl(block, value) {
        DeepRecursiveScope.call(this);
        var tmp = this;
        tmp.sg_1 = isSuspendFunction(block, 2) ? block : THROW_CCE();
        this.tg_1 = value;
        var tmp_0 = this;
        tmp_0.ug_1 = isInterface(this, Continuation) ? this : THROW_CCE();
        this.vg_1 = get_UNDEFINED_RESULT();
    }
    protoOf(DeepRecursiveScopeImpl).q7 = function() {
        return EmptyCoroutineContext_getInstance();
    };
    protoOf(DeepRecursiveScopeImpl).xg = function(result) {
        this.ug_1 = null;
        this.vg_1 = result;
    };
    protoOf(DeepRecursiveScopeImpl).v7 = function(result) {
        return this.xg(result);
    };
    protoOf(DeepRecursiveScopeImpl).qg = function(value, $completion) {
        var tmp = this;
        tmp.ug_1 = isInterface($completion, Continuation) ? $completion : THROW_CCE();
        this.tg_1 = value;
        return get_COROUTINE_SUSPENDED();
    };
    protoOf(DeepRecursiveScopeImpl).wg = function() {
        $l$loop: while (true) {
            var result = this.vg_1;
            var tmp0_elvis_lhs = this.ug_1;
            var tmp;
            if (tmp0_elvis_lhs == null) {
                var this_0 = new Result(result) instanceof Result ? result : THROW_CCE();
                throwOnFailure(this_0);
                return _Result___get_value__impl__bjfvqg(this_0);
            } else {
                tmp = tmp0_elvis_lhs;
            }
            var cont = tmp;
            if (equals(new Result(get_UNDEFINED_RESULT()), new Result(result))) {
                var tmp_0;
                try {
                    var tmp0 = this.sg_1;
                    var param = this.tg_1;
                    tmp_0 = startCoroutineUninterceptedOrReturnNonGeneratorVersion(tmp0, this, param, cont);
                } catch ($p) {
                    var tmp_1;
                    if ($p instanceof Error) {
                        var e = $p;
                        var tmp$ret$3 = _Result___init__impl__xyqfz8(createFailure(e));
                        cont.v7(tmp$ret$3);
                        continue $l$loop;
                    } else {
                        throw $p;
                    }
                }
                var r = tmp_0;
                if (!(r === get_COROUTINE_SUSPENDED())) {
                    var tmp$ret$5 = _Result___init__impl__xyqfz8(r);
                    cont.v7(tmp$ret$5);
                }
            } else {
                this.vg_1 = get_UNDEFINED_RESULT();
                cont.v7(result);
            }
        }
    };
    var properties_initialized_DeepRecursive_kt_5z0al2;
    function _init_properties_DeepRecursive_kt__zbwcac() {
        if (!properties_initialized_DeepRecursive_kt_5z0al2) {
            properties_initialized_DeepRecursive_kt_5z0al2 = true;
            var value = get_COROUTINE_SUSPENDED();
            UNDEFINED_RESULT = _Result___init__impl__xyqfz8(value);
        }
    }
    var static_init_called_1;
    function static_init_1() {
        if (static_init_called_1) return Unit_instance;
        static_init_called_1 = true;
        LazyThreadSafetyMode_SYNCHRONIZED_instance = new LazyThreadSafetyMode('SYNCHRONIZED', 0);
        LazyThreadSafetyMode_PUBLICATION_instance = new LazyThreadSafetyMode('PUBLICATION', 1);
        LazyThreadSafetyMode_NONE_instance = new LazyThreadSafetyMode('NONE', 2);
    }
    var LazyThreadSafetyMode_SYNCHRONIZED_instance;
    var LazyThreadSafetyMode_PUBLICATION_instance;
    var LazyThreadSafetyMode_NONE_instance;
    function LazyThreadSafetyMode(name, ordinal) {
        Enum.call(this, name, ordinal);
    }
    function UnsafeLazyImpl(initializer) {
        this.yg_1 = initializer;
        this.zg_1 = UNINITIALIZED_VALUE_instance;
    }
    protoOf(UnsafeLazyImpl).q1 = function() {
        if (this.zg_1 === UNINITIALIZED_VALUE_instance) {
            this.zg_1 = ensureNotNull(this.yg_1)();
            this.yg_1 = null;
        }
        return this.zg_1;
    };
    protoOf(UnsafeLazyImpl).ah = function() {
        return !(this.zg_1 === UNINITIALIZED_VALUE_instance);
    };
    protoOf(UnsafeLazyImpl).toString = function() {
        return this.ah() ? toString_0(this.q1()) : 'Lazy value not initialized yet.';
    };
    function UNINITIALIZED_VALUE() {}
    var UNINITIALIZED_VALUE_instance;
    function UNINITIALIZED_VALUE_getInstance() {
        return UNINITIALIZED_VALUE_instance;
    }
    function LazyThreadSafetyMode_PUBLICATION_getInstance() {
        static_init_1();
        return LazyThreadSafetyMode_PUBLICATION_instance;
    }
    function _Result___init__impl__xyqfz8(value) {
        return value;
    }
    function _Result___get_value__impl__bjfvqg($this) {
        return $this;
    }
    function _Result___get_isFailure__impl__jpiriv($this) {
        var tmp = _Result___get_value__impl__bjfvqg($this);
        return tmp instanceof Failure_0;
    }
    function Result__exceptionOrNull_impl_p6xea9($this) {
        var tmp;
        if (_Result___get_value__impl__bjfvqg($this) instanceof Failure_0) {
            tmp = _Result___get_value__impl__bjfvqg($this).bh_1;
        } else {
            tmp = null;
        }
        return tmp;
    }
    function Result__toString_impl_yu5r8k($this) {
        var tmp;
        if (_Result___get_value__impl__bjfvqg($this) instanceof Failure_0) {
            tmp = _Result___get_value__impl__bjfvqg($this).toString();
        } else {
            tmp = 'Success(' + toString_0(_Result___get_value__impl__bjfvqg($this)) + ')';
        }
        return tmp;
    }
    function Companion_14() {}
    var Companion_instance_14;
    function Companion_getInstance_14() {
        return Companion_instance_14;
    }
    function Failure_0(exception) {
        this.bh_1 = exception;
    }
    protoOf(Failure_0).equals = function(other) {
        var tmp;
        if (other instanceof Failure_0) {
            tmp = equals(this.bh_1, other.bh_1);
        } else {
            tmp = false;
        }
        return tmp;
    };
    protoOf(Failure_0).hashCode = function() {
        return hashCode_0(this.bh_1);
    };
    protoOf(Failure_0).toString = function() {
        return 'Failure(' + this.bh_1.toString() + ')';
    };
    function Result__hashCode_impl_d2zufp($this) {
        return $this == null ? 0 : hashCode_0($this);
    }
    function Result__equals_impl_bxgmep($this, other) {
        if (!(other instanceof Result)) return false;
        var tmp0_other_with_cast = other.ch_1;
        if (!equals($this, tmp0_other_with_cast)) return false;
        return true;
    }
    function Result(value) {
        this.ch_1 = value;
    }
    protoOf(Result).toString = function() {
        return Result__toString_impl_yu5r8k(this.ch_1);
    };
    protoOf(Result).hashCode = function() {
        return Result__hashCode_impl_d2zufp(this.ch_1);
    };
    protoOf(Result).equals = function(other) {
        return Result__equals_impl_bxgmep(this.ch_1, other);
    };
    function throwOnFailure(_this__u8e3s4) {
        var tmp = _Result___get_value__impl__bjfvqg(_this__u8e3s4);
        if (tmp instanceof Failure_0) throw _Result___get_value__impl__bjfvqg(_this__u8e3s4).bh_1;
    }
    function createFailure(exception) {
        return new Failure_0(exception);
    }
    function NotImplementedError(message) {
        message = message === VOID ? 'An operation is not implemented.' : message;
        Error_init_$Init$_0(message, this);
        captureStack(this, NotImplementedError);
    }
    function Pair(first, second) {
        this.nb_1 = first;
        this.ob_1 = second;
    }
    protoOf(Pair).toString = function() {
        return '(' + toString_0(this.nb_1) + ', ' + toString_0(this.ob_1) + ')';
    };
    protoOf(Pair).sb = function() {
        return this.nb_1;
    };
    protoOf(Pair).tb = function() {
        return this.ob_1;
    };
    protoOf(Pair).hashCode = function() {
        var result = this.nb_1 == null ? 0 : hashCode_0(this.nb_1);
        result = imul(result, 31) + (this.ob_1 == null ? 0 : hashCode_0(this.ob_1)) | 0;
        return result;
    };
    protoOf(Pair).equals = function(other) {
        if (this === other) return true;
        if (!(other instanceof Pair)) return false;
        if (!equals(this.nb_1, other.nb_1)) return false;
        if (!equals(this.ob_1, other.ob_1)) return false;
        return true;
    };
    function to(_this__u8e3s4, that) {
        return new Pair(_this__u8e3s4, that);
    }
    function Triple(first, second, third) {
        this.dh_1 = first;
        this.eh_1 = second;
        this.fh_1 = third;
    }
    protoOf(Triple).toString = function() {
        return '(' + toString_0(this.dh_1) + ', ' + toString_0(this.eh_1) + ', ' + toString_0(this.fh_1) + ')';
    };
    protoOf(Triple).hashCode = function() {
        var result = this.dh_1 == null ? 0 : hashCode_0(this.dh_1);
        result = imul(result, 31) + (this.eh_1 == null ? 0 : hashCode_0(this.eh_1)) | 0;
        result = imul(result, 31) + (this.fh_1 == null ? 0 : hashCode_0(this.fh_1)) | 0;
        return result;
    };
    protoOf(Triple).equals = function(other) {
        if (this === other) return true;
        if (!(other instanceof Triple)) return false;
        if (!equals(this.dh_1, other.dh_1)) return false;
        if (!equals(this.eh_1, other.eh_1)) return false;
        if (!equals(this.fh_1, other.fh_1)) return false;
        return true;
    };
    function Companion_15() {
        Companion_instance_15 = this;
        this.ma_1 = new Uuid(new Long(0, 0), new Long(0, 0));
        this.na_1 = 16;
        this.oa_1 = 128;
    }
    protoOf(Companion_15).pa = function(mostSignificantBits, leastSignificantBits) {
        var tmp;
        if (equalsLong(mostSignificantBits, new Long(0, 0)) && equalsLong(leastSignificantBits, new Long(0, 0))) {
            tmp = this.ma_1;
        } else {
            tmp = new Uuid(mostSignificantBits, leastSignificantBits);
        }
        return tmp;
    };
    protoOf(Companion_15).gh = function(uuidString) {
        var tmp;
        switch (uuidString.length) {
          case 36:
            tmp = uuidParseHexDash(uuidString);
            break;

          case 32:
            tmp = uuidParseHex(uuidString);
            break;

          default:
            throw IllegalArgumentException_init_$Create$_0('Expected either a 36-char string in the standard hex-and-dash UUID format or a 32-char hexadecimal string, ' + ('but was "' + truncateForErrorMessage_0(uuidString, 64) + '" of length ' + uuidString.length));
        }
        return tmp;
    };
    var Companion_instance_15;
    function Companion_getInstance_15() {
        if (Companion_instance_15 == null) new Companion_15;
        return Companion_instance_15;
    }
    function Uuid(mostSignificantBits, leastSignificantBits) {
        Companion_getInstance_15();
        this.hh_1 = mostSignificantBits;
        this.ih_1 = leastSignificantBits;
    }
    protoOf(Uuid).toString = function() {
        return this.jh();
    };
    protoOf(Uuid).jh = function() {
        var bytes = new Int8Array(36);
        formatBytesInto(this.hh_1, bytes, 0, 0, 4);
        var this_0 = _Char___init__impl__6a9atx(45);
        var tmp$ret$0 = Char__toInt_impl_vasixd(this_0);
        bytes[8] = toByte(tmp$ret$0);
        formatBytesInto(this.hh_1, bytes, 9, 4, 6);
        var this_1 = _Char___init__impl__6a9atx(45);
        var tmp$ret$1 = Char__toInt_impl_vasixd(this_1);
        bytes[13] = toByte(tmp$ret$1);
        formatBytesInto(this.hh_1, bytes, 14, 6, 8);
        var this_2 = _Char___init__impl__6a9atx(45);
        var tmp$ret$2 = Char__toInt_impl_vasixd(this_2);
        bytes[18] = toByte(tmp$ret$2);
        formatBytesInto(this.ih_1, bytes, 19, 0, 2);
        var this_3 = _Char___init__impl__6a9atx(45);
        var tmp$ret$3 = Char__toInt_impl_vasixd(this_3);
        bytes[23] = toByte(tmp$ret$3);
        formatBytesInto(this.ih_1, bytes, 24, 2, 8);
        return decodeToString(bytes);
    };
    protoOf(Uuid).equals = function(other) {
        if (this === other) return true;
        if (!(other instanceof Uuid)) return false;
        return equalsLong(this.hh_1, other.hh_1) && equalsLong(this.ih_1, other.ih_1);
    };
    protoOf(Uuid).kh = function(other) {
        var tmp;
        if (!equalsLong(this.hh_1, other.hh_1)) {
            var this_0 = this.hh_1;
            var tmp0 = _ULong___init__impl__c78o9k(this_0);
            var this_1 = other.hh_1;
            var other_0 = _ULong___init__impl__c78o9k(this_1);
            tmp = ulongCompare(_ULong___get_data__impl__fggpzb(tmp0), _ULong___get_data__impl__fggpzb(other_0));
        } else {
            var this_2 = this.ih_1;
            var tmp0_0 = _ULong___init__impl__c78o9k(this_2);
            var this_3 = other.ih_1;
            var other_1 = _ULong___init__impl__c78o9k(this_3);
            tmp = ulongCompare(_ULong___get_data__impl__fggpzb(tmp0_0), _ULong___get_data__impl__fggpzb(other_1));
        }
        return tmp;
    };
    protoOf(Uuid).d = function(other) {
        return this.kh(other instanceof Uuid ? other : THROW_CCE());
    };
    protoOf(Uuid).hashCode = function() {
        return bitwiseXor(this.hh_1, this.ih_1).hashCode();
    };
    function truncateForErrorMessage_0(_this__u8e3s4, maxLength) {
        return _this__u8e3s4.length <= maxLength ? _this__u8e3s4 : substring(_this__u8e3s4, 0, maxLength) + '...';
    }
    function uuidThrowUnexpectedCharacterException(inputString, errorDescription, errorIndex) {
        throw IllegalArgumentException_init_$Create$_0('Expected ' + errorDescription + ' at index ' + errorIndex + ", but was '" + toString(charCodeAt(inputString, errorIndex)) + "'");
    }
    function _UByte___init__impl__g9hnc4(data) {
        return data;
    }
    function _UByte___get_data__impl__jof9qr($this) {
        return $this;
    }
    function Companion_16() {
        Companion_instance_16 = this;
        this.lh_1 = _UByte___init__impl__g9hnc4(0);
        this.mh_1 = _UByte___init__impl__g9hnc4(-1);
        this.nh_1 = 1;
        this.oh_1 = 8;
    }
    var Companion_instance_16;
    function Companion_getInstance_16() {
        if (Companion_instance_16 == null) new Companion_16;
        return Companion_instance_16;
    }
    function UByte__compareTo_impl_5w5192($this, other) {
        var tmp = _UByte___get_data__impl__jof9qr($this) & 255;
        var tmp$ret$1 = _UByte___get_data__impl__jof9qr(other) & 255;
        return compareTo(tmp, tmp$ret$1);
    }
    function UByte__compareTo_impl_5w5192_0($this, other) {
        return UByte__compareTo_impl_5w5192($this.ph_1, other instanceof UByte ? other.ph_1 : THROW_CCE());
    }
    function UByte__toString_impl_v72jg($this) {
        return (_UByte___get_data__impl__jof9qr($this) & 255).toString();
    }
    function UByte__hashCode_impl_mmczcb($this) {
        return $this;
    }
    function UByte__equals_impl_nvqtsf($this, other) {
        if (!(other instanceof UByte)) return false;
        if (!($this === other.ph_1)) return false;
        return true;
    }
    function UByte(data) {
        Companion_getInstance_16();
        this.ph_1 = data;
    }
    protoOf(UByte).qh = function(other) {
        return UByte__compareTo_impl_5w5192(this.ph_1, other);
    };
    protoOf(UByte).d = function(other) {
        return UByte__compareTo_impl_5w5192_0(this, other);
    };
    protoOf(UByte).toString = function() {
        return UByte__toString_impl_v72jg(this.ph_1);
    };
    protoOf(UByte).hashCode = function() {
        return UByte__hashCode_impl_mmczcb(this.ph_1);
    };
    protoOf(UByte).equals = function(other) {
        return UByte__equals_impl_nvqtsf(this.ph_1, other);
    };
    function _UByteArray___init__impl__ip4y9n(storage) {
        return storage;
    }
    function _UByteArray___get_storage__impl__d4kctt($this) {
        return $this;
    }
    function _UByteArray___init__impl__ip4y9n_0(size) {
        return _UByteArray___init__impl__ip4y9n(new Int8Array(size));
    }
    function UByteArray__set_impl_jvcicn($this, index, value) {
        var tmp = _UByteArray___get_storage__impl__d4kctt($this);
        tmp[index] = _UByte___get_data__impl__jof9qr(value);
    }
    function _UByteArray___get_size__impl__h6pkdv($this) {
        return _UByteArray___get_storage__impl__d4kctt($this).length;
    }
    function UByteArray__iterator_impl_509y1p($this) {
        return new Iterator(_UByteArray___get_storage__impl__d4kctt($this));
    }
    function Iterator(array) {
        this.rh_1 = array;
        this.sh_1 = 0;
    }
    protoOf(Iterator).k = function() {
        return this.sh_1 < this.rh_1.length;
    };
    protoOf(Iterator).th = function() {
        var tmp;
        if (this.sh_1 < this.rh_1.length) {
            var _unary__edvuaz = this.sh_1;
            this.sh_1 = _unary__edvuaz + 1 | 0;
            var this_0 = this.rh_1[_unary__edvuaz];
            tmp = _UByte___init__impl__g9hnc4(this_0);
        } else {
            throw NoSuchElementException_init_$Create$_0(this.sh_1.toString());
        }
        return tmp;
    };
    protoOf(Iterator).l = function() {
        return new UByte(this.th());
    };
    function UByteArray__isEmpty_impl_nbfqsa($this) {
        return _UByteArray___get_storage__impl__d4kctt($this).length === 0;
    }
    function UByteArray__toString_impl_ukpl97($this) {
        return 'UByteArray(storage=' + toString_1($this) + ')';
    }
    function UByteArray__hashCode_impl_ip8jx2($this) {
        return hashCode_0($this);
    }
    function UByteArray__equals_impl_roka4u($this, other) {
        if (!(other instanceof UByteArray)) return false;
        var tmp0_other_with_cast = other.uh_1;
        if (!equals($this, tmp0_other_with_cast)) return false;
        return true;
    }
    function UByteArray(storage) {
        this.uh_1 = storage;
    }
    protoOf(UByteArray).m = function() {
        return _UByteArray___get_size__impl__h6pkdv(this.uh_1);
    };
    protoOf(UByteArray).j = function() {
        return UByteArray__iterator_impl_509y1p(this.uh_1);
    };
    protoOf(UByteArray).n = function() {
        return UByteArray__isEmpty_impl_nbfqsa(this.uh_1);
    };
    protoOf(UByteArray).toString = function() {
        return UByteArray__toString_impl_ukpl97(this.uh_1);
    };
    protoOf(UByteArray).hashCode = function() {
        return UByteArray__hashCode_impl_ip8jx2(this.uh_1);
    };
    protoOf(UByteArray).equals = function(other) {
        return UByteArray__equals_impl_roka4u(this.uh_1, other);
    };
    function _UInt___init__impl__l7qpdl(data) {
        return data;
    }
    function _UInt___get_data__impl__f0vqqw($this) {
        return $this;
    }
    function Companion_17() {
        Companion_instance_17 = this;
        this.vh_1 = _UInt___init__impl__l7qpdl(0);
        this.wh_1 = _UInt___init__impl__l7qpdl(-1);
        this.xh_1 = 4;
        this.yh_1 = 32;
    }
    var Companion_instance_17;
    function Companion_getInstance_17() {
        if (Companion_instance_17 == null) new Companion_17;
        return Companion_instance_17;
    }
    function UInt__compareTo_impl_yacclj($this, other) {
        return uintCompare(_UInt___get_data__impl__f0vqqw($this), _UInt___get_data__impl__f0vqqw(other));
    }
    function UInt__compareTo_impl_yacclj_0($this, other) {
        return UInt__compareTo_impl_yacclj($this.zh_1, other instanceof UInt ? other.zh_1 : THROW_CCE());
    }
    function UInt__toString_impl_dbgl21($this) {
        return (_UInt___get_data__impl__f0vqqw($this) >>> 0).toString();
    }
    function UInt__hashCode_impl_z2mhuw($this) {
        return $this;
    }
    function UInt__equals_impl_ffdoxg($this, other) {
        if (!(other instanceof UInt)) return false;
        if (!($this === other.zh_1)) return false;
        return true;
    }
    function UInt(data) {
        Companion_getInstance_17();
        this.zh_1 = data;
    }
    protoOf(UInt).ai = function(other) {
        return UInt__compareTo_impl_yacclj(this.zh_1, other);
    };
    protoOf(UInt).d = function(other) {
        return UInt__compareTo_impl_yacclj_0(this, other);
    };
    protoOf(UInt).toString = function() {
        return UInt__toString_impl_dbgl21(this.zh_1);
    };
    protoOf(UInt).hashCode = function() {
        return UInt__hashCode_impl_z2mhuw(this.zh_1);
    };
    protoOf(UInt).equals = function(other) {
        return UInt__equals_impl_ffdoxg(this.zh_1, other);
    };
    function _UIntArray___init__impl__ghjpc6(storage) {
        return storage;
    }
    function _UIntArray___get_storage__impl__92a0v0($this) {
        return $this;
    }
    function _UIntArray___init__impl__ghjpc6_0(size) {
        return _UIntArray___init__impl__ghjpc6(new Int32Array(size));
    }
    function UIntArray__set_impl_7f2zu2($this, index, value) {
        var tmp = _UIntArray___get_storage__impl__92a0v0($this);
        tmp[index] = _UInt___get_data__impl__f0vqqw(value);
    }
    function _UIntArray___get_size__impl__r6l8ci($this) {
        return _UIntArray___get_storage__impl__92a0v0($this).length;
    }
    function UIntArray__iterator_impl_tkdv7k($this) {
        return new Iterator_0(_UIntArray___get_storage__impl__92a0v0($this));
    }
    function Iterator_0(array) {
        this.bi_1 = array;
        this.ci_1 = 0;
    }
    protoOf(Iterator_0).k = function() {
        return this.ci_1 < this.bi_1.length;
    };
    protoOf(Iterator_0).di = function() {
        var tmp;
        if (this.ci_1 < this.bi_1.length) {
            var _unary__edvuaz = this.ci_1;
            this.ci_1 = _unary__edvuaz + 1 | 0;
            var this_0 = this.bi_1[_unary__edvuaz];
            tmp = _UInt___init__impl__l7qpdl(this_0);
        } else {
            throw NoSuchElementException_init_$Create$_0(this.ci_1.toString());
        }
        return tmp;
    };
    protoOf(Iterator_0).l = function() {
        return new UInt(this.di());
    };
    function UIntArray__isEmpty_impl_vd8j4n($this) {
        return _UIntArray___get_storage__impl__92a0v0($this).length === 0;
    }
    function UIntArray__toString_impl_3zy802($this) {
        return 'UIntArray(storage=' + toString_1($this) + ')';
    }
    function UIntArray__hashCode_impl_hr7ost($this) {
        return hashCode_0($this);
    }
    function UIntArray__equals_impl_flcmof($this, other) {
        if (!(other instanceof UIntArray)) return false;
        var tmp0_other_with_cast = other.ei_1;
        if (!equals($this, tmp0_other_with_cast)) return false;
        return true;
    }
    function UIntArray(storage) {
        this.ei_1 = storage;
    }
    protoOf(UIntArray).m = function() {
        return _UIntArray___get_size__impl__r6l8ci(this.ei_1);
    };
    protoOf(UIntArray).j = function() {
        return UIntArray__iterator_impl_tkdv7k(this.ei_1);
    };
    protoOf(UIntArray).n = function() {
        return UIntArray__isEmpty_impl_vd8j4n(this.ei_1);
    };
    protoOf(UIntArray).toString = function() {
        return UIntArray__toString_impl_3zy802(this.ei_1);
    };
    protoOf(UIntArray).hashCode = function() {
        return UIntArray__hashCode_impl_hr7ost(this.ei_1);
    };
    protoOf(UIntArray).equals = function(other) {
        return UIntArray__equals_impl_flcmof(this.ei_1, other);
    };
    function _ULong___init__impl__c78o9k(data) {
        return data;
    }
    function _ULong___get_data__impl__fggpzb($this) {
        return $this;
    }
    function Companion_18() {
        Companion_instance_18 = this;
        this.fi_1 = _ULong___init__impl__c78o9k(new Long(0, 0));
        this.gi_1 = _ULong___init__impl__c78o9k(new Long(-1, -1));
        this.hi_1 = 8;
        this.ii_1 = 64;
    }
    var Companion_instance_18;
    function Companion_getInstance_18() {
        if (Companion_instance_18 == null) new Companion_18;
        return Companion_instance_18;
    }
    function ULong__compareTo_impl_38i7tu($this, other) {
        return ulongCompare(_ULong___get_data__impl__fggpzb($this), _ULong___get_data__impl__fggpzb(other));
    }
    function ULong__compareTo_impl_38i7tu_0($this, other) {
        return ULong__compareTo_impl_38i7tu($this.ji_1, other instanceof ULong ? other.ji_1 : THROW_CCE());
    }
    function ULong__toString_impl_f9au7k($this) {
        var value = _ULong___get_data__impl__fggpzb($this);
        return ulongToString(value, 10);
    }
    function ULong__hashCode_impl_6hv2lb($this) {
        return $this.hashCode();
    }
    function ULong__equals_impl_o0gnyb($this, other) {
        if (!(other instanceof ULong)) return false;
        var tmp0_other_with_cast = other.ji_1;
        if (!equalsLong($this, tmp0_other_with_cast)) return false;
        return true;
    }
    function ULong(data) {
        Companion_getInstance_18();
        this.ji_1 = data;
    }
    protoOf(ULong).ki = function(other) {
        return ULong__compareTo_impl_38i7tu(this.ji_1, other);
    };
    protoOf(ULong).d = function(other) {
        return ULong__compareTo_impl_38i7tu_0(this, other);
    };
    protoOf(ULong).toString = function() {
        return ULong__toString_impl_f9au7k(this.ji_1);
    };
    protoOf(ULong).hashCode = function() {
        return ULong__hashCode_impl_6hv2lb(this.ji_1);
    };
    protoOf(ULong).equals = function(other) {
        return ULong__equals_impl_o0gnyb(this.ji_1, other);
    };
    function _ULongArray___init__impl__twm1l3(storage) {
        return storage;
    }
    function _ULongArray___get_storage__impl__28e64j($this) {
        return $this;
    }
    function _ULongArray___init__impl__twm1l3_0(size) {
        return _ULongArray___init__impl__twm1l3(longArray(size));
    }
    function ULongArray__set_impl_z19mvh($this, index, value) {
        var tmp = _ULongArray___get_storage__impl__28e64j($this);
        tmp[index] = _ULong___get_data__impl__fggpzb(value);
    }
    function _ULongArray___get_size__impl__ju6dtr($this) {
        return _ULongArray___get_storage__impl__28e64j($this).length;
    }
    function ULongArray__iterator_impl_cq4d2h($this) {
        return new Iterator_1(_ULongArray___get_storage__impl__28e64j($this));
    }
    function Iterator_1(array) {
        this.li_1 = array;
        this.mi_1 = 0;
    }
    protoOf(Iterator_1).k = function() {
        return this.mi_1 < this.li_1.length;
    };
    protoOf(Iterator_1).ni = function() {
        var tmp;
        if (this.mi_1 < this.li_1.length) {
            var _unary__edvuaz = this.mi_1;
            this.mi_1 = _unary__edvuaz + 1 | 0;
            var this_0 = this.li_1[_unary__edvuaz];
            tmp = _ULong___init__impl__c78o9k(this_0);
        } else {
            throw NoSuchElementException_init_$Create$_0(this.mi_1.toString());
        }
        return tmp;
    };
    protoOf(Iterator_1).l = function() {
        return new ULong(this.ni());
    };
    function ULongArray__isEmpty_impl_c3yngu($this) {
        return _ULongArray___get_storage__impl__28e64j($this).length === 0;
    }
    function ULongArray__toString_impl_wqk1p5($this) {
        return 'ULongArray(storage=' + toString_1($this) + ')';
    }
    function ULongArray__hashCode_impl_aze4wa($this) {
        return hashCode_0($this);
    }
    function ULongArray__equals_impl_vwitwa($this, other) {
        if (!(other instanceof ULongArray)) return false;
        var tmp0_other_with_cast = other.oi_1;
        if (!equals($this, tmp0_other_with_cast)) return false;
        return true;
    }
    function ULongArray(storage) {
        this.oi_1 = storage;
    }
    protoOf(ULongArray).m = function() {
        return _ULongArray___get_size__impl__ju6dtr(this.oi_1);
    };
    protoOf(ULongArray).j = function() {
        return ULongArray__iterator_impl_cq4d2h(this.oi_1);
    };
    protoOf(ULongArray).n = function() {
        return ULongArray__isEmpty_impl_c3yngu(this.oi_1);
    };
    protoOf(ULongArray).toString = function() {
        return ULongArray__toString_impl_wqk1p5(this.oi_1);
    };
    protoOf(ULongArray).hashCode = function() {
        return ULongArray__hashCode_impl_aze4wa(this.oi_1);
    };
    protoOf(ULongArray).equals = function(other) {
        return ULongArray__equals_impl_vwitwa(this.oi_1, other);
    };
    function _UShort___init__impl__jigrne(data) {
        return data;
    }
    function _UShort___get_data__impl__g0245($this) {
        return $this;
    }
    function Companion_19() {
        Companion_instance_19 = this;
        this.pi_1 = _UShort___init__impl__jigrne(0);
        this.qi_1 = _UShort___init__impl__jigrne(-1);
        this.ri_1 = 2;
        this.si_1 = 16;
    }
    var Companion_instance_19;
    function Companion_getInstance_19() {
        if (Companion_instance_19 == null) new Companion_19;
        return Companion_instance_19;
    }
    function UShort__compareTo_impl_1pfgyc($this, other) {
        var tmp = _UShort___get_data__impl__g0245($this) & 65535;
        var tmp$ret$1 = _UShort___get_data__impl__g0245(other) & 65535;
        return compareTo(tmp, tmp$ret$1);
    }
    function UShort__compareTo_impl_1pfgyc_0($this, other) {
        return UShort__compareTo_impl_1pfgyc($this.ti_1, other instanceof UShort ? other.ti_1 : THROW_CCE());
    }
    function UShort__toString_impl_edaoee($this) {
        return (_UShort___get_data__impl__g0245($this) & 65535).toString();
    }
    function UShort__hashCode_impl_ywngrv($this) {
        return $this;
    }
    function UShort__equals_impl_7t9pdz($this, other) {
        if (!(other instanceof UShort)) return false;
        if (!($this === other.ti_1)) return false;
        return true;
    }
    function UShort(data) {
        Companion_getInstance_19();
        this.ti_1 = data;
    }
    protoOf(UShort).ui = function(other) {
        return UShort__compareTo_impl_1pfgyc(this.ti_1, other);
    };
    protoOf(UShort).d = function(other) {
        return UShort__compareTo_impl_1pfgyc_0(this, other);
    };
    protoOf(UShort).toString = function() {
        return UShort__toString_impl_edaoee(this.ti_1);
    };
    protoOf(UShort).hashCode = function() {
        return UShort__hashCode_impl_ywngrv(this.ti_1);
    };
    protoOf(UShort).equals = function(other) {
        return UShort__equals_impl_7t9pdz(this.ti_1, other);
    };
    function _UShortArray___init__impl__9b26ef(storage) {
        return storage;
    }
    function _UShortArray___get_storage__impl__t2jpv5($this) {
        return $this;
    }
    function _UShortArray___init__impl__9b26ef_0(size) {
        return _UShortArray___init__impl__9b26ef(new Int16Array(size));
    }
    function UShortArray__set_impl_6d8whp($this, index, value) {
        var tmp = _UShortArray___get_storage__impl__t2jpv5($this);
        tmp[index] = _UShort___get_data__impl__g0245(value);
    }
    function _UShortArray___get_size__impl__jqto1b($this) {
        return _UShortArray___get_storage__impl__t2jpv5($this).length;
    }
    function UShortArray__iterator_impl_ktpenn($this) {
        return new Iterator_2(_UShortArray___get_storage__impl__t2jpv5($this));
    }
    function Iterator_2(array) {
        this.vi_1 = array;
        this.wi_1 = 0;
    }
    protoOf(Iterator_2).k = function() {
        return this.wi_1 < this.vi_1.length;
    };
    protoOf(Iterator_2).xi = function() {
        var tmp;
        if (this.wi_1 < this.vi_1.length) {
            var _unary__edvuaz = this.wi_1;
            this.wi_1 = _unary__edvuaz + 1 | 0;
            var this_0 = this.vi_1[_unary__edvuaz];
            tmp = _UShort___init__impl__jigrne(this_0);
        } else {
            throw NoSuchElementException_init_$Create$_0(this.wi_1.toString());
        }
        return tmp;
    };
    protoOf(Iterator_2).l = function() {
        return new UShort(this.xi());
    };
    function UShortArray__isEmpty_impl_cdd9l0($this) {
        return _UShortArray___get_storage__impl__t2jpv5($this).length === 0;
    }
    function UShortArray__toString_impl_omz03z($this) {
        return 'UShortArray(storage=' + toString_1($this) + ')';
    }
    function UShortArray__hashCode_impl_2vt3b4($this) {
        return hashCode_0($this);
    }
    function UShortArray__equals_impl_tyc3mk($this, other) {
        if (!(other instanceof UShortArray)) return false;
        var tmp0_other_with_cast = other.yi_1;
        if (!equals($this, tmp0_other_with_cast)) return false;
        return true;
    }
    function UShortArray(storage) {
        this.yi_1 = storage;
    }
    protoOf(UShortArray).m = function() {
        return _UShortArray___get_size__impl__jqto1b(this.yi_1);
    };
    protoOf(UShortArray).j = function() {
        return UShortArray__iterator_impl_ktpenn(this.yi_1);
    };
    protoOf(UShortArray).n = function() {
        return UShortArray__isEmpty_impl_cdd9l0(this.yi_1);
    };
    protoOf(UShortArray).toString = function() {
        return UShortArray__toString_impl_omz03z(this.yi_1);
    };
    protoOf(UShortArray).hashCode = function() {
        return UShortArray__hashCode_impl_2vt3b4(this.yi_1);
    };
    protoOf(UShortArray).equals = function(other) {
        return UShortArray__equals_impl_tyc3mk(this.yi_1, other);
    };
    function toULongOrNull(_this__u8e3s4) {
        return toULongOrNull_0(_this__u8e3s4, 10);
    }
    function toUInt(_this__u8e3s4) {
        var tmp0_elvis_lhs = toUIntOrNull(_this__u8e3s4);
        var tmp;
        var tmp_0 = tmp0_elvis_lhs;
        if ((tmp_0 == null ? null : new UInt(tmp_0)) == null) {
            numberFormatError(_this__u8e3s4);
        } else {
            tmp = tmp0_elvis_lhs;
        }
        return tmp;
    }
    function toULong(_this__u8e3s4) {
        var tmp0_elvis_lhs = toULongOrNull(_this__u8e3s4);
        var tmp;
        var tmp_0 = tmp0_elvis_lhs;
        if ((tmp_0 == null ? null : new ULong(tmp_0)) == null) {
            numberFormatError(_this__u8e3s4);
        } else {
            tmp = tmp0_elvis_lhs;
        }
        return tmp;
    }
    function toUByte(_this__u8e3s4) {
        var tmp0_elvis_lhs = toUByteOrNull(_this__u8e3s4);
        var tmp;
        var tmp_0 = tmp0_elvis_lhs;
        if ((tmp_0 == null ? null : new UByte(tmp_0)) == null) {
            numberFormatError(_this__u8e3s4);
        } else {
            tmp = tmp0_elvis_lhs;
        }
        return tmp;
    }
    function toUShort(_this__u8e3s4) {
        var tmp0_elvis_lhs = toUShortOrNull(_this__u8e3s4);
        var tmp;
        var tmp_0 = tmp0_elvis_lhs;
        if ((tmp_0 == null ? null : new UShort(tmp_0)) == null) {
            numberFormatError(_this__u8e3s4);
        } else {
            tmp = tmp0_elvis_lhs;
        }
        return tmp;
    }
    function toULongOrNull_0(_this__u8e3s4, radix) {
        checkRadix(radix);
        var length = _this__u8e3s4.length;
        if (length === 0) return null;
        var limit = _ULong___init__impl__c78o9k(new Long(-1, -1));
        var start;
        var firstChar = charCodeAt(_this__u8e3s4, 0);
        if (Char__compareTo_impl_ypi4mb(firstChar, _Char___init__impl__6a9atx(48)) < 0) {
            if (length === 1 || !(firstChar === _Char___init__impl__6a9atx(43))) return null;
            start = 1;
        } else {
            start = 0;
        }
        var limitForMaxRadix = _ULong___init__impl__c78o9k(new Long(477218588, 119304647));
        var limitBeforeMul = limitForMaxRadix;
        var uradix = _ULong___init__impl__c78o9k(fromInt(radix));
        var result = _ULong___init__impl__c78o9k(new Long(0, 0));
        var inductionVariable = start;
        if (inductionVariable < length) do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var digit = digitOf(charCodeAt(_this__u8e3s4, i), radix);
            if (digit < 0) return null;
            var tmp0 = result;
            var other = limitBeforeMul;
            if (ulongCompare(_ULong___get_data__impl__fggpzb(tmp0), _ULong___get_data__impl__fggpzb(other)) > 0) {
                if (equals(new ULong(limitBeforeMul), new ULong(limitForMaxRadix))) {
                    limitBeforeMul = ulongDivide(limit, uradix);
                    var tmp0_0 = result;
                    var other_0 = limitBeforeMul;
                    if (ulongCompare(_ULong___get_data__impl__fggpzb(tmp0_0), _ULong___get_data__impl__fggpzb(other_0)) > 0) {
                        return null;
                    }
                } else {
                    return null;
                }
            }
            var this_0 = result;
            result = _ULong___init__impl__c78o9k(multiply(_ULong___get_data__impl__fggpzb(this_0), _ULong___get_data__impl__fggpzb(uradix)));
            var beforeAdding = result;
            var tmp0_1 = result;
            var this_1 = _UInt___init__impl__l7qpdl(digit);
            var value = _UInt___get_data__impl__f0vqqw(this_1);
            var tmp$ret$9 = bitwiseAnd(fromInt(value), new Long(-1, 0));
            var other_1 = _ULong___init__impl__c78o9k(tmp$ret$9);
            result = _ULong___init__impl__c78o9k(add(_ULong___get_data__impl__fggpzb(tmp0_1), _ULong___get_data__impl__fggpzb(other_1)));
            var this_2 = result;
            if (ulongCompare(_ULong___get_data__impl__fggpzb(this_2), _ULong___get_data__impl__fggpzb(beforeAdding)) < 0) return null;
        } while (inductionVariable < length);
        return result;
    }
    function toUIntOrNull(_this__u8e3s4) {
        return toUIntOrNull_0(_this__u8e3s4, 10);
    }
    function toUByteOrNull(_this__u8e3s4) {
        return toUByteOrNull_0(_this__u8e3s4, 10);
    }
    function toUShortOrNull(_this__u8e3s4) {
        return toUShortOrNull_0(_this__u8e3s4, 10);
    }
    function toUIntOrNull_0(_this__u8e3s4, radix) {
        checkRadix(radix);
        var length = _this__u8e3s4.length;
        if (length === 0) return null;
        var limit = _UInt___init__impl__l7qpdl(-1);
        var start;
        var firstChar = charCodeAt(_this__u8e3s4, 0);
        if (Char__compareTo_impl_ypi4mb(firstChar, _Char___init__impl__6a9atx(48)) < 0) {
            if (length === 1 || !(firstChar === _Char___init__impl__6a9atx(43))) return null;
            start = 1;
        } else {
            start = 0;
        }
        var limitForMaxRadix = _UInt___init__impl__l7qpdl(119304647);
        var limitBeforeMul = limitForMaxRadix;
        var uradix = _UInt___init__impl__l7qpdl(radix);
        var result = _UInt___init__impl__l7qpdl(0);
        var inductionVariable = start;
        if (inductionVariable < length) do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var digit = digitOf(charCodeAt(_this__u8e3s4, i), radix);
            if (digit < 0) return null;
            var tmp0 = result;
            var other = limitBeforeMul;
            if (uintCompare(_UInt___get_data__impl__f0vqqw(tmp0), _UInt___get_data__impl__f0vqqw(other)) > 0) {
                if (equals(new UInt(limitBeforeMul), new UInt(limitForMaxRadix))) {
                    limitBeforeMul = uintDivide(limit, uradix);
                    var tmp0_0 = result;
                    var other_0 = limitBeforeMul;
                    if (uintCompare(_UInt___get_data__impl__f0vqqw(tmp0_0), _UInt___get_data__impl__f0vqqw(other_0)) > 0) {
                        return null;
                    }
                } else {
                    return null;
                }
            }
            var this_0 = result;
            result = _UInt___init__impl__l7qpdl(imul(_UInt___get_data__impl__f0vqqw(this_0), _UInt___get_data__impl__f0vqqw(uradix)));
            var beforeAdding = result;
            var tmp0_1 = result;
            var other_1 = _UInt___init__impl__l7qpdl(digit);
            result = _UInt___init__impl__l7qpdl(_UInt___get_data__impl__f0vqqw(tmp0_1) + _UInt___get_data__impl__f0vqqw(other_1) | 0);
            var this_1 = result;
            if (uintCompare(_UInt___get_data__impl__f0vqqw(this_1), _UInt___get_data__impl__f0vqqw(beforeAdding)) < 0) return null;
        } while (inductionVariable < length);
        return result;
    }
    function toUByteOrNull_0(_this__u8e3s4, radix) {
        var tmp0_elvis_lhs = toUIntOrNull_0(_this__u8e3s4, radix);
        var tmp;
        var tmp_0 = tmp0_elvis_lhs;
        if ((tmp_0 == null ? null : new UInt(tmp_0)) == null) {
            return null;
        } else {
            tmp = tmp0_elvis_lhs;
        }
        var int = tmp;
        var this_0 = _UByte___init__impl__g9hnc4(-1);
        var other = _UInt___init__impl__l7qpdl(_UByte___get_data__impl__jof9qr(this_0) & 255);
        if (uintCompare(_UInt___get_data__impl__f0vqqw(int), _UInt___get_data__impl__f0vqqw(other)) > 0) return null;
        var this_1 = _UInt___get_data__impl__f0vqqw(int);
        return _UByte___init__impl__g9hnc4(toByte(this_1));
    }
    function toUShortOrNull_0(_this__u8e3s4, radix) {
        var tmp0_elvis_lhs = toUIntOrNull_0(_this__u8e3s4, radix);
        var tmp;
        var tmp_0 = tmp0_elvis_lhs;
        if ((tmp_0 == null ? null : new UInt(tmp_0)) == null) {
            return null;
        } else {
            tmp = tmp0_elvis_lhs;
        }
        var int = tmp;
        var this_0 = _UShort___init__impl__jigrne(-1);
        var other = _UInt___init__impl__l7qpdl(_UShort___get_data__impl__g0245(this_0) & 65535);
        if (uintCompare(_UInt___get_data__impl__f0vqqw(int), _UInt___get_data__impl__f0vqqw(other)) > 0) return null;
        var this_1 = _UInt___get_data__impl__f0vqqw(int);
        return _UShort___init__impl__jigrne(toShort(this_1));
    }
    function KSerializer() {}
    function DeserializationStrategy() {}
    function SerializationException_init_$Init$($this) {
        IllegalArgumentException_init_$Init$($this);
        SerializationException.call($this);
        return $this;
    }
    function SerializationException_init_$Create$() {
        var tmp = SerializationException_init_$Init$(objectCreate(protoOf(SerializationException)));
        captureStack(tmp, SerializationException_init_$Create$);
        return tmp;
    }
    function SerializationException_init_$Init$_0(message, $this) {
        IllegalArgumentException_init_$Init$_0(message, $this);
        SerializationException.call($this);
        return $this;
    }
    function SerializationException_init_$Create$_0(message) {
        var tmp = SerializationException_init_$Init$_0(message, objectCreate(protoOf(SerializationException)));
        captureStack(tmp, SerializationException_init_$Create$_0);
        return tmp;
    }
    function SerializationException_init_$Init$_1(message, cause, $this) {
        IllegalArgumentException_init_$Init$_1(message, cause, $this);
        SerializationException.call($this);
        return $this;
    }
    function SerializationException() {
        captureStack(this, SerializationException);
    }
    function MissingFieldException(message, cause, missingFields, serialName) {
        SerializationException_init_$Init$_1(message, cause, this);
        captureStack(this, MissingFieldException);
        this.bj_1 = missingFields;
        this.cj_1 = serialName;
    }
    protoOf(MissingFieldException).dj = function(newMessage) {
        return new MissingFieldException(newMessage, this, this.bj_1, this.cj_1);
    };
    function serializer(_this__u8e3s4) {
        return StringSerializer_getInstance();
    }
    function serializer_0(_this__u8e3s4) {
        return UIntSerializer_getInstance();
    }
    function serializer_1(_this__u8e3s4) {
        return ULongSerializer_getInstance();
    }
    function serializer_2(_this__u8e3s4) {
        return UByteSerializer_getInstance();
    }
    function serializer_3(_this__u8e3s4) {
        return UShortSerializer_getInstance();
    }
    function serializer_4(_this__u8e3s4) {
        return IntSerializer_getInstance();
    }
    function serializer_5(_this__u8e3s4) {
        return LongSerializer_getInstance();
    }
    function serializer_6(_this__u8e3s4) {
        return ByteSerializer_getInstance();
    }
    function serializer_7(_this__u8e3s4) {
        return ShortSerializer_getInstance();
    }
    function serializer_8(_this__u8e3s4) {
        return CharSerializer_getInstance();
    }
    function CharArraySerializer() {
        return CharArraySerializer_getInstance();
    }
    function serializer_9(_this__u8e3s4) {
        return DoubleSerializer_getInstance();
    }
    function DoubleArraySerializer() {
        return DoubleArraySerializer_getInstance();
    }
    function serializer_10(_this__u8e3s4) {
        return FloatSerializer_getInstance();
    }
    function FloatArraySerializer() {
        return FloatArraySerializer_getInstance();
    }
    function LongArraySerializer() {
        return LongArraySerializer_getInstance();
    }
    function ULongArraySerializer() {
        return ULongArraySerializer_getInstance();
    }
    function IntArraySerializer() {
        return IntArraySerializer_getInstance();
    }
    function UIntArraySerializer() {
        return UIntArraySerializer_getInstance();
    }
    function ShortArraySerializer() {
        return ShortArraySerializer_getInstance();
    }
    function UShortArraySerializer() {
        return UShortArraySerializer_getInstance();
    }
    function ByteArraySerializer() {
        return ByteArraySerializer_getInstance();
    }
    function UByteArraySerializer() {
        return UByteArraySerializer_getInstance();
    }
    function serializer_11(_this__u8e3s4) {
        return BooleanSerializer_getInstance();
    }
    function BooleanArraySerializer() {
        return BooleanArraySerializer_getInstance();
    }
    function serializer_12(_this__u8e3s4) {
        return UnitSerializer_getInstance();
    }
    function NothingSerializer() {
        return NothingSerializer_getInstance();
    }
    function serializer_13(_this__u8e3s4) {
        return DurationSerializer_getInstance();
    }
    function serializer_14(_this__u8e3s4) {
        return InstantSerializer_getInstance();
    }
    function serializer_15(_this__u8e3s4) {
        return UuidSerializer_getInstance();
    }
    function MapSerializer(keySerializer, valueSerializer) {
        return new LinkedHashMapSerializer(keySerializer, valueSerializer);
    }
    function ListSerializer(elementSerializer) {
        return new ArrayListSerializer(elementSerializer);
    }
    function ContextDescriptor() {}
    function getContextualDescriptor(_this__u8e3s4, descriptor) {
        var tmp0_safe_receiver = get_capturedKClass(descriptor);
        var tmp;
        if (tmp0_safe_receiver == null) {
            tmp = null;
        } else {
            var tmp0_safe_receiver_0 = _this__u8e3s4.ej(tmp0_safe_receiver);
            tmp = tmp0_safe_receiver_0 == null ? null : tmp0_safe_receiver_0.zi();
        }
        return tmp;
    }
    function get_capturedKClass(_this__u8e3s4) {
        var tmp;
        if (_this__u8e3s4 instanceof ContextDescriptor) {
            tmp = _this__u8e3s4.gj_1;
        } else {
            if (_this__u8e3s4 instanceof SerialDescriptorForNullable) {
                tmp = get_capturedKClass(_this__u8e3s4.fj_1);
            } else {
                tmp = null;
            }
        }
        return tmp;
    }
    function SerialDescriptor() {}
    function get_elementDescriptors(_this__u8e3s4) {
        return new elementDescriptors$$inlined$Iterable$1(_this__u8e3s4);
    }
    function elementDescriptors$1($this_elementDescriptors) {
        this.tj_1 = $this_elementDescriptors;
        this.sj_1 = $this_elementDescriptors.lj();
    }
    protoOf(elementDescriptors$1).k = function() {
        return this.sj_1 > 0;
    };
    protoOf(elementDescriptors$1).l = function() {
        var tmp = this.tj_1.lj();
        var _unary__edvuaz = this.sj_1;
        this.sj_1 = _unary__edvuaz - 1 | 0;
        return this.tj_1.qj(tmp - _unary__edvuaz | 0);
    };
    function elementDescriptors$$inlined$Iterable$1($this_elementDescriptors) {
        this.uj_1 = $this_elementDescriptors;
    }
    protoOf(elementDescriptors$$inlined$Iterable$1).j = function() {
        return new elementDescriptors$1(this.uj_1);
    };
    function buildSerialDescriptor(serialName, kind, typeParameters, builder) {
        var tmp;
        if (builder === VOID) {
            tmp = buildSerialDescriptor$lambda;
        } else {
            tmp = builder;
        }
        builder = tmp;
        if (!!isBlank(serialName)) {
            var message = 'Blank serial names are prohibited';
            throw IllegalArgumentException_init_$Create$_0(toString_1(message));
        }
        if (!!equals(kind, CLASS_getInstance())) {
            var message_0 = "For StructureKind.CLASS please use 'buildClassSerialDescriptor' instead";
            throw IllegalArgumentException_init_$Create$_0(toString_1(message_0));
        }
        var sdBuilder = new ClassSerialDescriptorBuilder(serialName);
        builder(sdBuilder);
        return new SerialDescriptorImpl(serialName, kind, sdBuilder.yj_1.m(), toList(typeParameters), sdBuilder);
    }
    function ClassSerialDescriptorBuilder(serialName) {
        this.vj_1 = serialName;
        this.wj_1 = false;
        this.xj_1 = emptyList();
        this.yj_1 = ArrayList_init_$Create$();
        this.zj_1 = HashSet_init_$Create$();
        this.ak_1 = ArrayList_init_$Create$();
        this.bk_1 = ArrayList_init_$Create$();
        this.ck_1 = ArrayList_init_$Create$();
    }
    protoOf(ClassSerialDescriptorBuilder).dk = function(elementName, descriptor, annotations, isOptional) {
        if (!this.zj_1.i(elementName)) {
            var message = "Element with name '" + elementName + "' is already registered in " + this.vj_1;
            throw IllegalArgumentException_init_$Create$_0(toString_1(message));
        }
        this.yj_1.i(elementName);
        this.ak_1.i(descriptor);
        this.bk_1.i(annotations);
        this.ck_1.i(isOptional);
    };
    protoOf(ClassSerialDescriptorBuilder).ek = function(elementName, descriptor, annotations, isOptional, $super) {
        annotations = annotations === VOID ? emptyList() : annotations;
        isOptional = isOptional === VOID ? false : isOptional;
        var tmp;
        if ($super === VOID) {
            this.dk(elementName, descriptor, annotations, isOptional);
            tmp = Unit_instance;
        } else {
            tmp = $super.dk.call(this, elementName, descriptor, annotations, isOptional);
        }
        return tmp;
    };
    function _get__hashCode__tgwhef($this) {
        var tmp0 = $this.qk_1;
        var tmp = KProperty1;
        getPropertyCallableRef('_hashCode', 1, tmp, SerialDescriptorImpl$_get__hashCode_$ref_2v7wzp(), null);
        return tmp0.q1();
    }
    function SerialDescriptorImpl$_hashCode$delegate$lambda(this$0) {
        return function() {
            return hashCodeImpl(this$0, this$0.pk_1);
        };
    }
    function SerialDescriptorImpl$_get__hashCode_$ref_2v7wzp() {
        return constructCallableReference((function(p0) {
            return _get__hashCode__tgwhef(p0);
        }), 1, 0, 0);
    }
    function SerialDescriptorImpl(serialName, kind, elementsCount, typeParameters, builder) {
        this.fk_1 = serialName;
        this.gk_1 = kind;
        this.hk_1 = elementsCount;
        this.ik_1 = builder.xj_1;
        this.jk_1 = toHashSet(builder.yj_1);
        var tmp = this;
        var this_0 = builder.yj_1;
        tmp.kk_1 = copyToArray(this_0);
        this.lk_1 = compactArray(builder.ak_1);
        var tmp_0 = this;
        var this_1 = builder.bk_1;
        tmp_0.mk_1 = copyToArray(this_1);
        this.nk_1 = toBooleanArray(builder.ck_1);
        var tmp_1 = this;
        var this_2 = withIndex(this.kk_1);
        var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_2, 10));
        var _iterator__ex2g4s = this_2.j();
        while (_iterator__ex2g4s.k()) {
            var item = _iterator__ex2g4s.l();
            var tmp$ret$4 = to(item.ib_1, item.hb_1);
            destination.i(tmp$ret$4);
        }
        tmp_1.ok_1 = toMap(destination);
        this.pk_1 = compactArray(typeParameters);
        var tmp_2 = this;
        tmp_2.qk_1 = lazy_0(SerialDescriptorImpl$_hashCode$delegate$lambda(this));
    }
    protoOf(SerialDescriptorImpl).hj = function() {
        return this.fk_1;
    };
    protoOf(SerialDescriptorImpl).ij = function() {
        return this.gk_1;
    };
    protoOf(SerialDescriptorImpl).lj = function() {
        return this.hk_1;
    };
    protoOf(SerialDescriptorImpl).mj = function() {
        return this.ik_1;
    };
    protoOf(SerialDescriptorImpl).nj = function(index) {
        return getChecked(this.kk_1, index);
    };
    protoOf(SerialDescriptorImpl).oj = function(name) {
        var tmp0_elvis_lhs = this.ok_1.t1(name);
        return tmp0_elvis_lhs == null ? -3 : tmp0_elvis_lhs;
    };
    protoOf(SerialDescriptorImpl).pj = function(index) {
        return getChecked(this.mk_1, index);
    };
    protoOf(SerialDescriptorImpl).qj = function(index) {
        return getChecked(this.lk_1, index);
    };
    protoOf(SerialDescriptorImpl).rj = function(index) {
        return getChecked_0(this.nk_1, index);
    };
    protoOf(SerialDescriptorImpl).equals = function(other) {
        var tmp$ret$0;
        $l$block_5: {
            if (this === other) {
                tmp$ret$0 = true;
                break $l$block_5;
            }
            if (!(other instanceof SerialDescriptorImpl)) {
                tmp$ret$0 = false;
                break $l$block_5;
            }
            if (!(this.hj() === other.hj())) {
                tmp$ret$0 = false;
                break $l$block_5;
            }
            if (!contentEquals(this.pk_1, other.pk_1)) {
                tmp$ret$0 = false;
                break $l$block_5;
            }
            if (!(this.lj() === other.lj())) {
                tmp$ret$0 = false;
                break $l$block_5;
            }
            var inductionVariable = 0;
            var last = this.lj();
            if (inductionVariable < last) do {
                var index = inductionVariable;
                inductionVariable = inductionVariable + 1 | 0;
                if (!(this.qj(index).hj() === other.qj(index).hj())) {
                    tmp$ret$0 = false;
                    break $l$block_5;
                }
                if (!equals(this.qj(index).ij(), other.qj(index).ij())) {
                    tmp$ret$0 = false;
                    break $l$block_5;
                }
            } while (inductionVariable < last);
            tmp$ret$0 = true;
        }
        return tmp$ret$0;
    };
    protoOf(SerialDescriptorImpl).hashCode = function() {
        return _get__hashCode__tgwhef(this);
    };
    protoOf(SerialDescriptorImpl).toString = function() {
        return toStringImpl_0(this);
    };
    function PrimitiveSerialDescriptor(serialName, kind) {
        if (!!isBlank(serialName)) {
            var message = 'Blank serial names are prohibited';
            throw IllegalArgumentException_init_$Create$_0(toString_1(message));
        }
        return PrimitiveDescriptorSafe(serialName, kind);
    }
    function buildSerialDescriptor$lambda(_this__u8e3s4) {
        return Unit_instance;
    }
    function ENUM() {
        ENUM_instance = this;
        SerialKind.call(this);
    }
    var ENUM_instance;
    function ENUM_getInstance() {
        if (ENUM_instance == null) new ENUM;
        return ENUM_instance;
    }
    function CONTEXTUAL() {
        CONTEXTUAL_instance = this;
        SerialKind.call(this);
    }
    var CONTEXTUAL_instance;
    function CONTEXTUAL_getInstance() {
        if (CONTEXTUAL_instance == null) new CONTEXTUAL;
        return CONTEXTUAL_instance;
    }
    function SerialKind() {}
    protoOf(SerialKind).toString = function() {
        return ensureNotNull(getKClassFromExpression(this).v8());
    };
    protoOf(SerialKind).hashCode = function() {
        return getStringHashCode(this.toString());
    };
    function CLASS() {
        CLASS_instance = this;
        StructureKind.call(this);
    }
    var CLASS_instance;
    function CLASS_getInstance() {
        if (CLASS_instance == null) new CLASS;
        return CLASS_instance;
    }
    function LIST() {
        LIST_instance = this;
        StructureKind.call(this);
    }
    var LIST_instance;
    function LIST_getInstance() {
        if (LIST_instance == null) new LIST;
        return LIST_instance;
    }
    function MAP() {
        MAP_instance = this;
        StructureKind.call(this);
    }
    var MAP_instance;
    function MAP_getInstance() {
        if (MAP_instance == null) new MAP;
        return MAP_instance;
    }
    function OBJECT() {
        OBJECT_instance = this;
        StructureKind.call(this);
    }
    var OBJECT_instance;
    function OBJECT_getInstance() {
        if (OBJECT_instance == null) new OBJECT;
        return OBJECT_instance;
    }
    function StructureKind() {
        SerialKind.call(this);
    }
    function BOOLEAN() {
        BOOLEAN_instance = this;
        PrimitiveKind.call(this);
    }
    var BOOLEAN_instance;
    function BOOLEAN_getInstance() {
        if (BOOLEAN_instance == null) new BOOLEAN;
        return BOOLEAN_instance;
    }
    function BYTE() {
        BYTE_instance = this;
        PrimitiveKind.call(this);
    }
    var BYTE_instance;
    function BYTE_getInstance() {
        if (BYTE_instance == null) new BYTE;
        return BYTE_instance;
    }
    function CHAR() {
        CHAR_instance = this;
        PrimitiveKind.call(this);
    }
    var CHAR_instance;
    function CHAR_getInstance() {
        if (CHAR_instance == null) new CHAR;
        return CHAR_instance;
    }
    function SHORT() {
        SHORT_instance = this;
        PrimitiveKind.call(this);
    }
    var SHORT_instance;
    function SHORT_getInstance() {
        if (SHORT_instance == null) new SHORT;
        return SHORT_instance;
    }
    function INT() {
        INT_instance = this;
        PrimitiveKind.call(this);
    }
    var INT_instance;
    function INT_getInstance() {
        if (INT_instance == null) new INT;
        return INT_instance;
    }
    function LONG() {
        LONG_instance = this;
        PrimitiveKind.call(this);
    }
    var LONG_instance;
    function LONG_getInstance() {
        if (LONG_instance == null) new LONG;
        return LONG_instance;
    }
    function FLOAT() {
        FLOAT_instance = this;
        PrimitiveKind.call(this);
    }
    var FLOAT_instance;
    function FLOAT_getInstance() {
        if (FLOAT_instance == null) new FLOAT;
        return FLOAT_instance;
    }
    function DOUBLE() {
        DOUBLE_instance = this;
        PrimitiveKind.call(this);
    }
    var DOUBLE_instance;
    function DOUBLE_getInstance() {
        if (DOUBLE_instance == null) new DOUBLE;
        return DOUBLE_instance;
    }
    function STRING() {
        STRING_instance = this;
        PrimitiveKind.call(this);
    }
    var STRING_instance;
    function STRING_getInstance() {
        if (STRING_instance == null) new STRING;
        return STRING_instance;
    }
    function PrimitiveKind() {
        SerialKind.call(this);
    }
    function SEALED() {
        SEALED_instance = this;
        PolymorphicKind.call(this);
    }
    var SEALED_instance;
    function SEALED_getInstance() {
        if (SEALED_instance == null) new SEALED;
        return SEALED_instance;
    }
    function PolymorphicKind() {
        SerialKind.call(this);
    }
    function AbstractDecoder() {}
    protoOf(AbstractDecoder).rk = function() {
        throw SerializationException_init_$Create$_0(toString_1(getKClassFromExpression(this)) + " can't retrieve untyped values");
    };
    protoOf(AbstractDecoder).sk = function() {
        return true;
    };
    protoOf(AbstractDecoder).tk = function() {
        return null;
    };
    protoOf(AbstractDecoder).uk = function() {
        var tmp = this.rk();
        return typeof tmp === 'boolean' ? tmp : THROW_CCE();
    };
    protoOf(AbstractDecoder).vk = function() {
        var tmp = this.rk();
        return typeof tmp === 'number' ? tmp : THROW_CCE();
    };
    protoOf(AbstractDecoder).wk = function() {
        var tmp = this.rk();
        return typeof tmp === 'number' ? tmp : THROW_CCE();
    };
    protoOf(AbstractDecoder).xk = function() {
        var tmp = this.rk();
        return typeof tmp === 'number' ? tmp : THROW_CCE();
    };
    protoOf(AbstractDecoder).yk = function() {
        var tmp = this.rk();
        return tmp instanceof Long ? tmp : THROW_CCE();
    };
    protoOf(AbstractDecoder).zk = function() {
        var tmp = this.rk();
        return typeof tmp === 'number' ? tmp : THROW_CCE();
    };
    protoOf(AbstractDecoder).al = function() {
        var tmp = this.rk();
        return typeof tmp === 'number' ? tmp : THROW_CCE();
    };
    protoOf(AbstractDecoder).bl = function() {
        var tmp = this.rk();
        return tmp instanceof Char ? tmp.a1_1 : THROW_CCE();
    };
    protoOf(AbstractDecoder).cl = function() {
        var tmp = this.rk();
        return typeof tmp === 'string' ? tmp : THROW_CCE();
    };
    protoOf(AbstractDecoder).dl = function(descriptor) {
        return this;
    };
    protoOf(AbstractDecoder).el = function(deserializer, previousValue) {
        return this.fl(deserializer);
    };
    protoOf(AbstractDecoder).gl = function(descriptor) {
        return this;
    };
    protoOf(AbstractDecoder).hl = function(descriptor) {};
    protoOf(AbstractDecoder).il = function(descriptor, index) {
        return this.uk();
    };
    protoOf(AbstractDecoder).jl = function(descriptor, index) {
        return this.vk();
    };
    protoOf(AbstractDecoder).kl = function(descriptor, index) {
        return this.wk();
    };
    protoOf(AbstractDecoder).ll = function(descriptor, index) {
        return this.xk();
    };
    protoOf(AbstractDecoder).ml = function(descriptor, index) {
        return this.yk();
    };
    protoOf(AbstractDecoder).nl = function(descriptor, index) {
        return this.zk();
    };
    protoOf(AbstractDecoder).ol = function(descriptor, index) {
        return this.al();
    };
    protoOf(AbstractDecoder).pl = function(descriptor, index) {
        return this.bl();
    };
    protoOf(AbstractDecoder).ql = function(descriptor, index) {
        return this.dl(descriptor.qj(index));
    };
    protoOf(AbstractDecoder).rl = function(descriptor, index, deserializer, previousValue) {
        return this.el(deserializer, previousValue);
    };
    function Decoder() {}
    function CompositeDecoder() {}
    function AbstractPolymorphicSerializer() {}
    protoOf(AbstractPolymorphicSerializer).yl = function(decoder, klassName) {
        return decoder.tl().zl(this.xl(), klassName);
    };
    function NothingSerializer_0() {
        NothingSerializer_instance = this;
        this.am_1 = NothingSerialDescriptor_getInstance();
    }
    protoOf(NothingSerializer_0).zi = function() {
        return this.am_1;
    };
    protoOf(NothingSerializer_0).aj = function(decoder) {
        throw SerializationException_init_$Create$_0("'kotlin.Nothing' does not have instances");
    };
    var NothingSerializer_instance;
    function NothingSerializer_getInstance() {
        if (NothingSerializer_instance == null) new NothingSerializer_0;
        return NothingSerializer_instance;
    }
    function DurationSerializer() {
        DurationSerializer_instance = this;
        this.bm_1 = new PrimitiveSerialDescriptor_0('kotlin.time.Duration', STRING_getInstance());
    }
    protoOf(DurationSerializer).zi = function() {
        return this.bm_1;
    };
    protoOf(DurationSerializer).cm = function(decoder) {
        return Companion_getInstance_10().nf(decoder.cl());
    };
    protoOf(DurationSerializer).aj = function(decoder) {
        return new Duration(this.cm(decoder));
    };
    var DurationSerializer_instance;
    function DurationSerializer_getInstance() {
        if (DurationSerializer_instance == null) new DurationSerializer;
        return DurationSerializer_instance;
    }
    function InstantSerializer() {
        InstantSerializer_instance = this;
        this.dm_1 = new PrimitiveSerialDescriptor_0('kotlin.time.Instant', STRING_getInstance());
    }
    protoOf(InstantSerializer).zi = function() {
        return this.dm_1;
    };
    protoOf(InstantSerializer).aj = function(decoder) {
        return Companion_getInstance_12().zf(decoder.cl());
    };
    var InstantSerializer_instance;
    function InstantSerializer_getInstance() {
        if (InstantSerializer_instance == null) new InstantSerializer;
        return InstantSerializer_instance;
    }
    function UuidSerializer() {
        UuidSerializer_instance = this;
        this.em_1 = new PrimitiveSerialDescriptor_0('kotlin.uuid.Uuid', STRING_getInstance());
    }
    protoOf(UuidSerializer).zi = function() {
        return this.em_1;
    };
    protoOf(UuidSerializer).aj = function(decoder) {
        return Companion_getInstance_15().gh(decoder.cl());
    };
    var UuidSerializer_instance;
    function UuidSerializer_getInstance() {
        if (UuidSerializer_instance == null) new UuidSerializer;
        return UuidSerializer_instance;
    }
    function ArrayListClassDesc(elementDesc) {
        ListLikeDescriptor.call(this, elementDesc);
    }
    protoOf(ArrayListClassDesc).hj = function() {
        return 'kotlin.collections.ArrayList';
    };
    function LinkedHashMapClassDesc(keyDesc, valueDesc) {
        MapLikeDescriptor.call(this, 'kotlin.collections.LinkedHashMap', keyDesc, valueDesc);
    }
    function ListLikeDescriptor(elementDescriptor) {
        this.hm_1 = elementDescriptor;
        this.im_1 = 1;
    }
    protoOf(ListLikeDescriptor).ij = function() {
        return LIST_getInstance();
    };
    protoOf(ListLikeDescriptor).lj = function() {
        return this.im_1;
    };
    protoOf(ListLikeDescriptor).nj = function(index) {
        requireNonNegativeIndex(index, this.hj());
        return index.toString();
    };
    protoOf(ListLikeDescriptor).oj = function(name) {
        var tmp0_safe_receiver = toIntOrNull(name);
        var tmp;
        if (tmp0_safe_receiver == null) {
            tmp = null;
        } else {
            var tmp_0;
            if (tmp0_safe_receiver >= 0) {
                tmp_0 = tmp0_safe_receiver;
            } else {
                tmp_0 = null;
            }
            tmp = tmp_0;
        }
        var tmp1_elvis_lhs = tmp;
        return tmp1_elvis_lhs == null ? -3 : tmp1_elvis_lhs;
    };
    protoOf(ListLikeDescriptor).rj = function(index) {
        requireNonNegativeIndex(index, this.hj());
        return false;
    };
    protoOf(ListLikeDescriptor).pj = function(index) {
        requireNonNegativeIndex(index, this.hj());
        return emptyList();
    };
    protoOf(ListLikeDescriptor).qj = function(index) {
        requireNonNegativeIndex(index, this.hj());
        return this.hm_1;
    };
    protoOf(ListLikeDescriptor).equals = function(other) {
        if (this === other) return true;
        if (!(other instanceof ListLikeDescriptor)) return false;
        if (equals(this.hm_1, other.hm_1) && this.hj() === other.hj()) return true;
        return false;
    };
    protoOf(ListLikeDescriptor).hashCode = function() {
        return imul(hashCode_0(this.hm_1), 31) + getStringHashCode(this.hj()) | 0;
    };
    protoOf(ListLikeDescriptor).toString = function() {
        return this.hj() + '(' + toString_1(this.hm_1) + ')';
    };
    function MapLikeDescriptor(serialName, keyDescriptor, valueDescriptor) {
        this.jm_1 = serialName;
        this.km_1 = keyDescriptor;
        this.lm_1 = valueDescriptor;
        this.mm_1 = 2;
    }
    protoOf(MapLikeDescriptor).hj = function() {
        return this.jm_1;
    };
    protoOf(MapLikeDescriptor).ij = function() {
        return MAP_getInstance();
    };
    protoOf(MapLikeDescriptor).lj = function() {
        return this.mm_1;
    };
    protoOf(MapLikeDescriptor).nj = function(index) {
        requireNonNegativeIndex(index, this.hj());
        return index.toString();
    };
    protoOf(MapLikeDescriptor).oj = function(name) {
        var tmp0_safe_receiver = toIntOrNull(name);
        var tmp;
        if (tmp0_safe_receiver == null) {
            tmp = null;
        } else {
            var tmp_0;
            if (tmp0_safe_receiver >= 0) {
                tmp_0 = tmp0_safe_receiver;
            } else {
                tmp_0 = null;
            }
            tmp = tmp_0;
        }
        var tmp1_elvis_lhs = tmp;
        return tmp1_elvis_lhs == null ? -3 : tmp1_elvis_lhs;
    };
    protoOf(MapLikeDescriptor).rj = function(index) {
        requireNonNegativeIndex(index, this.hj());
        return false;
    };
    protoOf(MapLikeDescriptor).pj = function(index) {
        requireNonNegativeIndex(index, this.hj());
        return emptyList();
    };
    protoOf(MapLikeDescriptor).qj = function(index) {
        requireNonNegativeIndex(index, this.hj());
        var tmp;
        switch (index % 2 | 0) {
          case 0:
            tmp = this.km_1;
            break;

          case 1:
            tmp = this.lm_1;
            break;

          default:
            var message = 'Unreached';
            throw IllegalStateException_init_$Create$_0(toString_1(message));
        }
        return tmp;
    };
    protoOf(MapLikeDescriptor).equals = function(other) {
        if (this === other) return true;
        if (!(other instanceof MapLikeDescriptor)) return false;
        if (!(this.hj() === other.hj())) return false;
        if (!equals(this.km_1, other.km_1)) return false;
        if (!equals(this.lm_1, other.lm_1)) return false;
        return true;
    };
    protoOf(MapLikeDescriptor).hashCode = function() {
        var result = getStringHashCode(this.hj());
        result = imul(31, result) + hashCode_0(this.km_1) | 0;
        result = imul(31, result) + hashCode_0(this.lm_1) | 0;
        return result;
    };
    protoOf(MapLikeDescriptor).toString = function() {
        return this.hj() + '(' + toString_1(this.km_1) + ', ' + toString_1(this.lm_1) + ')';
    };
    function requireNonNegativeIndex(index, name) {
        if (index < 0) throw IndexOutOfBoundsException_init_$Create$_0('Illegal index ' + index + ', ' + name + ' expects only non-negative indices');
    }
    function PrimitiveArrayDescriptor(primitive) {
        ListLikeDescriptor.call(this, primitive);
        this.pm_1 = primitive.hj() + 'Array';
    }
    protoOf(PrimitiveArrayDescriptor).hj = function() {
        return this.pm_1;
    };
    function ArrayListSerializer(element) {
        CollectionSerializer.call(this, element);
        this.rm_1 = new ArrayListClassDesc(element.zi());
    }
    protoOf(ArrayListSerializer).zi = function() {
        return this.rm_1;
    };
    protoOf(ArrayListSerializer).sm = function(initialCapacityHint) {
        if (initialCapacityHint === -1) {
            return ArrayList_init_$Create$();
        }
        return ArrayList_init_$Create$_0(initialCapacityHint);
    };
    protoOf(ArrayListSerializer).tm = function(_this__u8e3s4) {
        return _this__u8e3s4.m();
    };
    protoOf(ArrayListSerializer).um = function(_this__u8e3s4) {
        return this.tm(_this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE());
    };
    protoOf(ArrayListSerializer).vm = function(_this__u8e3s4) {
        return _this__u8e3s4;
    };
    protoOf(ArrayListSerializer).wm = function(_this__u8e3s4) {
        return this.vm(_this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE());
    };
    protoOf(ArrayListSerializer).xm = function(_this__u8e3s4, expectedSize) {
        if (_this__u8e3s4 instanceof ArrayList) {
            _this__u8e3s4.d4(expectedSize);
            return _this__u8e3s4;
        }
        if (expectedSize === _this__u8e3s4.m()) return ArrayList_init_$Create$_1(_this__u8e3s4);
        var this_0 = ArrayList_init_$Create$_0(expectedSize);
        this_0.q(_this__u8e3s4);
        return this_0;
    };
    protoOf(ArrayListSerializer).ym = function(_this__u8e3s4, expectedSize) {
        return this.xm((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtList) : false) ? _this__u8e3s4 : THROW_CCE(), expectedSize);
    };
    protoOf(ArrayListSerializer).zm = function(_this__u8e3s4, index, element) {
        _this__u8e3s4.k3(index, element);
    };
    protoOf(ArrayListSerializer).an = function(_this__u8e3s4, index, element) {
        return this.zm(_this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE(), index, element);
    };
    function LinkedHashMapSerializer(kSerializer, vSerializer) {
        MapLikeSerializer.call(this, kSerializer, vSerializer);
        this.kn_1 = new LinkedHashMapClassDesc(kSerializer.zi(), vSerializer.zi());
    }
    protoOf(LinkedHashMapSerializer).zi = function() {
        return this.kn_1;
    };
    protoOf(LinkedHashMapSerializer).ln = function(_this__u8e3s4) {
        return _this__u8e3s4.m();
    };
    protoOf(LinkedHashMapSerializer).mn = function(_this__u8e3s4) {
        return this.ln((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtMap) : false) ? _this__u8e3s4 : THROW_CCE());
    };
    protoOf(LinkedHashMapSerializer).sm = function(initialCapacityHint) {
        if (initialCapacityHint === -1) return LinkedHashMap_init_$Create$();
        return newLinkedHashMap(initialCapacityHint);
    };
    protoOf(LinkedHashMapSerializer).nn = function(_this__u8e3s4) {
        return imul(_this__u8e3s4.m(), 2);
    };
    protoOf(LinkedHashMapSerializer).um = function(_this__u8e3s4) {
        return this.nn(_this__u8e3s4 instanceof LinkedHashMap ? _this__u8e3s4 : THROW_CCE());
    };
    protoOf(LinkedHashMapSerializer).on = function(_this__u8e3s4) {
        return _this__u8e3s4;
    };
    protoOf(LinkedHashMapSerializer).wm = function(_this__u8e3s4) {
        return this.on(_this__u8e3s4 instanceof LinkedHashMap ? _this__u8e3s4 : THROW_CCE());
    };
    protoOf(LinkedHashMapSerializer).pn = function(_this__u8e3s4, expectedSize) {
        if (_this__u8e3s4 instanceof LinkedHashMap) return _this__u8e3s4;
        if (expectedSize <= _this__u8e3s4.m()) return LinkedHashMap_init_$Create$_1(_this__u8e3s4);
        var this_0 = newLinkedHashMap(expectedSize);
        this_0.z1(_this__u8e3s4);
        return this_0;
    };
    protoOf(LinkedHashMapSerializer).ym = function(_this__u8e3s4, expectedSize) {
        return this.pn((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtMap) : false) ? _this__u8e3s4 : THROW_CCE(), expectedSize);
    };
    function CollectionSerializer(element) {
        CollectionLikeSerializer.call(this, element);
    }
    protoOf(CollectionSerializer).cn = function(_this__u8e3s4) {
        return _this__u8e3s4.m();
    };
    protoOf(CollectionSerializer).mn = function(_this__u8e3s4) {
        return this.cn((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, Collection) : false) ? _this__u8e3s4 : THROW_CCE());
    };
    function MapLikeSerializer(keySerializer, valueSerializer) {
        AbstractCollectionSerializer.call(this);
        this.qn_1 = keySerializer;
        this.rn_1 = valueSerializer;
    }
    protoOf(MapLikeSerializer).sn = function(decoder, builder, startIndex, size) {
        if (!(size >= 0)) {
            var message = 'Size must be known in advance when using READ_ALL';
            throw IllegalArgumentException_init_$Create$_0(toString_1(message));
        }
        var progression = step(until(0, imul(size, 2)), 2);
        var inductionVariable = progression.w_1;
        var last = progression.x_1;
        var step_0 = progression.y_1;
        if (step_0 > 0 && inductionVariable <= last || step_0 < 0 && last <= inductionVariable) do {
            var index = inductionVariable;
            inductionVariable = inductionVariable + step_0 | 0;
            this.tn(decoder, startIndex + index | 0, builder, false);
        } while (!(index === last));
    };
    protoOf(MapLikeSerializer).en = function(decoder, builder, startIndex, size) {
        return this.sn(decoder, (!(builder == null) ? isInterface(builder, KtMutableMap) : false) ? builder : THROW_CCE(), startIndex, size);
    };
    protoOf(MapLikeSerializer).tn = function(decoder, index, builder, checkIndex) {
        var key = decoder.sl(this.zi(), index, this.qn_1);
        var tmp;
        if (checkIndex) {
            var this_0 = decoder.vl(this.zi());
            if (!(this_0 === (index + 1 | 0))) {
                var message = 'Value must follow key in a map, index for key: ' + index + ', returned index for value: ' + this_0;
                throw IllegalArgumentException_init_$Create$_0(toString_1(message));
            }
            tmp = this_0;
        } else {
            tmp = index + 1 | 0;
        }
        var vIndex = tmp;
        var tmp_0;
        var tmp_1;
        if (builder.r1(key)) {
            var tmp_2 = this.rn_1.zi().ij();
            tmp_1 = !(tmp_2 instanceof PrimitiveKind);
        } else {
            tmp_1 = false;
        }
        if (tmp_1) {
            tmp_0 = decoder.rl(this.zi(), vIndex, this.rn_1, getValue(builder, key));
        } else {
            tmp_0 = decoder.sl(this.zi(), vIndex, this.rn_1);
        }
        var value = tmp_0;
        builder.x1(key, value);
    };
    protoOf(MapLikeSerializer).fn = function(decoder, index, builder, checkIndex) {
        return this.tn(decoder, index, (!(builder == null) ? isInterface(builder, KtMutableMap) : false) ? builder : THROW_CCE(), checkIndex);
    };
    function newLinkedHashMap(expectedCapacity) {
        var capacity = estimateCapacityForHashMap(expectedCapacity);
        return LinkedHashMap_init_$Create$_0(capacity);
    }
    function CollectionLikeSerializer(elementSerializer) {
        AbstractCollectionSerializer.call(this);
        this.dn_1 = elementSerializer;
    }
    protoOf(CollectionLikeSerializer).en = function(decoder, builder, startIndex, size) {
        if (!(size >= 0)) {
            var message = 'Size must be known in advance when using READ_ALL';
            throw IllegalArgumentException_init_$Create$_0(toString_1(message));
        }
        var inductionVariable = 0;
        if (inductionVariable < size) do {
            var index = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            this.fn(decoder, startIndex + index | 0, builder, false);
        } while (inductionVariable < size);
    };
    protoOf(CollectionLikeSerializer).fn = function(decoder, index, builder, checkIndex) {
        this.an(builder, index, decoder.sl(this.zi(), index, this.dn_1));
    };
    function AbstractCollectionSerializer() {}
    protoOf(AbstractCollectionSerializer).hn = function(decoder, previous) {
        var compositeDecoder = decoder.gl(this.zi());
        var expectedSize = compositeDecoder.wl(this.zi());
        if (!(expectedSize >= -1)) {
            var message = 'Decoded collection size should be either non-negative, or -1 (meaning, unknown). Was: ' + expectedSize;
            throw IllegalArgumentException_init_$Create$_0(toString_1(message));
        }
        var tmp;
        if (!(previous == null)) {
            tmp = this.ym(previous, this.mn(previous) + coerceAtLeast(expectedSize, 0) | 0);
        } else {
            tmp = this.sm(expectedSize);
        }
        var builder = tmp;
        var startIndex = this.um(builder);
        if (compositeDecoder.ul()) {
            this.en(compositeDecoder, builder, startIndex, expectedSize);
        } else {
            $l$loop: while (true) {
                var index = compositeDecoder.vl(this.zi());
                if (index === -1) break $l$loop;
                this.gn(compositeDecoder, startIndex + index | 0, builder);
            }
        }
        compositeDecoder.hl(this.zi());
        return this.wm(builder);
    };
    protoOf(AbstractCollectionSerializer).aj = function(decoder) {
        return this.hn(decoder, null);
    };
    protoOf(AbstractCollectionSerializer).gn = function(decoder, index, builder, checkIndex, $super) {
        checkIndex = checkIndex === VOID ? true : checkIndex;
        var tmp;
        if ($super === VOID) {
            this.fn(decoder, index, builder, checkIndex);
            tmp = Unit_instance;
        } else {
            tmp = $super.fn.call(this, decoder, index, builder, checkIndex);
        }
        return tmp;
    };
    function PrimitiveArraySerializer(primitiveSerializer) {
        CollectionLikeSerializer.call(this, primitiveSerializer);
        this.vn_1 = new PrimitiveArrayDescriptor(primitiveSerializer.zi());
    }
    protoOf(PrimitiveArraySerializer).zi = function() {
        return this.vn_1;
    };
    protoOf(PrimitiveArraySerializer).wn = function(_this__u8e3s4) {
        return _this__u8e3s4.xn();
    };
    protoOf(PrimitiveArraySerializer).um = function(_this__u8e3s4) {
        return this.wn(_this__u8e3s4 instanceof PrimitiveArrayBuilder ? _this__u8e3s4 : THROW_CCE());
    };
    protoOf(PrimitiveArraySerializer).yn = function(_this__u8e3s4) {
        return _this__u8e3s4.zn();
    };
    protoOf(PrimitiveArraySerializer).wm = function(_this__u8e3s4) {
        return this.yn(_this__u8e3s4 instanceof PrimitiveArrayBuilder ? _this__u8e3s4 : THROW_CCE());
    };
    protoOf(PrimitiveArraySerializer).ao = function(_this__u8e3s4, index, element) {
        var message = 'This method lead to boxing and must not be used, use Builder.append instead';
        throw IllegalStateException_init_$Create$_0(toString_1(message));
    };
    protoOf(PrimitiveArraySerializer).an = function(_this__u8e3s4, index, element) {
        return this.ao(_this__u8e3s4 instanceof PrimitiveArrayBuilder ? _this__u8e3s4 : THROW_CCE(), index, element);
    };
    protoOf(PrimitiveArraySerializer).sm = function(initialCapacityHint) {
        if (initialCapacityHint === -1) return this.bo();
        return this.co(initialCapacityHint);
    };
    protoOf(PrimitiveArraySerializer).aj = function(decoder) {
        return this.hn(decoder, null);
    };
    function PrimitiveArrayBuilder() {}
    protoOf(PrimitiveArrayBuilder).fo = function(requiredCapacity, $super) {
        requiredCapacity = requiredCapacity === VOID ? this.xn() + 1 | 0 : requiredCapacity;
        var tmp;
        if ($super === VOID) {
            this.eo(requiredCapacity);
            tmp = Unit_instance;
        } else {
            tmp = $super.eo.call(this, requiredCapacity);
        }
        return tmp;
    };
    function Companion_20() {
        Companion_instance_20 = this;
        this.go_1 = longArray(0);
    }
    var Companion_instance_20;
    function Companion_getInstance_20() {
        if (Companion_instance_20 == null) new Companion_20;
        return Companion_instance_20;
    }
    function prepareHighMarksArray($this, elementsCount) {
        var slotsCount = (elementsCount - 1 | 0) >>> 6 | 0;
        var elementsInLastSlot = elementsCount & 63;
        var highMarks = longArray(slotsCount);
        if (!(elementsInLastSlot === 0)) {
            highMarks[get_lastIndex_0(highMarks)] = shiftLeft(new Long(-1, -1), elementsCount);
        }
        return highMarks;
    }
    function markHigh($this, index) {
        var slot = (index >>> 6 | 0) - 1 | 0;
        var offsetInSlot = index & 63;
        $this.ko_1[slot] = bitwiseOr($this.ko_1[slot], shiftLeft(new Long(1, 0), offsetInSlot));
    }
    function nextUnmarkedHighIndex($this) {
        var inductionVariable = 0;
        var last = $this.ko_1.length - 1 | 0;
        if (inductionVariable <= last) do {
            var slot = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var slotOffset = imul(slot + 1 | 0, 64);
            var slotMarks = $this.ko_1[slot];
            while (!equalsLong(slotMarks, new Long(-1, -1))) {
                var indexInSlot = countTrailingZeroBits(invert(slotMarks));
                slotMarks = bitwiseOr(slotMarks, shiftLeft(new Long(1, 0), indexInSlot));
                var index = slotOffset + indexInSlot | 0;
                if ($this.io_1($this.ho_1, index)) {
                    $this.ko_1[slot] = slotMarks;
                    return index;
                }
            }
            $this.ko_1[slot] = slotMarks;
        } while (inductionVariable <= last);
        return -1;
    }
    function ElementMarker(descriptor, readIfAbsent) {
        Companion_getInstance_20();
        this.ho_1 = descriptor;
        this.io_1 = readIfAbsent;
        var elementsCount = this.ho_1.lj();
        if (elementsCount <= 64) {
            var tmp = this;
            var tmp_0;
            if (elementsCount === 64) {
                tmp_0 = new Long(0, 0);
            } else {
                tmp_0 = shiftLeft(new Long(-1, -1), elementsCount);
            }
            tmp.jo_1 = tmp_0;
            this.ko_1 = Companion_getInstance_20().go_1;
        } else {
            this.jo_1 = new Long(0, 0);
            this.ko_1 = prepareHighMarksArray(this, elementsCount);
        }
    }
    protoOf(ElementMarker).lo = function(index) {
        if (index < 64) {
            this.jo_1 = bitwiseOr(this.jo_1, shiftLeft(new Long(1, 0), index));
        } else {
            markHigh(this, index);
        }
    };
    protoOf(ElementMarker).mo = function() {
        var elementsCount = this.ho_1.lj();
        while (!equalsLong(this.jo_1, new Long(-1, -1))) {
            var index = countTrailingZeroBits(invert(this.jo_1));
            this.jo_1 = bitwiseOr(this.jo_1, shiftLeft(new Long(1, 0), index));
            if (this.io_1(this.ho_1, index)) {
                return index;
            }
        }
        if (elementsCount > 64) {
            return nextUnmarkedHighIndex(this);
        }
        return -1;
    };
    function InlinePrimitiveDescriptor(name, primitiveSerializer) {
        return new InlineClassDescriptor(name, new InlinePrimitiveDescriptor$1(primitiveSerializer));
    }
    function InlineClassDescriptor(name, generatedSerializer) {
        PluginGeneratedSerialDescriptor.call(this, name, generatedSerializer, 1);
        this.zo_1 = true;
    }
    protoOf(InlineClassDescriptor).kj = function() {
        return this.zo_1;
    };
    protoOf(InlineClassDescriptor).hashCode = function() {
        return imul(protoOf(PluginGeneratedSerialDescriptor).hashCode.call(this), 31);
    };
    protoOf(InlineClassDescriptor).equals = function(other) {
        var tmp$ret$0;
        $l$block_5: {
            if (this === other) {
                tmp$ret$0 = true;
                break $l$block_5;
            }
            if (!(other instanceof InlineClassDescriptor)) {
                tmp$ret$0 = false;
                break $l$block_5;
            }
            if (!(this.hj() === other.hj())) {
                tmp$ret$0 = false;
                break $l$block_5;
            }
            if (!(other.zo_1 && contentEquals(this.mp(), other.mp()))) {
                tmp$ret$0 = false;
                break $l$block_5;
            }
            if (!(this.lj() === other.lj())) {
                tmp$ret$0 = false;
                break $l$block_5;
            }
            var inductionVariable = 0;
            var last = this.lj();
            if (inductionVariable < last) do {
                var index = inductionVariable;
                inductionVariable = inductionVariable + 1 | 0;
                if (!(this.qj(index).hj() === other.qj(index).hj())) {
                    tmp$ret$0 = false;
                    break $l$block_5;
                }
                if (!equals(this.qj(index).ij(), other.qj(index).ij())) {
                    tmp$ret$0 = false;
                    break $l$block_5;
                }
            } while (inductionVariable < last);
            tmp$ret$0 = true;
        }
        return tmp$ret$0;
    };
    function InlinePrimitiveDescriptor$1($primitiveSerializer) {
        this.np_1 = $primitiveSerializer;
    }
    protoOf(InlinePrimitiveDescriptor$1).op = function() {
        return [ this.np_1 ];
    };
    protoOf(InlinePrimitiveDescriptor$1).zi = function() {
        var message = 'unsupported';
        throw IllegalStateException_init_$Create$_0(toString_1(message));
    };
    protoOf(InlinePrimitiveDescriptor$1).aj = function(decoder) {
        var message = 'unsupported';
        throw IllegalStateException_init_$Create$_0(toString_1(message));
    };
    function missingFieldExceptionWithNewMessage(exception, message) {
        return exception.dj(message);
    }
    function error($this) {
        throw IllegalStateException_init_$Create$_0('Descriptor for type `kotlin.Nothing` does not have elements');
    }
    function NothingSerialDescriptor() {
        NothingSerialDescriptor_instance = this;
        this.qp_1 = OBJECT_getInstance();
        this.rp_1 = 'kotlin.Nothing';
    }
    protoOf(NothingSerialDescriptor).ij = function() {
        return this.qp_1;
    };
    protoOf(NothingSerialDescriptor).hj = function() {
        return this.rp_1;
    };
    protoOf(NothingSerialDescriptor).lj = function() {
        return 0;
    };
    protoOf(NothingSerialDescriptor).nj = function(index) {
        error(this);
    };
    protoOf(NothingSerialDescriptor).oj = function(name) {
        error(this);
    };
    protoOf(NothingSerialDescriptor).rj = function(index) {
        error(this);
    };
    protoOf(NothingSerialDescriptor).qj = function(index) {
        error(this);
    };
    protoOf(NothingSerialDescriptor).pj = function(index) {
        error(this);
    };
    protoOf(NothingSerialDescriptor).toString = function() {
        return 'NothingSerialDescriptor';
    };
    protoOf(NothingSerialDescriptor).equals = function(other) {
        return this === other;
    };
    protoOf(NothingSerialDescriptor).hashCode = function() {
        return getStringHashCode(this.rp_1) + imul(31, this.qp_1.hashCode()) | 0;
    };
    var NothingSerialDescriptor_instance;
    function NothingSerialDescriptor_getInstance() {
        if (NothingSerialDescriptor_instance == null) new NothingSerialDescriptor;
        return NothingSerialDescriptor_instance;
    }
    function SerialDescriptorForNullable() {}
    function ObjectSerializer$descriptor$delegate$lambda$lambda(this$0) {
        return function($this$buildSerialDescriptor) {
            $this$buildSerialDescriptor.xj_1 = this$0.tp_1;
            return Unit_instance;
        };
    }
    function ObjectSerializer$descriptor$delegate$lambda($serialName, this$0) {
        return function() {
            var tmp = OBJECT_getInstance();
            return buildSerialDescriptor($serialName, tmp, [], ObjectSerializer$descriptor$delegate$lambda$lambda(this$0));
        };
    }
    function ObjectSerializer$_get_descriptor_$ref_7z4xb6() {
        return constructCallableReference((function(p0) {
            return p0.zi();
        }), 1, 0, 1);
    }
    function ObjectSerializer(serialName, objectInstance) {
        this.sp_1 = objectInstance;
        this.tp_1 = emptyList();
        var tmp = this;
        var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        tmp.up_1 = lazy(tmp_0, ObjectSerializer$descriptor$delegate$lambda(serialName, this));
    }
    protoOf(ObjectSerializer).zi = function() {
        var tmp0 = this.up_1;
        var tmp = KProperty1;
        getPropertyCallableRef('descriptor', 1, tmp, ObjectSerializer$_get_descriptor_$ref_7z4xb6(), null);
        return tmp0.q1();
    };
    protoOf(ObjectSerializer).aj = function(decoder) {
        var descriptor = this.zi();
        var composite = decoder.gl(descriptor);
        var tmp$ret$1;
        $l$block_0: {
            if (composite.ul()) {
                tmp$ret$1 = Unit_instance;
                break $l$block_0;
            }
            var index = composite.vl(this.zi());
            if (index === -1) {
                tmp$ret$1 = Unit_instance;
                break $l$block_0;
            } else throw SerializationException_init_$Create$_0('Unexpected index ' + index);
        }
        var result = tmp$ret$1;
        composite.hl(descriptor);
        return this.sp_1;
    };
    function get_EMPTY_DESCRIPTOR_ARRAY() {
        _init_properties_Platform_common_kt__3qzecs();
        return EMPTY_DESCRIPTOR_ARRAY;
    }
    var EMPTY_DESCRIPTOR_ARRAY;
    function compactArray(_this__u8e3s4) {
        _init_properties_Platform_common_kt__3qzecs();
        var tmp;
        if (!(_this__u8e3s4 == null || _this__u8e3s4.n())) {
            tmp = _this__u8e3s4;
        } else {
            tmp = null;
        }
        var tmp0_safe_receiver = tmp;
        var tmp_0;
        if (tmp0_safe_receiver == null) {
            tmp_0 = null;
        } else {
            tmp_0 = copyToArray(tmp0_safe_receiver);
        }
        var tmp1_elvis_lhs = tmp_0;
        return tmp1_elvis_lhs == null ? get_EMPTY_DESCRIPTOR_ARRAY() : tmp1_elvis_lhs;
    }
    var properties_initialized_Platform_common_kt_i7q4ty;
    function _init_properties_Platform_common_kt__3qzecs() {
        if (!properties_initialized_Platform_common_kt_i7q4ty) {
            properties_initialized_Platform_common_kt_i7q4ty = true;
            EMPTY_DESCRIPTOR_ARRAY = [];
        }
    }
    function _get_childSerializers__7vnyfa($this) {
        var tmp0 = $this.jp_1;
        var tmp = KProperty1;
        getPropertyCallableRef('childSerializers', 1, tmp, PluginGeneratedSerialDescriptor$_get_childSerializers_$ref_e7suca(), null);
        return tmp0.q1();
    }
    function _get__hashCode__tgwhef_0($this) {
        var tmp0 = $this.lp_1;
        var tmp = KProperty1;
        getPropertyCallableRef('_hashCode', 1, tmp, PluginGeneratedSerialDescriptor$_get__hashCode_$ref_cmj4vz(), null);
        return tmp0.q1();
    }
    function PluginGeneratedSerialDescriptor$childSerializers$delegate$lambda(this$0) {
        return function() {
            var tmp0_safe_receiver = this$0.bp_1;
            var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.op();
            return tmp1_elvis_lhs == null ? get_EMPTY_SERIALIZER_ARRAY() : tmp1_elvis_lhs;
        };
    }
    function PluginGeneratedSerialDescriptor$_get_childSerializers_$ref_e7suca() {
        return constructCallableReference((function(p0) {
            return _get_childSerializers__7vnyfa(p0);
        }), 1, 0, 2);
    }
    function PluginGeneratedSerialDescriptor$typeParameterDescriptors$delegate$lambda(this$0) {
        return function() {
            var tmp0_safe_receiver = this$0.bp_1;
            var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.pp();
            var tmp;
            if (tmp1_safe_receiver == null) {
                tmp = null;
            } else {
                var destination = ArrayList_init_$Create$_0(tmp1_safe_receiver.length);
                var inductionVariable = 0;
                var last = tmp1_safe_receiver.length;
                while (inductionVariable < last) {
                    var item = tmp1_safe_receiver[inductionVariable];
                    inductionVariable = inductionVariable + 1 | 0;
                    var tmp$ret$2 = item.zi();
                    destination.i(tmp$ret$2);
                }
                tmp = destination;
            }
            return compactArray(tmp);
        };
    }
    function PluginGeneratedSerialDescriptor$_get_typeParameterDescriptors_$ref_jk3pka() {
        return constructCallableReference((function(p0) {
            return p0.mp();
        }), 1, 0, 3);
    }
    function PluginGeneratedSerialDescriptor$_hashCode$delegate$lambda(this$0) {
        return function() {
            return hashCodeImpl(this$0, this$0.mp());
        };
    }
    function PluginGeneratedSerialDescriptor$_get__hashCode_$ref_cmj4vz() {
        return constructCallableReference((function(p0) {
            return _get__hashCode__tgwhef_0(p0);
        }), 1, 0, 4);
    }
    function PluginGeneratedSerialDescriptor(serialName, generatedSerializer, elementsCount) {
        generatedSerializer = generatedSerializer === VOID ? null : generatedSerializer;
        this.ap_1 = serialName;
        this.bp_1 = generatedSerializer;
        this.cp_1 = elementsCount;
        this.dp_1 = -1;
        var tmp = this;
        var tmp_0 = 0;
        var tmp_1 = this.cp_1;
        var tmp_2 = Array(tmp_1);
        while (tmp_0 < tmp_1) {
            tmp_2[tmp_0] = '[UNINITIALIZED]';
            tmp_0 = tmp_0 + 1 | 0;
        }
        tmp.ep_1 = tmp_2;
        var tmp_3 = this;
        var size = this.cp_1;
        tmp_3.fp_1 = Array(size);
        this.gp_1 = null;
        this.hp_1 = booleanArray(this.cp_1);
        this.ip_1 = emptyMap();
        var tmp_4 = this;
        var tmp_5 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        tmp_4.jp_1 = lazy(tmp_5, PluginGeneratedSerialDescriptor$childSerializers$delegate$lambda(this));
        var tmp_6 = this;
        var tmp_7 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        tmp_6.kp_1 = lazy(tmp_7, PluginGeneratedSerialDescriptor$typeParameterDescriptors$delegate$lambda(this));
        var tmp_8 = this;
        var tmp_9 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        tmp_8.lp_1 = lazy(tmp_9, PluginGeneratedSerialDescriptor$_hashCode$delegate$lambda(this));
    }
    protoOf(PluginGeneratedSerialDescriptor).hj = function() {
        return this.ap_1;
    };
    protoOf(PluginGeneratedSerialDescriptor).lj = function() {
        return this.cp_1;
    };
    protoOf(PluginGeneratedSerialDescriptor).ij = function() {
        return CLASS_getInstance();
    };
    protoOf(PluginGeneratedSerialDescriptor).mj = function() {
        var tmp0_elvis_lhs = this.gp_1;
        return tmp0_elvis_lhs == null ? emptyList() : tmp0_elvis_lhs;
    };
    protoOf(PluginGeneratedSerialDescriptor).mp = function() {
        var tmp0 = this.kp_1;
        var tmp = KProperty1;
        getPropertyCallableRef('typeParameterDescriptors', 1, tmp, PluginGeneratedSerialDescriptor$_get_typeParameterDescriptors_$ref_jk3pka(), null);
        return tmp0.q1();
    };
    protoOf(PluginGeneratedSerialDescriptor).qj = function(index) {
        return getChecked(_get_childSerializers__7vnyfa(this), index).zi();
    };
    protoOf(PluginGeneratedSerialDescriptor).rj = function(index) {
        return getChecked_0(this.hp_1, index);
    };
    protoOf(PluginGeneratedSerialDescriptor).pj = function(index) {
        var tmp0_elvis_lhs = getChecked(this.fp_1, index);
        return tmp0_elvis_lhs == null ? emptyList() : tmp0_elvis_lhs;
    };
    protoOf(PluginGeneratedSerialDescriptor).nj = function(index) {
        return getChecked(this.ep_1, index);
    };
    protoOf(PluginGeneratedSerialDescriptor).oj = function(name) {
        var tmp0_elvis_lhs = this.ip_1.t1(name);
        return tmp0_elvis_lhs == null ? -3 : tmp0_elvis_lhs;
    };
    protoOf(PluginGeneratedSerialDescriptor).equals = function(other) {
        var tmp$ret$0;
        $l$block_5: {
            if (this === other) {
                tmp$ret$0 = true;
                break $l$block_5;
            }
            if (!(other instanceof PluginGeneratedSerialDescriptor)) {
                tmp$ret$0 = false;
                break $l$block_5;
            }
            if (!(this.hj() === other.hj())) {
                tmp$ret$0 = false;
                break $l$block_5;
            }
            if (!contentEquals(this.mp(), other.mp())) {
                tmp$ret$0 = false;
                break $l$block_5;
            }
            if (!(this.lj() === other.lj())) {
                tmp$ret$0 = false;
                break $l$block_5;
            }
            var inductionVariable = 0;
            var last = this.lj();
            if (inductionVariable < last) do {
                var index = inductionVariable;
                inductionVariable = inductionVariable + 1 | 0;
                if (!(this.qj(index).hj() === other.qj(index).hj())) {
                    tmp$ret$0 = false;
                    break $l$block_5;
                }
                if (!equals(this.qj(index).ij(), other.qj(index).ij())) {
                    tmp$ret$0 = false;
                    break $l$block_5;
                }
            } while (inductionVariable < last);
            tmp$ret$0 = true;
        }
        return tmp$ret$0;
    };
    protoOf(PluginGeneratedSerialDescriptor).hashCode = function() {
        return _get__hashCode__tgwhef_0(this);
    };
    protoOf(PluginGeneratedSerialDescriptor).toString = function() {
        return toStringImpl_0(this);
    };
    function hashCodeImpl(_this__u8e3s4, typeParams) {
        var result = getStringHashCode(_this__u8e3s4.hj());
        result = imul(31, result) + contentHashCode(typeParams) | 0;
        var elementDescriptors = get_elementDescriptors(_this__u8e3s4);
        var accumulator = 1;
        var _iterator__ex2g4s = elementDescriptors.j();
        while (_iterator__ex2g4s.k()) {
            var element = _iterator__ex2g4s.l();
            var hash = accumulator;
            var tmp = imul(31, hash);
            var tmp0_safe_receiver = element.hj();
            var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : hashCode_0(tmp0_safe_receiver);
            accumulator = tmp + (tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs) | 0;
        }
        var namesHash = accumulator;
        var accumulator_0 = 1;
        var _iterator__ex2g4s_0 = elementDescriptors.j();
        while (_iterator__ex2g4s_0.k()) {
            var element_0 = _iterator__ex2g4s_0.l();
            var hash_0 = accumulator_0;
            var tmp_0 = imul(31, hash_0);
            var tmp0_safe_receiver_0 = element_0.ij();
            var tmp1_elvis_lhs_0 = tmp0_safe_receiver_0 == null ? null : hashCode_0(tmp0_safe_receiver_0);
            accumulator_0 = tmp_0 + (tmp1_elvis_lhs_0 == null ? 0 : tmp1_elvis_lhs_0) | 0;
        }
        var kindHash = accumulator_0;
        result = imul(31, result) + namesHash | 0;
        result = imul(31, result) + kindHash | 0;
        return result;
    }
    function toStringImpl_0(_this__u8e3s4) {
        var tmp = until(0, _this__u8e3s4.lj());
        var tmp_0 = _this__u8e3s4.hj() + '(';
        return joinToString_0(tmp, ', ', tmp_0, ')', VOID, VOID, toStringImpl$lambda(_this__u8e3s4));
    }
    function toStringImpl$lambda($this_toStringImpl) {
        return function(i) {
            return $this_toStringImpl.nj(i) + ': ' + $this_toStringImpl.qj(i).hj();
        };
    }
    function get_EMPTY_SERIALIZER_ARRAY() {
        _init_properties_PluginHelperInterfaces_kt__xgvzfp();
        return EMPTY_SERIALIZER_ARRAY;
    }
    var EMPTY_SERIALIZER_ARRAY;
    function GeneratedSerializer() {}
    var properties_initialized_PluginHelperInterfaces_kt_ap8in1;
    function _init_properties_PluginHelperInterfaces_kt__xgvzfp() {
        if (!properties_initialized_PluginHelperInterfaces_kt_ap8in1) {
            properties_initialized_PluginHelperInterfaces_kt_ap8in1 = true;
            EMPTY_SERIALIZER_ARRAY = [];
        }
    }
    function CharArraySerializer_0() {
        CharArraySerializer_instance = this;
        PrimitiveArraySerializer.call(this, serializer_8(Companion_getInstance()));
    }
    protoOf(CharArraySerializer_0).xp = function(_this__u8e3s4) {
        return _this__u8e3s4.length;
    };
    protoOf(CharArraySerializer_0).mn = function(_this__u8e3s4) {
        return this.xp((!(_this__u8e3s4 == null) ? isCharArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
    };
    protoOf(CharArraySerializer_0).yp = function(_this__u8e3s4, expectedSize) {
        if (expectedSize === _this__u8e3s4.length) return CharArrayBuilder_init_$Create$(_this__u8e3s4);
        return new CharArrayBuilder(copyOf_1(_this__u8e3s4, expectedSize), _this__u8e3s4.length);
    };
    protoOf(CharArraySerializer_0).ym = function(_this__u8e3s4, expectedSize) {
        return this.yp((!(_this__u8e3s4 == null) ? isCharArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE(), expectedSize);
    };
    protoOf(CharArraySerializer_0).co = function(size) {
        return CharArrayBuilder_init_$Create$_0(size);
    };
    protoOf(CharArraySerializer_0).bo = function() {
        return CharArrayBuilder_init_$Create$_1();
    };
    protoOf(CharArraySerializer_0).zp = function(decoder, index, builder, checkIndex) {
        builder.cq(decoder.pl(this.vn_1, index));
    };
    protoOf(CharArraySerializer_0).fn = function(decoder, index, builder, checkIndex) {
        return this.zp(decoder, index, builder instanceof CharArrayBuilder ? builder : THROW_CCE(), checkIndex);
    };
    protoOf(CharArraySerializer_0).do = function(decoder, index, builder, checkIndex) {
        return this.zp(decoder, index, builder instanceof CharArrayBuilder ? builder : THROW_CCE(), checkIndex);
    };
    var CharArraySerializer_instance;
    function CharArraySerializer_getInstance() {
        if (CharArraySerializer_instance == null) new CharArraySerializer_0;
        return CharArraySerializer_instance;
    }
    function DoubleArraySerializer_0() {
        DoubleArraySerializer_instance = this;
        PrimitiveArraySerializer.call(this, serializer_9(DoubleCompanionObject_instance));
    }
    protoOf(DoubleArraySerializer_0).fq = function(_this__u8e3s4) {
        return _this__u8e3s4.length;
    };
    protoOf(DoubleArraySerializer_0).mn = function(_this__u8e3s4) {
        return this.fq((!(_this__u8e3s4 == null) ? isDoubleArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
    };
    protoOf(DoubleArraySerializer_0).gq = function(_this__u8e3s4, expectedSize) {
        if (expectedSize === _this__u8e3s4.length) return DoubleArrayBuilder_init_$Create$(_this__u8e3s4);
        return new DoubleArrayBuilder(copyOf_2(_this__u8e3s4, expectedSize), _this__u8e3s4.length);
    };
    protoOf(DoubleArraySerializer_0).ym = function(_this__u8e3s4, expectedSize) {
        return this.gq((!(_this__u8e3s4 == null) ? isDoubleArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE(), expectedSize);
    };
    protoOf(DoubleArraySerializer_0).co = function(size) {
        return DoubleArrayBuilder_init_$Create$_0(size);
    };
    protoOf(DoubleArraySerializer_0).bo = function() {
        return DoubleArrayBuilder_init_$Create$_1();
    };
    protoOf(DoubleArraySerializer_0).hq = function(decoder, index, builder, checkIndex) {
        builder.kq(decoder.ol(this.vn_1, index));
    };
    protoOf(DoubleArraySerializer_0).fn = function(decoder, index, builder, checkIndex) {
        return this.hq(decoder, index, builder instanceof DoubleArrayBuilder ? builder : THROW_CCE(), checkIndex);
    };
    protoOf(DoubleArraySerializer_0).do = function(decoder, index, builder, checkIndex) {
        return this.hq(decoder, index, builder instanceof DoubleArrayBuilder ? builder : THROW_CCE(), checkIndex);
    };
    var DoubleArraySerializer_instance;
    function DoubleArraySerializer_getInstance() {
        if (DoubleArraySerializer_instance == null) new DoubleArraySerializer_0;
        return DoubleArraySerializer_instance;
    }
    function FloatArraySerializer_0() {
        FloatArraySerializer_instance = this;
        PrimitiveArraySerializer.call(this, serializer_10(FloatCompanionObject_instance));
    }
    protoOf(FloatArraySerializer_0).nq = function(_this__u8e3s4) {
        return _this__u8e3s4.length;
    };
    protoOf(FloatArraySerializer_0).mn = function(_this__u8e3s4) {
        return this.nq((!(_this__u8e3s4 == null) ? isFloatArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
    };
    protoOf(FloatArraySerializer_0).oq = function(_this__u8e3s4, expectedSize) {
        if (expectedSize === _this__u8e3s4.length) return FloatArrayBuilder_init_$Create$(_this__u8e3s4);
        return new FloatArrayBuilder(copyOf_3(_this__u8e3s4, expectedSize), _this__u8e3s4.length);
    };
    protoOf(FloatArraySerializer_0).ym = function(_this__u8e3s4, expectedSize) {
        return this.oq((!(_this__u8e3s4 == null) ? isFloatArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE(), expectedSize);
    };
    protoOf(FloatArraySerializer_0).co = function(size) {
        return FloatArrayBuilder_init_$Create$_0(size);
    };
    protoOf(FloatArraySerializer_0).bo = function() {
        return FloatArrayBuilder_init_$Create$_1();
    };
    protoOf(FloatArraySerializer_0).pq = function(decoder, index, builder, checkIndex) {
        builder.sq(decoder.nl(this.vn_1, index));
    };
    protoOf(FloatArraySerializer_0).fn = function(decoder, index, builder, checkIndex) {
        return this.pq(decoder, index, builder instanceof FloatArrayBuilder ? builder : THROW_CCE(), checkIndex);
    };
    protoOf(FloatArraySerializer_0).do = function(decoder, index, builder, checkIndex) {
        return this.pq(decoder, index, builder instanceof FloatArrayBuilder ? builder : THROW_CCE(), checkIndex);
    };
    var FloatArraySerializer_instance;
    function FloatArraySerializer_getInstance() {
        if (FloatArraySerializer_instance == null) new FloatArraySerializer_0;
        return FloatArraySerializer_instance;
    }
    function LongArraySerializer_0() {
        LongArraySerializer_instance = this;
        PrimitiveArraySerializer.call(this, serializer_5(Companion_getInstance_1()));
    }
    protoOf(LongArraySerializer_0).vq = function(_this__u8e3s4) {
        return _this__u8e3s4.length;
    };
    protoOf(LongArraySerializer_0).mn = function(_this__u8e3s4) {
        return this.vq((!(_this__u8e3s4 == null) ? isLongArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
    };
    protoOf(LongArraySerializer_0).wq = function(_this__u8e3s4, expectedSize) {
        if (expectedSize === _this__u8e3s4.length) return LongArrayBuilder_init_$Create$(_this__u8e3s4);
        return new LongArrayBuilder(copyOf_4(_this__u8e3s4, expectedSize), _this__u8e3s4.length);
    };
    protoOf(LongArraySerializer_0).ym = function(_this__u8e3s4, expectedSize) {
        return this.wq((!(_this__u8e3s4 == null) ? isLongArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE(), expectedSize);
    };
    protoOf(LongArraySerializer_0).co = function(size) {
        return LongArrayBuilder_init_$Create$_0(size);
    };
    protoOf(LongArraySerializer_0).bo = function() {
        return LongArrayBuilder_init_$Create$_1();
    };
    protoOf(LongArraySerializer_0).xq = function(decoder, index, builder, checkIndex) {
        builder.ar(decoder.ml(this.vn_1, index));
    };
    protoOf(LongArraySerializer_0).fn = function(decoder, index, builder, checkIndex) {
        return this.xq(decoder, index, builder instanceof LongArrayBuilder ? builder : THROW_CCE(), checkIndex);
    };
    protoOf(LongArraySerializer_0).do = function(decoder, index, builder, checkIndex) {
        return this.xq(decoder, index, builder instanceof LongArrayBuilder ? builder : THROW_CCE(), checkIndex);
    };
    var LongArraySerializer_instance;
    function LongArraySerializer_getInstance() {
        if (LongArraySerializer_instance == null) new LongArraySerializer_0;
        return LongArraySerializer_instance;
    }
    function ULongArraySerializer_0() {
        ULongArraySerializer_instance = this;
        PrimitiveArraySerializer.call(this, serializer_1(Companion_getInstance_18()));
    }
    protoOf(ULongArraySerializer_0).dr = function(_this__u8e3s4) {
        return _ULongArray___get_size__impl__ju6dtr(_this__u8e3s4);
    };
    protoOf(ULongArraySerializer_0).mn = function(_this__u8e3s4) {
        return this.dr(_this__u8e3s4 instanceof ULongArray ? _this__u8e3s4.oi_1 : THROW_CCE());
    };
    protoOf(ULongArraySerializer_0).er = function(_this__u8e3s4, expectedSize) {
        if (expectedSize === _ULongArray___get_size__impl__ju6dtr(_this__u8e3s4)) return ULongArrayBuilder_init_$Create$(_this__u8e3s4);
        var tmp$ret$0 = _ULongArray___init__impl__twm1l3(copyOf_4(_ULongArray___get_storage__impl__28e64j(_this__u8e3s4), expectedSize));
        return new ULongArrayBuilder(tmp$ret$0, _ULongArray___get_size__impl__ju6dtr(_this__u8e3s4));
    };
    protoOf(ULongArraySerializer_0).ym = function(_this__u8e3s4, expectedSize) {
        return this.er(_this__u8e3s4 instanceof ULongArray ? _this__u8e3s4.oi_1 : THROW_CCE(), expectedSize);
    };
    protoOf(ULongArraySerializer_0).co = function(size) {
        return ULongArrayBuilder_init_$Create$_0(size);
    };
    protoOf(ULongArraySerializer_0).bo = function() {
        return ULongArrayBuilder_init_$Create$_1();
    };
    protoOf(ULongArraySerializer_0).fr = function(decoder, index, builder, checkIndex) {
        var this_0 = decoder.ql(this.vn_1, index).yk();
        var tmp$ret$0 = _ULong___init__impl__c78o9k(this_0);
        builder.ir(tmp$ret$0);
    };
    protoOf(ULongArraySerializer_0).fn = function(decoder, index, builder, checkIndex) {
        return this.fr(decoder, index, builder instanceof ULongArrayBuilder ? builder : THROW_CCE(), checkIndex);
    };
    protoOf(ULongArraySerializer_0).do = function(decoder, index, builder, checkIndex) {
        return this.fr(decoder, index, builder instanceof ULongArrayBuilder ? builder : THROW_CCE(), checkIndex);
    };
    var ULongArraySerializer_instance;
    function ULongArraySerializer_getInstance() {
        if (ULongArraySerializer_instance == null) new ULongArraySerializer_0;
        return ULongArraySerializer_instance;
    }
    function IntArraySerializer_0() {
        IntArraySerializer_instance = this;
        PrimitiveArraySerializer.call(this, serializer_4(IntCompanionObject_instance));
    }
    protoOf(IntArraySerializer_0).lr = function(_this__u8e3s4) {
        return _this__u8e3s4.length;
    };
    protoOf(IntArraySerializer_0).mn = function(_this__u8e3s4) {
        return this.lr((!(_this__u8e3s4 == null) ? isIntArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
    };
    protoOf(IntArraySerializer_0).mr = function(_this__u8e3s4, expectedSize) {
        if (expectedSize === _this__u8e3s4.length) return IntArrayBuilder_init_$Create$(_this__u8e3s4);
        return new IntArrayBuilder(copyOf(_this__u8e3s4, expectedSize), _this__u8e3s4.length);
    };
    protoOf(IntArraySerializer_0).ym = function(_this__u8e3s4, expectedSize) {
        return this.mr((!(_this__u8e3s4 == null) ? isIntArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE(), expectedSize);
    };
    protoOf(IntArraySerializer_0).co = function(size) {
        return IntArrayBuilder_init_$Create$_0(size);
    };
    protoOf(IntArraySerializer_0).bo = function() {
        return IntArrayBuilder_init_$Create$_1();
    };
    protoOf(IntArraySerializer_0).nr = function(decoder, index, builder, checkIndex) {
        builder.qr(decoder.ll(this.vn_1, index));
    };
    protoOf(IntArraySerializer_0).fn = function(decoder, index, builder, checkIndex) {
        return this.nr(decoder, index, builder instanceof IntArrayBuilder ? builder : THROW_CCE(), checkIndex);
    };
    protoOf(IntArraySerializer_0).do = function(decoder, index, builder, checkIndex) {
        return this.nr(decoder, index, builder instanceof IntArrayBuilder ? builder : THROW_CCE(), checkIndex);
    };
    var IntArraySerializer_instance;
    function IntArraySerializer_getInstance() {
        if (IntArraySerializer_instance == null) new IntArraySerializer_0;
        return IntArraySerializer_instance;
    }
    function UIntArraySerializer_0() {
        UIntArraySerializer_instance = this;
        PrimitiveArraySerializer.call(this, serializer_0(Companion_getInstance_17()));
    }
    protoOf(UIntArraySerializer_0).tr = function(_this__u8e3s4) {
        return _UIntArray___get_size__impl__r6l8ci(_this__u8e3s4);
    };
    protoOf(UIntArraySerializer_0).mn = function(_this__u8e3s4) {
        return this.tr(_this__u8e3s4 instanceof UIntArray ? _this__u8e3s4.ei_1 : THROW_CCE());
    };
    protoOf(UIntArraySerializer_0).ur = function(_this__u8e3s4, expectedSize) {
        if (expectedSize === _UIntArray___get_size__impl__r6l8ci(_this__u8e3s4)) return UIntArrayBuilder_init_$Create$(_this__u8e3s4);
        var tmp$ret$0 = _UIntArray___init__impl__ghjpc6(copyOf(_UIntArray___get_storage__impl__92a0v0(_this__u8e3s4), expectedSize));
        return new UIntArrayBuilder(tmp$ret$0, _UIntArray___get_size__impl__r6l8ci(_this__u8e3s4));
    };
    protoOf(UIntArraySerializer_0).ym = function(_this__u8e3s4, expectedSize) {
        return this.ur(_this__u8e3s4 instanceof UIntArray ? _this__u8e3s4.ei_1 : THROW_CCE(), expectedSize);
    };
    protoOf(UIntArraySerializer_0).co = function(size) {
        return UIntArrayBuilder_init_$Create$_0(size);
    };
    protoOf(UIntArraySerializer_0).bo = function() {
        return UIntArrayBuilder_init_$Create$_1();
    };
    protoOf(UIntArraySerializer_0).vr = function(decoder, index, builder, checkIndex) {
        var this_0 = decoder.ql(this.vn_1, index).xk();
        var tmp$ret$0 = _UInt___init__impl__l7qpdl(this_0);
        builder.yr(tmp$ret$0);
    };
    protoOf(UIntArraySerializer_0).fn = function(decoder, index, builder, checkIndex) {
        return this.vr(decoder, index, builder instanceof UIntArrayBuilder ? builder : THROW_CCE(), checkIndex);
    };
    protoOf(UIntArraySerializer_0).do = function(decoder, index, builder, checkIndex) {
        return this.vr(decoder, index, builder instanceof UIntArrayBuilder ? builder : THROW_CCE(), checkIndex);
    };
    var UIntArraySerializer_instance;
    function UIntArraySerializer_getInstance() {
        if (UIntArraySerializer_instance == null) new UIntArraySerializer_0;
        return UIntArraySerializer_instance;
    }
    function ShortArraySerializer_0() {
        ShortArraySerializer_instance = this;
        PrimitiveArraySerializer.call(this, serializer_7(ShortCompanionObject_instance));
    }
    protoOf(ShortArraySerializer_0).bs = function(_this__u8e3s4) {
        return _this__u8e3s4.length;
    };
    protoOf(ShortArraySerializer_0).mn = function(_this__u8e3s4) {
        return this.bs((!(_this__u8e3s4 == null) ? isShortArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
    };
    protoOf(ShortArraySerializer_0).cs = function(_this__u8e3s4, expectedSize) {
        if (expectedSize === _this__u8e3s4.length) return ShortArrayBuilder_init_$Create$(_this__u8e3s4);
        return new ShortArrayBuilder(copyOf_5(_this__u8e3s4, expectedSize), _this__u8e3s4.length);
    };
    protoOf(ShortArraySerializer_0).ym = function(_this__u8e3s4, expectedSize) {
        return this.cs((!(_this__u8e3s4 == null) ? isShortArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE(), expectedSize);
    };
    protoOf(ShortArraySerializer_0).co = function(size) {
        return ShortArrayBuilder_init_$Create$_0(size);
    };
    protoOf(ShortArraySerializer_0).bo = function() {
        return ShortArrayBuilder_init_$Create$_1();
    };
    protoOf(ShortArraySerializer_0).ds = function(decoder, index, builder, checkIndex) {
        builder.gs(decoder.kl(this.vn_1, index));
    };
    protoOf(ShortArraySerializer_0).fn = function(decoder, index, builder, checkIndex) {
        return this.ds(decoder, index, builder instanceof ShortArrayBuilder ? builder : THROW_CCE(), checkIndex);
    };
    protoOf(ShortArraySerializer_0).do = function(decoder, index, builder, checkIndex) {
        return this.ds(decoder, index, builder instanceof ShortArrayBuilder ? builder : THROW_CCE(), checkIndex);
    };
    var ShortArraySerializer_instance;
    function ShortArraySerializer_getInstance() {
        if (ShortArraySerializer_instance == null) new ShortArraySerializer_0;
        return ShortArraySerializer_instance;
    }
    function UShortArraySerializer_0() {
        UShortArraySerializer_instance = this;
        PrimitiveArraySerializer.call(this, serializer_3(Companion_getInstance_19()));
    }
    protoOf(UShortArraySerializer_0).js = function(_this__u8e3s4) {
        return _UShortArray___get_size__impl__jqto1b(_this__u8e3s4);
    };
    protoOf(UShortArraySerializer_0).mn = function(_this__u8e3s4) {
        return this.js(_this__u8e3s4 instanceof UShortArray ? _this__u8e3s4.yi_1 : THROW_CCE());
    };
    protoOf(UShortArraySerializer_0).ks = function(_this__u8e3s4, expectedSize) {
        if (expectedSize === _UShortArray___get_size__impl__jqto1b(_this__u8e3s4)) return UShortArrayBuilder_init_$Create$(_this__u8e3s4);
        var tmp$ret$0 = _UShortArray___init__impl__9b26ef(copyOf_5(_UShortArray___get_storage__impl__t2jpv5(_this__u8e3s4), expectedSize));
        return new UShortArrayBuilder(tmp$ret$0, _UShortArray___get_size__impl__jqto1b(_this__u8e3s4));
    };
    protoOf(UShortArraySerializer_0).ym = function(_this__u8e3s4, expectedSize) {
        return this.ks(_this__u8e3s4 instanceof UShortArray ? _this__u8e3s4.yi_1 : THROW_CCE(), expectedSize);
    };
    protoOf(UShortArraySerializer_0).co = function(size) {
        return UShortArrayBuilder_init_$Create$_0(size);
    };
    protoOf(UShortArraySerializer_0).bo = function() {
        return UShortArrayBuilder_init_$Create$_1();
    };
    protoOf(UShortArraySerializer_0).ls = function(decoder, index, builder, checkIndex) {
        var this_0 = decoder.ql(this.vn_1, index).wk();
        var tmp$ret$0 = _UShort___init__impl__jigrne(this_0);
        builder.os(tmp$ret$0);
    };
    protoOf(UShortArraySerializer_0).fn = function(decoder, index, builder, checkIndex) {
        return this.ls(decoder, index, builder instanceof UShortArrayBuilder ? builder : THROW_CCE(), checkIndex);
    };
    protoOf(UShortArraySerializer_0).do = function(decoder, index, builder, checkIndex) {
        return this.ls(decoder, index, builder instanceof UShortArrayBuilder ? builder : THROW_CCE(), checkIndex);
    };
    var UShortArraySerializer_instance;
    function UShortArraySerializer_getInstance() {
        if (UShortArraySerializer_instance == null) new UShortArraySerializer_0;
        return UShortArraySerializer_instance;
    }
    function ByteArraySerializer_0() {
        ByteArraySerializer_instance = this;
        PrimitiveArraySerializer.call(this, serializer_6(ByteCompanionObject_instance));
    }
    protoOf(ByteArraySerializer_0).rs = function(_this__u8e3s4) {
        return _this__u8e3s4.length;
    };
    protoOf(ByteArraySerializer_0).mn = function(_this__u8e3s4) {
        return this.rs((!(_this__u8e3s4 == null) ? isByteArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
    };
    protoOf(ByteArraySerializer_0).ss = function(_this__u8e3s4, expectedSize) {
        if (expectedSize === _this__u8e3s4.length) return ByteArrayBuilder_init_$Create$(_this__u8e3s4);
        return new ByteArrayBuilder(copyOf_6(_this__u8e3s4, expectedSize), _this__u8e3s4.length);
    };
    protoOf(ByteArraySerializer_0).ym = function(_this__u8e3s4, expectedSize) {
        return this.ss((!(_this__u8e3s4 == null) ? isByteArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE(), expectedSize);
    };
    protoOf(ByteArraySerializer_0).co = function(size) {
        return ByteArrayBuilder_init_$Create$_0(size);
    };
    protoOf(ByteArraySerializer_0).bo = function() {
        return ByteArrayBuilder_init_$Create$_1();
    };
    protoOf(ByteArraySerializer_0).ts = function(decoder, index, builder, checkIndex) {
        builder.ws(decoder.jl(this.vn_1, index));
    };
    protoOf(ByteArraySerializer_0).fn = function(decoder, index, builder, checkIndex) {
        return this.ts(decoder, index, builder instanceof ByteArrayBuilder ? builder : THROW_CCE(), checkIndex);
    };
    protoOf(ByteArraySerializer_0).do = function(decoder, index, builder, checkIndex) {
        return this.ts(decoder, index, builder instanceof ByteArrayBuilder ? builder : THROW_CCE(), checkIndex);
    };
    var ByteArraySerializer_instance;
    function ByteArraySerializer_getInstance() {
        if (ByteArraySerializer_instance == null) new ByteArraySerializer_0;
        return ByteArraySerializer_instance;
    }
    function UByteArraySerializer_0() {
        UByteArraySerializer_instance = this;
        PrimitiveArraySerializer.call(this, serializer_2(Companion_getInstance_16()));
    }
    protoOf(UByteArraySerializer_0).zs = function(_this__u8e3s4) {
        return _UByteArray___get_size__impl__h6pkdv(_this__u8e3s4);
    };
    protoOf(UByteArraySerializer_0).mn = function(_this__u8e3s4) {
        return this.zs(_this__u8e3s4 instanceof UByteArray ? _this__u8e3s4.uh_1 : THROW_CCE());
    };
    protoOf(UByteArraySerializer_0).at = function(_this__u8e3s4, expectedSize) {
        if (expectedSize === _UByteArray___get_size__impl__h6pkdv(_this__u8e3s4)) return UByteArrayBuilder_init_$Create$(_this__u8e3s4);
        var tmp$ret$0 = _UByteArray___init__impl__ip4y9n(copyOf_6(_UByteArray___get_storage__impl__d4kctt(_this__u8e3s4), expectedSize));
        return new UByteArrayBuilder(tmp$ret$0, _UByteArray___get_size__impl__h6pkdv(_this__u8e3s4));
    };
    protoOf(UByteArraySerializer_0).ym = function(_this__u8e3s4, expectedSize) {
        return this.at(_this__u8e3s4 instanceof UByteArray ? _this__u8e3s4.uh_1 : THROW_CCE(), expectedSize);
    };
    protoOf(UByteArraySerializer_0).co = function(size) {
        return UByteArrayBuilder_init_$Create$_0(size);
    };
    protoOf(UByteArraySerializer_0).bo = function() {
        return UByteArrayBuilder_init_$Create$_1();
    };
    protoOf(UByteArraySerializer_0).bt = function(decoder, index, builder, checkIndex) {
        var this_0 = decoder.ql(this.vn_1, index).vk();
        var tmp$ret$0 = _UByte___init__impl__g9hnc4(this_0);
        builder.et(tmp$ret$0);
    };
    protoOf(UByteArraySerializer_0).fn = function(decoder, index, builder, checkIndex) {
        return this.bt(decoder, index, builder instanceof UByteArrayBuilder ? builder : THROW_CCE(), checkIndex);
    };
    protoOf(UByteArraySerializer_0).do = function(decoder, index, builder, checkIndex) {
        return this.bt(decoder, index, builder instanceof UByteArrayBuilder ? builder : THROW_CCE(), checkIndex);
    };
    var UByteArraySerializer_instance;
    function UByteArraySerializer_getInstance() {
        if (UByteArraySerializer_instance == null) new UByteArraySerializer_0;
        return UByteArraySerializer_instance;
    }
    function BooleanArraySerializer_0() {
        BooleanArraySerializer_instance = this;
        PrimitiveArraySerializer.call(this, serializer_11(BooleanCompanionObject_instance));
    }
    protoOf(BooleanArraySerializer_0).ht = function(_this__u8e3s4) {
        return _this__u8e3s4.length;
    };
    protoOf(BooleanArraySerializer_0).mn = function(_this__u8e3s4) {
        return this.ht((!(_this__u8e3s4 == null) ? isBooleanArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
    };
    protoOf(BooleanArraySerializer_0).it = function(_this__u8e3s4, expectedSize) {
        if (expectedSize === _this__u8e3s4.length) return BooleanArrayBuilder_init_$Create$(_this__u8e3s4);
        return new BooleanArrayBuilder(copyOf_7(_this__u8e3s4, expectedSize), _this__u8e3s4.length);
    };
    protoOf(BooleanArraySerializer_0).ym = function(_this__u8e3s4, expectedSize) {
        return this.it((!(_this__u8e3s4 == null) ? isBooleanArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE(), expectedSize);
    };
    protoOf(BooleanArraySerializer_0).co = function(size) {
        return BooleanArrayBuilder_init_$Create$_0(size);
    };
    protoOf(BooleanArraySerializer_0).bo = function() {
        return BooleanArrayBuilder_init_$Create$_1();
    };
    protoOf(BooleanArraySerializer_0).jt = function(decoder, index, builder, checkIndex) {
        builder.mt(decoder.il(this.vn_1, index));
    };
    protoOf(BooleanArraySerializer_0).fn = function(decoder, index, builder, checkIndex) {
        return this.jt(decoder, index, builder instanceof BooleanArrayBuilder ? builder : THROW_CCE(), checkIndex);
    };
    protoOf(BooleanArraySerializer_0).do = function(decoder, index, builder, checkIndex) {
        return this.jt(decoder, index, builder instanceof BooleanArrayBuilder ? builder : THROW_CCE(), checkIndex);
    };
    var BooleanArraySerializer_instance;
    function BooleanArraySerializer_getInstance() {
        if (BooleanArraySerializer_instance == null) new BooleanArraySerializer_0;
        return BooleanArraySerializer_instance;
    }
    function CharArrayBuilder_init_$Init$(bufferWithData, $this) {
        CharArrayBuilder.call($this, bufferWithData, bufferWithData.length);
        return $this;
    }
    function CharArrayBuilder_init_$Create$(bufferWithData) {
        return CharArrayBuilder_init_$Init$(bufferWithData, objectCreate(protoOf(CharArrayBuilder)));
    }
    function CharArrayBuilder_init_$Init$_0(initialCapacity, $this) {
        CharArrayBuilder.call($this, charArray(initialCapacity), 0);
        return $this;
    }
    function CharArrayBuilder_init_$Create$_0(initialCapacity) {
        return CharArrayBuilder_init_$Init$_0(initialCapacity, objectCreate(protoOf(CharArrayBuilder)));
    }
    function CharArrayBuilder_init_$Init$_1($this) {
        CharArrayBuilder.call($this, charArray(10), 0);
        return $this;
    }
    function CharArrayBuilder_init_$Create$_1() {
        return CharArrayBuilder_init_$Init$_1(objectCreate(protoOf(CharArrayBuilder)));
    }
    function CharArrayBuilder(bufferWithData, initialPosition) {
        PrimitiveArrayBuilder.call(this);
        this.aq_1 = bufferWithData;
        this.bq_1 = initialPosition;
    }
    protoOf(CharArrayBuilder).xn = function() {
        return this.bq_1;
    };
    protoOf(CharArrayBuilder).eo = function(requiredCapacity) {
        if (this.aq_1.length < requiredCapacity) this.aq_1 = copyOf_1(this.aq_1, coerceAtLeast(requiredCapacity, imul(this.aq_1.length, 2)));
    };
    protoOf(CharArrayBuilder).cq = function(c) {
        this.fo();
        var tmp = this.aq_1;
        var _unary__edvuaz = this.bq_1;
        this.bq_1 = _unary__edvuaz + 1 | 0;
        tmp[_unary__edvuaz] = c;
    };
    protoOf(CharArrayBuilder).zn = function() {
        return copyOf_1(this.aq_1, this.bq_1);
    };
    function DoubleArrayBuilder_init_$Init$(bufferWithData, $this) {
        DoubleArrayBuilder.call($this, bufferWithData, bufferWithData.length);
        return $this;
    }
    function DoubleArrayBuilder_init_$Create$(bufferWithData) {
        return DoubleArrayBuilder_init_$Init$(bufferWithData, objectCreate(protoOf(DoubleArrayBuilder)));
    }
    function DoubleArrayBuilder_init_$Init$_0(initialCapacity, $this) {
        DoubleArrayBuilder.call($this, new Float64Array(initialCapacity), 0);
        return $this;
    }
    function DoubleArrayBuilder_init_$Create$_0(initialCapacity) {
        return DoubleArrayBuilder_init_$Init$_0(initialCapacity, objectCreate(protoOf(DoubleArrayBuilder)));
    }
    function DoubleArrayBuilder_init_$Init$_1($this) {
        DoubleArrayBuilder.call($this, new Float64Array(10), 0);
        return $this;
    }
    function DoubleArrayBuilder_init_$Create$_1() {
        return DoubleArrayBuilder_init_$Init$_1(objectCreate(protoOf(DoubleArrayBuilder)));
    }
    function DoubleArrayBuilder(bufferWithData, initialPosition) {
        PrimitiveArrayBuilder.call(this);
        this.iq_1 = bufferWithData;
        this.jq_1 = initialPosition;
    }
    protoOf(DoubleArrayBuilder).xn = function() {
        return this.jq_1;
    };
    protoOf(DoubleArrayBuilder).eo = function(requiredCapacity) {
        if (this.iq_1.length < requiredCapacity) this.iq_1 = copyOf_2(this.iq_1, coerceAtLeast(requiredCapacity, imul(this.iq_1.length, 2)));
    };
    protoOf(DoubleArrayBuilder).kq = function(c) {
        this.fo();
        var tmp = this.iq_1;
        var _unary__edvuaz = this.jq_1;
        this.jq_1 = _unary__edvuaz + 1 | 0;
        tmp[_unary__edvuaz] = c;
    };
    protoOf(DoubleArrayBuilder).zn = function() {
        return copyOf_2(this.iq_1, this.jq_1);
    };
    function FloatArrayBuilder_init_$Init$(bufferWithData, $this) {
        FloatArrayBuilder.call($this, bufferWithData, bufferWithData.length);
        return $this;
    }
    function FloatArrayBuilder_init_$Create$(bufferWithData) {
        return FloatArrayBuilder_init_$Init$(bufferWithData, objectCreate(protoOf(FloatArrayBuilder)));
    }
    function FloatArrayBuilder_init_$Init$_0(initialCapacity, $this) {
        FloatArrayBuilder.call($this, new Float32Array(initialCapacity), 0);
        return $this;
    }
    function FloatArrayBuilder_init_$Create$_0(initialCapacity) {
        return FloatArrayBuilder_init_$Init$_0(initialCapacity, objectCreate(protoOf(FloatArrayBuilder)));
    }
    function FloatArrayBuilder_init_$Init$_1($this) {
        FloatArrayBuilder.call($this, new Float32Array(10), 0);
        return $this;
    }
    function FloatArrayBuilder_init_$Create$_1() {
        return FloatArrayBuilder_init_$Init$_1(objectCreate(protoOf(FloatArrayBuilder)));
    }
    function FloatArrayBuilder(bufferWithData, initialPosition) {
        PrimitiveArrayBuilder.call(this);
        this.qq_1 = bufferWithData;
        this.rq_1 = initialPosition;
    }
    protoOf(FloatArrayBuilder).xn = function() {
        return this.rq_1;
    };
    protoOf(FloatArrayBuilder).eo = function(requiredCapacity) {
        if (this.qq_1.length < requiredCapacity) this.qq_1 = copyOf_3(this.qq_1, coerceAtLeast(requiredCapacity, imul(this.qq_1.length, 2)));
    };
    protoOf(FloatArrayBuilder).sq = function(c) {
        this.fo();
        var tmp = this.qq_1;
        var _unary__edvuaz = this.rq_1;
        this.rq_1 = _unary__edvuaz + 1 | 0;
        tmp[_unary__edvuaz] = c;
    };
    protoOf(FloatArrayBuilder).zn = function() {
        return copyOf_3(this.qq_1, this.rq_1);
    };
    function LongArrayBuilder_init_$Init$(bufferWithData, $this) {
        LongArrayBuilder.call($this, bufferWithData, bufferWithData.length);
        return $this;
    }
    function LongArrayBuilder_init_$Create$(bufferWithData) {
        return LongArrayBuilder_init_$Init$(bufferWithData, objectCreate(protoOf(LongArrayBuilder)));
    }
    function LongArrayBuilder_init_$Init$_0(initialCapacity, $this) {
        LongArrayBuilder.call($this, longArray(initialCapacity), 0);
        return $this;
    }
    function LongArrayBuilder_init_$Create$_0(initialCapacity) {
        return LongArrayBuilder_init_$Init$_0(initialCapacity, objectCreate(protoOf(LongArrayBuilder)));
    }
    function LongArrayBuilder_init_$Init$_1($this) {
        LongArrayBuilder.call($this, longArray(10), 0);
        return $this;
    }
    function LongArrayBuilder_init_$Create$_1() {
        return LongArrayBuilder_init_$Init$_1(objectCreate(protoOf(LongArrayBuilder)));
    }
    function LongArrayBuilder(bufferWithData, initialPosition) {
        PrimitiveArrayBuilder.call(this);
        this.yq_1 = bufferWithData;
        this.zq_1 = initialPosition;
    }
    protoOf(LongArrayBuilder).xn = function() {
        return this.zq_1;
    };
    protoOf(LongArrayBuilder).eo = function(requiredCapacity) {
        if (this.yq_1.length < requiredCapacity) this.yq_1 = copyOf_4(this.yq_1, coerceAtLeast(requiredCapacity, imul(this.yq_1.length, 2)));
    };
    protoOf(LongArrayBuilder).ar = function(c) {
        this.fo();
        var tmp = this.yq_1;
        var _unary__edvuaz = this.zq_1;
        this.zq_1 = _unary__edvuaz + 1 | 0;
        tmp[_unary__edvuaz] = c;
    };
    protoOf(LongArrayBuilder).zn = function() {
        return copyOf_4(this.yq_1, this.zq_1);
    };
    function ULongArrayBuilder_init_$Init$(bufferWithData, $this) {
        ULongArrayBuilder.call($this, bufferWithData, _ULongArray___get_size__impl__ju6dtr(bufferWithData));
        return $this;
    }
    function ULongArrayBuilder_init_$Create$(bufferWithData) {
        return ULongArrayBuilder_init_$Init$(bufferWithData, objectCreate(protoOf(ULongArrayBuilder)));
    }
    function ULongArrayBuilder_init_$Init$_0(initialCapacity, $this) {
        ULongArrayBuilder.call($this, _ULongArray___init__impl__twm1l3_0(initialCapacity), 0);
        return $this;
    }
    function ULongArrayBuilder_init_$Create$_0(initialCapacity) {
        return ULongArrayBuilder_init_$Init$_0(initialCapacity, objectCreate(protoOf(ULongArrayBuilder)));
    }
    function ULongArrayBuilder_init_$Init$_1($this) {
        ULongArrayBuilder.call($this, _ULongArray___init__impl__twm1l3_0(10), 0);
        return $this;
    }
    function ULongArrayBuilder_init_$Create$_1() {
        return ULongArrayBuilder_init_$Init$_1(objectCreate(protoOf(ULongArrayBuilder)));
    }
    function ULongArrayBuilder(bufferWithData, initialPosition) {
        PrimitiveArrayBuilder.call(this);
        this.gr_1 = bufferWithData;
        this.hr_1 = initialPosition;
    }
    protoOf(ULongArrayBuilder).xn = function() {
        return this.hr_1;
    };
    protoOf(ULongArrayBuilder).eo = function(requiredCapacity) {
        if (_ULongArray___get_size__impl__ju6dtr(this.gr_1) < requiredCapacity) {
            var tmp = this;
            var tmp0 = this.gr_1;
            var newSize = coerceAtLeast(requiredCapacity, imul(_ULongArray___get_size__impl__ju6dtr(this.gr_1), 2));
            tmp.gr_1 = _ULongArray___init__impl__twm1l3(copyOf_4(_ULongArray___get_storage__impl__28e64j(tmp0), newSize));
        }
    };
    protoOf(ULongArrayBuilder).ir = function(c) {
        this.fo();
        var tmp = this.gr_1;
        var _unary__edvuaz = this.hr_1;
        this.hr_1 = _unary__edvuaz + 1 | 0;
        ULongArray__set_impl_z19mvh(tmp, _unary__edvuaz, c);
    };
    protoOf(ULongArrayBuilder).nt = function() {
        var tmp0 = this.gr_1;
        var newSize = this.hr_1;
        return _ULongArray___init__impl__twm1l3(copyOf_4(_ULongArray___get_storage__impl__28e64j(tmp0), newSize));
    };
    protoOf(ULongArrayBuilder).zn = function() {
        return new ULongArray(this.nt());
    };
    function IntArrayBuilder_init_$Init$(bufferWithData, $this) {
        IntArrayBuilder.call($this, bufferWithData, bufferWithData.length);
        return $this;
    }
    function IntArrayBuilder_init_$Create$(bufferWithData) {
        return IntArrayBuilder_init_$Init$(bufferWithData, objectCreate(protoOf(IntArrayBuilder)));
    }
    function IntArrayBuilder_init_$Init$_0(initialCapacity, $this) {
        IntArrayBuilder.call($this, new Int32Array(initialCapacity), 0);
        return $this;
    }
    function IntArrayBuilder_init_$Create$_0(initialCapacity) {
        return IntArrayBuilder_init_$Init$_0(initialCapacity, objectCreate(protoOf(IntArrayBuilder)));
    }
    function IntArrayBuilder_init_$Init$_1($this) {
        IntArrayBuilder.call($this, new Int32Array(10), 0);
        return $this;
    }
    function IntArrayBuilder_init_$Create$_1() {
        return IntArrayBuilder_init_$Init$_1(objectCreate(protoOf(IntArrayBuilder)));
    }
    function IntArrayBuilder(bufferWithData, initialPosition) {
        PrimitiveArrayBuilder.call(this);
        this.or_1 = bufferWithData;
        this.pr_1 = initialPosition;
    }
    protoOf(IntArrayBuilder).xn = function() {
        return this.pr_1;
    };
    protoOf(IntArrayBuilder).eo = function(requiredCapacity) {
        if (this.or_1.length < requiredCapacity) this.or_1 = copyOf(this.or_1, coerceAtLeast(requiredCapacity, imul(this.or_1.length, 2)));
    };
    protoOf(IntArrayBuilder).qr = function(c) {
        this.fo();
        var tmp = this.or_1;
        var _unary__edvuaz = this.pr_1;
        this.pr_1 = _unary__edvuaz + 1 | 0;
        tmp[_unary__edvuaz] = c;
    };
    protoOf(IntArrayBuilder).zn = function() {
        return copyOf(this.or_1, this.pr_1);
    };
    function UIntArrayBuilder_init_$Init$(bufferWithData, $this) {
        UIntArrayBuilder.call($this, bufferWithData, _UIntArray___get_size__impl__r6l8ci(bufferWithData));
        return $this;
    }
    function UIntArrayBuilder_init_$Create$(bufferWithData) {
        return UIntArrayBuilder_init_$Init$(bufferWithData, objectCreate(protoOf(UIntArrayBuilder)));
    }
    function UIntArrayBuilder_init_$Init$_0(initialCapacity, $this) {
        UIntArrayBuilder.call($this, _UIntArray___init__impl__ghjpc6_0(initialCapacity), 0);
        return $this;
    }
    function UIntArrayBuilder_init_$Create$_0(initialCapacity) {
        return UIntArrayBuilder_init_$Init$_0(initialCapacity, objectCreate(protoOf(UIntArrayBuilder)));
    }
    function UIntArrayBuilder_init_$Init$_1($this) {
        UIntArrayBuilder.call($this, _UIntArray___init__impl__ghjpc6_0(10), 0);
        return $this;
    }
    function UIntArrayBuilder_init_$Create$_1() {
        return UIntArrayBuilder_init_$Init$_1(objectCreate(protoOf(UIntArrayBuilder)));
    }
    function UIntArrayBuilder(bufferWithData, initialPosition) {
        PrimitiveArrayBuilder.call(this);
        this.wr_1 = bufferWithData;
        this.xr_1 = initialPosition;
    }
    protoOf(UIntArrayBuilder).xn = function() {
        return this.xr_1;
    };
    protoOf(UIntArrayBuilder).eo = function(requiredCapacity) {
        if (_UIntArray___get_size__impl__r6l8ci(this.wr_1) < requiredCapacity) {
            var tmp = this;
            var tmp0 = this.wr_1;
            var newSize = coerceAtLeast(requiredCapacity, imul(_UIntArray___get_size__impl__r6l8ci(this.wr_1), 2));
            tmp.wr_1 = _UIntArray___init__impl__ghjpc6(copyOf(_UIntArray___get_storage__impl__92a0v0(tmp0), newSize));
        }
    };
    protoOf(UIntArrayBuilder).yr = function(c) {
        this.fo();
        var tmp = this.wr_1;
        var _unary__edvuaz = this.xr_1;
        this.xr_1 = _unary__edvuaz + 1 | 0;
        UIntArray__set_impl_7f2zu2(tmp, _unary__edvuaz, c);
    };
    protoOf(UIntArrayBuilder).ot = function() {
        var tmp0 = this.wr_1;
        var newSize = this.xr_1;
        return _UIntArray___init__impl__ghjpc6(copyOf(_UIntArray___get_storage__impl__92a0v0(tmp0), newSize));
    };
    protoOf(UIntArrayBuilder).zn = function() {
        return new UIntArray(this.ot());
    };
    function ShortArrayBuilder_init_$Init$(bufferWithData, $this) {
        ShortArrayBuilder.call($this, bufferWithData, bufferWithData.length);
        return $this;
    }
    function ShortArrayBuilder_init_$Create$(bufferWithData) {
        return ShortArrayBuilder_init_$Init$(bufferWithData, objectCreate(protoOf(ShortArrayBuilder)));
    }
    function ShortArrayBuilder_init_$Init$_0(initialCapacity, $this) {
        ShortArrayBuilder.call($this, new Int16Array(initialCapacity), 0);
        return $this;
    }
    function ShortArrayBuilder_init_$Create$_0(initialCapacity) {
        return ShortArrayBuilder_init_$Init$_0(initialCapacity, objectCreate(protoOf(ShortArrayBuilder)));
    }
    function ShortArrayBuilder_init_$Init$_1($this) {
        ShortArrayBuilder.call($this, new Int16Array(10), 0);
        return $this;
    }
    function ShortArrayBuilder_init_$Create$_1() {
        return ShortArrayBuilder_init_$Init$_1(objectCreate(protoOf(ShortArrayBuilder)));
    }
    function ShortArrayBuilder(bufferWithData, initialPosition) {
        PrimitiveArrayBuilder.call(this);
        this.es_1 = bufferWithData;
        this.fs_1 = initialPosition;
    }
    protoOf(ShortArrayBuilder).xn = function() {
        return this.fs_1;
    };
    protoOf(ShortArrayBuilder).eo = function(requiredCapacity) {
        if (this.es_1.length < requiredCapacity) this.es_1 = copyOf_5(this.es_1, coerceAtLeast(requiredCapacity, imul(this.es_1.length, 2)));
    };
    protoOf(ShortArrayBuilder).gs = function(c) {
        this.fo();
        var tmp = this.es_1;
        var _unary__edvuaz = this.fs_1;
        this.fs_1 = _unary__edvuaz + 1 | 0;
        tmp[_unary__edvuaz] = c;
    };
    protoOf(ShortArrayBuilder).zn = function() {
        return copyOf_5(this.es_1, this.fs_1);
    };
    function UShortArrayBuilder_init_$Init$(bufferWithData, $this) {
        UShortArrayBuilder.call($this, bufferWithData, _UShortArray___get_size__impl__jqto1b(bufferWithData));
        return $this;
    }
    function UShortArrayBuilder_init_$Create$(bufferWithData) {
        return UShortArrayBuilder_init_$Init$(bufferWithData, objectCreate(protoOf(UShortArrayBuilder)));
    }
    function UShortArrayBuilder_init_$Init$_0(initialCapacity, $this) {
        UShortArrayBuilder.call($this, _UShortArray___init__impl__9b26ef_0(initialCapacity), 0);
        return $this;
    }
    function UShortArrayBuilder_init_$Create$_0(initialCapacity) {
        return UShortArrayBuilder_init_$Init$_0(initialCapacity, objectCreate(protoOf(UShortArrayBuilder)));
    }
    function UShortArrayBuilder_init_$Init$_1($this) {
        UShortArrayBuilder.call($this, _UShortArray___init__impl__9b26ef_0(10), 0);
        return $this;
    }
    function UShortArrayBuilder_init_$Create$_1() {
        return UShortArrayBuilder_init_$Init$_1(objectCreate(protoOf(UShortArrayBuilder)));
    }
    function UShortArrayBuilder(bufferWithData, initialPosition) {
        PrimitiveArrayBuilder.call(this);
        this.ms_1 = bufferWithData;
        this.ns_1 = initialPosition;
    }
    protoOf(UShortArrayBuilder).xn = function() {
        return this.ns_1;
    };
    protoOf(UShortArrayBuilder).eo = function(requiredCapacity) {
        if (_UShortArray___get_size__impl__jqto1b(this.ms_1) < requiredCapacity) {
            var tmp = this;
            var tmp0 = this.ms_1;
            var newSize = coerceAtLeast(requiredCapacity, imul(_UShortArray___get_size__impl__jqto1b(this.ms_1), 2));
            tmp.ms_1 = _UShortArray___init__impl__9b26ef(copyOf_5(_UShortArray___get_storage__impl__t2jpv5(tmp0), newSize));
        }
    };
    protoOf(UShortArrayBuilder).os = function(c) {
        this.fo();
        var tmp = this.ms_1;
        var _unary__edvuaz = this.ns_1;
        this.ns_1 = _unary__edvuaz + 1 | 0;
        UShortArray__set_impl_6d8whp(tmp, _unary__edvuaz, c);
    };
    protoOf(UShortArrayBuilder).pt = function() {
        var tmp0 = this.ms_1;
        var newSize = this.ns_1;
        return _UShortArray___init__impl__9b26ef(copyOf_5(_UShortArray___get_storage__impl__t2jpv5(tmp0), newSize));
    };
    protoOf(UShortArrayBuilder).zn = function() {
        return new UShortArray(this.pt());
    };
    function ByteArrayBuilder_init_$Init$(bufferWithData, $this) {
        ByteArrayBuilder.call($this, bufferWithData, bufferWithData.length);
        return $this;
    }
    function ByteArrayBuilder_init_$Create$(bufferWithData) {
        return ByteArrayBuilder_init_$Init$(bufferWithData, objectCreate(protoOf(ByteArrayBuilder)));
    }
    function ByteArrayBuilder_init_$Init$_0(initialCapacity, $this) {
        ByteArrayBuilder.call($this, new Int8Array(initialCapacity), 0);
        return $this;
    }
    function ByteArrayBuilder_init_$Create$_0(initialCapacity) {
        return ByteArrayBuilder_init_$Init$_0(initialCapacity, objectCreate(protoOf(ByteArrayBuilder)));
    }
    function ByteArrayBuilder_init_$Init$_1($this) {
        ByteArrayBuilder.call($this, new Int8Array(10), 0);
        return $this;
    }
    function ByteArrayBuilder_init_$Create$_1() {
        return ByteArrayBuilder_init_$Init$_1(objectCreate(protoOf(ByteArrayBuilder)));
    }
    function ByteArrayBuilder(bufferWithData, initialPosition) {
        PrimitiveArrayBuilder.call(this);
        this.us_1 = bufferWithData;
        this.vs_1 = initialPosition;
    }
    protoOf(ByteArrayBuilder).xn = function() {
        return this.vs_1;
    };
    protoOf(ByteArrayBuilder).eo = function(requiredCapacity) {
        if (this.us_1.length < requiredCapacity) this.us_1 = copyOf_6(this.us_1, coerceAtLeast(requiredCapacity, imul(this.us_1.length, 2)));
    };
    protoOf(ByteArrayBuilder).ws = function(c) {
        this.fo();
        var tmp = this.us_1;
        var _unary__edvuaz = this.vs_1;
        this.vs_1 = _unary__edvuaz + 1 | 0;
        tmp[_unary__edvuaz] = c;
    };
    protoOf(ByteArrayBuilder).zn = function() {
        return copyOf_6(this.us_1, this.vs_1);
    };
    function UByteArrayBuilder_init_$Init$(bufferWithData, $this) {
        UByteArrayBuilder.call($this, bufferWithData, _UByteArray___get_size__impl__h6pkdv(bufferWithData));
        return $this;
    }
    function UByteArrayBuilder_init_$Create$(bufferWithData) {
        return UByteArrayBuilder_init_$Init$(bufferWithData, objectCreate(protoOf(UByteArrayBuilder)));
    }
    function UByteArrayBuilder_init_$Init$_0(initialCapacity, $this) {
        UByteArrayBuilder.call($this, _UByteArray___init__impl__ip4y9n_0(initialCapacity), 0);
        return $this;
    }
    function UByteArrayBuilder_init_$Create$_0(initialCapacity) {
        return UByteArrayBuilder_init_$Init$_0(initialCapacity, objectCreate(protoOf(UByteArrayBuilder)));
    }
    function UByteArrayBuilder_init_$Init$_1($this) {
        UByteArrayBuilder.call($this, _UByteArray___init__impl__ip4y9n_0(10), 0);
        return $this;
    }
    function UByteArrayBuilder_init_$Create$_1() {
        return UByteArrayBuilder_init_$Init$_1(objectCreate(protoOf(UByteArrayBuilder)));
    }
    function UByteArrayBuilder(bufferWithData, initialPosition) {
        PrimitiveArrayBuilder.call(this);
        this.ct_1 = bufferWithData;
        this.dt_1 = initialPosition;
    }
    protoOf(UByteArrayBuilder).xn = function() {
        return this.dt_1;
    };
    protoOf(UByteArrayBuilder).eo = function(requiredCapacity) {
        if (_UByteArray___get_size__impl__h6pkdv(this.ct_1) < requiredCapacity) {
            var tmp = this;
            var tmp0 = this.ct_1;
            var newSize = coerceAtLeast(requiredCapacity, imul(_UByteArray___get_size__impl__h6pkdv(this.ct_1), 2));
            tmp.ct_1 = _UByteArray___init__impl__ip4y9n(copyOf_6(_UByteArray___get_storage__impl__d4kctt(tmp0), newSize));
        }
    };
    protoOf(UByteArrayBuilder).et = function(c) {
        this.fo();
        var tmp = this.ct_1;
        var _unary__edvuaz = this.dt_1;
        this.dt_1 = _unary__edvuaz + 1 | 0;
        UByteArray__set_impl_jvcicn(tmp, _unary__edvuaz, c);
    };
    protoOf(UByteArrayBuilder).qt = function() {
        var tmp0 = this.ct_1;
        var newSize = this.dt_1;
        return _UByteArray___init__impl__ip4y9n(copyOf_6(_UByteArray___get_storage__impl__d4kctt(tmp0), newSize));
    };
    protoOf(UByteArrayBuilder).zn = function() {
        return new UByteArray(this.qt());
    };
    function BooleanArrayBuilder_init_$Init$(bufferWithData, $this) {
        BooleanArrayBuilder.call($this, bufferWithData, bufferWithData.length);
        return $this;
    }
    function BooleanArrayBuilder_init_$Create$(bufferWithData) {
        return BooleanArrayBuilder_init_$Init$(bufferWithData, objectCreate(protoOf(BooleanArrayBuilder)));
    }
    function BooleanArrayBuilder_init_$Init$_0(initialCapacity, $this) {
        BooleanArrayBuilder.call($this, booleanArray(initialCapacity), 0);
        return $this;
    }
    function BooleanArrayBuilder_init_$Create$_0(initialCapacity) {
        return BooleanArrayBuilder_init_$Init$_0(initialCapacity, objectCreate(protoOf(BooleanArrayBuilder)));
    }
    function BooleanArrayBuilder_init_$Init$_1($this) {
        BooleanArrayBuilder.call($this, booleanArray(10), 0);
        return $this;
    }
    function BooleanArrayBuilder_init_$Create$_1() {
        return BooleanArrayBuilder_init_$Init$_1(objectCreate(protoOf(BooleanArrayBuilder)));
    }
    function BooleanArrayBuilder(bufferWithData, initialPosition) {
        PrimitiveArrayBuilder.call(this);
        this.kt_1 = bufferWithData;
        this.lt_1 = initialPosition;
    }
    protoOf(BooleanArrayBuilder).xn = function() {
        return this.lt_1;
    };
    protoOf(BooleanArrayBuilder).eo = function(requiredCapacity) {
        if (this.kt_1.length < requiredCapacity) this.kt_1 = copyOf_7(this.kt_1, coerceAtLeast(requiredCapacity, imul(this.kt_1.length, 2)));
    };
    protoOf(BooleanArrayBuilder).mt = function(c) {
        this.fo();
        var tmp = this.kt_1;
        var _unary__edvuaz = this.lt_1;
        this.lt_1 = _unary__edvuaz + 1 | 0;
        tmp[_unary__edvuaz] = c;
    };
    protoOf(BooleanArrayBuilder).zn = function() {
        return copyOf_7(this.kt_1, this.lt_1);
    };
    function get_BUILTIN_SERIALIZERS() {
        _init_properties_Primitives_kt__k0eto4();
        return BUILTIN_SERIALIZERS;
    }
    var BUILTIN_SERIALIZERS;
    function StringSerializer() {
        StringSerializer_instance = this;
        this.rt_1 = new PrimitiveSerialDescriptor_0('kotlin.String', STRING_getInstance());
    }
    protoOf(StringSerializer).zi = function() {
        return this.rt_1;
    };
    protoOf(StringSerializer).aj = function(decoder) {
        return decoder.cl();
    };
    var StringSerializer_instance;
    function StringSerializer_getInstance() {
        if (StringSerializer_instance == null) new StringSerializer;
        return StringSerializer_instance;
    }
    function error_0($this) {
        throw IllegalStateException_init_$Create$_0('Primitive descriptor ' + $this.st_1 + ' does not have elements');
    }
    function PrimitiveSerialDescriptor_0(serialName, kind) {
        this.st_1 = serialName;
        this.tt_1 = kind;
    }
    protoOf(PrimitiveSerialDescriptor_0).hj = function() {
        return this.st_1;
    };
    protoOf(PrimitiveSerialDescriptor_0).ij = function() {
        return this.tt_1;
    };
    protoOf(PrimitiveSerialDescriptor_0).lj = function() {
        return 0;
    };
    protoOf(PrimitiveSerialDescriptor_0).nj = function(index) {
        error_0(this);
    };
    protoOf(PrimitiveSerialDescriptor_0).oj = function(name) {
        error_0(this);
    };
    protoOf(PrimitiveSerialDescriptor_0).rj = function(index) {
        error_0(this);
    };
    protoOf(PrimitiveSerialDescriptor_0).qj = function(index) {
        error_0(this);
    };
    protoOf(PrimitiveSerialDescriptor_0).pj = function(index) {
        error_0(this);
    };
    protoOf(PrimitiveSerialDescriptor_0).toString = function() {
        return 'PrimitiveDescriptor(' + this.st_1 + ')';
    };
    protoOf(PrimitiveSerialDescriptor_0).equals = function(other) {
        if (this === other) return true;
        if (!(other instanceof PrimitiveSerialDescriptor_0)) return false;
        if (this.st_1 === other.st_1 && equals(this.tt_1, other.tt_1)) return true;
        return false;
    };
    protoOf(PrimitiveSerialDescriptor_0).hashCode = function() {
        return getStringHashCode(this.st_1) + imul(31, this.tt_1.hashCode()) | 0;
    };
    function IntSerializer() {
        IntSerializer_instance = this;
        this.ut_1 = new PrimitiveSerialDescriptor_0('kotlin.Int', INT_getInstance());
    }
    protoOf(IntSerializer).zi = function() {
        return this.ut_1;
    };
    protoOf(IntSerializer).aj = function(decoder) {
        return decoder.xk();
    };
    var IntSerializer_instance;
    function IntSerializer_getInstance() {
        if (IntSerializer_instance == null) new IntSerializer;
        return IntSerializer_instance;
    }
    function LongSerializer() {
        LongSerializer_instance = this;
        this.vt_1 = new PrimitiveSerialDescriptor_0('kotlin.Long', LONG_getInstance());
    }
    protoOf(LongSerializer).zi = function() {
        return this.vt_1;
    };
    protoOf(LongSerializer).aj = function(decoder) {
        return decoder.yk();
    };
    var LongSerializer_instance;
    function LongSerializer_getInstance() {
        if (LongSerializer_instance == null) new LongSerializer;
        return LongSerializer_instance;
    }
    function ByteSerializer() {
        ByteSerializer_instance = this;
        this.wt_1 = new PrimitiveSerialDescriptor_0('kotlin.Byte', BYTE_getInstance());
    }
    protoOf(ByteSerializer).zi = function() {
        return this.wt_1;
    };
    protoOf(ByteSerializer).aj = function(decoder) {
        return decoder.vk();
    };
    var ByteSerializer_instance;
    function ByteSerializer_getInstance() {
        if (ByteSerializer_instance == null) new ByteSerializer;
        return ByteSerializer_instance;
    }
    function ShortSerializer() {
        ShortSerializer_instance = this;
        this.xt_1 = new PrimitiveSerialDescriptor_0('kotlin.Short', SHORT_getInstance());
    }
    protoOf(ShortSerializer).zi = function() {
        return this.xt_1;
    };
    protoOf(ShortSerializer).aj = function(decoder) {
        return decoder.wk();
    };
    var ShortSerializer_instance;
    function ShortSerializer_getInstance() {
        if (ShortSerializer_instance == null) new ShortSerializer;
        return ShortSerializer_instance;
    }
    function CharSerializer() {
        CharSerializer_instance = this;
        this.yt_1 = new PrimitiveSerialDescriptor_0('kotlin.Char', CHAR_getInstance());
    }
    protoOf(CharSerializer).zi = function() {
        return this.yt_1;
    };
    protoOf(CharSerializer).zt = function(decoder) {
        return decoder.bl();
    };
    protoOf(CharSerializer).aj = function(decoder) {
        return new Char(this.zt(decoder));
    };
    var CharSerializer_instance;
    function CharSerializer_getInstance() {
        if (CharSerializer_instance == null) new CharSerializer;
        return CharSerializer_instance;
    }
    function DoubleSerializer() {
        DoubleSerializer_instance = this;
        this.au_1 = new PrimitiveSerialDescriptor_0('kotlin.Double', DOUBLE_getInstance());
    }
    protoOf(DoubleSerializer).zi = function() {
        return this.au_1;
    };
    protoOf(DoubleSerializer).aj = function(decoder) {
        return decoder.al();
    };
    var DoubleSerializer_instance;
    function DoubleSerializer_getInstance() {
        if (DoubleSerializer_instance == null) new DoubleSerializer;
        return DoubleSerializer_instance;
    }
    function FloatSerializer() {
        FloatSerializer_instance = this;
        this.bu_1 = new PrimitiveSerialDescriptor_0('kotlin.Float', FLOAT_getInstance());
    }
    protoOf(FloatSerializer).zi = function() {
        return this.bu_1;
    };
    protoOf(FloatSerializer).aj = function(decoder) {
        return decoder.zk();
    };
    var FloatSerializer_instance;
    function FloatSerializer_getInstance() {
        if (FloatSerializer_instance == null) new FloatSerializer;
        return FloatSerializer_instance;
    }
    function BooleanSerializer() {
        BooleanSerializer_instance = this;
        this.cu_1 = new PrimitiveSerialDescriptor_0('kotlin.Boolean', BOOLEAN_getInstance());
    }
    protoOf(BooleanSerializer).zi = function() {
        return this.cu_1;
    };
    protoOf(BooleanSerializer).aj = function(decoder) {
        return decoder.uk();
    };
    var BooleanSerializer_instance;
    function BooleanSerializer_getInstance() {
        if (BooleanSerializer_instance == null) new BooleanSerializer;
        return BooleanSerializer_instance;
    }
    function UnitSerializer() {
        UnitSerializer_instance = this;
        this.du_1 = new ObjectSerializer('kotlin.Unit', Unit_instance);
    }
    protoOf(UnitSerializer).zi = function() {
        return this.du_1.zi();
    };
    protoOf(UnitSerializer).eu = function(decoder) {
        this.du_1.aj(decoder);
    };
    protoOf(UnitSerializer).aj = function(decoder) {
        this.eu(decoder);
        return Unit_instance;
    };
    var UnitSerializer_instance;
    function UnitSerializer_getInstance() {
        if (UnitSerializer_instance == null) new UnitSerializer;
        return UnitSerializer_instance;
    }
    function PrimitiveDescriptorSafe(serialName, kind) {
        _init_properties_Primitives_kt__k0eto4();
        checkNameIsNotAPrimitive(serialName);
        return new PrimitiveSerialDescriptor_0(serialName, kind);
    }
    function checkNameIsNotAPrimitive(serialName) {
        _init_properties_Primitives_kt__k0eto4();
        var values = get_BUILTIN_SERIALIZERS().v1();
        var _iterator__ex2g4s = values.j();
        while (_iterator__ex2g4s.k()) {
            var primitive = _iterator__ex2g4s.l();
            var primitiveName = primitive.zi().hj();
            if (serialName === primitiveName) {
                throw IllegalArgumentException_init_$Create$_0(trimIndent('\n                The name of serial descriptor should uniquely identify associated serializer.\n                For serial name ' + serialName + ' there already exists ' + getKClassFromExpression(primitive).v8() + '.\n                Please refer to SerialDescriptor documentation for additional information.\n            '));
            }
        }
    }
    var properties_initialized_Primitives_kt_6dpii6;
    function _init_properties_Primitives_kt__k0eto4() {
        if (!properties_initialized_Primitives_kt_6dpii6) {
            properties_initialized_Primitives_kt_6dpii6 = true;
            BUILTIN_SERIALIZERS = initBuiltins();
        }
    }
    function NamedValueDecoder() {
        TaggedDecoder.call(this);
    }
    protoOf(NamedValueDecoder).hu = function(_this__u8e3s4, index) {
        return this.ju(this.iu(_this__u8e3s4, index));
    };
    protoOf(NamedValueDecoder).ju = function(nestedName) {
        var tmp0_elvis_lhs = this.mu();
        return this.nu(tmp0_elvis_lhs == null ? '' : tmp0_elvis_lhs, nestedName);
    };
    protoOf(NamedValueDecoder).iu = function(descriptor, index) {
        return descriptor.nj(index);
    };
    protoOf(NamedValueDecoder).nu = function(parentName, childName) {
        var tmp;
        if (charSequenceLength(parentName) === 0) {
            tmp = childName;
        } else {
            tmp = parentName + '.' + childName;
        }
        return tmp;
    };
    protoOf(NamedValueDecoder).ou = function() {
        return this.ku_1.n() ? '$' : joinToString_0(this.ku_1, '.', '$.');
    };
    function tagBlock($this, tag, block) {
        $this.bv(tag);
        var r = block();
        if (!$this.lu_1) {
            $this.cv();
        }
        $this.lu_1 = false;
        return r;
    }
    function TaggedDecoder$decodeSerializableElement$lambda(this$0, $deserializer, $previousValue) {
        return function() {
            return this$0.el($deserializer, $previousValue);
        };
    }
    function TaggedDecoder() {
        var tmp = this;
        tmp.ku_1 = ArrayList_init_$Create$();
        this.lu_1 = false;
    }
    protoOf(TaggedDecoder).tl = function() {
        return EmptySerializersModule_0();
    };
    protoOf(TaggedDecoder).pu = function(tag) {
        throw SerializationException_init_$Create$_0(toString_1(getKClassFromExpression(this)) + " can't retrieve untyped values");
    };
    protoOf(TaggedDecoder).qu = function(tag) {
        return true;
    };
    protoOf(TaggedDecoder).ru = function(tag) {
        var tmp = this.pu(tag);
        return typeof tmp === 'boolean' ? tmp : THROW_CCE();
    };
    protoOf(TaggedDecoder).su = function(tag) {
        var tmp = this.pu(tag);
        return typeof tmp === 'number' ? tmp : THROW_CCE();
    };
    protoOf(TaggedDecoder).tu = function(tag) {
        var tmp = this.pu(tag);
        return typeof tmp === 'number' ? tmp : THROW_CCE();
    };
    protoOf(TaggedDecoder).uu = function(tag) {
        var tmp = this.pu(tag);
        return typeof tmp === 'number' ? tmp : THROW_CCE();
    };
    protoOf(TaggedDecoder).vu = function(tag) {
        var tmp = this.pu(tag);
        return tmp instanceof Long ? tmp : THROW_CCE();
    };
    protoOf(TaggedDecoder).wu = function(tag) {
        var tmp = this.pu(tag);
        return typeof tmp === 'number' ? tmp : THROW_CCE();
    };
    protoOf(TaggedDecoder).xu = function(tag) {
        var tmp = this.pu(tag);
        return typeof tmp === 'number' ? tmp : THROW_CCE();
    };
    protoOf(TaggedDecoder).yu = function(tag) {
        var tmp = this.pu(tag);
        return tmp instanceof Char ? tmp.a1_1 : THROW_CCE();
    };
    protoOf(TaggedDecoder).zu = function(tag) {
        var tmp = this.pu(tag);
        return typeof tmp === 'string' ? tmp : THROW_CCE();
    };
    protoOf(TaggedDecoder).av = function(tag, inlineDescriptor) {
        this.bv(tag);
        return this;
    };
    protoOf(TaggedDecoder).el = function(deserializer, previousValue) {
        return this.fl(deserializer);
    };
    protoOf(TaggedDecoder).dl = function(descriptor) {
        return this.av(this.cv(), descriptor);
    };
    protoOf(TaggedDecoder).sk = function() {
        var tmp0_elvis_lhs = this.mu();
        var tmp;
        if (tmp0_elvis_lhs == null) {
            return false;
        } else {
            tmp = tmp0_elvis_lhs;
        }
        var currentTag = tmp;
        return this.qu(currentTag);
    };
    protoOf(TaggedDecoder).tk = function() {
        return null;
    };
    protoOf(TaggedDecoder).uk = function() {
        return this.ru(this.cv());
    };
    protoOf(TaggedDecoder).vk = function() {
        return this.su(this.cv());
    };
    protoOf(TaggedDecoder).wk = function() {
        return this.tu(this.cv());
    };
    protoOf(TaggedDecoder).xk = function() {
        return this.uu(this.cv());
    };
    protoOf(TaggedDecoder).yk = function() {
        return this.vu(this.cv());
    };
    protoOf(TaggedDecoder).zk = function() {
        return this.wu(this.cv());
    };
    protoOf(TaggedDecoder).al = function() {
        return this.xu(this.cv());
    };
    protoOf(TaggedDecoder).bl = function() {
        return this.yu(this.cv());
    };
    protoOf(TaggedDecoder).cl = function() {
        return this.zu(this.cv());
    };
    protoOf(TaggedDecoder).gl = function(descriptor) {
        return this;
    };
    protoOf(TaggedDecoder).hl = function(descriptor) {};
    protoOf(TaggedDecoder).il = function(descriptor, index) {
        return this.ru(this.hu(descriptor, index));
    };
    protoOf(TaggedDecoder).jl = function(descriptor, index) {
        return this.su(this.hu(descriptor, index));
    };
    protoOf(TaggedDecoder).kl = function(descriptor, index) {
        return this.tu(this.hu(descriptor, index));
    };
    protoOf(TaggedDecoder).ll = function(descriptor, index) {
        return this.uu(this.hu(descriptor, index));
    };
    protoOf(TaggedDecoder).ml = function(descriptor, index) {
        return this.vu(this.hu(descriptor, index));
    };
    protoOf(TaggedDecoder).nl = function(descriptor, index) {
        return this.wu(this.hu(descriptor, index));
    };
    protoOf(TaggedDecoder).ol = function(descriptor, index) {
        return this.xu(this.hu(descriptor, index));
    };
    protoOf(TaggedDecoder).pl = function(descriptor, index) {
        return this.yu(this.hu(descriptor, index));
    };
    protoOf(TaggedDecoder).ql = function(descriptor, index) {
        return this.av(this.hu(descriptor, index), descriptor.qj(index));
    };
    protoOf(TaggedDecoder).rl = function(descriptor, index, deserializer, previousValue) {
        var tmp = this.hu(descriptor, index);
        return tagBlock(this, tmp, TaggedDecoder$decodeSerializableElement$lambda(this, deserializer, previousValue));
    };
    protoOf(TaggedDecoder).mu = function() {
        return lastOrNull(this.ku_1);
    };
    protoOf(TaggedDecoder).bv = function(name) {
        this.ku_1.i(name);
    };
    protoOf(TaggedDecoder).cv = function() {
        var r = this.ku_1.e3(get_lastIndex_2(this.ku_1));
        this.lu_1 = true;
        return r;
    };
    function UIntSerializer() {
        UIntSerializer_instance = this;
        this.dv_1 = InlinePrimitiveDescriptor('kotlin.UInt', serializer_4(IntCompanionObject_instance));
    }
    protoOf(UIntSerializer).zi = function() {
        return this.dv_1;
    };
    protoOf(UIntSerializer).ev = function(decoder) {
        var this_0 = decoder.dl(this.dv_1).xk();
        return _UInt___init__impl__l7qpdl(this_0);
    };
    protoOf(UIntSerializer).aj = function(decoder) {
        return new UInt(this.ev(decoder));
    };
    var UIntSerializer_instance;
    function UIntSerializer_getInstance() {
        if (UIntSerializer_instance == null) new UIntSerializer;
        return UIntSerializer_instance;
    }
    function ULongSerializer() {
        ULongSerializer_instance = this;
        this.fv_1 = InlinePrimitiveDescriptor('kotlin.ULong', serializer_5(Companion_getInstance_1()));
    }
    protoOf(ULongSerializer).zi = function() {
        return this.fv_1;
    };
    protoOf(ULongSerializer).gv = function(decoder) {
        var this_0 = decoder.dl(this.fv_1).yk();
        return _ULong___init__impl__c78o9k(this_0);
    };
    protoOf(ULongSerializer).aj = function(decoder) {
        return new ULong(this.gv(decoder));
    };
    var ULongSerializer_instance;
    function ULongSerializer_getInstance() {
        if (ULongSerializer_instance == null) new ULongSerializer;
        return ULongSerializer_instance;
    }
    function UByteSerializer() {
        UByteSerializer_instance = this;
        this.hv_1 = InlinePrimitiveDescriptor('kotlin.UByte', serializer_6(ByteCompanionObject_instance));
    }
    protoOf(UByteSerializer).zi = function() {
        return this.hv_1;
    };
    protoOf(UByteSerializer).iv = function(decoder) {
        var this_0 = decoder.dl(this.hv_1).vk();
        return _UByte___init__impl__g9hnc4(this_0);
    };
    protoOf(UByteSerializer).aj = function(decoder) {
        return new UByte(this.iv(decoder));
    };
    var UByteSerializer_instance;
    function UByteSerializer_getInstance() {
        if (UByteSerializer_instance == null) new UByteSerializer;
        return UByteSerializer_instance;
    }
    function UShortSerializer() {
        UShortSerializer_instance = this;
        this.jv_1 = InlinePrimitiveDescriptor('kotlin.UShort', serializer_7(ShortCompanionObject_instance));
    }
    protoOf(UShortSerializer).zi = function() {
        return this.jv_1;
    };
    protoOf(UShortSerializer).kv = function(decoder) {
        var this_0 = decoder.dl(this.jv_1).wk();
        return _UShort___init__impl__jigrne(this_0);
    };
    protoOf(UShortSerializer).aj = function(decoder) {
        return new UShort(this.kv(decoder));
    };
    var UShortSerializer_instance;
    function UShortSerializer_getInstance() {
        if (UShortSerializer_instance == null) new UShortSerializer;
        return UShortSerializer_instance;
    }
    function get_EmptySerializersModuleLegacyJs() {
        _init_properties_SerializersModule_kt__u78ha3();
        return EmptySerializersModule;
    }
    var EmptySerializersModule;
    function SerializersModule() {}
    protoOf(SerializersModule).ej = function(kClass, typeArgumentsSerializers, $super) {
        typeArgumentsSerializers = typeArgumentsSerializers === VOID ? emptyList() : typeArgumentsSerializers;
        return $super === VOID ? this.lv(kClass, typeArgumentsSerializers) : $super.lv.call(this, kClass, typeArgumentsSerializers);
    };
    function SerialModuleImpl(class2ContextualFactory, polyBase2Serializers, polyBase2DefaultSerializerProvider, polyBase2NamedSerializers, polyBase2DefaultDeserializerProvider, hasInterfaceContextualSerializers) {
        SerializersModule.call(this);
        this.mv_1 = class2ContextualFactory;
        this.nv_1 = polyBase2Serializers;
        this.ov_1 = polyBase2DefaultSerializerProvider;
        this.pv_1 = polyBase2NamedSerializers;
        this.qv_1 = polyBase2DefaultDeserializerProvider;
        this.rv_1 = hasInterfaceContextualSerializers;
    }
    protoOf(SerialModuleImpl).zl = function(baseClass, serializedClassName) {
        var tmp0_safe_receiver = this.pv_1.t1(baseClass);
        var tmp;
        if (tmp0_safe_receiver == null) {
            tmp = null;
        } else {
            tmp = (isInterface(tmp0_safe_receiver, KtMap) ? tmp0_safe_receiver : THROW_CCE()).t1(serializedClassName);
        }
        var tmp_0 = tmp;
        var registered = (!(tmp_0 == null) ? isInterface(tmp_0, KSerializer) : false) ? tmp_0 : null;
        if (!(registered == null)) return registered;
        var tmp_1 = this.qv_1.t1(baseClass);
        var tmp1_safe_receiver = (!(tmp_1 == null) ? typeof tmp_1 === 'function' : false) ? tmp_1 : null;
        return tmp1_safe_receiver == null ? null : tmp1_safe_receiver(serializedClassName);
    };
    protoOf(SerialModuleImpl).lv = function(kClass, typeArgumentsSerializers) {
        var tmp0_safe_receiver = this.mv_1.t1(kClass);
        var tmp = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.sv(typeArgumentsSerializers);
        return (tmp == null ? true : isInterface(tmp, KSerializer)) ? tmp : null;
    };
    var properties_initialized_SerializersModule_kt_fjigjn;
    function _init_properties_SerializersModule_kt__u78ha3() {
        if (!properties_initialized_SerializersModule_kt_fjigjn) {
            properties_initialized_SerializersModule_kt_fjigjn = true;
            EmptySerializersModule = new SerialModuleImpl(emptyMap(), emptyMap(), emptyMap(), emptyMap(), emptyMap(), false);
        }
    }
    function EmptySerializersModule_0() {
        return get_EmptySerializersModuleLegacyJs();
    }
    function SerializableWith() {}
    function getChecked(_this__u8e3s4, index) {
        if (!(0 <= index ? index <= (_this__u8e3s4.length - 1 | 0) : false)) throw IndexOutOfBoundsException_init_$Create$_0('Index ' + index + ' out of bounds ' + get_indices(_this__u8e3s4).toString());
        return _this__u8e3s4[index];
    }
    function getChecked_0(_this__u8e3s4, index) {
        if (!(0 <= index ? index <= (_this__u8e3s4.length - 1 | 0) : false)) throw IndexOutOfBoundsException_init_$Create$_0('Index ' + index + ' out of bounds ' + get_indices_0(_this__u8e3s4).toString());
        return _this__u8e3s4[index];
    }
    function initBuiltins() {
        return mapOf_0([ to(PrimitiveClasses_getInstance().o9(), serializer(StringCompanionObject_instance)), to(getKClass(Char), serializer_8(Companion_getInstance())), to(PrimitiveClasses_getInstance().r9(), CharArraySerializer()), to(PrimitiveClasses_getInstance().m9(), serializer_9(DoubleCompanionObject_instance)), to(PrimitiveClasses_getInstance().y9(), DoubleArraySerializer()), to(PrimitiveClasses_getInstance().l9(), serializer_10(FloatCompanionObject_instance)), to(PrimitiveClasses_getInstance().x9(), FloatArraySerializer()), to(PrimitiveClasses_getInstance().k9(), serializer_5(Companion_getInstance_1())), to(PrimitiveClasses_getInstance().w9(), LongArraySerializer()), to(getKClass(ULong), serializer_1(Companion_getInstance_18())), to(getKClass(ULongArray), ULongArraySerializer()), to(PrimitiveClasses_getInstance().j9(), serializer_4(IntCompanionObject_instance)), to(PrimitiveClasses_getInstance().u9(), IntArraySerializer()), to(getKClass(UInt), serializer_0(Companion_getInstance_17())), to(getKClass(UIntArray), UIntArraySerializer()), to(PrimitiveClasses_getInstance().i9(), serializer_7(ShortCompanionObject_instance)), to(PrimitiveClasses_getInstance().t9(), ShortArraySerializer()), to(getKClass(UShort), serializer_3(Companion_getInstance_19())), to(getKClass(UShortArray), UShortArraySerializer()), to(PrimitiveClasses_getInstance().h9(), serializer_6(ByteCompanionObject_instance)), to(PrimitiveClasses_getInstance().s9(), ByteArraySerializer()), to(getKClass(UByte), serializer_2(Companion_getInstance_16())), to(getKClass(UByteArray), UByteArraySerializer()), to(PrimitiveClasses_getInstance().g9(), serializer_11(BooleanCompanionObject_instance)), to(PrimitiveClasses_getInstance().q9(), BooleanArraySerializer()), to(getKClass(Unit), serializer_12(Unit_instance)), to(PrimitiveClasses_getInstance().f9(), NothingSerializer()), to(getKClass(Duration), serializer_13(Companion_getInstance_10())), to(getKClass(Instant), serializer_14(Companion_getInstance_12())), to(getKClass(Uuid), serializer_15(Companion_getInstance_15())) ]);
    }
    function estimateCapacityForHashMap(requiredCapacity) {
        return requiredCapacity;
    }
    function Default_0() {
        Default_instance_0 = this;
        Json.call(this, new JsonConfiguration, EmptySerializersModule_0());
    }
    var Default_instance_0;
    function Default_getInstance_0() {
        if (Default_instance_0 == null) new Default_0;
        return Default_instance_0;
    }
    function Json(configuration, serializersModule) {
        Default_getInstance_0();
        this.tv_1 = configuration;
        this.uv_1 = serializersModule;
        this.vv_1 = new DescriptorSchemaCache;
    }
    protoOf(Json).tl = function() {
        return this.uv_1;
    };
    protoOf(Json).wv = function(deserializer, string) {
        var lexer = StringJsonLexer_0(this, string);
        var input = new StreamingJsonDecoder(this, LexerMode_OBJ_getInstance(), lexer, deserializer.zi(), null);
        var result = input.fl(deserializer);
        lexer.lw();
        return result;
    };
    protoOf(Json).xv = function(string) {
        return this.wv(JsonElementSerializer_getInstance(), string);
    };
    function JsonClassDiscriminator() {}
    function JsonIgnoreUnknownKeys() {}
    function JsonNames() {}
    function JsonConfiguration(encodeDefaults, ignoreUnknownKeys, isLenient, allowStructuredMapKeys, prettyPrint, explicitNulls, prettyPrintIndent, coerceInputValues, useArrayPolymorphism, classDiscriminator, allowSpecialFloatingPointValues, useAlternativeNames, namingStrategy, decodeEnumsCaseInsensitive, allowTrailingComma, allowComments, classDiscriminatorMode, exceptionsWithDebugInfo, maxNestingDepth) {
        encodeDefaults = encodeDefaults === VOID ? false : encodeDefaults;
        ignoreUnknownKeys = ignoreUnknownKeys === VOID ? false : ignoreUnknownKeys;
        isLenient = isLenient === VOID ? false : isLenient;
        allowStructuredMapKeys = allowStructuredMapKeys === VOID ? false : allowStructuredMapKeys;
        prettyPrint = prettyPrint === VOID ? false : prettyPrint;
        explicitNulls = explicitNulls === VOID ? true : explicitNulls;
        prettyPrintIndent = prettyPrintIndent === VOID ? '    ' : prettyPrintIndent;
        coerceInputValues = coerceInputValues === VOID ? false : coerceInputValues;
        useArrayPolymorphism = useArrayPolymorphism === VOID ? false : useArrayPolymorphism;
        classDiscriminator = classDiscriminator === VOID ? 'type' : classDiscriminator;
        allowSpecialFloatingPointValues = allowSpecialFloatingPointValues === VOID ? false : allowSpecialFloatingPointValues;
        useAlternativeNames = useAlternativeNames === VOID ? true : useAlternativeNames;
        namingStrategy = namingStrategy === VOID ? null : namingStrategy;
        decodeEnumsCaseInsensitive = decodeEnumsCaseInsensitive === VOID ? false : decodeEnumsCaseInsensitive;
        allowTrailingComma = allowTrailingComma === VOID ? false : allowTrailingComma;
        allowComments = allowComments === VOID ? false : allowComments;
        classDiscriminatorMode = classDiscriminatorMode === VOID ? ClassDiscriminatorMode_POLYMORPHIC_getInstance() : classDiscriminatorMode;
        exceptionsWithDebugInfo = exceptionsWithDebugInfo === VOID ? true : exceptionsWithDebugInfo;
        maxNestingDepth = maxNestingDepth === VOID ? 400 : maxNestingDepth;
        this.mw_1 = encodeDefaults;
        this.nw_1 = ignoreUnknownKeys;
        this.ow_1 = isLenient;
        this.pw_1 = allowStructuredMapKeys;
        this.qw_1 = prettyPrint;
        this.rw_1 = explicitNulls;
        this.sw_1 = prettyPrintIndent;
        this.tw_1 = coerceInputValues;
        this.uw_1 = useArrayPolymorphism;
        this.vw_1 = classDiscriminator;
        this.ww_1 = allowSpecialFloatingPointValues;
        this.xw_1 = useAlternativeNames;
        this.yw_1 = namingStrategy;
        this.zw_1 = decodeEnumsCaseInsensitive;
        this.ax_1 = allowTrailingComma;
        this.bx_1 = allowComments;
        this.cx_1 = classDiscriminatorMode;
        this.dx_1 = exceptionsWithDebugInfo;
        this.ex_1 = maxNestingDepth;
    }
    protoOf(JsonConfiguration).toString = function() {
        return 'JsonConfiguration(encodeDefaults=' + this.mw_1 + ', ignoreUnknownKeys=' + this.nw_1 + ', isLenient=' + this.ow_1 + ', ' + ('allowStructuredMapKeys=' + this.pw_1 + ', prettyPrint=' + this.qw_1 + ', explicitNulls=' + this.rw_1 + ', ') + ("prettyPrintIndent='" + this.sw_1 + "', coerceInputValues=" + this.tw_1 + ', useArrayPolymorphism=' + this.uw_1 + ', ') + ("classDiscriminator='" + this.vw_1 + "', allowSpecialFloatingPointValues=" + this.ww_1 + ', ') + ('useAlternativeNames=' + this.xw_1 + ', namingStrategy=' + toString_0(this.yw_1) + ', decodeEnumsCaseInsensitive=' + this.zw_1 + ', ') + ('allowTrailingComma=' + this.ax_1 + ', allowComments=' + this.bx_1 + ', classDiscriminatorMode=' + this.cx_1.toString() + ', ') + ('exceptionsWithDebugInfo=' + this.dx_1 + ', maxNestingDepth=' + this.ex_1 + ')');
    };
    var static_init_called_2;
    function static_init_2() {
        if (static_init_called_2) return Unit_instance;
        static_init_called_2 = true;
        ClassDiscriminatorMode_NONE_instance = new ClassDiscriminatorMode('NONE', 0);
        ClassDiscriminatorMode_ALL_JSON_OBJECTS_instance = new ClassDiscriminatorMode('ALL_JSON_OBJECTS', 1);
        ClassDiscriminatorMode_POLYMORPHIC_instance = new ClassDiscriminatorMode('POLYMORPHIC', 2);
    }
    var ClassDiscriminatorMode_NONE_instance;
    var ClassDiscriminatorMode_ALL_JSON_OBJECTS_instance;
    var ClassDiscriminatorMode_POLYMORPHIC_instance;
    function ClassDiscriminatorMode(name, ordinal) {
        Enum.call(this, name, ordinal);
    }
    function ClassDiscriminatorMode_POLYMORPHIC_getInstance() {
        static_init_2();
        return ClassDiscriminatorMode_POLYMORPHIC_instance;
    }
    function JsonDecoder() {}
    var jsonUnquotedLiteralDescriptor;
    function Companion_21() {}
    var Companion_instance_21;
    function Companion_getInstance_21() {
        return Companion_instance_21;
    }
    function JsonObject$toString$lambda(_destruct__k2r9zo) {
        var k = _destruct__k2r9zo.p1();
        var v = _destruct__k2r9zo.q1();
        var this_0 = StringBuilder_init_$Create$_0();
        printQuoted(this_0, k);
        this_0.z6(_Char___init__impl__6a9atx(58));
        this_0.x6(v);
        return this_0.toString();
    }
    function JsonObject(content) {
        JsonElement.call(this);
        this.hx_1 = content;
    }
    protoOf(JsonObject).equals = function(other) {
        return equals(this.hx_1, other);
    };
    protoOf(JsonObject).hashCode = function() {
        return hashCode_0(this.hx_1);
    };
    protoOf(JsonObject).toString = function() {
        var tmp = this.hx_1.w1();
        return joinToString_0(tmp, ',', '{', '}', VOID, VOID, JsonObject$toString$lambda);
    };
    protoOf(JsonObject).n = function() {
        return this.hx_1.n();
    };
    protoOf(JsonObject).ix = function(key) {
        return this.hx_1.r1(key);
    };
    protoOf(JsonObject).r1 = function(key) {
        if (!(!(key == null) ? typeof key === 'string' : false)) return false;
        return this.ix((!(key == null) ? typeof key === 'string' : false) ? key : THROW_CCE());
    };
    protoOf(JsonObject).jx = function(key) {
        return this.hx_1.t1(key);
    };
    protoOf(JsonObject).t1 = function(key) {
        if (!(!(key == null) ? typeof key === 'string' : false)) return null;
        return this.jx((!(key == null) ? typeof key === 'string' : false) ? key : THROW_CCE());
    };
    protoOf(JsonObject).m = function() {
        return this.hx_1.m();
    };
    protoOf(JsonObject).u1 = function() {
        return this.hx_1.u1();
    };
    protoOf(JsonObject).v1 = function() {
        return this.hx_1.v1();
    };
    protoOf(JsonObject).w1 = function() {
        return this.hx_1.w1();
    };
    function Companion_22() {}
    var Companion_instance_22;
    function Companion_getInstance_22() {
        return Companion_instance_22;
    }
    function JsonPrimitive() {
        JsonElement.call(this);
    }
    protoOf(JsonPrimitive).toString = function() {
        return this.kx();
    };
    function Companion_23() {}
    var Companion_instance_23;
    function Companion_getInstance_23() {
        return Companion_instance_23;
    }
    function JsonElement() {}
    function get_jsonPrimitive(_this__u8e3s4) {
        _init_properties_JsonElement_kt__7cbdc2();
        var tmp0_elvis_lhs = _this__u8e3s4 instanceof JsonPrimitive ? _this__u8e3s4 : null;
        var tmp;
        if (tmp0_elvis_lhs == null) {
            error_1(_this__u8e3s4, 'JsonPrimitive');
        } else {
            tmp = tmp0_elvis_lhs;
        }
        return tmp;
    }
    function get_contentOrNull(_this__u8e3s4) {
        _init_properties_JsonElement_kt__7cbdc2();
        var tmp;
        if (_this__u8e3s4 instanceof JsonNull) {
            tmp = null;
        } else {
            tmp = _this__u8e3s4.kx();
        }
        return tmp;
    }
    function get_intOrNull(_this__u8e3s4) {
        _init_properties_JsonElement_kt__7cbdc2();
        var tmp;
        try {
            tmp = parseLongImpl(_this__u8e3s4);
        } catch ($p) {
            var tmp_0;
            if ($p instanceof JsonDecodingException) {
                var e = $p;
                tmp_0 = null;
            } else {
                throw $p;
            }
            tmp = tmp_0;
        }
        var tmp0_elvis_lhs = tmp;
        var tmp_1;
        if (tmp0_elvis_lhs == null) {
            return null;
        } else {
            tmp_1 = tmp0_elvis_lhs;
        }
        var result = tmp_1;
        var this_0 = numberRangeToNumber(-2147483648, 2147483647);
        if (!contains_0(isInterface(this_0, ClosedRange) ? this_0 : THROW_CCE(), result)) return null;
        return convertToInt(result);
    }
    function get_doubleOrNull(_this__u8e3s4) {
        _init_properties_JsonElement_kt__7cbdc2();
        return toDoubleOrNull(_this__u8e3s4.kx());
    }
    function Companion_24() {}
    var Companion_instance_24;
    function Companion_getInstance_24() {
        return Companion_instance_24;
    }
    function JsonArray(content) {
        JsonElement.call(this);
        this.lx_1 = content;
    }
    protoOf(JsonArray).equals = function(other) {
        return equals(this.lx_1, other);
    };
    protoOf(JsonArray).hashCode = function() {
        return hashCode_0(this.lx_1);
    };
    protoOf(JsonArray).toString = function() {
        return joinToString_0(this.lx_1, ',', '[', ']');
    };
    protoOf(JsonArray).n = function() {
        return this.lx_1.n();
    };
    protoOf(JsonArray).mx = function(element) {
        return this.lx_1.m1(element);
    };
    protoOf(JsonArray).m1 = function(element) {
        if (!(element instanceof JsonElement)) return false;
        return this.mx(element instanceof JsonElement ? element : THROW_CCE());
    };
    protoOf(JsonArray).j = function() {
        return this.lx_1.j();
    };
    protoOf(JsonArray).p = function(index) {
        return this.lx_1.p(index);
    };
    protoOf(JsonArray).nx = function(element) {
        return this.lx_1.o1(element);
    };
    protoOf(JsonArray).o1 = function(element) {
        if (!(element instanceof JsonElement)) return -1;
        return this.nx(element instanceof JsonElement ? element : THROW_CCE());
    };
    protoOf(JsonArray).r = function(index) {
        return this.lx_1.r(index);
    };
    protoOf(JsonArray).m = function() {
        return this.lx_1.m();
    };
    function JsonPrimitive_0(value) {
        _init_properties_JsonElement_kt__7cbdc2();
        if (value == null) return JsonNull_getInstance();
        return new JsonLiteral(value, false);
    }
    function JsonNull() {
        JsonNull_instance = this;
        JsonPrimitive.call(this);
        this.ox_1 = 'null';
    }
    protoOf(JsonNull).kx = function() {
        return this.ox_1;
    };
    var JsonNull_instance;
    function JsonNull_getInstance() {
        if (JsonNull_instance == null) new JsonNull;
        return JsonNull_instance;
    }
    function JsonPrimitive_1(value) {
        _init_properties_JsonElement_kt__7cbdc2();
        if (value == null) return JsonNull_getInstance();
        return new JsonLiteral(value, true);
    }
    function get_booleanOrNull(_this__u8e3s4) {
        _init_properties_JsonElement_kt__7cbdc2();
        return toBooleanStrictOrNull(_this__u8e3s4.kx());
    }
    function JsonPrimitive_2(value) {
        _init_properties_JsonElement_kt__7cbdc2();
        if (value == null) return JsonNull_getInstance();
        return new JsonLiteral(value, false);
    }
    function get_jsonArray(_this__u8e3s4) {
        _init_properties_JsonElement_kt__7cbdc2();
        var tmp0_elvis_lhs = _this__u8e3s4 instanceof JsonArray ? _this__u8e3s4 : null;
        var tmp;
        if (tmp0_elvis_lhs == null) {
            error_1(_this__u8e3s4, 'JsonArray');
        } else {
            tmp = tmp0_elvis_lhs;
        }
        return tmp;
    }
    function get_jsonObject(_this__u8e3s4) {
        _init_properties_JsonElement_kt__7cbdc2();
        var tmp0_elvis_lhs = _this__u8e3s4 instanceof JsonObject ? _this__u8e3s4 : null;
        var tmp;
        if (tmp0_elvis_lhs == null) {
            error_1(_this__u8e3s4, 'JsonObject');
        } else {
            tmp = tmp0_elvis_lhs;
        }
        return tmp;
    }
    function error_1(_this__u8e3s4, element) {
        _init_properties_JsonElement_kt__7cbdc2();
        throw IllegalArgumentException_init_$Create$_0('Element ' + toString_1(getKClassFromExpression(_this__u8e3s4)) + ' is not a ' + element);
    }
    function parseLongImpl(_this__u8e3s4) {
        _init_properties_JsonElement_kt__7cbdc2();
        return StringJsonLexer_0(Default_getInstance_0(), _this__u8e3s4.kx()).px();
    }
    function JsonLiteral(body, isString, coerceToInlineType) {
        coerceToInlineType = coerceToInlineType === VOID ? null : coerceToInlineType;
        JsonPrimitive.call(this);
        this.qx_1 = isString;
        this.rx_1 = coerceToInlineType;
        this.sx_1 = toString_1(body);
        if (!(this.rx_1 == null)) {
            if (!this.rx_1.kj()) {
                var message = 'Failed requirement.';
                throw IllegalArgumentException_init_$Create$_0(toString_1(message));
            }
        }
    }
    protoOf(JsonLiteral).kx = function() {
        return this.sx_1;
    };
    protoOf(JsonLiteral).toString = function() {
        var tmp;
        if (this.qx_1) {
            var this_0 = StringBuilder_init_$Create$_0();
            printQuoted(this_0, this.sx_1);
            tmp = this_0.toString();
        } else {
            tmp = this.sx_1;
        }
        return tmp;
    };
    protoOf(JsonLiteral).equals = function(other) {
        if (this === other) return true;
        if (other == null || !getKClassFromExpression(this).equals(getKClassFromExpression(other))) return false;
        if (!(other instanceof JsonLiteral)) THROW_CCE();
        if (!(this.qx_1 === other.qx_1)) return false;
        if (!(this.sx_1 === other.sx_1)) return false;
        return true;
    };
    protoOf(JsonLiteral).hashCode = function() {
        var result = getBooleanHashCode(this.qx_1);
        result = imul(31, result) + getStringHashCode(this.sx_1) | 0;
        return result;
    };
    function get_float(_this__u8e3s4) {
        _init_properties_JsonElement_kt__7cbdc2();
        var this_0 = _this__u8e3s4.kx();
        return toDouble(this_0);
    }
    function get_double(_this__u8e3s4) {
        _init_properties_JsonElement_kt__7cbdc2();
        return toDouble(_this__u8e3s4.kx());
    }
    var properties_initialized_JsonElement_kt_abxy8s;
    function _init_properties_JsonElement_kt__7cbdc2() {
        if (!properties_initialized_JsonElement_kt_abxy8s) {
            properties_initialized_JsonElement_kt_abxy8s = true;
            jsonUnquotedLiteralDescriptor = InlinePrimitiveDescriptor('kotlinx.serialization.json.JsonUnquotedLiteral', serializer(StringCompanionObject_instance));
        }
    }
    function JsonObjectBuilder() {
        var tmp = this;
        tmp.tx_1 = LinkedHashMap_init_$Create$();
    }
    protoOf(JsonObjectBuilder).ux = function(key, element) {
        return this.tx_1.x1(key, element);
    };
    protoOf(JsonObjectBuilder).vx = function() {
        return new JsonObject(this.tx_1);
    };
    function put(_this__u8e3s4, key, value) {
        return _this__u8e3s4.ux(key, JsonPrimitive_0(value));
    }
    function put_0(_this__u8e3s4, key, value) {
        return _this__u8e3s4.ux(key, JsonPrimitive_1(value));
    }
    function put_1(_this__u8e3s4, key, value) {
        return _this__u8e3s4.ux(key, JsonPrimitive_2(value));
    }
    function JsonObjectDescriptor() {
        JsonObjectDescriptor_instance = this;
        this.wx_1 = MapSerializer(serializer(StringCompanionObject_instance), JsonElementSerializer_getInstance()).zi();
        this.xx_1 = 'kotlinx.serialization.json.JsonObject';
    }
    protoOf(JsonObjectDescriptor).hj = function() {
        return this.xx_1;
    };
    protoOf(JsonObjectDescriptor).nj = function(index) {
        return this.wx_1.nj(index);
    };
    protoOf(JsonObjectDescriptor).oj = function(name) {
        return this.wx_1.oj(name);
    };
    protoOf(JsonObjectDescriptor).pj = function(index) {
        return this.wx_1.pj(index);
    };
    protoOf(JsonObjectDescriptor).qj = function(index) {
        return this.wx_1.qj(index);
    };
    protoOf(JsonObjectDescriptor).rj = function(index) {
        return this.wx_1.rj(index);
    };
    protoOf(JsonObjectDescriptor).ij = function() {
        return this.wx_1.ij();
    };
    protoOf(JsonObjectDescriptor).jj = function() {
        return this.wx_1.jj();
    };
    protoOf(JsonObjectDescriptor).kj = function() {
        return this.wx_1.kj();
    };
    protoOf(JsonObjectDescriptor).lj = function() {
        return this.wx_1.lj();
    };
    protoOf(JsonObjectDescriptor).mj = function() {
        return this.wx_1.mj();
    };
    var JsonObjectDescriptor_instance;
    function JsonObjectDescriptor_getInstance() {
        if (JsonObjectDescriptor_instance == null) new JsonObjectDescriptor;
        return JsonObjectDescriptor_instance;
    }
    function JsonObjectSerializer() {
        JsonObjectSerializer_instance = this;
        this.yx_1 = JsonObjectDescriptor_getInstance();
    }
    protoOf(JsonObjectSerializer).zi = function() {
        return this.yx_1;
    };
    protoOf(JsonObjectSerializer).aj = function(decoder) {
        verify(decoder);
        return new JsonObject(MapSerializer(serializer(StringCompanionObject_instance), JsonElementSerializer_getInstance()).aj(decoder));
    };
    var JsonObjectSerializer_instance;
    function JsonObjectSerializer_getInstance() {
        if (JsonObjectSerializer_instance == null) new JsonObjectSerializer;
        return JsonObjectSerializer_instance;
    }
    function JsonPrimitiveSerializer() {
        JsonPrimitiveSerializer_instance = this;
        this.zx_1 = buildSerialDescriptor('kotlinx.serialization.json.JsonPrimitive', STRING_getInstance(), []);
    }
    protoOf(JsonPrimitiveSerializer).zi = function() {
        return this.zx_1;
    };
    protoOf(JsonPrimitiveSerializer).aj = function(decoder) {
        var jsonDecoder = asJsonDecoder(decoder);
        var result = jsonDecoder.gx();
        if (!(result instanceof JsonPrimitive)) {
            var shortMessage = 'Unexpected JSON element, expected JsonPrimitive, had ' + toString_1(getKClassFromExpression(result));
            var tmp;
            if (jsonDecoder.fx().tv_1.dx_1) {
                var tmp$ret$3 = toString_1(result);
                tmp = toString_1(minify(tmp$ret$3));
            } else {
                tmp = null;
            }
            var inputValue = tmp;
            throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, shortMessage, null, null, inputValue), shortMessage, -1, null, inputValue, null);
        }
        return result;
    };
    var JsonPrimitiveSerializer_instance;
    function JsonPrimitiveSerializer_getInstance() {
        if (JsonPrimitiveSerializer_instance == null) new JsonPrimitiveSerializer;
        return JsonPrimitiveSerializer_instance;
    }
    function JsonElementSerializer$descriptor$lambda($this$buildSerialDescriptor) {
        $this$buildSerialDescriptor.ek('JsonPrimitive', defer(JsonElementSerializer$descriptor$lambda$lambda));
        $this$buildSerialDescriptor.ek('JsonNull', defer(JsonElementSerializer$descriptor$lambda$lambda_0));
        $this$buildSerialDescriptor.ek('JsonLiteral', defer(JsonElementSerializer$descriptor$lambda$lambda_1));
        $this$buildSerialDescriptor.ek('JsonObject', defer(JsonElementSerializer$descriptor$lambda$lambda_2));
        $this$buildSerialDescriptor.ek('JsonArray', defer(JsonElementSerializer$descriptor$lambda$lambda_3));
        return Unit_instance;
    }
    function JsonElementSerializer$descriptor$lambda$lambda() {
        return JsonPrimitiveSerializer_getInstance().zx_1;
    }
    function JsonElementSerializer$descriptor$lambda$lambda_0() {
        return JsonNullSerializer_getInstance().ay_1;
    }
    function JsonElementSerializer$descriptor$lambda$lambda_1() {
        return JsonLiteralSerializer_getInstance().by_1;
    }
    function JsonElementSerializer$descriptor$lambda$lambda_2() {
        return JsonObjectSerializer_getInstance().yx_1;
    }
    function JsonElementSerializer$descriptor$lambda$lambda_3() {
        return JsonArraySerializer_getInstance().cy_1;
    }
    function JsonElementSerializer() {
        JsonElementSerializer_instance = this;
        var tmp = this;
        var tmp_0 = SEALED_getInstance();
        tmp.dy_1 = buildSerialDescriptor('kotlinx.serialization.json.JsonElement', tmp_0, [], JsonElementSerializer$descriptor$lambda);
    }
    protoOf(JsonElementSerializer).zi = function() {
        return this.dy_1;
    };
    protoOf(JsonElementSerializer).aj = function(decoder) {
        var input = asJsonDecoder(decoder);
        return input.gx();
    };
    var JsonElementSerializer_instance;
    function JsonElementSerializer_getInstance() {
        if (JsonElementSerializer_instance == null) new JsonElementSerializer;
        return JsonElementSerializer_instance;
    }
    function JsonArrayDescriptor() {
        JsonArrayDescriptor_instance = this;
        this.ey_1 = ListSerializer(JsonElementSerializer_getInstance()).zi();
        this.fy_1 = 'kotlinx.serialization.json.JsonArray';
    }
    protoOf(JsonArrayDescriptor).hj = function() {
        return this.fy_1;
    };
    protoOf(JsonArrayDescriptor).nj = function(index) {
        return this.ey_1.nj(index);
    };
    protoOf(JsonArrayDescriptor).oj = function(name) {
        return this.ey_1.oj(name);
    };
    protoOf(JsonArrayDescriptor).pj = function(index) {
        return this.ey_1.pj(index);
    };
    protoOf(JsonArrayDescriptor).qj = function(index) {
        return this.ey_1.qj(index);
    };
    protoOf(JsonArrayDescriptor).rj = function(index) {
        return this.ey_1.rj(index);
    };
    protoOf(JsonArrayDescriptor).ij = function() {
        return this.ey_1.ij();
    };
    protoOf(JsonArrayDescriptor).jj = function() {
        return this.ey_1.jj();
    };
    protoOf(JsonArrayDescriptor).kj = function() {
        return this.ey_1.kj();
    };
    protoOf(JsonArrayDescriptor).lj = function() {
        return this.ey_1.lj();
    };
    protoOf(JsonArrayDescriptor).mj = function() {
        return this.ey_1.mj();
    };
    var JsonArrayDescriptor_instance;
    function JsonArrayDescriptor_getInstance() {
        if (JsonArrayDescriptor_instance == null) new JsonArrayDescriptor;
        return JsonArrayDescriptor_instance;
    }
    function JsonArraySerializer() {
        JsonArraySerializer_instance = this;
        this.cy_1 = JsonArrayDescriptor_getInstance();
    }
    protoOf(JsonArraySerializer).zi = function() {
        return this.cy_1;
    };
    protoOf(JsonArraySerializer).aj = function(decoder) {
        verify(decoder);
        return new JsonArray(ListSerializer(JsonElementSerializer_getInstance()).aj(decoder));
    };
    var JsonArraySerializer_instance;
    function JsonArraySerializer_getInstance() {
        if (JsonArraySerializer_instance == null) new JsonArraySerializer;
        return JsonArraySerializer_instance;
    }
    function JsonNullSerializer() {
        JsonNullSerializer_instance = this;
        this.ay_1 = buildSerialDescriptor('kotlinx.serialization.json.JsonNull', ENUM_getInstance(), []);
    }
    protoOf(JsonNullSerializer).zi = function() {
        return this.ay_1;
    };
    protoOf(JsonNullSerializer).aj = function(decoder) {
        verify(decoder);
        if (decoder.sk()) {
            throw decodingExceptionOf("Expected 'null' literal");
        }
        decoder.tk();
        return JsonNull_getInstance();
    };
    var JsonNullSerializer_instance;
    function JsonNullSerializer_getInstance() {
        if (JsonNullSerializer_instance == null) new JsonNullSerializer;
        return JsonNullSerializer_instance;
    }
    function verify(decoder) {
        asJsonDecoder(decoder);
    }
    function JsonLiteralSerializer() {
        JsonLiteralSerializer_instance = this;
        this.by_1 = PrimitiveSerialDescriptor('kotlinx.serialization.json.JsonLiteral', STRING_getInstance());
    }
    protoOf(JsonLiteralSerializer).zi = function() {
        return this.by_1;
    };
    protoOf(JsonLiteralSerializer).aj = function(decoder) {
        var jsonDecoder = asJsonDecoder(decoder);
        var result = jsonDecoder.gx();
        if (!(result instanceof JsonLiteral)) {
            var shortMessage = 'Unexpected JSON element, expected JsonLiteral, had ' + toString_1(getKClassFromExpression(result));
            var tmp;
            if (jsonDecoder.fx().tv_1.dx_1) {
                var tmp$ret$3 = toString_1(result);
                tmp = toString_1(minify(tmp$ret$3));
            } else {
                tmp = null;
            }
            var inputValue = tmp;
            throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, shortMessage, null, null, inputValue), shortMessage, -1, null, inputValue, null);
        }
        return result;
    };
    var JsonLiteralSerializer_instance;
    function JsonLiteralSerializer_getInstance() {
        if (JsonLiteralSerializer_instance == null) new JsonLiteralSerializer;
        return JsonLiteralSerializer_instance;
    }
    function asJsonDecoder(_this__u8e3s4) {
        var tmp0_elvis_lhs = isInterface(_this__u8e3s4, JsonDecoder) ? _this__u8e3s4 : null;
        var tmp;
        if (tmp0_elvis_lhs == null) {
            throw IllegalStateException_init_$Create$_0('This serializer can be used only with Json format.' + ('Expected Decoder to be JsonDecoder, got ' + toString_1(getKClassFromExpression(_this__u8e3s4))));
        } else {
            tmp = tmp0_elvis_lhs;
        }
        return tmp;
    }
    function defer(deferred) {
        return new defer$1(deferred);
    }
    function _get_original__l7ku1m($this) {
        var tmp0 = $this.gy_1;
        var tmp = KProperty1;
        getPropertyCallableRef('original', 1, tmp, defer$o$_get_original_$ref_3cje7k(), null);
        return tmp0.q1();
    }
    function defer$o$_get_original_$ref_3cje7k() {
        return constructCallableReference((function(p0) {
            return _get_original__l7ku1m(p0);
        }), 1, 0, 5);
    }
    function defer$1($deferred) {
        this.gy_1 = lazy_0($deferred);
    }
    protoOf(defer$1).hj = function() {
        return _get_original__l7ku1m(this).hj();
    };
    protoOf(defer$1).ij = function() {
        return _get_original__l7ku1m(this).ij();
    };
    protoOf(defer$1).lj = function() {
        return _get_original__l7ku1m(this).lj();
    };
    protoOf(defer$1).nj = function(index) {
        return _get_original__l7ku1m(this).nj(index);
    };
    protoOf(defer$1).oj = function(name) {
        return _get_original__l7ku1m(this).oj(name);
    };
    protoOf(defer$1).pj = function(index) {
        return _get_original__l7ku1m(this).pj(index);
    };
    protoOf(defer$1).qj = function(index) {
        return _get_original__l7ku1m(this).qj(index);
    };
    protoOf(defer$1).rj = function(index) {
        return _get_original__l7ku1m(this).rj(index);
    };
    function JsonDecodingException(fullMessage, shortMessage, offset, path, input, hint, cause) {
        cause = cause === VOID ? null : cause;
        JsonException.call(this, fullMessage, cause);
        captureStack(this, JsonDecodingException);
        this.iy_1 = shortMessage;
        this.jy_1 = offset;
        this.ky_1 = path;
        this.ly_1 = input;
        this.my_1 = hint;
    }
    function JsonException(message, cause) {
        SerializationException_init_$Init$_1(message, cause, this);
        captureStack(this, JsonException);
        this.ny_1 = message;
        delete this.message;
    }
    protoOf(JsonException).t8 = function() {
        return this.ny_1;
    };
    function JsonEncodingException(shortMessage, classSerialName, hint, cause) {
        classSerialName = classSerialName === VOID ? null : classSerialName;
        hint = hint === VOID ? null : hint;
        cause = cause === VOID ? null : cause;
        JsonException.call(this, formatEncodingException(shortMessage, hint), cause);
        captureStack(this, JsonEncodingException);
        this.py_1 = shortMessage;
        this.qy_1 = classSerialName;
        this.ry_1 = hint;
    }
    function readIfAbsent($this, descriptor, index) {
        $this.ty_1 = !descriptor.rj(index) && descriptor.qj(index).jj();
        return $this.ty_1;
    }
    function JsonElementMarker$readIfAbsent$ref(p0) {
        return constructCallableReference((function(p0_0, p1) {
            var tmp0 = p0;
            return readIfAbsent(tmp0, p0_0, p1);
        }), 2, 0, 6, 'readIfAbsent', [ p0 ]);
    }
    function JsonElementMarker(descriptor) {
        var tmp = this;
        tmp.sy_1 = new ElementMarker(descriptor, JsonElementMarker$readIfAbsent$ref(this));
        this.ty_1 = false;
    }
    protoOf(JsonElementMarker).uy = function(index) {
        this.sy_1.lo(index);
    };
    protoOf(JsonElementMarker).vy = function() {
        return this.sy_1.mo();
    };
    function minify(_this__u8e3s4, offset) {
        offset = offset === VOID ? -1 : offset;
        if (charSequenceLength(_this__u8e3s4) < 200) return _this__u8e3s4;
        if (offset === -1) {
            var start = charSequenceLength(_this__u8e3s4) - 60 | 0;
            if (start <= 0) return _this__u8e3s4;
            var endIndex = charSequenceLength(_this__u8e3s4);
            return '.....' + toString_1(charSequenceSubSequence(_this__u8e3s4, start, endIndex));
        }
        var start_0 = offset - 30 | 0;
        var end = offset + 30 | 0;
        var prefix = start_0 <= 0 ? '' : '.....';
        var suffix = end >= charSequenceLength(_this__u8e3s4) ? '' : '.....';
        var tmp2 = coerceAtLeast(start_0, 0);
        var endIndex_0 = coerceAtMost(end, charSequenceLength(_this__u8e3s4));
        return prefix + toString_1(charSequenceSubSequence(_this__u8e3s4, tmp2, endIndex_0)) + suffix;
    }
    function access$formatDecodingException$tJsonExceptionsKt(offset, shortMessage, path, hint, input) {
        return formatDecodingException(offset, shortMessage, path, hint, input);
    }
    function decodingExceptionOf(shortMessage, hint) {
        hint = hint === VOID ? null : hint;
        return new JsonDecodingException(formatDecodingException(-1, shortMessage, null, hint, null), shortMessage, -1, null, null, hint);
    }
    function invalidTrailingComma(_this__u8e3s4, entity) {
        entity = entity === VOID ? 'object' : entity;
        _this__u8e3s4.wy('Trailing comma before the end of JSON ' + entity, _this__u8e3s4.hw_1 - 1 | 0, "Trailing commas are non-complaint JSON and not allowed by default. Use 'allowTrailingComma = true' in 'Json {}' builder to support them.");
    }
    function throwInvalidFloatingPointDecoded(_this__u8e3s4, result) {
        _this__u8e3s4.xy(nonFiniteFpMessage(result, null), VOID, "It is possible to deserialize them using 'JsonBuilder.allowSpecialFloatingPointValues = true'");
    }
    function InvalidKeyKindException(keyDescriptor) {
        return new JsonEncodingException("Value of type '" + keyDescriptor.hj() + "' can't be used in JSON as a key in the map. " + ("It should have either primitive or enum kind, but its kind is '" + keyDescriptor.ij().toString() + "'"), keyDescriptor.hj(), "Use 'allowStructuredMapKeys = true' in 'Json {}' builder to convert such maps to [key1, value1, key2, value2,...] arrays.");
    }
    function access$nonFiniteFpMessage$tJsonExceptionsKt(value, key) {
        return nonFiniteFpMessage(value, key);
    }
    function formatDecodingException(offset, shortMessage, path, hint, input) {
        var this_0 = StringBuilder_init_$Create$_0();
        if (offset >= 0) {
            this_0.y6('Unexpected JSON token at offset ' + offset + ': ');
        }
        this_0.y6(shortMessage);
        if (!(path == null || isBlank(path))) {
            this_0.y6(' at path: ');
            this_0.y6(path);
        }
        if (!(hint == null || isBlank(hint))) {
            this_0.y6('\n' + hint);
        }
        if (!(input == null)) {
            this_0.y6('\nJSON input: ');
            this_0.y6(input);
        }
        return this_0.toString();
    }
    function nonFiniteFpMessage(value, key) {
        return 'Unexpected special floating-point value ' + toString_1(value) + (!(key == null) ? ' with key ' + key + '. ' : '. ') + 'By default, ' + 'non-finite floating point values are prohibited because they do not conform JSON specification.';
    }
    function decodingExceptionOf_0(_this__u8e3s4, shortMessage, offset, path, hint, input, cause) {
        cause = cause === VOID ? null : cause;
        var tmp;
        if (_this__u8e3s4.gw_1.dx_1) {
            tmp = toString_1(minify(input, offset));
        } else {
            tmp = null;
        }
        var inputValue = tmp;
        return new JsonDecodingException(formatDecodingException(offset, shortMessage, path, hint, inputValue), shortMessage, offset, path, inputValue, hint, cause);
    }
    function formatEncodingException(shortMessage, hint) {
        var tmp;
        if (hint == null || isBlank(hint)) {
            tmp = '';
        } else {
            tmp = '\n' + hint;
        }
        return shortMessage + tmp;
    }
    function get_JsonDeserializationNamesKey() {
        _init_properties_JsonNamesMap_kt__cbbp0k();
        return JsonDeserializationNamesKey;
    }
    var JsonDeserializationNamesKey;
    var JsonSerializationNamesKey;
    function ignoreUnknownKeys(_this__u8e3s4, json) {
        _init_properties_JsonNamesMap_kt__cbbp0k();
        var tmp;
        if (json.tv_1.nw_1) {
            tmp = true;
        } else {
            var tmp0 = _this__u8e3s4.mj();
            var tmp$ret$0;
            $l$block_0: {
                var tmp_0;
                if (isInterface(tmp0, Collection)) {
                    tmp_0 = tmp0.n();
                } else {
                    tmp_0 = false;
                }
                if (tmp_0) {
                    tmp$ret$0 = false;
                    break $l$block_0;
                }
                var _iterator__ex2g4s = tmp0.j();
                while (_iterator__ex2g4s.k()) {
                    var element = _iterator__ex2g4s.l();
                    if (element instanceof JsonIgnoreUnknownKeys) {
                        tmp$ret$0 = true;
                        break $l$block_0;
                    }
                }
                tmp$ret$0 = false;
            }
            tmp = tmp$ret$0;
        }
        return tmp;
    }
    function getJsonNameIndex(_this__u8e3s4, json, name) {
        _init_properties_JsonNamesMap_kt__cbbp0k();
        if (decodeCaseInsensitive(json, _this__u8e3s4)) {
            var tmp$ret$0 = name.toLowerCase();
            return getJsonNameIndexSlowPath(_this__u8e3s4, json, tmp$ret$0);
        }
        var strategy = namingStrategy(_this__u8e3s4, json);
        if (!(strategy == null)) return getJsonNameIndexSlowPath(_this__u8e3s4, json, name);
        var index = _this__u8e3s4.oj(name);
        if (!(index === -3)) return index;
        if (!json.tv_1.xw_1) return index;
        return getJsonNameIndexSlowPath(_this__u8e3s4, json, name);
    }
    function decodeCaseInsensitive(_this__u8e3s4, descriptor) {
        _init_properties_JsonNamesMap_kt__cbbp0k();
        return _this__u8e3s4.tv_1.zw_1 && equals(descriptor.ij(), ENUM_getInstance());
    }
    function getJsonNameIndexSlowPath(_this__u8e3s4, json, name) {
        _init_properties_JsonNamesMap_kt__cbbp0k();
        var tmp0_elvis_lhs = deserializationNamesMap(json, _this__u8e3s4).t1(name);
        return tmp0_elvis_lhs == null ? -3 : tmp0_elvis_lhs;
    }
    function namingStrategy(_this__u8e3s4, json) {
        _init_properties_JsonNamesMap_kt__cbbp0k();
        return equals(_this__u8e3s4.ij(), CLASS_getInstance()) ? json.tv_1.yw_1 : null;
    }
    function deserializationNamesMap(_this__u8e3s4, descriptor) {
        _init_properties_JsonNamesMap_kt__cbbp0k();
        var tmp = get_schemaCache(_this__u8e3s4);
        var tmp_0 = get_JsonDeserializationNamesKey();
        return tmp.zy(descriptor, tmp_0, deserializationNamesMap$lambda(descriptor, _this__u8e3s4));
    }
    function buildDeserializationNamesMap(_this__u8e3s4, json) {
        _init_properties_JsonNamesMap_kt__cbbp0k();
        var builder = LinkedHashMap_init_$Create$();
        var useLowercaseEnums = decodeCaseInsensitive(json, _this__u8e3s4);
        var strategyForClasses = namingStrategy(_this__u8e3s4, json);
        var inductionVariable = 0;
        var last = _this__u8e3s4.lj();
        if (inductionVariable < last) do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var tmp0 = _this__u8e3s4.pj(i);
            var destination = ArrayList_init_$Create$();
            var _iterator__ex2g4s = tmp0.j();
            while (_iterator__ex2g4s.k()) {
                var element = _iterator__ex2g4s.l();
                if (element instanceof JsonNames) {
                    destination.i(element);
                }
            }
            var tmp0_safe_receiver = singleOrNull(destination);
            var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.az_1;
            if (tmp1_safe_receiver == null) null; else {
                var inductionVariable_0 = 0;
                var last_0 = tmp1_safe_receiver.length;
                while (inductionVariable_0 < last_0) {
                    var element_0 = tmp1_safe_receiver[inductionVariable_0];
                    inductionVariable_0 = inductionVariable_0 + 1 | 0;
                    var tmp;
                    if (useLowercaseEnums) {
                        tmp = element_0.toLowerCase();
                    } else {
                        tmp = element_0;
                    }
                    buildDeserializationNamesMap$putOrThrow(builder, _this__u8e3s4, tmp, i);
                }
            }
            var tmp_0;
            if (useLowercaseEnums) {
                tmp_0 = _this__u8e3s4.nj(i).toLowerCase();
            } else if (!(strategyForClasses == null)) {
                tmp_0 = strategyForClasses.bz(_this__u8e3s4, i, _this__u8e3s4.nj(i));
            } else {
                tmp_0 = null;
            }
            var nameToPut = tmp_0;
            if (nameToPut == null) null; else {
                buildDeserializationNamesMap$putOrThrow(builder, _this__u8e3s4, nameToPut, i);
            }
        } while (inductionVariable < last);
        var tmp_1;
        if (builder.n()) {
            tmp_1 = emptyMap();
        } else {
            tmp_1 = builder;
        }
        return tmp_1;
    }
    function deserializationNamesMap$lambda($descriptor, $this_deserializationNamesMap) {
        return function() {
            return buildDeserializationNamesMap($descriptor, $this_deserializationNamesMap);
        };
    }
    function buildDeserializationNamesMap$putOrThrow(_this__u8e3s4, $this_buildDeserializationNamesMap, name, index) {
        var entity = equals($this_buildDeserializationNamesMap.ij(), ENUM_getInstance()) ? 'enum value' : 'property';
        if ((isInterface(_this__u8e3s4, KtMap) ? _this__u8e3s4 : THROW_CCE()).r1(name)) {
            throw decodingExceptionOf("The suggested name '" + name + "' for " + entity + ' ' + $this_buildDeserializationNamesMap.nj(index) + ' is already one of the names for ' + entity + ' ' + ($this_buildDeserializationNamesMap.nj(getValue(_this__u8e3s4, name)) + ' in ' + toString_1($this_buildDeserializationNamesMap)));
        }
        _this__u8e3s4.x1(name, index);
    }
    var properties_initialized_JsonNamesMap_kt_ljpf42;
    function _init_properties_JsonNamesMap_kt__cbbp0k() {
        if (!properties_initialized_JsonNamesMap_kt_ljpf42) {
            properties_initialized_JsonNamesMap_kt_ljpf42 = true;
            JsonDeserializationNamesKey = new Key_0;
            JsonSerializationNamesKey = new Key_0;
        }
    }
    function Tombstone() {}
    var Tombstone_instance;
    function Tombstone_getInstance() {
        return Tombstone_instance;
    }
    function RedactedKey() {}
    var RedactedKey_instance;
    function RedactedKey_getInstance() {
        return RedactedKey_instance;
    }
    function resize($this) {
        var newSize = imul($this.gz_1, 2);
        $this.ez_1 = copyOf_0($this.ez_1, newSize);
        var tmp = 0;
        var tmp_0 = new Int32Array(newSize);
        while (tmp < newSize) {
            tmp_0[tmp] = -1;
            tmp = tmp + 1 | 0;
        }
        var newIndices = tmp_0;
        var this_0 = $this.fz_1;
        var endIndex = this_0.length;
        var tmp_1 = this_0;
        arrayCopy(tmp_1, newIndices, 0, 0, endIndex);
        $this.fz_1 = newIndices;
    }
    function JsonPath(configuration) {
        this.cz_1 = configuration.ex_1;
        this.dz_1 = configuration.dx_1;
        var tmp = this;
        tmp.ez_1 = Array(8);
        var tmp_0 = this;
        var tmp_1 = 0;
        var tmp_2 = new Int32Array(8);
        while (tmp_1 < 8) {
            tmp_2[tmp_1] = -1;
            tmp_1 = tmp_1 + 1 | 0;
        }
        tmp_0.fz_1 = tmp_2;
        this.gz_1 = -1;
    }
    protoOf(JsonPath).hz = function(sd) {
        this.gz_1 = this.gz_1 + 1 | 0;
        var depth = this.gz_1;
        if (depth >= this.cz_1) {
            jsonTooNested(this.cz_1);
        }
        if (depth === this.ez_1.length) {
            resize(this);
        }
        this.ez_1[depth] = sd;
    };
    protoOf(JsonPath).iz = function(index) {
        this.fz_1[this.gz_1] = index;
    };
    protoOf(JsonPath).jz = function(key) {
        var tmp;
        if (!(this.fz_1[this.gz_1] === -2)) {
            this.gz_1 = this.gz_1 + 1 | 0;
            tmp = this.gz_1 === this.ez_1.length;
        } else {
            tmp = false;
        }
        if (tmp) {
            resize(this);
        }
        this.ez_1[this.gz_1] = this.dz_1 ? key : RedactedKey_instance;
        this.fz_1[this.gz_1] = -2;
    };
    protoOf(JsonPath).kz = function() {
        if (this.fz_1[this.gz_1] === -2) {
            this.ez_1[this.gz_1] = Tombstone_instance;
        }
    };
    protoOf(JsonPath).lz = function() {
        var depth = this.gz_1;
        if (this.fz_1[depth] === -2) {
            this.fz_1[depth] = -1;
            this.gz_1 = this.gz_1 - 1 | 0;
        }
        if (!(this.gz_1 === -1)) {
            this.gz_1 = this.gz_1 - 1 | 0;
        }
    };
    protoOf(JsonPath).mz = function() {
        var this_0 = StringBuilder_init_$Create$_0();
        this_0.y6('$');
        var times = this.gz_1 + 1 | 0;
        var inductionVariable = 0;
        if (inductionVariable < times) do {
            var index = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var element = this.ez_1[index];
            if (!(element == null) ? isInterface(element, SerialDescriptor) : false) {
                if (equals(element.ij(), LIST_getInstance())) {
                    if (!(this.fz_1[index] === -1)) {
                        this_0.y6('[');
                        this_0.ba(this.fz_1[index]);
                        this_0.y6(']');
                    }
                } else {
                    var idx = this.fz_1[index];
                    if (idx >= 0) {
                        this_0.y6('.');
                        this_0.y6(element.nj(idx));
                    }
                }
            } else {
                if (element === RedactedKey_instance) {
                    this_0.y6('[<debug info disabled>]');
                } else {
                    if (!(element === Tombstone_instance)) {
                        this_0.y6('[');
                        this_0.y6("'");
                        this_0.x6(element);
                        this_0.y6("'");
                        this_0.y6(']');
                    }
                }
            }
        } while (inductionVariable < times);
        return this_0.toString();
    };
    protoOf(JsonPath).toString = function() {
        return this.mz();
    };
    function classDiscriminator(_this__u8e3s4, json) {
        var _iterator__ex2g4s = _this__u8e3s4.mj().j();
        while (_iterator__ex2g4s.k()) {
            var annotation = _iterator__ex2g4s.l();
            if (annotation instanceof JsonClassDiscriminator) return annotation.nz_1;
        }
        return json.tv_1.vw_1;
    }
    function subtypeNotRegisteredMessageJson(subClassName, baseClass) {
        var scope = "in the polymorphic scope of '" + baseClass.v8() + "'";
        var tmp;
        if (subClassName == null) {
            tmp = to('Class discriminator was missing and no default serializers were registered ' + scope, null);
        } else {
            tmp = to("Serializer for subclass '" + subClassName + "' is not found " + scope, "Check if class with serial name '" + subClassName + "' exists and serializer is registered in a corresponding SerializersModule.\n" + ("To be registered automatically, class '" + subClassName + "' has to be '@Serializable', and the base class '" + baseClass.v8() + "' has to be sealed and '@Serializable'."));
        }
        return tmp;
    }
    function readObject($this) {
        var lastToken = $this.oz_1.tz(6);
        if ($this.oz_1.uz() === 4) {
            $this.oz_1.xy('Unexpected leading comma');
        }
        var result = LinkedHashMap_init_$Create$();
        $l$loop: while ($this.oz_1.vz()) {
            var key = $this.pz_1 ? $this.oz_1.xz() : $this.oz_1.wz();
            $this.oz_1.tz(5);
            var element = $this.yz();
            result.x1(key, element);
            lastToken = $this.oz_1.zz();
            var tmp0_subject = lastToken;
            if (tmp0_subject !== 4) if (tmp0_subject === 7) break $l$loop; else {
                $this.oz_1.xy('Expected end of the object or comma');
            }
        }
        if (lastToken === 6) {
            $this.oz_1.tz(7);
        } else if (lastToken === 4) {
            if (!$this.qz_1) {
                invalidTrailingComma($this.oz_1);
            }
            $this.oz_1.tz(7);
        }
        return new JsonObject(result);
    }
    function readObject_0($this, $receiver, $completion) {
        var tmp = new $readObjectCOROUTINE$($this, $receiver, $completion);
        tmp.m7_1 = Unit_instance;
        tmp.n7_1 = null;
        return tmp.s7();
    }
    function readArray($this) {
        var lastToken = $this.oz_1.zz();
        if ($this.oz_1.uz() === 4) {
            $this.oz_1.xy('Unexpected leading comma');
        }
        var result = ArrayList_init_$Create$();
        while ($this.oz_1.vz()) {
            var element = $this.yz();
            result.i(element);
            lastToken = $this.oz_1.zz();
            if (!(lastToken === 4)) {
                var tmp0 = $this.oz_1;
                var condition = lastToken === 9;
                var position = tmp0.hw_1;
                if (!condition) {
                    var tmp$ret$2 = 'Expected end of the array or comma';
                    tmp0.xy(tmp$ret$2, position);
                }
            }
        }
        if (lastToken === 8) {
            $this.oz_1.tz(9);
        } else if (lastToken === 4) {
            if (!$this.qz_1) {
                invalidTrailingComma($this.oz_1, 'array');
            }
            $this.oz_1.tz(9);
        }
        return new JsonArray(result);
    }
    function readValue($this, isString) {
        var tmp;
        if ($this.pz_1 || !isString) {
            tmp = $this.oz_1.xz();
        } else {
            tmp = $this.oz_1.wz();
        }
        var string = tmp;
        if (!isString && string === 'null') return JsonNull_getInstance();
        return new JsonLiteral(string, isString);
    }
    function readDeepRecursive($this) {
        return invoke(new DeepRecursiveFunction(JsonTreeReader$readDeepRecursive$slambda_0($this, null)), Unit_instance);
    }
    function JsonTreeReader$readDeepRecursive$slambda(this$0, resultContinuation) {
        this.w10_1 = this$0;
        CoroutineImpl.call(this, resultContinuation);
    }
    protoOf(JsonTreeReader$readDeepRecursive$slambda).b11 = function($this$DeepRecursiveFunction, it, $completion) {
        var tmp = this.c11($this$DeepRecursiveFunction, it, $completion);
        tmp.m7_1 = Unit_instance;
        tmp.n7_1 = null;
        return tmp.s7();
    };
    protoOf(JsonTreeReader$readDeepRecursive$slambda).y7 = function(p1, p2, $completion) {
        var tmp = p1 instanceof DeepRecursiveScope ? p1 : THROW_CCE();
        return this.b11(tmp, p2 instanceof Unit ? p2 : THROW_CCE(), $completion);
    };
    protoOf(JsonTreeReader$readDeepRecursive$slambda).s7 = function() {
        var suspendResult = this.m7_1;
        $sm: do {
            try {
                var tmp = this.k7_1;
                switch (tmp) {
                  case 0:
                    this.l7_1 = 3;
                    var tmp0_subject = this.w10_1.oz_1.uz();
                    if (tmp0_subject === 1) {
                        this.z10_1 = readValue(this.w10_1, true);
                        this.k7_1 = 2;
                        continue $sm;
                    } else {
                        if (tmp0_subject === 0) {
                            this.z10_1 = readValue(this.w10_1, false);
                            this.k7_1 = 2;
                            continue $sm;
                        } else {
                            if (tmp0_subject === 6) {
                                this.a11_1 = this.w10_1;
                                this.a11_1.sz_1 = this.a11_1.sz_1 + 1 | 0;
                                if (this.a11_1.sz_1 >= this.a11_1.rz_1) {
                                    jsonTooNested(this.a11_1.rz_1);
                                }
                                this.k7_1 = 1;
                                suspendResult = readObject_0(this.w10_1, this.x10_1, this);
                                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                                    return suspendResult;
                                }
                                continue $sm;
                            } else {
                                if (tmp0_subject === 8) {
                                    var tmp_0 = this;
                                    var this_0 = this.w10_1;
                                    this_0.sz_1 = this_0.sz_1 + 1 | 0;
                                    if (this_0.sz_1 >= this_0.rz_1) {
                                        jsonTooNested(this_0.rz_1);
                                    }
                                    var result = readArray(this.w10_1);
                                    this_0.sz_1 = this_0.sz_1 - 1 | 0;
                                    tmp_0.z10_1 = result;
                                    this.k7_1 = 2;
                                    continue $sm;
                                } else {
                                    var tmp_1 = this;
                                    this.w10_1.oz_1.xy("Can't begin reading element, unexpected token");
                                }
                            }
                        }
                    }
                    break;

                  case 1:
                    var result_0 = suspendResult;
                    this.a11_1.sz_1 = this.a11_1.sz_1 - 1 | 0;
                    this.z10_1 = result_0;
                    this.k7_1 = 2;
                    continue $sm;

                  case 2:
                    return this.z10_1;

                  case 3:
                    throw this.n7_1;
                }
            } catch ($p) {
                var e = $p;
                if (this.l7_1 === 3) {
                    throw e;
                } else {
                    this.k7_1 = this.l7_1;
                    this.n7_1 = e;
                }
            }
        } while (true);
    };
    protoOf(JsonTreeReader$readDeepRecursive$slambda).c11 = function($this$DeepRecursiveFunction, it, completion) {
        var i = new JsonTreeReader$readDeepRecursive$slambda(this.w10_1, completion);
        i.x10_1 = $this$DeepRecursiveFunction;
        i.y10_1 = it;
        return i;
    };
    function JsonTreeReader$readDeepRecursive$slambda_0(this$0, resultContinuation) {
        var i = new JsonTreeReader$readDeepRecursive$slambda(this$0, resultContinuation);
        return constructCallableReference((function($this$DeepRecursiveFunction, it, $completion) {
            return i.b11($this$DeepRecursiveFunction, it, $completion);
        }), 2);
    }
    function $readObjectCOROUTINE$(_this__u8e3s4, _this__u8e3s4_0, resultContinuation) {
        CoroutineImpl.call(this, resultContinuation);
        this.i10_1 = _this__u8e3s4;
        this.j10_1 = _this__u8e3s4_0;
    }
    protoOf($readObjectCOROUTINE$).s7 = function() {
        var suspendResult = this.m7_1;
        $sm: do {
            try {
                var tmp = this.k7_1;
                switch (tmp) {
                  case 0:
                    this.l7_1 = 5;
                    this.l10_1 = this.i10_1;
                    this.m10_1 = this.l10_1.oz_1.tz(6);
                    if (this.l10_1.oz_1.uz() === 4) {
                        this.l10_1.oz_1.xy('Unexpected leading comma');
                    }
                    var tmp_0 = this;
                    tmp_0.k10_1 = LinkedHashMap_init_$Create$();
                    this.k7_1 = 1;
                    continue $sm;

                  case 1:
                    if (!this.l10_1.oz_1.vz()) {
                        this.k7_1 = 4;
                        continue $sm;
                    }
                    this.n10_1 = this.l10_1.pz_1 ? this.l10_1.oz_1.xz() : this.l10_1.oz_1.wz();
                    this.l10_1.oz_1.tz(5);
                    this.k7_1 = 2;
                    suspendResult = this.j10_1.qg(Unit_instance, this);
                    if (suspendResult === get_COROUTINE_SUSPENDED()) {
                        return suspendResult;
                    }
                    continue $sm;

                  case 2:
                    var element = suspendResult;
                    var tmp0 = this.k10_1;
                    var key = this.n10_1;
                    tmp0.x1(key, element);
                    this.m10_1 = this.l10_1.oz_1.zz();
                    var tmp0_subject = this.m10_1;
                    if (tmp0_subject === 4) {
                        this.k7_1 = 3;
                        continue $sm;
                    } else {
                        if (tmp0_subject === 7) {
                            this.k7_1 = 4;
                            continue $sm;
                        } else {
                            this.l10_1.oz_1.xy('Expected end of the object or comma');
                        }
                    }
                    break;

                  case 3:
                    this.k7_1 = 1;
                    continue $sm;

                  case 4:
                    if (this.m10_1 === 6) {
                        this.l10_1.oz_1.tz(7);
                    } else if (this.m10_1 === 4) {
                        if (!this.l10_1.qz_1) {
                            invalidTrailingComma(this.l10_1.oz_1);
                        }
                        this.l10_1.oz_1.tz(7);
                    }
                    return new JsonObject(this.k10_1);

                  case 5:
                    throw this.n7_1;
                }
            } catch ($p) {
                var e = $p;
                if (this.l7_1 === 5) {
                    throw e;
                } else {
                    this.k7_1 = this.l7_1;
                    this.n7_1 = e;
                }
            }
        } while (true);
    };
    function JsonTreeReader(configuration, lexer) {
        this.oz_1 = lexer;
        this.pz_1 = configuration.ow_1;
        this.qz_1 = configuration.ax_1;
        this.rz_1 = configuration.ex_1;
        this.sz_1 = this.oz_1.iw_1.gz_1;
    }
    protoOf(JsonTreeReader).yz = function() {
        var token = this.oz_1.uz();
        var tmp;
        if (token === 1) {
            tmp = readValue(this, true);
        } else if (token === 0) {
            tmp = readValue(this, false);
        } else if (token === 6) {
            this.sz_1 = this.sz_1 + 1 | 0;
            if (this.sz_1 >= this.rz_1) {
                jsonTooNested(this.rz_1);
            }
            var result;
            if (this.sz_1 === 200) {
                this.sz_1 = this.sz_1 - 1 | 0;
                result = readDeepRecursive(this);
            } else {
                result = readObject(this);
                this.sz_1 = this.sz_1 - 1 | 0;
            }
            tmp = result;
        } else if (token === 8) {
            this.sz_1 = this.sz_1 + 1 | 0;
            if (this.sz_1 >= this.rz_1) {
                jsonTooNested(this.rz_1);
            }
            var result_0 = readArray(this);
            this.sz_1 = this.sz_1 - 1 | 0;
            tmp = result_0;
        } else {
            this.oz_1.xy('Cannot read Json element because of unexpected ' + tokenDescription(token));
        }
        return tmp;
    };
    function jsonTooNested(maxStackDepth) {
        throw decodingExceptionOf('Json input is too nested and may be impossible to parse without stack overflow.', 'Current nesting limit is ' + maxStackDepth + ". To adjust it, use 'maxNestingDepth' in 'Json {}' builder.");
    }
    var static_init_called_3;
    function static_init_3() {
        if (static_init_called_3) return Unit_instance;
        static_init_called_3 = true;
        LexerMode_OBJ_instance = new LexerMode('OBJ', 0, _Char___init__impl__6a9atx(123), _Char___init__impl__6a9atx(125));
        LexerMode_LIST_instance = new LexerMode('LIST', 1, _Char___init__impl__6a9atx(91), _Char___init__impl__6a9atx(93));
        LexerMode_MAP_instance = new LexerMode('MAP', 2, _Char___init__impl__6a9atx(123), _Char___init__impl__6a9atx(125));
        LexerMode_POLY_OBJ_instance = new LexerMode('POLY_OBJ', 3, _Char___init__impl__6a9atx(91), _Char___init__impl__6a9atx(93));
    }
    var LexerMode_OBJ_instance;
    var LexerMode_LIST_instance;
    var LexerMode_MAP_instance;
    var LexerMode_POLY_OBJ_instance;
    function LexerMode(name, ordinal, begin, end) {
        Enum.call(this, name, ordinal);
        this.f11_1 = begin;
        this.g11_1 = end;
    }
    function modeFor(_this__u8e3s4, desc) {
        var tmp0_subject = desc.ij();
        var tmp;
        if (tmp0_subject instanceof PolymorphicKind) {
            tmp = LexerMode_POLY_OBJ_getInstance();
        } else {
            if (equals(tmp0_subject, LIST_getInstance())) {
                tmp = LexerMode_LIST_getInstance();
            } else {
                if (equals(tmp0_subject, MAP_getInstance())) {
                    var keyDescriptor = carrierDescriptor(desc.qj(0), _this__u8e3s4.tl());
                    var keyKind = keyDescriptor.ij();
                    var tmp_0;
                    var tmp_1;
                    if (keyKind instanceof PrimitiveKind) {
                        tmp_1 = true;
                    } else {
                        tmp_1 = equals(keyKind, ENUM_getInstance());
                    }
                    if (tmp_1) {
                        tmp_0 = LexerMode_MAP_getInstance();
                    } else {
                        if (_this__u8e3s4.tv_1.pw_1) {
                            tmp_0 = LexerMode_LIST_getInstance();
                        } else {
                            throw InvalidKeyKindException(keyDescriptor);
                        }
                    }
                    tmp = tmp_0;
                } else {
                    tmp = LexerMode_OBJ_getInstance();
                }
            }
        }
        return tmp;
    }
    function carrierDescriptor(_this__u8e3s4, module_0) {
        var tmp;
        if (equals(_this__u8e3s4.ij(), CONTEXTUAL_getInstance())) {
            var tmp0_safe_receiver = getContextualDescriptor(module_0, _this__u8e3s4);
            var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : carrierDescriptor(tmp0_safe_receiver, module_0);
            tmp = tmp1_elvis_lhs == null ? _this__u8e3s4 : tmp1_elvis_lhs;
        } else if (_this__u8e3s4.kj()) {
            tmp = carrierDescriptor(_this__u8e3s4.qj(0), module_0);
        } else {
            tmp = _this__u8e3s4;
        }
        return tmp;
    }
    function LexerMode_OBJ_getInstance() {
        static_init_3();
        return LexerMode_OBJ_instance;
    }
    function LexerMode_LIST_getInstance() {
        static_init_3();
        return LexerMode_LIST_instance;
    }
    function LexerMode_MAP_getInstance() {
        static_init_3();
        return LexerMode_MAP_instance;
    }
    function LexerMode_POLY_OBJ_getInstance() {
        static_init_3();
        return LexerMode_POLY_OBJ_instance;
    }
    function Key_0() {}
    function DescriptorSchemaCache() {
        this.yy_1 = createMapForCache(16);
    }
    protoOf(DescriptorSchemaCache).h11 = function(descriptor, key, value) {
        var this_0 = this.yy_1;
        var value_0 = this_0.t1(descriptor);
        var tmp;
        if (value_0 == null) {
            var answer = createMapForCache(2);
            this_0.x1(descriptor, answer);
            tmp = answer;
        } else {
            tmp = value_0;
        }
        var tmp0 = tmp;
        var tmp2 = key instanceof Key_0 ? key : THROW_CCE();
        var value_1 = !(value == null) ? value : THROW_CCE();
        tmp0.x1(tmp2, value_1);
    };
    protoOf(DescriptorSchemaCache).zy = function(descriptor, key, defaultValue) {
        var tmp0_safe_receiver = this.i11(descriptor, key);
        if (tmp0_safe_receiver == null) null; else {
            return tmp0_safe_receiver;
        }
        var value = defaultValue();
        this.h11(descriptor, key, value);
        return value;
    };
    protoOf(DescriptorSchemaCache).i11 = function(descriptor, key) {
        var tmp0_safe_receiver = this.yy_1.t1(descriptor);
        var tmp;
        if (tmp0_safe_receiver == null) {
            tmp = null;
        } else {
            tmp = tmp0_safe_receiver.t1(key instanceof Key_0 ? key : THROW_CCE());
        }
        var tmp_0 = tmp;
        return !(tmp_0 == null) ? tmp_0 : null;
    };
    function DiscriminatorHolder(discriminatorToSkip) {
        this.j11_1 = discriminatorToSkip;
    }
    function trySkip($this, $receiver, unknownKey) {
        if ($receiver == null) return false;
        if ($receiver.j11_1 === unknownKey) {
            $receiver.j11_1 = null;
            return true;
        }
        return false;
    }
    function skipLeftoverElements($this, descriptor) {
        while (!($this.vl(descriptor) === -1)) {}
    }
    function checkLeadingComma($this) {
        if ($this.aw_1.uz() === 4) {
            $this.aw_1.xy('Unexpected leading comma');
        }
    }
    function decodeMapIndex($this) {
        var hasComma = false;
        var decodingKey = !(($this.cw_1 % 2 | 0) === 0);
        if (decodingKey) {
            if (!($this.cw_1 === -1)) {
                hasComma = $this.aw_1.l11();
            }
        } else {
            $this.aw_1.k11(_Char___init__impl__6a9atx(58));
        }
        var tmp;
        if ($this.aw_1.vz()) {
            if (decodingKey) {
                if ($this.cw_1 === -1) {
                    var tmp0 = $this.aw_1;
                    var condition = !hasComma;
                    var position = tmp0.hw_1;
                    if (!condition) {
                        var tmp$ret$1 = 'Unexpected leading comma';
                        tmp0.xy(tmp$ret$1, position);
                    }
                } else {
                    var tmp0_0 = $this.aw_1;
                    var condition_0 = hasComma;
                    var position_0 = tmp0_0.hw_1;
                    if (!condition_0) {
                        var tmp$ret$3 = 'Expected comma after the key-value pair';
                        tmp0_0.xy(tmp$ret$3, position_0);
                    }
                }
            }
            $this.cw_1 = $this.cw_1 + 1 | 0;
            tmp = $this.cw_1;
        } else {
            if (hasComma && !$this.yv_1.tv_1.ax_1) {
                invalidTrailingComma($this.aw_1);
            }
            tmp = -1;
        }
        return tmp;
    }
    function coerceInputValue($this, descriptor, index) {
        var tmp0 = $this.yv_1;
        var tmp$ret$0;
        $l$block_2: {
            var isOptional = descriptor.rj(index);
            var elementDescriptor = descriptor.qj(index);
            var tmp;
            if (isOptional && !elementDescriptor.jj()) {
                tmp = $this.aw_1.m11(true);
            } else {
                tmp = false;
            }
            if (tmp) {
                tmp$ret$0 = true;
                break $l$block_2;
            }
            if (equals(elementDescriptor.ij(), ENUM_getInstance())) {
                var tmp_0;
                if (elementDescriptor.jj()) {
                    tmp_0 = $this.aw_1.m11(false);
                } else {
                    tmp_0 = false;
                }
                if (tmp_0) {
                    tmp$ret$0 = false;
                    break $l$block_2;
                }
                var tmp0_elvis_lhs = $this.aw_1.n11($this.ew_1.ow_1);
                var tmp_1;
                if (tmp0_elvis_lhs == null) {
                    tmp$ret$0 = false;
                    break $l$block_2;
                } else {
                    tmp_1 = tmp0_elvis_lhs;
                }
                var enumValue = tmp_1;
                var enumIndex = getJsonNameIndex(elementDescriptor, tmp0, enumValue);
                var coerceToNull = !tmp0.tv_1.rw_1 && elementDescriptor.jj();
                if (enumIndex === -3 && (isOptional || coerceToNull)) {
                    $this.aw_1.wz();
                    tmp$ret$0 = true;
                    break $l$block_2;
                }
            }
            tmp$ret$0 = false;
        }
        return tmp$ret$0;
    }
    function decodeObjectIndex($this, descriptor) {
        var hasComma = $this.aw_1.l11();
        while ($this.aw_1.vz()) {
            hasComma = false;
            var key = decodeStringKey($this);
            $this.aw_1.k11(_Char___init__impl__6a9atx(58));
            var index = getJsonNameIndex(descriptor, $this.yv_1, key);
            var tmp;
            if (!(index === -3)) {
                var tmp_0;
                if ($this.ew_1.tw_1 && coerceInputValue($this, descriptor, index)) {
                    hasComma = $this.aw_1.l11();
                    tmp_0 = false;
                } else {
                    var tmp0_safe_receiver = $this.fw_1;
                    if (tmp0_safe_receiver == null) null; else {
                        tmp0_safe_receiver.uy(index);
                    }
                    return index;
                }
                tmp = tmp_0;
            } else {
                tmp = true;
            }
            var isUnknown = tmp;
            if (isUnknown) {
                hasComma = handleUnknown($this, descriptor, key);
            }
        }
        if (hasComma && !$this.yv_1.tv_1.ax_1) {
            invalidTrailingComma($this.aw_1);
        }
        var tmp1_safe_receiver = $this.fw_1;
        var tmp2_elvis_lhs = tmp1_safe_receiver == null ? null : tmp1_safe_receiver.vy();
        return tmp2_elvis_lhs == null ? -1 : tmp2_elvis_lhs;
    }
    function handleUnknown($this, descriptor, key) {
        if (ignoreUnknownKeys(descriptor, $this.yv_1) || trySkip($this, $this.dw_1, key)) {
            $this.aw_1.p11($this.ew_1.ow_1);
        } else {
            $this.aw_1.iw_1.lz();
            $this.aw_1.o11(key);
        }
        return $this.aw_1.l11();
    }
    function decodeListIndex($this) {
        var hasComma = $this.aw_1.l11();
        var tmp;
        if ($this.aw_1.vz()) {
            if (!($this.cw_1 === -1) && !hasComma) {
                $this.aw_1.xy('Expected end of the array or comma');
            }
            $this.cw_1 = $this.cw_1 + 1 | 0;
            tmp = $this.cw_1;
        } else {
            if (hasComma && !$this.yv_1.tv_1.ax_1) {
                invalidTrailingComma($this.aw_1, 'array');
            }
            tmp = -1;
        }
        return tmp;
    }
    function decodeStringKey($this) {
        var tmp;
        if ($this.ew_1.ow_1) {
            tmp = $this.aw_1.r11();
        } else {
            tmp = $this.aw_1.q11();
        }
        return tmp;
    }
    function StreamingJsonDecoder(json, mode, lexer, descriptor, discriminatorHolder) {
        AbstractDecoder.call(this);
        this.yv_1 = json;
        this.zv_1 = mode;
        this.aw_1 = lexer;
        this.bw_1 = this.yv_1.tl();
        this.cw_1 = -1;
        this.dw_1 = discriminatorHolder;
        this.ew_1 = this.yv_1.tv_1;
        this.fw_1 = this.ew_1.rw_1 ? null : new JsonElementMarker(descriptor);
    }
    protoOf(StreamingJsonDecoder).fx = function() {
        return this.yv_1;
    };
    protoOf(StreamingJsonDecoder).tl = function() {
        return this.bw_1;
    };
    protoOf(StreamingJsonDecoder).gx = function() {
        return new JsonTreeReader(this.yv_1.tv_1, this.aw_1).yz();
    };
    protoOf(StreamingJsonDecoder).fl = function(deserializer) {
        var tmp2_withExceptionHandling_this = this.aw_1.iw_1;
        var tmp3_withExceptionHandling_this = this.aw_1;
        var tmp;
        try {
            var tmp_0;
            if (!(deserializer instanceof AbstractPolymorphicSerializer)) {
                tmp_0 = true;
            } else {
                tmp_0 = this.yv_1.tv_1.uw_1;
            }
            if (tmp_0) {
                return deserializer.aj(this);
            }
            var discriminator = classDiscriminator(deserializer.zi(), this.yv_1);
            var tmp0_elvis_lhs = this.aw_1.s11(discriminator, this.ew_1.ow_1);
            var tmp_1;
            if (tmp0_elvis_lhs == null) {
                var tmp2 = isInterface(deserializer, DeserializationStrategy) ? deserializer : THROW_CCE();
                var tmp$ret$2;
                $l$block: {
                    var tmp_2;
                    if (!(tmp2 instanceof AbstractPolymorphicSerializer)) {
                        tmp_2 = true;
                    } else {
                        tmp_2 = this.fx().tv_1.uw_1;
                    }
                    if (tmp_2) {
                        tmp$ret$2 = tmp2.aj(this);
                        break $l$block;
                    }
                    var discriminator_0 = classDiscriminator(tmp2.zi(), this.fx());
                    var tmp2_0 = this.gx();
                    var serialName = tmp2.zi().hj();
                    if (!(tmp2_0 instanceof JsonObject)) {
                        var tmp2_1 = 'Expected ' + getKClass(JsonObject).v8() + ', but had ' + getKClassFromExpression(tmp2_0).v8() + ' as the serialized body of ' + serialName;
                        var path = this.aw_1.iw_1.mz();
                        var tmp_3;
                        if (this.fx().tv_1.dx_1) {
                            var tmp$ret$8 = toString_1(tmp2_0);
                            tmp_3 = toString_1(minify(tmp$ret$8));
                        } else {
                            tmp_3 = null;
                        }
                        var inputValue = tmp_3;
                        throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, tmp2_1, path, null, inputValue), tmp2_1, -1, path, inputValue, null);
                    }
                    var jsonTree = tmp2_0;
                    var tmp0_safe_receiver = jsonTree.jx(discriminator_0);
                    var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : get_jsonPrimitive(tmp0_safe_receiver);
                    var type = tmp1_safe_receiver == null ? null : get_contentOrNull(tmp1_safe_receiver);
                    var tmp_4 = tmp2.yl(this, type);
                    var actualSerializer = (!(tmp_4 == null) ? isInterface(tmp_4, DeserializationStrategy) : false) ? tmp_4 : null;
                    if (actualSerializer == null) {
                        var _destruct__k2r9zo = subtypeNotRegisteredMessageJson(type, tmp2.xl());
                        var message = _destruct__k2r9zo.sb();
                        var hint = _destruct__k2r9zo.tb();
                        var path_0 = this.aw_1.iw_1.mz();
                        var tmp_5;
                        if (this.fx().tv_1.dx_1) {
                            var tmp$ret$13 = jsonTree.toString();
                            tmp_5 = toString_1(minify(tmp$ret$13));
                        } else {
                            tmp_5 = null;
                        }
                        var inputValue_0 = tmp_5;
                        throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, message, path_0, hint, inputValue_0), message, -1, path_0, inputValue_0, hint);
                    }
                    tmp$ret$2 = readPolymorphicJson(this.fx(), discriminator_0, jsonTree, actualSerializer);
                }
                return tmp$ret$2;
            } else {
                tmp_1 = tmp0_elvis_lhs;
            }
            var type_0 = tmp_1;
            var tmp_6 = deserializer.yl(this, type_0);
            var actualSerializer_0 = (!(tmp_6 == null) ? isInterface(tmp_6, DeserializationStrategy) : false) ? tmp_6 : null;
            if (actualSerializer_0 == null) {
                var _destruct__k2r9zo_0 = subtypeNotRegisteredMessageJson(type_0, deserializer.xl());
                var message_0 = _destruct__k2r9zo_0.sb();
                var hint_0 = _destruct__k2r9zo_0.tb();
                this.aw_1.xy(message_0, VOID, hint_0);
            }
            this.dw_1 = new DiscriminatorHolder(discriminator);
            tmp = actualSerializer_0.aj(this);
        } catch ($p) {
            var tmp_7;
            if ($p instanceof MissingFieldException) {
                var e = $p;
                if (contains_1(ensureNotNull(e.message), 'at path')) throw e;
                var tmp_8 = plus_1(e.message, ' at path: ');
                var tmp$ret$14 = tmp2_withExceptionHandling_this.mz();
                throw missingFieldExceptionWithNewMessage(e, tmp_8 + tmp$ret$14);
            } else {
                if ($p instanceof SerializationException) {
                    var e_0 = $p;
                    throw e_0;
                } else {
                    if ($p instanceof Exception) {
                        var e_1 = $p;
                        var path_1 = tmp2_withExceptionHandling_this.mz();
                        var causeMessage = e_1.message;
                        var shortMessage = 'Deserialization failed because of ' + (causeMessage == null ? 'an exception' : "'" + causeMessage + "' exception") + ' in the decoder';
                        var tmp_9;
                        if (this.fx().tv_1.dx_1) {
                            var tmp$ret$19 = tmp3_withExceptionHandling_this.t11();
                            tmp_9 = toString_1(minify(tmp$ret$19));
                        } else {
                            tmp_9 = null;
                        }
                        var inputValue_1 = tmp_9;
                        throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, shortMessage, path_1, null, inputValue_1), shortMessage, -1, path_1, inputValue_1, null, e_1);
                    } else {
                        throw $p;
                    }
                }
            }
        }
        return tmp;
    };
    protoOf(StreamingJsonDecoder).gl = function(descriptor) {
        var newMode = modeFor(this.yv_1, descriptor);
        this.aw_1.iw_1.hz(descriptor);
        this.aw_1.k11(newMode.f11_1);
        checkLeadingComma(this);
        var tmp;
        switch (newMode.b2_1) {
          case 1:
          case 2:
          case 3:
            tmp = new StreamingJsonDecoder(this.yv_1, newMode, this.aw_1, descriptor, this.dw_1);
            break;

          default:
            var tmp_0;
            if (this.zv_1.equals(newMode) && this.yv_1.tv_1.rw_1) {
                tmp_0 = this;
            } else {
                tmp_0 = new StreamingJsonDecoder(this.yv_1, newMode, this.aw_1, descriptor, this.dw_1);
            }
            tmp = tmp_0;
            break;
        }
        return tmp;
    };
    protoOf(StreamingJsonDecoder).hl = function(descriptor) {
        if (descriptor.lj() === 0 && ignoreUnknownKeys(descriptor, this.yv_1)) {
            skipLeftoverElements(this, descriptor);
        }
        if (this.aw_1.l11() && !this.yv_1.tv_1.ax_1) {
            invalidTrailingComma(this.aw_1, '');
        }
        this.aw_1.k11(this.zv_1.g11_1);
        this.aw_1.iw_1.lz();
    };
    protoOf(StreamingJsonDecoder).sk = function() {
        var tmp;
        var tmp0_safe_receiver = this.fw_1;
        var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.ty_1;
        if (!(tmp1_elvis_lhs == null ? false : tmp1_elvis_lhs)) {
            tmp = !this.aw_1.u11();
        } else {
            tmp = false;
        }
        return tmp;
    };
    protoOf(StreamingJsonDecoder).tk = function() {
        return null;
    };
    protoOf(StreamingJsonDecoder).rl = function(descriptor, index, deserializer, previousValue) {
        var isMapKey = this.zv_1.equals(LexerMode_MAP_getInstance()) && (index & 1) === 0;
        if (isMapKey) {
            this.aw_1.iw_1.kz();
        }
        var value = protoOf(AbstractDecoder).rl.call(this, descriptor, index, deserializer, previousValue);
        if (isMapKey) {
            this.aw_1.iw_1.jz(value);
        }
        return value;
    };
    protoOf(StreamingJsonDecoder).vl = function(descriptor) {
        var index;
        switch (this.zv_1.b2_1) {
          case 0:
            index = decodeObjectIndex(this, descriptor);
            break;

          case 2:
            index = decodeMapIndex(this);
            break;

          default:
            index = decodeListIndex(this);
            break;
        }
        if (!this.zv_1.equals(LexerMode_MAP_getInstance())) {
            this.aw_1.iw_1.iz(index);
        }
        return index;
    };
    protoOf(StreamingJsonDecoder).uk = function() {
        return this.aw_1.v11();
    };
    protoOf(StreamingJsonDecoder).vk = function() {
        var value = this.aw_1.w11();
        if (!equalsLong(value, fromInt(convertToByte(value)))) {
            this.aw_1.xy("Failed to parse byte for input '" + value.toString() + "'");
        }
        return convertToByte(value);
    };
    protoOf(StreamingJsonDecoder).wk = function() {
        var value = this.aw_1.w11();
        if (!equalsLong(value, fromInt(convertToShort(value)))) {
            this.aw_1.xy("Failed to parse short for input '" + value.toString() + "'");
        }
        return convertToShort(value);
    };
    protoOf(StreamingJsonDecoder).xk = function() {
        var value = this.aw_1.w11();
        if (!equalsLong(value, fromInt(convertToInt(value)))) {
            this.aw_1.xy("Failed to parse int for input '" + value.toString() + "'");
        }
        return convertToInt(value);
    };
    protoOf(StreamingJsonDecoder).yk = function() {
        return this.aw_1.w11();
    };
    protoOf(StreamingJsonDecoder).zk = function() {
        var tmp0 = this.aw_1;
        var tmp$ret$0;
        $l$block: {
            var input = tmp0.xz();
            try {
                tmp$ret$0 = toDouble(input);
                break $l$block;
            } catch ($p) {
                if ($p instanceof IllegalArgumentException) {
                    var e = $p;
                    tmp0.xy("Failed to parse type '" + 'float' + "' for input '" + input + "'");
                } else {
                    throw $p;
                }
            }
        }
        var result = tmp$ret$0;
        var specialFp = this.yv_1.tv_1.ww_1;
        if (specialFp || isFinite_0(result)) return result;
        throwInvalidFloatingPointDecoded(this.aw_1, result);
    };
    protoOf(StreamingJsonDecoder).al = function() {
        var tmp0 = this.aw_1;
        var tmp$ret$0;
        $l$block: {
            var input = tmp0.xz();
            try {
                tmp$ret$0 = toDouble(input);
                break $l$block;
            } catch ($p) {
                if ($p instanceof IllegalArgumentException) {
                    var e = $p;
                    tmp0.xy("Failed to parse type '" + 'double' + "' for input '" + input + "'");
                } else {
                    throw $p;
                }
            }
        }
        var result = tmp$ret$0;
        var specialFp = this.yv_1.tv_1.ww_1;
        if (specialFp || isFinite(result)) return result;
        throwInvalidFloatingPointDecoded(this.aw_1, result);
    };
    protoOf(StreamingJsonDecoder).bl = function() {
        var string = this.aw_1.xz();
        if (!(string.length === 1)) {
            this.aw_1.xy("Expected single char, but got '" + string + "'");
        }
        return charCodeAt(string, 0);
    };
    protoOf(StreamingJsonDecoder).cl = function() {
        var tmp;
        if (this.ew_1.ow_1) {
            tmp = this.aw_1.r11();
        } else {
            tmp = this.aw_1.wz();
        }
        return tmp;
    };
    protoOf(StreamingJsonDecoder).dl = function(descriptor) {
        return get_isUnsignedNumber(descriptor) ? new JsonDecoderForUnsignedTypes(this.aw_1, this.yv_1) : protoOf(AbstractDecoder).dl.call(this, descriptor);
    };
    function JsonDecoderForUnsignedTypes(lexer, json) {
        AbstractDecoder.call(this);
        this.x11_1 = lexer;
        this.y11_1 = json.tl();
    }
    protoOf(JsonDecoderForUnsignedTypes).tl = function() {
        return this.y11_1;
    };
    protoOf(JsonDecoderForUnsignedTypes).vl = function(descriptor) {
        var message = 'unsupported';
        throw IllegalStateException_init_$Create$_0(toString_1(message));
    };
    protoOf(JsonDecoderForUnsignedTypes).xk = function() {
        var tmp0 = this.x11_1;
        var tmp$ret$0;
        $l$block: {
            var input = tmp0.xz();
            try {
                var this_0 = toUInt(input);
                tmp$ret$0 = _UInt___get_data__impl__f0vqqw(this_0);
                break $l$block;
            } catch ($p) {
                if ($p instanceof IllegalArgumentException) {
                    var e = $p;
                    tmp0.xy("Failed to parse type '" + 'UInt' + "' for input '" + input + "'");
                } else {
                    throw $p;
                }
            }
        }
        return tmp$ret$0;
    };
    protoOf(JsonDecoderForUnsignedTypes).yk = function() {
        var tmp0 = this.x11_1;
        var tmp$ret$0;
        $l$block: {
            var input = tmp0.xz();
            try {
                var this_0 = toULong(input);
                tmp$ret$0 = _ULong___get_data__impl__fggpzb(this_0);
                break $l$block;
            } catch ($p) {
                if ($p instanceof IllegalArgumentException) {
                    var e = $p;
                    tmp0.xy("Failed to parse type '" + 'ULong' + "' for input '" + input + "'");
                } else {
                    throw $p;
                }
            }
        }
        return tmp$ret$0;
    };
    protoOf(JsonDecoderForUnsignedTypes).vk = function() {
        var tmp0 = this.x11_1;
        var tmp$ret$0;
        $l$block: {
            var input = tmp0.xz();
            try {
                var this_0 = toUByte(input);
                tmp$ret$0 = _UByte___get_data__impl__jof9qr(this_0);
                break $l$block;
            } catch ($p) {
                if ($p instanceof IllegalArgumentException) {
                    var e = $p;
                    tmp0.xy("Failed to parse type '" + 'UByte' + "' for input '" + input + "'");
                } else {
                    throw $p;
                }
            }
        }
        return tmp$ret$0;
    };
    protoOf(JsonDecoderForUnsignedTypes).wk = function() {
        var tmp0 = this.x11_1;
        var tmp$ret$0;
        $l$block: {
            var input = tmp0.xz();
            try {
                var this_0 = toUShort(input);
                tmp$ret$0 = _UShort___get_data__impl__g0245(this_0);
                break $l$block;
            } catch ($p) {
                if ($p instanceof IllegalArgumentException) {
                    var e = $p;
                    tmp0.xy("Failed to parse type '" + 'UShort' + "' for input '" + input + "'");
                } else {
                    throw $p;
                }
            }
        }
        return tmp$ret$0;
    };
    function get_unsignedNumberDescriptors() {
        _init_properties_StreamingJsonEncoder_kt__pn1bsi();
        return unsignedNumberDescriptors;
    }
    var unsignedNumberDescriptors;
    function get_isUnsignedNumber(_this__u8e3s4) {
        _init_properties_StreamingJsonEncoder_kt__pn1bsi();
        return _this__u8e3s4.kj() && get_unsignedNumberDescriptors().m1(_this__u8e3s4);
    }
    var properties_initialized_StreamingJsonEncoder_kt_6ifwwk;
    function _init_properties_StreamingJsonEncoder_kt__pn1bsi() {
        if (!properties_initialized_StreamingJsonEncoder_kt_6ifwwk) {
            properties_initialized_StreamingJsonEncoder_kt_6ifwwk = true;
            unsignedNumberDescriptors = setOf_0([ serializer_0(Companion_getInstance_17()).zi(), serializer_1(Companion_getInstance_18()).zi(), serializer_2(Companion_getInstance_16()).zi(), serializer_3(Companion_getInstance_19()).zi() ]);
        }
    }
    function get_ESCAPE_STRINGS() {
        _init_properties_StringOps_kt__fcy1db();
        return ESCAPE_STRINGS;
    }
    var ESCAPE_STRINGS;
    var ESCAPE_MARKERS;
    function toHexChar(i) {
        _init_properties_StringOps_kt__fcy1db();
        var d = i & 15;
        var tmp;
        if (d < 10) {
            var this_0 = _Char___init__impl__6a9atx(48);
            var tmp$ret$0 = Char__toInt_impl_vasixd(this_0);
            tmp = numberToChar(d + tmp$ret$0 | 0);
        } else {
            var tmp_0 = d - 10 | 0;
            var this_1 = _Char___init__impl__6a9atx(97);
            var tmp$ret$1 = Char__toInt_impl_vasixd(this_1);
            tmp = numberToChar(tmp_0 + tmp$ret$1 | 0);
        }
        return tmp;
    }
    function printQuoted(_this__u8e3s4, value) {
        _init_properties_StringOps_kt__fcy1db();
        _this__u8e3s4.z6(_Char___init__impl__6a9atx(34));
        var lastPos = 0;
        var inductionVariable = 0;
        var last = charSequenceLength(value) - 1 | 0;
        if (inductionVariable <= last) do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var this_0 = charCodeAt(value, i);
            var c = Char__toInt_impl_vasixd(this_0);
            if (c < get_ESCAPE_STRINGS().length && !(get_ESCAPE_STRINGS()[c] == null)) {
                _this__u8e3s4.z9(value, lastPos, i);
                _this__u8e3s4.y6(get_ESCAPE_STRINGS()[c]);
                lastPos = i + 1 | 0;
            }
        } while (inductionVariable <= last);
        if (!(lastPos === 0)) _this__u8e3s4.z9(value, lastPos, value.length); else _this__u8e3s4.y6(value);
        _this__u8e3s4.z6(_Char___init__impl__6a9atx(34));
    }
    function toBooleanStrictOrNull(_this__u8e3s4) {
        _init_properties_StringOps_kt__fcy1db();
        return equals_0(_this__u8e3s4, 'true', true) ? true : equals_0(_this__u8e3s4, 'false', true) ? false : null;
    }
    var properties_initialized_StringOps_kt_wzaea7;
    function _init_properties_StringOps_kt__fcy1db() {
        if (!properties_initialized_StringOps_kt_wzaea7) {
            properties_initialized_StringOps_kt_wzaea7 = true;
            var this_0 = Array(93);
            var inductionVariable = 0;
            if (inductionVariable <= 31) do {
                var c = inductionVariable;
                inductionVariable = inductionVariable + 1 | 0;
                var c1 = toHexChar(c >> 12);
                var c2 = toHexChar(c >> 8);
                var c3 = toHexChar(c >> 4);
                var c4 = toHexChar(c);
                this_0[c] = '\\u' + toString(c1) + toString(c2) + toString(c3) + toString(c4);
            } while (inductionVariable <= 31);
            var this_1 = _Char___init__impl__6a9atx(34);
            this_0[Char__toInt_impl_vasixd(this_1)] = '\\"';
            var this_2 = _Char___init__impl__6a9atx(92);
            this_0[Char__toInt_impl_vasixd(this_2)] = '\\\\';
            var this_3 = _Char___init__impl__6a9atx(9);
            this_0[Char__toInt_impl_vasixd(this_3)] = '\\t';
            var this_4 = _Char___init__impl__6a9atx(8);
            this_0[Char__toInt_impl_vasixd(this_4)] = '\\b';
            var this_5 = _Char___init__impl__6a9atx(10);
            this_0[Char__toInt_impl_vasixd(this_5)] = '\\n';
            var this_6 = _Char___init__impl__6a9atx(13);
            this_0[Char__toInt_impl_vasixd(this_6)] = '\\r';
            this_0[12] = '\\f';
            ESCAPE_STRINGS = this_0;
            var this_7 = new Int8Array(128);
            var inductionVariable_0 = 0;
            if (inductionVariable_0 <= 31) do {
                var c_0 = inductionVariable_0;
                inductionVariable_0 = inductionVariable_0 + 1 | 0;
                this_7[c_0] = 1;
            } while (inductionVariable_0 <= 31);
            var this_8 = _Char___init__impl__6a9atx(34);
            var tmp = Char__toInt_impl_vasixd(this_8);
            var this_9 = _Char___init__impl__6a9atx(34);
            var tmp$ret$3 = Char__toInt_impl_vasixd(this_9);
            this_7[tmp] = toByte(tmp$ret$3);
            var this_10 = _Char___init__impl__6a9atx(92);
            var tmp_0 = Char__toInt_impl_vasixd(this_10);
            var this_11 = _Char___init__impl__6a9atx(92);
            var tmp$ret$5 = Char__toInt_impl_vasixd(this_11);
            this_7[tmp_0] = toByte(tmp$ret$5);
            var this_12 = _Char___init__impl__6a9atx(9);
            var tmp_1 = Char__toInt_impl_vasixd(this_12);
            var this_13 = _Char___init__impl__6a9atx(116);
            var tmp$ret$7 = Char__toInt_impl_vasixd(this_13);
            this_7[tmp_1] = toByte(tmp$ret$7);
            var this_14 = _Char___init__impl__6a9atx(8);
            var tmp_2 = Char__toInt_impl_vasixd(this_14);
            var this_15 = _Char___init__impl__6a9atx(98);
            var tmp$ret$9 = Char__toInt_impl_vasixd(this_15);
            this_7[tmp_2] = toByte(tmp$ret$9);
            var this_16 = _Char___init__impl__6a9atx(10);
            var tmp_3 = Char__toInt_impl_vasixd(this_16);
            var this_17 = _Char___init__impl__6a9atx(110);
            var tmp$ret$11 = Char__toInt_impl_vasixd(this_17);
            this_7[tmp_3] = toByte(tmp$ret$11);
            var this_18 = _Char___init__impl__6a9atx(13);
            var tmp_4 = Char__toInt_impl_vasixd(this_18);
            var this_19 = _Char___init__impl__6a9atx(114);
            var tmp$ret$13 = Char__toInt_impl_vasixd(this_19);
            this_7[tmp_4] = toByte(tmp$ret$13);
            var this_20 = _Char___init__impl__6a9atx(102);
            var tmp$ret$14 = Char__toInt_impl_vasixd(this_20);
            this_7[12] = toByte(tmp$ret$14);
            ESCAPE_MARKERS = this_7;
        }
    }
    function readPolymorphicJson(_this__u8e3s4, discriminator, element, deserializer) {
        var descriptor = deserializer.zi();
        return new JsonTreeDecoder(_this__u8e3s4, element, descriptor, discriminator, descriptor).fl(deserializer);
    }
    function unparsedPrimitive($this, literal, primitive, tag) {
        var type = startsWith(primitive, 'i') ? 'an ' + primitive : 'a ' + primitive;
        var tmp2 = "Failed to parse literal '" + literal.toString() + "' as " + type + ' value';
        var path = $this.f12(tag);
        var tmp;
        if ($this.fx().tv_1.dx_1) {
            var tmp$ret$3 = toString_1($this.g12());
            tmp = toString_1(minify(tmp$ret$3));
        } else {
            tmp = null;
        }
        var inputValue = tmp;
        throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, tmp2, path, null, inputValue), tmp2, -1, path, inputValue, null);
    }
    function AbstractJsonTreeDecoder(json, value, polymorphicDiscriminator) {
        polymorphicDiscriminator = polymorphicDiscriminator === VOID ? null : polymorphicDiscriminator;
        NamedValueDecoder.call(this);
        this.b12_1 = json;
        this.c12_1 = value;
        this.d12_1 = polymorphicDiscriminator;
        this.e12_1 = this.fx().tv_1;
    }
    protoOf(AbstractJsonTreeDecoder).fx = function() {
        return this.b12_1;
    };
    protoOf(AbstractJsonTreeDecoder).q1 = function() {
        return this.c12_1;
    };
    protoOf(AbstractJsonTreeDecoder).tl = function() {
        return this.fx().tl();
    };
    protoOf(AbstractJsonTreeDecoder).g12 = function() {
        var tmp0_safe_receiver = this.mu();
        var tmp;
        if (tmp0_safe_receiver == null) {
            tmp = null;
        } else {
            tmp = this.h12(tmp0_safe_receiver);
        }
        var tmp1_elvis_lhs = tmp;
        return tmp1_elvis_lhs == null ? this.q1() : tmp1_elvis_lhs;
    };
    protoOf(AbstractJsonTreeDecoder).f12 = function(currentTag) {
        return this.ou() + ('.' + currentTag);
    };
    protoOf(AbstractJsonTreeDecoder).gx = function() {
        return this.g12();
    };
    protoOf(AbstractJsonTreeDecoder).fl = function(deserializer) {
        var tmp2_withExceptionHandling_this = this.g12();
        var tmp;
        try {
            var tmp$ret$2;
            $l$block: {
                var tmp_0;
                if (!(deserializer instanceof AbstractPolymorphicSerializer)) {
                    tmp_0 = true;
                } else {
                    tmp_0 = this.fx().tv_1.uw_1;
                }
                if (tmp_0) {
                    tmp$ret$2 = deserializer.aj(this);
                    break $l$block;
                }
                var discriminator = classDiscriminator(deserializer.zi(), this.fx());
                var tmp2 = this.gx();
                var serialName = deserializer.zi().hj();
                if (!(tmp2 instanceof JsonObject)) {
                    var tmp2_0 = 'Expected ' + getKClass(JsonObject).v8() + ', but had ' + getKClassFromExpression(tmp2).v8() + ' as the serialized body of ' + serialName;
                    var path = this.ou();
                    var tmp_1;
                    if (this.fx().tv_1.dx_1) {
                        var tmp$ret$8 = toString_1(tmp2);
                        tmp_1 = toString_1(minify(tmp$ret$8));
                    } else {
                        tmp_1 = null;
                    }
                    var inputValue = tmp_1;
                    throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, tmp2_0, path, null, inputValue), tmp2_0, -1, path, inputValue, null);
                }
                var jsonTree = tmp2;
                var tmp0_safe_receiver = jsonTree.jx(discriminator);
                var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : get_jsonPrimitive(tmp0_safe_receiver);
                var type = tmp1_safe_receiver == null ? null : get_contentOrNull(tmp1_safe_receiver);
                var tmp_2 = deserializer.yl(this, type);
                var actualSerializer = (!(tmp_2 == null) ? isInterface(tmp_2, DeserializationStrategy) : false) ? tmp_2 : null;
                if (actualSerializer == null) {
                    var _destruct__k2r9zo = subtypeNotRegisteredMessageJson(type, deserializer.xl());
                    var message = _destruct__k2r9zo.sb();
                    var hint = _destruct__k2r9zo.tb();
                    var path_0 = this.ou();
                    var tmp_3;
                    if (this.fx().tv_1.dx_1) {
                        var tmp$ret$13 = jsonTree.toString();
                        tmp_3 = toString_1(minify(tmp$ret$13));
                    } else {
                        tmp_3 = null;
                    }
                    var inputValue_0 = tmp_3;
                    throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, message, path_0, hint, inputValue_0), message, -1, path_0, inputValue_0, hint);
                }
                tmp$ret$2 = readPolymorphicJson(this.fx(), discriminator, jsonTree, actualSerializer);
            }
            tmp = tmp$ret$2;
        } catch ($p) {
            var tmp_4;
            if ($p instanceof MissingFieldException) {
                var e = $p;
                if (contains_1(ensureNotNull(e.message), 'at path')) throw e;
                var tmp_5 = plus_1(e.message, ' at path: ');
                var tmp$ret$14 = this.ou();
                throw missingFieldExceptionWithNewMessage(e, tmp_5 + tmp$ret$14);
            } else {
                if ($p instanceof SerializationException) {
                    var e_0 = $p;
                    throw e_0;
                } else {
                    if ($p instanceof Exception) {
                        var e_1 = $p;
                        var path_1 = this.ou();
                        var causeMessage = e_1.message;
                        var shortMessage = 'Deserialization failed because of ' + (causeMessage == null ? 'an exception' : "'" + causeMessage + "' exception") + ' in the decoder';
                        var tmp_6;
                        if (this.fx().tv_1.dx_1) {
                            var tmp$ret$19 = toString_1(tmp2_withExceptionHandling_this);
                            tmp_6 = toString_1(minify(tmp$ret$19));
                        } else {
                            tmp_6 = null;
                        }
                        var inputValue_1 = tmp_6;
                        throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, shortMessage, path_1, null, inputValue_1), shortMessage, -1, path_1, inputValue_1, null, e_1);
                    } else {
                        throw $p;
                    }
                }
            }
        }
        return tmp;
    };
    protoOf(AbstractJsonTreeDecoder).nu = function(parentName, childName) {
        return childName;
    };
    protoOf(AbstractJsonTreeDecoder).gl = function(descriptor) {
        var currentObject = this.g12();
        var tmp0_subject = descriptor.ij();
        var tmp;
        var tmp_0;
        if (equals(tmp0_subject, LIST_getInstance())) {
            tmp_0 = true;
        } else {
            tmp_0 = tmp0_subject instanceof PolymorphicKind;
        }
        if (tmp_0) {
            var tmp_1 = this.fx();
            var serialName = descriptor.hj();
            if (!(currentObject instanceof JsonArray)) {
                var tmp2 = 'Expected ' + getKClass(JsonArray).v8() + ', but had ' + getKClassFromExpression(currentObject).v8() + ' as the serialized body of ' + serialName;
                var path = this.ou();
                var tmp_2;
                if (this.fx().tv_1.dx_1) {
                    var tmp$ret$6 = toString_1(currentObject);
                    tmp_2 = toString_1(minify(tmp$ret$6));
                } else {
                    tmp_2 = null;
                }
                var inputValue = tmp_2;
                throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, tmp2, path, null, inputValue), tmp2, -1, path, inputValue, null);
            }
            tmp = new JsonTreeListDecoder(tmp_1, currentObject);
        } else {
            if (equals(tmp0_subject, MAP_getInstance())) {
                var this_0 = this.fx();
                var keyDescriptor = carrierDescriptor(descriptor.qj(0), this_0.tl());
                var keyKind = keyDescriptor.ij();
                var tmp_3;
                var tmp_4;
                if (keyKind instanceof PrimitiveKind) {
                    tmp_4 = true;
                } else {
                    tmp_4 = equals(keyKind, ENUM_getInstance());
                }
                if (tmp_4) {
                    var tmp_5 = this.fx();
                    var serialName_0 = descriptor.hj();
                    if (!(currentObject instanceof JsonObject)) {
                        var tmp2_0 = 'Expected ' + getKClass(JsonObject).v8() + ', but had ' + getKClassFromExpression(currentObject).v8() + ' as the serialized body of ' + serialName_0;
                        var path_0 = this.ou();
                        var tmp_6;
                        if (this.fx().tv_1.dx_1) {
                            var tmp$ret$15 = toString_1(currentObject);
                            tmp_6 = toString_1(minify(tmp$ret$15));
                        } else {
                            tmp_6 = null;
                        }
                        var inputValue_0 = tmp_6;
                        throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, tmp2_0, path_0, null, inputValue_0), tmp2_0, -1, path_0, inputValue_0, null);
                    }
                    tmp_3 = new JsonTreeMapDecoder(tmp_5, currentObject, descriptor);
                } else {
                    if (this_0.tv_1.pw_1) {
                        var tmp_7 = this.fx();
                        var serialName_1 = descriptor.hj();
                        if (!(currentObject instanceof JsonArray)) {
                            var tmp2_1 = 'Expected ' + getKClass(JsonArray).v8() + ', but had ' + getKClassFromExpression(currentObject).v8() + ' as the serialized body of ' + serialName_1;
                            var path_1 = this.ou();
                            var tmp_8;
                            if (this.fx().tv_1.dx_1) {
                                var tmp$ret$23 = toString_1(currentObject);
                                tmp_8 = toString_1(minify(tmp$ret$23));
                            } else {
                                tmp_8 = null;
                            }
                            var inputValue_1 = tmp_8;
                            throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, tmp2_1, path_1, null, inputValue_1), tmp2_1, -1, path_1, inputValue_1, null);
                        }
                        tmp_3 = new JsonTreeListDecoder(tmp_7, currentObject);
                    } else {
                        throw InvalidKeyKindException(keyDescriptor);
                    }
                }
                tmp = tmp_3;
            } else {
                var tmp_9 = this.fx();
                var serialName_2 = descriptor.hj();
                if (!(currentObject instanceof JsonObject)) {
                    var tmp2_2 = 'Expected ' + getKClass(JsonObject).v8() + ', but had ' + getKClassFromExpression(currentObject).v8() + ' as the serialized body of ' + serialName_2;
                    var path_2 = this.ou();
                    var tmp_10;
                    if (this.fx().tv_1.dx_1) {
                        var tmp$ret$30 = toString_1(currentObject);
                        tmp_10 = toString_1(minify(tmp$ret$30));
                    } else {
                        tmp_10 = null;
                    }
                    var inputValue_2 = tmp_10;
                    throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, tmp2_2, path_2, null, inputValue_2), tmp2_2, -1, path_2, inputValue_2, null);
                }
                tmp = new JsonTreeDecoder(tmp_9, currentObject, descriptor, this.d12_1);
            }
        }
        return tmp;
    };
    protoOf(AbstractJsonTreeDecoder).hl = function(descriptor) {};
    protoOf(AbstractJsonTreeDecoder).sk = function() {
        var tmp = this.g12();
        return !(tmp instanceof JsonNull);
    };
    protoOf(AbstractJsonTreeDecoder).i12 = function(tag) {
        return !(this.h12(tag) === JsonNull_getInstance());
    };
    protoOf(AbstractJsonTreeDecoder).qu = function(tag) {
        return this.i12((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
    };
    protoOf(AbstractJsonTreeDecoder).j12 = function(tag) {
        var tmp$ret$0;
        $l$block: {
            var value = this.h12(tag);
            if (!(value instanceof JsonPrimitive)) {
                var tmp2 = 'Expected ' + getKClass(JsonPrimitive).v8() + ', but had ' + getKClassFromExpression(value).v8() + ' as the serialized body of ' + 'boolean';
                var path = this.f12(tag);
                var tmp;
                if (this.fx().tv_1.dx_1) {
                    var tmp$ret$7 = toString_1(value);
                    tmp = toString_1(minify(tmp$ret$7));
                } else {
                    tmp = null;
                }
                var inputValue = tmp;
                throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, tmp2, path, null, inputValue), tmp2, -1, path, inputValue, null);
            }
            var literal = value;
            try {
                var tmp0_elvis_lhs = get_booleanOrNull(literal);
                var tmp_0;
                if (tmp0_elvis_lhs == null) {
                    unparsedPrimitive(this, literal, 'boolean', tag);
                } else {
                    tmp_0 = tmp0_elvis_lhs;
                }
                tmp$ret$0 = tmp_0;
                break $l$block;
            } catch ($p) {
                if ($p instanceof IllegalArgumentException) {
                    var e = $p;
                    unparsedPrimitive(this, literal, 'boolean', tag);
                } else {
                    throw $p;
                }
            }
        }
        return tmp$ret$0;
    };
    protoOf(AbstractJsonTreeDecoder).ru = function(tag) {
        return this.j12((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
    };
    protoOf(AbstractJsonTreeDecoder).k12 = function(tag) {
        var tmp$ret$0;
        $l$block: {
            var value = this.h12(tag);
            if (!(value instanceof JsonPrimitive)) {
                var tmp2 = 'Expected ' + getKClass(JsonPrimitive).v8() + ', but had ' + getKClassFromExpression(value).v8() + ' as the serialized body of ' + 'byte';
                var path = this.f12(tag);
                var tmp;
                if (this.fx().tv_1.dx_1) {
                    var tmp$ret$7 = toString_1(value);
                    tmp = toString_1(minify(tmp$ret$7));
                } else {
                    tmp = null;
                }
                var inputValue = tmp;
                throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, tmp2, path, null, inputValue), tmp2, -1, path, inputValue, null);
            }
            var literal = value;
            try {
                var result = parseLongImpl(literal);
                var tmp_0;
                var this_0 = numberRangeToNumber(-128, 127);
                if (contains_0(isInterface(this_0, ClosedRange) ? this_0 : THROW_CCE(), result)) {
                    tmp_0 = convertToByte(result);
                } else {
                    tmp_0 = null;
                }
                var tmp0_elvis_lhs = tmp_0;
                var tmp_1;
                if (tmp0_elvis_lhs == null) {
                    unparsedPrimitive(this, literal, 'byte', tag);
                } else {
                    tmp_1 = tmp0_elvis_lhs;
                }
                tmp$ret$0 = tmp_1;
                break $l$block;
            } catch ($p) {
                if ($p instanceof IllegalArgumentException) {
                    var e = $p;
                    unparsedPrimitive(this, literal, 'byte', tag);
                } else {
                    throw $p;
                }
            }
        }
        return tmp$ret$0;
    };
    protoOf(AbstractJsonTreeDecoder).su = function(tag) {
        return this.k12((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
    };
    protoOf(AbstractJsonTreeDecoder).l12 = function(tag) {
        var tmp$ret$0;
        $l$block: {
            var value = this.h12(tag);
            if (!(value instanceof JsonPrimitive)) {
                var tmp2 = 'Expected ' + getKClass(JsonPrimitive).v8() + ', but had ' + getKClassFromExpression(value).v8() + ' as the serialized body of ' + 'short';
                var path = this.f12(tag);
                var tmp;
                if (this.fx().tv_1.dx_1) {
                    var tmp$ret$7 = toString_1(value);
                    tmp = toString_1(minify(tmp$ret$7));
                } else {
                    tmp = null;
                }
                var inputValue = tmp;
                throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, tmp2, path, null, inputValue), tmp2, -1, path, inputValue, null);
            }
            var literal = value;
            try {
                var result = parseLongImpl(literal);
                var tmp_0;
                var this_0 = numberRangeToNumber(-32768, 32767);
                if (contains_0(isInterface(this_0, ClosedRange) ? this_0 : THROW_CCE(), result)) {
                    tmp_0 = convertToShort(result);
                } else {
                    tmp_0 = null;
                }
                var tmp0_elvis_lhs = tmp_0;
                var tmp_1;
                if (tmp0_elvis_lhs == null) {
                    unparsedPrimitive(this, literal, 'short', tag);
                } else {
                    tmp_1 = tmp0_elvis_lhs;
                }
                tmp$ret$0 = tmp_1;
                break $l$block;
            } catch ($p) {
                if ($p instanceof IllegalArgumentException) {
                    var e = $p;
                    unparsedPrimitive(this, literal, 'short', tag);
                } else {
                    throw $p;
                }
            }
        }
        return tmp$ret$0;
    };
    protoOf(AbstractJsonTreeDecoder).tu = function(tag) {
        return this.l12((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
    };
    protoOf(AbstractJsonTreeDecoder).m12 = function(tag) {
        var tmp$ret$0;
        $l$block: {
            var value = this.h12(tag);
            if (!(value instanceof JsonPrimitive)) {
                var tmp2 = 'Expected ' + getKClass(JsonPrimitive).v8() + ', but had ' + getKClassFromExpression(value).v8() + ' as the serialized body of ' + 'int';
                var path = this.f12(tag);
                var tmp;
                if (this.fx().tv_1.dx_1) {
                    var tmp$ret$7 = toString_1(value);
                    tmp = toString_1(minify(tmp$ret$7));
                } else {
                    tmp = null;
                }
                var inputValue = tmp;
                throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, tmp2, path, null, inputValue), tmp2, -1, path, inputValue, null);
            }
            var literal = value;
            try {
                var result = parseLongImpl(literal);
                var tmp_0;
                var this_0 = numberRangeToNumber(-2147483648, 2147483647);
                if (contains_0(isInterface(this_0, ClosedRange) ? this_0 : THROW_CCE(), result)) {
                    tmp_0 = convertToInt(result);
                } else {
                    tmp_0 = null;
                }
                var tmp0_elvis_lhs = tmp_0;
                var tmp_1;
                if (tmp0_elvis_lhs == null) {
                    unparsedPrimitive(this, literal, 'int', tag);
                } else {
                    tmp_1 = tmp0_elvis_lhs;
                }
                tmp$ret$0 = tmp_1;
                break $l$block;
            } catch ($p) {
                if ($p instanceof IllegalArgumentException) {
                    var e = $p;
                    unparsedPrimitive(this, literal, 'int', tag);
                } else {
                    throw $p;
                }
            }
        }
        return tmp$ret$0;
    };
    protoOf(AbstractJsonTreeDecoder).uu = function(tag) {
        return this.m12((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
    };
    protoOf(AbstractJsonTreeDecoder).n12 = function(tag) {
        var tmp$ret$0;
        $l$block: {
            var value = this.h12(tag);
            if (!(value instanceof JsonPrimitive)) {
                var tmp2 = 'Expected ' + getKClass(JsonPrimitive).v8() + ', but had ' + getKClassFromExpression(value).v8() + ' as the serialized body of ' + 'long';
                var path = this.f12(tag);
                var tmp;
                if (this.fx().tv_1.dx_1) {
                    var tmp$ret$7 = toString_1(value);
                    tmp = toString_1(minify(tmp$ret$7));
                } else {
                    tmp = null;
                }
                var inputValue = tmp;
                throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, tmp2, path, null, inputValue), tmp2, -1, path, inputValue, null);
            }
            var literal = value;
            try {
                var tmp0_elvis_lhs = parseLongImpl(literal);
                var tmp_0;
                if (tmp0_elvis_lhs == null) {
                    unparsedPrimitive(this, literal, 'long', tag);
                } else {
                    tmp_0 = tmp0_elvis_lhs;
                }
                tmp$ret$0 = tmp_0;
                break $l$block;
            } catch ($p) {
                if ($p instanceof IllegalArgumentException) {
                    var e = $p;
                    unparsedPrimitive(this, literal, 'long', tag);
                } else {
                    throw $p;
                }
            }
        }
        return tmp$ret$0;
    };
    protoOf(AbstractJsonTreeDecoder).vu = function(tag) {
        return this.n12((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
    };
    protoOf(AbstractJsonTreeDecoder).o12 = function(tag) {
        var tmp$ret$0;
        $l$block: {
            var value = this.h12(tag);
            if (!(value instanceof JsonPrimitive)) {
                var tmp2 = 'Expected ' + getKClass(JsonPrimitive).v8() + ', but had ' + getKClassFromExpression(value).v8() + ' as the serialized body of ' + 'float';
                var path = this.f12(tag);
                var tmp;
                if (this.fx().tv_1.dx_1) {
                    var tmp$ret$7 = toString_1(value);
                    tmp = toString_1(minify(tmp$ret$7));
                } else {
                    tmp = null;
                }
                var inputValue = tmp;
                throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, tmp2, path, null, inputValue), tmp2, -1, path, inputValue, null);
            }
            var literal = value;
            try {
                var tmp0_elvis_lhs = get_float(literal);
                var tmp_0;
                if (tmp0_elvis_lhs == null) {
                    unparsedPrimitive(this, literal, 'float', tag);
                } else {
                    tmp_0 = tmp0_elvis_lhs;
                }
                tmp$ret$0 = tmp_0;
                break $l$block;
            } catch ($p) {
                if ($p instanceof IllegalArgumentException) {
                    var e = $p;
                    unparsedPrimitive(this, literal, 'float', tag);
                } else {
                    throw $p;
                }
            }
        }
        var result = tmp$ret$0;
        var specialFp = this.fx().tv_1.ww_1;
        if (specialFp || isFinite_0(result)) return result;
        var tmp2_0 = access$nonFiniteFpMessage$tJsonExceptionsKt(result, tag);
        var hint = "It is possible to deserialize them using 'JsonBuilder.allowSpecialFloatingPointValues = true'";
        var tmp_1;
        if (this.fx().tv_1.dx_1) {
            var tmp$ret$13 = toString_1(this.g12());
            tmp_1 = toString_1(minify(tmp$ret$13));
        } else {
            tmp_1 = null;
        }
        var inputValue_0 = tmp_1;
        throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, tmp2_0, null, hint, inputValue_0), tmp2_0, -1, null, inputValue_0, hint);
    };
    protoOf(AbstractJsonTreeDecoder).wu = function(tag) {
        return this.o12((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
    };
    protoOf(AbstractJsonTreeDecoder).p12 = function(tag) {
        var tmp$ret$0;
        $l$block: {
            var value = this.h12(tag);
            if (!(value instanceof JsonPrimitive)) {
                var tmp2 = 'Expected ' + getKClass(JsonPrimitive).v8() + ', but had ' + getKClassFromExpression(value).v8() + ' as the serialized body of ' + 'double';
                var path = this.f12(tag);
                var tmp;
                if (this.fx().tv_1.dx_1) {
                    var tmp$ret$7 = toString_1(value);
                    tmp = toString_1(minify(tmp$ret$7));
                } else {
                    tmp = null;
                }
                var inputValue = tmp;
                throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, tmp2, path, null, inputValue), tmp2, -1, path, inputValue, null);
            }
            var literal = value;
            try {
                var tmp0_elvis_lhs = get_double(literal);
                var tmp_0;
                if (tmp0_elvis_lhs == null) {
                    unparsedPrimitive(this, literal, 'double', tag);
                } else {
                    tmp_0 = tmp0_elvis_lhs;
                }
                tmp$ret$0 = tmp_0;
                break $l$block;
            } catch ($p) {
                if ($p instanceof IllegalArgumentException) {
                    var e = $p;
                    unparsedPrimitive(this, literal, 'double', tag);
                } else {
                    throw $p;
                }
            }
        }
        var result = tmp$ret$0;
        var specialFp = this.fx().tv_1.ww_1;
        if (specialFp || isFinite(result)) return result;
        var tmp2_0 = access$nonFiniteFpMessage$tJsonExceptionsKt(result, tag);
        var hint = "It is possible to deserialize them using 'JsonBuilder.allowSpecialFloatingPointValues = true'";
        var tmp_1;
        if (this.fx().tv_1.dx_1) {
            var tmp$ret$13 = toString_1(this.g12());
            tmp_1 = toString_1(minify(tmp$ret$13));
        } else {
            tmp_1 = null;
        }
        var inputValue_0 = tmp_1;
        throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, tmp2_0, null, hint, inputValue_0), tmp2_0, -1, null, inputValue_0, hint);
    };
    protoOf(AbstractJsonTreeDecoder).xu = function(tag) {
        return this.p12((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
    };
    protoOf(AbstractJsonTreeDecoder).q12 = function(tag) {
        var tmp$ret$0;
        $l$block: {
            var value = this.h12(tag);
            if (!(value instanceof JsonPrimitive)) {
                var tmp2 = 'Expected ' + getKClass(JsonPrimitive).v8() + ', but had ' + getKClassFromExpression(value).v8() + ' as the serialized body of ' + 'char';
                var path = this.f12(tag);
                var tmp;
                if (this.fx().tv_1.dx_1) {
                    var tmp$ret$7 = toString_1(value);
                    tmp = toString_1(minify(tmp$ret$7));
                } else {
                    tmp = null;
                }
                var inputValue = tmp;
                throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, tmp2, path, null, inputValue), tmp2, -1, path, inputValue, null);
            }
            var literal = value;
            try {
                var tmp0_elvis_lhs = new Char(single_0(literal.kx()));
                var tmp_0;
                if (tmp0_elvis_lhs == null) {
                    unparsedPrimitive(this, literal, 'char', tag);
                } else {
                    tmp_0 = tmp0_elvis_lhs;
                }
                tmp$ret$0 = tmp_0.a1_1;
                break $l$block;
            } catch ($p) {
                if ($p instanceof IllegalArgumentException) {
                    var e = $p;
                    unparsedPrimitive(this, literal, 'char', tag);
                } else {
                    throw $p;
                }
            }
        }
        return tmp$ret$0;
    };
    protoOf(AbstractJsonTreeDecoder).yu = function(tag) {
        return this.q12((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
    };
    protoOf(AbstractJsonTreeDecoder).r12 = function(tag) {
        var value = this.h12(tag);
        if (!(value instanceof JsonPrimitive)) {
            var tmp2 = 'Expected ' + getKClass(JsonPrimitive).v8() + ', but had ' + getKClassFromExpression(value).v8() + ' as the serialized body of ' + 'string';
            var path = this.f12(tag);
            var tmp;
            if (this.fx().tv_1.dx_1) {
                var tmp$ret$6 = toString_1(value);
                tmp = toString_1(minify(tmp$ret$6));
            } else {
                tmp = null;
            }
            var inputValue = tmp;
            throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, tmp2, path, null, inputValue), tmp2, -1, path, inputValue, null);
        }
        var value_0 = value;
        if (!(value_0 instanceof JsonLiteral)) {
            var tmp2_0 = "Expected string value for a non-null key '" + tag + "', got null literal instead";
            var tmp4 = this.f12(tag);
            var hint = "Use 'coerceInputValues = true' in 'Json {}' builder to coerce nulls if property has a default value.";
            var tmp_0;
            if (this.fx().tv_1.dx_1) {
                var tmp$ret$10 = toString_1(this.g12());
                tmp_0 = toString_1(minify(tmp$ret$10));
            } else {
                tmp_0 = null;
            }
            var inputValue_0 = tmp_0;
            throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, tmp2_0, tmp4, hint, inputValue_0), tmp2_0, -1, tmp4, inputValue_0, hint);
        }
        if (!value_0.qx_1 && !this.fx().tv_1.ow_1) {
            var tmp2_1 = "String literal for value of key '" + tag + "' should be quoted";
            var tmp4_0 = this.f12(tag);
            var hint_0 = "Use 'isLenient = true' in 'Json {}' builder to accept non-compliant JSON.";
            var tmp_1;
            if (this.fx().tv_1.dx_1) {
                var tmp$ret$14 = toString_1(this.g12());
                tmp_1 = toString_1(minify(tmp$ret$14));
            } else {
                tmp_1 = null;
            }
            var inputValue_1 = tmp_1;
            throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, tmp2_1, tmp4_0, hint_0, inputValue_1), tmp2_1, -1, tmp4_0, inputValue_1, hint_0);
        }
        return value_0.sx_1;
    };
    protoOf(AbstractJsonTreeDecoder).zu = function(tag) {
        return this.r12((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
    };
    protoOf(AbstractJsonTreeDecoder).s12 = function(tag, inlineDescriptor) {
        var tmp;
        if (get_isUnsignedNumber(inlineDescriptor)) {
            var tmp_0 = this.fx();
            var tmp2 = this.h12(tag);
            var serialName = inlineDescriptor.hj();
            if (!(tmp2 instanceof JsonPrimitive)) {
                var tmp2_0 = 'Expected ' + getKClass(JsonPrimitive).v8() + ', but had ' + getKClassFromExpression(tmp2).v8() + ' as the serialized body of ' + serialName;
                var path = this.f12(tag);
                var tmp_1;
                if (this.fx().tv_1.dx_1) {
                    var tmp$ret$7 = toString_1(tmp2);
                    tmp_1 = toString_1(minify(tmp$ret$7));
                } else {
                    tmp_1 = null;
                }
                var inputValue = tmp_1;
                throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, tmp2_0, path, null, inputValue), tmp2_0, -1, path, inputValue, null);
            }
            var lexer = StringJsonLexer_0(tmp_0, tmp2.kx());
            tmp = new JsonDecoderForUnsignedTypes(lexer, this.fx());
        } else {
            tmp = protoOf(NamedValueDecoder).av.call(this, tag, inlineDescriptor);
        }
        return tmp;
    };
    protoOf(AbstractJsonTreeDecoder).av = function(tag, inlineDescriptor) {
        return this.s12((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), inlineDescriptor);
    };
    protoOf(AbstractJsonTreeDecoder).dl = function(descriptor) {
        return !(this.mu() == null) ? protoOf(NamedValueDecoder).dl.call(this, descriptor) : new JsonPrimitiveDecoder(this.fx(), this.q1(), this.d12_1).dl(descriptor);
    };
    function coerceInputValue_0($this, descriptor, index, element) {
        var tmp0 = $this.fx();
        var tmp$ret$0;
        $l$block_2: {
            var isOptional = descriptor.rj(index);
            var elementDescriptor = descriptor.qj(index);
            var tmp;
            if (isOptional && !elementDescriptor.jj()) {
                tmp = element instanceof JsonNull;
            } else {
                tmp = false;
            }
            if (tmp) {
                tmp$ret$0 = true;
                break $l$block_2;
            }
            if (equals(elementDescriptor.ij(), ENUM_getInstance())) {
                var tmp_0;
                if (elementDescriptor.jj()) {
                    tmp_0 = element instanceof JsonNull;
                } else {
                    tmp_0 = false;
                }
                if (tmp_0) {
                    tmp$ret$0 = false;
                    break $l$block_2;
                }
                var tmp0_safe_receiver = element instanceof JsonPrimitive ? element : null;
                var tmp0_elvis_lhs = tmp0_safe_receiver == null ? null : get_contentOrNull(tmp0_safe_receiver);
                var tmp_1;
                if (tmp0_elvis_lhs == null) {
                    tmp$ret$0 = false;
                    break $l$block_2;
                } else {
                    tmp_1 = tmp0_elvis_lhs;
                }
                var enumValue = tmp_1;
                var enumIndex = getJsonNameIndex(elementDescriptor, tmp0, enumValue);
                var coerceToNull = !tmp0.tv_1.rw_1 && elementDescriptor.jj();
                if (enumIndex === -3 && (isOptional || coerceToNull)) {
                    tmp$ret$0 = true;
                    break $l$block_2;
                }
            }
            tmp$ret$0 = false;
        }
        return tmp$ret$0;
    }
    function throwUnknownKey($this, key) {
        var tmp2 = "Encountered an unknown key '" + key + "'";
        var tmp4 = $this.ou();
        var hint = "Use 'ignoreUnknownKeys = true' in 'Json {}' builder or '@JsonIgnoreUnknownKeys' annotation to ignore unknown keys.";
        var tmp;
        if ($this.fx().tv_1.dx_1) {
            var tmp$ret$3 = $this.q1().toString();
            tmp = toString_1(minify(tmp$ret$3));
        } else {
            tmp = null;
        }
        var inputValue = tmp;
        throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, tmp2, tmp4, hint, inputValue), tmp2, -1, tmp4, inputValue, hint);
    }
    function JsonTreeDecoder(json, value, descriptor, polymorphicDiscriminator, polyDescriptor) {
        polymorphicDiscriminator = polymorphicDiscriminator === VOID ? null : polymorphicDiscriminator;
        polyDescriptor = polyDescriptor === VOID ? null : polyDescriptor;
        AbstractJsonTreeDecoder.call(this, json, value, polymorphicDiscriminator);
        this.z12_1 = value;
        this.a13_1 = polyDescriptor;
        this.b13_1 = this.q1().w1().j();
        this.c13_1 = this.e12_1.rw_1 ? null : new JsonElementMarker(descriptor);
        this.d13_1 = null;
        this.e13_1 = null;
    }
    protoOf(JsonTreeDecoder).q1 = function() {
        return this.z12_1;
    };
    protoOf(JsonTreeDecoder).vl = function(descriptor) {
        var entries = this.b13_1;
        $l$loop: while (entries.k()) {
            var entry = entries.l();
            var key = entry.p1();
            var index = getJsonNameIndex(descriptor, this.fx(), key);
            if (!(index === -3)) {
                if (this.e12_1.tw_1 && coerceInputValue_0(this, descriptor, index, entry.q1())) {
                    continue $l$loop;
                }
                var tmp0_safe_receiver = this.c13_1;
                if (tmp0_safe_receiver == null) null; else {
                    tmp0_safe_receiver.uy(index);
                }
                this.d13_1 = key;
                this.e13_1 = entry.q1();
                return index;
            }
            if (!(key === this.d12_1) && !ignoreUnknownKeys(descriptor, this.fx())) {
                throwUnknownKey(this, key);
            }
        }
        var tmp1_safe_receiver = this.c13_1;
        var tmp2_elvis_lhs = tmp1_safe_receiver == null ? null : tmp1_safe_receiver.vy();
        var markerIndex = tmp2_elvis_lhs == null ? -1 : tmp2_elvis_lhs;
        if (!(markerIndex === -1)) {
            this.d13_1 = descriptor.nj(markerIndex);
            this.e13_1 = null;
        }
        return markerIndex;
    };
    protoOf(JsonTreeDecoder).sk = function() {
        var tmp;
        var tmp0_safe_receiver = this.c13_1;
        var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.ty_1;
        if (!(tmp1_elvis_lhs == null ? false : tmp1_elvis_lhs)) {
            tmp = protoOf(AbstractJsonTreeDecoder).sk.call(this);
        } else {
            tmp = false;
        }
        return tmp;
    };
    protoOf(JsonTreeDecoder).iu = function(descriptor, index) {
        var tmp0_elvis_lhs = this.d13_1;
        return tmp0_elvis_lhs == null ? descriptor.nj(index) : tmp0_elvis_lhs;
    };
    protoOf(JsonTreeDecoder).h12 = function(tag) {
        var tmp0_elvis_lhs = this.e13_1;
        return tmp0_elvis_lhs == null ? getValue(this.q1(), tag) : tmp0_elvis_lhs;
    };
    protoOf(JsonTreeDecoder).gl = function(descriptor) {
        if (descriptor === this.a13_1) {
            var tmp = this.fx();
            var tmp2 = this.g12();
            var serialName = this.a13_1.hj();
            if (!(tmp2 instanceof JsonObject)) {
                var tmp2_0 = 'Expected ' + getKClass(JsonObject).v8() + ', but had ' + getKClassFromExpression(tmp2).v8() + ' as the serialized body of ' + serialName;
                var path = this.ou();
                var tmp_0;
                if (this.fx().tv_1.dx_1) {
                    var tmp$ret$6 = toString_1(tmp2);
                    tmp_0 = toString_1(minify(tmp$ret$6));
                } else {
                    tmp_0 = null;
                }
                var inputValue = tmp_0;
                throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, tmp2_0, path, null, inputValue), tmp2_0, -1, path, inputValue, null);
            }
            return new JsonTreeDecoder(tmp, tmp2, descriptor, this.d12_1, this.a13_1);
        }
        return protoOf(AbstractJsonTreeDecoder).gl.call(this, descriptor);
    };
    function JsonTreeListDecoder(json, value) {
        AbstractJsonTreeDecoder.call(this, json, value);
        this.l13_1 = value;
        this.m13_1 = this.l13_1.m();
        this.n13_1 = -1;
    }
    protoOf(JsonTreeListDecoder).q1 = function() {
        return this.l13_1;
    };
    protoOf(JsonTreeListDecoder).iu = function(descriptor, index) {
        return index.toString();
    };
    protoOf(JsonTreeListDecoder).h12 = function(tag) {
        return this.l13_1.p(toInt(tag));
    };
    protoOf(JsonTreeListDecoder).vl = function(descriptor) {
        while (this.n13_1 < (this.m13_1 - 1 | 0)) {
            this.n13_1 = this.n13_1 + 1 | 0;
            return this.n13_1;
        }
        return -1;
    };
    function JsonPrimitiveDecoder(json, value, polymorphicDiscriminator) {
        polymorphicDiscriminator = polymorphicDiscriminator === VOID ? null : polymorphicDiscriminator;
        AbstractJsonTreeDecoder.call(this, json, value, polymorphicDiscriminator);
        this.u13_1 = value;
        this.bv('primitive');
    }
    protoOf(JsonPrimitiveDecoder).q1 = function() {
        return this.u13_1;
    };
    protoOf(JsonPrimitiveDecoder).vl = function(descriptor) {
        return 0;
    };
    protoOf(JsonPrimitiveDecoder).h12 = function(tag) {
        if (!(tag === 'primitive')) {
            var message = "This input can only handle primitives with 'primitive' tag";
            throw IllegalArgumentException_init_$Create$_0(toString_1(message));
        }
        return this.u13_1;
    };
    function JsonTreeMapDecoder(json, value, descriptor) {
        JsonTreeDecoder.call(this, json, value, descriptor);
        this.h14_1 = toList_1(value.u1());
        this.i14_1 = imul(this.h14_1.m(), 2);
        this.j14_1 = -1;
    }
    protoOf(JsonTreeMapDecoder).iu = function(descriptor, index) {
        var i = index / 2 | 0;
        return this.h14_1.p(i);
    };
    protoOf(JsonTreeMapDecoder).vl = function(descriptor) {
        while (this.j14_1 < (this.i14_1 - 1 | 0)) {
            this.j14_1 = this.j14_1 + 1 | 0;
            return this.j14_1;
        }
        return -1;
    };
    protoOf(JsonTreeMapDecoder).h12 = function(tag) {
        return (this.j14_1 % 2 | 0) === 0 ? JsonPrimitive_1(tag) : getValue(this.q1(), tag);
    };
    protoOf(JsonTreeMapDecoder).hl = function(descriptor) {};
    function appendEscape($this, lastPosition, current) {
        $this.k14(lastPosition, current);
        return appendEsc($this, current + 1 | 0);
    }
    function decodedString($this, lastPosition, currentPosition) {
        $this.k14(lastPosition, currentPosition);
        var result = $this.kw_1.toString();
        $this.kw_1.ea(0);
        return result;
    }
    function takePeeked($this) {
        var this_0 = ensureNotNull($this.jw_1);
        $this.jw_1 = null;
        return this_0;
    }
    function wasUnquotedString($this) {
        return !(charSequenceGet($this.t11(), $this.hw_1 - 1 | 0) === _Char___init__impl__6a9atx(34));
    }
    function appendEsc($this, startPosition) {
        var currentPosition = startPosition;
        currentPosition = $this.l14(currentPosition);
        if (currentPosition === -1) {
            $this.xy('Expected escape sequence to continue, got EOF');
        }
        var tmp = $this.t11();
        var _unary__edvuaz = currentPosition;
        currentPosition = _unary__edvuaz + 1 | 0;
        var currentChar = charSequenceGet(tmp, _unary__edvuaz);
        if (currentChar === _Char___init__impl__6a9atx(117)) {
            return appendHex($this, $this.t11(), currentPosition);
        }
        var tmp$ret$0 = Char__toInt_impl_vasixd(currentChar);
        var c = escapeToChar(tmp$ret$0);
        if (c === _Char___init__impl__6a9atx(0)) {
            $this.xy("Invalid escaped char '" + toString(currentChar) + "'");
        }
        $this.kw_1.z6(c);
        return currentPosition;
    }
    function appendHex($this, source, startPos) {
        if ((startPos + 4 | 0) >= charSequenceLength(source)) {
            $this.hw_1 = startPos;
            $this.m14();
            if (($this.hw_1 + 4 | 0) >= charSequenceLength(source)) {
                $this.xy('Unexpected EOF during unicode escape');
            }
            return appendHex($this, source, $this.hw_1);
        }
        $this.kw_1.z6(numberToChar((((fromHexChar($this, source, startPos) << 12) + (fromHexChar($this, source, startPos + 1 | 0) << 8) | 0) + (fromHexChar($this, source, startPos + 2 | 0) << 4) | 0) + fromHexChar($this, source, startPos + 3 | 0) | 0));
        return startPos + 4 | 0;
    }
    function fromHexChar($this, source, currentPosition) {
        var character = charSequenceGet(source, currentPosition);
        var tmp;
        if (_Char___init__impl__6a9atx(48) <= character ? character <= _Char___init__impl__6a9atx(57) : false) {
            var tmp_0 = Char__toInt_impl_vasixd(character);
            var this_0 = _Char___init__impl__6a9atx(48);
            tmp = tmp_0 - Char__toInt_impl_vasixd(this_0) | 0;
        } else if (_Char___init__impl__6a9atx(97) <= character ? character <= _Char___init__impl__6a9atx(102) : false) {
            var tmp_1 = Char__toInt_impl_vasixd(character);
            var this_1 = _Char___init__impl__6a9atx(97);
            tmp = (tmp_1 - Char__toInt_impl_vasixd(this_1) | 0) + 10 | 0;
        } else if (_Char___init__impl__6a9atx(65) <= character ? character <= _Char___init__impl__6a9atx(70) : false) {
            var tmp_2 = Char__toInt_impl_vasixd(character);
            var this_2 = _Char___init__impl__6a9atx(65);
            tmp = (tmp_2 - Char__toInt_impl_vasixd(this_2) | 0) + 10 | 0;
        } else {
            $this.xy("Invalid toHexChar char '" + toString(character) + "' in unicode escape");
        }
        return tmp;
    }
    function consumeBoolean2($this, start) {
        var current = $this.l14(start);
        if (current >= charSequenceLength($this.t11()) || current === -1) {
            $this.xy('EOF');
        }
        var tmp = $this.t11();
        var _unary__edvuaz = current;
        current = _unary__edvuaz + 1 | 0;
        var this_0 = charSequenceGet(tmp, _unary__edvuaz);
        var tmp0_subject = Char__toInt_impl_vasixd(this_0) | 32;
        var tmp_0;
        var this_1 = _Char___init__impl__6a9atx(116);
        if (tmp0_subject === Char__toInt_impl_vasixd(this_1)) {
            consumeBooleanLiteral($this, 'rue', current);
            tmp_0 = true;
        } else {
            var this_2 = _Char___init__impl__6a9atx(102);
            if (tmp0_subject === Char__toInt_impl_vasixd(this_2)) {
                consumeBooleanLiteral($this, 'alse', current);
                tmp_0 = false;
            } else {
                $this.xy("Expected valid boolean literal prefix, but had '" + $this.xz() + "'");
            }
        }
        return tmp_0;
    }
    function consumeBooleanLiteral($this, literalSuffix, current) {
        if ((charSequenceLength($this.t11()) - current | 0) < literalSuffix.length) {
            $this.xy('Unexpected end of boolean literal');
        }
        var inductionVariable = 0;
        var last = charSequenceLength(literalSuffix) - 1 | 0;
        if (inductionVariable <= last) do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var expected = charCodeAt(literalSuffix, i);
            var actual = charSequenceGet($this.t11(), current + i | 0);
            var tmp = Char__toInt_impl_vasixd(expected);
            if (!(tmp === (Char__toInt_impl_vasixd(actual) | 32))) {
                $this.xy("Expected valid boolean literal prefix, but had '" + $this.xz() + "'");
            }
        } while (inductionVariable <= last);
        $this.hw_1 = current + literalSuffix.length | 0;
    }
    function consumeNumericLiteral$calculateExponent(exponentAccumulator, isExponentPositive) {
        var tmp;
        switch (isExponentPositive) {
          case false:
            var x = -toNumber(exponentAccumulator);
            tmp = Math.pow(10, x);
            break;

          case true:
            var x_0 = toNumber(exponentAccumulator);
            tmp = Math.pow(10, x_0);
            break;

          default:
            noWhenBranchMatchedException();
            break;
        }
        return tmp;
    }
    function AbstractJsonLexer(configuration) {
        this.gw_1 = configuration;
        this.hw_1 = 0;
        this.iw_1 = new JsonPath(this.gw_1);
        this.jw_1 = null;
        this.kw_1 = StringBuilder_init_$Create$_0();
    }
    protoOf(AbstractJsonLexer).m14 = function() {};
    protoOf(AbstractJsonLexer).l11 = function() {
        var current = this.n14();
        var source = this.t11();
        if (current >= charSequenceLength(source) || current === -1) return false;
        if (charSequenceGet(source, current) === _Char___init__impl__6a9atx(44)) {
            this.hw_1 = this.hw_1 + 1 | 0;
            return true;
        }
        return false;
    };
    protoOf(AbstractJsonLexer).o14 = function(c) {
        return c === _Char___init__impl__6a9atx(125) || c === _Char___init__impl__6a9atx(93) || (c === _Char___init__impl__6a9atx(58) || c === _Char___init__impl__6a9atx(44)) ? false : true;
    };
    protoOf(AbstractJsonLexer).lw = function() {
        var nextToken = this.zz();
        if (!(nextToken === 10)) {
            this.xy('Expected EOF after parsing, but had ' + toString(charSequenceGet(this.t11(), this.hw_1 - 1 | 0)) + ' instead');
        }
    };
    protoOf(AbstractJsonLexer).tz = function(expected) {
        var token = this.zz();
        if (!(token === expected)) {
            var expected_0 = tokenDescription(expected);
            var position = true && this.hw_1 > 0 ? this.hw_1 - 1 | 0 : this.hw_1;
            var s = this.hw_1 === charSequenceLength(this.t11()) || position < 0 ? 'EOF' : toString(charSequenceGet(this.t11(), position));
            var tmp$ret$1 = 'Expected ' + expected_0 + ", but had '" + s + "' instead";
            this.xy(tmp$ret$1, position);
        }
        return token;
    };
    protoOf(AbstractJsonLexer).p14 = function(expected) {
        if (this.hw_1 > 0 && expected === _Char___init__impl__6a9atx(34)) {
            var tmp$ret$0;
            $l$block: {
                var snapshot = this.hw_1;
                try {
                    this.hw_1 = this.hw_1 - 1 | 0;
                    tmp$ret$0 = this.xz();
                    break $l$block;
                } finally {
                    this.hw_1 = snapshot;
                }
            }
            var inputLiteral = tmp$ret$0;
            if (inputLiteral === 'null') {
                this.wy("Expected string literal but 'null' literal was found", this.hw_1 - 1 | 0, "Use 'coerceInputValues = true' in 'Json {}' builder to coerce nulls if property has a default value.");
            }
        }
        var expectedToken = charToTokenClass(expected);
        var expected_0 = tokenDescription(expectedToken);
        var position = true && this.hw_1 > 0 ? this.hw_1 - 1 | 0 : this.hw_1;
        var s = this.hw_1 === charSequenceLength(this.t11()) || position < 0 ? 'EOF' : toString(charSequenceGet(this.t11(), position));
        var tmp$ret$3 = 'Expected ' + expected_0 + ", but had '" + s + "' instead";
        this.xy(tmp$ret$3, position);
    };
    protoOf(AbstractJsonLexer).uz = function() {
        var source = this.t11();
        var cpos = this.hw_1;
        $l$loop_0: while (true) {
            cpos = this.l14(cpos);
            if (cpos === -1) break $l$loop_0;
            var ch = charSequenceGet(source, cpos);
            if (ch === _Char___init__impl__6a9atx(32) || ch === _Char___init__impl__6a9atx(10) || ch === _Char___init__impl__6a9atx(13) || ch === _Char___init__impl__6a9atx(9)) {
                cpos = cpos + 1 | 0;
                continue $l$loop_0;
            }
            this.hw_1 = cpos;
            return charToTokenClass(ch);
        }
        this.hw_1 = cpos;
        return 10;
    };
    protoOf(AbstractJsonLexer).m11 = function(doConsume) {
        var current = this.n14();
        current = this.l14(current);
        var len = charSequenceLength(this.t11()) - current | 0;
        if (len < 4 || current === -1) return false;
        var inductionVariable = 0;
        if (inductionVariable <= 3) do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            if (!(charCodeAt('null', i) === charSequenceGet(this.t11(), current + i | 0))) return false;
        } while (inductionVariable <= 3);
        if (len > 4 && charToTokenClass(charSequenceGet(this.t11(), current + 4 | 0)) === 0) return false;
        if (doConsume) {
            this.hw_1 = current + 4 | 0;
        }
        return true;
    };
    protoOf(AbstractJsonLexer).u11 = function(doConsume, $super) {
        doConsume = doConsume === VOID ? true : doConsume;
        return $super === VOID ? this.m11(doConsume) : $super.m11.call(this, doConsume);
    };
    protoOf(AbstractJsonLexer).n11 = function(isLenient) {
        var token = this.uz();
        var tmp;
        if (isLenient) {
            if (!(token === 1) && !(token === 0)) return null;
            tmp = this.xz();
        } else {
            if (!(token === 1)) return null;
            tmp = this.wz();
        }
        var string = tmp;
        this.jw_1 = string;
        return string;
    };
    protoOf(AbstractJsonLexer).q14 = function() {
        this.jw_1 = null;
    };
    protoOf(AbstractJsonLexer).r14 = function(startPos, endPos) {
        var this_0 = this.t11();
        return toString_1(charSequenceSubSequence(this_0, startPos, endPos));
    };
    protoOf(AbstractJsonLexer).wz = function() {
        if (!(this.jw_1 == null)) {
            return takePeeked(this);
        }
        return this.q11();
    };
    protoOf(AbstractJsonLexer).consumeString2 = function(source, startPosition, current) {
        var currentPosition = current;
        var lastPosition = startPosition;
        var char = charSequenceGet(source, currentPosition);
        var usedAppend = false;
        while (!(char === _Char___init__impl__6a9atx(34))) {
            if (char === _Char___init__impl__6a9atx(92)) {
                usedAppend = true;
                currentPosition = this.l14(appendEscape(this, lastPosition, currentPosition));
                if (currentPosition === -1) {
                    this.xy('Unexpected EOF', currentPosition);
                }
                lastPosition = currentPosition;
            } else {
                currentPosition = currentPosition + 1 | 0;
                if (currentPosition >= charSequenceLength(source)) {
                    usedAppend = true;
                    this.k14(lastPosition, currentPosition);
                    currentPosition = this.l14(currentPosition);
                    if (currentPosition === -1) {
                        this.xy('Unexpected EOF', currentPosition);
                    }
                    lastPosition = currentPosition;
                }
            }
            char = charSequenceGet(source, currentPosition);
        }
        var tmp;
        if (!usedAppend) {
            tmp = this.r14(lastPosition, currentPosition);
        } else {
            tmp = decodedString(this, lastPosition, currentPosition);
        }
        var string = tmp;
        this.hw_1 = currentPosition + 1 | 0;
        return string;
    };
    protoOf(AbstractJsonLexer).r11 = function() {
        var result = this.xz();
        if (result === 'null' && wasUnquotedString(this)) {
            this.xy("Unexpected 'null' value instead of string literal");
        }
        return result;
    };
    protoOf(AbstractJsonLexer).xz = function() {
        if (!(this.jw_1 == null)) {
            return takePeeked(this);
        }
        var current = this.n14();
        if (current >= charSequenceLength(this.t11()) || current === -1) {
            this.xy('EOF', current);
        }
        var token = charToTokenClass(charSequenceGet(this.t11(), current));
        if (token === 1) {
            return this.wz();
        }
        if (!(token === 0)) {
            this.xy('Expected beginning of the string, but got ' + toString(charSequenceGet(this.t11(), current)));
        }
        var usedAppend = false;
        while (charToTokenClass(charSequenceGet(this.t11(), current)) === 0) {
            current = current + 1 | 0;
            if (current >= charSequenceLength(this.t11())) {
                usedAppend = true;
                this.k14(this.hw_1, current);
                var eof = this.l14(current);
                if (eof === -1) {
                    this.hw_1 = current;
                    return decodedString(this, 0, 0);
                } else {
                    current = eof;
                }
            }
        }
        var tmp;
        if (!usedAppend) {
            tmp = this.r14(this.hw_1, current);
        } else {
            tmp = decodedString(this, this.hw_1, current);
        }
        var result = tmp;
        this.hw_1 = current;
        return result;
    };
    protoOf(AbstractJsonLexer).k14 = function(fromIndex, toIndex) {
        this.kw_1.z9(this.t11(), fromIndex, toIndex);
    };
    protoOf(AbstractJsonLexer).p11 = function(allowLenientStrings) {
        var tokenStack = ArrayList_init_$Create$();
        var lastToken = this.uz();
        if (!(lastToken === 8) && !(lastToken === 6)) {
            this.xz();
            return Unit_instance;
        }
        $l$loop: while (true) {
            lastToken = this.uz();
            if (lastToken === 1) {
                if (allowLenientStrings) this.xz(); else this.q11();
                continue $l$loop;
            }
            var tmp0_subject = lastToken;
            if (tmp0_subject === 8 || tmp0_subject === 6) {
                tokenStack.i(lastToken);
            } else if (tmp0_subject === 9) {
                if (!(last(tokenStack) === 8)) {
                    this.xy('found ] instead of }');
                }
                removeLast(tokenStack);
            } else if (tmp0_subject === 7) {
                if (!(last(tokenStack) === 6)) {
                    this.xy('found } instead of ]');
                }
                removeLast(tokenStack);
            } else if (tmp0_subject === 10) {
                this.xy('Unexpected end of input due to malformed JSON during ignoring unknown keys');
            }
            this.zz();
            if (tokenStack.m() === 0) return Unit_instance;
        }
    };
    protoOf(AbstractJsonLexer).toString = function() {
        return "JsonReader(source='" + toString_1(this.t11()) + "', currentPosition=" + this.hw_1 + ')';
    };
    protoOf(AbstractJsonLexer).o11 = function(key) {
        var processed = this.r14(0, this.hw_1);
        var lastIndexOf_0 = lastIndexOf(processed, key);
        this.wy("Encountered an unknown key '" + key + "'", lastIndexOf_0, "Use 'ignoreUnknownKeys = true' in 'Json {}' builder or '@JsonIgnoreUnknownKeys' annotation to ignore unknown keys.");
    };
    protoOf(AbstractJsonLexer).wy = function(message, position, hint) {
        throw decodingExceptionOf_0(this, message, position, this.iw_1.mz(), hint, this.t11());
    };
    protoOf(AbstractJsonLexer).xy = function(message, position, hint, $super) {
        position = position === VOID ? this.hw_1 : position;
        hint = hint === VOID ? null : hint;
        return $super === VOID ? this.wy(message, position, hint) : $super.wy.call(this, message, position, hint);
    };
    protoOf(AbstractJsonLexer).w11 = function() {
        var current = this.n14();
        current = this.l14(current);
        if (current >= charSequenceLength(this.t11()) || current === -1) {
            this.xy('EOF');
        }
        var tmp;
        if (charSequenceGet(this.t11(), current) === _Char___init__impl__6a9atx(34)) {
            current = current + 1 | 0;
            if (current === charSequenceLength(this.t11())) {
                this.xy('EOF');
            }
            tmp = true;
        } else {
            tmp = false;
        }
        var hasQuotation = tmp;
        var accumulator = new Long(0, 0);
        var exponentAccumulator = new Long(0, 0);
        var isNegative = false;
        var isExponentPositive = false;
        var hasExponent = false;
        var start = current;
        $l$loop_4: while (!(current === charSequenceLength(this.t11()))) {
            var ch = charSequenceGet(this.t11(), current);
            if ((ch === _Char___init__impl__6a9atx(101) || ch === _Char___init__impl__6a9atx(69)) && !hasExponent) {
                if (current === start) {
                    this.xy("Unexpected symbol '" + toString(ch) + "' in numeric literal", current);
                }
                isExponentPositive = true;
                hasExponent = true;
                current = current + 1 | 0;
                continue $l$loop_4;
            }
            if (ch === _Char___init__impl__6a9atx(45) && hasExponent) {
                if (current === start) {
                    this.xy("Unexpected symbol '-' in numeric literal", current);
                }
                isExponentPositive = false;
                current = current + 1 | 0;
                continue $l$loop_4;
            }
            if (ch === _Char___init__impl__6a9atx(43) && hasExponent) {
                if (current === start) {
                    this.xy("Unexpected symbol '+' in numeric literal", current);
                }
                isExponentPositive = true;
                current = current + 1 | 0;
                continue $l$loop_4;
            }
            if (ch === _Char___init__impl__6a9atx(45)) {
                if (!(current === start)) {
                    this.xy("Unexpected symbol '-' in numeric literal", current);
                }
                isNegative = true;
                current = current + 1 | 0;
                continue $l$loop_4;
            }
            var token = charToTokenClass(ch);
            if (!(token === 0)) break $l$loop_4;
            current = current + 1 | 0;
            var digit = Char__minus_impl_a2frrh(ch, _Char___init__impl__6a9atx(48));
            if (!(0 <= digit ? digit <= 9 : false)) {
                this.xy("Unexpected symbol '" + toString(ch) + "' in numeric literal", current - 1 | 0);
            }
            if (hasExponent) {
                var this_0 = exponentAccumulator;
                var this_1 = multiply(this_0, fromInt(10));
                exponentAccumulator = add(this_1, fromInt(digit));
                continue $l$loop_4;
            }
            var this_2 = accumulator;
            var this_3 = multiply(this_2, fromInt(10));
            accumulator = subtract(this_3, fromInt(digit));
            if (compare(accumulator, new Long(0, 0)) > 0) {
                this.xy('Numeric value overflow');
            }
        }
        var hasChars = !(current === start);
        if (start === current || isNegative && start === (current - 1 | 0)) {
            this.xy('Expected numeric literal', current);
        }
        if (hasQuotation) {
            if (!hasChars) {
                this.xy('EOF');
            }
            if (!(charSequenceGet(this.t11(), current) === _Char___init__impl__6a9atx(34))) {
                this.xy('Expected closing quotation mark', current);
            }
            current = current + 1 | 0;
        }
        this.hw_1 = current;
        if (hasExponent) {
            var doubleAccumulator = toNumber(accumulator) * consumeNumericLiteral$calculateExponent(exponentAccumulator, isExponentPositive);
            if (doubleAccumulator > toNumber(new Long(-1, 2147483647)) || doubleAccumulator < toNumber(new Long(0, -2147483648))) {
                this.xy('Numeric value overflow');
            }
            if (!(Math.floor(doubleAccumulator) === doubleAccumulator)) {
                this.xy("Can't convert " + doubleAccumulator + ' to Long');
            }
            accumulator = numberToLong(doubleAccumulator);
        }
        var tmp_0;
        if (isNegative) {
            tmp_0 = accumulator;
        } else if (!equalsLong(accumulator, new Long(0, -2147483648))) {
            tmp_0 = negate(accumulator);
        } else {
            this.xy('Numeric value overflow');
        }
        return tmp_0;
    };
    protoOf(AbstractJsonLexer).px = function() {
        var result = this.w11();
        var next = this.zz();
        if (!(next === 10)) {
            var expected = tokenDescription(10);
            var position = true && this.hw_1 > 0 ? this.hw_1 - 1 | 0 : this.hw_1;
            var s = this.hw_1 === charSequenceLength(this.t11()) || position < 0 ? 'EOF' : toString(charSequenceGet(this.t11(), position));
            var tmp$ret$1 = "Expected input to contain a single valid number, but got '" + s + "' after it";
            this.xy(tmp$ret$1, position);
        }
        return result;
    };
    protoOf(AbstractJsonLexer).v11 = function() {
        var current = this.n14();
        if (current === charSequenceLength(this.t11())) {
            this.xy('EOF');
        }
        var tmp;
        if (charSequenceGet(this.t11(), current) === _Char___init__impl__6a9atx(34)) {
            current = current + 1 | 0;
            tmp = true;
        } else {
            tmp = false;
        }
        var hasQuotation = tmp;
        var result = consumeBoolean2(this, current);
        if (hasQuotation) {
            if (this.hw_1 === charSequenceLength(this.t11())) {
                this.xy('EOF');
            }
            if (!(charSequenceGet(this.t11(), this.hw_1) === _Char___init__impl__6a9atx(34))) {
                this.xy('Expected closing quotation mark');
            }
            this.hw_1 = this.hw_1 + 1 | 0;
        }
        return result;
    };
    function charToTokenClass(c) {
        var tmp;
        if (Char__toInt_impl_vasixd(c) < 126) {
            var tmp_0 = CharMappings_getInstance().t14_1;
            tmp = tmp_0[Char__toInt_impl_vasixd(c)];
        } else {
            tmp = 0;
        }
        return tmp;
    }
    function tokenDescription(token) {
        return token === 1 ? "quotation mark '\"'" : token === 2 ? "string escape sequence '\\'" : token === 4 ? "comma ','" : token === 5 ? "colon ':'" : token === 6 ? "start of the object '{'" : token === 7 ? "end of the object '}'" : token === 8 ? "start of the array '['" : token === 9 ? "end of the array ']'" : token === 10 ? 'end of the input' : token === 127 ? 'invalid token' : 'valid token';
    }
    function escapeToChar(c) {
        return c < 117 ? CharMappings_getInstance().s14_1[c] : _Char___init__impl__6a9atx(0);
    }
    function initEscape($this) {
        var inductionVariable = 0;
        if (inductionVariable <= 31) do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            initC2ESC($this, i, _Char___init__impl__6a9atx(117));
        } while (inductionVariable <= 31);
        initC2ESC($this, 8, _Char___init__impl__6a9atx(98));
        initC2ESC($this, 9, _Char___init__impl__6a9atx(116));
        initC2ESC($this, 10, _Char___init__impl__6a9atx(110));
        initC2ESC($this, 12, _Char___init__impl__6a9atx(102));
        initC2ESC($this, 13, _Char___init__impl__6a9atx(114));
        initC2ESC_0($this, _Char___init__impl__6a9atx(47), _Char___init__impl__6a9atx(47));
        initC2ESC_0($this, _Char___init__impl__6a9atx(34), _Char___init__impl__6a9atx(34));
        initC2ESC_0($this, _Char___init__impl__6a9atx(92), _Char___init__impl__6a9atx(92));
    }
    function initCharToToken($this) {
        var inductionVariable = 0;
        if (inductionVariable <= 32) do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            initC2TC($this, i, 127);
        } while (inductionVariable <= 32);
        initC2TC($this, 9, 3);
        initC2TC($this, 10, 3);
        initC2TC($this, 13, 3);
        initC2TC($this, 32, 3);
        initC2TC_0($this, _Char___init__impl__6a9atx(44), 4);
        initC2TC_0($this, _Char___init__impl__6a9atx(58), 5);
        initC2TC_0($this, _Char___init__impl__6a9atx(123), 6);
        initC2TC_0($this, _Char___init__impl__6a9atx(125), 7);
        initC2TC_0($this, _Char___init__impl__6a9atx(91), 8);
        initC2TC_0($this, _Char___init__impl__6a9atx(93), 9);
        initC2TC_0($this, _Char___init__impl__6a9atx(34), 1);
        initC2TC_0($this, _Char___init__impl__6a9atx(92), 2);
    }
    function initC2ESC($this, c, esc) {
        if (!(esc === _Char___init__impl__6a9atx(117))) {
            var tmp$ret$0 = Char__toInt_impl_vasixd(esc);
            $this.s14_1[tmp$ret$0] = numberToChar(c);
        }
    }
    function initC2ESC_0($this, c, esc) {
        var tmp$ret$0 = Char__toInt_impl_vasixd(c);
        return initC2ESC($this, tmp$ret$0, esc);
    }
    function initC2TC($this, c, cl) {
        $this.t14_1[c] = cl;
    }
    function initC2TC_0($this, c, cl) {
        var tmp$ret$0 = Char__toInt_impl_vasixd(c);
        return initC2TC($this, tmp$ret$0, cl);
    }
    function CharMappings() {
        CharMappings_instance = this;
        this.s14_1 = charArray(117);
        this.t14_1 = new Int8Array(126);
        initEscape(this);
        initCharToToken(this);
    }
    var CharMappings_instance;
    function CharMappings_getInstance() {
        if (CharMappings_instance == null) new CharMappings;
        return CharMappings_instance;
    }
    function StringJsonLexerWithComments(source, configuration) {
        StringJsonLexer.call(this, source, configuration);
    }
    protoOf(StringJsonLexerWithComments).zz = function() {
        var source = this.t11();
        var cpos = this.n14();
        if (cpos >= source.length || cpos === -1) return 10;
        this.hw_1 = cpos + 1 | 0;
        return charToTokenClass(charCodeAt(source, cpos));
    };
    protoOf(StringJsonLexerWithComments).vz = function() {
        var current = this.n14();
        if (current >= this.t11().length || current === -1) return false;
        return this.o14(charCodeAt(this.t11(), current));
    };
    protoOf(StringJsonLexerWithComments).k11 = function(expected) {
        var source = this.t11();
        var current = this.n14();
        if (current >= source.length || current === -1) {
            this.hw_1 = -1;
            this.p14(expected);
        }
        var c = charCodeAt(source, current);
        this.hw_1 = current + 1 | 0;
        if (c === expected) return Unit_instance; else {
            this.p14(expected);
        }
    };
    protoOf(StringJsonLexerWithComments).uz = function() {
        var source = this.t11();
        var cpos = this.n14();
        if (cpos >= source.length || cpos === -1) return 10;
        this.hw_1 = cpos;
        return charToTokenClass(charCodeAt(source, cpos));
    };
    protoOf(StringJsonLexerWithComments).n14 = function() {
        var current = this.hw_1;
        if (current === -1) return current;
        var source = this.t11();
        $l$loop_1: while (current < source.length) {
            var c = charCodeAt(source, current);
            if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9)) {
                current = current + 1 | 0;
                continue $l$loop_1;
            }
            if (c === _Char___init__impl__6a9atx(47) && (current + 1 | 0) < source.length) {
                var tmp0_subject = charCodeAt(source, current + 1 | 0);
                if (tmp0_subject === _Char___init__impl__6a9atx(47)) {
                    current = indexOf_0(source, _Char___init__impl__6a9atx(10), current + 2 | 0);
                    if (current === -1) {
                        current = source.length;
                    } else {
                        current = current + 1 | 0;
                    }
                    continue $l$loop_1;
                } else if (tmp0_subject === _Char___init__impl__6a9atx(42)) {
                    current = indexOf_1(source, '*/', current + 2 | 0);
                    if (current === -1) {
                        this.hw_1 = source.length;
                        this.xy('Expected end of the block comment: "*/", but had EOF instead');
                    } else {
                        current = current + 2 | 0;
                    }
                    continue $l$loop_1;
                }
            }
            break $l$loop_1;
        }
        this.hw_1 = current;
        return current;
    };
    function StringJsonLexer(source, configuration) {
        AbstractJsonLexer.call(this, configuration);
        this.f15_1 = source;
    }
    protoOf(StringJsonLexer).t11 = function() {
        return this.f15_1;
    };
    protoOf(StringJsonLexer).l14 = function(position) {
        return position < this.t11().length ? position : -1;
    };
    protoOf(StringJsonLexer).zz = function() {
        var source = this.t11();
        var cpos = this.hw_1;
        $l$loop: while (!(cpos === -1) && cpos < source.length) {
            var _unary__edvuaz = cpos;
            cpos = _unary__edvuaz + 1 | 0;
            var c = charCodeAt(source, _unary__edvuaz);
            if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9)) continue $l$loop;
            this.hw_1 = cpos;
            return charToTokenClass(c);
        }
        this.hw_1 = source.length;
        return 10;
    };
    protoOf(StringJsonLexer).vz = function() {
        var current = this.hw_1;
        if (current === -1) return false;
        var source = this.t11();
        $l$loop: while (current < source.length) {
            var c = charCodeAt(source, current);
            if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9)) {
                current = current + 1 | 0;
                continue $l$loop;
            }
            this.hw_1 = current;
            return this.o14(c);
        }
        this.hw_1 = current;
        return false;
    };
    protoOf(StringJsonLexer).n14 = function() {
        var current = this.hw_1;
        if (current === -1) return current;
        var source = this.t11();
        $l$loop: while (current < source.length) {
            var c = charCodeAt(source, current);
            if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9)) {
                current = current + 1 | 0;
            } else {
                break $l$loop;
            }
        }
        this.hw_1 = current;
        return current;
    };
    protoOf(StringJsonLexer).k11 = function(expected) {
        if (this.hw_1 === -1) {
            this.p14(expected);
        }
        var source = this.t11();
        var cpos = this.hw_1;
        $l$loop: while (cpos < source.length) {
            var _unary__edvuaz = cpos;
            cpos = _unary__edvuaz + 1 | 0;
            var c = charCodeAt(source, _unary__edvuaz);
            if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9)) continue $l$loop;
            this.hw_1 = cpos;
            if (c === expected) return Unit_instance;
            this.p14(expected);
        }
        this.hw_1 = -1;
        this.p14(expected);
    };
    protoOf(StringJsonLexer).q11 = function() {
        this.k11(_Char___init__impl__6a9atx(34));
        var current = this.hw_1;
        var closingQuote = indexOf_0(this.t11(), _Char___init__impl__6a9atx(34), current);
        if (closingQuote === -1) {
            this.xz();
            var expected = tokenDescription(1);
            var position = false && this.hw_1 > 0 ? this.hw_1 - 1 | 0 : this.hw_1;
            var s = this.hw_1 === charSequenceLength(this.t11()) || position < 0 ? 'EOF' : toString(charSequenceGet(this.t11(), position));
            var tmp$ret$1 = 'Expected ' + expected + ", but had '" + s + "' instead";
            this.xy(tmp$ret$1, position);
        }
        var inductionVariable = current;
        if (inductionVariable < closingQuote) do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            if (charCodeAt(this.t11(), i) === _Char___init__impl__6a9atx(92)) {
                return this.consumeString2(this.t11(), this.hw_1, i);
            }
        } while (inductionVariable < closingQuote);
        this.hw_1 = closingQuote + 1 | 0;
        return substring(this.t11(), current, closingQuote);
    };
    protoOf(StringJsonLexer).s11 = function(keyToMatch, isLenient) {
        var positionSnapshot = this.hw_1;
        try {
            if (!(this.zz() === 6)) return null;
            var firstKey = this.n11(isLenient);
            if (!(firstKey === keyToMatch)) return null;
            this.q14();
            if (!(this.zz() === 5)) return null;
            return this.n11(isLenient);
        } finally {
            this.hw_1 = positionSnapshot;
            this.q14();
        }
    };
    function StringJsonLexer_0(json, source) {
        return !json.tv_1.bx_1 ? new StringJsonLexer(source, json.tv_1) : new StringJsonLexerWithComments(source, json.tv_1);
    }
    function get_schemaCache(_this__u8e3s4) {
        return _this__u8e3s4.vv_1;
    }
    function createMapForCache(initialCapacity) {
        return HashMap_init_$Create$_0(initialCapacity);
    }
    function makeGround($this, kind, cannonX, random) {
        var columns = numberToInt(1e3 / 5) + 1 | 0;
        var tmp = 0;
        var tmp_0 = new Float64Array(3);
        while (tmp < 3) {
            tmp_0[tmp] = random.fe(0, 2 * 3.141592653589793);
            tmp = tmp + 1 | 0;
        }
        var phases = tmp_0;
        var rolling = ArtilleryGame$Companion$makeGround$lambda(phases);
        var bump = ArtilleryGame$Companion$makeGround$lambda_0;
        var size = random.fe(.8, 1.2);
        var tmp_1 = 0;
        var tmp_2 = (columns / 2 | 0) + 1 | 0;
        var tmp_3 = new Float64Array(tmp_2);
        while (tmp_1 < tmp_2) {
            var tmp_4 = tmp_1;
            var t = tmp_4 / (columns / 2 | 0);
            var tmp_5;
            switch (kind) {
              case 'valley':
                tmp_5 = 270 * size - 215 * size * t * t + rolling(t, 12);
                break;

              case 'plateau':
                var cliff = coerceIn((.5 - t) / .08, 0, 1);
                tmp_5 = 70 + 215 * size * cliff * cliff * (3 - 2 * cliff) + rolling(t, 10);
                break;

              case 'peaks':
                tmp_5 = 95 + 270 * size * bump(t, .62, .17) + rolling(t, 16);
                break;

              case 'islands':
                tmp_5 = 38 + 125 * bump(t, cannonX / (1e3 / 2), .2) + 150 * size * bump(t, 1, .2) + rolling(t, 7);
                break;

              default:
                tmp_5 = 110 + rolling(t, 26) + 225 * size * t * t * t;
                break;
            }
            tmp_3[tmp_4] = tmp_5;
            tmp_1 = tmp_1 + 1 | 0;
        }
        var half = tmp_3;
        var flat = half[numberToInt(cannonX / 5)];
        var inductionVariable = 0;
        var last = half.length - 1 | 0;
        if (inductionVariable <= last) do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var x = i * 5;
            var x_0 = x - cannonX;
            var tmp$ret$2 = Math.abs(x_0);
            var blend = coerceIn((tmp$ret$2 - 24) / 60, 0, 1);
            var x_1 = x - cannonX;
            if (Math.abs(x_1) <= 84) {
                half[i] = flat * (1 - blend) + half[i] * blend;
            }
        } while (inductionVariable <= last);
        var tmp_6 = 0;
        var tmp_7 = new Float64Array(columns);
        while (tmp_6 < columns) {
            var tmp_8 = tmp_6;
            var b = (columns - 1 | 0) - tmp_8 | 0;
            var a = half[Math.min(tmp_8, b)];
            var b_0 = Math.min(a, 440);
            tmp_7[tmp_8] = Math.max(24, b_0);
            tmp_6 = tmp_6 + 1 | 0;
        }
        return tmp_7;
    }
    function ArtilleryGame$Companion$makeGround$lambda($phases) {
        return function(t, size) {
            var x = t * 7 + $phases[0];
            var tmp = 26 * Math.sin(x);
            var x_0 = t * 15 + $phases[1];
            var tmp_0 = tmp + 14 * Math.sin(x_0);
            var x_1 = t * 31 + $phases[2];
            return size * (tmp_0 + 7 * Math.sin(x_1)) / 26;
        };
    }
    function ArtilleryGame$Companion$makeGround$lambda_0(t, at, wide) {
        var x = -((t - at) / wide) * ((t - at) / wide);
        return Math.exp(x);
    }
    function Crate(id, x, y) {
        this.g15_1 = id;
        this.h15_1 = x;
        this.i15_1 = y;
        this.j15_1 = true;
    }
    function Blast(at, x, y, style, direct, kind) {
        this.k15_1 = at;
        this.l15_1 = x;
        this.m15_1 = y;
        this.n15_1 = style;
        this.o15_1 = direct;
        this.p15_1 = kind;
    }
    function Landing(x, y, time, direct, crate, onField, vx, vy, atTop) {
        this.q15_1 = x;
        this.r15_1 = y;
        this.s15_1 = time;
        this.t15_1 = direct;
        this.u15_1 = crate;
        this.v15_1 = onField;
        this.w15_1 = vx;
        this.x15_1 = vy;
        this.y15_1 = atTop;
    }
    function newWind($this) {
        return $this.b16_1 === 0 ? 0 : $this.a16_1.ce(-$this.b16_1 | 0, $this.b16_1 + 1 | 0);
    }
    function heightAt($this, x) {
        var at = coerceIn(x / 5, 0, $this.g16_1.length - 1 | 0);
        var left = numberToInt(at);
        var tmp0 = left + 1 | 0;
        var b = $this.g16_1.length - 1 | 0;
        var right = Math.min(tmp0, b);
        return $this.g16_1[left] + ($this.g16_1[right] - $this.g16_1[left]) * (at - left);
    }
    function cannonY($this, side) {
        return heightAt($this, $this.h16_1[side]);
    }
    function fire($this, side, angle, power, weapon) {
        if (!Companion_getInstance_25().l17_1.m1(weapon)) return false;
        if (!(weapon === 'shell')) {
            var tmp0_elvis_lhs = $this.l16_1[side].t1(weapon);
            var left = tmp0_elvis_lhs == null ? 0 : tmp0_elvis_lhs;
            if (left <= 0) return false;
            var tmp0 = $this.l16_1[side];
            var value = left - 1 | 0;
            tmp0.x1(weapon, value);
        }
        $this.j16_1[side] = angle;
        $this.x16_1 = 0;
        $this.k16_1[side] = to(angle, power);
        var radians = angle * 3.141592653589793 / 180;
        var speed = 120 + power / 100 * (620 - 120);
        var tmp = $this.h16_1[side];
        var startX = tmp + Math.cos(radians) * 30;
        var tmp_0 = cannonY($this, side) + 16;
        var startY = tmp_0 + Math.sin(radians) * 30;
        var segments = ArrayList_init_$Create$();
        var bounces = ArrayList_init_$Create$();
        var splits = ArrayList_init_$Create$();
        var blasts = ArrayList_init_$Create$();
        var flight = new Flight($this, side, segments);
        switch (weapon) {
          case 'bouncer':
            var tmp_1 = Math.cos(radians) * speed;
            var tmp$ret$8 = Math.sin(radians);
            var landing = flight.v19(weapon, startX, startY, tmp_1, tmp$ret$8 * speed, 0, false);
            var left_0 = 2;
            $l$loop: while (true) {
                var tmp_2;
                if (landing.v15_1 && landing.t15_1 == null && landing.u15_1 == null && left_0 > 0) {
                    var x = landing.x15_1;
                    tmp_2 = Math.abs(x) > 30;
                } else {
                    tmp_2 = false;
                }
                if (!tmp_2) {
                    break $l$loop;
                }
                left_0 = left_0 - 1 | 0;
                var element = at($this, landing.s15_1, landing.q15_1, landing.r15_1);
                bounces.i(element);
                landing = flight.v19(weapon, landing.q15_1, landing.r15_1 + 2, landing.w15_1 * .8, -landing.x15_1 * .65, landing.s15_1, false);
            }
            if (landing.v15_1) {
                var element_0 = new Blast(landing.s15_1, landing.q15_1, landing.r15_1, getValue(Companion_getInstance_25().m17_1, weapon), landing.t15_1, weapon);
                blasts.i(element_0);
            }
            openFrom($this, landing);
            break;

          case 'cluster':
            var tmp_3 = Math.cos(radians) * speed;
            var tmp$ret$13 = Math.sin(radians);
            var top = flight.v19(weapon, startX, startY, tmp_3, tmp$ret$13 * speed, 0, true);
            if (top.v15_1 && !top.y15_1) {
                var element_1 = new Blast(top.s15_1, top.q15_1, top.r15_1, getValue(Companion_getInstance_25().m17_1, 'bomblet'), top.t15_1, 'bomblet');
                blasts.i(element_1);
                openFrom($this, top);
            } else if (top.y15_1) {
                var element_2 = at($this, top.s15_1, top.q15_1, top.r15_1);
                splits.i(element_2);
                var inductionVariable = 0;
                if (inductionVariable < 5) do {
                    var i = inductionVariable;
                    inductionVariable = inductionVariable + 1 | 0;
                    var offset = (i - 4 / 2) * 55;
                    var landing_0 = flight.v19('bomblet', top.q15_1, top.r15_1, top.w15_1 + offset, top.x15_1, top.s15_1, false);
                    if (landing_0.v15_1) {
                        var element_3 = new Blast(landing_0.s15_1, landing_0.q15_1, landing_0.r15_1, getValue(Companion_getInstance_25().m17_1, 'bomblet'), landing_0.t15_1, 'bomblet');
                        blasts.i(element_3);
                    }
                    openFrom($this, landing_0);
                } while (inductionVariable < 5);
            }
            break;

          default:
            var tmp_4 = Math.cos(radians) * speed;
            var tmp$ret$18 = Math.sin(radians);
            var landing_1 = flight.v19(weapon, startX, startY, tmp_4, tmp$ret$18 * speed, 0, false);
            if (landing_1.v15_1) {
                var element_4 = new Blast(landing_1.s15_1, landing_1.q15_1, landing_1.r15_1, getValue(Companion_getInstance_25().m17_1, weapon), landing_1.t15_1, weapon);
                blasts.i(element_4);
            }
            openFrom($this, landing_1);
            break;
        }
        var _destruct__k2r9zo = resolve($this, side, blasts, toList_1($this.d17_1));
        var done = _destruct__k2r9zo.sb();
        var opened = _destruct__k2r9zo.tb();
        $this.d17_1.l3();
        $this.u16_1 = $this.u16_1 + 1 | 0;
        judge($this);
        var finale = !($this.b17_1 == null);
        var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(segments, 10));
        var _iterator__ex2g4s = segments.j();
        while (_iterator__ex2g4s.k()) {
            var item = _iterator__ex2g4s.l();
            var tmp$ret$22 = toDouble(get_jsonPrimitive(getValue(item, 'start')).kx()) + toDouble(get_jsonPrimitive(getValue(item, 'ms')).kx());
            destination.i(tmp$ret$22);
        }
        var tmp_5 = destination;
        var destination_0 = ArrayList_init_$Create$_0(collectionSizeOrDefault(done, 10));
        var _iterator__ex2g4s_0 = done.j();
        while (_iterator__ex2g4s_0.k()) {
            var item_0 = _iterator__ex2g4s_0.l();
            var tmp$ret$25 = toDouble(get_jsonPrimitive(getValue(item_0, 't')).kx());
            destination_0.i(tmp$ret$25);
        }
        var tmp_6 = plus(tmp_5, destination_0);
        var destination_1 = ArrayList_init_$Create$_0(collectionSizeOrDefault(opened, 10));
        var _iterator__ex2g4s_1 = opened.j();
        while (_iterator__ex2g4s_1.k()) {
            var item_1 = _iterator__ex2g4s_1.l();
            var tmp$ret$28 = toDouble(get_jsonPrimitive(getValue(item_1, 't')).kx());
            destination_1.i(tmp$ret$28);
        }
        var tmp2_elvis_lhs = maxOrNull(plus(tmp_6, destination_1));
        var finish = tmp2_elvis_lhs == null ? 0 : tmp2_elvis_lhs;
        var tmp_7 = $this;
        var builder = new JsonObjectBuilder;
        put(builder, 'seq', $this.u16_1);
        put(builder, 'side', side);
        put_0(builder, 'weapon', weapon);
        put(builder, 'angle', angle);
        put(builder, 'power', power);
        builder.ux('segments', new JsonArray(segments));
        builder.ux('bounces', new JsonArray(bounces));
        builder.ux('splits', new JsonArray(splits));
        builder.ux('blasts', new JsonArray(done));
        builder.ux('opened', new JsonArray(opened));
        put_1(builder, 'finale', finale);
        put(builder, 'slow', finale ? 1.6 : 1);
        tmp_7.t16_1 = builder.vx();
        var tmp_8 = $this;
        var tmp_9;
        if (finale) {
            var x_0 = finish * 1.6;
            var tmp$ret$31 = Math.ceil(x_0);
            tmp_9 = numberToInt(tmp$ret$31) + 2600 | 0;
        } else {
            var tmp$ret$32 = Math.ceil(finish);
            tmp_9 = numberToInt(tmp$ret$32) + 1100 | 0;
        }
        tmp_8.s16_1 = tmp_9;
        return true;
    }
    function drive($this, side, direction) {
        var path = mutableListOf([ to($this.h16_1[side], cannonY($this, side)) ]);
        var travelled = 0;
        var met = ArrayList_init_$Create$();
        var rivalX = $this.h16_1[1 - side | 0];
        $l$loop: while (travelled < 75) {
            var x = $this.h16_1[side] + direction * 2.5;
            var tmp;
            if (x < 40 || x > 1e3 - 40) {
                tmp = true;
            } else {
                var x_0 = x - rivalX;
                tmp = Math.abs(x_0) < 60;
            }
            if (tmp) break $l$loop;
            var tmp_0 = travelled;
            var y = heightAt($this, x) - heightAt($this, $this.h16_1[side]);
            travelled = tmp_0 + hypot(2.5, y);
            $this.h16_1[side] = x;
            var element = to(x, cannonY($this, side));
            path.i(element);
            var _iterator__ex2g4s = $this.m16_1.j();
            while (_iterator__ex2g4s.k()) {
                var crate = _iterator__ex2g4s.l();
                var tmp_1;
                var tmp$ret$4;
                $l$block_0: {
                    var tmp_2;
                    if (isInterface(met, Collection)) {
                        tmp_2 = met.n();
                    } else {
                        tmp_2 = false;
                    }
                    if (tmp_2) {
                        tmp$ret$4 = true;
                        break $l$block_0;
                    }
                    var _iterator__ex2g4s_0 = met.j();
                    while (_iterator__ex2g4s_0.k()) {
                        var element_0 = _iterator__ex2g4s_0.l();
                        if (element_0.nb_1 === crate) {
                            tmp$ret$4 = false;
                            break $l$block_0;
                        }
                    }
                    tmp$ret$4 = true;
                }
                if (tmp$ret$4) {
                    tmp_1 = within($this, crate, side);
                } else {
                    tmp_1 = false;
                }
                if (tmp_1) {
                    var element_1 = to(crate, path.m());
                    met.i(element_1);
                }
            }
        }
        if (path.m() < 2) return false;
        var b = travelled / 70 * 1e3;
        var ms = Math.max(300, b);
        var tmp_3 = emptyList();
        var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(met, 10));
        var _iterator__ex2g4s_1 = met.j();
        while (_iterator__ex2g4s_1.k()) {
            var item = _iterator__ex2g4s_1.l();
            var crate_0 = item.sb();
            var at = item.tb();
            var tmp$ret$10 = to(crate_0, ms * at / path.m());
            destination.i(tmp$ret$10);
        }
        var _destruct__k2r9zo = resolve($this, side, tmp_3, destination);
        var done = _destruct__k2r9zo.sb();
        var opened = _destruct__k2r9zo.tb();
        $this.w16_1 = $this.w16_1 + 1 | 0;
        var tmp_4 = $this;
        var builder = new JsonObjectBuilder;
        put(builder, 'seq', $this.w16_1);
        put(builder, 'side', side);
        put(builder, 'ms', ms);
        var destination_0 = ArrayList_init_$Create$_0(collectionSizeOrDefault(path, 10));
        var _iterator__ex2g4s_2 = path.j();
        while (_iterator__ex2g4s_2.k()) {
            var item_0 = _iterator__ex2g4s_2.l();
            var px = item_0.sb();
            var py = item_0.tb();
            var tmp$ret$15 = new JsonArray(listOf_0([ JsonPrimitive_0(roundToInt(px)), JsonPrimitive_0(roundToInt(py)) ]));
            destination_0.i(tmp$ret$15);
        }
        builder.ux('path', new JsonArray(destination_0));
        builder.ux('blasts', new JsonArray(done));
        builder.ux('opened', new JsonArray(opened));
        tmp_4.v16_1 = builder.vx();
        var destination_1 = ArrayList_init_$Create$_0(collectionSizeOrDefault(done, 10));
        var _iterator__ex2g4s_3 = done.j();
        while (_iterator__ex2g4s_3.k()) {
            var item_1 = _iterator__ex2g4s_3.l();
            var tmp$ret$18 = toDouble(get_jsonPrimitive(getValue(item_1, 't')).kx());
            destination_1.i(tmp$ret$18);
        }
        var tmp_5 = destination_1;
        var destination_2 = ArrayList_init_$Create$_0(collectionSizeOrDefault(opened, 10));
        var _iterator__ex2g4s_4 = opened.j();
        while (_iterator__ex2g4s_4.k()) {
            var item_2 = _iterator__ex2g4s_4.l();
            var tmp$ret$21 = toDouble(get_jsonPrimitive(getValue(item_2, 't')).kx());
            destination_2.i(tmp$ret$21);
        }
        var finish = max(plus_0(plus(tmp_5, destination_2), ms));
        var tmp_6 = $this;
        var tmp$ret$22 = Math.ceil(finish);
        tmp_6.s16_1 = numberToInt(tmp$ret$22) + 300 | 0;
        judge($this);
        return true;
    }
    function within($this, crate, side) {
        var tmp;
        var x = crate.h15_1 - $this.h16_1[side];
        if (Math.abs(x) <= 22 + 20) {
            tmp = crate.i15_1 - (cannonY($this, side) + 16) <= 22 + 20;
        } else {
            tmp = false;
        }
        return tmp;
    }
    function collectFallen($this) {
        var tmp0 = $this.m16_1;
        var destination = ArrayList_init_$Create$();
        var _iterator__ex2g4s = tmp0.j();
        while (_iterator__ex2g4s.k()) {
            var element = _iterator__ex2g4s.l();
            if (!element.j15_1) {
                destination.i(element);
            }
        }
        var destination_0 = ArrayList_init_$Create$();
        var _iterator__ex2g4s_0 = destination.j();
        while (_iterator__ex2g4s_0.k()) {
            var element_0 = _iterator__ex2g4s_0.l();
            var tmp0_0 = numberRangeToNumber(0, 1);
            var tmp$ret$8;
            $l$block: {
                var inductionVariable = tmp0_0.w_1;
                var last = tmp0_0.x_1;
                if (inductionVariable <= last) do {
                    var element_1 = inductionVariable;
                    inductionVariable = inductionVariable + 1 | 0;
                    var it = element_1;
                    if (within($this, element_0, it)) {
                        tmp$ret$8 = element_1;
                        break $l$block;
                    }
                } while (!(element_1 === last));
                tmp$ret$8 = null;
            }
            var tmp0_safe_receiver = tmp$ret$8;
            var tmp;
            if (tmp0_safe_receiver == null) {
                tmp = null;
            } else {
                tmp = to(element_0, tmp0_safe_receiver);
            }
            var tmp0_safe_receiver_0 = tmp;
            if (tmp0_safe_receiver_0 == null) null; else {
                destination_0.i(tmp0_safe_receiver_0);
            }
        }
        var takers = destination_0;
        var _iterator__ex2g4s_1 = takers.j();
        while (_iterator__ex2g4s_1.k()) {
            var _destruct__k2r9zo = _iterator__ex2g4s_1.l();
            var crate = _destruct__k2r9zo.sb();
            var side = _destruct__k2r9zo.tb();
            var _destruct__k2r9zo_0 = resolve($this, side, emptyList(), listOf(to(crate, 0)));
            var done = _destruct__k2r9zo_0.sb();
            var opened = _destruct__k2r9zo_0.tb();
            $this.z16_1 = $this.z16_1 + 1 | 0;
            var tmp_0 = $this;
            var builder = new JsonObjectBuilder;
            put(builder, 'seq', $this.z16_1);
            put(builder, 'side', side);
            builder.ux('blasts', new JsonArray(done));
            builder.ux('opened', new JsonArray(opened));
            tmp_0.y16_1 = builder.vx();
            if (!done.n()) {
                var tmp_1 = $this;
                var iterator = done.j();
                if (!iterator.k()) throw NoSuchElementException_init_$Create$();
                var it_0 = iterator.l();
                var maxValue = toDouble(get_jsonPrimitive(getValue(it_0, 't')).kx());
                while (iterator.k()) {
                    var it_1 = iterator.l();
                    var v = toDouble(get_jsonPrimitive(getValue(it_1, 't')).kx());
                    var a = maxValue;
                    maxValue = Math.max(a, v);
                }
                var x = maxValue;
                var tmp$ret$21 = Math.ceil(x);
                tmp_1.s16_1 = numberToInt(tmp$ret$21) + 1100 | 0;
                $this.a17_1 = true;
                judge($this);
            }
        }
    }
    function resolve($this, side, blasts, opens) {
        var opened = ArrayList_init_$Create$();
        var done = ArrayList_init_$Create$();
        var tmp = ArtilleryGame$resolve$lambda;
        var tmp$ret$3 = new sam$kotlin_Comparator$0_0(tmp);
        var tmp$ret$2 = sortedWith(blasts, tmp$ret$3);
        var queue = toMutableList_0(tmp$ret$2);
        var index = 0;
        var _iterator__ex2g4s = opens.j();
        while (_iterator__ex2g4s.k()) {
            var _destruct__k2r9zo = _iterator__ex2g4s.l();
            var crate = _destruct__k2r9zo.sb();
            var time = _destruct__k2r9zo.tb();
            if ($this.m16_1.m1(crate)) {
                resolve$open($this, side, queue, opened, crate, time);
            }
        }
        while (index < queue.m()) {
            var _unary__edvuaz = index;
            index = _unary__edvuaz + 1 | 0;
            var blast = queue.p(_unary__edvuaz);
            var damage = new Int32Array(2);
            var inductionVariable = 0;
            if (inductionVariable <= 1) do {
                var who = inductionVariable;
                inductionVariable = inductionVariable + 1 | 0;
                var tmp0 = blast.l15_1 - $this.h16_1[who];
                var y = blast.m15_1 - (cannonY($this, who) + 16 / 2);
                var distance = hypot(tmp0, y);
                var tmp_0;
                if (who === blast.o15_1) {
                    tmp_0 = blast.n15_1.z19_1;
                } else if (distance < blast.n15_1.x19_1) {
                    var b = roundToInt(blast.n15_1.a1a_1 * (1 - distance / blast.n15_1.x19_1));
                    tmp_0 = Math.max(1, b);
                } else {
                    tmp_0 = 0;
                }
                damage[who] = tmp_0;
                var b_0 = $this.i16_1[who] - damage[who] | 0;
                var tmp$ret$6 = Math.max(0, b_0);
                $this.i16_1[who] = tmp$ret$6;
            } while (inductionVariable <= 1);
            var _iterator__ex2g4s_0 = toList_1($this.m16_1).j();
            while (_iterator__ex2g4s_0.k()) {
                var crate_0 = _iterator__ex2g4s_0.l();
                var tmp0_0 = blast.l15_1 - crate_0.h15_1;
                var y_0 = blast.m15_1 - crate_0.i15_1;
                if (hypot(tmp0_0, y_0) <= blast.n15_1.x19_1 + 22) {
                    resolve$open($this, side, queue, opened, crate_0, blast.k15_1 + 120);
                }
            }
            carve($this, blast.l15_1, blast.m15_1, blast.n15_1.y19_1);
            var builder = new JsonObjectBuilder;
            put(builder, 't', blast.k15_1);
            put(builder, 'x', blast.l15_1);
            put(builder, 'y', blast.m15_1);
            put_0(builder, 'kind', blast.p15_1);
            put_0(builder, 'size', blast.n15_1.w19_1);
            put(builder, 'direct', blast.o15_1);
            var destination = ArrayList_init_$Create$_0(damage.length);
            var inductionVariable_0 = 0;
            var last = damage.length;
            while (inductionVariable_0 < last) {
                var item = damage[inductionVariable_0];
                inductionVariable_0 = inductionVariable_0 + 1 | 0;
                var tmp$ret$12 = JsonPrimitive_0(item);
                destination.i(tmp$ret$12);
            }
            builder.ux('damage', new JsonArray(destination));
            var element = builder.vx();
            done.i(element);
        }
        settleCrates($this);
        return to(done, opened);
    }
    function judge($this) {
        var tmp = $this;
        var tmp_0;
        var tmp0 = $this.i16_1;
        var tmp$ret$0;
        $l$block: {
            var inductionVariable = 0;
            var last = tmp0.length;
            while (inductionVariable < last) {
                var element = tmp0[inductionVariable];
                inductionVariable = inductionVariable + 1 | 0;
                if (!(element === 0)) {
                    tmp$ret$0 = false;
                    break $l$block;
                }
            }
            tmp$ret$0 = true;
        }
        if (tmp$ret$0) {
            tmp_0 = 'draw';
        } else {
            if ($this.i16_1[0] === 0) {
                tmp_0 = $this.z15_1.p(1);
            } else {
                if ($this.i16_1[1] === 0) {
                    tmp_0 = $this.z15_1.p(0);
                } else {
                    tmp_0 = null;
                }
            }
        }
        tmp.b17_1 = tmp_0;
    }
    function openFrom($this, landing) {
        if (!(landing.u15_1 == null)) {
            var tmp0 = $this.d17_1;
            var element = to(landing.u15_1, landing.s15_1);
            tmp0.i(element);
        }
    }
    function at($this, time, x, y) {
        var builder = new JsonObjectBuilder;
        put(builder, 't', time);
        put(builder, 'x', x);
        put(builder, 'y', y);
        return builder.vx();
    }
    function Flight($outer, side, segments) {
        this.u19_1 = $outer;
        this.s19_1 = side;
        this.t19_1 = segments;
    }
    protoOf(Flight).v19 = function(kind, fromX, fromY, startVx, startVy, startMs, splitsAtTop) {
        var x = fromX;
        var y = fromY;
        var vx = startVx;
        var vy = startVy;
        var time = startMs / 1e3;
        var began = time;
        var path = mutableListOf([ to(x, y) ]);
        var steps = 0;
        var direct = null;
        var crate = null;
        var onField = false;
        var wasRising = vy > 0;
        var atTop = false;
        $l$loop_1: while (time - began < 9) {
            x = x + vx * .008333333333333333;
            y = y + vy * .008333333333333333;
            vy = vy - 300 * .008333333333333333;
            vx = vx + this.u19_1.p16_1 * 10 * .008333333333333333;
            time = time + .008333333333333333;
            steps = steps + 1 | 0;
            if ((steps % 4 | 0) === 0) {
                var element = to(x, y);
                path.i(element);
            }
            if (x < -80 || x > 1e3 + 80) break $l$loop_1;
            var tmp0 = numberRangeToNumber(0, 1);
            var tmp$ret$1;
            $l$block: {
                var inductionVariable = tmp0.w_1;
                var last = tmp0.x_1;
                if (inductionVariable <= last) do {
                    var element_0 = inductionVariable;
                    inductionVariable = inductionVariable + 1 | 0;
                    var who = element_0;
                    var tmp;
                    if (!(who === this.s19_1) || time > .25) {
                        var tmp0_0 = x - this.u19_1.h16_1[who];
                        var y_0 = y - (cannonY(this.u19_1, who) + 16 / 2);
                        tmp = hypot(tmp0_0, y_0) <= 20;
                    } else {
                        tmp = false;
                    }
                    if (tmp) {
                        tmp$ret$1 = element_0;
                        break $l$block;
                    }
                } while (!(element_0 === last));
                tmp$ret$1 = null;
            }
            direct = tmp$ret$1;
            var tmp0_1 = this.u19_1.m16_1;
            var tmp$ret$4;
            $l$block_0: {
                var _iterator__ex2g4s = tmp0_1.j();
                while (_iterator__ex2g4s.k()) {
                    var element_1 = _iterator__ex2g4s.l();
                    var tmp0_2 = x - element_1.h15_1;
                    var y_1 = y - element_1.i15_1;
                    if (hypot(tmp0_2, y_1) <= 22) {
                        tmp$ret$4 = element_1;
                        break $l$block_0;
                    }
                }
                tmp$ret$4 = null;
            }
            crate = tmp$ret$4;
            if (!(direct == null) || !(crate == null) || (0 <= x ? x <= 1e3 : false) && y <= heightAt(this.u19_1, x)) {
                onField = true;
                break $l$loop_1;
            }
            if (splitsAtTop && wasRising && vy <= 0) {
                atTop = true;
                break $l$loop_1;
            }
            wasRising = vy > 0;
        }
        var element_2 = to(x, y);
        path.i(element_2);
        var tmp0_3 = this.t19_1;
        var builder = new JsonObjectBuilder;
        put_0(builder, 'kind', kind);
        put(builder, 'start', startMs);
        put(builder, 'ms', (time - began) * 1e3);
        var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(path, 10));
        var _iterator__ex2g4s_0 = path.j();
        while (_iterator__ex2g4s_0.k()) {
            var item = _iterator__ex2g4s_0.l();
            var px = item.sb();
            var py = item.tb();
            var tmp$ret$12 = new JsonArray(listOf_0([ JsonPrimitive_0(roundToInt(px)), JsonPrimitive_0(roundToInt(py)) ]));
            destination.i(tmp$ret$12);
        }
        builder.ux('path', new JsonArray(destination));
        var element_3 = builder.vx();
        tmp0_3.i(element_3);
        return new Landing(x, y, time * 1e3, direct, crate, onField, vx, vy, atTop);
    };
    function aimPath($this) {
        if ($this.x16_1 <= 0 || $this.s16_1 > 0 || !($this.c17_1 == null)) return new JsonArray(emptyList());
        var radians = $this.j16_1[$this.q16_1] * 3.141592653589793 / 180;
        var speed = 120 + $this.x16_1 / 100 * (620 - 120);
        var tmp = $this.h16_1[$this.q16_1];
        var x = tmp + Math.cos(radians) * 30;
        var tmp_0 = cannonY($this, $this.q16_1) + 16;
        var y = tmp_0 + Math.sin(radians) * 30;
        var vx0 = Math.cos(radians) * speed;
        var vx = vx0;
        var vy = Math.sin(radians) * speed;
        var points = ArrayList_init_$Create$();
        var time = 0;
        var next = .075;
        while (time < .95 && (0 <= x ? x <= 1e3 : false) && y > heightAt($this, x)) {
            x = x + vx * .008333333333333333;
            y = y + vy * .008333333333333333;
            vy = vy - 300 * .008333333333333333;
            vx = vx + $this.p16_1 * 10 * .008333333333333333;
            time = time + .008333333333333333;
            if (time >= next) {
                var element = new JsonArray(listOf_0([ JsonPrimitive_0(roundToInt(x)), JsonPrimitive_0(roundToInt(y)) ]));
                points.i(element);
                next = next + .075;
            }
        }
        return new JsonArray(points);
    }
    function carve($this, x, y, radius) {
        var inductionVariable = 0;
        var last = $this.g16_1.length - 1 | 0;
        if (inductionVariable <= last) $l$loop: do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var x_0 = i * 5 - x;
            var dx = Math.abs(x_0);
            if (dx >= radius) continue $l$loop;
            var tmp0 = $this.g16_1[i];
            var x_1 = radius * radius - dx * dx;
            var b = y - Math.sqrt(x_1);
            var b_0 = Math.min(tmp0, b);
            var tmp$ret$3 = Math.max(24, b_0);
            $this.g16_1[i] = tmp$ret$3;
        } while (inductionVariable <= last);
    }
    function settleCrates($this) {
        var _iterator__ex2g4s = $this.m16_1.j();
        while (_iterator__ex2g4s.k()) {
            var crate = _iterator__ex2g4s.l();
            var floor = heightAt($this, crate.h15_1) + 22;
            if (!crate.j15_1 || crate.i15_1 <= floor) {
                crate.i15_1 = floor;
                crate.j15_1 = false;
            }
        }
    }
    function nextTurn($this) {
        $this.q16_1 = 1 - $this.q16_1 | 0;
        $this.r16_1 = 30;
        $this.x16_1 = 0;
        $this.p16_1 = newWind($this);
        $this.o16_1 = $this.o16_1 + 1 | 0;
        var _iterator__ex2g4s = $this.m16_1.j();
        while (_iterator__ex2g4s.k()) {
            var crate = _iterator__ex2g4s.l();
            if (crate.j15_1) {
                crate.i15_1 = crate.i15_1 - 130;
            }
        }
        settleCrates($this);
        collectFallen($this);
        if ($this.c16_1 > 0 && $this.o16_1 >= $this.c16_1 && $this.m16_1.m() < 2) {
            $this.o16_1 = 0;
            var tmp0 = $this.m16_1;
            var _unary__edvuaz = $this.n16_1;
            $this.n16_1 = _unary__edvuaz + 1 | 0;
            var element = new Crate(_unary__edvuaz, $this.a16_1.fe(170, 1e3 - 170), 440);
            tmp0.i(element);
        }
    }
    function common($this, $receiver) {
        put_0($receiver, 'game', Artillery_getInstance().b1a_1);
        put_0($receiver, 'map', $this.e16_1);
        put_0($receiver, 'phase', !($this.c17_1 == null) ? 'over' : $this.s16_1 > 0 ? 'flying' : 'aiming');
        var this_0 = $this.z15_1;
        var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_0, 10));
        var _iterator__ex2g4s = this_0.j();
        while (_iterator__ex2g4s.k()) {
            var item = _iterator__ex2g4s.l();
            var tmp$ret$2 = JsonPrimitive_1(item);
            destination.i(tmp$ret$2);
        }
        $receiver.ux('sides', new JsonArray(destination));
        put($receiver, 'turn', $this.q16_1);
        put($receiver, 'clock', !($this.c17_1 == null) ? 0 : $this.r16_1);
        var this_1 = $this.i16_1;
        var destination_0 = ArrayList_init_$Create$_0(this_1.length);
        var inductionVariable = 0;
        var last = this_1.length;
        while (inductionVariable < last) {
            var item_0 = this_1[inductionVariable];
            inductionVariable = inductionVariable + 1 | 0;
            var tmp$ret$5 = JsonPrimitive_0(item_0);
            destination_0.i(tmp$ret$5);
        }
        $receiver.ux('hull', new JsonArray(destination_0));
        put($receiver, 'hullMax', 100);
        var this_2 = $this.j16_1;
        var destination_1 = ArrayList_init_$Create$_0(this_2.length);
        var inductionVariable_0 = 0;
        var last_0 = this_2.length;
        while (inductionVariable_0 < last_0) {
            var item_1 = this_2[inductionVariable_0];
            inductionVariable_0 = inductionVariable_0 + 1 | 0;
            var tmp$ret$8 = JsonPrimitive_0(item_1);
            destination_1.i(tmp$ret$8);
        }
        $receiver.ux('aims', new JsonArray(destination_1));
        $receiver.ux('aimPath', aimPath($this));
        put($receiver, 'wind', $this.p16_1);
        put($receiver, 'maxWind', 4);
        var this_3 = $this.l16_1;
        var destination_2 = ArrayList_init_$Create$_0(this_3.length);
        var inductionVariable_1 = 0;
        var last_1 = this_3.length;
        while (inductionVariable_1 < last_1) {
            var item_2 = this_3[inductionVariable_1];
            inductionVariable_1 = inductionVariable_1 + 1 | 0;
            var result = LinkedHashMap_init_$Create$();
            var _iterator__ex2g4s_0 = item_2.w1().j();
            while (_iterator__ex2g4s_0.k()) {
                var entry = _iterator__ex2g4s_0.l();
                if (entry.q1() > 0) {
                    result.x1(entry.p1(), entry.q1());
                }
            }
            var destination_3 = LinkedHashMap_init_$Create$_0(mapCapacity(result.m()));
            var _iterator__ex2g4s_1 = result.w1().j();
            while (_iterator__ex2g4s_1.k()) {
                var element = _iterator__ex2g4s_1.l();
                var tmp = element.p1();
                var tmp$ret$19 = JsonPrimitive_0(element.q1());
                destination_3.x1(tmp, tmp$ret$19);
            }
            var tmp$ret$11 = new JsonObject(destination_3);
            destination_2.i(tmp$ret$11);
        }
        $receiver.ux('arsenals', new JsonArray(destination_2));
        put($receiver, 'shots', $this.u16_1);
        put($receiver, 'drives', $this.w16_1);
        put_0($receiver, 'winner', $this.c17_1);
    }
    function BlastStyle(size, radius, crater, direct, splash) {
        this.w19_1 = size;
        this.x19_1 = radius;
        this.y19_1 = crater;
        this.z19_1 = direct;
        this.a1a_1 = splash;
    }
    function Companion_25() {
        Companion_instance_25 = this;
        this.e17_1 = 'shell';
        this.f17_1 = 'cluster';
        this.g17_1 = 'bouncer';
        this.h17_1 = 'mega';
        this.i17_1 = 'bomblet';
        this.j17_1 = 'repair';
        this.k17_1 = 'surprise';
        this.l17_1 = setOf_0([ 'shell', 'cluster', 'bouncer', 'mega' ]);
        this.m17_1 = mapOf_0([ to('shell', new BlastStyle('normal', 70, 42, 40, 28)), to('bouncer', new BlastStyle('normal', 80, 46, 45, 32)), to('mega', new BlastStyle('huge', 135, 85, 65, 48)), to('bomblet', new BlastStyle('small', 45, 24, 15, 12)), to('surprise', new BlastStyle('normal', 75, 40, 30, 30)) ]);
        this.n17_1 = 1e3;
        this.o17_1 = 562;
        this.p17_1 = 5;
        this.q17_1 = 100;
        this.r17_1 = 24;
        this.s17_1 = 30;
        this.t17_1 = 16;
        this.u17_1 = 20;
        this.v17_1 = 80;
        this.w17_1 = .25;
        this.x17_1 = 120;
        this.y17_1 = 620;
        this.z17_1 = 300;
        this.a18_1 = .008333333333333333;
        this.b18_1 = 4;
        this.c18_1 = 9;
        this.d18_1 = 1100;
        this.e18_1 = 1.6;
        this.f18_1 = 2600;
        this.g18_1 = 30;
        this.h18_1 = 200;
        this.i18_1 = 4;
        this.j18_1 = 10;
        this.k18_1 = .95;
        this.l18_1 = .075;
        this.m18_1 = 75;
        this.n18_1 = 2.5;
        this.o18_1 = 70;
        this.p18_1 = 300;
        this.q18_1 = 40;
        this.r18_1 = 60;
        this.s18_1 = 300;
        this.t18_1 = 2;
        this.u18_1 = .8;
        this.v18_1 = .65;
        this.w18_1 = 30;
        this.x18_1 = 5;
        this.y18_1 = 55;
        this.z18_1 = 2;
        this.a19_1 = 2;
        this.b19_1 = 22;
        this.c19_1 = 440;
        this.d19_1 = 130;
        this.e19_1 = 170;
        this.f19_1 = 25;
        this.g19_1 = 250;
        this.h19_1 = 120;
        this.i19_1 = 'ridge';
        this.j19_1 = 'valley';
        this.k19_1 = 'plateau';
        this.l19_1 = 'peaks';
        this.m19_1 = 'islands';
        this.n19_1 = listOf_0([ 'ridge', 'valley', 'plateau', 'peaks', 'islands' ]);
        this.o19_1 = 92;
        this.p19_1 = 85;
        this.q19_1 = 170;
        this.r19_1 = 440;
    }
    protoOf(Companion_25).d1a = function(random) {
        var roll = random.o(100);
        return roll < 28 ? 'cluster' : roll < 56 ? 'bouncer' : roll < 70 ? 'mega' : roll < 86 ? 'repair' : 'surprise';
    };
    var Companion_instance_25;
    function Companion_getInstance_25() {
        if (Companion_instance_25 == null) new Companion_25;
        return Companion_instance_25;
    }
    function sam$kotlin_Comparator$0_0(function_0) {
        this.e1a_1 = function_0;
    }
    protoOf(sam$kotlin_Comparator$0_0).ia = function(a, b) {
        return this.e1a_1(a, b);
    };
    protoOf(sam$kotlin_Comparator$0_0).compare = function(a, b) {
        return this.ia(a, b);
    };
    protoOf(sam$kotlin_Comparator$0_0).k2 = function() {
        return this.e1a_1;
    };
    protoOf(sam$kotlin_Comparator$0_0).equals = function(other) {
        var tmp;
        if (!(other == null) ? isInterface(other, Comparator) : false) {
            var tmp_0;
            if (!(other == null) ? isInterface(other, FunctionAdapter) : false) {
                tmp_0 = equals(this.k2(), other.k2());
            } else {
                tmp_0 = false;
            }
            tmp = tmp_0;
        } else {
            tmp = false;
        }
        return tmp;
    };
    protoOf(sam$kotlin_Comparator$0_0).hashCode = function() {
        return hashCode_0(this.k2());
    };
    function ArtilleryGame$Companion$randomContents$ref(p0) {
        return constructCallableReference((function(p0_0) {
            return p0.d1a(p0_0);
        }), 1, 0, 7, 'randomContents', [ p0 ]);
    }
    function ArtilleryGame$resolve$lambda(a, b) {
        var tmp = a.k15_1;
        var tmp$ret$2 = b.k15_1;
        return compareValues(tmp, tmp$ret$2);
    }
    function resolve$open(this$0, $side, queue, opened, crate, time) {
        this$0.m16_1.x2(crate);
        var holds = this$0.d16_1(this$0.a16_1);
        switch (holds) {
          case 'repair':
            var b = this$0.i16_1[$side] + 25 | 0;
            var tmp$ret$0 = Math.min(100, b);
            this$0.i16_1[$side] = tmp$ret$0;
            break;

          case 'surprise':
            var element = new Blast(time + 250, crate.h15_1, crate.i15_1, getValue(Companion_getInstance_25().m17_1, 'surprise'), null, 'surprise');
            queue.i(element);
            break;

          default:
            var tmp0 = this$0.l16_1[$side];
            var tmp1_elvis_lhs = this$0.l16_1[$side].t1(holds);
            var value = (tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs) + 1 | 0;
            tmp0.x1(holds, value);
            break;
        }
        var builder = new JsonObjectBuilder;
        put(builder, 'id', crate.g15_1);
        put(builder, 'x', crate.h15_1);
        put(builder, 'y', crate.i15_1);
        put(builder, 't', time);
        put_0(builder, 'holds', holds);
        var element_0 = builder.vx();
        opened.i(element_0);
    }
    function ArtilleryGame(players, random_0, maxWind, cratesEvery, crateHolds, map) {
        Companion_getInstance_25();
        maxWind = maxWind === VOID ? 4 : maxWind;
        cratesEvery = cratesEvery === VOID ? 2 : cratesEvery;
        var tmp;
        if (crateHolds === VOID) {
            tmp = ArtilleryGame$Companion$randomContents$ref(Companion_getInstance_25());
        } else {
            tmp = crateHolds;
        }
        crateHolds = tmp;
        map = map === VOID ? null : map;
        this.z15_1 = players;
        this.a16_1 = random_0;
        this.b16_1 = maxWind;
        this.c16_1 = cratesEvery;
        this.d16_1 = crateHolds;
        var tmp_0 = this;
        tmp_0.e16_1 = map == null ? random(Companion_getInstance_25().n19_1, this.a16_1) : map;
        this.f16_1 = this.a16_1.fe(85, 170);
        this.g16_1 = makeGround(Companion_getInstance_25(), this.e16_1, this.f16_1, this.a16_1);
        var tmp_1 = this;
        tmp_1.h16_1 = new Float64Array([ this.f16_1, 1e3 - this.f16_1 ]);
        var tmp_2 = this;
        var tmp_3 = 0;
        var tmp_4 = new Int32Array(2);
        while (tmp_3 < 2) {
            tmp_4[tmp_3] = 100;
            tmp_3 = tmp_3 + 1 | 0;
        }
        tmp_2.i16_1 = tmp_4;
        var tmp_5 = this;
        tmp_5.j16_1 = new Float64Array([ 45, 135 ]);
        var tmp_6 = this;
        tmp_6.k16_1 = Array(2);
        var tmp_7 = this;
        var tmp_8 = 0;
        var tmp_9 = Array(2);
        while (tmp_8 < 2) {
            tmp_9[tmp_8] = LinkedHashMap_init_$Create$();
            tmp_8 = tmp_8 + 1 | 0;
        }
        tmp_7.l16_1 = tmp_9;
        var tmp_10 = this;
        tmp_10.m16_1 = ArrayList_init_$Create$();
        this.n16_1 = 0;
        this.o16_1 = 0;
        this.p16_1 = newWind(this);
        this.q16_1 = this.a16_1.o(2);
        this.r16_1 = 30;
        this.s16_1 = 0;
        this.t16_1 = null;
        this.u16_1 = 0;
        this.v16_1 = null;
        this.w16_1 = 0;
        this.x16_1 = 0;
        this.y16_1 = null;
        this.z16_1 = 0;
        this.a17_1 = false;
        this.b17_1 = null;
        this.c17_1 = null;
        var tmp_11 = this;
        tmp_11.d17_1 = ArrayList_init_$Create$();
    }
    protoOf(ArtilleryGame).f1a = function() {
        return this.c17_1;
    };
    protoOf(ArtilleryGame).g1a = function(player, action) {
        var side = this.z15_1.o1(player);
        if (!(side === this.q16_1) || this.s16_1 > 0 || !(this.c17_1 == null)) return false;
        var tmp3_safe_receiver = action.jx('do');
        var tmp4_safe_receiver = tmp3_safe_receiver == null ? null : get_jsonPrimitive(tmp3_safe_receiver);
        if ((tmp4_safe_receiver == null ? null : get_contentOrNull(tmp4_safe_receiver)) === 'drive') {
            var tmp0_safe_receiver = action.jx('direction');
            var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : get_jsonPrimitive(tmp0_safe_receiver);
            var tmp2_elvis_lhs = tmp1_safe_receiver == null ? null : get_intOrNull(tmp1_safe_receiver);
            var tmp;
            if (tmp2_elvis_lhs == null) {
                return false;
            } else {
                tmp = tmp2_elvis_lhs;
            }
            var direction = tmp;
            switch (direction) {
              case 1:
              case -1:
                return drive(this, side, direction);

              default:
                return false;
            }
        }
        var tmp5_safe_receiver = action.jx('angle');
        var tmp6_safe_receiver = tmp5_safe_receiver == null ? null : get_jsonPrimitive(tmp5_safe_receiver);
        var tmp7_safe_receiver = tmp6_safe_receiver == null ? null : get_doubleOrNull(tmp6_safe_receiver);
        var tmp8_elvis_lhs = tmp7_safe_receiver == null ? null : coerceIn(tmp7_safe_receiver, 0, 180);
        var tmp_0;
        if (tmp8_elvis_lhs == null) {
            return false;
        } else {
            tmp_0 = tmp8_elvis_lhs;
        }
        var angle = tmp_0;
        var tmp9_safe_receiver = action.jx('do');
        var tmp10_safe_receiver = tmp9_safe_receiver == null ? null : get_jsonPrimitive(tmp9_safe_receiver);
        var tmp_1;
        switch (tmp10_safe_receiver == null ? null : get_contentOrNull(tmp10_safe_receiver)) {
          case 'aim':
            this.j16_1[side] = angle;
            var tmp_2 = this;
            var tmp12_safe_receiver = action.jx('power');
            var tmp13_safe_receiver = tmp12_safe_receiver == null ? null : get_jsonPrimitive(tmp12_safe_receiver);
            var tmp14_safe_receiver = tmp13_safe_receiver == null ? null : get_doubleOrNull(tmp13_safe_receiver);
            var tmp15_elvis_lhs = tmp14_safe_receiver == null ? null : coerceIn(tmp14_safe_receiver, 0, 100);
            tmp_2.x16_1 = tmp15_elvis_lhs == null ? 0 : tmp15_elvis_lhs;
            tmp_1 = true;
            break;

          case 'fire':
            var tmp16_safe_receiver = action.jx('power');
            var tmp17_safe_receiver = tmp16_safe_receiver == null ? null : get_jsonPrimitive(tmp16_safe_receiver);
            var tmp18_safe_receiver = tmp17_safe_receiver == null ? null : get_doubleOrNull(tmp17_safe_receiver);
            var tmp19_elvis_lhs = tmp18_safe_receiver == null ? null : coerceIn(tmp18_safe_receiver, 0, 100);
            var tmp_3;
            if (tmp19_elvis_lhs == null) {
                return false;
            } else {
                tmp_3 = tmp19_elvis_lhs;
            }
            var tmp_4 = tmp_3;
            var tmp20_safe_receiver = action.jx('weapon');
            var tmp21_safe_receiver = tmp20_safe_receiver == null ? null : get_jsonPrimitive(tmp20_safe_receiver);
            var tmp22_elvis_lhs = tmp21_safe_receiver == null ? null : get_contentOrNull(tmp21_safe_receiver);
            tmp_1 = fire(this, side, angle, tmp_4, tmp22_elvis_lhs == null ? 'shell' : tmp22_elvis_lhs);
            break;

          default:
            tmp_1 = false;
            break;
        }
        return tmp_1;
    };
    protoOf(ArtilleryGame).h1a = function() {
        if (!(this.c17_1 == null) || this.s16_1 > 0) return false;
        this.r16_1 = this.r16_1 - 1 | 0;
        if (this.r16_1 > 0) return true;
        nextTurn(this);
        return true;
    };
    protoOf(ArtilleryGame).i1a = function() {
        if (this.s16_1 <= 0) return Frame_NONE_getInstance();
        this.s16_1 = this.s16_1 - 200 | 0;
        if (this.s16_1 > 0) return Frame_NONE_getInstance();
        this.s16_1 = 0;
        if (!(this.b17_1 == null)) this.c17_1 = this.b17_1; else if (this.a17_1) this.a17_1 = false; else {
            nextTurn(this);
        }
        return Frame_EVERYONE_getInstance();
    };
    protoOf(ArtilleryGame).j1a = function() {
        var builder = new JsonObjectBuilder;
        common(this, builder);
        put(builder, 'width', 1e3);
        put(builder, 'height', 562);
        put(builder, 'column', 5);
        put(builder, 'water', this.e16_1 === 'islands' ? 92 : 0);
        var this_0 = this.g16_1;
        var destination = ArrayList_init_$Create$_0(this_0.length);
        var inductionVariable = 0;
        var last = this_0.length;
        while (inductionVariable < last) {
            var item = this_0[inductionVariable];
            inductionVariable = inductionVariable + 1 | 0;
            var tmp$ret$4 = JsonPrimitive_0(roundToInt(item));
            destination.i(tmp$ret$4);
        }
        builder.ux('ground', new JsonArray(destination));
        var tmp0_elvis_lhs = this.t16_1;
        builder.ux('shot', tmp0_elvis_lhs == null ? JsonNull_getInstance() : tmp0_elvis_lhs);
        var tmp1_elvis_lhs = this.v16_1;
        builder.ux('drive', tmp1_elvis_lhs == null ? JsonNull_getInstance() : tmp1_elvis_lhs);
        var tmp2_elvis_lhs = this.y16_1;
        builder.ux('drop', tmp2_elvis_lhs == null ? JsonNull_getInstance() : tmp2_elvis_lhs);
        var this_1 = this.h16_1;
        var destination_0 = ArrayList_init_$Create$_0(this_1.length);
        var inductionVariable_0 = 0;
        var last_0 = this_1.length;
        while (inductionVariable_0 < last_0) {
            var item_0 = this_1[inductionVariable_0];
            inductionVariable_0 = inductionVariable_0 + 1 | 0;
            var tmp$ret$7 = JsonPrimitive_0(item_0);
            destination_0.i(tmp$ret$7);
        }
        builder.ux('xs', new JsonArray(destination_0));
        var this_2 = numberRangeToNumber(0, 1);
        var destination_1 = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_2, 10));
        var inductionVariable_1 = this_2.w_1;
        var last_1 = this_2.x_1;
        if (inductionVariable_1 <= last_1) do {
            var item_1 = inductionVariable_1;
            inductionVariable_1 = inductionVariable_1 + 1 | 0;
            var it = item_1;
            var tmp$ret$10 = JsonPrimitive_0(roundToInt(cannonY(this, it)));
            destination_1.i(tmp$ret$10);
        } while (!(item_1 === last_1));
        builder.ux('ys', new JsonArray(destination_1));
        var this_3 = this.m16_1;
        var destination_2 = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_3, 10));
        var _iterator__ex2g4s = this_3.j();
        while (_iterator__ex2g4s.k()) {
            var item_2 = _iterator__ex2g4s.l();
            var builder_0 = new JsonObjectBuilder;
            put(builder_0, 'id', item_2.g15_1);
            put(builder_0, 'x', item_2.h15_1);
            put(builder_0, 'y', item_2.i15_1);
            put_1(builder_0, 'inAir', item_2.j15_1);
            var tmp$ret$13 = builder_0.vx();
            destination_2.i(tmp$ret$13);
        }
        builder.ux('crates', new JsonArray(destination_2));
        return builder.vx();
    };
    protoOf(ArtilleryGame).k1a = function(player) {
        var builder = new JsonObjectBuilder;
        var side = this.z15_1.o1(player);
        common(this, builder);
        put(builder, 'side', side);
        put_1(builder, 'yourTurn', this.c17_1 == null && this.s16_1 === 0 && this.q16_1 === side);
        var last = this.k16_1[side];
        var tmp;
        if (last == null) {
            tmp = JsonNull_getInstance();
        } else {
            var builder_0 = new JsonObjectBuilder;
            put(builder_0, 'angle', last.nb_1);
            put(builder_0, 'power', last.ob_1);
            tmp = builder_0.vx();
        }
        builder.ux('lastShot', tmp);
        return builder.vx();
    };
    function Artillery() {
        Artillery_instance = this;
        this.b1a_1 = 'artillery';
        this.c1a_1 = numberRangeToNumber(2, 2);
    }
    protoOf(Artillery).l1a = function() {
        return this.b1a_1;
    };
    protoOf(Artillery).m1a = function() {
        return this.c1a_1;
    };
    protoOf(Artillery).n1a = function(players, random) {
        return new ArtilleryGame(players, random);
    };
    var Artillery_instance;
    function Artillery_getInstance() {
        if (Artillery_instance == null) new Artillery;
        return Artillery_instance;
    }
    function Ship(cells) {
        this.o1a_1 = cells;
    }
    function _get_settingOut__x7we4z($this) {
        return $this.t1a_1.m() < $this.p1a_1.m();
    }
    function setOut($this, player, action) {
        var tmp0_safe_receiver = action.jx('do');
        var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : get_jsonPrimitive(tmp0_safe_receiver);
        var command = tmp1_safe_receiver == null ? null : get_contentOrNull(tmp1_safe_receiver);
        if (command === 'unready') return $this.t1a_1.x2(player);
        if ($this.t1a_1.m1(player)) return false;
        var fleet = getValue($this.s1a_1, player);
        var tmp;
        switch (command) {
          case 'place':
            tmp = place($this, fleet, action);
            break;

          case 'move':
            tmp = move($this, fleet, action);
            break;

          case 'remove':
            var tmp3_safe_receiver = action.jx('x');
            var tmp4_safe_receiver = tmp3_safe_receiver == null ? null : get_jsonPrimitive(tmp3_safe_receiver);
            var tmp5_elvis_lhs = tmp4_safe_receiver == null ? null : get_intOrNull(tmp4_safe_receiver);
            var tmp_0;
            if (tmp5_elvis_lhs == null) {
                return false;
            } else {
                tmp_0 = tmp5_elvis_lhs;
            }
            var x = tmp_0;
            var tmp6_safe_receiver = action.jx('y');
            var tmp7_safe_receiver = tmp6_safe_receiver == null ? null : get_jsonPrimitive(tmp6_safe_receiver);
            var tmp8_elvis_lhs = tmp7_safe_receiver == null ? null : get_intOrNull(tmp7_safe_receiver);
            var tmp_1;
            if (tmp8_elvis_lhs == null) {
                return false;
            } else {
                tmp_1 = tmp8_elvis_lhs;
            }
            var y = tmp_1;
            tmp = removeAll(fleet, BattleshipGame$setOut$lambda(y, x));
            break;

          case 'random':
            fleet.l3();
            var elements = placeFleet($this, $this.q1a_1);
            addAll(fleet, elements);
            tmp = true;
            break;

          case 'clear':
            var hadAny = !fleet.n();
            fleet.l3();
            tmp = hadAny;
            break;

          case 'ready':
            tmp = remaining($this, fleet).n() && $this.t1a_1.i(player);
            break;

          default:
            tmp = false;
            break;
        }
        return tmp;
    }
    function place($this, fleet, action) {
        var tmp0_safe_receiver = action.jx('size');
        var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : get_jsonPrimitive(tmp0_safe_receiver);
        var tmp2_elvis_lhs = tmp1_safe_receiver == null ? null : get_intOrNull(tmp1_safe_receiver);
        var tmp;
        if (tmp2_elvis_lhs == null) {
            return false;
        } else {
            tmp = tmp2_elvis_lhs;
        }
        var size = tmp;
        if (!remaining($this, fleet).m1(size)) return false;
        var tmp3_elvis_lhs = cellsFor($this, fleet, action, size);
        var tmp_0;
        if (tmp3_elvis_lhs == null) {
            return false;
        } else {
            tmp_0 = tmp3_elvis_lhs;
        }
        var cells = tmp_0;
        var element = new Ship(cells);
        fleet.i(element);
        return true;
    }
    function move($this, fleet, action) {
        var tmp0_safe_receiver = action.jx('fromX');
        var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : get_jsonPrimitive(tmp0_safe_receiver);
        var tmp2_elvis_lhs = tmp1_safe_receiver == null ? null : get_intOrNull(tmp1_safe_receiver);
        var tmp;
        if (tmp2_elvis_lhs == null) {
            return false;
        } else {
            tmp = tmp2_elvis_lhs;
        }
        var fromX = tmp;
        var tmp3_safe_receiver = action.jx('fromY');
        var tmp4_safe_receiver = tmp3_safe_receiver == null ? null : get_jsonPrimitive(tmp3_safe_receiver);
        var tmp5_elvis_lhs = tmp4_safe_receiver == null ? null : get_intOrNull(tmp4_safe_receiver);
        var tmp_0;
        if (tmp5_elvis_lhs == null) {
            return false;
        } else {
            tmp_0 = tmp5_elvis_lhs;
        }
        var fromY = tmp_0;
        var tmp$ret$0;
        $l$block: {
            var _iterator__ex2g4s = fleet.j();
            while (_iterator__ex2g4s.k()) {
                var element = _iterator__ex2g4s.l();
                if (element.o1a_1.m1(imul(fromY, 10) + fromX | 0)) {
                    tmp$ret$0 = element;
                    break $l$block;
                }
            }
            tmp$ret$0 = null;
        }
        var tmp6_elvis_lhs = tmp$ret$0;
        var tmp_1;
        if (tmp6_elvis_lhs == null) {
            return false;
        } else {
            tmp_1 = tmp6_elvis_lhs;
        }
        var ship = tmp_1;
        var tmp7_elvis_lhs = cellsFor($this, minus(fleet, ship), action, ship.o1a_1.m());
        var tmp_2;
        if (tmp7_elvis_lhs == null) {
            return false;
        } else {
            tmp_2 = tmp7_elvis_lhs;
        }
        var cells = tmp_2;
        fleet.s(fleet.o1(ship), new Ship(cells));
        return true;
    }
    function cellsFor($this, others, action, size) {
        var tmp0_safe_receiver = action.jx('x');
        var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : get_jsonPrimitive(tmp0_safe_receiver);
        var tmp2_elvis_lhs = tmp1_safe_receiver == null ? null : get_intOrNull(tmp1_safe_receiver);
        var tmp;
        if (tmp2_elvis_lhs == null) {
            return null;
        } else {
            tmp = tmp2_elvis_lhs;
        }
        var x = tmp;
        var tmp3_safe_receiver = action.jx('y');
        var tmp4_safe_receiver = tmp3_safe_receiver == null ? null : get_jsonPrimitive(tmp3_safe_receiver);
        var tmp5_elvis_lhs = tmp4_safe_receiver == null ? null : get_intOrNull(tmp4_safe_receiver);
        var tmp_0;
        if (tmp5_elvis_lhs == null) {
            return null;
        } else {
            tmp_0 = tmp5_elvis_lhs;
        }
        var y = tmp_0;
        var tmp6_safe_receiver = action.jx('across');
        var tmp7_safe_receiver = tmp6_safe_receiver == null ? null : get_jsonPrimitive(tmp6_safe_receiver);
        var tmp8_elvis_lhs = tmp7_safe_receiver == null ? null : get_booleanOrNull(tmp7_safe_receiver);
        var tmp_1;
        if (tmp8_elvis_lhs == null) {
            return null;
        } else {
            tmp_1 = tmp8_elvis_lhs;
        }
        var across = tmp_1;
        if (!(0 <= x ? x < 10 : false) || !(0 <= y ? y < 10 : false) || ((across ? x : y) + size | 0) > 10) return null;
        var this_0 = until(0, size);
        var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_0, 10));
        var inductionVariable = this_0.w_1;
        var last = this_0.x_1;
        if (inductionVariable <= last) do {
            var item = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var it = item;
            var tmp$ret$2 = (imul(y, 10) + x | 0) + imul(it, across ? 1 : 10) | 0;
            destination.i(tmp$ret$2);
        } while (!(item === last));
        var cells = destination;
        var destination_0 = ArrayList_init_$Create$();
        var _iterator__ex2g4s = others.j();
        while (_iterator__ex2g4s.k()) {
            var element = _iterator__ex2g4s.l();
            var tmp0 = element.o1a_1;
            var destination_1 = ArrayList_init_$Create$();
            var _iterator__ex2g4s_0 = tmp0.j();
            while (_iterator__ex2g4s_0.k()) {
                var element_0 = _iterator__ex2g4s_0.l();
                var list = around($this, element_0);
                addAll(destination_1, list);
            }
            var list_0 = destination_1;
            addAll(destination_0, list_0);
        }
        var blocked = toSet_0(destination_0);
        var tmp_2;
        var tmp$ret$9;
        $l$block_0: {
            var tmp_3;
            if (isInterface(cells, Collection)) {
                tmp_3 = cells.n();
            } else {
                tmp_3 = false;
            }
            if (tmp_3) {
                tmp$ret$9 = false;
                break $l$block_0;
            }
            var _iterator__ex2g4s_1 = cells.j();
            while (_iterator__ex2g4s_1.k()) {
                var element_1 = _iterator__ex2g4s_1.l();
                if (blocked.m1(element_1)) {
                    tmp$ret$9 = true;
                    break $l$block_0;
                }
            }
            tmp$ret$9 = false;
        }
        if (tmp$ret$9) {
            tmp_2 = null;
        } else {
            tmp_2 = toSet_0(cells);
        }
        return tmp_2;
    }
    function remaining($this, fleet) {
        var this_0 = toMutableList_0(Companion_getInstance_26().d1b_1);
        var _iterator__ex2g4s = fleet.j();
        while (_iterator__ex2g4s.k()) {
            var element = _iterator__ex2g4s.l();
            this_0.x2(element.o1a_1.m());
        }
        return this_0;
    }
    function shoot($this, player, action) {
        if (!(player === $this.r1a_1)) return false;
        var tmp0_safe_receiver = action.jx('x');
        var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : get_jsonPrimitive(tmp0_safe_receiver);
        var tmp2_elvis_lhs = tmp1_safe_receiver == null ? null : get_intOrNull(tmp1_safe_receiver);
        var tmp;
        if (tmp2_elvis_lhs == null) {
            return false;
        } else {
            tmp = tmp2_elvis_lhs;
        }
        var x = tmp;
        var tmp3_safe_receiver = action.jx('y');
        var tmp4_safe_receiver = tmp3_safe_receiver == null ? null : get_jsonPrimitive(tmp3_safe_receiver);
        var tmp5_elvis_lhs = tmp4_safe_receiver == null ? null : get_intOrNull(tmp4_safe_receiver);
        var tmp_0;
        if (tmp5_elvis_lhs == null) {
            return false;
        } else {
            tmp_0 = tmp5_elvis_lhs;
        }
        var y = tmp_0;
        if (!(0 <= x ? x < 10 : false) || !(0 <= y ? y < 10 : false)) return false;
        var target = opponent($this, player);
        var cell = imul(y, 10) + x | 0;
        if (!getValue($this.u1a_1, target).i(cell)) return false;
        var tmp0 = $this.v1a_1;
        var value = getValue($this.v1a_1, player) + 1 | 0;
        tmp0.x1(player, value);
        var tmp0_0 = getValue($this.s1a_1, target);
        var tmp$ret$1;
        $l$block: {
            var _iterator__ex2g4s = tmp0_0.j();
            while (_iterator__ex2g4s.k()) {
                var element = _iterator__ex2g4s.l();
                if (element.o1a_1.m1(cell)) {
                    tmp$ret$1 = element;
                    break $l$block;
                }
            }
            tmp$ret$1 = null;
        }
        var ship = tmp$ret$1;
        var result = ship == null ? 'miss' : getValue($this.u1a_1, target).n1(ship.o1a_1) ? 'sunk' : 'hit';
        if (result === 'sunk') {
            var tmp0_1 = getValue($this.u1a_1, target);
            var tmp0_2 = ensureNotNull(ship).o1a_1;
            var destination = ArrayList_init_$Create$();
            var _iterator__ex2g4s_0 = tmp0_2.j();
            while (_iterator__ex2g4s_0.k()) {
                var element_0 = _iterator__ex2g4s_0.l();
                var list = around($this, element_0);
                addAll(destination, list);
            }
            addAll(tmp0_1, destination);
        }
        if (ship == null) $this.r1a_1 = target;
        var tmp0_3 = getValue($this.s1a_1, target);
        var tmp$ret$7;
        $l$block_1: {
            var tmp_1;
            if (isInterface(tmp0_3, Collection)) {
                tmp_1 = tmp0_3.n();
            } else {
                tmp_1 = false;
            }
            if (tmp_1) {
                tmp$ret$7 = true;
                break $l$block_1;
            }
            var _iterator__ex2g4s_1 = tmp0_3.j();
            while (_iterator__ex2g4s_1.k()) {
                var element_1 = _iterator__ex2g4s_1.l();
                if (!getValue($this.u1a_1, target).n1(element_1.o1a_1)) {
                    tmp$ret$7 = false;
                    break $l$block_1;
                }
            }
            tmp$ret$7 = true;
        }
        if (tmp$ret$7) {
            $this.z1a_1 = player;
            $this.y1a_1 = 3600;
        }
        var tmp_2 = $this;
        var builder = new JsonObjectBuilder;
        put_0(builder, 'by', player);
        put(builder, 'x', x);
        put(builder, 'y', y);
        put_0(builder, 'result', result);
        tmp_2.w1a_1 = builder.vx();
        return true;
    }
    function firedJson($this) {
        var this_0 = $this.v1a_1;
        var destination = LinkedHashMap_init_$Create$_0(mapCapacity(this_0.m()));
        var _iterator__ex2g4s = this_0.w1().j();
        while (_iterator__ex2g4s.k()) {
            var element = _iterator__ex2g4s.l();
            var tmp = element.p1();
            var tmp$ret$4 = JsonPrimitive_0(element.q1());
            destination.x1(tmp, tmp$ret$4);
        }
        return new JsonObject(destination);
    }
    function opponent($this, player) {
        var tmp0 = $this.p1a_1;
        var tmp$ret$0;
        $l$block: {
            var _iterator__ex2g4s = tmp0.j();
            while (_iterator__ex2g4s.k()) {
                var element = _iterator__ex2g4s.l();
                if (!(element === player)) {
                    tmp$ret$0 = element;
                    break $l$block;
                }
            }
            throw NoSuchElementException_init_$Create$_0('Collection contains no element matching the predicate.');
        }
        return tmp$ret$0;
    }
    function rows($this, owner, showShips) {
        var fleet = getValue($this.s1a_1, owner);
        var shot = getValue($this.u1a_1, owner);
        var this_0 = until(0, 10);
        var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_0, 10));
        var inductionVariable = this_0.w_1;
        var last = this_0.x_1;
        if (inductionVariable <= last) do {
            var item = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var y = item;
            var tmp = 0;
            var tmp_0 = charArray(10);
            while (tmp < 10) {
                var tmp_1 = tmp;
                var cell = imul(y, 10) + tmp_1 | 0;
                var tmp$ret$4;
                $l$block: {
                    var _iterator__ex2g4s = fleet.j();
                    while (_iterator__ex2g4s.k()) {
                        var element = _iterator__ex2g4s.l();
                        if (element.o1a_1.m1(cell)) {
                            tmp$ret$4 = element;
                            break $l$block;
                        }
                    }
                    tmp$ret$4 = null;
                }
                var ship = tmp$ret$4;
                tmp_0[tmp_1] = !shot.m1(cell) ? !(ship == null) && showShips ? _Char___init__impl__6a9atx(83) : _Char___init__impl__6a9atx(46) : ship == null ? _Char___init__impl__6a9atx(111) : shot.n1(ship.o1a_1) ? _Char___init__impl__6a9atx(35) : _Char___init__impl__6a9atx(120);
                tmp = tmp + 1 | 0;
            }
            var tmp$ret$2 = JsonPrimitive_1(concatToString(tmp_0));
            destination.i(tmp$ret$2);
        } while (!(item === last));
        return new JsonArray(destination);
    }
    function placeFleet($this, random) {
        while (true) {
            var ships = ArrayList_init_$Create$();
            var blocked = LinkedHashSet_init_$Create$();
            var _iterator__ex2g4s = Companion_getInstance_26().d1b_1.j();
            $l$loop: while (_iterator__ex2g4s.k()) {
                var length = _iterator__ex2g4s.l();
                var tmp = asSequence(shuffled(until(0, 200), random));
                var options = mapNotNull(tmp, BattleshipGame$placeFleet$lambda(length, blocked));
                var tmp0_elvis_lhs = firstOrNull_0(options);
                var tmp_0;
                if (tmp0_elvis_lhs == null) {
                    break $l$loop;
                } else {
                    tmp_0 = tmp0_elvis_lhs;
                }
                var cells = tmp_0;
                var element = new Ship(toSet_0(cells));
                ships.i(element);
                var _iterator__ex2g4s_0 = cells.j();
                while (_iterator__ex2g4s_0.k()) {
                    var element_0 = _iterator__ex2g4s_0.l();
                    var elements = around($this, element_0);
                    addAll(blocked, elements);
                    blocked.i(element_0);
                }
            }
            if (ships.m() === Companion_getInstance_26().d1b_1.m()) return ships;
        }
    }
    function around($this, cell) {
        var x = cell % 10 | 0;
        var y = cell / 10 | 0;
        var tmp0 = numberRangeToNumber(-1, 1);
        var destination = ArrayList_init_$Create$();
        var inductionVariable = tmp0.w_1;
        var last = tmp0.x_1;
        if (inductionVariable <= last) do {
            var element = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var dy = element;
            var tmp0_0 = numberRangeToNumber(-1, 1);
            var destination_0 = ArrayList_init_$Create$();
            var inductionVariable_0 = tmp0_0.w_1;
            var last_0 = tmp0_0.x_1;
            if (inductionVariable_0 <= last_0) do {
                var element_0 = inductionVariable_0;
                inductionVariable_0 = inductionVariable_0 + 1 | 0;
                var nx = x + element_0 | 0;
                var ny = y + dy | 0;
                var tmp0_safe_receiver = (0 <= nx ? nx < 10 : false) && (0 <= ny ? ny < 10 : false) ? imul(ny, 10) + nx | 0 : null;
                if (tmp0_safe_receiver == null) null; else {
                    destination_0.i(tmp0_safe_receiver);
                }
            } while (!(element_0 === last_0));
            var list = destination_0;
            addAll(destination, list);
        } while (!(element === last));
        return destination;
    }
    function Companion_26() {
        Companion_instance_26 = this;
        this.a1b_1 = 10;
        this.b1b_1 = 3600;
        this.c1b_1 = 200;
        this.d1b_1 = listOf_0([ 4, 3, 3, 2, 2, 2, 1, 1, 1, 1 ]);
        var tmp = this;
        var this_0 = this.d1b_1;
        var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_0, 10));
        var _iterator__ex2g4s = this_0.j();
        while (_iterator__ex2g4s.k()) {
            var item = _iterator__ex2g4s.l();
            var tmp$ret$2 = JsonPrimitive_0(item);
            destination.i(tmp$ret$2);
        }
        tmp.e1b_1 = new JsonArray(destination);
    }
    var Companion_instance_26;
    function Companion_getInstance_26() {
        if (Companion_instance_26 == null) new Companion_26;
        return Companion_instance_26;
    }
    function BattleshipGame$setOut$lambda($y, $x) {
        return function(it) {
            return it.o1a_1.m1(imul($y, 10) + $x | 0);
        };
    }
    function BattleshipGame$placeFleet$lambda($length, $blocked) {
        return function(spot) {
            var across = spot >= 100;
            var start = spot % 100 | 0;
            var x = start % 10 | 0;
            var y = start / 10 | 0;
            var tmp;
            if (((across ? x : y) + $length | 0) > 10) {
                return null;
            }
            var this_0 = until(0, $length);
            var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_0, 10));
            var inductionVariable = this_0.w_1;
            var last = this_0.x_1;
            if (inductionVariable <= last) do {
                var item = inductionVariable;
                inductionVariable = inductionVariable + 1 | 0;
                var it = item;
                var tmp$ret$2 = start + imul(it, across ? 1 : 10) | 0;
                destination.i(tmp$ret$2);
            } while (!(item === last));
            var cells = destination;
            var tmp_0;
            var tmp$ret$5;
            $l$block_0: {
                var tmp_1;
                if (isInterface(cells, Collection)) {
                    tmp_1 = cells.n();
                } else {
                    tmp_1 = false;
                }
                if (tmp_1) {
                    tmp$ret$5 = true;
                    break $l$block_0;
                }
                var _iterator__ex2g4s = cells.j();
                while (_iterator__ex2g4s.k()) {
                    var element = _iterator__ex2g4s.l();
                    if ($blocked.m1(element)) {
                        tmp$ret$5 = false;
                        break $l$block_0;
                    }
                }
                tmp$ret$5 = true;
            }
            if (tmp$ret$5) {
                tmp_0 = cells;
            } else {
                tmp_0 = null;
            }
            return tmp_0;
        };
    }
    function BattleshipGame(players, random_0, turn) {
        Companion_getInstance_26();
        turn = turn === VOID ? random(players, random_0) : turn;
        this.p1a_1 = players;
        this.q1a_1 = random_0;
        this.r1a_1 = turn;
        var tmp = this;
        var this_0 = this.p1a_1;
        var result = LinkedHashMap_init_$Create$_0(coerceAtLeast(mapCapacity(collectionSizeOrDefault(this_0, 10)), 16));
        var _iterator__ex2g4s = this_0.j();
        while (_iterator__ex2g4s.k()) {
            var element = _iterator__ex2g4s.l();
            var tmp$ret$2 = ArrayList_init_$Create$();
            result.x1(element, tmp$ret$2);
        }
        tmp.s1a_1 = result;
        var tmp_0 = this;
        tmp_0.t1a_1 = LinkedHashSet_init_$Create$();
        var tmp_1 = this;
        var this_1 = this.p1a_1;
        var result_0 = LinkedHashMap_init_$Create$_0(coerceAtLeast(mapCapacity(collectionSizeOrDefault(this_1, 10)), 16));
        var _iterator__ex2g4s_0 = this_1.j();
        while (_iterator__ex2g4s_0.k()) {
            var element_0 = _iterator__ex2g4s_0.l();
            var tmp$ret$7 = LinkedHashSet_init_$Create$();
            result_0.x1(element_0, tmp$ret$7);
        }
        tmp_1.u1a_1 = result_0;
        var tmp_2 = this;
        var this_2 = this.p1a_1;
        var result_1 = LinkedHashMap_init_$Create$_0(coerceAtLeast(mapCapacity(collectionSizeOrDefault(this_2, 10)), 16));
        var _iterator__ex2g4s_1 = this_2.j();
        while (_iterator__ex2g4s_1.k()) {
            var element_1 = _iterator__ex2g4s_1.l();
            result_1.x1(element_1, 0);
        }
        tmp_2.v1a_1 = toMutableMap(result_1);
        this.w1a_1 = null;
        this.x1a_1 = null;
        this.y1a_1 = 0;
        this.z1a_1 = null;
    }
    protoOf(BattleshipGame).f1a = function() {
        return this.x1a_1;
    };
    protoOf(BattleshipGame).g1a = function(player, action) {
        return !(this.x1a_1 == null) || this.y1a_1 > 0 ? false : _get_settingOut__x7we4z(this) ? setOut(this, player, action) : shoot(this, player, action);
    };
    protoOf(BattleshipGame).i1a = function() {
        if (this.y1a_1 <= 0) return Frame_NONE_getInstance();
        this.y1a_1 = this.y1a_1 - 200 | 0;
        if (this.y1a_1 > 0) return Frame_NONE_getInstance();
        this.y1a_1 = 0;
        this.x1a_1 = this.z1a_1;
        return Frame_EVERYONE_getInstance();
    };
    protoOf(BattleshipGame).j1a = function() {
        var tmp;
        if (_get_settingOut__x7we4z(this)) {
            var builder = new JsonObjectBuilder;
            put_0(builder, 'game', Battleship_getInstance().f1b_1);
            put_0(builder, 'phase', 'placing');
            builder.ux('fleet', Companion_getInstance_26().e1b_1);
            var this_0 = this.p1a_1;
            var result = LinkedHashMap_init_$Create$_0(coerceAtLeast(mapCapacity(collectionSizeOrDefault(this_0, 10)), 16));
            var _iterator__ex2g4s = this_0.j();
            while (_iterator__ex2g4s.k()) {
                var element = _iterator__ex2g4s.l();
                var builder_0 = new JsonObjectBuilder;
                var this_1 = getValue(this.s1a_1, element);
                var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_1, 10));
                var _iterator__ex2g4s_0 = this_1.j();
                while (_iterator__ex2g4s_0.k()) {
                    var item = _iterator__ex2g4s_0.l();
                    var tmp$ret$9 = JsonPrimitive_0(item.o1a_1.m());
                    destination.i(tmp$ret$9);
                }
                builder_0.ux('placed', new JsonArray(destination));
                put_1(builder_0, 'ready', this.t1a_1.m1(element));
                var tmp$ret$4 = builder_0.vx();
                result.x1(element, tmp$ret$4);
            }
            builder.ux('placing', new JsonObject(result));
            tmp = builder.vx();
        } else {
            var builder_1 = new JsonObjectBuilder;
            put_0(builder_1, 'game', Battleship_getInstance().f1b_1);
            put_0(builder_1, 'phase', 'playing');
            put_1(builder_1, 'finale', this.y1a_1 > 0);
            put_0(builder_1, 'turn', this.r1a_1);
            put_0(builder_1, 'winner', this.x1a_1);
            var tmp0_elvis_lhs = this.w1a_1;
            builder_1.ux('last', tmp0_elvis_lhs == null ? JsonNull_getInstance() : tmp0_elvis_lhs);
            builder_1.ux('fleet', Companion_getInstance_26().e1b_1);
            builder_1.ux('fired', firedJson(this));
            var this_2 = this.p1a_1;
            var result_0 = LinkedHashMap_init_$Create$_0(coerceAtLeast(mapCapacity(collectionSizeOrDefault(this_2, 10)), 16));
            var _iterator__ex2g4s_1 = this_2.j();
            while (_iterator__ex2g4s_1.k()) {
                var element_0 = _iterator__ex2g4s_1.l();
                var tmp$ret$14 = rows(this, element_0, !(this.x1a_1 == null));
                result_0.x1(element_0, tmp$ret$14);
            }
            builder_1.ux('boards', new JsonObject(result_0));
            tmp = builder_1.vx();
        }
        return tmp;
    };
    protoOf(BattleshipGame).k1a = function(player) {
        var tmp;
        if (_get_settingOut__x7we4z(this)) {
            var builder = new JsonObjectBuilder;
            var rival = opponent(this, player);
            put_0(builder, 'game', Battleship_getInstance().f1b_1);
            put_0(builder, 'phase', 'placing');
            put(builder, 'side', this.p1a_1.o1(player));
            builder.ux('fleet', Companion_getInstance_26().e1b_1);
            builder.ux('own', rows(this, player, true));
            var this_0 = remaining(this, getValue(this.s1a_1, player));
            var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_0, 10));
            var _iterator__ex2g4s = this_0.j();
            while (_iterator__ex2g4s.k()) {
                var item = _iterator__ex2g4s.l();
                var tmp$ret$4 = JsonPrimitive_0(item);
                destination.i(tmp$ret$4);
            }
            builder.ux('remaining', new JsonArray(destination));
            put_1(builder, 'youReady', this.t1a_1.m1(player));
            put(builder, 'rivalPlaced', getValue(this.s1a_1, rival).m());
            put_1(builder, 'rivalReady', this.t1a_1.m1(rival));
            tmp = builder.vx();
        } else {
            var builder_0 = new JsonObjectBuilder;
            put_0(builder_0, 'game', Battleship_getInstance().f1b_1);
            put_0(builder_0, 'phase', 'playing');
            put(builder_0, 'side', this.p1a_1.o1(player));
            put_1(builder_0, 'yourTurn', this.x1a_1 == null && this.y1a_1 === 0 && this.r1a_1 === player);
            put_0(builder_0, 'winner', this.x1a_1);
            var tmp0_elvis_lhs = this.w1a_1;
            builder_0.ux('last', tmp0_elvis_lhs == null ? JsonNull_getInstance() : tmp0_elvis_lhs);
            builder_0.ux('fleet', Companion_getInstance_26().e1b_1);
            builder_0.ux('fired', firedJson(this));
            builder_0.ux('own', rows(this, player, true));
            builder_0.ux('target', rows(this, opponent(this, player), !(this.x1a_1 == null)));
            tmp = builder_0.vx();
        }
        return tmp;
    };
    function Battleship() {
        Battleship_instance = this;
        this.f1b_1 = 'battleship';
        this.g1b_1 = numberRangeToNumber(2, 2);
    }
    protoOf(Battleship).l1a = function() {
        return this.f1b_1;
    };
    protoOf(Battleship).m1a = function() {
        return this.g1b_1;
    };
    protoOf(Battleship).n1a = function(players, random) {
        return new BattleshipGame(players, random);
    };
    var Battleship_instance;
    function Battleship_getInstance() {
        if (Battleship_instance == null) new Battleship;
        return Battleship_instance;
    }
    function Mark(x, y, hit) {
        this.h1b_1 = x;
        this.i1b_1 = y;
        this.j1b_1 = hit;
    }
    function wander($this, fromX, fromY, toX, toY, sway) {
        var this_0 = numberRangeToNumber(0, 8);
        var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_0, 10));
        var inductionVariable = this_0.w_1;
        var last = this_0.x_1;
        if (inductionVariable <= last) do {
            var item = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var t = item / 8;
            var tmp$ret$2 = new Dot(fromX + (toX - fromX) * t + $this.l1b_1.fe(-sway, sway), fromY + (toY - fromY) * t + $this.l1b_1.fe(-sway, sway));
            destination.i(tmp$ret$2);
        } while (!(item === last));
        return destination;
    }
    function makeTerrain($this) {
        var builder = new JsonObjectBuilder;
        var riverFrom = $this.l1b_1.fe(40, 400 - 40);
        builder.ux('river', lineToJson(wander($this, riverFrom, -10, $this.l1b_1.fe(40, 400 - 40), 400 + 10, 22)));
        var roadFrom = $this.l1b_1.fe(40, 400 - 40);
        builder.ux('road', lineToJson(wander($this, -10, roadFrom, 400 + 10, $this.l1b_1.fe(40, 400 - 40), 14)));
        var this_0 = until(0, 9);
        var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_0, 10));
        var inductionVariable = this_0.w_1;
        var last = this_0.x_1;
        if (inductionVariable <= last) do {
            var item = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var tmp$ret$4 = new JsonArray(listOf_0([ JsonPrimitive_0(round($this.l1b_1.ee(400))), JsonPrimitive_0(round($this.l1b_1.ee(400))), JsonPrimitive_0(round($this.l1b_1.fe(22, 52))) ]));
            destination.i(tmp$ret$4);
        } while (!(item === last));
        builder.ux('woods', new JsonArray(destination));
        return builder.vx();
    }
    function _get_stage__b8zm99($this) {
        return $this.o1b_1 === 1 ? 'base' : 'bomb';
    }
    function cellsIn($this, outline) {
        var cells = booleanArray(2500);
        if (outline.m() < 3) return cells;
        var inductionVariable = 0;
        if (inductionVariable < 50) do {
            var row = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var y = (row + .5) * 8;
            var inductionVariable_0 = 0;
            if (inductionVariable_0 < 50) do {
                var column = inductionVariable_0;
                inductionVariable_0 = inductionVariable_0 + 1 | 0;
                var x = (column + .5) * 8;
                var inside = false;
                var inductionVariable_1 = 0;
                var last = outline.m() - 1 | 0;
                if (inductionVariable_1 <= last) do {
                    var i = inductionVariable_1;
                    inductionVariable_1 = inductionVariable_1 + 1 | 0;
                    var a = outline.p(i);
                    var b = outline.p((i + 1 | 0) % outline.m() | 0);
                    if (!(a.z1b_1 > y === b.z1b_1 > y) && x < a.y1b_1 + (y - a.z1b_1) / (b.z1b_1 - a.z1b_1) * (b.y1b_1 - a.y1b_1)) inside = !inside;
                } while (inductionVariable_1 <= last);
                cells[imul(row, 50) + column | 0] = inside;
            } while (inductionVariable_0 < 50);
        } while (inductionVariable < 50);
        return cells;
    }
    function anyBase($this) {
        var x = $this.l1b_1.fe(90, 400 - 90);
        var y = $this.l1b_1.fe(90, 400 - 90);
        var this_0 = until(0, 12);
        var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_0, 10));
        var inductionVariable = this_0.w_1;
        var last = this_0.x_1;
        if (inductionVariable <= last) do {
            var item = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var turn = item * 3.141592653589793 / 6;
            var tmp = x + Math.cos(turn) * 70;
            var tmp$ret$4 = Math.sin(turn);
            var tmp$ret$2 = new Dot(tmp, y + tmp$ret$4 * 70);
            destination.i(tmp$ret$2);
        } while (!(item === last));
        return destination;
    }
    function left($this, side) {
        var count = 0;
        var indexedObject = $this.q1c_1[side];
        var inductionVariable = 0;
        var last = indexedObject.length;
        while (inductionVariable < last) {
            var element = indexedObject[inductionVariable];
            inductionVariable = inductionVariable + 1 | 0;
            if (element) {
                count = count + 1 | 0;
            }
        }
        return count;
    }
    function bomb($this, target, spot) {
        var hit = false;
        var x = 24 / 8;
        var tmp$ret$0 = Math.ceil(x);
        var reach = numberToInt(tmp$ret$0);
        var column = numberToInt(spot.y1b_1 / 8);
        var row = numberToInt(spot.z1b_1 / 8);
        var inductionVariable = row - reach | 0;
        var last = row + reach | 0;
        if (inductionVariable <= last) do {
            var r = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var inductionVariable_0 = column - reach | 0;
            var last_0 = column + reach | 0;
            if (inductionVariable_0 <= last_0) $l$loop_0: do {
                var c = inductionVariable_0;
                inductionVariable_0 = inductionVariable_0 + 1 | 0;
                if (!(0 <= r ? r < 50 : false) || !(0 <= c ? c < 50 : false)) continue $l$loop_0;
                var dx = (c + .5) * 8 - spot.y1b_1;
                var dy = (r + .5) * 8 - spot.z1b_1;
                if (dx * dx + dy * dy > 24 * 24) continue $l$loop_0;
                if ($this.q1c_1[target][imul(r, 50) + c | 0]) {
                    $this.q1c_1[target][imul(r, 50) + c | 0] = false;
                    hit = true;
                }
            } while (!(c === last_0));
        } while (!(r === last));
        return hit;
    }
    function marksJson($this, list) {
        var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(list, 10));
        var _iterator__ex2g4s = list.j();
        while (_iterator__ex2g4s.k()) {
            var item = _iterator__ex2g4s.l();
            var tmp$ret$2 = new JsonArray(listOf_0([ JsonPrimitive_0(round(item.h1b_1)), JsonPrimitive_0(round(item.i1b_1)), JsonPrimitive_2(item.j1b_1) ]));
            destination.i(tmp$ret$2);
        }
        return new JsonArray(destination);
    }
    function Companion_27() {
        this.w1c_1 = 400;
        this.x1c_1 = 50;
        this.y1c_1 = 8;
        this.z1c_1 = 900;
        this.a1d_1 = 320;
        this.b1d_1 = 90;
        this.c1d_1 = 24;
        this.d1d_1 = 24;
        this.e1d_1 = 170;
        this.f1d_1 = 75;
        this.g1d_1 = 25;
        this.h1d_1 = 15;
        this.i1d_1 = 1800;
    }
    var Companion_instance_27;
    function Companion_getInstance_27() {
        return Companion_instance_27;
    }
    function CarpetGame(players, random) {
        DoodleGame.call(this, players, random, 1);
        this.o1c_1 = Carpet_getInstance().j1d_1;
        var tmp = this;
        tmp.p1c_1 = Array(2);
        var tmp_0 = this;
        var tmp_1 = 0;
        var tmp_2 = Array(2);
        while (tmp_1 < 2) {
            tmp_2[tmp_1] = booleanArray(2500);
            tmp_1 = tmp_1 + 1 | 0;
        }
        tmp_0.q1c_1 = tmp_2;
        this.r1c_1 = new Int32Array(2);
        var tmp_3 = this;
        var tmp_4 = 0;
        var tmp_5 = Array(2);
        while (tmp_4 < 2) {
            tmp_5[tmp_4] = emptyList();
            tmp_4 = tmp_4 + 1 | 0;
        }
        tmp_3.s1c_1 = tmp_5;
        var tmp_6 = this;
        var tmp_7 = 0;
        var tmp_8 = Array(2);
        while (tmp_7 < 2) {
            tmp_8[tmp_7] = emptyList();
            tmp_7 = tmp_7 + 1 | 0;
        }
        tmp_6.t1c_1 = tmp_8;
        var tmp_9 = this;
        var tmp_10 = 0;
        var tmp_11 = Array(2);
        while (tmp_10 < 2) {
            tmp_11[tmp_10] = ArrayList_init_$Create$();
            tmp_10 = tmp_10 + 1 | 0;
        }
        tmp_9.u1c_1 = tmp_11;
        var tmp_12 = this;
        var list = ArrayList_init_$Create$_0(2);
        var inductionVariable = 0;
        if (inductionVariable < 2) do {
            var index = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var tmp$ret$14 = makeTerrain(this);
            list.i(tmp$ret$14);
        } while (inductionVariable < 2);
        tmp_12.v1c_1 = new JsonArray(list);
        this.l1d();
    }
    protoOf(CarpetGame).m1d = function() {
        return this.o1c_1;
    };
    protoOf(CarpetGame).n1d = function() {
        return this.o1b_1 === 1 ? 25 : 15;
    };
    protoOf(CarpetGame).o1d = function() {
        var progression = get_indices(this.s1c_1);
        var inductionVariable = progression.w_1;
        var last = progression.x_1;
        if (inductionVariable <= last) do {
            var element = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var it = element;
            this.s1c_1[it] = emptyList();
        } while (!(element === last));
    };
    protoOf(CarpetGame).p1d = function(side, action) {
        var ink = _get_stage__b8zm99(this) === 'base' ? 900 : 320;
        var tmp0_elvis_lhs = readStrokes(action.jx('strokes'), 400, 400, ink);
        var tmp;
        if (tmp0_elvis_lhs == null) {
            return false;
        } else {
            tmp = tmp0_elvis_lhs;
        }
        var tmp1_elvis_lhs = firstOrNull(tmp);
        var line = tmp1_elvis_lhs == null ? emptyList() : tmp1_elvis_lhs;
        if (_get_stage__b8zm99(this) === 'base') {
            var tmp_0;
            if (!line.n()) {
                var count = 0;
                var indexedObject = cellsIn(this, line);
                var inductionVariable = 0;
                var last = indexedObject.length;
                while (inductionVariable < last) {
                    var element = indexedObject[inductionVariable];
                    inductionVariable = inductionVariable + 1 | 0;
                    if (element) {
                        count = count + 1 | 0;
                    }
                }
                tmp_0 = count < 90;
            } else {
                tmp_0 = false;
            }
            if (tmp_0) return false;
            this.t1c_1[side] = line;
        } else {
            this.s1c_1[side] = line;
        }
        return true;
    };
    protoOf(CarpetGame).q1d = function(side) {
        return this.r1c_1[side] === 0 ? 100 : numberToInt(round(left(this, side) * 100 / this.r1c_1[side]));
    };
    protoOf(CarpetGame).r1d = function() {
        if (_get_stage__b8zm99(this) === 'base') {
            var inductionVariable = 0;
            if (inductionVariable <= 1) do {
                var side = inductionVariable;
                inductionVariable = inductionVariable + 1 | 0;
                var this_0 = this.t1c_1[side];
                var tmp;
                if (this_0.n()) {
                    tmp = anyBase(this);
                } else {
                    tmp = this_0;
                }
                var outline = tmp;
                this.t1c_1[side] = outline;
                this.p1c_1[side] = outline;
                var cells = cellsIn(this, outline);
                var destination = this.q1c_1[side];
                var endIndex = cells.length;
                var tmp_0 = cells;
                arrayCopy(tmp_0, destination, 0, 0, endIndex);
                var count = 0;
                var inductionVariable_0 = 0;
                var last = cells.length;
                while (inductionVariable_0 < last) {
                    var element = cells[inductionVariable_0];
                    inductionVariable_0 = inductionVariable_0 + 1 | 0;
                    if (element) {
                        count = count + 1 | 0;
                    }
                }
                var tmp$ret$7 = count;
                this.r1c_1[side] = tmp$ret$7;
            } while (inductionVariable <= 1);
            return null;
        }
        var longest = 0;
        var this_1 = numberRangeToNumber(0, 1);
        var destination_0 = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_1, 10));
        var inductionVariable_1 = this_1.w_1;
        var last_0 = this_1.x_1;
        if (inductionVariable_1 <= last_0) do {
            var item = inductionVariable_1;
            inductionVariable_1 = inductionVariable_1 + 1 | 0;
            var side_0 = item;
            var target = 1 - side_0 | 0;
            var line = this.s1c_1[side_0];
            var spots = line.m() >= 2 ? resample(line, 24) : emptyList();
            var destination_1 = ArrayList_init_$Create$_0(collectionSizeOrDefault(spots, 10));
            var index = 0;
            var _iterator__ex2g4s = spots.j();
            while (_iterator__ex2g4s.k()) {
                var item_0 = _iterator__ex2g4s.l();
                var _unary__edvuaz = index;
                index = _unary__edvuaz + 1 | 0;
                var i = checkIndexOverflow(_unary__edvuaz);
                var hit = bomb(this, target, item_0);
                var tmp0 = this.u1c_1[target];
                var element_0 = new Mark(item_0.y1b_1, item_0.z1b_1, hit);
                tmp0.i(element_0);
                var at = i * 24 / 170 * 1e3;
                var a = longest;
                longest = Math.max(a, at);
                var builder = new JsonObjectBuilder;
                put(builder, 'x', round(item_0.y1b_1));
                put(builder, 'y', round(item_0.z1b_1));
                put(builder, 't', round(at));
                put_1(builder, 'hit', hit);
                var tmp$ret$14 = builder.vx();
                destination_1.i(tmp$ret$14);
            }
            var bombs = destination_1;
            var builder_0 = new JsonObjectBuilder;
            put(builder_0, 'side', side_0);
            builder_0.ux('path', lineToJson(line));
            put(builder_0, 'ms', lineLength(line) / 170 * 1e3);
            builder_0.ux('bombs', new JsonArray(bombs));
            var tmp$ret$11 = builder_0.vx();
            destination_0.i(tmp$ret$11);
        } while (!(item === last_0));
        var shown = destination_0;
        var this_2 = numberRangeToNumber(0, 1);
        var destination_2 = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_2, 10));
        var inductionVariable_2 = this_2.w_1;
        var last_1 = this_2.x_1;
        if (inductionVariable_2 <= last_1) do {
            var item_1 = inductionVariable_2;
            inductionVariable_2 = inductionVariable_2 + 1 | 0;
            var it = item_1;
            var tmp$ret$23 = this.q1d(it) <= 25;
            destination_2.i(tmp$ret$23);
        } while (!(item_1 === last_1));
        var lost = destination_2;
        if (lost.p(0) && !lost.p(1)) {
            this.p1b_1[1] = 1;
        }
        if (lost.p(1) && !lost.p(0)) {
            this.p1b_1[0] = 1;
        }
        if (lost.p(0) && lost.p(1)) {
            this.p1b_1[0] = this.q1d(0) >= this.q1d(1) ? 1 : 0;
            this.p1b_1[1] = this.q1d(1) >= this.q1d(0) ? 1 : 0;
        }
        var ms = numberToInt(longest + 1800);
        var builder_1 = new JsonObjectBuilder;
        builder_1.ux('runs', new JsonArray(shown));
        put(builder_1, 'ms', ms);
        var this_3 = numberRangeToNumber(0, 1);
        var destination_3 = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_3, 10));
        var inductionVariable_3 = this_3.w_1;
        var last_2 = this_3.x_1;
        if (inductionVariable_3 <= last_2) do {
            var item_2 = inductionVariable_3;
            inductionVariable_3 = inductionVariable_3 + 1 | 0;
            var it_0 = item_2;
            var tmp$ret$28 = JsonPrimitive_0(this.q1d(it_0));
            destination_3.i(tmp$ret$28);
        } while (!(item_2 === last_2));
        builder_1.ux('left', new JsonArray(destination_3));
        var tmp$ret$24 = builder_1.vx();
        return to(tmp$ret$24, ms);
    };
    protoOf(CarpetGame).s1d = function(_this__u8e3s4) {
        put_0(_this__u8e3s4, 'stage', _get_stage__b8zm99(this));
        put(_this__u8e3s4, 'map', 400);
        _this__u8e3s4.ux('terrain', this.v1c_1);
        var this_0 = numberRangeToNumber(0, 1);
        var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_0, 10));
        var inductionVariable = this_0.w_1;
        var last = this_0.x_1;
        if (inductionVariable <= last) do {
            var item = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var it = item;
            var tmp$ret$2 = JsonPrimitive_0(this.q1d(it));
            destination.i(tmp$ret$2);
        } while (!(item === last));
        _this__u8e3s4.ux('left', new JsonArray(destination));
        put(_this__u8e3s4, 'lostAt', 75);
        var this_1 = this.u1c_1;
        var destination_0 = ArrayList_init_$Create$_0(this_1.length);
        var inductionVariable_0 = 0;
        var last_0 = this_1.length;
        while (inductionVariable_0 < last_0) {
            var item_0 = this_1[inductionVariable_0];
            inductionVariable_0 = inductionVariable_0 + 1 | 0;
            var tmp$ret$5 = marksJson(this, item_0);
            destination_0.i(tmp$ret$5);
        }
        _this__u8e3s4.ux('marks', new JsonArray(destination_0));
        var tmp;
        if (!(this.x1b_1 == null)) {
            var this_2 = this.p1c_1;
            var destination_1 = ArrayList_init_$Create$_0(this_2.length);
            var inductionVariable_1 = 0;
            var last_1 = this_2.length;
            while (inductionVariable_1 < last_1) {
                var item_1 = this_2[inductionVariable_1];
                inductionVariable_1 = inductionVariable_1 + 1 | 0;
                var tmp$ret$8 = item_1 == null ? JsonNull_getInstance() : lineToJson(item_1);
                destination_1.i(tmp$ret$8);
            }
            tmp = new JsonArray(destination_1);
        } else {
            tmp = JsonNull_getInstance();
        }
        _this__u8e3s4.ux('bases', tmp);
    };
    protoOf(CarpetGame).t1d = function(_this__u8e3s4, side) {
        put_0(_this__u8e3s4, 'stage', _get_stage__b8zm99(this));
        put(_this__u8e3s4, 'map', 400);
        _this__u8e3s4.ux('terrain', this.v1c_1);
        put(_this__u8e3s4, 'ink', _get_stage__b8zm99(this) === 'base' ? 900 : 320);
        put(_this__u8e3s4, 'minCells', 90);
        put(_this__u8e3s4, 'cell', 8);
        put(_this__u8e3s4, 'radius', 24);
        _this__u8e3s4.ux('marks', this.n1b_1 === 'drawing' || this.n1b_1 === 'prelude' ? marksJson(this, this.u1c_1[1 - side | 0]) : new JsonArray(emptyList()));
        var tmp0_elvis_lhs = this.p1c_1[side];
        _this__u8e3s4.ux('base', lineToJson(tmp0_elvis_lhs == null ? this.t1c_1[side] : tmp0_elvis_lhs));
        var tmp;
        if (this.n1b_1 === 'drawing') {
            var tmp0 = this.u1c_1[side];
            var destination = ArrayList_init_$Create$();
            var _iterator__ex2g4s = tmp0.j();
            while (_iterator__ex2g4s.k()) {
                var element = _iterator__ex2g4s.l();
                if (element.j1b_1) {
                    destination.i(element);
                }
            }
            tmp = marksJson(this, destination);
        } else {
            tmp = new JsonArray(emptyList());
        }
        _this__u8e3s4.ux('hits', tmp);
        var this_0 = _get_stage__b8zm99(this) === 'base' ? this.t1c_1[side] : this.s1c_1[side];
        var tmp_0;
        if (!this_0.n()) {
            tmp_0 = this_0;
        } else {
            tmp_0 = null;
        }
        var tmp$ret$3 = tmp_0;
        _this__u8e3s4.ux('mine', linesToJson(listOfNotNull(tmp$ret$3)));
        if (this.n1b_1 === 'drawing') {
            put(_this__u8e3s4, 'yourLeft', this.q1d(side));
            put(_this__u8e3s4, 'rivalLeft', this.q1d(1 - side | 0));
        }
    };
    function Carpet() {
        Carpet_instance = this;
        this.j1d_1 = 'carpet';
        this.k1d_1 = numberRangeToNumber(2, 2);
    }
    protoOf(Carpet).l1a = function() {
        return this.j1d_1;
    };
    protoOf(Carpet).m1a = function() {
        return this.k1d_1;
    };
    protoOf(Carpet).n1a = function(players, random) {
        return new CarpetGame(players, random);
    };
    var Carpet_instance;
    function Carpet_getInstance() {
        if (Carpet_instance == null) new Carpet;
        return Carpet_instance;
    }
    function Dot(x, y) {
        this.y1b_1 = x;
        this.z1b_1 = y;
    }
    function lineLength(line) {
        var tmp$ret$0;
        $l$block: {
            var iterator = line.j();
            if (!iterator.k()) {
                tmp$ret$0 = emptyList();
                break $l$block;
            }
            var result = ArrayList_init_$Create$();
            var current = iterator.l();
            while (iterator.k()) {
                var next = iterator.l();
                var a = current;
                var tmp0 = next.y1b_1 - a.y1b_1;
                var y = next.z1b_1 - a.z1b_1;
                var tmp$ret$2 = hypot(tmp0, y);
                result.i(tmp$ret$2);
                current = next;
            }
            tmp$ret$0 = result;
        }
        return sum(tmp$ret$0);
    }
    function cutToInk(line, ink) {
        var kept = ArrayList_init_$Create$();
        var left = ink;
        var iterator = line.j();
        var index = 0;
        $l$loop_0: while (iterator.k()) {
            var i = index;
            index = index + 1 | 0;
            var dot = iterator.l();
            if (i === 0) {
                kept.i(dot);
                continue $l$loop_0;
            }
            var from = line.p(i - 1 | 0);
            var tmp0 = dot.y1b_1 - from.y1b_1;
            var y = dot.z1b_1 - from.z1b_1;
            var step = hypot(tmp0, y);
            if (step <= left) {
                kept.i(dot);
                left = left - step;
            } else {
                if (step > 0 && left > 0) {
                    var element = new Dot(from.y1b_1 + (dot.y1b_1 - from.y1b_1) * left / step, from.z1b_1 + (dot.z1b_1 - from.z1b_1) * left / step);
                    kept.i(element);
                }
                break $l$loop_0;
            }
        }
        return kept;
    }
    function resample(line, spacing) {
        if (line.m() < 2) return line;
        var out = mutableListOf([ first(line) ]);
        var since = 0;
        var inductionVariable = 1;
        var last_0 = line.m();
        if (inductionVariable < last_0) do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var from = line.p(i - 1 | 0);
            var to = line.p(i);
            var tmp0 = to.y1b_1 - from.y1b_1;
            var y = to.z1b_1 - from.z1b_1;
            var step = hypot(tmp0, y);
            var along = spacing - since;
            while (along <= step) {
                var element = new Dot(from.y1b_1 + (to.y1b_1 - from.y1b_1) * along / step, from.z1b_1 + (to.z1b_1 - from.z1b_1) * along / step);
                out.i(element);
                along = along + spacing;
            }
            since = (since + step) % spacing;
        } while (inductionVariable < last_0);
        var tmp0_0 = last(out).y1b_1 - last(line).y1b_1;
        var y_0 = last(out).z1b_1 - last(line).z1b_1;
        if (hypot(tmp0_0, y_0) > spacing / 3) {
            var element_0 = last(line);
            out.i(element_0);
        }
        return out;
    }
    function lineToJson(line) {
        var destination = ArrayList_init_$Create$();
        var _iterator__ex2g4s = line.j();
        while (_iterator__ex2g4s.k()) {
            var element = _iterator__ex2g4s.l();
            var list = listOf_0([ JsonPrimitive_0(round(element.y1b_1)), JsonPrimitive_0(round(element.z1b_1)) ]);
            addAll(destination, list);
        }
        return new JsonArray(destination);
    }
    function linesToJson(lines) {
        var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(lines, 10));
        var _iterator__ex2g4s = lines.j();
        while (_iterator__ex2g4s.k()) {
            var item = _iterator__ex2g4s.l();
            var tmp$ret$2 = lineToJson(item);
            destination.i(tmp$ret$2);
        }
        return new JsonArray(destination);
    }
    function readStrokes(strokes, width, height, ink, maxPoints) {
        maxPoints = maxPoints === VOID ? 400 : maxPoints;
        var tmp;
        try {
            var value = strokes == null ? null : get_jsonArray(strokes);
            tmp = _Result___init__impl__xyqfz8(value);
        } catch ($p) {
            var tmp_0;
            if ($p instanceof Error) {
                var e = $p;
                tmp_0 = _Result___init__impl__xyqfz8(createFailure(e));
            } else {
                throw $p;
            }
            tmp = tmp_0;
        }
        var this_0 = tmp;
        var tmp0_elvis_lhs = _Result___get_isFailure__impl__jpiriv(this_0) ? null : _Result___get_value__impl__bjfvqg(this_0);
        var tmp_1;
        if (tmp0_elvis_lhs == null) {
            return null;
        } else {
            tmp_1 = tmp0_elvis_lhs;
        }
        var lists = tmp_1;
        var lines = ArrayList_init_$Create$();
        var left = ink;
        var points = 0;
        var _iterator__ex2g4s = lists.j();
        $l$loop: while (_iterator__ex2g4s.k()) {
            var list = _iterator__ex2g4s.l();
            var tmp_2;
            try {
                var this_1 = get_jsonArray(list);
                var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_1, 10));
                var _iterator__ex2g4s_0 = this_1.j();
                while (_iterator__ex2g4s_0.k()) {
                    var item = _iterator__ex2g4s_0.l();
                    var tmp$ret$10 = get_doubleOrNull(get_jsonPrimitive(item));
                    destination.i(tmp$ret$10);
                }
                tmp_2 = _Result___init__impl__xyqfz8(destination);
            } catch ($p_0) {
                var tmp_3;
                if ($p_0 instanceof Error) {
                    var e_0 = $p_0;
                    tmp_3 = _Result___init__impl__xyqfz8(createFailure(e_0));
                } else {
                    throw $p_0;
                }
                tmp_2 = tmp_3;
            }
            var this_2 = tmp_2;
            var tmp1_elvis_lhs = _Result___get_isFailure__impl__jpiriv(this_2) ? null : _Result___get_value__impl__bjfvqg(this_2);
            var tmp_4;
            if (tmp1_elvis_lhs == null) {
                return null;
            } else {
                tmp_4 = tmp1_elvis_lhs;
            }
            var numbers = tmp_4;
            var tmp_5;
            var tmp$ret$14;
            $l$block_0: {
                var tmp_6;
                if (isInterface(numbers, Collection)) {
                    tmp_6 = numbers.n();
                } else {
                    tmp_6 = false;
                }
                if (tmp_6) {
                    tmp$ret$14 = false;
                    break $l$block_0;
                }
                var _iterator__ex2g4s_1 = numbers.j();
                while (_iterator__ex2g4s_1.k()) {
                    var element = _iterator__ex2g4s_1.l();
                    if (element == null) {
                        tmp$ret$14 = true;
                        break $l$block_0;
                    }
                }
                tmp$ret$14 = false;
            }
            if (tmp$ret$14) {
                tmp_5 = true;
            } else {
                tmp_5 = !((numbers.m() % 2 | 0) === 0);
            }
            if (tmp_5) return null;
            var this_3 = chunked(numbers, 2);
            var destination_0 = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_3, 10));
            var _iterator__ex2g4s_2 = this_3.j();
            while (_iterator__ex2g4s_2.k()) {
                var item_0 = _iterator__ex2g4s_2.l();
                var x = item_0.p(0);
                var y = item_0.p(1);
                var tmp$ret$18 = new Dot(coerceIn(ensureNotNull(x), 0, width), coerceIn(ensureNotNull(y), 0, height));
                destination_0.i(tmp$ret$18);
            }
            var line = take(destination_0, maxPoints - points | 0);
            var cut = cutToInk(line, left);
            if (cut.n()) continue $l$loop;
            lines.i(cut);
            left = left - lineLength(cut);
            points = points + cut.m() | 0;
        }
        return lines;
    }
    function nextRound($this) {
        $this.o1b_1 = $this.o1b_1 + 1 | 0;
        fill($this.r1b_1, false);
        $this.o1d();
        $this.s1b_1 = $this.n1d();
        var prelude = $this.u1d();
        if (prelude > 0) {
            $this.n1b_1 = 'prelude';
            $this.t1b_1 = prelude;
        } else $this.n1b_1 = 'drawing';
    }
    function finishDrawing($this) {
        var shown = $this.r1d();
        $this.w1b_1 = $this.v1d();
        if (shown == null) {
            nextRound($this);
            return Unit_instance;
        }
        var tmp = $this;
        $this.v1b_1 = $this.v1b_1 + 1 | 0;
        tmp.u1b_1 = new JsonObject(plus_2(shown.nb_1, to('seq', JsonPrimitive_0($this.v1b_1))));
        $this.n1b_1 = 'showing';
        var tmp_0 = $this;
        var x = shown.ob_1 / 200;
        var tmp$ret$0 = Math.ceil(x);
        tmp_0.t1b_1 = imul(numberToInt(tmp$ret$0), 200);
    }
    function common_0($this, $receiver, scores) {
        put_0($receiver, 'game', $this.m1d());
        put_0($receiver, 'phase', !($this.x1b_1 == null) ? 'over' : $this.n1b_1);
        put($receiver, 'round', $this.o1b_1);
        put($receiver, 'clock', $this.n1b_1 === 'drawing' && $this.x1b_1 == null ? $this.s1b_1 : 0);
        var this_0 = $this.k1b_1;
        var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_0, 10));
        var _iterator__ex2g4s = this_0.j();
        while (_iterator__ex2g4s.k()) {
            var item = _iterator__ex2g4s.l();
            var tmp$ret$2 = JsonPrimitive_1(item);
            destination.i(tmp$ret$2);
        }
        $receiver.ux('sides', new JsonArray(destination));
        var destination_0 = ArrayList_init_$Create$_0(scores.length);
        var inductionVariable = 0;
        var last = scores.length;
        while (inductionVariable < last) {
            var item_0 = scores[inductionVariable];
            inductionVariable = inductionVariable + 1 | 0;
            var tmp$ret$5 = JsonPrimitive_0(item_0);
            destination_0.i(tmp$ret$5);
        }
        $receiver.ux('points', new JsonArray(destination_0));
        put($receiver, 'pointsToWin', $this.m1b_1);
        var this_1 = $this.r1b_1;
        var destination_1 = ArrayList_init_$Create$_0(this_1.length);
        var inductionVariable_0 = 0;
        var last_0 = this_1.length;
        while (inductionVariable_0 < last_0) {
            var item_1 = this_1[inductionVariable_0];
            inductionVariable_0 = inductionVariable_0 + 1 | 0;
            var tmp$ret$8 = JsonPrimitive_2(item_1);
            destination_1.i(tmp$ret$8);
        }
        $receiver.ux('ready', new JsonArray(destination_1));
        put_0($receiver, 'winner', $this.x1b_1);
    }
    function Companion_28() {
        this.w1d_1 = 200;
    }
    var Companion_instance_28;
    function Companion_getInstance_28() {
        return Companion_instance_28;
    }
    function DoodleGame(players, random, pointsToWin) {
        pointsToWin = pointsToWin === VOID ? 3 : pointsToWin;
        this.k1b_1 = players;
        this.l1b_1 = random;
        this.m1b_1 = pointsToWin;
        this.n1b_1 = 'drawing';
        this.o1b_1 = 0;
        this.p1b_1 = new Int32Array(2);
        this.q1b_1 = new Int32Array(2);
        this.r1b_1 = booleanArray(2);
        this.s1b_1 = 0;
        this.t1b_1 = 0;
        this.u1b_1 = null;
        this.v1b_1 = 0;
        this.w1b_1 = null;
        this.x1b_1 = null;
    }
    protoOf(DoodleGame).f1a = function() {
        return this.x1b_1;
    };
    protoOf(DoodleGame).u1d = function() {
        return 0;
    };
    protoOf(DoodleGame).l1d = function() {
        return nextRound(this);
    };
    protoOf(DoodleGame).g1a = function(player, action) {
        var side = this.k1b_1.o1(player);
        if (side < 0 || !(this.n1b_1 === 'drawing') || !(this.x1b_1 == null)) return false;
        var tmp0_safe_receiver = action.jx('do');
        var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : get_jsonPrimitive(tmp0_safe_receiver);
        var tmp;
        switch (tmp1_safe_receiver == null ? null : get_contentOrNull(tmp1_safe_receiver)) {
          case 'ready':
            if (this.r1b_1[side]) return false;
            this.r1b_1[side] = true;
            var tmp0 = this.r1b_1;
            var tmp$ret$0;
            $l$block: {
                var inductionVariable = 0;
                var last = tmp0.length;
                while (inductionVariable < last) {
                    var element = tmp0[inductionVariable];
                    inductionVariable = inductionVariable + 1 | 0;
                    if (!element) {
                        tmp$ret$0 = false;
                        break $l$block;
                    }
                }
                tmp$ret$0 = true;
            }
            if (tmp$ret$0) {
                finishDrawing(this);
            }
            tmp = true;
            break;

          case 'unready':
            if (!this.r1b_1[side]) return false;
            this.r1b_1[side] = false;
            tmp = true;
            break;

          default:
            tmp = !this.r1b_1[side] && this.p1d(side, action);
            break;
        }
        return tmp;
    };
    protoOf(DoodleGame).h1a = function() {
        if (!(this.n1b_1 === 'drawing') || !(this.x1b_1 == null)) return false;
        this.s1b_1 = this.s1b_1 - 1 | 0;
        if (this.s1b_1 <= 0) {
            finishDrawing(this);
        }
        return true;
    };
    protoOf(DoodleGame).i1a = function() {
        if (!(this.x1b_1 == null) || this.t1b_1 <= 0) return Frame_NONE_getInstance();
        this.t1b_1 = this.t1b_1 - 200 | 0;
        if (this.t1b_1 > 0) return Frame_NONE_getInstance();
        this.t1b_1 = 0;
        var tmp0_subject = this.n1b_1;
        if (tmp0_subject === 'prelude') this.n1b_1 = 'drawing'; else if (tmp0_subject === 'showing') {
            var tmp = this;
            tmp.q1b_1 = this.p1b_1.slice();
            var done = this.w1b_1;
            if (!(done == null)) this.x1b_1 = done; else {
                nextRound(this);
            }
        }
        return Frame_EVERYONE_getInstance();
    };
    protoOf(DoodleGame).v1d = function() {
        var tmp;
        var tmp0 = this.p1b_1;
        var tmp$ret$0;
        $l$block: {
            var inductionVariable = 0;
            var last = tmp0.length;
            while (inductionVariable < last) {
                var element = tmp0[inductionVariable];
                inductionVariable = inductionVariable + 1 | 0;
                if (!(element >= this.m1b_1)) {
                    tmp$ret$0 = false;
                    break $l$block;
                }
            }
            tmp$ret$0 = true;
        }
        if (tmp$ret$0) {
            tmp = this.p1b_1[0] === this.p1b_1[1] ? 'draw' : this.k1b_1.p(this.p1b_1[0] > this.p1b_1[1] ? 0 : 1);
        } else {
            if (this.p1b_1[0] >= this.m1b_1) {
                tmp = this.k1b_1.p(0);
            } else {
                if (this.p1b_1[1] >= this.m1b_1) {
                    tmp = this.k1b_1.p(1);
                } else {
                    tmp = null;
                }
            }
        }
        return tmp;
    };
    protoOf(DoodleGame).j1a = function() {
        var builder = new JsonObjectBuilder;
        common_0(this, builder, this.p1b_1);
        var tmp0_elvis_lhs = this.u1b_1;
        builder.ux('show', tmp0_elvis_lhs == null ? JsonNull_getInstance() : tmp0_elvis_lhs);
        this.s1d(builder);
        return builder.vx();
    };
    protoOf(DoodleGame).k1a = function(player) {
        var builder = new JsonObjectBuilder;
        var side = this.k1b_1.o1(player);
        common_0(this, builder, this.q1b_1);
        put(builder, 'side', side);
        put_1(builder, 'youReady', this.r1b_1[side]);
        put_1(builder, 'rivalReady', this.r1b_1[1 - side | 0]);
        this.t1d(builder, side);
        return builder.vx();
    };
    function get_GAMES() {
        _init_properties_Game_kt__8erhxu();
        return GAMES;
    }
    var GAMES;
    function Game() {}
    var static_init_called_4;
    function static_init_4() {
        if (static_init_called_4) return Unit_instance;
        static_init_called_4 = true;
        Frame_NONE_instance = new Frame('NONE', 0);
        Frame_TV_instance = new Frame('TV', 1);
        Frame_EVERYONE_instance = new Frame('EVERYONE', 2);
    }
    var Frame_NONE_instance;
    var Frame_TV_instance;
    var Frame_EVERYONE_instance;
    function Frame(name, ordinal) {
        Enum.call(this, name, ordinal);
    }
    function Frame_NONE_getInstance() {
        static_init_4();
        return Frame_NONE_instance;
    }
    function Frame_EVERYONE_getInstance() {
        static_init_4();
        return Frame_EVERYONE_instance;
    }
    var properties_initialized_Game_kt_8p3p0;
    function _init_properties_Game_kt__8erhxu() {
        if (!properties_initialized_Game_kt_8p3p0) {
            properties_initialized_Game_kt_8p3p0 = true;
            GAMES = listOf_0([ Battleship_getInstance(), Artillery_getInstance(), Ram_getInstance(), Carpet_getInstance(), Rockets_getInstance(), Recall_getInstance() ]);
        }
    }
    function Body(blobs, x, y) {
        this.x1d_1 = blobs;
        this.y1d_1 = x;
        this.z1d_1 = y;
        this.a1e_1 = 0;
        this.b1e_1 = 0;
        this.c1e_1 = 0;
        this.d1e_1 = 0;
        this.e1e_1 = this.x1d_1.m();
        var tmp = this;
        var sum = 0;
        var _iterator__ex2g4s = this.x1d_1.j();
        while (_iterator__ex2g4s.k()) {
            var element = _iterator__ex2g4s.l();
            var tmp_0 = sum;
            sum = tmp_0 + (element.y1b_1 * element.y1b_1 + element.z1b_1 * element.z1b_1 + 8 * 8 / 2);
        }
        tmp.f1e_1 = sum;
        var tmp_1 = this;
        var iterator = this.x1d_1.j();
        if (!iterator.k()) throw NoSuchElementException_init_$Create$();
        var it = iterator.l();
        var tmp0 = it.y1b_1;
        var y_0 = it.z1b_1;
        var maxValue = hypot(tmp0, y_0);
        while (iterator.k()) {
            var it_0 = iterator.l();
            var tmp0_0 = it_0.y1b_1;
            var y_1 = it_0.z1b_1;
            var v = hypot(tmp0_0, y_1);
            var a = maxValue;
            maxValue = Math.max(a, v);
        }
        tmp_1.g1e_1 = maxValue + 8;
        this.h1e_1 = null;
    }
    protoOf(Body).i1e = function(blob) {
        var x = this.a1e_1;
        var tmp$ret$0 = Math.cos(x);
        var tmp = blob.y1b_1 * tmp$ret$0;
        var x_0 = this.a1e_1;
        var tmp$ret$1 = Math.sin(x_0);
        return tmp - blob.z1b_1 * tmp$ret$1;
    };
    protoOf(Body).j1e = function(blob) {
        var x = this.a1e_1;
        var tmp$ret$0 = Math.sin(x);
        var tmp = blob.y1b_1 * tmp$ret$0;
        var x_0 = this.a1e_1;
        var tmp$ret$1 = Math.cos(x_0);
        return tmp + blob.z1b_1 * tmp$ret$1;
    };
    protoOf(Body).k1e = function(jx, jy, rx, ry) {
        this.b1e_1 = this.b1e_1 + jx / this.e1e_1;
        this.c1e_1 = this.c1e_1 + jy / this.e1e_1;
        this.d1e_1 = this.d1e_1 + (rx * jy - ry * jx) / this.f1e_1;
    };
    function Shape(body, lines) {
        this.l1e_1 = body;
        this.m1e_1 = lines;
    }
    function shape($this, side) {
        var tmp0 = $this.c1f_1[side];
        var destination = ArrayList_init_$Create$();
        var _iterator__ex2g4s = tmp0.j();
        while (_iterator__ex2g4s.k()) {
            var element = _iterator__ex2g4s.l();
            if (element.m() >= 2) {
                destination.i(element);
            }
        }
        var tmp;
        if (destination.n()) {
            tmp = listOf(Companion_getInstance_29().l1g_1);
        } else {
            tmp = destination;
        }
        var drawn = tmp;
        var destination_0 = ArrayList_init_$Create$_0(collectionSizeOrDefault(drawn, 10));
        var _iterator__ex2g4s_0 = drawn.j();
        while (_iterator__ex2g4s_0.k()) {
            var item = _iterator__ex2g4s_0.l();
            var destination_1 = ArrayList_init_$Create$_0(collectionSizeOrDefault(item, 10));
            var _iterator__ex2g4s_1 = item.j();
            while (_iterator__ex2g4s_1.k()) {
                var item_0 = _iterator__ex2g4s_1.l();
                var tmp$ret$10 = new Dot((side === 1 ? 300 - item_0.y1b_1 : item_0.y1b_1) * .62, (300 - item_0.z1b_1) * .62);
                destination_1.i(tmp$ret$10);
            }
            destination_0.i(destination_1);
        }
        var facing = destination_0;
        var destination_2 = ArrayList_init_$Create$();
        var _iterator__ex2g4s_2 = facing.j();
        while (_iterator__ex2g4s_2.k()) {
            var element_0 = _iterator__ex2g4s_2.l();
            var list = resample(element_0, 13);
            addAll(destination_2, list);
        }
        var spots = destination_2;
        var sum = 0;
        var _iterator__ex2g4s_3 = spots.j();
        while (_iterator__ex2g4s_3.k()) {
            var element_1 = _iterator__ex2g4s_3.l();
            var tmp_0 = sum;
            sum = tmp_0 + element_1.y1b_1;
        }
        var midX = sum / spots.m();
        var sum_0 = 0;
        var _iterator__ex2g4s_4 = spots.j();
        while (_iterator__ex2g4s_4.k()) {
            var element_2 = _iterator__ex2g4s_4.l();
            var tmp_1 = sum_0;
            sum_0 = tmp_1 + element_2.z1b_1;
        }
        var midY = sum_0 / spots.m();
        var destination_3 = ArrayList_init_$Create$_0(collectionSizeOrDefault(spots, 10));
        var _iterator__ex2g4s_5 = spots.j();
        while (_iterator__ex2g4s_5.k()) {
            var item_1 = _iterator__ex2g4s_5.l();
            var tmp$ret$20 = new Dot(item_1.y1b_1 - midX, item_1.z1b_1 - midY);
            destination_3.i(tmp$ret$20);
        }
        var blobs = destination_3;
        var iterator = blobs.j();
        if (!iterator.k()) throw NoSuchElementException_init_$Create$();
        var minValue = iterator.l().z1b_1;
        while (iterator.k()) {
            var v = iterator.l().z1b_1;
            var a = minValue;
            minValue = Math.min(a, v);
        }
        var lowest = minValue;
        var body = new Body(blobs, side === 0 ? 340 : 1e3 - 340, 170 + 8 - lowest + 2);
        var destination_4 = ArrayList_init_$Create$_0(collectionSizeOrDefault(facing, 10));
        var _iterator__ex2g4s_6 = facing.j();
        while (_iterator__ex2g4s_6.k()) {
            var item_2 = _iterator__ex2g4s_6.l();
            var destination_5 = ArrayList_init_$Create$_0(collectionSizeOrDefault(item_2, 10));
            var _iterator__ex2g4s_7 = item_2.j();
            while (_iterator__ex2g4s_7.k()) {
                var item_3 = _iterator__ex2g4s_7.l();
                var tmp$ret$30 = new Dot(item_3.y1b_1 - midX, item_3.z1b_1 - midY);
                destination_5.i(tmp$ret$30);
            }
            destination_4.i(destination_5);
        }
        return new Shape(body, destination_4);
    }
    function shelfHalf($this, time) {
        var tmp;
        if (time < 9) {
            tmp = 280;
        } else {
            var b = 280 - (time - 9) * 50;
            tmp = Math.max(0, b);
        }
        return tmp;
    }
    function onFloor($this, body, half) {
        var deepest = 0;
        var _iterator__ex2g4s = body.x1d_1.j();
        $l$loop: while (_iterator__ex2g4s.k()) {
            var blob = _iterator__ex2g4s.l();
            var rx = body.i1e(blob);
            var ry = body.j1e(blob);
            var wx = body.y1d_1 + rx;
            var wy = body.z1d_1 + ry;
            var depth = 170 + 8 - wy;
            var tmp;
            if (depth <= 0 || depth > 40) {
                tmp = true;
            } else {
                var x = wx - 500;
                tmp = Math.abs(x) > half;
            }
            if (tmp) continue $l$loop;
            var a = deepest;
            deepest = Math.max(a, depth);
            var pointVx = body.b1e_1 - body.d1e_1 * ry;
            var pointVy = body.c1e_1 + body.d1e_1 * rx;
            if (pointVy < 0) {
                var j = -(1 + .2) * pointVy / (1 / body.e1e_1 + rx * rx / body.f1e_1);
                body.k1e(0, j, rx, ry);
                var slide = body.b1e_1 - body.d1e_1 * ry;
                var friction = coerceIn(-slide / (1 / body.e1e_1 + ry * ry / body.f1e_1), -.25 * j, .25 * j);
                body.k1e(friction, 0, rx, ry);
            }
        }
        if (deepest > 0) {
            body.z1d_1 = body.z1d_1 + deepest * .6;
        }
        return deepest > 0;
    }
    function clash($this, a, b) {
        var tmp0 = a.y1d_1 - b.y1d_1;
        var y = a.z1d_1 - b.z1d_1;
        if (hypot(tmp0, y) > a.g1e_1 + b.g1e_1) return null;
        var deepest = 0;
        var deepX = 0;
        var deepY = 0;
        var hardest = 0;
        var at = null;
        var _iterator__ex2g4s = a.x1d_1.j();
        while (_iterator__ex2g4s.k()) {
            var first = _iterator__ex2g4s.l();
            var ax = a.i1e(first);
            var ay = a.j1e(first);
            var _iterator__ex2g4s_0 = b.x1d_1.j();
            $l$loop_0: while (_iterator__ex2g4s_0.k()) {
                var second = _iterator__ex2g4s_0.l();
                var bx = b.i1e(second);
                var by = b.j1e(second);
                var dx = b.y1d_1 + bx - a.y1d_1 - ax;
                var dy = b.z1d_1 + by - a.z1d_1 - ay;
                var distance = hypot(dx, dy);
                if (distance >= 2 * 8 || distance === 0) continue $l$loop_0;
                var nx = dx / distance;
                var ny = dy / distance;
                var depth = 2 * 8 - distance;
                if (depth > deepest) {
                    deepest = depth;
                    deepX = nx;
                    deepY = ny;
                }
                var closing = (a.b1e_1 - a.d1e_1 * ay - b.b1e_1 + b.d1e_1 * by) * nx + (a.c1e_1 + a.d1e_1 * ax - b.c1e_1 - b.d1e_1 * bx) * ny;
                if (closing <= 0) continue $l$loop_0;
                var turnA = ax * ny - ay * nx;
                var turnB = bx * ny - by * nx;
                var j = (1 + 1) * closing / (1 / a.e1e_1 + 1 / b.e1e_1 + turnA * turnA / a.f1e_1 + turnB * turnB / b.f1e_1);
                a.k1e(-j * nx, -j * ny, ax, ay);
                b.k1e(j * nx, j * ny, bx, by);
                if (closing > hardest) {
                    hardest = closing;
                    at = to(a.y1d_1 + ax + nx * 8, a.z1d_1 + ay + ny * 8);
                }
            }
        }
        if (deepest > 0) {
            var share = b.e1e_1 / (a.e1e_1 + b.e1e_1);
            a.y1d_1 = a.y1d_1 - deepX * deepest * share * .6;
            a.z1d_1 = a.z1d_1 - deepY * deepest * share * .6;
            b.y1d_1 = b.y1d_1 + deepX * deepest * (1 - share) * .6;
            b.z1d_1 = b.z1d_1 + deepY * deepest * (1 - share) * .6;
        }
        var tmp0_safe_receiver = at;
        var tmp;
        if (tmp0_safe_receiver == null) {
            tmp = null;
        } else {
            tmp = new Triple(tmp0_safe_receiver.nb_1, tmp0_safe_receiver.ob_1, hardest);
        }
        return tmp;
    }
    function Companion_29() {
        Companion_instance_29 = this;
        this.d1f_1 = 300;
        this.e1f_1 = 800;
        this.f1f_1 = 25;
        this.g1f_1 = .62;
        this.h1f_1 = 13;
        this.i1f_1 = 8;
        this.j1f_1 = 170;
        this.k1f_1 = 280;
        this.l1f_1 = 40;
        this.m1f_1 = 40;
        this.n1f_1 = 340;
        this.o1f_1 = 620;
        this.p1f_1 = .008333333333333333;
        this.q1f_1 = 6;
        this.r1f_1 = .05;
        this.s1f_1 = 1;
        this.t1f_1 = .2;
        this.u1f_1 = .25;
        this.v1f_1 = .998;
        this.w1f_1 = 1300;
        this.x1f_1 = .7;
        this.y1f_1 = 1;
        this.z1f_1 = 320;
        this.a1g_1 = 120;
        this.b1g_1 = 1.4;
        this.c1g_1 = 70;
        this.d1g_1 = .18;
        this.e1g_1 = 9;
        this.f1g_1 = 50;
        this.g1g_1 = 18;
        this.h1g_1 = 1.2;
        this.i1g_1 = .94;
        this.j1g_1 = 1800;
        this.k1g_1 = 1300;
        this.l1g_1 = listOf_0([ new Dot(110, 260), new Dot(190, 260) ]);
    }
    var Companion_instance_29;
    function Companion_getInstance_29() {
        if (Companion_instance_29 == null) {
            Companion_instance_28;
            new Companion_29;
        }
        return Companion_instance_29;
    }
    function RamGame(players, random, pointsToWin) {
        Companion_getInstance_29();
        pointsToWin = pointsToWin === VOID ? 3 : pointsToWin;
        DoodleGame.call(this, players, random, pointsToWin);
        this.b1f_1 = Ram_getInstance().m1g_1;
        var tmp = this;
        var tmp_0 = 0;
        var tmp_1 = Array(2);
        while (tmp_0 < 2) {
            tmp_1[tmp_0] = emptyList();
            tmp_0 = tmp_0 + 1 | 0;
        }
        tmp.c1f_1 = tmp_1;
        this.l1d();
    }
    protoOf(RamGame).m1d = function() {
        return this.b1f_1;
    };
    protoOf(RamGame).n1d = function() {
        return 25;
    };
    protoOf(RamGame).o1d = function() {
        var tmp = this;
        var tmp_0 = 0;
        var tmp_1 = Array(2);
        while (tmp_0 < 2) {
            tmp_1[tmp_0] = emptyList();
            tmp_0 = tmp_0 + 1 | 0;
        }
        tmp.c1f_1 = tmp_1;
    };
    protoOf(RamGame).p1d = function(side, action) {
        var tmp = this.c1f_1;
        var tmp0_elvis_lhs = readStrokes(action.jx('strokes'), 300, 300, 800);
        var tmp_0;
        if (tmp0_elvis_lhs == null) {
            return false;
        } else {
            tmp_0 = tmp0_elvis_lhs;
        }
        tmp[side] = tmp_0;
        return true;
    };
    protoOf(RamGame).r1d = function() {
        var shapes = listOf_0([ shape(this, 0), shape(this, 1) ]);
        var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(shapes, 10));
        var _iterator__ex2g4s = shapes.j();
        while (_iterator__ex2g4s.k()) {
            var item = _iterator__ex2g4s.l();
            var tmp$ret$2 = item.l1e_1;
            destination.i(tmp$ret$2);
        }
        var bodies = destination;
        var frames = ArrayList_init_$Create$();
        var hits = ArrayList_init_$Create$();
        var kicks = ArrayList_init_$Create$();
        var time = 0;
        var step = 0;
        var lastHit = -1;
        var nextKick = .7;
        var endAt = 18;
        while (time < endAt) {
            var half = shelfHalf(this, time);
            var tmp;
            if (time >= nextKick) {
                var tmp$ret$6;
                $l$block_0: {
                    var tmp_0;
                    if (isInterface(bodies, Collection)) {
                        tmp_0 = bodies.n();
                    } else {
                        tmp_0 = false;
                    }
                    if (tmp_0) {
                        tmp$ret$6 = true;
                        break $l$block_0;
                    }
                    var _iterator__ex2g4s_0 = bodies.j();
                    while (_iterator__ex2g4s_0.k()) {
                        var element = _iterator__ex2g4s_0.l();
                        if (!(element.h1e_1 == null)) {
                            tmp$ret$6 = false;
                            break $l$block_0;
                        }
                    }
                    tmp$ret$6 = true;
                }
                tmp = tmp$ret$6;
            } else {
                tmp = false;
            }
            if (tmp) {
                nextKick = nextKick + 1;
                var iterator = bodies.j();
                var index = 0;
                $l$loop: while (iterator.k()) {
                    var side = index;
                    index = index + 1 | 0;
                    var body = iterator.l();
                    if (!(body.h1e_1 == null)) continue $l$loop;
                    var rival = bodies.p(1 - side | 0);
                    var toward = rival.y1d_1 >= body.y1d_1 ? 1 : -1;
                    body.b1e_1 = body.b1e_1 + toward * 320;
                    body.c1e_1 = body.c1e_1 + 120;
                    body.d1e_1 = body.d1e_1 + this.l1b_1.fe(-1.4, 1.4);
                    var builder = new JsonObjectBuilder;
                    put(builder, 't', round(time * 1e3));
                    put(builder, 'side', side);
                    var element_0 = builder.vx();
                    kicks.i(element_0);
                }
            }
            var tmp$ret$11;
            $l$block_2: {
                var tmp_1;
                if (isInterface(bodies, Collection)) {
                    tmp_1 = bodies.n();
                } else {
                    tmp_1 = false;
                }
                if (tmp_1) {
                    tmp$ret$11 = false;
                    break $l$block_2;
                }
                var _iterator__ex2g4s_1 = bodies.j();
                while (_iterator__ex2g4s_1.k()) {
                    var element_1 = _iterator__ex2g4s_1.l();
                    if (!(element_1.h1e_1 == null)) {
                        tmp$ret$11 = true;
                        break $l$block_2;
                    }
                }
                tmp$ret$11 = false;
            }
            var decided = tmp$ret$11;
            var _iterator__ex2g4s_2 = bodies.j();
            while (_iterator__ex2g4s_2.k()) {
                var body_0 = _iterator__ex2g4s_2.l();
                if (decided && body_0.h1e_1 == null) {
                    body_0.b1e_1 = body_0.b1e_1 * .94;
                    body_0.d1e_1 = body_0.d1e_1 * .94;
                }
                body_0.c1e_1 = body_0.c1e_1 - 620 * .008333333333333333;
                body_0.y1d_1 = body_0.y1d_1 + body_0.b1e_1 * .008333333333333333;
                body_0.z1d_1 = body_0.z1d_1 + body_0.c1e_1 * .008333333333333333;
                body_0.a1e_1 = body_0.a1e_1 + body_0.d1e_1 * .008333333333333333;
                body_0.d1e_1 = body_0.d1e_1 * .998;
                var tmp0 = body_0.b1e_1;
                var y = body_0.c1e_1;
                var speed = hypot(tmp0, y);
                if (speed > 1300) {
                    body_0.b1e_1 = body_0.b1e_1 * (1300 / speed);
                    body_0.c1e_1 = body_0.c1e_1 * (1300 / speed);
                }
                onFloor(this, body_0, half);
            }
            var hit = clash(this, bodies.p(0), bodies.p(1));
            if (!(hit == null) && hit.fh_1 > 70 && time - lastHit > .18) {
                lastHit = time;
                var builder_0 = new JsonObjectBuilder;
                put(builder_0, 't', round(time * 1e3));
                put(builder_0, 'x', round(hit.dh_1));
                put(builder_0, 'y', round(hit.eh_1));
                put(builder_0, 'power', round(hit.fh_1));
                var element_2 = builder_0.vx();
                hits.i(element_2);
            }
            var _iterator__ex2g4s_3 = bodies.j();
            while (_iterator__ex2g4s_3.k()) {
                var body_1 = _iterator__ex2g4s_3.l();
                if (body_1.h1e_1 == null && body_1.z1d_1 < 40) {
                    body_1.h1e_1 = time;
                    var tmp0_0 = endAt;
                    var b = time + 1.2;
                    endAt = Math.min(tmp0_0, b);
                }
            }
            var _unary__edvuaz = step;
            step = _unary__edvuaz + 1 | 0;
            if ((_unary__edvuaz % 6 | 0) === 0) {
                var _iterator__ex2g4s_4 = bodies.j();
                while (_iterator__ex2g4s_4.k()) {
                    var body_2 = _iterator__ex2g4s_4.l();
                    var element_3 = JsonPrimitive_0(round(body_2.y1d_1));
                    frames.i(element_3);
                    var element_4 = JsonPrimitive_0(round(body_2.z1d_1));
                    frames.i(element_4);
                    var element_5 = JsonPrimitive_0(round(body_2.a1e_1 * 100) / 100);
                    frames.i(element_5);
                }
            }
            time = time + .008333333333333333;
        }
        var destination_0 = ArrayList_init_$Create$_0(collectionSizeOrDefault(bodies, 10));
        var _iterator__ex2g4s_5 = bodies.j();
        while (_iterator__ex2g4s_5.k()) {
            var item_0 = _iterator__ex2g4s_5.l();
            var tmp$ret$23 = item_0.h1e_1;
            destination_0.i(tmp$ret$23);
        }
        var falls = destination_0;
        var loser = falls.p(0) == null && falls.p(1) == null ? bodies.p(0).z1d_1 < bodies.p(1).z1d_1 ? 0 : bodies.p(1).z1d_1 < bodies.p(0).z1d_1 ? 1 : null : falls.p(1) == null ? 0 : falls.p(0) == null ? 1 : ensureNotNull(falls.p(0)) < ensureNotNull(falls.p(1)) ? 0 : ensureNotNull(falls.p(1)) < ensureNotNull(falls.p(0)) ? 1 : null;
        if (!(loser == null)) {
            var _array__4zh2yp = this.p1b_1;
            var _index_0__fvwizt = 1 - loser | 0;
            _array__4zh2yp[_index_0__fvwizt] = _array__4zh2yp[_index_0__fvwizt] + 1 | 0;
        }
        var ms = numberToInt(time * 1e3);
        var builder_1 = new JsonObjectBuilder;
        put(builder_1, 'ms', ms);
        put(builder_1, 'lead', 1300);
        put(builder_1, 'total', ms + 1300 | 0);
        put(builder_1, 'step', .05 * 1e3);
        builder_1.ux('frames', new JsonArray(frames));
        var destination_1 = ArrayList_init_$Create$_0(collectionSizeOrDefault(shapes, 10));
        var _iterator__ex2g4s_6 = shapes.j();
        while (_iterator__ex2g4s_6.k()) {
            var item_1 = _iterator__ex2g4s_6.l();
            var tmp$ret$28 = linesToJson(item_1.m1e_1);
            destination_1.i(tmp$ret$28);
        }
        builder_1.ux('shapes', new JsonArray(destination_1));
        builder_1.ux('hits', new JsonArray(hits));
        builder_1.ux('kicks', new JsonArray(kicks));
        var destination_2 = ArrayList_init_$Create$_0(collectionSizeOrDefault(falls, 10));
        var _iterator__ex2g4s_7 = falls.j();
        while (_iterator__ex2g4s_7.k()) {
            var item_2 = _iterator__ex2g4s_7.l();
            var tmp$ret$31 = item_2 == null ? JsonPrimitive_0(-1) : JsonPrimitive_0(round(item_2 * 1e3));
            destination_2.i(tmp$ret$31);
        }
        builder_1.ux('falls', new JsonArray(destination_2));
        put(builder_1, 'loser', loser);
        put(builder_1, 'crumbleAfter', 9 * 1e3);
        put(builder_1, 'crumbleMs', 280 / 50 * 1e3);
        var tmp$ret$24 = builder_1.vx();
        return to(tmp$ret$24, (ms + 1300 | 0) + 1800 | 0);
    };
    protoOf(RamGame).s1d = function(_this__u8e3s4) {
        put(_this__u8e3s4, 'floor', 170);
        put(_this__u8e3s4, 'shelfHalf', 280);
    };
    protoOf(RamGame).t1d = function(_this__u8e3s4, side) {
        put(_this__u8e3s4, 'ink', 800);
        put(_this__u8e3s4, 'pad', 300);
        _this__u8e3s4.ux('mine', linesToJson(this.c1f_1[side]));
    };
    function Ram() {
        Ram_instance = this;
        this.m1g_1 = 'ram';
        this.n1g_1 = numberRangeToNumber(2, 2);
    }
    protoOf(Ram).l1a = function() {
        return this.m1g_1;
    };
    protoOf(Ram).m1a = function() {
        return this.n1g_1;
    };
    protoOf(Ram).n1a = function(players, random) {
        return new RamGame(players, random);
    };
    var Ram_instance;
    function Ram_getInstance() {
        if (Ram_instance == null) new Ram;
        return Ram_instance;
    }
    function line($this, values) {
        var this_0 = chunked(toList_0(values), 2);
        var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_0, 10));
        var _iterator__ex2g4s = this_0.j();
        while (_iterator__ex2g4s.k()) {
            var item = _iterator__ex2g4s.l();
            var x = item.p(0);
            var y = item.p(1);
            var tmp$ret$2 = new Dot(x, y);
            destination.i(tmp$ret$2);
        }
        return destination;
    }
    function RecallGame$Companion$score$lambda(from, to) {
        var sum = 0;
        var _iterator__ex2g4s = from.j();
        while (_iterator__ex2g4s.k()) {
            var element = _iterator__ex2g4s.l();
            var tmp = sum;
            var iterator = to.j();
            if (!iterator.k()) throw NoSuchElementException_init_$Create$();
            var b = iterator.l();
            var tmp0 = element.y1b_1 - b.y1b_1;
            var y = element.z1b_1 - b.z1b_1;
            var minValue = hypot(tmp0, y);
            while (iterator.k()) {
                var b_0 = iterator.l();
                var tmp0_0 = element.y1b_1 - b_0.y1b_1;
                var y_0 = element.z1b_1 - b_0.z1b_1;
                var v = hypot(tmp0_0, y_0);
                var a = minValue;
                minValue = Math.min(a, v);
            }
            sum = tmp + minValue;
        }
        return sum / from.m();
    }
    function Companion_30() {
        Companion_instance_30 = this;
        this.o1g_1 = 300;
        this.p1g_1 = 3e3;
        this.q1g_1 = 3e3;
        this.r1g_1 = 15;
        this.s1g_1 = 7e3;
        this.t1g_1 = 42;
        this.u1g_1 = mapOf_0([ to('star', listOf(line(this, new Int32Array([ 150, 30, 185, 115, 275, 120, 205, 180, 230, 270, 150, 220, 70, 270, 95, 180, 25, 120, 115, 115, 150, 30 ])))), to('house', listOf_0([ line(this, new Int32Array([ 60, 270, 60, 130, 150, 40, 240, 130, 240, 270, 60, 270 ])), line(this, new Int32Array([ 125, 270, 125, 190, 175, 190, 175, 270 ])) ])), to('heart', listOf(line(this, new Int32Array([ 150, 270, 50, 165, 30, 105, 60, 55, 110, 50, 150, 95, 190, 50, 240, 55, 270, 105, 250, 165, 150, 270 ])))), to('zigzag', listOf(line(this, new Int32Array([ 30, 240, 80, 60, 130, 240, 180, 60, 230, 240, 270, 90 ])))), to('fish', listOf(line(this, new Int32Array([ 30, 150, 80, 90, 160, 80, 220, 140, 275, 90, 275, 210, 220, 160, 160, 220, 80, 210, 30, 150 ])))), to('arrow', listOf(line(this, new Int32Array([ 30, 120, 170, 120, 170, 60, 275, 150, 170, 240, 170, 180, 30, 180, 30, 120 ])))), to('bolt', listOf(line(this, new Int32Array([ 180, 25, 80, 165, 145, 165, 110, 275, 225, 120, 160, 120, 180, 25 ])))), to('crown', listOf(line(this, new Int32Array([ 40, 240, 30, 80, 95, 150, 150, 50, 205, 150, 270, 80, 260, 240, 40, 240 ])))), to('boat', listOf_0([ line(this, new Int32Array([ 30, 190, 270, 190, 225, 260, 75, 260, 30, 190 ])), line(this, new Int32Array([ 150, 190, 150, 40, 235, 150, 150, 150 ])) ])), to('tree', listOf_0([ line(this, new Int32Array([ 150, 25, 225, 115, 190, 115, 255, 205, 45, 205, 110, 115, 75, 115, 150, 25 ])), line(this, new Int32Array([ 130, 205, 130, 275, 170, 275, 170, 205 ])) ])), to('letter', listOf_0([ line(this, new Int32Array([ 30, 80, 270, 80, 270, 225, 30, 225, 30, 80 ])), line(this, new Int32Array([ 30, 80, 150, 170, 270, 80 ])) ])), to('spiral', listOf(line(this, new Int32Array([ 150, 150, 175, 150, 175, 120, 125, 120, 115, 180, 200, 190, 215, 90, 90, 80, 70, 215, 240, 235, 260, 45, 50, 40 ])))) ]);
    }
    protoOf(Companion_30).v1g = function(drawing, target) {
        var drawn = flatten(drawing);
        if (drawn.m() < 2) return emptyList();
        var wanted = flatten(target);
        var iterator = drawn.j();
        if (!iterator.k()) throw NoSuchElementException_init_$Create$();
        var maxValue = iterator.l().y1b_1;
        while (iterator.k()) {
            var v = iterator.l().y1b_1;
            var a = maxValue;
            maxValue = Math.max(a, v);
        }
        var tmp = maxValue;
        var iterator_0 = drawn.j();
        if (!iterator_0.k()) throw NoSuchElementException_init_$Create$();
        var minValue = iterator_0.l().y1b_1;
        while (iterator_0.k()) {
            var v_0 = iterator_0.l().y1b_1;
            var a_0 = minValue;
            minValue = Math.min(a_0, v_0);
        }
        var width = tmp - minValue;
        var iterator_1 = drawn.j();
        if (!iterator_1.k()) throw NoSuchElementException_init_$Create$();
        var maxValue_0 = iterator_1.l().z1b_1;
        while (iterator_1.k()) {
            var v_1 = iterator_1.l().z1b_1;
            var a_1 = maxValue_0;
            maxValue_0 = Math.max(a_1, v_1);
        }
        var tmp_0 = maxValue_0;
        var iterator_2 = drawn.j();
        if (!iterator_2.k()) throw NoSuchElementException_init_$Create$();
        var minValue_0 = iterator_2.l().z1b_1;
        while (iterator_2.k()) {
            var v_2 = iterator_2.l().z1b_1;
            var a_2 = minValue_0;
            minValue_0 = Math.min(a_2, v_2);
        }
        var height = tmp_0 - minValue_0;
        var iterator_3 = wanted.j();
        if (!iterator_3.k()) throw NoSuchElementException_init_$Create$();
        var maxValue_1 = iterator_3.l().y1b_1;
        while (iterator_3.k()) {
            var v_3 = iterator_3.l().y1b_1;
            var a_3 = maxValue_1;
            maxValue_1 = Math.max(a_3, v_3);
        }
        var tmp_1 = maxValue_1;
        var iterator_4 = wanted.j();
        if (!iterator_4.k()) throw NoSuchElementException_init_$Create$();
        var minValue_1 = iterator_4.l().y1b_1;
        while (iterator_4.k()) {
            var v_4 = iterator_4.l().y1b_1;
            var a_4 = minValue_1;
            minValue_1 = Math.min(a_4, v_4);
        }
        var wantedWidth = tmp_1 - minValue_1;
        var iterator_5 = wanted.j();
        if (!iterator_5.k()) throw NoSuchElementException_init_$Create$();
        var maxValue_2 = iterator_5.l().z1b_1;
        while (iterator_5.k()) {
            var v_5 = iterator_5.l().z1b_1;
            var a_5 = maxValue_2;
            maxValue_2 = Math.max(a_5, v_5);
        }
        var tmp_2 = maxValue_2;
        var iterator_6 = wanted.j();
        if (!iterator_6.k()) throw NoSuchElementException_init_$Create$();
        var minValue_2 = iterator_6.l().z1b_1;
        while (iterator_6.k()) {
            var v_6 = iterator_6.l().z1b_1;
            var a_6 = minValue_2;
            minValue_2 = Math.min(a_6, v_6);
        }
        var wantedHeight = tmp_2 - minValue_2;
        var tmp_3;
        if (Math.max(width, height) === 0) {
            tmp_3 = 1;
        } else {
            var tmp_4 = Math.max(wantedWidth, wantedHeight);
            tmp_3 = tmp_4 / Math.max(width, height);
        }
        var scale = tmp_3;
        var iterator_7 = drawn.j();
        if (!iterator_7.k()) throw NoSuchElementException_init_$Create$();
        var maxValue_3 = iterator_7.l().y1b_1;
        while (iterator_7.k()) {
            var v_7 = iterator_7.l().y1b_1;
            var a_7 = maxValue_3;
            maxValue_3 = Math.max(a_7, v_7);
        }
        var tmp_5 = maxValue_3;
        var iterator_8 = drawn.j();
        if (!iterator_8.k()) throw NoSuchElementException_init_$Create$();
        var minValue_3 = iterator_8.l().y1b_1;
        while (iterator_8.k()) {
            var v_8 = iterator_8.l().y1b_1;
            var a_8 = minValue_3;
            minValue_3 = Math.min(a_8, v_8);
        }
        var middleX = (tmp_5 + minValue_3) / 2;
        var iterator_9 = drawn.j();
        if (!iterator_9.k()) throw NoSuchElementException_init_$Create$();
        var maxValue_4 = iterator_9.l().z1b_1;
        while (iterator_9.k()) {
            var v_9 = iterator_9.l().z1b_1;
            var a_9 = maxValue_4;
            maxValue_4 = Math.max(a_9, v_9);
        }
        var tmp_6 = maxValue_4;
        var iterator_10 = drawn.j();
        if (!iterator_10.k()) throw NoSuchElementException_init_$Create$();
        var minValue_4 = iterator_10.l().z1b_1;
        while (iterator_10.k()) {
            var v_10 = iterator_10.l().z1b_1;
            var a_10 = minValue_4;
            minValue_4 = Math.min(a_10, v_10);
        }
        var middleY = (tmp_6 + minValue_4) / 2;
        var iterator_11 = wanted.j();
        if (!iterator_11.k()) throw NoSuchElementException_init_$Create$();
        var maxValue_5 = iterator_11.l().y1b_1;
        while (iterator_11.k()) {
            var v_11 = iterator_11.l().y1b_1;
            var a_11 = maxValue_5;
            maxValue_5 = Math.max(a_11, v_11);
        }
        var tmp_7 = maxValue_5;
        var iterator_12 = wanted.j();
        if (!iterator_12.k()) throw NoSuchElementException_init_$Create$();
        var minValue_5 = iterator_12.l().y1b_1;
        while (iterator_12.k()) {
            var v_12 = iterator_12.l().y1b_1;
            var a_12 = minValue_5;
            minValue_5 = Math.min(a_12, v_12);
        }
        var toX = (tmp_7 + minValue_5) / 2;
        var iterator_13 = wanted.j();
        if (!iterator_13.k()) throw NoSuchElementException_init_$Create$();
        var maxValue_6 = iterator_13.l().z1b_1;
        while (iterator_13.k()) {
            var v_13 = iterator_13.l().z1b_1;
            var a_13 = maxValue_6;
            maxValue_6 = Math.max(a_13, v_13);
        }
        var tmp_8 = maxValue_6;
        var iterator_14 = wanted.j();
        if (!iterator_14.k()) throw NoSuchElementException_init_$Create$();
        var minValue_6 = iterator_14.l().z1b_1;
        while (iterator_14.k()) {
            var v_14 = iterator_14.l().z1b_1;
            var a_14 = minValue_6;
            minValue_6 = Math.min(a_14, v_14);
        }
        var toY = (tmp_8 + minValue_6) / 2;
        var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(drawing, 10));
        var _iterator__ex2g4s = drawing.j();
        while (_iterator__ex2g4s.k()) {
            var item = _iterator__ex2g4s.l();
            var destination_0 = ArrayList_init_$Create$_0(collectionSizeOrDefault(item, 10));
            var _iterator__ex2g4s_0 = item.j();
            while (_iterator__ex2g4s_0.k()) {
                var item_0 = _iterator__ex2g4s_0.l();
                var tmp$ret$72 = new Dot(toX + (item_0.y1b_1 - middleX) * scale, toY + (item_0.z1b_1 - middleY) * scale);
                destination_0.i(tmp$ret$72);
            }
            destination.i(destination_0);
        }
        return destination;
    };
    protoOf(Companion_30).w1g = function(drawing, target) {
        if (drawing.n()) return 0;
        var destination = ArrayList_init_$Create$();
        var _iterator__ex2g4s = drawing.j();
        while (_iterator__ex2g4s.k()) {
            var element = _iterator__ex2g4s.l();
            var list = resample(element, 6);
            addAll(destination, list);
        }
        var mine = destination;
        var destination_0 = ArrayList_init_$Create$();
        var _iterator__ex2g4s_0 = target.j();
        while (_iterator__ex2g4s_0.k()) {
            var element_0 = _iterator__ex2g4s_0.l();
            var list_0 = resample(element_0, 6);
            addAll(destination_0, list_0);
        }
        var theirs = destination_0;
        if (mine.n()) return 0;
        var nearest = RecallGame$Companion$score$lambda;
        var apart = (nearest(mine, theirs) + nearest(theirs, mine)) / 2;
        var b = 1 - apart / 42;
        var tmp$ret$6 = Math.max(0, b);
        return numberToInt(round(100 * tmp$ret$6));
    };
    var Companion_instance_30;
    function Companion_getInstance_30() {
        if (Companion_instance_30 == null) {
            Companion_instance_28;
            new Companion_30;
        }
        return Companion_instance_30;
    }
    function RecallGame(players, random, pointsToWin) {
        Companion_getInstance_30();
        pointsToWin = pointsToWin === VOID ? 3 : pointsToWin;
        DoodleGame.call(this, players, random, pointsToWin);
        this.l1h_1 = Recall_getInstance().p1h_1;
        var tmp = this;
        var tmp_0 = 0;
        var tmp_1 = Array(2);
        while (tmp_0 < 2) {
            tmp_1[tmp_0] = emptyList();
            tmp_0 = tmp_0 + 1 | 0;
        }
        tmp.m1h_1 = tmp_1;
        this.n1h_1 = toMutableList_0(shuffled(Companion_getInstance_30().u1g_1.u1(), random));
        this.o1h_1 = '';
        this.l1d();
    }
    protoOf(RecallGame).m1d = function() {
        return this.l1h_1;
    };
    protoOf(RecallGame).n1d = function() {
        return 15;
    };
    protoOf(RecallGame).u1d = function() {
        return 3e3;
    };
    protoOf(RecallGame).o1d = function() {
        var tmp = this;
        var tmp_0 = 0;
        var tmp_1 = Array(2);
        while (tmp_0 < 2) {
            tmp_1[tmp_0] = emptyList();
            tmp_0 = tmp_0 + 1 | 0;
        }
        tmp.m1h_1 = tmp_1;
        if (this.n1h_1.n()) {
            var tmp0 = this.n1h_1;
            var elements = shuffled(Companion_getInstance_30().u1g_1.u1(), this.l1b_1);
            addAll(tmp0, elements);
        }
        this.o1h_1 = this.n1h_1.e3(0);
    };
    protoOf(RecallGame).p1d = function(side, action) {
        var tmp = this.m1h_1;
        var tmp0_elvis_lhs = readStrokes(action.jx('strokes'), 300, 300, 3e3);
        var tmp_0;
        if (tmp0_elvis_lhs == null) {
            return false;
        } else {
            tmp_0 = tmp0_elvis_lhs;
        }
        tmp[side] = tmp_0;
        return true;
    };
    protoOf(RecallGame).r1d = function() {
        var target = getValue(Companion_getInstance_30().u1g_1, this.o1h_1);
        var this_0 = this.m1h_1;
        var destination = ArrayList_init_$Create$_0(this_0.length);
        var inductionVariable = 0;
        var last = this_0.length;
        while (inductionVariable < last) {
            var item = this_0[inductionVariable];
            inductionVariable = inductionVariable + 1 | 0;
            var tmp$ret$2 = Companion_getInstance_30().v1g(item, target);
            destination.i(tmp$ret$2);
        }
        var fitted = destination;
        var destination_0 = ArrayList_init_$Create$_0(collectionSizeOrDefault(fitted, 10));
        var _iterator__ex2g4s = fitted.j();
        while (_iterator__ex2g4s.k()) {
            var item_0 = _iterator__ex2g4s.l();
            var tmp$ret$5 = Companion_getInstance_30().w1g(item_0, target);
            destination_0.i(tmp$ret$5);
        }
        var scores = destination_0;
        if (scores.p(0) > scores.p(1)) {
            var _array__4zh2yp = this.p1b_1;
            _array__4zh2yp[0] = _array__4zh2yp[0] + 1 | 0;
        }
        if (scores.p(1) > scores.p(0)) {
            var _array__4zh2yp_0 = this.p1b_1;
            _array__4zh2yp_0[1] = _array__4zh2yp_0[1] + 1 | 0;
        }
        var builder = new JsonObjectBuilder;
        put(builder, 'ms', 7e3);
        put_0(builder, 'shape', this.o1h_1);
        builder.ux('target', linesToJson(target));
        var destination_1 = ArrayList_init_$Create$_0(collectionSizeOrDefault(fitted, 10));
        var _iterator__ex2g4s_0 = fitted.j();
        while (_iterator__ex2g4s_0.k()) {
            var item_1 = _iterator__ex2g4s_0.l();
            var tmp$ret$10 = linesToJson(item_1);
            destination_1.i(tmp$ret$10);
        }
        builder.ux('drawings', new JsonArray(destination_1));
        var destination_2 = ArrayList_init_$Create$_0(collectionSizeOrDefault(scores, 10));
        var _iterator__ex2g4s_1 = scores.j();
        while (_iterator__ex2g4s_1.k()) {
            var item_2 = _iterator__ex2g4s_1.l();
            var tmp$ret$13 = JsonPrimitive_0(item_2);
            destination_2.i(tmp$ret$13);
        }
        builder.ux('scores', new JsonArray(destination_2));
        var tmp$ret$6 = builder.vx();
        return to(tmp$ret$6, 7e3);
    };
    protoOf(RecallGame).s1d = function(_this__u8e3s4) {
        put(_this__u8e3s4, 'pad', 300);
        _this__u8e3s4.ux('flash', this.n1b_1 === 'prelude' ? linesToJson(getValue(Companion_getInstance_30().u1g_1, this.o1h_1)) : JsonNull_getInstance());
        put(_this__u8e3s4, 'flashMs', 3e3);
    };
    protoOf(RecallGame).t1d = function(_this__u8e3s4, side) {
        put(_this__u8e3s4, 'pad', 300);
        put(_this__u8e3s4, 'ink', 3e3);
        _this__u8e3s4.ux('mine', linesToJson(this.m1h_1[side]));
    };
    function Recall() {
        Recall_instance = this;
        this.p1h_1 = 'recall';
        this.q1h_1 = numberRangeToNumber(2, 2);
    }
    protoOf(Recall).l1a = function() {
        return this.p1h_1;
    };
    protoOf(Recall).m1a = function() {
        return this.q1h_1;
    };
    protoOf(Recall).n1a = function(players, random) {
        return new RecallGame(players, random);
    };
    var Recall_instance;
    function Recall_getInstance() {
        if (Recall_instance == null) new Recall;
        return Recall_instance;
    }
    function routeWithBase($this, line) {
        return line.n() ? emptyList() : plus(listOf(new Dot(60, 562 / 2)), line);
    }
    function turned($this, side, line) {
        var tmp;
        if (side === 0) {
            tmp = line;
        } else {
            var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(line, 10));
            var _iterator__ex2g4s = line.j();
            while (_iterator__ex2g4s.k()) {
                var item = _iterator__ex2g4s.l();
                var tmp$ret$2 = new Dot(800 - item.y1b_1, item.z1b_1);
                destination.i(tmp$ret$2);
            }
            tmp = destination;
        }
        return tmp;
    }
    function Flyer(side, path) {
        this.r1h_1 = side;
        this.s1h_1 = path;
        this.t1h_1 = lineLength(this.s1h_1);
        this.u1h_1 = 0;
        this.v1h_1 = 0;
        var tmp = this;
        var tmp0_safe_receiver = firstOrNull(this.s1h_1);
        var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.y1b_1;
        tmp.w1h_1 = tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
        var tmp_0 = this;
        var tmp0_safe_receiver_0 = firstOrNull(this.s1h_1);
        var tmp1_elvis_lhs_0 = tmp0_safe_receiver_0 == null ? null : tmp0_safe_receiver_0.z1b_1;
        tmp_0.x1h_1 = tmp1_elvis_lhs_0 == null ? 0 : tmp1_elvis_lhs_0;
        this.y1h_1 = null;
        this.z1h_1 = 0;
    }
    protoOf(Flyer).a1i = function(distance) {
        var left = distance;
        while (left > 0 && this.u1h_1 < (this.s1h_1.m() - 1 | 0)) {
            var from = this.s1h_1.p(this.u1h_1);
            var to = this.s1h_1.p(this.u1h_1 + 1 | 0);
            var tmp0 = to.y1b_1 - from.y1b_1;
            var y = to.z1b_1 - from.z1b_1;
            var step = hypot(tmp0, y);
            if (this.v1h_1 + left < step) {
                this.v1h_1 = this.v1h_1 + left;
                this.z1h_1 = this.z1h_1 + left;
                left = 0;
            } else {
                left = left - (step - this.v1h_1);
                this.z1h_1 = this.z1h_1 + (step - this.v1h_1);
                this.v1h_1 = 0;
                this.u1h_1 = this.u1h_1 + 1 | 0;
            }
        }
        if (this.u1h_1 >= (this.s1h_1.m() - 1 | 0)) {
            this.w1h_1 = last(this.s1h_1).y1b_1;
            this.x1h_1 = last(this.s1h_1).z1b_1;
            return false;
        }
        var from_0 = this.s1h_1.p(this.u1h_1);
        var to_0 = this.s1h_1.p(this.u1h_1 + 1 | 0);
        var tmp0_0 = to_0.y1b_1 - from_0.y1b_1;
        var y_0 = to_0.z1b_1 - from_0.z1b_1;
        var step_0 = hypot(tmp0_0, y_0);
        this.w1h_1 = from_0.y1b_1 + (to_0.y1b_1 - from_0.y1b_1) * this.v1h_1 / step_0;
        this.x1h_1 = from_0.z1b_1 + (to_0.z1b_1 - from_0.z1b_1) * this.v1h_1 / step_0;
        return true;
    };
    function distanceToLine($this, x, y, line) {
        var best = 17976931348623157e292;
        var inductionVariable = 0;
        var last = line.m() - 1 | 0;
        if (inductionVariable < last) do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var a = line.p(i);
            var b = line.p(i + 1 | 0);
            var dx = b.y1b_1 - a.y1b_1;
            var dy = b.z1b_1 - a.z1b_1;
            var square = dx * dx + dy * dy;
            var along = square === 0 ? 0 : coerceIn(((x - a.y1b_1) * dx + (y - a.z1b_1) * dy) / square, 0, 1);
            var tmp0 = best;
            var tmp0_0 = a.y1b_1 + along * dx - x;
            var y_0 = a.z1b_1 + along * dy - y;
            var b_0 = hypot(tmp0_0, y_0);
            best = Math.min(tmp0, b_0);
        } while (inductionVariable < last);
        return best;
    }
    function Companion_31() {
        this.b1i_1 = 800;
        this.c1i_1 = 562;
        this.d1i_1 = 60;
        this.e1i_1 = 46;
        this.f1i_1 = 1050;
        this.g1i_1 = 340;
        this.h1i_1 = 240;
        this.i1i_1 = .016666666666666666;
        this.j1i_1 = 8;
        this.k1i_1 = 24;
        this.l1i_1 = 30;
        this.m1i_1 = 20;
        this.n1i_1 = 2200;
    }
    var Companion_instance_31;
    function Companion_getInstance_31() {
        return Companion_instance_31;
    }
    function RocketsGame(players, random, pointsToWin) {
        pointsToWin = pointsToWin === VOID ? 3 : pointsToWin;
        DoodleGame.call(this, players, random, pointsToWin);
        this.c1j_1 = Rockets_getInstance().f1j_1;
        var tmp = this;
        var tmp_0 = 0;
        var tmp_1 = Array(2);
        while (tmp_0 < 2) {
            tmp_1[tmp_0] = emptyList();
            tmp_0 = tmp_0 + 1 | 0;
        }
        tmp.d1j_1 = tmp_1;
        var tmp_2 = this;
        var tmp_3 = 0;
        var tmp_4 = Array(2);
        while (tmp_3 < 2) {
            tmp_4[tmp_3] = emptyList();
            tmp_3 = tmp_3 + 1 | 0;
        }
        tmp_2.e1j_1 = tmp_4;
        this.l1d();
    }
    protoOf(RocketsGame).m1d = function() {
        return this.c1j_1;
    };
    protoOf(RocketsGame).n1d = function() {
        return 20;
    };
    protoOf(RocketsGame).o1d = function() {
        var progression = get_indices(this.d1j_1);
        var inductionVariable = progression.w_1;
        var last = progression.x_1;
        if (inductionVariable <= last) do {
            var element = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var it = element;
            this.d1j_1[it] = emptyList();
            this.e1j_1[it] = emptyList();
        } while (!(element === last));
    };
    protoOf(RocketsGame).p1d = function(side, action) {
        var tmp0_safe_receiver = action.jx('layer');
        var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : get_jsonPrimitive(tmp0_safe_receiver);
        var layer = tmp1_safe_receiver == null ? null : get_contentOrNull(tmp1_safe_receiver);
        if (layer === 'rocket') {
            var b = 1050 - lineLength(this.e1j_1[side]);
            var inkLeft = Math.max(0, b);
            var tmp2_elvis_lhs = readStrokes(action.jx('strokes'), 800, 562, 1050);
            var tmp;
            if (tmp2_elvis_lhs == null) {
                return false;
            } else {
                tmp = tmp2_elvis_lhs;
            }
            var tmp3_elvis_lhs = firstOrNull(tmp);
            var line = tmp3_elvis_lhs == null ? emptyList() : tmp3_elvis_lhs;
            this.d1j_1[side] = drop(cutToInk(routeWithBase(this, line), inkLeft), 1);
            return true;
        }
        if (layer === 'wall') {
            var tmp4_elvis_lhs = readStrokes(action.jx('strokes'), 800, 562, 340);
            var tmp_0;
            if (tmp4_elvis_lhs == null) {
                return false;
            } else {
                tmp_0 = tmp4_elvis_lhs;
            }
            var tmp5_elvis_lhs = firstOrNull(tmp_0);
            var line_0 = tmp5_elvis_lhs == null ? emptyList() : tmp5_elvis_lhs;
            var list = ArrayList_init_$Create$();
            var _iterator__ex2g4s = line_0.j();
            $l$loop: while (_iterator__ex2g4s.k()) {
                var item = _iterator__ex2g4s.l();
                if (!(item.y1b_1 <= 800 / 2)) break $l$loop;
                list.i(item);
            }
            var own = list;
            var b_0 = 1050 - lineLength(routeWithBase(this, this.d1j_1[side]));
            var inkLeft_0 = Math.max(0, b_0);
            this.e1j_1[side] = cutToInk(own, inkLeft_0);
            return true;
        }
        return false;
    };
    protoOf(RocketsGame).r1d = function() {
        var this_0 = numberRangeToNumber(0, 1);
        var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_0, 10));
        var inductionVariable = this_0.w_1;
        var last = this_0.x_1;
        if (inductionVariable <= last) do {
            var item = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var it = item;
            var tmp$ret$2 = turned(this, it, this.e1j_1[it]);
            destination.i(tmp$ret$2);
        } while (!(item === last));
        var fieldWalls = destination;
        var this_1 = numberRangeToNumber(0, 1);
        var destination_0 = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_1, 10));
        var inductionVariable_0 = this_1.w_1;
        var last_0 = this_1.x_1;
        if (inductionVariable_0 <= last_0) do {
            var item_0 = inductionVariable_0;
            inductionVariable_0 = inductionVariable_0 + 1 | 0;
            var side = item_0;
            var tmp$ret$5 = new Flyer(side, turned(this, side, routeWithBase(this, this.d1j_1[side])));
            destination_0.i(tmp$ret$5);
        } while (!(item_0 === last_0));
        var flyers = destination_0;
        var time = 0;
        var ends = Array(2);
        var _iterator__ex2g4s = flyers.j();
        while (_iterator__ex2g4s.k()) {
            var flyer = _iterator__ex2g4s.l();
            if (flyer.s1h_1.m() < 2) {
                flyer.y1h_1 = 'none';
                ends[flyer.r1h_1] = 0;
            }
        }
        $l$loop: while (true) {
            var tmp$ret$7;
            $l$block_0: {
                var tmp;
                if (isInterface(flyers, Collection)) {
                    tmp = flyers.n();
                } else {
                    tmp = false;
                }
                if (tmp) {
                    tmp$ret$7 = false;
                    break $l$block_0;
                }
                var _iterator__ex2g4s_0 = flyers.j();
                while (_iterator__ex2g4s_0.k()) {
                    var element = _iterator__ex2g4s_0.l();
                    if (element.y1h_1 == null) {
                        tmp$ret$7 = true;
                        break $l$block_0;
                    }
                }
                tmp$ret$7 = false;
            }
            if (!tmp$ret$7) {
                break $l$loop;
            }
            time = time + .016666666666666666;
            var _iterator__ex2g4s_1 = flyers.j();
            $l$loop_0: while (_iterator__ex2g4s_1.k()) {
                var flyer_0 = _iterator__ex2g4s_1.l();
                if (!(flyer_0.y1h_1 == null)) continue $l$loop_0;
                var flying = flyer_0.a1i(240 * .016666666666666666);
                var rivalBaseX = flyer_0.r1h_1 === 0 ? 800 - 60 : 60;
                var tmp0 = flyer_0.w1h_1 - rivalBaseX;
                var y = flyer_0.x1h_1 - 562 / 2;
                if (hypot(tmp0, y) <= 46) flyer_0.y1h_1 = 'base'; else {
                    var tmp_0;
                    if (flyer_0.z1h_1 > 30) {
                        var tmp$ret$10;
                        $l$block_2: {
                            var tmp_1;
                            if (isInterface(fieldWalls, Collection)) {
                                tmp_1 = fieldWalls.n();
                            } else {
                                tmp_1 = false;
                            }
                            if (tmp_1) {
                                tmp$ret$10 = false;
                                break $l$block_2;
                            }
                            var _iterator__ex2g4s_2 = fieldWalls.j();
                            while (_iterator__ex2g4s_2.k()) {
                                var element_0 = _iterator__ex2g4s_2.l();
                                if (element_0.m() >= 2 && distanceToLine(this, flyer_0.w1h_1, flyer_0.x1h_1, element_0) <= 8) {
                                    tmp$ret$10 = true;
                                    break $l$block_2;
                                }
                            }
                            tmp$ret$10 = false;
                        }
                        tmp_0 = tmp$ret$10;
                    } else {
                        tmp_0 = false;
                    }
                    if (tmp_0) flyer_0.y1h_1 = 'wall'; else {
                        if (!flying) flyer_0.y1h_1 = 'fuel';
                    }
                }
                if (!(flyer_0.y1h_1 == null)) {
                    ends[flyer_0.r1h_1] = time;
                }
            }
            var a = flyers.p(0);
            var b = flyers.p(1);
            var tmp_2;
            if (a.y1h_1 == null && b.y1h_1 == null) {
                var tmp0_0 = a.w1h_1 - b.w1h_1;
                var y_0 = a.x1h_1 - b.x1h_1;
                tmp_2 = hypot(tmp0_0, y_0) <= 24;
            } else {
                tmp_2 = false;
            }
            if (tmp_2) {
                a.y1h_1 = 'rocket';
                b.y1h_1 = 'rocket';
                ends[0] = time;
                ends[1] = time;
            }
        }
        var _iterator__ex2g4s_3 = flyers.j();
        while (_iterator__ex2g4s_3.k()) {
            var flyer_1 = _iterator__ex2g4s_3.l();
            if (flyer_1.y1h_1 === 'base') {
                var _array__4zh2yp = this.p1b_1;
                var _index_0__fvwizt = flyer_1.r1h_1;
                _array__4zh2yp[_index_0__fvwizt] = _array__4zh2yp[_index_0__fvwizt] + 1 | 0;
            }
        }
        var ms = numberToInt(time * 1e3);
        var builder = new JsonObjectBuilder;
        put(builder, 'ms', ms);
        builder.ux('walls', linesToJson(fieldWalls));
        var destination_1 = ArrayList_init_$Create$_0(collectionSizeOrDefault(flyers, 10));
        var _iterator__ex2g4s_4 = flyers.j();
        while (_iterator__ex2g4s_4.k()) {
            var item_1 = _iterator__ex2g4s_4.l();
            var builder_0 = new JsonObjectBuilder;
            put(builder_0, 'side', item_1.r1h_1);
            put_0(builder_0, 'end', item_1.y1h_1);
            put(builder_0, 'x', round(item_1.w1h_1));
            put(builder_0, 'y', round(item_1.x1h_1));
            var tmp0_elvis_lhs = ends[item_1.r1h_1];
            put(builder_0, 'ms', round((tmp0_elvis_lhs == null ? 0 : tmp0_elvis_lhs) * 1e3));
            put(builder_0, 'flown', round(item_1.z1h_1));
            builder_0.ux('path', lineToJson(item_1.s1h_1));
            var tmp$ret$19 = builder_0.vx();
            destination_1.i(tmp$ret$19);
        }
        builder.ux('rockets', new JsonArray(destination_1));
        var tmp$ret$15 = builder.vx();
        return to(tmp$ret$15, ms + 2200 | 0);
    };
    protoOf(RocketsGame).s1d = function(_this__u8e3s4) {
        put(_this__u8e3s4, 'width', 800);
        put(_this__u8e3s4, 'height', 562);
        put(_this__u8e3s4, 'baseX', 60);
        put(_this__u8e3s4, 'baseRadius', 46);
    };
    protoOf(RocketsGame).t1d = function(_this__u8e3s4, side) {
        put(_this__u8e3s4, 'width', 800);
        put(_this__u8e3s4, 'height', 562);
        put(_this__u8e3s4, 'ink', 1050);
        put(_this__u8e3s4, 'wallInk', 340);
        put(_this__u8e3s4, 'baseX', 60);
        put(_this__u8e3s4, 'baseRadius', 46);
        _this__u8e3s4.ux('rocket', lineToJson(this.d1j_1[side]));
        _this__u8e3s4.ux('wall', lineToJson(this.e1j_1[side]));
    };
    function Rockets() {
        Rockets_instance = this;
        this.f1j_1 = 'rockets';
        this.g1j_1 = numberRangeToNumber(2, 2);
    }
    protoOf(Rockets).l1a = function() {
        return this.f1j_1;
    };
    protoOf(Rockets).m1a = function() {
        return this.g1j_1;
    };
    protoOf(Rockets).n1a = function(players, random) {
        return new RocketsGame(players, random);
    };
    var Rockets_instance;
    function Rockets_getInstance() {
        if (Rockets_instance == null) new Rockets;
        return Rockets_instance;
    }
    function Delivery(to, message) {
        this.h1j_1 = to;
        this.i1j_1 = message;
    }
    protoOf(Delivery).toString = function() {
        return 'Delivery(to=' + this.h1j_1 + ', message=' + this.i1j_1.toString() + ')';
    };
    protoOf(Delivery).hashCode = function() {
        var result = getStringHashCode(this.h1j_1);
        result = imul(result, 31) + this.i1j_1.hashCode() | 0;
        return result;
    };
    protoOf(Delivery).equals = function(other) {
        if (this === other) return true;
        if (!(other instanceof Delivery)) return false;
        if (!(this.h1j_1 === other.h1j_1)) return false;
        if (!this.i1j_1.equals(other.i1j_1)) return false;
        return true;
    };
    function Player(id, name, online) {
        online = online === VOID ? true : online;
        this.j1j_1 = id;
        this.k1j_1 = name;
        this.l1j_1 = online;
    }
    function host($this) {
        var tmp0 = $this.n1j_1;
        var tmp$ret$0;
        $l$block: {
            var _iterator__ex2g4s = tmp0.j();
            while (_iterator__ex2g4s.k()) {
                var element = _iterator__ex2g4s.l();
                if (element.l1j_1) {
                    tmp$ret$0 = element;
                    break $l$block;
                }
            }
            tmp$ret$0 = null;
        }
        return tmp$ret$0;
    }
    function join($this, id, name) {
        var tmp$ret$0 = toString_1(trim(isCharSequence(name) ? name : THROW_CCE()));
        var this_0 = take_0(tmp$ret$0, 16);
        var tmp;
        if (charSequenceLength(this_0) === 0) {
            tmp = '?';
        } else {
            tmp = this_0;
        }
        var shown = tmp;
        var tmp0 = $this.n1j_1;
        var tmp$ret$4;
        $l$block: {
            var _iterator__ex2g4s = tmp0.j();
            while (_iterator__ex2g4s.k()) {
                var element = _iterator__ex2g4s.l();
                if (element.j1j_1 === id) {
                    tmp$ret$4 = element;
                    break $l$block;
                }
            }
            tmp$ret$4 = null;
        }
        var player = tmp$ret$4;
        if (!(player == null)) {
            player.k1j_1 = shown;
            player.l1j_1 = true;
        } else {
            var tmp0_0 = $this.n1j_1;
            var element_0 = new Player(id, shown);
            tmp0_0.i(element_0);
        }
        return true;
    }
    function leave($this, player) {
        $this.n1j_1.x2(player);
        if ($this.q1j_1.m1(player.j1j_1)) {
            endGame($this);
        }
        return true;
    }
    function browse($this, id) {
        if (!($this.o1j_1 == null) || id == null || id === $this.s1j_1) return false;
        var tmp0 = get_GAMES();
        var tmp$ret$0;
        $l$block_0: {
            var tmp;
            if (isInterface(tmp0, Collection)) {
                tmp = tmp0.n();
            } else {
                tmp = false;
            }
            if (tmp) {
                tmp$ret$0 = true;
                break $l$block_0;
            }
            var _iterator__ex2g4s = tmp0.j();
            while (_iterator__ex2g4s.k()) {
                var element = _iterator__ex2g4s.l();
                if (element.l1a() === id) {
                    tmp$ret$0 = false;
                    break $l$block_0;
                }
            }
            tmp$ret$0 = true;
        }
        if (tmp$ret$0) return false;
        $this.s1j_1 = id;
        return true;
    }
    function start($this, id) {
        var tmp0 = get_GAMES();
        var tmp$ret$0;
        $l$block: {
            var _iterator__ex2g4s = tmp0.j();
            while (_iterator__ex2g4s.k()) {
                var element = _iterator__ex2g4s.l();
                if (element.l1a() === id) {
                    tmp$ret$0 = element;
                    break $l$block;
                }
            }
            tmp$ret$0 = null;
        }
        var tmp0_elvis_lhs = tmp$ret$0;
        var tmp;
        if (tmp0_elvis_lhs == null) {
            return false;
        } else {
            tmp = tmp0_elvis_lhs;
        }
        var kind = tmp;
        var tmp0_0 = $this.n1j_1;
        var destination = ArrayList_init_$Create$();
        var _iterator__ex2g4s_0 = tmp0_0.j();
        while (_iterator__ex2g4s_0.k()) {
            var element_0 = _iterator__ex2g4s_0.l();
            if (element_0.l1j_1) {
                destination.i(element_0);
            }
        }
        var destination_0 = ArrayList_init_$Create$_0(collectionSizeOrDefault(destination, 10));
        var _iterator__ex2g4s_1 = destination.j();
        while (_iterator__ex2g4s_1.k()) {
            var item = _iterator__ex2g4s_1.l();
            var tmp$ret$7 = item.j1j_1;
            destination_0.i(tmp$ret$7);
        }
        var sitting = take(destination_0, kind.m1a().x_1);
        var tmp_0;
        if (!($this.o1j_1 == null)) {
            tmp_0 = true;
        } else {
            var progression = kind.m1a();
            var containsLower = progression.w_1;
            var containsUpper = progression.x_1;
            var containsArg = sitting.m();
            tmp_0 = !(containsLower <= containsArg ? containsArg <= containsUpper : false);
        }
        if (tmp_0) return false;
        $this.o1j_1 = kind.n1a(sitting, $this.m1j_1);
        $this.p1j_1 = kind.l1a();
        $this.s1j_1 = kind.l1a();
        $this.q1j_1 = toSet_0(sitting);
        return true;
    }
    function rematch($this, player) {
        var tmp;
        var tmp0_safe_receiver = $this.o1j_1;
        if ((tmp0_safe_receiver == null ? null : tmp0_safe_receiver.f1a()) == null) {
            tmp = true;
        } else {
            tmp = !$this.q1j_1.m1(player.j1j_1);
        }
        if (tmp) return false;
        if (!equals(player, host($this))) {
            if ($this.r1j_1 === player.j1j_1) return false;
            $this.r1j_1 = player.j1j_1;
            return true;
        }
        var tmp0 = $this.n1j_1;
        var tmp$ret$0;
        $l$block_0: {
            var tmp_0;
            if (isInterface(tmp0, Collection)) {
                tmp_0 = tmp0.n();
            } else {
                tmp_0 = false;
            }
            if (tmp_0) {
                tmp$ret$0 = false;
                break $l$block_0;
            }
            var _iterator__ex2g4s = tmp0.j();
            while (_iterator__ex2g4s.k()) {
                var element = _iterator__ex2g4s.l();
                if ($this.q1j_1.m1(element.j1j_1) && !element.l1j_1) {
                    tmp$ret$0 = true;
                    break $l$block_0;
                }
            }
            tmp$ret$0 = false;
        }
        if (tmp$ret$0) return false;
        var tmp_1 = $this;
        var tmp0_0 = get_GAMES();
        var tmp$ret$2;
        $l$block_1: {
            var _iterator__ex2g4s_0 = tmp0_0.j();
            while (_iterator__ex2g4s_0.k()) {
                var element_0 = _iterator__ex2g4s_0.l();
                if (element_0.l1a() === $this.p1j_1) {
                    tmp$ret$2 = element_0;
                    break $l$block_1;
                }
            }
            throw NoSuchElementException_init_$Create$_0('Collection contains no element matching the predicate.');
        }
        tmp_1.o1j_1 = tmp$ret$2.n1a(toList_1($this.q1j_1), $this.m1j_1);
        $this.r1j_1 = null;
        return true;
    }
    function endGame($this) {
        $this.o1j_1 = null;
        $this.p1j_1 = null;
        $this.q1j_1 = emptySet();
        $this.r1j_1 = null;
        return true;
    }
    function picture($this) {
        var builder = new JsonObjectBuilder;
        var this_0 = $this.n1j_1;
        var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_0, 10));
        var _iterator__ex2g4s = this_0.j();
        while (_iterator__ex2g4s.k()) {
            var item = _iterator__ex2g4s.l();
            var builder_0 = new JsonObjectBuilder;
            put_0(builder_0, 'id', item.j1j_1);
            put_0(builder_0, 'name', item.k1j_1);
            put_1(builder_0, 'online', item.l1j_1);
            var tmp$ret$4 = builder_0.vx();
            destination.i(tmp$ret$4);
        }
        builder.ux('players', new JsonArray(destination));
        var tmp0_safe_receiver = host($this);
        put_0(builder, 'host', tmp0_safe_receiver == null ? null : tmp0_safe_receiver.j1j_1);
        var this_1 = get_GAMES();
        var destination_0 = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_1, 10));
        var _iterator__ex2g4s_0 = this_1.j();
        while (_iterator__ex2g4s_0.k()) {
            var item_0 = _iterator__ex2g4s_0.l();
            var builder_1 = new JsonObjectBuilder;
            put_0(builder_1, 'id', item_0.l1a());
            put(builder_1, 'min', item_0.m1a().w_1);
            put(builder_1, 'max', item_0.m1a().x_1);
            var tmp$ret$9 = builder_1.vx();
            destination_0.i(tmp$ret$9);
        }
        builder.ux('games', new JsonArray(destination_0));
        put_0(builder, 'browsing', $this.s1j_1);
        put_0(builder, 'playing', $this.p1j_1);
        put_0(builder, 'rematchOffer', $this.r1j_1);
        var room = builder.vx();
        var current = $this.o1j_1;
        var this_2 = ArrayList_init_$Create$();
        var tmp = plus_2(room, to('type', JsonPrimitive_1('state')));
        var tmp_0;
        if (current == null) {
            tmp_0 = null;
        } else {
            tmp_0 = to('view', current.j1a());
        }
        this_2.i(new Delivery('tv', new JsonObject(plus_3(tmp, listOfNotNull(tmp_0)))));
        var _iterator__ex2g4s_1 = $this.n1j_1.j();
        while (_iterator__ex2g4s_1.k()) {
            var player = _iterator__ex2g4s_1.l();
            var tmp_1;
            if (current == null) {
                tmp_1 = null;
            } else {
                var tmp_2;
                if ($this.q1j_1.m1(player.j1j_1)) {
                    tmp_2 = current;
                } else {
                    tmp_2 = null;
                }
                tmp_1 = tmp_2;
            }
            var tmp2_safe_receiver = tmp_1;
            var view = tmp2_safe_receiver == null ? null : tmp2_safe_receiver.k1a(player.j1j_1);
            var tmp_3 = plus_2(plus_2(room, to('type', JsonPrimitive_1('state'))), to('you', JsonPrimitive_1(player.j1j_1)));
            var tmp_4;
            if (view == null) {
                tmp_4 = null;
            } else {
                tmp_4 = to('view', view);
            }
            this_2.i(new Delivery(player.j1j_1, new JsonObject(plus_3(tmp_3, listOfNotNull(tmp_4)))));
        }
        return this_2.c4();
    }
    function Companion_32() {
        this.t1j_1 = 16;
    }
    var Companion_instance_32;
    function Companion_getInstance_32() {
        return Companion_instance_32;
    }
    function Table(random) {
        random = random === VOID ? Default_getInstance() : random;
        this.m1j_1 = random;
        var tmp = this;
        tmp.n1j_1 = ArrayList_init_$Create$();
        this.o1j_1 = null;
        this.p1j_1 = null;
        this.q1j_1 = emptySet();
        this.r1j_1 = null;
        this.s1j_1 = first(get_GAMES()).l1a();
    }
    protoOf(Table).u1j = function(from, text) {
        var tmp;
        try {
            var value = get_jsonObject(Default_getInstance_0().xv(text));
            tmp = _Result___init__impl__xyqfz8(value);
        } catch ($p) {
            var tmp_0;
            if ($p instanceof Error) {
                var e = $p;
                tmp_0 = _Result___init__impl__xyqfz8(createFailure(e));
            } else {
                throw $p;
            }
            tmp = tmp_0;
        }
        var this_0 = tmp;
        var tmp0_elvis_lhs = _Result___get_isFailure__impl__jpiriv(this_0) ? null : _Result___get_value__impl__bjfvqg(this_0);
        var tmp_1;
        if (tmp0_elvis_lhs == null) {
            return emptyList();
        } else {
            tmp_1 = tmp0_elvis_lhs;
        }
        var message = tmp_1;
        var tmp1_safe_receiver = message.jx('type');
        var tmp2_safe_receiver = tmp1_safe_receiver == null ? null : get_jsonPrimitive(tmp1_safe_receiver);
        var type = tmp2_safe_receiver == null ? null : get_contentOrNull(tmp2_safe_receiver);
        var tmp0 = this.n1j_1;
        var tmp$ret$5;
        $l$block: {
            var _iterator__ex2g4s = tmp0.j();
            while (_iterator__ex2g4s.k()) {
                var element = _iterator__ex2g4s.l();
                if (element.j1j_1 === from) {
                    tmp$ret$5 = element;
                    break $l$block;
                }
            }
            tmp$ret$5 = null;
        }
        var player = tmp$ret$5;
        var tmp_2;
        switch (type) {
          case 'join':
            var tmp4_safe_receiver = message.jx('name');
            var tmp5_safe_receiver = tmp4_safe_receiver == null ? null : get_jsonPrimitive(tmp4_safe_receiver);
            var tmp0_elvis_lhs_0 = tmp5_safe_receiver == null ? null : get_contentOrNull(tmp5_safe_receiver);
            var tmp$ret$7 = tmp0_elvis_lhs_0 == null ? '' : tmp0_elvis_lhs_0;
            tmp_2 = join(this, from, tmp$ret$7);
            break;

          case 'leave':
            tmp_2 = !(player == null) && leave(this, player);
            break;

          case 'browse':
            var tmp_3;
            if (equals(player, host(this))) {
                var tmp6_safe_receiver = message.jx('game');
                var tmp7_safe_receiver = tmp6_safe_receiver == null ? null : get_jsonPrimitive(tmp6_safe_receiver);
                tmp_3 = browse(this, tmp7_safe_receiver == null ? null : get_contentOrNull(tmp7_safe_receiver));
            } else {
                tmp_3 = false;
            }
            tmp_2 = tmp_3;
            break;

          case 'start':
            var tmp_4;
            if (equals(player, host(this))) {
                var tmp8_safe_receiver = message.jx('game');
                var tmp9_safe_receiver = tmp8_safe_receiver == null ? null : get_jsonPrimitive(tmp8_safe_receiver);
                tmp_4 = start(this, tmp9_safe_receiver == null ? null : get_contentOrNull(tmp9_safe_receiver));
            } else {
                tmp_4 = false;
            }
            tmp_2 = tmp_4;
            break;

          case 'lobby':
            tmp_2 = equals(player, host(this)) && !(this.o1j_1 == null) && endGame(this);
            break;

          case 'rematch':
            tmp_2 = !(player == null) && rematch(this, player);
            break;

          case 'act':
            var tmp_5;
            if (!(player == null) && this.q1j_1.m1(from)) {
                var tmp10_safe_receiver = this.o1j_1;
                tmp_5 = (tmp10_safe_receiver == null ? null : tmp10_safe_receiver.g1a(from, message)) === true;
            } else {
                tmp_5 = false;
            }
            tmp_2 = tmp_5;
            break;

          default:
            tmp_2 = false;
            break;
        }
        var changed = tmp_2;
        return changed ? picture(this) : emptyList();
    };
    protoOf(Table).v1j = function(id) {
        var tmp0 = this.n1j_1;
        var tmp$ret$0;
        $l$block: {
            var _iterator__ex2g4s = tmp0.j();
            while (_iterator__ex2g4s.k()) {
                var element = _iterator__ex2g4s.l();
                if (element.j1j_1 === id) {
                    tmp$ret$0 = element;
                    break $l$block;
                }
            }
            tmp$ret$0 = null;
        }
        var tmp0_elvis_lhs = tmp$ret$0;
        var tmp;
        if (tmp0_elvis_lhs == null) {
            return emptyList();
        } else {
            tmp = tmp0_elvis_lhs;
        }
        var player = tmp;
        player.l1j_1 = false;
        return picture(this);
    };
    protoOf(Table).h1a = function() {
        var tmp0_elvis_lhs = this.o1j_1;
        var tmp;
        if (tmp0_elvis_lhs == null) {
            return emptyList();
        } else {
            tmp = tmp0_elvis_lhs;
        }
        var current = tmp;
        var tmp0 = this.n1j_1;
        var tmp$ret$0;
        $l$block_0: {
            var tmp_0;
            if (isInterface(tmp0, Collection)) {
                tmp_0 = tmp0.n();
            } else {
                tmp_0 = false;
            }
            if (tmp_0) {
                tmp$ret$0 = false;
                break $l$block_0;
            }
            var _iterator__ex2g4s = tmp0.j();
            while (_iterator__ex2g4s.k()) {
                var element = _iterator__ex2g4s.l();
                if (this.q1j_1.m1(element.j1j_1) && !element.l1j_1) {
                    tmp$ret$0 = true;
                    break $l$block_0;
                }
            }
            tmp$ret$0 = false;
        }
        if (tmp$ret$0) return emptyList();
        return current.h1a() ? picture(this) : emptyList();
    };
    protoOf(Table).i1a = function() {
        var tmp0_elvis_lhs = this.o1j_1;
        var tmp;
        if (tmp0_elvis_lhs == null) {
            return emptyList();
        } else {
            tmp = tmp0_elvis_lhs;
        }
        var current = tmp;
        var tmp0 = this.n1j_1;
        var tmp$ret$0;
        $l$block_0: {
            var tmp_0;
            if (isInterface(tmp0, Collection)) {
                tmp_0 = tmp0.n();
            } else {
                tmp_0 = false;
            }
            if (tmp_0) {
                tmp$ret$0 = false;
                break $l$block_0;
            }
            var _iterator__ex2g4s = tmp0.j();
            while (_iterator__ex2g4s.k()) {
                var element = _iterator__ex2g4s.l();
                if (this.q1j_1.m1(element.j1j_1) && !element.l1j_1) {
                    tmp$ret$0 = true;
                    break $l$block_0;
                }
            }
            tmp$ret$0 = false;
        }
        if (tmp$ret$0) return emptyList();
        var tmp_1;
        switch (current.i1a().b2_1) {
          case 0:
            tmp_1 = emptyList();
            break;

          case 1:
            var tmp0_0 = picture(this);
            var destination = ArrayList_init_$Create$();
            var _iterator__ex2g4s_0 = tmp0_0.j();
            while (_iterator__ex2g4s_0.k()) {
                var element_0 = _iterator__ex2g4s_0.l();
                if (element_0.h1j_1 === 'tv') {
                    destination.i(element_0);
                }
            }
            tmp_1 = destination;
            break;

          case 2:
            tmp_1 = picture(this);
            break;

          default:
            noWhenBranchMatchedException();
            break;
        }
        return tmp_1;
    };
    function encode($this, deliveries) {
        var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(deliveries, 10));
        var _iterator__ex2g4s = deliveries.j();
        while (_iterator__ex2g4s.k()) {
            var item = _iterator__ex2g4s.l();
            var builder = new JsonObjectBuilder;
            put_0(builder, 'to', item.h1j_1);
            builder.ux('message', item.i1j_1);
            var tmp$ret$2 = builder.vx();
            destination.i(tmp$ret$2);
        }
        return new JsonArray(destination).toString();
    }
    function Engine() {
        this.w1j_1 = new Table;
    }
    protoOf(Engine).receive = function(from, text) {
        return encode(this, this.w1j_1.u1j(from, text));
    };
    protoOf(Engine).offline = function(id) {
        return encode(this, this.w1j_1.v1j(id));
    };
    protoOf(Engine).tick = function() {
        return encode(this, this.w1j_1.h1a());
    };
    protoOf(Engine).frame = function() {
        return encode(this, this.w1j_1.i1a());
    };
    protoOf(InternalHashMap).d5 = containsAllEntries;
    protoOf(SerialDescriptorImpl).jj = get_isNullable;
    protoOf(SerialDescriptorImpl).kj = get_isInline;
    protoOf(AbstractDecoder).sl = decodeSerializableElement$default;
    protoOf(AbstractDecoder).fl = decodeSerializableValue;
    protoOf(AbstractDecoder).ul = decodeSequentially;
    protoOf(AbstractDecoder).wl = decodeCollectionSize;
    protoOf(ListLikeDescriptor).jj = get_isNullable;
    protoOf(ListLikeDescriptor).kj = get_isInline;
    protoOf(ListLikeDescriptor).mj = get_annotations;
    protoOf(MapLikeDescriptor).jj = get_isNullable;
    protoOf(MapLikeDescriptor).kj = get_isInline;
    protoOf(MapLikeDescriptor).mj = get_annotations;
    protoOf(PluginGeneratedSerialDescriptor).jj = get_isNullable;
    protoOf(PluginGeneratedSerialDescriptor).kj = get_isInline;
    protoOf(InlinePrimitiveDescriptor$1).pp = typeParametersSerializers;
    protoOf(NothingSerialDescriptor).jj = get_isNullable;
    protoOf(NothingSerialDescriptor).kj = get_isInline;
    protoOf(NothingSerialDescriptor).mj = get_annotations;
    protoOf(PrimitiveSerialDescriptor_0).jj = get_isNullable;
    protoOf(PrimitiveSerialDescriptor_0).kj = get_isInline;
    protoOf(PrimitiveSerialDescriptor_0).mj = get_annotations;
    protoOf(TaggedDecoder).sl = decodeSerializableElement$default;
    protoOf(TaggedDecoder).fl = decodeSerializableValue;
    protoOf(TaggedDecoder).ul = decodeSequentially;
    protoOf(TaggedDecoder).wl = decodeCollectionSize;
    protoOf(defer$1).jj = get_isNullable;
    protoOf(defer$1).kj = get_isInline;
    protoOf(defer$1).mj = get_annotations;
    defineProp(protoOf(JsonException), 'message', (function() {
        return this.t8();
    }));
    protoOf(BattleshipGame).h1a = tick;
    Companion_instance_0 = new Companion_0;
    ByteCompanionObject_instance = new ByteCompanionObject;
    ShortCompanionObject_instance = new ShortCompanionObject;
    IntCompanionObject_instance = new IntCompanionObject;
    FloatCompanionObject_instance = new FloatCompanionObject;
    DoubleCompanionObject_instance = new DoubleCompanionObject;
    StringCompanionObject_instance = new StringCompanionObject;
    BooleanCompanionObject_instance = new BooleanCompanionObject;
    Unit_instance = new Unit;
    _stableSortingIsSupported = null;
    Companion_instance_3 = new Companion_3;
    CompletedContinuation_instance = new CompletedContinuation;
    Companion_instance_4 = new Companion_4;
    Companion_instance_5 = new Companion_5;
    Companion_instance_6 = new Companion_6;
    EmptyIterator_instance = new EmptyIterator;
    Key_instance = new Key;
    Companion_instance_9 = new Companion_9;
    State_instance = new State;
    FractionalParser_instance = new FractionalParser;
    Companion_instance_13 = new Companion_13;
    UNINITIALIZED_VALUE_instance = new UNINITIALIZED_VALUE;
    Companion_instance_14 = new Companion_14;
    Companion_instance_21 = new Companion_21;
    Companion_instance_22 = new Companion_22;
    Companion_instance_23 = new Companion_23;
    Companion_instance_24 = new Companion_24;
    Tombstone_instance = new Tombstone;
    RedactedKey_instance = new RedactedKey;
    Companion_instance_27 = new Companion_27;
    Companion_instance_28 = new Companion_28;
    Companion_instance_31 = new Companion_31;
    Companion_instance_32 = new Companion_32;
    function $jsExportAll$(_) {
        var com = _.com || (_.com = {});
        var dezesar = com.dezesar || (com.dezesar = {});
        var gametable = dezesar.gametable || (dezesar.gametable = {});
        var core = gametable.core || (gametable.core = {});
        core.Engine = Engine;
    }
    $jsExportAll$(_);
    return _;
}));