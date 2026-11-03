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
    initMetadataForClass(AbstractMutableCollection, 'AbstractMutableCollection', VOID, AbstractCollection, [ Collection, MutableIterable ]);
    initMetadataForClass(IteratorImpl, 'IteratorImpl');
    initMetadataForClass(ListIteratorImpl, 'ListIteratorImpl', VOID, IteratorImpl);
    initMetadataForClass(AbstractMutableList, 'AbstractMutableList', VOID, AbstractMutableCollection, [ KtList, MutableIterable, Collection ]);
    initMetadataForClass(AbstractMap, 'AbstractMap', VOID, VOID, [ KtMap ]);
    initMetadataForClass(AbstractMutableMap, 'AbstractMutableMap', VOID, AbstractMap, [ KtMutableMap ]);
    initMetadataForClass(AbstractMutableSet, 'AbstractMutableSet', VOID, AbstractMutableCollection, [ KtSet, MutableIterable, Collection ]);
    initMetadataForCompanion(Companion_2);
    initMetadataForInterface(RandomAccess, 'RandomAccess');
    initMetadataForClass(ArrayList, 'ArrayList', ArrayList_init_$Create$, AbstractMutableList, [ KtList, MutableIterable, Collection, RandomAccess ]);
    initMetadataForClass(HashMap, 'HashMap', HashMap_init_$Create$, AbstractMutableMap, [ KtMutableMap ]);
    initMetadataForClass(HashMapKeys, 'HashMapKeys', VOID, AbstractMutableSet, [ KtSet, MutableIterable, Collection ]);
    initMetadataForClass(HashMapValues, 'HashMapValues', VOID, AbstractMutableCollection, [ Collection, MutableIterable ]);
    initMetadataForClass(HashMapEntrySetBase, 'HashMapEntrySetBase', VOID, AbstractMutableSet, [ KtSet, MutableIterable, Collection ]);
    initMetadataForClass(HashMapEntrySet, 'HashMapEntrySet', VOID, HashMapEntrySetBase);
    initMetadataForClass(HashMapKeysDefault$iterator$1);
    initMetadataForClass(HashMapKeysDefault, 'HashMapKeysDefault', VOID, AbstractMutableSet);
    initMetadataForClass(HashMapValuesDefault$iterator$1);
    initMetadataForClass(HashMapValuesDefault, 'HashMapValuesDefault', VOID, AbstractMutableCollection);
    initMetadataForClass(HashSet, 'HashSet', HashSet_init_$Create$, AbstractMutableSet, [ KtSet, MutableIterable, Collection ]);
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
                tmp = m.k();
            } else {
                tmp = false;
            }
            if (tmp) {
                tmp$ret$0 = true;
                break $l$block_0;
            }
            var _iterator__ex2g4s = m.g();
            while (_iterator__ex2g4s.h()) {
                var element = _iterator__ex2g4s.i();
                var entry = element;
                var tmp_0;
                if (!(entry == null) ? isInterface(entry, Entry) : false) {
                    tmp_0 = this.b7(entry);
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
    initMetadataForClass(LinkedHashSet, 'LinkedHashSet', LinkedHashSet_init_$Create$, HashSet, [ KtSet, MutableIterable, Collection ]);
    initMetadataForInterface(Continuation, 'Continuation');
    initMetadataForClass(InterceptedCoroutine, 'InterceptedCoroutine', VOID, VOID, [ Continuation ]);
    initMetadataForClass(CoroutineImpl, 'CoroutineImpl', VOID, InterceptedCoroutine, [ Continuation ]);
    initMetadataForObject(CompletedContinuation, 'CompletedContinuation', VOID, VOID, [ Continuation ]);
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
    initMetadataForCompanion(Companion_4);
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
    initMetadataForClass(TransformingSequence$iterator$1);
    initMetadataForClass(TransformingSequence, 'TransformingSequence', VOID, VOID, [ Sequence ]);
    initMetadataForClass(FilteringSequence$iterator$1);
    initMetadataForClass(FilteringSequence, 'FilteringSequence', VOID, VOID, [ Sequence ]);
    initMetadataForObject(EmptySet, 'EmptySet', VOID, VOID, [ KtSet ]);
    initMetadataForObject(NaturalOrderComparator, 'NaturalOrderComparator', VOID, VOID, [ Comparator ]);
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
        return compareTo(value, this.ec()) >= 0 && compareTo(value, this.fc()) <= 0;
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
        return deserializer.tg(this);
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
        return $super === VOID ? this.kj(descriptor, index, deserializer, previousValue) : $super.kj.call(this, descriptor, index, deserializer, previousValue);
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
    initMetadataForClass(Ship, 'Ship');
    initMetadataForCompanion(Companion_25);
    function tick() {
        return false;
    }
    function frame() {
        return Frame_NONE_getInstance();
    }
    initMetadataForInterface(Game, 'Game');
    initMetadataForClass(BattleshipGame, 'BattleshipGame', VOID, VOID, [ Game ]);
    initMetadataForObject(Battleship, 'Battleship');
    initMetadataForClass(Figure, 'Figure');
    initMetadataForClass(Seat, 'Seat');
    initMetadataForCompanion(Companion_26);
    initMetadataForClass(sam$kotlin_Comparator$0_0, 'sam$kotlin_Comparator$0', VOID, VOID, [ Comparator, FunctionAdapter ]);
    initMetadataForClass(CrowdGame, 'CrowdGame', VOID, VOID, [ Game ]);
    initMetadataForObject(Crowd, 'Crowd');
    initMetadataForCompanion(Companion_27);
    initMetadataForClass(DiceGame, 'DiceGame', VOID, VOID, [ Game ]);
    initMetadataForObject(Dice, 'Dice');
    initMetadataForClass(Frame, 'Frame', VOID, Enum);
    initMetadataForClass(ComingGame, 'ComingGame');
    initMetadataForClass(Card, 'Card');
    initMetadataForClass(Squad, 'Squad');
    initMetadataForCompanion(Companion_28);
    initMetadataForClass(SiegeGame, 'SiegeGame', VOID, VOID, [ Game ]);
    initMetadataForObject(Siege, 'Siege');
    initMetadataForCompanion(Companion_29);
    initMetadataForClass(SubmarineGame, 'SubmarineGame', VOID, VOID, [ Game ]);
    initMetadataForObject(Submarine, 'Submarine');
    initMetadataForClass(Delivery, 'Delivery');
    initMetadataForClass(Player, 'Player');
    initMetadataForCompanion(Companion_30);
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
    function contains_0(_this__u8e3s4, element) {
        return indexOf_0(_this__u8e3s4, element) >= 0;
    }
    function contains_1(_this__u8e3s4, element) {
        return indexOf_1(_this__u8e3s4, element) >= 0;
    }
    function contains_2(_this__u8e3s4, element) {
        return indexOf_2(_this__u8e3s4, element) >= 0;
    }
    function contains_3(_this__u8e3s4, element) {
        return indexOf_3(_this__u8e3s4, element) >= 0;
    }
    function get_lastIndex(_this__u8e3s4) {
        return _this__u8e3s4.length - 1 | 0;
    }
    function indexOf_0(_this__u8e3s4, element) {
        var inductionVariable = 0;
        var last = _this__u8e3s4.length - 1 | 0;
        if (inductionVariable <= last) do {
            var index = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            if (element === _this__u8e3s4[index]) {
                return index;
            }
        } while (inductionVariable <= last);
        return -1;
    }
    function indexOf_1(_this__u8e3s4, element) {
        var inductionVariable = 0;
        var last = _this__u8e3s4.length - 1 | 0;
        if (inductionVariable <= last) do {
            var index = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            if (element === _this__u8e3s4[index]) {
                return index;
            }
        } while (inductionVariable <= last);
        return -1;
    }
    function indexOf_2(_this__u8e3s4, element) {
        var inductionVariable = 0;
        var last = _this__u8e3s4.length - 1 | 0;
        if (inductionVariable <= last) do {
            var index = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            if (equalsLong(element, _this__u8e3s4[index])) {
                return index;
            }
        } while (inductionVariable <= last);
        return -1;
    }
    function indexOf_3(_this__u8e3s4, element) {
        var inductionVariable = 0;
        var last = _this__u8e3s4.length - 1 | 0;
        if (inductionVariable <= last) do {
            var index = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            if (element === _this__u8e3s4[index]) {
                return index;
            }
        } while (inductionVariable <= last);
        return -1;
    }
    function get_lastIndex_0(_this__u8e3s4) {
        return _this__u8e3s4.length - 1 | 0;
    }
    function get_lastIndex_1(_this__u8e3s4) {
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
        return new IntRange(0, get_lastIndex_2(_this__u8e3s4));
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
    function maxOrNull(_this__u8e3s4) {
        if (_this__u8e3s4.length === 0) return null;
        var max = _this__u8e3s4[0];
        var inductionVariable = 1;
        var last = get_lastIndex_0(_this__u8e3s4);
        if (inductionVariable <= last) do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var e = _this__u8e3s4[i];
            if (max < e) max = e;
        } while (!(i === last));
        return max;
    }
    function sum(_this__u8e3s4) {
        var sum = 0;
        var inductionVariable = 0;
        var last = _this__u8e3s4.length;
        while (inductionVariable < last) {
            var element = _this__u8e3s4[inductionVariable];
            inductionVariable = inductionVariable + 1 | 0;
            sum = sum + element | 0;
        }
        return sum;
    }
    function toSet(_this__u8e3s4) {
        switch (_this__u8e3s4.length) {
          case 0:
            return emptySet();

          case 1:
            return setOf(_this__u8e3s4[0]);

          default:
            return toCollection(_this__u8e3s4, LinkedHashSet_init_$Create$_1(mapCapacity(_this__u8e3s4.length)));
        }
    }
    function get_lastIndex_2(_this__u8e3s4) {
        return _this__u8e3s4.length - 1 | 0;
    }
    function toCollection(_this__u8e3s4, destination) {
        var inductionVariable = 0;
        var last = _this__u8e3s4.length;
        while (inductionVariable < last) {
            var item = _this__u8e3s4[inductionVariable];
            inductionVariable = inductionVariable + 1 | 0;
            destination.f(item);
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
        var _iterator__ex2g4s = _this__u8e3s4.g();
        $l$loop: while (_iterator__ex2g4s.h()) {
            var element = _iterator__ex2g4s.i();
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
        var result = booleanArray(_this__u8e3s4.j());
        var index = 0;
        var _iterator__ex2g4s = _this__u8e3s4.g();
        while (_iterator__ex2g4s.h()) {
            var element = _iterator__ex2g4s.i();
            var _unary__edvuaz = index;
            index = _unary__edvuaz + 1 | 0;
            result[_unary__edvuaz] = element;
        }
        return result;
    }
    function random(_this__u8e3s4, random) {
        if (_this__u8e3s4.k()) throw NoSuchElementException_init_$Create$_0('Collection is empty.');
        return elementAt(_this__u8e3s4, random.l(_this__u8e3s4.j()));
    }
    function minus(_this__u8e3s4, element) {
        var result = ArrayList_init_$Create$_0(collectionSizeOrDefault(_this__u8e3s4, 10));
        var removed = false;
        var _iterator__ex2g4s = _this__u8e3s4.g();
        while (_iterator__ex2g4s.h()) {
            var element_0 = _iterator__ex2g4s.i();
            var tmp;
            if (!removed && equals(element_0, element)) {
                removed = true;
                tmp = false;
            } else {
                tmp = true;
            }
            if (tmp) {
                result.f(element_0);
            }
        }
        return result;
    }
    function toSet_0(_this__u8e3s4) {
        if (isInterface(_this__u8e3s4, Collection)) {
            var tmp;
            switch (_this__u8e3s4.j()) {
              case 0:
                tmp = emptySet();
                break;

              case 1:
                var tmp_0;
                if (isInterface(_this__u8e3s4, KtList)) {
                    tmp_0 = _this__u8e3s4.m(0);
                } else {
                    tmp_0 = _this__u8e3s4.g().i();
                }
                tmp = setOf(tmp_0);
                break;

              default:
                tmp = toCollection_0(_this__u8e3s4, LinkedHashSet_init_$Create$_1(mapCapacity(_this__u8e3s4.j())));
                break;
            }
            return tmp;
        }
        return optimizeReadOnlySet(toCollection_0(_this__u8e3s4, LinkedHashSet_init_$Create$()));
    }
    function toMutableList(_this__u8e3s4) {
        return ArrayList_init_$Create$_1(_this__u8e3s4);
    }
    function asSequence(_this__u8e3s4) {
        return new asSequence$$inlined$Sequence$1(_this__u8e3s4);
    }
    function withIndex_0(_this__u8e3s4) {
        return new IndexingIterable(withIndex$lambda_0(_this__u8e3s4));
    }
    function single_0(_this__u8e3s4) {
        if (isInterface(_this__u8e3s4, KtList)) return single_1(_this__u8e3s4); else {
            var iterator = _this__u8e3s4.g();
            if (!iterator.h()) throw NoSuchElementException_init_$Create$_0('Collection is empty.');
            var single = iterator.i();
            if (iterator.h()) throw IllegalArgumentException_init_$Create$_0('Collection has more than one element.');
            return single;
        }
    }
    function first(_this__u8e3s4) {
        if (_this__u8e3s4.k()) throw NoSuchElementException_init_$Create$_0('List is empty.');
        return _this__u8e3s4.m(0);
    }
    function sum_0(_this__u8e3s4) {
        var sum = 0;
        var _iterator__ex2g4s = _this__u8e3s4.g();
        while (_iterator__ex2g4s.h()) {
            var element = _iterator__ex2g4s.i();
            sum = sum + element | 0;
        }
        return sum;
    }
    function singleOrNull(_this__u8e3s4) {
        if (isInterface(_this__u8e3s4, KtList)) return _this__u8e3s4.j() === 1 ? _this__u8e3s4.m(0) : null; else {
            var iterator = _this__u8e3s4.g();
            if (!iterator.h()) return null;
            var single = iterator.i();
            if (iterator.h()) return null;
            return single;
        }
    }
    function randomOrNull(_this__u8e3s4, random) {
        if (_this__u8e3s4.k()) return null;
        return elementAt(_this__u8e3s4, random.l(_this__u8e3s4.j()));
    }
    function firstOrNull(_this__u8e3s4) {
        return _this__u8e3s4.k() ? null : _this__u8e3s4.m(0);
    }
    function plus(_this__u8e3s4, elements) {
        if (isInterface(elements, Collection)) {
            var result = ArrayList_init_$Create$_0(_this__u8e3s4.j() + elements.j() | 0);
            result.q(_this__u8e3s4);
            result.q(elements);
            return result;
        } else {
            var result_0 = ArrayList_init_$Create$_1(_this__u8e3s4);
            addAll(result_0, elements);
            return result_0;
        }
    }
    function toMutableSet(_this__u8e3s4) {
        var tmp;
        if (isInterface(_this__u8e3s4, Collection)) {
            tmp = LinkedHashSet_init_$Create$_0(_this__u8e3s4);
        } else {
            tmp = toCollection_0(_this__u8e3s4, LinkedHashSet_init_$Create$());
        }
        return tmp;
    }
    function sorted(_this__u8e3s4) {
        if (isInterface(_this__u8e3s4, Collection)) {
            if (_this__u8e3s4.j() <= 1) return toList_0(_this__u8e3s4);
            var tmp = copyToArray(_this__u8e3s4);
            var this_0 = isArray(tmp) ? tmp : THROW_CCE();
            sort(this_0);
            return asList(this_0);
        }
        var this_1 = toMutableList_0(_this__u8e3s4);
        sort_0(this_1);
        return this_1;
    }
    function takeLast(_this__u8e3s4, n) {
        if (!(n >= 0)) {
            var message = 'Requested element count ' + n + ' is less than zero.';
            throw IllegalArgumentException_init_$Create$_0(toString_1(message));
        }
        if (n === 0) return emptyList();
        var size = _this__u8e3s4.j();
        if (n >= size) return toList_0(_this__u8e3s4);
        if (n === 1) return listOf(last(_this__u8e3s4));
        var list = ArrayList_init_$Create$_0(n);
        if (isInterface(_this__u8e3s4, RandomAccess)) {
            var inductionVariable = size - n | 0;
            if (inductionVariable < size) do {
                var index = inductionVariable;
                inductionVariable = inductionVariable + 1 | 0;
                list.f(_this__u8e3s4.m(index));
            } while (inductionVariable < size);
        } else {
            var _iterator__ex2g4s = _this__u8e3s4.r(size - n | 0);
            while (_iterator__ex2g4s.h()) {
                var item = _iterator__ex2g4s.i();
                list.f(item);
            }
        }
        return list;
    }
    function take(_this__u8e3s4, n) {
        if (!(n >= 0)) {
            var message = 'Requested element count ' + n + ' is less than zero.';
            throw IllegalArgumentException_init_$Create$_0(toString_1(message));
        }
        if (n === 0) return emptyList();
        if (isInterface(_this__u8e3s4, Collection)) {
            if (n >= _this__u8e3s4.j()) return toList_0(_this__u8e3s4);
            if (n === 1) return listOf(first_0(_this__u8e3s4));
        }
        var count = 0;
        var list = ArrayList_init_$Create$_0(n);
        var _iterator__ex2g4s = _this__u8e3s4.g();
        $l$loop: while (_iterator__ex2g4s.h()) {
            var item = _iterator__ex2g4s.i();
            list.f(item);
            count = count + 1 | 0;
            if (count === n) break $l$loop;
        }
        return optimizeReadOnlyList(list);
    }
    function toList_0(_this__u8e3s4) {
        if (isInterface(_this__u8e3s4, Collection)) {
            var tmp;
            switch (_this__u8e3s4.j()) {
              case 0:
                tmp = emptyList();
                break;

              case 1:
                var tmp_0;
                if (isInterface(_this__u8e3s4, KtList)) {
                    tmp_0 = _this__u8e3s4.m(0);
                } else {
                    tmp_0 = _this__u8e3s4.g().i();
                }
                tmp = listOf(tmp_0);
                break;

              default:
                tmp = toMutableList(_this__u8e3s4);
                break;
            }
            return tmp;
        }
        return optimizeReadOnlyList(toMutableList_0(_this__u8e3s4));
    }
    function toMutableList_0(_this__u8e3s4) {
        if (isInterface(_this__u8e3s4, Collection)) return toMutableList(_this__u8e3s4);
        return toCollection_0(_this__u8e3s4, ArrayList_init_$Create$());
    }
    function shuffle(_this__u8e3s4, random) {
        var inductionVariable = get_lastIndex_3(_this__u8e3s4);
        if (1 <= inductionVariable) do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + -1 | 0;
            var j = random.l(i + 1 | 0);
            _this__u8e3s4.s(j, _this__u8e3s4.s(i, _this__u8e3s4.m(j)));
        } while (1 <= inductionVariable);
    }
    function toCollection_0(_this__u8e3s4, destination) {
        var _iterator__ex2g4s = _this__u8e3s4.g();
        while (_iterator__ex2g4s.h()) {
            var item = _iterator__ex2g4s.i();
            destination.f(item);
        }
        return destination;
    }
    function elementAt(_this__u8e3s4, index) {
        if (isInterface(_this__u8e3s4, KtList)) return _this__u8e3s4.m(index);
        return elementAtOrElse(_this__u8e3s4, index, elementAt$lambda(index));
    }
    function sortedWith(_this__u8e3s4, comparator) {
        if (isInterface(_this__u8e3s4, Collection)) {
            if (_this__u8e3s4.j() <= 1) return toList_0(_this__u8e3s4);
            var tmp = copyToArray(_this__u8e3s4);
            var this_0 = isArray(tmp) ? tmp : THROW_CCE();
            sortWith(this_0, comparator);
            return asList(this_0);
        }
        var this_1 = toMutableList_0(_this__u8e3s4);
        sortWith_0(this_1, comparator);
        return this_1;
    }
    function single_1(_this__u8e3s4) {
        var tmp;
        switch (_this__u8e3s4.j()) {
          case 0:
            throw NoSuchElementException_init_$Create$_0('List is empty.');

          case 1:
            tmp = _this__u8e3s4.m(0);
            break;

          default:
            throw IllegalArgumentException_init_$Create$_0('List has more than one element.');
        }
        return tmp;
    }
    function last(_this__u8e3s4) {
        if (_this__u8e3s4.k()) throw NoSuchElementException_init_$Create$_0('List is empty.');
        return _this__u8e3s4.m(get_lastIndex_3(_this__u8e3s4));
    }
    function first_0(_this__u8e3s4) {
        if (isInterface(_this__u8e3s4, KtList)) return first(_this__u8e3s4); else {
            var iterator = _this__u8e3s4.g();
            if (!iterator.h()) throw NoSuchElementException_init_$Create$_0('Collection is empty.');
            return iterator.i();
        }
    }
    function elementAtOrElse(_this__u8e3s4, index, defaultValue) {
        if (isInterface(_this__u8e3s4, KtList)) {
            return (0 <= index ? index < _this__u8e3s4.j() : false) ? _this__u8e3s4.m(index) : defaultValue(index);
        }
        if (index < 0) return defaultValue(index);
        var iterator = _this__u8e3s4.g();
        var count = 0;
        while (iterator.h()) {
            var element = iterator.i();
            var _unary__edvuaz = count;
            count = _unary__edvuaz + 1 | 0;
            if (index === _unary__edvuaz) return element;
        }
        return defaultValue(index);
    }
    function singleOrNull_0(_this__u8e3s4) {
        return _this__u8e3s4.j() === 1 ? _this__u8e3s4.m(0) : null;
    }
    function lastOrNull(_this__u8e3s4) {
        return _this__u8e3s4.k() ? null : _this__u8e3s4.m(_this__u8e3s4.j() - 1 | 0);
    }
    function minOrNull(_this__u8e3s4) {
        var iterator = _this__u8e3s4.g();
        if (!iterator.h()) return null;
        var min = iterator.i();
        while (iterator.h()) {
            var e = iterator.i();
            if (compareTo(min, e) > 0) min = e;
        }
        return min;
    }
    function asSequence$$inlined$Sequence$1($this_asSequence) {
        this.t_1 = $this_asSequence;
    }
    protoOf(asSequence$$inlined$Sequence$1).g = function() {
        return this.t_1.g();
    };
    function withIndex$lambda_0($this_withIndex) {
        return function() {
            return $this_withIndex.g();
        };
    }
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
        if (minimumValue > maximumValue) throw IllegalArgumentException_init_$Create$_0('Cannot coerce value to an empty range: maximum ' + maximumValue + ' is less than minimum ' + minimumValue + '.');
        if (_this__u8e3s4 < minimumValue) return minimumValue;
        if (_this__u8e3s4 > maximumValue) return maximumValue;
        return _this__u8e3s4;
    }
    function coerceIn_1(_this__u8e3s4, minimumValue, maximumValue) {
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
    function contains_4(_this__u8e3s4, value) {
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
        var iterator = _this__u8e3s4.g();
        if (!iterator.h()) return null;
        return iterator.i();
    }
    function filterNotNull(_this__u8e3s4) {
        var tmp = filterNot(_this__u8e3s4, filterNotNull$lambda);
        return isInterface(tmp, Sequence) ? tmp : THROW_CCE();
    }
    function filterNot(_this__u8e3s4, predicate) {
        return new FilteringSequence(_this__u8e3s4, false, predicate);
    }
    function toList_1(_this__u8e3s4) {
        var it = _this__u8e3s4.g();
        if (!it.h()) return emptyList();
        var element = it.i();
        if (!it.h()) return listOf(element);
        var dst = ArrayList_init_$Create$();
        dst.f(element);
        while (it.h()) {
            dst.f(it.i());
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
    function single_2(_this__u8e3s4) {
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
    function drop(_this__u8e3s4, n) {
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
        this.b2_1 = name;
        this.c2_1 = ordinal;
    }
    protoOf(Enum).d2 = function(other) {
        return compareTo(this.c2_1, other.c2_1);
    };
    protoOf(Enum).d = function(other) {
        return this.d2(other instanceof Enum ? other : THROW_CCE());
    };
    protoOf(Enum).equals = function(other) {
        return this === other;
    };
    protoOf(Enum).hashCode = function() {
        return identityHashCode(this);
    };
    protoOf(Enum).toString = function() {
        return this.b2_1;
    };
    function toString_0(_this__u8e3s4) {
        var tmp1_elvis_lhs = _this__u8e3s4 == null ? null : toString_1(_this__u8e3s4);
        return tmp1_elvis_lhs == null ? 'null' : tmp1_elvis_lhs;
    }
    function plus_0(_this__u8e3s4, other) {
        var tmp = _this__u8e3s4 == null ? 'null' : _this__u8e3s4;
        var tmp2_elvis_lhs = other == null ? null : toString_1(other);
        return tmp + (tmp2_elvis_lhs == null ? 'null' : tmp2_elvis_lhs);
    }
    function Companion_1() {
        Companion_instance_1 = this;
        this.e2_1 = new Long(0, -2147483648);
        this.f2_1 = new Long(-1, 2147483647);
        this.g2_1 = 8;
        this.h2_1 = 64;
    }
    var Companion_instance_1;
    function Companion_getInstance_1() {
        if (Companion_instance_1 == null) new Companion_1;
        return Companion_instance_1;
    }
    function Long(low, high) {
        Companion_getInstance_1();
        Number_0.call(this);
        this.i2_1 = low;
        this.j2_1 = high;
    }
    protoOf(Long).k2 = function(other) {
        return compare(this, other);
    };
    protoOf(Long).d = function(other) {
        return this.k2(other instanceof Long ? other : THROW_CCE());
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
        this.n2_1 = $array;
        this.m2_1 = 0;
    }
    protoOf(arrayIterator$1).h = function() {
        return !(this.m2_1 === this.n2_1.length);
    };
    protoOf(arrayIterator$1).i = function() {
        var tmp;
        if (!(this.m2_1 === this.n2_1.length)) {
            var _unary__edvuaz = this.m2_1;
            this.m2_1 = _unary__edvuaz + 1 | 0;
            tmp = this.n2_1[_unary__edvuaz];
        } else {
            throw NoSuchElementException_init_$Create$_0('' + this.m2_1);
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
        get_bufInt32()[get_lowIndex()] = value.i2_1;
        get_bufInt32()[get_highIndex()] = value.j2_1;
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
        return toByte(_this__u8e3s4.i2_1);
    }
    function convertToShort(_this__u8e3s4) {
        _init_properties_boxedLong_kt__v24qrw();
        return toShort(_this__u8e3s4.i2_1);
    }
    function convertToInt(_this__u8e3s4) {
        _init_properties_boxedLong_kt__v24qrw();
        return _this__u8e3s4.i2_1;
    }
    function toNumber(_this__u8e3s4) {
        _init_properties_boxedLong_kt__v24qrw();
        return _this__u8e3s4.j2_1 * 4294967296 + getLowBitsUnsigned(_this__u8e3s4);
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
        return _this__u8e3s4.j2_1 === other.j2_1 && _this__u8e3s4.i2_1 === other.i2_1;
    }
    function hashCode(l) {
        _init_properties_boxedLong_kt__v24qrw();
        return l.i2_1 ^ l.j2_1;
    }
    function fromInt(value) {
        _init_properties_boxedLong_kt__v24qrw();
        return new Long(value, value < 0 ? -1 : 0);
    }
    function isNegative(_this__u8e3s4) {
        _init_properties_boxedLong_kt__v24qrw();
        return _this__u8e3s4.j2_1 < 0;
    }
    function subtract(_this__u8e3s4, other) {
        _init_properties_boxedLong_kt__v24qrw();
        return add(_this__u8e3s4, negate(other));
    }
    function getLowBitsUnsigned(_this__u8e3s4) {
        _init_properties_boxedLong_kt__v24qrw();
        return _this__u8e3s4.i2_1 >= 0 ? _this__u8e3s4.i2_1 : 4294967296 + _this__u8e3s4.i2_1;
    }
    function isZero(_this__u8e3s4) {
        _init_properties_boxedLong_kt__v24qrw();
        return _this__u8e3s4.j2_1 === 0 && _this__u8e3s4.i2_1 === 0;
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
        var a48 = _this__u8e3s4.j2_1 >>> 16 | 0;
        var a32 = _this__u8e3s4.j2_1 & 65535;
        var a16 = _this__u8e3s4.i2_1 >>> 16 | 0;
        var a00 = _this__u8e3s4.i2_1 & 65535;
        var b48 = other.j2_1 >>> 16 | 0;
        var b32 = other.j2_1 & 65535;
        var b16 = other.i2_1 >>> 16 | 0;
        var b00 = other.i2_1 & 65535;
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
        var a48 = _this__u8e3s4.j2_1 >>> 16 | 0;
        var a32 = _this__u8e3s4.j2_1 & 65535;
        var a16 = _this__u8e3s4.i2_1 >>> 16 | 0;
        var a00 = _this__u8e3s4.i2_1 & 65535;
        var b48 = other.j2_1 >>> 16 | 0;
        var b32 = other.j2_1 & 65535;
        var b16 = other.i2_1 >>> 16 | 0;
        var b00 = other.i2_1 & 65535;
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
        return (_this__u8e3s4.i2_1 & 1) === 1;
    }
    function lessThan(_this__u8e3s4, other) {
        _init_properties_boxedLong_kt__v24qrw();
        return compare(_this__u8e3s4, other) < 0;
    }
    function invert(_this__u8e3s4) {
        _init_properties_boxedLong_kt__v24qrw();
        return new Long(~_this__u8e3s4.i2_1, ~_this__u8e3s4.j2_1);
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
                return new Long(_this__u8e3s4.i2_1 >>> numBits_0 | 0 | _this__u8e3s4.j2_1 << (32 - numBits_0 | 0), _this__u8e3s4.j2_1 >> numBits_0);
            } else {
                return new Long(_this__u8e3s4.j2_1 >> (numBits_0 - 32 | 0), _this__u8e3s4.j2_1 >= 0 ? 0 : -1);
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
                return new Long(_this__u8e3s4.i2_1 << numBits_0, _this__u8e3s4.j2_1 << numBits_0 | (_this__u8e3s4.i2_1 >>> (32 - numBits_0 | 0) | 0));
            } else {
                return new Long(0, _this__u8e3s4.i2_1 << (numBits_0 - 32 | 0));
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
        return new Long(_this__u8e3s4.i2_1 & other.i2_1, _this__u8e3s4.j2_1 & other.j2_1);
    }
    function bitwiseOr(_this__u8e3s4, other) {
        _init_properties_boxedLong_kt__v24qrw();
        return new Long(_this__u8e3s4.i2_1 | other.i2_1, _this__u8e3s4.j2_1 | other.j2_1);
    }
    function bitwiseXor(_this__u8e3s4, other) {
        _init_properties_boxedLong_kt__v24qrw();
        return new Long(_this__u8e3s4.i2_1 ^ other.i2_1, _this__u8e3s4.j2_1 ^ other.j2_1);
    }
    function shiftRightUnsigned(_this__u8e3s4, numBits) {
        _init_properties_boxedLong_kt__v24qrw();
        var numBits_0 = numBits & 63;
        if (numBits_0 === 0) {
            return _this__u8e3s4;
        } else {
            if (numBits_0 < 32) {
                return new Long(_this__u8e3s4.i2_1 >>> numBits_0 | 0 | _this__u8e3s4.j2_1 << (32 - numBits_0 | 0), _this__u8e3s4.j2_1 >>> numBits_0 | 0);
            } else {
                var tmp;
                if (numBits_0 === 32) {
                    tmp = new Long(_this__u8e3s4.j2_1, 0);
                } else {
                    tmp = new Long(_this__u8e3s4.j2_1 >>> (numBits_0 - 32 | 0) | 0, 0);
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
    protoOf(ByteCompanionObject).o2 = function() {
        return this.MIN_VALUE;
    };
    protoOf(ByteCompanionObject).p2 = function() {
        return this.MAX_VALUE;
    };
    protoOf(ByteCompanionObject).q2 = function() {
        return this.SIZE_BYTES;
    };
    protoOf(ByteCompanionObject).r2 = function() {
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
    protoOf(ShortCompanionObject).o2 = function() {
        return this.MIN_VALUE;
    };
    protoOf(ShortCompanionObject).p2 = function() {
        return this.MAX_VALUE;
    };
    protoOf(ShortCompanionObject).q2 = function() {
        return this.SIZE_BYTES;
    };
    protoOf(ShortCompanionObject).r2 = function() {
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
    protoOf(IntCompanionObject).o2 = function() {
        return this.MIN_VALUE;
    };
    protoOf(IntCompanionObject).p2 = function() {
        return this.MAX_VALUE;
    };
    protoOf(IntCompanionObject).q2 = function() {
        return this.SIZE_BYTES;
    };
    protoOf(IntCompanionObject).r2 = function() {
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
    protoOf(FloatCompanionObject).o2 = function() {
        return this.MIN_VALUE;
    };
    protoOf(FloatCompanionObject).p2 = function() {
        return this.MAX_VALUE;
    };
    protoOf(FloatCompanionObject).s2 = function() {
        return this.POSITIVE_INFINITY;
    };
    protoOf(FloatCompanionObject).t2 = function() {
        return this.NEGATIVE_INFINITY;
    };
    protoOf(FloatCompanionObject).u2 = function() {
        return this.NaN;
    };
    protoOf(FloatCompanionObject).q2 = function() {
        return this.SIZE_BYTES;
    };
    protoOf(FloatCompanionObject).r2 = function() {
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
    protoOf(DoubleCompanionObject).o2 = function() {
        return this.MIN_VALUE;
    };
    protoOf(DoubleCompanionObject).p2 = function() {
        return this.MAX_VALUE;
    };
    protoOf(DoubleCompanionObject).s2 = function() {
        return this.POSITIVE_INFINITY;
    };
    protoOf(DoubleCompanionObject).t2 = function() {
        return this.NEGATIVE_INFINITY;
    };
    protoOf(DoubleCompanionObject).u2 = function() {
        return this.NaN;
    };
    protoOf(DoubleCompanionObject).q2 = function() {
        return this.SIZE_BYTES;
    };
    protoOf(DoubleCompanionObject).r2 = function() {
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
        Companion_instance_4.w2(fromIndex, toIndex, _this__u8e3s4.length);
        _this__u8e3s4.fill(element, fromIndex, toIndex);
    }
    function sort(_this__u8e3s4) {
        if (_this__u8e3s4.length > 1) {
            sortArray(_this__u8e3s4);
        }
    }
    function sortWith(_this__u8e3s4, comparator) {
        if (_this__u8e3s4.length > 1) {
            sortArrayWith(_this__u8e3s4, comparator);
        }
    }
    function digitToIntImpl(_this__u8e3s4) {
        var ch = Char__toInt_impl_vasixd(_this__u8e3s4);
        var index = binarySearchRange(Digit_getInstance().x2_1, ch);
        var diff = ch - Digit_getInstance().x2_1[index] | 0;
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
        tmp.x2_1 = new Int32Array([ 48, 1632, 1776, 1984, 2406, 2534, 2662, 2790, 2918, 3046, 3174, 3302, 3430, 3558, 3664, 3792, 3872, 4160, 4240, 6112, 6160, 6470, 6608, 6784, 6800, 6992, 7088, 7232, 7248, 42528, 43216, 43264, 43472, 43504, 43600, 44016, 65296 ]);
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
        var high = _this__u8e3s4.j2_1;
        var tmp;
        if (high === 0) {
            var this_0 = _this__u8e3s4.i2_1;
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
        var low = _this__u8e3s4.i2_1;
        return low === 0 ? 32 + countTrailingZeroBits_0(_this__u8e3s4.j2_1) | 0 : countTrailingZeroBits_0(low);
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
        return bitwiseXor(v1, new Long(0, -2147483648)).k2(bitwiseXor(v2, new Long(0, -2147483648)));
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
        Companion_instance_4.w2(startIndex, endIndex, source.length);
        var rangeSize = endIndex - startIndex | 0;
        Companion_instance_4.w2(destinationOffset, destinationOffset + rangeSize | 0, destination.length);
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
    function collectionToArray(collection) {
        return collectionToArrayCommonImpl(collection);
    }
    function sort_0(_this__u8e3s4) {
        collectionsSort(_this__u8e3s4, naturalOrder());
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
    function checkCountOverflow(count) {
        if (count < 0) {
            throwCountOverflow();
        }
        return count;
    }
    function sortWith_0(_this__u8e3s4, comparator) {
        collectionsSort(_this__u8e3s4, comparator);
    }
    function collectionsSort(list, comparator) {
        if (list.j() <= 1) return Unit_instance;
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
    protoOf(AbstractMutableCollection).y2 = function(element) {
        this.z2();
        var iterator = this.g();
        while (iterator.h()) {
            if (equals(iterator.i(), element)) {
                iterator.a3();
                return true;
            }
        }
        return false;
    };
    protoOf(AbstractMutableCollection).q = function(elements) {
        this.z2();
        var modified = false;
        var _iterator__ex2g4s = elements.g();
        while (_iterator__ex2g4s.h()) {
            var element = _iterator__ex2g4s.i();
            if (this.f(element)) modified = true;
        }
        return modified;
    };
    protoOf(AbstractMutableCollection).a2 = function() {
        this.z2();
        var iterator = this.g();
        while (iterator.h()) {
            iterator.i();
            iterator.a3();
        }
    };
    protoOf(AbstractMutableCollection).toJSON = function() {
        return this.toArray();
    };
    protoOf(AbstractMutableCollection).z2 = function() {};
    function IteratorImpl($outer) {
        this.d3_1 = $outer;
        this.b3_1 = 0;
        this.c3_1 = -1;
    }
    protoOf(IteratorImpl).h = function() {
        return this.b3_1 < this.d3_1.j();
    };
    protoOf(IteratorImpl).i = function() {
        if (!this.h()) throw NoSuchElementException_init_$Create$();
        var tmp = this;
        var _unary__edvuaz = this.b3_1;
        this.b3_1 = _unary__edvuaz + 1 | 0;
        tmp.c3_1 = _unary__edvuaz;
        return this.d3_1.m(this.c3_1);
    };
    protoOf(IteratorImpl).a3 = function() {
        if (!!(this.c3_1 === -1)) {
            var message = 'Call next() or previous() before removing element from the iterator.';
            throw IllegalStateException_init_$Create$_0(toString_1(message));
        }
        this.d3_1.f3(this.c3_1);
        this.b3_1 = this.c3_1;
        this.c3_1 = -1;
    };
    function ListIteratorImpl($outer, index) {
        this.j3_1 = $outer;
        IteratorImpl.call(this, $outer);
        Companion_instance_4.k3(index, this.j3_1.j());
        this.b3_1 = index;
    }
    function AbstractMutableList$removeAll$lambda($elements) {
        return function(it) {
            return $elements.m1(it);
        };
    }
    function AbstractMutableList() {
        AbstractMutableCollection.call(this);
        this.e3_1 = 0;
    }
    protoOf(AbstractMutableList).f = function(element) {
        this.z2();
        this.l3(this.j(), element);
        return true;
    };
    protoOf(AbstractMutableList).a2 = function() {
        this.z2();
        this.m3(0, this.j());
    };
    protoOf(AbstractMutableList).n3 = function(elements) {
        this.z2();
        return removeAll(this, AbstractMutableList$removeAll$lambda(elements));
    };
    protoOf(AbstractMutableList).g = function() {
        return new IteratorImpl(this);
    };
    protoOf(AbstractMutableList).m1 = function(element) {
        return this.o1(element) >= 0;
    };
    protoOf(AbstractMutableList).o1 = function(element) {
        var tmp$ret$0;
        $l$block: {
            var index = 0;
            var _iterator__ex2g4s = this.g();
            while (_iterator__ex2g4s.h()) {
                var item = _iterator__ex2g4s.i();
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
            iterator.i();
            iterator.a3();
        } while (inductionVariable < times);
    };
    protoOf(AbstractMutableList).equals = function(other) {
        if (other === this) return true;
        if (!(!(other == null) ? isInterface(other, KtList) : false)) return false;
        return Companion_instance_4.o3(this, other);
    };
    protoOf(AbstractMutableList).hashCode = function() {
        return Companion_instance_4.p3(this);
    };
    function AbstractMutableMap() {
        AbstractMap.call(this);
        this.s3_1 = null;
        this.t3_1 = null;
    }
    protoOf(AbstractMutableMap).u3 = function() {
        return new HashMapKeysDefault(this);
    };
    protoOf(AbstractMutableMap).v3 = function() {
        return new HashMapValuesDefault(this);
    };
    protoOf(AbstractMutableMap).u1 = function() {
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
    protoOf(AbstractMutableMap).v1 = function() {
        var tmp0_elvis_lhs = this.t3_1;
        var tmp;
        if (tmp0_elvis_lhs == null) {
            var this_0 = this.v3();
            this.t3_1 = this_0;
            tmp = this_0;
        } else {
            tmp = tmp0_elvis_lhs;
        }
        return tmp;
    };
    protoOf(AbstractMutableMap).a2 = function() {
        this.w1().a2();
    };
    protoOf(AbstractMutableMap).y1 = function(key) {
        this.z2();
        var iter = this.w1().g();
        while (iter.h()) {
            var entry = iter.i();
            var k = entry.p1();
            if (equals(key, k)) {
                var value = entry.q1();
                iter.a3();
                return value;
            }
        }
        return null;
    };
    protoOf(AbstractMutableMap).z2 = function() {};
    function AbstractMutableSet() {
        AbstractMutableCollection.call(this);
    }
    protoOf(AbstractMutableSet).equals = function(other) {
        if (other === this) return true;
        if (!(!(other == null) ? isInterface(other, KtSet) : false)) return false;
        return Companion_instance_6.z3(this, other);
    };
    protoOf(AbstractMutableSet).hashCode = function() {
        return Companion_instance_6.a4(this);
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
        this_0.p_1 = true;
        tmp.b4_1 = this_0;
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
        var previous = $this.j();
        $this.o_1.length = $this.j() + amount | 0;
        return previous;
    }
    function rangeCheck($this, index) {
        Companion_instance_4.c4(index, $this.j());
        return index;
    }
    function insertionRangeCheck($this, index) {
        Companion_instance_4.k3(index, $this.j());
        return index;
    }
    function ArrayList(array) {
        Companion_getInstance_2();
        AbstractMutableList.call(this);
        this.o_1 = array;
        this.p_1 = false;
    }
    protoOf(ArrayList).d4 = function() {
        this.z2();
        this.p_1 = true;
        return this.j() > 0 ? this : Companion_getInstance_2().b4_1;
    };
    protoOf(ArrayList).e4 = function(minCapacity) {};
    protoOf(ArrayList).j = function() {
        return this.o_1.length;
    };
    protoOf(ArrayList).m = function(index) {
        return this.o_1[rangeCheck(this, index)];
    };
    protoOf(ArrayList).s = function(index, element) {
        this.z2();
        rangeCheck(this, index);
        var this_0 = this.o_1[index];
        this.o_1[index] = element;
        return this_0;
    };
    protoOf(ArrayList).f = function(element) {
        this.z2();
        this.o_1.push(element);
        this.e3_1 = this.e3_1 + 1 | 0;
        return true;
    };
    protoOf(ArrayList).l3 = function(index, element) {
        this.z2();
        this.o_1.splice(insertionRangeCheck(this, index), 0, element);
        this.e3_1 = this.e3_1 + 1 | 0;
    };
    protoOf(ArrayList).q = function(elements) {
        this.z2();
        if (elements.k()) return false;
        var offset = increaseLength(this, elements.j());
        var index = 0;
        var _iterator__ex2g4s = elements.g();
        while (_iterator__ex2g4s.h()) {
            var item = _iterator__ex2g4s.i();
            var _unary__edvuaz = index;
            index = _unary__edvuaz + 1 | 0;
            var index_0 = checkIndexOverflow(_unary__edvuaz);
            this.o_1[offset + index_0 | 0] = item;
        }
        this.e3_1 = this.e3_1 + 1 | 0;
        return true;
    };
    protoOf(ArrayList).f3 = function(index) {
        this.z2();
        rangeCheck(this, index);
        this.e3_1 = this.e3_1 + 1 | 0;
        var tmp;
        if (index === get_lastIndex_3(this)) {
            tmp = this.o_1.pop();
        } else {
            tmp = this.o_1.splice(index, 1)[0];
        }
        return tmp;
    };
    protoOf(ArrayList).y2 = function(element) {
        this.z2();
        var inductionVariable = 0;
        var last = this.o_1.length - 1 | 0;
        if (inductionVariable <= last) do {
            var index = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            if (equals(this.o_1[index], element)) {
                this.o_1.splice(index, 1);
                this.e3_1 = this.e3_1 + 1 | 0;
                return true;
            }
        } while (inductionVariable <= last);
        return false;
    };
    protoOf(ArrayList).m3 = function(fromIndex, toIndex) {
        this.z2();
        this.e3_1 = this.e3_1 + 1 | 0;
        this.o_1.splice(fromIndex, toIndex - fromIndex | 0);
    };
    protoOf(ArrayList).a2 = function() {
        this.z2();
        var tmp = this;
        tmp.o_1 = [];
        this.e3_1 = this.e3_1 + 1 | 0;
    };
    protoOf(ArrayList).o1 = function(element) {
        return indexOf(this.o_1, element);
    };
    protoOf(ArrayList).toString = function() {
        return arrayToString(this.o_1);
    };
    protoOf(ArrayList).f4 = function() {
        return [].slice.call(this.o_1);
    };
    protoOf(ArrayList).toArray = function() {
        return this.f4();
    };
    protoOf(ArrayList).z2 = function() {
        if (this.p_1) throw UnsupportedOperationException_init_$Create$();
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
    function sortArray(array) {
        if (getStableSortingIsSupported()) {
            var comparison = sortArray$lambda;
            array.sort(comparison);
        } else {
            mergeSort(array, 0, get_lastIndex(array), naturalOrder());
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
    function sortArray$lambda(a, b) {
        return compareTo(a, b);
    }
    function getStableSortingIsSupported$lambda(a, b) {
        return (a & 3) - (b & 3) | 0;
    }
    function HashMap_init_$Init$(internalMap, $this) {
        AbstractMutableMap.call($this);
        HashMap.call($this);
        $this.k4_1 = internalMap;
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
        HashMap_init_$Init$(InternalHashMap_init_$Create$_2(initialCapacity, loadFactor), $this);
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
        HashMap_init_$Init$(InternalHashMap_init_$Create$_1(original), $this);
        return $this;
    }
    protoOf(HashMap).a2 = function() {
        this.k4_1.a2();
    };
    protoOf(HashMap).r1 = function(key) {
        return this.k4_1.m4(key);
    };
    protoOf(HashMap).s1 = function(value) {
        return this.k4_1.s1(value);
    };
    protoOf(HashMap).u3 = function() {
        return new HashMapKeys(this.k4_1);
    };
    protoOf(HashMap).v3 = function() {
        return new HashMapValues(this.k4_1);
    };
    protoOf(HashMap).w1 = function() {
        var tmp0_elvis_lhs = this.l4_1;
        var tmp;
        if (tmp0_elvis_lhs == null) {
            var this_0 = new HashMapEntrySet(this.k4_1);
            this.l4_1 = this_0;
            tmp = this_0;
        } else {
            tmp = tmp0_elvis_lhs;
        }
        return tmp;
    };
    protoOf(HashMap).t1 = function(key) {
        return this.k4_1.t1(key);
    };
    protoOf(HashMap).x1 = function(key, value) {
        return this.k4_1.x1(key, value);
    };
    protoOf(HashMap).y1 = function(key) {
        return this.k4_1.y1(key);
    };
    protoOf(HashMap).j = function() {
        return this.k4_1.j();
    };
    protoOf(HashMap).z1 = function(from) {
        return this.k4_1.z1(from);
    };
    function HashMap() {
        this.l4_1 = null;
    }
    function HashMapKeys(backing) {
        AbstractMutableSet.call(this);
        this.n4_1 = backing;
    }
    protoOf(HashMapKeys).j = function() {
        return this.n4_1.j();
    };
    protoOf(HashMapKeys).k = function() {
        return this.n4_1.j() === 0;
    };
    protoOf(HashMapKeys).m1 = function(element) {
        return this.n4_1.m4(element);
    };
    protoOf(HashMapKeys).a2 = function() {
        return this.n4_1.a2();
    };
    protoOf(HashMapKeys).f = function(element) {
        throw UnsupportedOperationException_init_$Create$();
    };
    protoOf(HashMapKeys).q = function(elements) {
        throw UnsupportedOperationException_init_$Create$();
    };
    protoOf(HashMapKeys).y2 = function(element) {
        return this.n4_1.o4(element);
    };
    protoOf(HashMapKeys).g = function() {
        return this.n4_1.p4();
    };
    protoOf(HashMapKeys).z2 = function() {
        return this.n4_1.q4();
    };
    function HashMapValues(backing) {
        AbstractMutableCollection.call(this);
        this.r4_1 = backing;
    }
    protoOf(HashMapValues).j = function() {
        return this.r4_1.j();
    };
    protoOf(HashMapValues).k = function() {
        return this.r4_1.j() === 0;
    };
    protoOf(HashMapValues).s4 = function(element) {
        return this.r4_1.s1(element);
    };
    protoOf(HashMapValues).m1 = function(element) {
        if (!true) return false;
        return this.s4(element);
    };
    protoOf(HashMapValues).t4 = function(element) {
        throw UnsupportedOperationException_init_$Create$();
    };
    protoOf(HashMapValues).f = function(element) {
        return this.t4(element);
    };
    protoOf(HashMapValues).u4 = function(elements) {
        throw UnsupportedOperationException_init_$Create$();
    };
    protoOf(HashMapValues).q = function(elements) {
        return this.u4(elements);
    };
    protoOf(HashMapValues).g = function() {
        return this.r4_1.v4();
    };
    protoOf(HashMapValues).z2 = function() {
        return this.r4_1.q4();
    };
    function HashMapEntrySet(backing) {
        HashMapEntrySetBase.call(this, backing);
    }
    protoOf(HashMapEntrySet).g = function() {
        return this.x4_1.y4();
    };
    function HashMapEntrySetBase(backing) {
        AbstractMutableSet.call(this);
        this.x4_1 = backing;
    }
    protoOf(HashMapEntrySetBase).j = function() {
        return this.x4_1.j();
    };
    protoOf(HashMapEntrySetBase).k = function() {
        return this.x4_1.j() === 0;
    };
    protoOf(HashMapEntrySetBase).z4 = function(element) {
        return this.x4_1.c5(element);
    };
    protoOf(HashMapEntrySetBase).m1 = function(element) {
        if (!(!(element == null) ? isInterface(element, Entry) : false)) return false;
        return this.z4((!(element == null) ? isInterface(element, Entry) : false) ? element : THROW_CCE());
    };
    protoOf(HashMapEntrySetBase).a2 = function() {
        return this.x4_1.a2();
    };
    protoOf(HashMapEntrySetBase).a5 = function(element) {
        throw UnsupportedOperationException_init_$Create$();
    };
    protoOf(HashMapEntrySetBase).f = function(element) {
        return this.a5((!(element == null) ? isInterface(element, Entry) : false) ? element : THROW_CCE());
    };
    protoOf(HashMapEntrySetBase).q = function(elements) {
        throw UnsupportedOperationException_init_$Create$();
    };
    protoOf(HashMapEntrySetBase).b5 = function(element) {
        return this.x4_1.d5(element);
    };
    protoOf(HashMapEntrySetBase).y2 = function(element) {
        if (!(!(element == null) ? isInterface(element, Entry) : false)) return false;
        return this.b5((!(element == null) ? isInterface(element, Entry) : false) ? element : THROW_CCE());
    };
    protoOf(HashMapEntrySetBase).n1 = function(elements) {
        return this.x4_1.e5(elements);
    };
    protoOf(HashMapEntrySetBase).z2 = function() {
        return this.x4_1.q4();
    };
    function HashMapKeysDefault$iterator$1($entryIterator) {
        this.f5_1 = $entryIterator;
    }
    protoOf(HashMapKeysDefault$iterator$1).h = function() {
        return this.f5_1.h();
    };
    protoOf(HashMapKeysDefault$iterator$1).i = function() {
        return this.f5_1.i().p1();
    };
    protoOf(HashMapKeysDefault$iterator$1).a3 = function() {
        return this.f5_1.a3();
    };
    function HashMapKeysDefault(backingMap) {
        AbstractMutableSet.call(this);
        this.g5_1 = backingMap;
    }
    protoOf(HashMapKeysDefault).h5 = function(element) {
        throw UnsupportedOperationException_init_$Create$_0('Add is not supported on keys');
    };
    protoOf(HashMapKeysDefault).f = function(element) {
        return this.h5(element);
    };
    protoOf(HashMapKeysDefault).a2 = function() {
        return this.g5_1.a2();
    };
    protoOf(HashMapKeysDefault).m4 = function(element) {
        return this.g5_1.r1(element);
    };
    protoOf(HashMapKeysDefault).m1 = function(element) {
        if (!true) return false;
        return this.m4(element);
    };
    protoOf(HashMapKeysDefault).g = function() {
        var entryIterator = this.g5_1.w1().g();
        return new HashMapKeysDefault$iterator$1(entryIterator);
    };
    protoOf(HashMapKeysDefault).y1 = function(element) {
        this.z2();
        if (this.g5_1.r1(element)) {
            this.g5_1.y1(element);
            return true;
        }
        return false;
    };
    protoOf(HashMapKeysDefault).y2 = function(element) {
        if (!true) return false;
        return this.y1(element);
    };
    protoOf(HashMapKeysDefault).j = function() {
        return this.g5_1.j();
    };
    protoOf(HashMapKeysDefault).z2 = function() {
        return this.g5_1.z2();
    };
    function HashMapValuesDefault$iterator$1($entryIterator) {
        this.i5_1 = $entryIterator;
    }
    protoOf(HashMapValuesDefault$iterator$1).h = function() {
        return this.i5_1.h();
    };
    protoOf(HashMapValuesDefault$iterator$1).i = function() {
        return this.i5_1.i().q1();
    };
    protoOf(HashMapValuesDefault$iterator$1).a3 = function() {
        return this.i5_1.a3();
    };
    function HashMapValuesDefault(backingMap) {
        AbstractMutableCollection.call(this);
        this.j5_1 = backingMap;
    }
    protoOf(HashMapValuesDefault).t4 = function(element) {
        throw UnsupportedOperationException_init_$Create$_0('Add is not supported on values');
    };
    protoOf(HashMapValuesDefault).f = function(element) {
        return this.t4(element);
    };
    protoOf(HashMapValuesDefault).s4 = function(element) {
        return this.j5_1.s1(element);
    };
    protoOf(HashMapValuesDefault).m1 = function(element) {
        if (!true) return false;
        return this.s4(element);
    };
    protoOf(HashMapValuesDefault).g = function() {
        var entryIterator = this.j5_1.w1().g();
        return new HashMapValuesDefault$iterator$1(entryIterator);
    };
    protoOf(HashMapValuesDefault).j = function() {
        return this.j5_1.j();
    };
    protoOf(HashMapValuesDefault).z2 = function() {
        return this.j5_1.z2();
    };
    function HashSet_init_$Init$(map, $this) {
        AbstractMutableSet.call($this);
        HashSet.call($this);
        $this.k5_1 = map;
        return $this;
    }
    function HashSet_init_$Init$_0($this) {
        HashSet_init_$Init$(InternalHashMap_init_$Create$(), $this);
        return $this;
    }
    function HashSet_init_$Create$() {
        return HashSet_init_$Init$_0(objectCreate(protoOf(HashSet)));
    }
    function HashSet_init_$Init$_1(elements, $this) {
        HashSet_init_$Init$(InternalHashMap_init_$Create$_0(elements.j()), $this);
        var _iterator__ex2g4s = elements.g();
        while (_iterator__ex2g4s.h()) {
            var element = _iterator__ex2g4s.i();
            $this.k5_1.x1(element, true);
        }
        return $this;
    }
    function HashSet_init_$Init$_2(initialCapacity, loadFactor, $this) {
        HashSet_init_$Init$(InternalHashMap_init_$Create$_2(initialCapacity, loadFactor), $this);
        return $this;
    }
    function HashSet_init_$Init$_3(initialCapacity, $this) {
        HashSet_init_$Init$_2(initialCapacity, 1, $this);
        return $this;
    }
    function HashSet_init_$Create$_0(initialCapacity) {
        return HashSet_init_$Init$_3(initialCapacity, objectCreate(protoOf(HashSet)));
    }
    protoOf(HashSet).f = function(element) {
        return this.k5_1.x1(element, true) == null;
    };
    protoOf(HashSet).a2 = function() {
        this.k5_1.a2();
    };
    protoOf(HashSet).m1 = function(element) {
        return this.k5_1.m4(element);
    };
    protoOf(HashSet).k = function() {
        return this.k5_1.j() === 0;
    };
    protoOf(HashSet).g = function() {
        return this.k5_1.p4();
    };
    protoOf(HashSet).y2 = function(element) {
        return !(this.k5_1.y1(element) == null);
    };
    protoOf(HashSet).j = function() {
        return this.k5_1.j();
    };
    function HashSet() {}
    function computeHashSize($this, capacity) {
        return takeHighestOneBit(imul(coerceAtLeast(capacity, 1), 3));
    }
    function computeShift($this, hashSize) {
        return clz32(hashSize) + 1 | 0;
    }
    function checkForComodification($this) {
        if (!($this.v5_1.s5_1 === $this.x5_1)) throw ConcurrentModificationException_init_$Create$_0('The backing map has been modified after this entry was obtained.');
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
    function InternalHashMap_init_$Create$_0(initialCapacity) {
        return InternalHashMap_init_$Init$_0(initialCapacity, objectCreate(protoOf(InternalHashMap)));
    }
    function InternalHashMap_init_$Init$_1(original, $this) {
        InternalHashMap_init_$Init$_0(original.j(), $this);
        $this.z1(original);
        return $this;
    }
    function InternalHashMap_init_$Create$_1(original) {
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
    function InternalHashMap_init_$Create$_2(initialCapacity, loadFactor) {
        return InternalHashMap_init_$Init$_2(initialCapacity, loadFactor, objectCreate(protoOf(InternalHashMap)));
    }
    function _get_capacity__a9k9f3($this) {
        return $this.l5_1.length;
    }
    function _get_hashSize__tftcho($this) {
        return $this.o5_1.length;
    }
    function registerModification($this) {
        $this.s5_1 = $this.s5_1 + 1 | 0;
    }
    function ensureExtraCapacity($this, n) {
        if (shouldCompact($this, n)) {
            compact($this, true);
        } else {
            ensureCapacity($this, $this.q5_1 + n | 0);
        }
    }
    function shouldCompact($this, extraCapacity) {
        var spareCapacity = _get_capacity__a9k9f3($this) - $this.q5_1 | 0;
        var gaps = $this.q5_1 - $this.j() | 0;
        return spareCapacity < extraCapacity && (gaps + spareCapacity | 0) >= extraCapacity && gaps >= (_get_capacity__a9k9f3($this) / 4 | 0);
    }
    function ensureCapacity($this, minCapacity) {
        if (minCapacity < 0) throw RuntimeException_init_$Create$_0('too many elements');
        if (minCapacity > _get_capacity__a9k9f3($this)) {
            var newSize = Companion_instance_4.y5(_get_capacity__a9k9f3($this), minCapacity);
            $this.l5_1 = copyOfUninitializedElements($this.l5_1, newSize);
            var tmp = $this;
            var tmp0_safe_receiver = $this.m5_1;
            tmp.m5_1 = tmp0_safe_receiver == null ? null : copyOfUninitializedElements(tmp0_safe_receiver, newSize);
            $this.n5_1 = copyOf($this.n5_1, newSize);
            var newHashSize = computeHashSize(Companion_instance_3, newSize);
            if (newHashSize > _get_hashSize__tftcho($this)) {
                rehash($this, newHashSize);
            }
        }
    }
    function allocateValuesArray($this) {
        var curValuesArray = $this.m5_1;
        if (!(curValuesArray == null)) return curValuesArray;
        var newValuesArray = arrayOfUninitializedElements(_get_capacity__a9k9f3($this));
        $this.m5_1 = newValuesArray;
        return newValuesArray;
    }
    function hash($this, key) {
        return key == null ? 0 : imul(hashCode_0(key), -1640531527) >>> $this.r5_1 | 0;
    }
    function compact($this, updateHashArray) {
        var i = 0;
        var j = 0;
        var valuesArray = $this.m5_1;
        while (i < $this.q5_1) {
            var hash = $this.n5_1[i];
            if (hash >= 0) {
                $this.l5_1[j] = $this.l5_1[i];
                if (!(valuesArray == null)) {
                    valuesArray[j] = valuesArray[i];
                }
                if (updateHashArray) {
                    $this.n5_1[j] = hash;
                    $this.o5_1[hash] = j + 1 | 0;
                }
                j = j + 1 | 0;
            }
            i = i + 1 | 0;
        }
        resetRange($this.l5_1, j, $this.q5_1);
        if (valuesArray == null) null; else {
            resetRange(valuesArray, j, $this.q5_1);
        }
        $this.q5_1 = j;
    }
    function rehash($this, newHashSize) {
        registerModification($this);
        if ($this.q5_1 > $this.t5_1) {
            compact($this, false);
        }
        $this.o5_1 = new Int32Array(newHashSize);
        $this.r5_1 = computeShift(Companion_instance_3, newHashSize);
        var i = 0;
        while (i < $this.q5_1) {
            var _unary__edvuaz = i;
            i = _unary__edvuaz + 1 | 0;
            if (!putRehash($this, _unary__edvuaz)) {
                throw IllegalStateException_init_$Create$_0('This cannot happen with fixed magic multiplier and grow-only hash array. Have object hashCodes changed?');
            }
        }
    }
    function putRehash($this, i) {
        var hash_0 = hash($this, $this.l5_1[i]);
        var probesLeft = $this.p5_1;
        while (true) {
            var index = $this.o5_1[hash_0];
            if (index === 0) {
                $this.o5_1[hash_0] = i + 1 | 0;
                $this.n5_1[i] = hash_0;
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
        var probesLeft = $this.p5_1;
        while (true) {
            var index = $this.o5_1[hash_0];
            if (index === 0) return -1;
            if (equals($this.l5_1[index - 1 | 0], key)) return index - 1 | 0;
            probesLeft = probesLeft - 1 | 0;
            if (probesLeft < 0) return -1;
            var _unary__edvuaz = hash_0;
            hash_0 = _unary__edvuaz - 1 | 0;
            if (_unary__edvuaz === 0) hash_0 = _get_hashSize__tftcho($this) - 1 | 0;
        }
    }
    function findValue($this, value) {
        var i = $this.q5_1;
        $l$loop: while (true) {
            i = i - 1 | 0;
            if (!(i >= 0)) {
                break $l$loop;
            }
            if ($this.n5_1[i] >= 0 && equals(ensureNotNull($this.m5_1)[i], value)) return i;
        }
        return -1;
    }
    function addKey($this, key) {
        $this.q4();
        retry: while (true) {
            var hash_0 = hash($this, key);
            var tentativeMaxProbeDistance = coerceAtMost(imul($this.p5_1, 2), _get_hashSize__tftcho($this) / 2 | 0);
            var probeDistance = 0;
            while (true) {
                var index = $this.o5_1[hash_0];
                if (index === 0) {
                    if ($this.q5_1 >= _get_capacity__a9k9f3($this)) {
                        ensureExtraCapacity($this, 1);
                        continue retry;
                    }
                    var _unary__edvuaz = $this.q5_1;
                    $this.q5_1 = _unary__edvuaz + 1 | 0;
                    var putIndex = _unary__edvuaz;
                    $this.l5_1[putIndex] = key;
                    $this.n5_1[putIndex] = hash_0;
                    $this.o5_1[hash_0] = putIndex + 1 | 0;
                    $this.t5_1 = $this.t5_1 + 1 | 0;
                    registerModification($this);
                    if (probeDistance > $this.p5_1) $this.p5_1 = probeDistance;
                    return putIndex;
                }
                if (equals($this.l5_1[index - 1 | 0], key)) {
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
        resetAt($this.l5_1, index);
        var tmp0_safe_receiver = $this.m5_1;
        if (tmp0_safe_receiver == null) null; else {
            resetAt(tmp0_safe_receiver, index);
        }
        removeHashAt($this, $this.n5_1[index]);
        $this.n5_1[index] = -1;
        $this.t5_1 = $this.t5_1 - 1 | 0;
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
            var index = $this.o5_1[hash_0];
            probeDistance = probeDistance + 1 | 0;
            if (probeDistance > $this.p5_1) {
                $this.o5_1[hole] = 0;
                return Unit_instance;
            }
            if (index === 0) {
                $this.o5_1[hole] = 0;
                return Unit_instance;
            }
            var otherHash = hash($this, $this.l5_1[index - 1 | 0]);
            if (((otherHash - hash_0 | 0) & (_get_hashSize__tftcho($this) - 1 | 0)) >= probeDistance) {
                $this.o5_1[hole] = index;
                $this.n5_1[index - 1 | 0] = hole;
                hole = hash_0;
                probeDistance = 0;
            }
        }
    }
    function contentEquals_0($this, other) {
        return $this.t5_1 === other.j() && $this.e5(other.w1());
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
        if (from.k()) return false;
        ensureExtraCapacity($this, from.j());
        var it = from.g();
        var updated = false;
        while (it.h()) {
            if (putEntry($this, it.i())) updated = true;
        }
        return updated;
    }
    function Companion_3() {
        this.z5_1 = -1640531527;
        this.a6_1 = 8;
        this.b6_1 = 2;
        this.c6_1 = -1;
    }
    var Companion_instance_3;
    function Companion_getInstance_3() {
        return Companion_instance_3;
    }
    function Itr(map) {
        this.d6_1 = map;
        this.e6_1 = 0;
        this.f6_1 = -1;
        this.g6_1 = this.d6_1.s5_1;
        this.h6();
    }
    protoOf(Itr).h6 = function() {
        while (this.e6_1 < this.d6_1.q5_1 && this.d6_1.n5_1[this.e6_1] < 0) {
            this.e6_1 = this.e6_1 + 1 | 0;
        }
    };
    protoOf(Itr).h = function() {
        return this.e6_1 < this.d6_1.q5_1;
    };
    protoOf(Itr).a3 = function() {
        this.i6();
        if (!!(this.f6_1 === -1)) {
            var message = 'Call next() before removing element from the iterator.';
            throw IllegalStateException_init_$Create$_0(toString_1(message));
        }
        this.d6_1.q4();
        removeEntryAt(this.d6_1, this.f6_1);
        this.f6_1 = -1;
        this.g6_1 = this.d6_1.s5_1;
    };
    protoOf(Itr).i6 = function() {
        if (!(this.d6_1.s5_1 === this.g6_1)) throw ConcurrentModificationException_init_$Create$();
    };
    function KeysItr(map) {
        Itr.call(this, map);
    }
    protoOf(KeysItr).i = function() {
        this.i6();
        if (this.e6_1 >= this.d6_1.q5_1) throw NoSuchElementException_init_$Create$();
        var tmp = this;
        var _unary__edvuaz = this.e6_1;
        this.e6_1 = _unary__edvuaz + 1 | 0;
        tmp.f6_1 = _unary__edvuaz;
        var result = this.d6_1.l5_1[this.f6_1];
        this.h6();
        return result;
    };
    function ValuesItr(map) {
        Itr.call(this, map);
    }
    protoOf(ValuesItr).i = function() {
        this.i6();
        if (this.e6_1 >= this.d6_1.q5_1) throw NoSuchElementException_init_$Create$();
        var tmp = this;
        var _unary__edvuaz = this.e6_1;
        this.e6_1 = _unary__edvuaz + 1 | 0;
        tmp.f6_1 = _unary__edvuaz;
        var result = ensureNotNull(this.d6_1.m5_1)[this.f6_1];
        this.h6();
        return result;
    };
    function EntriesItr(map) {
        Itr.call(this, map);
    }
    protoOf(EntriesItr).i = function() {
        this.i6();
        if (this.e6_1 >= this.d6_1.q5_1) throw NoSuchElementException_init_$Create$();
        var tmp = this;
        var _unary__edvuaz = this.e6_1;
        this.e6_1 = _unary__edvuaz + 1 | 0;
        tmp.f6_1 = _unary__edvuaz;
        var result = new EntryRef(this.d6_1, this.f6_1);
        this.h6();
        return result;
    };
    protoOf(EntriesItr).v6 = function() {
        if (this.e6_1 >= this.d6_1.q5_1) throw NoSuchElementException_init_$Create$();
        var tmp = this;
        var _unary__edvuaz = this.e6_1;
        this.e6_1 = _unary__edvuaz + 1 | 0;
        tmp.f6_1 = _unary__edvuaz;
        var tmp0_safe_receiver = this.d6_1.l5_1[this.f6_1];
        var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : hashCode_0(tmp0_safe_receiver);
        var tmp_0 = tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
        var tmp0_safe_receiver_0 = ensureNotNull(this.d6_1.m5_1)[this.f6_1];
        var tmp1_elvis_lhs_0 = tmp0_safe_receiver_0 == null ? null : hashCode_0(tmp0_safe_receiver_0);
        var result = tmp_0 ^ (tmp1_elvis_lhs_0 == null ? 0 : tmp1_elvis_lhs_0);
        this.h6();
        return result;
    };
    protoOf(EntriesItr).w6 = function(sb) {
        if (this.e6_1 >= this.d6_1.q5_1) throw NoSuchElementException_init_$Create$();
        var tmp = this;
        var _unary__edvuaz = this.e6_1;
        this.e6_1 = _unary__edvuaz + 1 | 0;
        tmp.f6_1 = _unary__edvuaz;
        var key = this.d6_1.l5_1[this.f6_1];
        if (equals(key, this.d6_1)) sb.z6('(this Map)'); else sb.y6(key);
        sb.a7(_Char___init__impl__6a9atx(61));
        var value = ensureNotNull(this.d6_1.m5_1)[this.f6_1];
        if (equals(value, this.d6_1)) sb.z6('(this Map)'); else sb.y6(value);
        this.h6();
    };
    function EntryRef(map, index) {
        this.v5_1 = map;
        this.w5_1 = index;
        this.x5_1 = this.v5_1.s5_1;
    }
    protoOf(EntryRef).p1 = function() {
        checkForComodification(this);
        return this.v5_1.l5_1[this.w5_1];
    };
    protoOf(EntryRef).q1 = function() {
        checkForComodification(this);
        return ensureNotNull(this.v5_1.m5_1)[this.w5_1];
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
        this.l5_1 = keysArray;
        this.m5_1 = valuesArray;
        this.n5_1 = presenceArray;
        this.o5_1 = hashArray;
        this.p5_1 = maxProbeDistance;
        this.q5_1 = length;
        this.r5_1 = computeShift(Companion_instance_3, _get_hashSize__tftcho(this));
        this.s5_1 = 0;
        this.t5_1 = 0;
        this.u5_1 = false;
    }
    protoOf(InternalHashMap).j = function() {
        return this.t5_1;
    };
    protoOf(InternalHashMap).s1 = function(value) {
        return findValue(this, value) >= 0;
    };
    protoOf(InternalHashMap).t1 = function(key) {
        var index = findKey(this, key);
        if (index < 0) return null;
        return ensureNotNull(this.m5_1)[index];
    };
    protoOf(InternalHashMap).m4 = function(key) {
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
        this.q4();
        putAllEntries(this, from.w1());
    };
    protoOf(InternalHashMap).y1 = function(key) {
        this.q4();
        var index = findKey(this, key);
        if (index < 0) return null;
        var oldValue = ensureNotNull(this.m5_1)[index];
        removeEntryAt(this, index);
        return oldValue;
    };
    protoOf(InternalHashMap).a2 = function() {
        this.q4();
        var inductionVariable = 0;
        var last = this.q5_1 - 1 | 0;
        if (inductionVariable <= last) do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var hash = this.n5_1[i];
            if (hash >= 0) {
                this.o5_1[hash] = 0;
                this.n5_1[i] = -1;
            }
        } while (!(i === last));
        resetRange(this.l5_1, 0, this.q5_1);
        var tmp0_safe_receiver = this.m5_1;
        if (tmp0_safe_receiver == null) null; else {
            resetRange(tmp0_safe_receiver, 0, this.q5_1);
        }
        this.t5_1 = 0;
        this.q5_1 = 0;
        registerModification(this);
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
        var it = this.y4();
        while (it.h()) {
            result = result + it.v6() | 0;
        }
        return result;
    };
    protoOf(InternalHashMap).toString = function() {
        var sb = StringBuilder_init_$Create$(2 + imul(this.t5_1, 3) | 0);
        sb.z6('{');
        var i = 0;
        var it = this.y4();
        while (it.h()) {
            if (i > 0) {
                sb.z6(', ');
            }
            it.w6(sb);
            i = i + 1 | 0;
        }
        sb.z6('}');
        return sb.toString();
    };
    protoOf(InternalHashMap).q4 = function() {
        if (this.u5_1) throw UnsupportedOperationException_init_$Create$();
    };
    protoOf(InternalHashMap).o4 = function(key) {
        this.q4();
        var index = findKey(this, key);
        if (index < 0) return false;
        removeEntryAt(this, index);
        return true;
    };
    protoOf(InternalHashMap).c5 = function(entry) {
        var index = findKey(this, entry.p1());
        if (index < 0) return false;
        return equals(ensureNotNull(this.m5_1)[index], entry.q1());
    };
    protoOf(InternalHashMap).b7 = function(entry) {
        return this.c5(isInterface(entry, Entry) ? entry : THROW_CCE());
    };
    protoOf(InternalHashMap).d5 = function(entry) {
        this.q4();
        var index = findKey(this, entry.p1());
        if (index < 0) return false;
        if (!equals(ensureNotNull(this.m5_1)[index], entry.q1())) return false;
        removeEntryAt(this, index);
        return true;
    };
    protoOf(InternalHashMap).p4 = function() {
        return new KeysItr(this);
    };
    protoOf(InternalHashMap).v4 = function() {
        return new ValuesItr(this);
    };
    protoOf(InternalHashMap).y4 = function() {
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
    protoOf(LinkedHashMap).z2 = function() {
        return this.k4_1.q4();
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
    function LinkedHashSet_init_$Init$_0(elements, $this) {
        HashSet_init_$Init$_1(elements, $this);
        LinkedHashSet.call($this);
        return $this;
    }
    function LinkedHashSet_init_$Create$_0(elements) {
        return LinkedHashSet_init_$Init$_0(elements, objectCreate(protoOf(LinkedHashSet)));
    }
    function LinkedHashSet_init_$Init$_1(initialCapacity, loadFactor, $this) {
        HashSet_init_$Init$_2(initialCapacity, loadFactor, $this);
        LinkedHashSet.call($this);
        return $this;
    }
    function LinkedHashSet_init_$Init$_2(initialCapacity, $this) {
        LinkedHashSet_init_$Init$_1(initialCapacity, 1, $this);
        return $this;
    }
    function LinkedHashSet_init_$Create$_1(initialCapacity) {
        return LinkedHashSet_init_$Init$_2(initialCapacity, objectCreate(protoOf(LinkedHashSet)));
    }
    protoOf(LinkedHashSet).z2 = function() {
        return this.k5_1.q4();
    };
    function LinkedHashSet() {}
    function RandomAccess() {}
    function CoroutineImpl(resultContinuation) {
        InterceptedCoroutine.call(this);
        this.k7_1 = resultContinuation;
        this.l7_1 = 0;
        this.m7_1 = 0;
        this.n7_1 = null;
        this.o7_1 = null;
        this.p7_1 = null;
        var tmp = this;
        var tmp0_safe_receiver = this.k7_1;
        tmp.q7_1 = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.r7();
    }
    protoOf(CoroutineImpl).r7 = function() {
        return ensureNotNull(this.q7_1);
    };
    protoOf(CoroutineImpl).s7 = function(result) {
        var current = this;
        var currentResult = _Result___get_isFailure__impl__jpiriv(result) ? null : _Result___get_value__impl__bjfvqg(result);
        var currentException = Result__exceptionOrNull_impl_p6xea9(result);
        while (true) {
            var $this$with = current;
            if (currentException == null) {
                $this$with.n7_1 = currentResult;
            } else {
                $this$with.l7_1 = $this$with.m7_1;
                $this$with.o7_1 = currentException;
            }
            try {
                var outcome = $this$with.t7();
                if (outcome === get_COROUTINE_SUSPENDED()) return Unit_instance;
                currentResult = outcome;
                currentException = null;
            } catch ($p) {
                var exception = $p;
                currentResult = null;
                currentException = exception;
            }
            $this$with.v7();
            var completion = ensureNotNull($this$with.k7_1);
            if (completion instanceof CoroutineImpl) {
                current = completion;
            } else {
                if (!(currentException == null)) {
                    var exception_0 = currentException;
                    var tmp$ret$5 = _Result___init__impl__xyqfz8(createFailure(exception_0));
                    completion.w7(tmp$ret$5);
                } else {
                    var value = currentResult;
                    var tmp$ret$7 = _Result___init__impl__xyqfz8(value);
                    completion.w7(tmp$ret$7);
                }
                return Unit_instance;
            }
        }
    };
    protoOf(CoroutineImpl).w7 = function(result) {
        return this.s7(result);
    };
    function CompletedContinuation() {}
    protoOf(CompletedContinuation).r7 = function() {
        var message = 'This continuation is already complete';
        throw IllegalStateException_init_$Create$_0(toString_1(message));
    };
    protoOf(CompletedContinuation).s7 = function(result) {
        var message = 'This continuation is already complete';
        throw IllegalStateException_init_$Create$_0(toString_1(message));
    };
    protoOf(CompletedContinuation).w7 = function(result) {
        return this.s7(result);
    };
    protoOf(CompletedContinuation).toString = function() {
        return 'This continuation is already complete';
    };
    var CompletedContinuation_instance;
    function CompletedContinuation_getInstance() {
        return CompletedContinuation_instance;
    }
    function InterceptedCoroutine() {
        this.u7_1 = null;
    }
    protoOf(InterceptedCoroutine).v7 = function() {
        var intercepted = this.u7_1;
        if (!(intercepted == null) && !(intercepted === this)) {
            ensureNotNull(this.r7().x7(Key_instance)).y7(intercepted);
        }
        this.u7_1 = CompletedContinuation_instance;
    };
    function startCoroutineUninterceptedOrReturnNonGeneratorVersion(_this__u8e3s4, receiver, param, completion) {
        var tmp;
        if (!(completion instanceof InterceptedCoroutine)) {
            tmp = createSimpleCoroutineForSuspendFunction(completion);
        } else {
            tmp = completion;
        }
        var wrappedCompletion = tmp;
        var a = _this__u8e3s4;
        return typeof a === 'function' ? a(receiver, param, wrappedCompletion) : _this__u8e3s4.z7(receiver, param, wrappedCompletion);
    }
    function createSimpleCoroutineForSuspendFunction(completion) {
        return new createSimpleCoroutineForSuspendFunction$1(completion);
    }
    function invokeSuspendSuperTypeWithReceiverAndParam(_this__u8e3s4, receiver, param, completion) {
        throw new NotImplementedError('It is intrinsic method');
    }
    function createSimpleCoroutineForSuspendFunction$1($completion) {
        CoroutineImpl.call(this, isInterface($completion, Continuation) ? $completion : THROW_CCE());
    }
    protoOf(createSimpleCoroutineForSuspendFunction$1).t7 = function() {
        if (this.o7_1 != null) throw this.o7_1;
        return this.n7_1;
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
        this.l8_1 = jClass;
        this.m8_1 = simpleName;
        this.n8_1 = isInstanceFunction;
    }
    protoOf(PrimitiveKClassImpl).o8 = function() {
        return this.l8_1;
    };
    protoOf(PrimitiveKClassImpl).k8 = function() {
        return this.m8_1;
    };
    function KClassImpl() {}
    protoOf(KClassImpl).equals = function(other) {
        var tmp;
        if (other instanceof NothingKClassImpl) {
            tmp = false;
        } else {
            if (other instanceof KClassImpl) {
                tmp = equals(this.o8(), other.o8()) && this.k8() == other.k8();
            } else {
                tmp = false;
            }
        }
        return tmp;
    };
    protoOf(KClassImpl).hashCode = function() {
        var tmp0_safe_receiver = this.k8();
        var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : getStringHashCode(tmp0_safe_receiver);
        return tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
    };
    protoOf(KClassImpl).toString = function() {
        return 'class ' + this.k8();
    };
    function NothingKClassImpl() {
        NothingKClassImpl_instance = this;
        KClassImpl.call(this);
        this.p8_1 = 'Nothing';
    }
    protoOf(NothingKClassImpl).k8 = function() {
        return this.p8_1;
    };
    protoOf(NothingKClassImpl).o8 = function() {
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
        this.q8_1 = jClass;
        var tmp = this;
        var tmp0_safe_receiver = this.q8_1.$metadata$;
        tmp.r8_1 = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.simpleName;
    }
    protoOf(SimpleKClassImpl).o8 = function() {
        return this.q8_1;
    };
    protoOf(SimpleKClassImpl).k8 = function() {
        return this.r8_1;
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
    protoOf(PrimitiveClasses).s8 = function() {
        return this.anyClass;
    };
    protoOf(PrimitiveClasses).t8 = function() {
        return this.numberClass;
    };
    protoOf(PrimitiveClasses).u8 = function() {
        return this.nothingClass;
    };
    protoOf(PrimitiveClasses).v8 = function() {
        return this.booleanClass;
    };
    protoOf(PrimitiveClasses).w8 = function() {
        return this.byteClass;
    };
    protoOf(PrimitiveClasses).x8 = function() {
        return this.shortClass;
    };
    protoOf(PrimitiveClasses).y8 = function() {
        return this.intClass;
    };
    protoOf(PrimitiveClasses).z8 = function() {
        return this.longClass;
    };
    protoOf(PrimitiveClasses).a9 = function() {
        return this.floatClass;
    };
    protoOf(PrimitiveClasses).b9 = function() {
        return this.doubleClass;
    };
    protoOf(PrimitiveClasses).c9 = function() {
        return this.arrayClass;
    };
    protoOf(PrimitiveClasses).d9 = function() {
        return this.stringClass;
    };
    protoOf(PrimitiveClasses).e9 = function() {
        return this.throwableClass;
    };
    protoOf(PrimitiveClasses).f9 = function() {
        return this.booleanArrayClass;
    };
    protoOf(PrimitiveClasses).g9 = function() {
        return this.charArrayClass;
    };
    protoOf(PrimitiveClasses).h9 = function() {
        return this.byteArrayClass;
    };
    protoOf(PrimitiveClasses).i9 = function() {
        return this.shortArrayClass;
    };
    protoOf(PrimitiveClasses).j9 = function() {
        return this.intArrayClass;
    };
    protoOf(PrimitiveClasses).k9 = function() {
        return this.bigIntClass;
    };
    protoOf(PrimitiveClasses).l9 = function() {
        return this.longArrayClass;
    };
    protoOf(PrimitiveClasses).m9 = function() {
        return this.floatArrayClass;
    };
    protoOf(PrimitiveClasses).n9 = function() {
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
                                    tmp_2 = PrimitiveClasses_getInstance().l9();
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
        this.x6_1 = content;
    }
    protoOf(StringBuilder).a = function() {
        return this.x6_1.length;
    };
    protoOf(StringBuilder).b = function(index) {
        var this_0 = this.x6_1;
        var tmp;
        if (0 <= index ? index <= (charSequenceLength(this_0) - 1 | 0) : false) {
            tmp = charSequenceGet(this_0, index);
        } else {
            throw IndexOutOfBoundsException_init_$Create$_0('index: ' + index + ', length: ' + this.a() + '}');
        }
        return tmp;
    };
    protoOf(StringBuilder).c = function(startIndex, endIndex) {
        return substring(this.x6_1, startIndex, endIndex);
    };
    protoOf(StringBuilder).a7 = function(value) {
        this.x6_1 = this.x6_1 + toString(value);
        return this;
    };
    protoOf(StringBuilder).e = function(value) {
        this.x6_1 = this.x6_1 + toString_0(value);
        return this;
    };
    protoOf(StringBuilder).o9 = function(value, startIndex, endIndex) {
        return this.p9(value == null ? 'null' : value, startIndex, endIndex);
    };
    protoOf(StringBuilder).y6 = function(value) {
        this.x6_1 = this.x6_1 + toString_0(value);
        return this;
    };
    protoOf(StringBuilder).q9 = function(value) {
        return this.z6(value.toString());
    };
    protoOf(StringBuilder).r9 = function(value) {
        return this.z6(value.toString());
    };
    protoOf(StringBuilder).z6 = function(value) {
        var tmp = this;
        var tmp_0 = this.x6_1;
        tmp.x6_1 = tmp_0 + (value == null ? 'null' : value);
        return this;
    };
    protoOf(StringBuilder).s9 = function(index, value) {
        Companion_instance_4.k3(index, this.a());
        this.x6_1 = substring(this.x6_1, 0, index) + toString(value) + substring_0(this.x6_1, index);
        return this;
    };
    protoOf(StringBuilder).t9 = function(newLength) {
        if (newLength < 0) {
            throw IllegalArgumentException_init_$Create$_0('Negative new length: ' + newLength + '.');
        }
        if (newLength <= this.a()) {
            this.x6_1 = substring(this.x6_1, 0, newLength);
        } else {
            var inductionVariable = this.a();
            if (inductionVariable < newLength) do {
                var i = inductionVariable;
                inductionVariable = inductionVariable + 1 | 0;
                this.x6_1 = this.x6_1 + toString(_Char___init__impl__6a9atx(0));
            } while (inductionVariable < newLength);
        }
    };
    protoOf(StringBuilder).toString = function() {
        return this.x6_1;
    };
    protoOf(StringBuilder).u9 = function(index) {
        Companion_instance_4.c4(index, this.a());
        this.x6_1 = substring(this.x6_1, 0, index) + substring_0(this.x6_1, index + 1 | 0);
        return this;
    };
    protoOf(StringBuilder).p9 = function(value, startIndex, endIndex) {
        var stringCsq = toString_1(value);
        Companion_instance_4.v9(startIndex, endIndex, stringCsq.length);
        this.x6_1 = this.x6_1 + substring(stringCsq, startIndex, endIndex);
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
        this.w9_1 = function_0;
    }
    protoOf(sam$kotlin_Comparator$0).x9 = function(a, b) {
        return this.w9_1(a, b);
    };
    protoOf(sam$kotlin_Comparator$0).compare = function(a, b) {
        return this.x9(a, b);
    };
    protoOf(sam$kotlin_Comparator$0).l2 = function() {
        return this.w9_1;
    };
    protoOf(sam$kotlin_Comparator$0).equals = function(other) {
        var tmp;
        if (!(other == null) ? isInterface(other, Comparator) : false) {
            var tmp_0;
            if (!(other == null) ? isInterface(other, FunctionAdapter) : false) {
                tmp_0 = equals(this.l2(), other.l2());
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
        return hashCode_0(this.l2());
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
            if (byte >= 0) stringBuilder.a7(numberToChar(byte)); else if (byte >> 5 === -2) {
                var code = codePointFrom2(bytes, byte, byteIndex, endIndex, throwOnMalformed);
                if (code <= 0) {
                    stringBuilder.a7(_Char___init__impl__6a9atx(65533));
                    byteIndex = byteIndex + (-code | 0) | 0;
                } else {
                    stringBuilder.a7(numberToChar(code));
                    byteIndex = byteIndex + 1 | 0;
                }
            } else if (byte >> 4 === -2) {
                var code_0 = codePointFrom3(bytes, byte, byteIndex, endIndex, throwOnMalformed);
                if (code_0 <= 0) {
                    stringBuilder.a7(_Char___init__impl__6a9atx(65533));
                    byteIndex = byteIndex + (-code_0 | 0) | 0;
                } else {
                    stringBuilder.a7(numberToChar(code_0));
                    byteIndex = byteIndex + 2 | 0;
                }
            } else if (byte >> 3 === -2) {
                var code_1 = codePointFrom4(bytes, byte, byteIndex, endIndex, throwOnMalformed);
                if (code_1 <= 0) {
                    stringBuilder.a7(_Char___init__impl__6a9atx(65533));
                    byteIndex = byteIndex + (-code_1 | 0) | 0;
                } else {
                    var high = (code_1 - 65536 | 0) >> 10 | 55296;
                    var low = code_1 & 1023 | 56320;
                    stringBuilder.a7(numberToChar(high));
                    stringBuilder.a7(numberToChar(low));
                    byteIndex = byteIndex + 3 | 0;
                }
            } else {
                malformed(0, byteIndex, throwOnMalformed);
                stringBuilder.a7(_Char___init__impl__6a9atx(65533));
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
        this.aa_1 = scale;
    }
    function convertDurationUnit(value, sourceUnit, targetUnit) {
        var sourceCompareTarget = compareTo(sourceUnit.aa_1, targetUnit.aa_1);
        var tmp;
        if (sourceCompareTarget > 0) {
            var scale = numberToLong(sourceUnit.aa_1 / targetUnit.aa_1);
            var result = multiply(value, scale);
            tmp = equalsLong(divide(result, scale), value) ? result : compare(value, new Long(0, 0)) > 0 ? new Long(-1, 2147483647) : new Long(0, -2147483648);
        } else if (sourceCompareTarget < 0) {
            tmp = divide(value, numberToLong(targetUnit.aa_1 / sourceUnit.aa_1));
        } else {
            tmp = value;
        }
        return tmp;
    }
    function convertDurationUnitOverflow(value, sourceUnit, targetUnit) {
        var sourceCompareTarget = compareTo(sourceUnit.aa_1, targetUnit.aa_1);
        return sourceCompareTarget > 0 ? multiply(value, numberToLong(sourceUnit.aa_1 / targetUnit.aa_1)) : sourceCompareTarget < 0 ? divide(value, numberToLong(targetUnit.aa_1 / sourceUnit.aa_1)) : value;
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
            dstIndex = formatBytesInto_0(_this__u8e3s4.j2_1, dst, dstIndex, startIndex, coerceAtMost(endIndex, 4));
        }
        if (endIndex > 4) {
            formatBytesInto_0(_this__u8e3s4.i2_1, dst, dstIndex, coerceAtLeast(startIndex - 4 | 0, 0), endIndex - 4 | 0);
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
        return Companion_getInstance_15().ea(msb, lsb);
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
        return Companion_getInstance_15().ea(msb, lsb);
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
                tmp = this.k();
            } else {
                tmp = false;
            }
            if (tmp) {
                tmp$ret$0 = false;
                break $l$block_0;
            }
            var _iterator__ex2g4s = this.g();
            while (_iterator__ex2g4s.h()) {
                var element_0 = _iterator__ex2g4s.i();
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
                tmp = elements.k();
            } else {
                tmp = false;
            }
            if (tmp) {
                tmp$ret$0 = true;
                break $l$block_0;
            }
            var _iterator__ex2g4s = elements.g();
            while (_iterator__ex2g4s.h()) {
                var element = _iterator__ex2g4s.i();
                if (!this.m1(element)) {
                    tmp$ret$0 = false;
                    break $l$block_0;
                }
            }
            tmp$ret$0 = true;
        }
        return tmp$ret$0;
    };
    protoOf(AbstractCollection).k = function() {
        return this.j() === 0;
    };
    protoOf(AbstractCollection).toString = function() {
        return joinToString_0(this, ', ', '[', ']', VOID, VOID, AbstractCollection$toString$lambda(this));
    };
    protoOf(AbstractCollection).toArray = function() {
        return collectionToArray(this);
    };
    function Companion_4() {
        this.v2_1 = 2147483639;
    }
    protoOf(Companion_4).c4 = function(index, size) {
        if (index < 0 || index >= size) {
            throw IndexOutOfBoundsException_init_$Create$_0('index: ' + index + ', size: ' + size);
        }
    };
    protoOf(Companion_4).k3 = function(index, size) {
        if (index < 0 || index > size) {
            throw IndexOutOfBoundsException_init_$Create$_0('index: ' + index + ', size: ' + size);
        }
    };
    protoOf(Companion_4).w2 = function(fromIndex, toIndex, size) {
        if (fromIndex < 0 || toIndex > size) {
            throw IndexOutOfBoundsException_init_$Create$_0('fromIndex: ' + fromIndex + ', toIndex: ' + toIndex + ', size: ' + size);
        }
        if (fromIndex > toIndex) {
            throw IllegalArgumentException_init_$Create$_0('fromIndex: ' + fromIndex + ' > toIndex: ' + toIndex);
        }
    };
    protoOf(Companion_4).v9 = function(startIndex, endIndex, size) {
        if (startIndex < 0 || endIndex > size) {
            throw IndexOutOfBoundsException_init_$Create$_0('startIndex: ' + startIndex + ', endIndex: ' + endIndex + ', size: ' + size);
        }
        if (startIndex > endIndex) {
            throw IllegalArgumentException_init_$Create$_0('startIndex: ' + startIndex + ' > endIndex: ' + endIndex);
        }
    };
    protoOf(Companion_4).y5 = function(oldCapacity, minCapacity) {
        var newCapacity = oldCapacity + (oldCapacity >> 1) | 0;
        if ((newCapacity - minCapacity | 0) < 0) newCapacity = minCapacity;
        if ((newCapacity - 2147483639 | 0) > 0) newCapacity = minCapacity > 2147483639 ? 2147483647 : 2147483639;
        return newCapacity;
    };
    protoOf(Companion_4).p3 = function(c) {
        var hashCode = 1;
        var _iterator__ex2g4s = c.g();
        while (_iterator__ex2g4s.h()) {
            var e = _iterator__ex2g4s.i();
            var tmp = imul(31, hashCode);
            var tmp1_elvis_lhs = e == null ? null : hashCode_0(e);
            hashCode = tmp + (tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs) | 0;
        }
        return hashCode;
    };
    protoOf(Companion_4).o3 = function(c, other) {
        if (!(c.j() === other.j())) return false;
        var otherIterator = other.g();
        var _iterator__ex2g4s = c.g();
        while (_iterator__ex2g4s.h()) {
            var elem = _iterator__ex2g4s.i();
            var elemOther = otherIterator.i();
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
    function AbstractMap$keys$1$iterator$1($entryIterator) {
        this.fa_1 = $entryIterator;
    }
    protoOf(AbstractMap$keys$1$iterator$1).h = function() {
        return this.fa_1.h();
    };
    protoOf(AbstractMap$keys$1$iterator$1).i = function() {
        return this.fa_1.i().p1();
    };
    function AbstractMap$values$1$iterator$1($entryIterator) {
        this.ga_1 = $entryIterator;
    }
    protoOf(AbstractMap$values$1$iterator$1).h = function() {
        return this.ga_1.h();
    };
    protoOf(AbstractMap$values$1$iterator$1).i = function() {
        return this.ga_1.i().q1();
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
            var _iterator__ex2g4s = tmp0.g();
            while (_iterator__ex2g4s.h()) {
                var element = _iterator__ex2g4s.i();
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
        this.ha_1 = this$0;
        AbstractSet.call(this);
    }
    protoOf(AbstractMap$keys$1).m4 = function(element) {
        return this.ha_1.r1(element);
    };
    protoOf(AbstractMap$keys$1).m1 = function(element) {
        if (!true) return false;
        return this.m4(element);
    };
    protoOf(AbstractMap$keys$1).g = function() {
        var entryIterator = this.ha_1.w1().g();
        return new AbstractMap$keys$1$iterator$1(entryIterator);
    };
    protoOf(AbstractMap$keys$1).j = function() {
        return this.ha_1.j();
    };
    function AbstractMap$toString$lambda(this$0) {
        return function(it) {
            return toString_3(this$0, it);
        };
    }
    function AbstractMap$values$1(this$0) {
        this.ia_1 = this$0;
        AbstractCollection.call(this);
    }
    protoOf(AbstractMap$values$1).s4 = function(element) {
        return this.ia_1.s1(element);
    };
    protoOf(AbstractMap$values$1).m1 = function(element) {
        if (!true) return false;
        return this.s4(element);
    };
    protoOf(AbstractMap$values$1).g = function() {
        var entryIterator = this.ia_1.w1().g();
        return new AbstractMap$values$1$iterator$1(entryIterator);
    };
    protoOf(AbstractMap$values$1).j = function() {
        return this.ia_1.j();
    };
    function AbstractMap() {
        this.w3_1 = null;
        this.x3_1 = null;
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
                tmp = tmp0.k();
            } else {
                tmp = false;
            }
            if (tmp) {
                tmp$ret$0 = false;
                break $l$block_0;
            }
            var _iterator__ex2g4s = tmp0.g();
            while (_iterator__ex2g4s.h()) {
                var element = _iterator__ex2g4s.i();
                if (equals(element.q1(), value)) {
                    tmp$ret$0 = true;
                    break $l$block_0;
                }
            }
            tmp$ret$0 = false;
        }
        return tmp$ret$0;
    };
    protoOf(AbstractMap).y3 = function(entry) {
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
        if (!(this.j() === other.j())) return false;
        var tmp0 = other.w1();
        var tmp$ret$0;
        $l$block_0: {
            var tmp;
            if (isInterface(tmp0, Collection)) {
                tmp = tmp0.k();
            } else {
                tmp = false;
            }
            if (tmp) {
                tmp$ret$0 = true;
                break $l$block_0;
            }
            var _iterator__ex2g4s = tmp0.g();
            while (_iterator__ex2g4s.h()) {
                var element = _iterator__ex2g4s.i();
                if (!this.y3(element)) {
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
    protoOf(AbstractMap).k = function() {
        return this.j() === 0;
    };
    protoOf(AbstractMap).j = function() {
        return this.w1().j();
    };
    protoOf(AbstractMap).u1 = function() {
        if (this.w3_1 == null) {
            var tmp = this;
            tmp.w3_1 = new AbstractMap$keys$1(this);
        }
        return ensureNotNull(this.w3_1);
    };
    protoOf(AbstractMap).toString = function() {
        var tmp = this.w1();
        return joinToString_0(tmp, ', ', '{', '}', VOID, VOID, AbstractMap$toString$lambda(this));
    };
    protoOf(AbstractMap).v1 = function() {
        if (this.x3_1 == null) {
            var tmp = this;
            tmp.x3_1 = new AbstractMap$values$1(this);
        }
        return ensureNotNull(this.x3_1);
    };
    function Companion_6() {}
    protoOf(Companion_6).a4 = function(c) {
        var hashCode = 0;
        var _iterator__ex2g4s = c.g();
        while (_iterator__ex2g4s.h()) {
            var element = _iterator__ex2g4s.i();
            var tmp = hashCode;
            var tmp1_elvis_lhs = element == null ? null : hashCode_0(element);
            hashCode = tmp + (tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs) | 0;
        }
        return hashCode;
    };
    protoOf(Companion_6).z3 = function(c, other) {
        if (!(c.j() === other.j())) return false;
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
        return Companion_instance_6.z3(this, other);
    };
    protoOf(AbstractSet).hashCode = function() {
        return Companion_instance_6.a4(this);
    };
    function get_lastIndex_3(_this__u8e3s4) {
        return _this__u8e3s4.j() - 1 | 0;
    }
    function throwIndexOverflow() {
        throw ArithmeticException_init_$Create$_0('Index overflow has happened.');
    }
    function collectionToArrayCommonImpl(collection) {
        if (collection.k()) {
            return [];
        }
        var size = collection.j();
        var destination = Array(size);
        var iterator = collection.g();
        var index = 0;
        while (iterator.h()) {
            var _unary__edvuaz = index;
            index = _unary__edvuaz + 1 | 0;
            destination[_unary__edvuaz] = iterator.i();
        }
        return destination;
    }
    function emptyList() {
        return EmptyList_getInstance();
    }
    function shuffled(_this__u8e3s4, random) {
        var this_0 = toMutableList_0(_this__u8e3s4);
        shuffle(this_0, random);
        return this_0;
    }
    function listOf_0(elements) {
        return elements.length > 0 ? asList(elements) : emptyList();
    }
    function listOfNotNull(element) {
        return !(element == null) ? listOf(element) : emptyList();
    }
    function EmptyList() {
        EmptyList_instance = this;
        this.ja_1 = new Long(-1478467534, -1720727600);
    }
    protoOf(EmptyList).equals = function(other) {
        var tmp;
        if (!(other == null) ? isInterface(other, KtList) : false) {
            tmp = other.k();
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
    protoOf(EmptyList).j = function() {
        return 0;
    };
    protoOf(EmptyList).k = function() {
        return true;
    };
    protoOf(EmptyList).ka = function(element) {
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
        return this.ka(tmp);
    };
    protoOf(EmptyList).m = function(index) {
        throw IndexOutOfBoundsException_init_$Create$_0("Empty list doesn't contain element at index " + index + '.');
    };
    protoOf(EmptyList).la = function(element) {
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
        return this.la(tmp);
    };
    protoOf(EmptyList).g = function() {
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
    protoOf(EmptyIterator).h = function() {
        return false;
    };
    protoOf(EmptyIterator).i = function() {
        throw NoSuchElementException_init_$Create$();
    };
    var EmptyIterator_instance;
    function EmptyIterator_getInstance() {
        return EmptyIterator_instance;
    }
    function optimizeReadOnlyList(_this__u8e3s4) {
        switch (_this__u8e3s4.j()) {
          case 0:
            return emptyList();

          case 1:
            return listOf(_this__u8e3s4.m(0));

          default:
            return _this__u8e3s4;
        }
    }
    function throwCountOverflow() {
        throw ArithmeticException_init_$Create$_0('Count overflow has happened.');
    }
    function IndexedValue(index, value) {
        this.ma_1 = index;
        this.na_1 = value;
    }
    protoOf(IndexedValue).oa = function() {
        return this.ma_1;
    };
    protoOf(IndexedValue).pa = function() {
        return this.na_1;
    };
    protoOf(IndexedValue).toString = function() {
        return 'IndexedValue(index=' + this.ma_1 + ', value=' + toString_0(this.na_1) + ')';
    };
    protoOf(IndexedValue).hashCode = function() {
        var result = this.ma_1;
        result = imul(result, 31) + (this.na_1 == null ? 0 : hashCode_0(this.na_1)) | 0;
        return result;
    };
    protoOf(IndexedValue).equals = function(other) {
        if (this === other) return true;
        if (!(other instanceof IndexedValue)) return false;
        if (!(this.ma_1 === other.ma_1)) return false;
        if (!equals(this.na_1, other.na_1)) return false;
        return true;
    };
    function flatten(_this__u8e3s4) {
        var result = ArrayList_init_$Create$();
        var _iterator__ex2g4s = _this__u8e3s4.g();
        while (_iterator__ex2g4s.h()) {
            var element = _iterator__ex2g4s.i();
            addAll(result, element);
        }
        return result;
    }
    function IndexingIterable(iteratorFactory) {
        this.qa_1 = iteratorFactory;
    }
    protoOf(IndexingIterable).g = function() {
        return new IndexingIterator(this.qa_1());
    };
    function collectionSizeOrDefault(_this__u8e3s4, default_0) {
        var tmp;
        if (isInterface(_this__u8e3s4, Collection)) {
            tmp = _this__u8e3s4.j();
        } else {
            tmp = default_0;
        }
        return tmp;
    }
    function IndexingIterator(iterator) {
        this.ra_1 = iterator;
        this.sa_1 = 0;
    }
    protoOf(IndexingIterator).h = function() {
        return this.ra_1.h();
    };
    protoOf(IndexingIterator).i = function() {
        var _unary__edvuaz = this.sa_1;
        this.sa_1 = _unary__edvuaz + 1 | 0;
        return new IndexedValue(checkIndexOverflow(_unary__edvuaz), this.ra_1.i());
    };
    function getOrImplicitDefault(_this__u8e3s4, key) {
        if (isInterface(_this__u8e3s4, MapWithDefault)) return _this__u8e3s4.ta(key);
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
            switch (_this__u8e3s4.j()) {
              case 0:
                tmp = emptyMap();
                break;

              case 1:
                var tmp_0;
                if (isInterface(_this__u8e3s4, KtList)) {
                    tmp_0 = _this__u8e3s4.m(0);
                } else {
                    tmp_0 = _this__u8e3s4.g().i();
                }
                tmp = mapOf(tmp_0);
                break;

              default:
                tmp = toMap_1(_this__u8e3s4, LinkedHashMap_init_$Create$_0(mapCapacity(_this__u8e3s4.j())));
                break;
            }
            return tmp;
        }
        return optimizeReadOnlyMap(toMap_1(_this__u8e3s4, LinkedHashMap_init_$Create$()));
    }
    function toMutableMap(_this__u8e3s4) {
        return LinkedHashMap_init_$Create$_1(_this__u8e3s4);
    }
    function plus_1(_this__u8e3s4, pairs) {
        var tmp;
        if (_this__u8e3s4.k()) {
            tmp = toMap(pairs);
        } else {
            var this_0 = LinkedHashMap_init_$Create$_1(_this__u8e3s4);
            putAll(this_0, pairs);
            tmp = this_0;
        }
        return tmp;
    }
    function plus_2(_this__u8e3s4, pair) {
        var tmp;
        if (_this__u8e3s4.k()) {
            tmp = mapOf(pair);
        } else {
            var this_0 = LinkedHashMap_init_$Create$_1(_this__u8e3s4);
            this_0.x1(pair.ua_1, pair.va_1);
            tmp = this_0;
        }
        return tmp;
    }
    function EmptyMap() {
        EmptyMap_instance = this;
        this.wa_1 = new Long(-888910638, 1920087921);
    }
    protoOf(EmptyMap).equals = function(other) {
        var tmp;
        if (!(other == null) ? isInterface(other, KtMap) : false) {
            tmp = other.k();
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
    protoOf(EmptyMap).j = function() {
        return 0;
    };
    protoOf(EmptyMap).k = function() {
        return true;
    };
    protoOf(EmptyMap).xa = function(key) {
        return false;
    };
    protoOf(EmptyMap).r1 = function(key) {
        if (!true) return false;
        return this.xa(key);
    };
    protoOf(EmptyMap).ya = function(key) {
        return null;
    };
    protoOf(EmptyMap).t1 = function(key) {
        if (!true) return null;
        return this.ya(key);
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
        switch (_this__u8e3s4.j()) {
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
        var _iterator__ex2g4s = pairs.g();
        while (_iterator__ex2g4s.h()) {
            var _destruct__k2r9zo = _iterator__ex2g4s.i();
            var key = _destruct__k2r9zo.oa();
            var value = _destruct__k2r9zo.pa();
            _this__u8e3s4.x1(key, value);
        }
    }
    function putAll_0(_this__u8e3s4, pairs) {
        var inductionVariable = 0;
        var last = pairs.length;
        while (inductionVariable < last) {
            var _destruct__k2r9zo = pairs[inductionVariable];
            inductionVariable = inductionVariable + 1 | 0;
            var key = _destruct__k2r9zo.oa();
            var value = _destruct__k2r9zo.pa();
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
    function removeAll_0(_this__u8e3s4, predicate) {
        return filterInPlace_0(_this__u8e3s4, predicate, true);
    }
    function filterInPlace(_this__u8e3s4, predicate, predicateResultToRemove) {
        if (!isInterface(_this__u8e3s4, RandomAccess)) {
            return filterInPlace_0(isInterface(_this__u8e3s4, MutableIterable) ? _this__u8e3s4 : THROW_CCE(), predicate, predicateResultToRemove);
        }
        var writeIndex = 0;
        var inductionVariable = 0;
        var last = get_lastIndex_3(_this__u8e3s4);
        if (inductionVariable <= last) $l$loop: do {
            var readIndex = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var element = _this__u8e3s4.m(readIndex);
            if (predicate(element) === predicateResultToRemove) continue $l$loop;
            if (!(writeIndex === readIndex)) {
                _this__u8e3s4.s(writeIndex, element);
            }
            writeIndex = writeIndex + 1 | 0;
        } while (!(readIndex === last));
        if (writeIndex < _this__u8e3s4.j()) {
            var inductionVariable_0 = get_lastIndex_3(_this__u8e3s4);
            var last_0 = writeIndex;
            if (last_0 <= inductionVariable_0) do {
                var removeIndex = inductionVariable_0;
                inductionVariable_0 = inductionVariable_0 + -1 | 0;
                _this__u8e3s4.f3(removeIndex);
            } while (!(removeIndex === last_0));
            return true;
        } else {
            return false;
        }
    }
    function filterInPlace_0(_this__u8e3s4, predicate, predicateResultToRemove) {
        var result = false;
        var $this$with = _this__u8e3s4.g();
        while ($this$with.h()) if (predicate($this$with.i()) === predicateResultToRemove) {
            $this$with.a3();
            result = true;
        }
        return result;
    }
    function removeLast(_this__u8e3s4) {
        var tmp;
        if (_this__u8e3s4.k()) {
            throw NoSuchElementException_init_$Create$_0('List is empty.');
        } else {
            tmp = _this__u8e3s4.f3(get_lastIndex_3(_this__u8e3s4));
        }
        return tmp;
    }
    function retainAll(_this__u8e3s4, predicate) {
        return filterInPlace_0(_this__u8e3s4, predicate, false);
    }
    function addAll(_this__u8e3s4, elements) {
        if (isInterface(elements, Collection)) return _this__u8e3s4.q(elements); else {
            var result = false;
            var _iterator__ex2g4s = elements.g();
            while (_iterator__ex2g4s.h()) {
                var item = _iterator__ex2g4s.i();
                if (_this__u8e3s4.f(item)) result = true;
            }
            return result;
        }
    }
    function IntIterator() {}
    protoOf(IntIterator).i = function() {
        return this.za();
    };
    function Sequence() {}
    function TransformingSequence$iterator$1(this$0) {
        this.bb_1 = this$0;
        this.ab_1 = this$0.cb_1.g();
    }
    protoOf(TransformingSequence$iterator$1).i = function() {
        return this.bb_1.db_1(this.ab_1.i());
    };
    protoOf(TransformingSequence$iterator$1).h = function() {
        return this.ab_1.h();
    };
    function TransformingSequence(sequence, transformer) {
        this.cb_1 = sequence;
        this.db_1 = transformer;
    }
    protoOf(TransformingSequence).g = function() {
        return new TransformingSequence$iterator$1(this);
    };
    function calcNext($this) {
        while ($this.eb_1.h()) {
            var item = $this.eb_1.i();
            if ($this.hb_1.kb_1(item) === $this.hb_1.jb_1) {
                $this.gb_1 = item;
                $this.fb_1 = 1;
                return Unit_instance;
            }
        }
        $this.fb_1 = 0;
    }
    function FilteringSequence$iterator$1(this$0) {
        this.hb_1 = this$0;
        this.eb_1 = this$0.ib_1.g();
        this.fb_1 = -1;
        this.gb_1 = null;
    }
    protoOf(FilteringSequence$iterator$1).i = function() {
        if (this.fb_1 === -1) {
            calcNext(this);
        }
        if (this.fb_1 === 0) throw NoSuchElementException_init_$Create$();
        var result = this.gb_1;
        this.gb_1 = null;
        this.fb_1 = -1;
        return result;
    };
    protoOf(FilteringSequence$iterator$1).h = function() {
        if (this.fb_1 === -1) {
            calcNext(this);
        }
        return this.fb_1 === 1;
    };
    function FilteringSequence(sequence, sendWhen, predicate) {
        sendWhen = sendWhen === VOID ? true : sendWhen;
        this.ib_1 = sequence;
        this.jb_1 = sendWhen;
        this.kb_1 = predicate;
    }
    protoOf(FilteringSequence).g = function() {
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
        this.lb_1 = new Long(1993859828, 793161749);
    }
    protoOf(EmptySet).equals = function(other) {
        var tmp;
        if (!(other == null) ? isInterface(other, KtSet) : false) {
            tmp = other.k();
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
    protoOf(EmptySet).j = function() {
        return 0;
    };
    protoOf(EmptySet).k = function() {
        return true;
    };
    protoOf(EmptySet).ka = function(element) {
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
        return this.ka(tmp);
    };
    protoOf(EmptySet).mb = function(elements) {
        return elements.k();
    };
    protoOf(EmptySet).n1 = function(elements) {
        return this.mb(elements);
    };
    protoOf(EmptySet).g = function() {
        return EmptyIterator_instance;
    };
    var EmptySet_instance;
    function EmptySet_getInstance() {
        if (EmptySet_instance == null) new EmptySet;
        return EmptySet_instance;
    }
    function optimizeReadOnlySet(_this__u8e3s4) {
        switch (_this__u8e3s4.j()) {
          case 0:
            return emptySet();

          case 1:
            return setOf(_this__u8e3s4.g().i());

          default:
            return _this__u8e3s4;
        }
    }
    function hashSetOf(elements) {
        return toCollection(elements, HashSet_init_$Create$_0(mapCapacity(elements.length)));
    }
    function compareValues(a, b) {
        if (a == null) return b == null ? 0 : -1;
        if (b == null) return 1;
        return compareTo((!(a == null) ? isComparable(a) : false) ? a : THROW_CCE(), b);
    }
    function naturalOrder() {
        var tmp = NaturalOrderComparator_instance;
        return isInterface(tmp, Comparator) ? tmp : THROW_CCE();
    }
    function NaturalOrderComparator() {}
    protoOf(NaturalOrderComparator).nb = function(a, b) {
        return compareTo(a, b);
    };
    protoOf(NaturalOrderComparator).compare = function(a, b) {
        var tmp = (!(a == null) ? isComparable(a) : false) ? a : THROW_CCE();
        return this.nb(tmp, (!(b == null) ? isComparable(b) : false) ? b : THROW_CCE());
    };
    var NaturalOrderComparator_instance;
    function NaturalOrderComparator_getInstance() {
        return NaturalOrderComparator_instance;
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
        this.ob_1 = new Long(0, 0);
    }
    protoOf(EmptyCoroutineContext).x7 = function(key) {
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
        this.pb_1 = defaultPlatformRandom();
    }
    protoOf(Default).qb = function(bitCount) {
        return this.pb_1.qb(bitCount);
    };
    protoOf(Default).za = function() {
        return this.pb_1.za();
    };
    protoOf(Default).l = function(until) {
        return this.pb_1.l(until);
    };
    protoOf(Default).rb = function(from, until) {
        return this.pb_1.rb(from, until);
    };
    protoOf(Default).sb = function() {
        return this.pb_1.sb();
    };
    protoOf(Default).tb = function(from, until) {
        return this.pb_1.tb(from, until);
    };
    var Default_instance;
    function Default_getInstance() {
        if (Default_instance == null) new Default;
        return Default_instance;
    }
    function Random() {
        Default_getInstance();
    }
    protoOf(Random).za = function() {
        return this.qb(32);
    };
    protoOf(Random).l = function(until) {
        return this.rb(0, until);
    };
    protoOf(Random).rb = function(from, until) {
        checkRangeBounds(from, until);
        var n = until - from | 0;
        if (n > 0 || n === -2147483648) {
            var tmp;
            if ((n & (-n | 0)) === n) {
                var bitCount = fastLog2(n);
                tmp = this.qb(bitCount);
            } else {
                var v;
                do {
                    var bits = this.za() >>> 1 | 0;
                    v = bits % n | 0;
                } while (((bits - v | 0) + (n - 1 | 0) | 0) < 0);
                tmp = v;
            }
            var rnd = tmp;
            return from + rnd | 0;
        } else {
            while (true) {
                var rnd_0 = this.za();
                if (from <= rnd_0 ? rnd_0 < until : false) return rnd_0;
            }
        }
    };
    protoOf(Random).sb = function() {
        return doubleFromParts(this.qb(26), this.qb(27));
    };
    protoOf(Random).tb = function(from, until) {
        checkRangeBounds_0(from, until);
        var size = until - from;
        var tmp;
        if (isInfinite(size) && isFinite(from) && isFinite(until)) {
            var r1 = this.sb() * (until / 2 - from / 2);
            tmp = from + r1 + r1;
        } else {
            tmp = from + this.sb() * size;
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
        if (!!(($this.ub_1 | $this.vb_1 | $this.wb_1 | $this.xb_1 | $this.yb_1) === 0)) {
            var message = 'Initial state must have at least one non-zero element.';
            throw IllegalArgumentException_init_$Create$_0(toString_1(message));
        }
    }
    function Companion_7() {
        Companion_instance_7 = this;
        this.ac_1 = new Long(0, 0);
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
        this.ub_1 = x;
        this.vb_1 = y;
        this.wb_1 = z;
        this.xb_1 = w;
        this.yb_1 = v;
        this.zb_1 = addend;
        checkInvariants(this);
        var inductionVariable = 0;
        if (inductionVariable < 64) do {
            var index = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            this.za();
        } while (inductionVariable < 64);
    }
    protoOf(XorWowRandom).za = function() {
        var t = this.ub_1;
        t = t ^ (t >>> 2 | 0);
        this.ub_1 = this.vb_1;
        this.vb_1 = this.wb_1;
        this.wb_1 = this.xb_1;
        var v0 = this.yb_1;
        this.xb_1 = v0;
        t = t ^ t << 1 ^ v0 ^ v0 << 4;
        this.yb_1 = t;
        this.zb_1 = this.zb_1 + 362437 | 0;
        return t + this.zb_1 | 0;
    };
    protoOf(XorWowRandom).qb = function(bitCount) {
        return takeUpperBits(this.za(), bitCount);
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
    protoOf(IntRange).ec = function() {
        return this.w_1;
    };
    protoOf(IntRange).fc = function() {
        return this.x_1;
    };
    protoOf(IntRange).gc = function(value) {
        return this.w_1 <= value && value <= this.x_1;
    };
    protoOf(IntRange).z = function(value) {
        return this.gc(typeof value === 'number' ? value : THROW_CCE());
    };
    protoOf(IntRange).k = function() {
        return this.w_1 > this.x_1;
    };
    protoOf(IntRange).equals = function(other) {
        var tmp;
        if (other instanceof IntRange) {
            tmp = this.k() && other.k() || this.w_1 === other.w_1 && this.x_1 === other.x_1;
        } else {
            tmp = false;
        }
        return tmp;
    };
    protoOf(IntRange).hashCode = function() {
        return this.k() ? -1 : imul(31, this.w_1) + this.x_1 | 0;
    };
    protoOf(IntRange).toString = function() {
        return '' + this.w_1 + '..' + this.x_1;
    };
    function IntProgressionIterator(first, last, step) {
        IntIterator.call(this);
        this.hc_1 = step;
        this.ic_1 = last;
        this.jc_1 = this.hc_1 > 0 ? first <= last : first >= last;
        this.kc_1 = this.jc_1 ? first : this.ic_1;
    }
    protoOf(IntProgressionIterator).h = function() {
        return this.jc_1;
    };
    protoOf(IntProgressionIterator).za = function() {
        var value = this.kc_1;
        if (value === this.ic_1) {
            if (!this.jc_1) throw NoSuchElementException_init_$Create$();
            this.jc_1 = false;
        } else {
            this.kc_1 = this.kc_1 + this.hc_1 | 0;
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
    protoOf(IntProgression).g = function() {
        return new IntProgressionIterator(this.w_1, this.x_1, this.y_1);
    };
    protoOf(IntProgression).k = function() {
        return this.y_1 > 0 ? this.w_1 > this.x_1 : this.w_1 < this.x_1;
    };
    protoOf(IntProgression).equals = function(other) {
        var tmp;
        if (other instanceof IntProgression) {
            tmp = this.k() && other.k() || this.w_1 === other.w_1 && this.x_1 === other.x_1 && this.y_1 === other.y_1;
        } else {
            tmp = false;
        }
        return tmp;
    };
    protoOf(IntProgression).hashCode = function() {
        return this.k() ? -1 : imul(31, imul(31, this.w_1) + this.x_1 | 0) + this.y_1 | 0;
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
                if (element instanceof Char) _this__u8e3s4.a7(element.a1_1); else {
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
        var _iterator__ex2g4s = lines_0.g();
        while (_iterator__ex2g4s.h()) {
            var element = _iterator__ex2g4s.i();
            if (!isBlank(element)) {
                destination.f(element);
            }
        }
        var destination_0 = ArrayList_init_$Create$_0(collectionSizeOrDefault(destination, 10));
        var _iterator__ex2g4s_0 = destination.g();
        while (_iterator__ex2g4s_0.h()) {
            var item = _iterator__ex2g4s_0.i();
            var tmp$ret$6 = indentWidth(item);
            destination_0.f(tmp$ret$6);
        }
        var tmp0_elvis_lhs = minOrNull(destination_0);
        var minCommonIndent = tmp0_elvis_lhs == null ? 0 : tmp0_elvis_lhs;
        var tmp2 = _this__u8e3s4.length + imul(newIndent.length, lines_0.j()) | 0;
        var indentAddFunction = getIndentFunction(newIndent);
        var lastIndex = get_lastIndex_3(lines_0);
        var destination_1 = ArrayList_init_$Create$();
        var index = 0;
        var _iterator__ex2g4s_1 = lines_0.g();
        while (_iterator__ex2g4s_1.h()) {
            var item_0 = _iterator__ex2g4s_1.i();
            var _unary__edvuaz = index;
            index = _unary__edvuaz + 1 | 0;
            var index_0 = checkIndexOverflow(_unary__edvuaz);
            var tmp;
            if ((index_0 === 0 || index_0 === lastIndex) && isBlank(item_0)) {
                tmp = null;
            } else {
                var tmp0_safe_receiver = drop(item_0, minCommonIndent);
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
                destination_1.f(tmp0_safe_receiver_0);
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
    function get_lastIndex_4(_this__u8e3s4) {
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
            sb.a7(padChar);
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
    function indexOf_4(_this__u8e3s4, char, startIndex, ignoreCase) {
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
    function contains_5(_this__u8e3s4, other, ignoreCase) {
        ignoreCase = ignoreCase === VOID ? false : ignoreCase;
        var tmp;
        if (typeof other === 'string') {
            tmp = indexOf_5(_this__u8e3s4, other, VOID, ignoreCase) >= 0;
        } else {
            tmp = indexOf_6(_this__u8e3s4, other, 0, charSequenceLength(_this__u8e3s4), ignoreCase) >= 0;
        }
        return tmp;
    }
    function lastIndexOf(_this__u8e3s4, string, startIndex, ignoreCase) {
        startIndex = startIndex === VOID ? get_lastIndex_4(_this__u8e3s4) : startIndex;
        ignoreCase = ignoreCase === VOID ? false : ignoreCase;
        var tmp;
        var tmp_0;
        if (ignoreCase) {
            tmp_0 = true;
        } else {
            tmp_0 = !(typeof _this__u8e3s4 === 'string');
        }
        if (tmp_0) {
            tmp = indexOf_6(_this__u8e3s4, string, startIndex, 0, ignoreCase, true);
        } else {
            tmp = _this__u8e3s4.lastIndexOf(string, startIndex);
        }
        return tmp;
    }
    function indexOf_5(_this__u8e3s4, string, startIndex, ignoreCase) {
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
            tmp = indexOf_6(_this__u8e3s4, string, startIndex, charSequenceLength(_this__u8e3s4), ignoreCase);
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
        var last = get_lastIndex_4(_this__u8e3s4);
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
    function indexOf_6(_this__u8e3s4, other, startIndex, endIndex, ignoreCase, last) {
        last = last === VOID ? false : last;
        var indices = !last ? numberRangeToNumber(coerceAtLeast(startIndex, 0), coerceAtMost(endIndex, charSequenceLength(_this__u8e3s4))) : downTo(coerceAtMost(startIndex, get_lastIndex_4(_this__u8e3s4)), coerceAtLeast(endIndex, 0));
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
        return toList_1(lineSequence(_this__u8e3s4));
    }
    function lineSequence(_this__u8e3s4) {
        return new lineSequence$$inlined$Sequence$1(_this__u8e3s4);
    }
    function State() {
        this.lc_1 = 0;
        this.mc_1 = 1;
        this.nc_1 = 2;
    }
    var State_instance;
    function State_getInstance() {
        return State_instance;
    }
    function LinesIterator(string) {
        this.oc_1 = string;
        this.pc_1 = 0;
        this.qc_1 = 0;
        this.rc_1 = 0;
        this.sc_1 = 0;
    }
    protoOf(LinesIterator).h = function() {
        if (!(this.pc_1 === 0)) {
            return this.pc_1 === 1;
        }
        if (this.sc_1 < 0) {
            this.pc_1 = 2;
            return false;
        }
        var _delimiterLength = -1;
        var _delimiterStartIndex = charSequenceLength(this.oc_1);
        var inductionVariable = this.qc_1;
        var last = charSequenceLength(this.oc_1);
        if (inductionVariable < last) $l$loop: do {
            var idx = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var c = charSequenceGet(this.oc_1, idx);
            if (c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13)) {
                _delimiterLength = c === _Char___init__impl__6a9atx(13) && (idx + 1 | 0) < charSequenceLength(this.oc_1) && charSequenceGet(this.oc_1, idx + 1 | 0) === _Char___init__impl__6a9atx(10) ? 2 : 1;
                _delimiterStartIndex = idx;
                break $l$loop;
            }
        } while (inductionVariable < last);
        this.pc_1 = 1;
        this.sc_1 = _delimiterLength;
        this.rc_1 = _delimiterStartIndex;
        return true;
    };
    protoOf(LinesIterator).i = function() {
        if (!this.h()) {
            throw NoSuchElementException_init_$Create$();
        }
        this.pc_1 = 0;
        var lastIndex = this.rc_1;
        var firstIndex = this.qc_1;
        this.qc_1 = this.rc_1 + this.sc_1 | 0;
        var this_0 = this.oc_1;
        return toString_1(charSequenceSubSequence(this_0, firstIndex, lastIndex));
    };
    function lineSequence$$inlined$Sequence$1($this_lineSequence) {
        this.tc_1 = $this_lineSequence;
    }
    protoOf(lineSequence$$inlined$Sequence$1).g = function() {
        return new LinesIterator(this.tc_1);
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
        this.uc_1 = _Duration___init__impl__kdtzql(new Long(0, 0));
        this.vc_1 = durationOfMillis(new Long(-1, 1073741823));
        this.wc_1 = durationOfMillis(new Long(1, -1073741824));
        this.xc_1 = new Long(-16162, 2147483647);
        this.yc_1 = _Duration___init__impl__kdtzql(new Long(-16162, 2147483647));
    }
    protoOf(Companion_10).zc = function(rawValue) {
        var this_0 = new Duration(_Duration___init__impl__kdtzql(rawValue));
        var $this$apply = this_0.ad_1;
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
        return this_0.ad_1;
    };
    protoOf(Companion_10).bd = function(value) {
        var tmp;
        try {
            var this_0 = new Duration(parseDuration(value, true));
            var $this$apply = this_0.ad_1;
            if (!!equals(new Duration($this$apply), new Duration(Companion_getInstance_10().yc_1))) {
                var message = 'invariant failed';
                throw IllegalStateException_init_$Create$_0(toString_1(message));
            }
            tmp = this_0.ad_1;
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
        return equalsLong(_get_rawValue__5zfu4e($this), _get_rawValue__5zfu4e(Companion_getInstance_10().vc_1)) || equalsLong(_get_rawValue__5zfu4e($this), _get_rawValue__5zfu4e(Companion_getInstance_10().wc_1));
    }
    function _Duration___get_absoluteValue__impl__vr7i6w($this) {
        return Duration__isNegative_impl_pbysfa($this) ? Duration__unaryMinus_impl_x2k1y0($this) : $this;
    }
    function Duration__compareTo_impl_pchp0f($this, other) {
        var compareBits = bitwiseXor(_get_rawValue__5zfu4e($this), _get_rawValue__5zfu4e(other));
        if (compare(compareBits, new Long(0, 0)) < 0 || (convertToInt(compareBits) & 1) === 0) return _get_rawValue__5zfu4e($this).k2(_get_rawValue__5zfu4e(other));
        var tmp = convertToInt(_get_rawValue__5zfu4e($this)) & 1;
        var r = tmp - (convertToInt(_get_rawValue__5zfu4e(other)) & 1) | 0;
        return Duration__isNegative_impl_pbysfa($this) ? -r | 0 : r;
    }
    function Duration__compareTo_impl_pchp0f_0($this, other) {
        return Duration__compareTo_impl_pchp0f($this.ad_1, other instanceof Duration ? other.ad_1 : THROW_CCE());
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
        return equalsLong(tmp0_subject, _get_rawValue__5zfu4e(Companion_getInstance_10().vc_1)) ? new Long(-1, 2147483647) : equalsLong(tmp0_subject, _get_rawValue__5zfu4e(Companion_getInstance_10().wc_1)) ? new Long(0, -2147483648) : convertDurationUnit(_get_value__a43j40_0($this), _get_storageUnit__szjgha($this), unit);
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
        } else if (equalsLong(tmp0_subject, _get_rawValue__5zfu4e(Companion_getInstance_10().vc_1))) {
            tmp = 'Infinity';
        } else if (equalsLong(tmp0_subject, _get_rawValue__5zfu4e(Companion_getInstance_10().wc_1))) {
            tmp = '-Infinity';
        } else {
            var isNegative = Duration__isNegative_impl_pbysfa($this);
            var this_0 = StringBuilder_init_$Create$_0();
            if (isNegative) {
                this_0.a7(_Char___init__impl__6a9atx(45));
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
                this_0.r9(tmp0).a7(_Char___init__impl__6a9atx(100));
                components = components + 1 | 0;
            }
            if (hasHours || hasDays && (hasMinutes || hasSeconds)) {
                var _unary__edvuaz = components;
                components = _unary__edvuaz + 1 | 0;
                if (_unary__edvuaz > 0) {
                    this_0.a7(_Char___init__impl__6a9atx(32));
                }
                this_0.q9(tmp2).a7(_Char___init__impl__6a9atx(104));
            }
            if (hasMinutes || hasSeconds && (hasHours || hasDays)) {
                var _unary__edvuaz_0 = components;
                components = _unary__edvuaz_0 + 1 | 0;
                if (_unary__edvuaz_0 > 0) {
                    this_0.a7(_Char___init__impl__6a9atx(32));
                }
                this_0.q9(tmp4).a7(_Char___init__impl__6a9atx(109));
            }
            if (hasSeconds) {
                var _unary__edvuaz_1 = components;
                components = _unary__edvuaz_1 + 1 | 0;
                if (_unary__edvuaz_1 > 0) {
                    this_0.a7(_Char___init__impl__6a9atx(32));
                }
                if (!(tmp6 === 0) || hasDays || hasHours || hasMinutes) {
                    appendFractional($this, this_0, tmp6, nanoseconds, 9, 's', false);
                } else if (nanoseconds >= 1e6) {
                    appendFractional($this, this_0, nanoseconds / 1e6 | 0, nanoseconds % 1e6 | 0, 6, 'ms', false);
                } else if (nanoseconds >= 1e3) {
                    appendFractional($this, this_0, nanoseconds / 1e3 | 0, nanoseconds % 1e3 | 0, 3, 'us', false);
                } else this_0.q9(nanoseconds).z6('ns');
            }
            if (isNegative && components > 1) {
                this_0.s9(1, _Char___init__impl__6a9atx(40)).a7(_Char___init__impl__6a9atx(41));
            }
            tmp = this_0.toString();
        }
        return tmp;
    }
    function appendFractional($this, $receiver, whole, fractional, fractionalSize, unit, isoZeroes) {
        $receiver.q9(whole);
        if (!(fractional === 0)) {
            $receiver.a7(_Char___init__impl__6a9atx(46));
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
                $receiver.p9(fracString, 0, nonZeroDigits);
            } else {
                var endIndex = imul((nonZeroDigits + 2 | 0) / 3 | 0, 3);
                $receiver.p9(fracString, 0, endIndex);
            }
        }
        $receiver.z6(unit);
    }
    function Duration__hashCode_impl_u4exz6($this) {
        return $this.hashCode();
    }
    function Duration__equals_impl_ygj6w6($this, other) {
        if (!(other instanceof Duration)) return false;
        var tmp0_other_with_cast = other.ad_1;
        if (!equalsLong($this, tmp0_other_with_cast)) return false;
        return true;
    }
    function Duration(rawValue) {
        Companion_getInstance_10();
        this.ad_1 = rawValue;
    }
    protoOf(Duration).cd = function(other) {
        return Duration__compareTo_impl_pchp0f(this.ad_1, other);
    };
    protoOf(Duration).d = function(other) {
        return Duration__compareTo_impl_pchp0f_0(this, other);
    };
    protoOf(Duration).toString = function() {
        return Duration__toString_impl_8d916b(this.ad_1);
    };
    protoOf(Duration).hashCode = function() {
        return Duration__hashCode_impl_u4exz6(this.ad_1);
    };
    protoOf(Duration).equals = function(other) {
        return Duration__equals_impl_ygj6w6(this.ad_1, other);
    };
    function durationOfMillis(normalMillis) {
        var tmp = Companion_getInstance_10();
        var this_0 = shiftLeft(normalMillis, 1);
        var tmp$ret$0 = add(this_0, fromInt(1));
        return tmp.zc(tmp$ret$0);
    }
    function toDuration(_this__u8e3s4, unit) {
        var maxNsInUnit = convertDurationUnitOverflow(new Long(-387905, 1073741823), DurationUnit_NANOSECONDS_getInstance(), unit);
        var tmp;
        if (compare(negate(maxNsInUnit), _this__u8e3s4) <= 0 ? compare(_this__u8e3s4, maxNsInUnit) <= 0 : false) {
            tmp = durationOfNanos(convertDurationUnitOverflow(_this__u8e3s4, unit, DurationUnit_NANOSECONDS_getInstance()));
        } else if (unit.d2(DurationUnit_MILLISECONDS_getInstance()) >= 0) {
            var tmp_0 = get_sign(_this__u8e3s4);
            var this_0 = new Long(0, -2147483648);
            var tmp$ret$0 = add(this_0, fromInt(1));
            tmp = durationOfMillis(multiply(numberToLong(tmp_0), convertDurationUnitToMilliseconds(abs_1(coerceAtLeast_0(_this__u8e3s4, tmp$ret$0)), unit)));
        } else {
            tmp = durationOfMillis(coerceIn_1(convertDurationUnit(_this__u8e3s4, unit, DurationUnit_MILLISECONDS_getInstance()), new Long(1, -1073741824), new Long(-1, 1073741823)));
        }
        return tmp;
    }
    function parseDuration(value, strictIso, throwException) {
        throwException = throwException === VOID ? true : throwException;
        if (charSequenceLength(value) === 0) {
            var message = 'The string is empty';
            if (throwException) throw IllegalArgumentException_init_$Create$_0(message);
            return Companion_getInstance_10().yc_1;
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
            return Companion_getInstance_10().yc_1;
        } else {
            if (charCodeAt(value, index) === _Char___init__impl__6a9atx(80)) {
                tmp = parseIsoStringFormat(value, index + 1 | 0, throwException);
            } else {
                if (strictIso) {
                    if (throwException) throw IllegalArgumentException_init_$Create$_0('');
                    return Companion_getInstance_10().yc_1;
                } else {
                    var tmp_0 = index;
                    var a = value.length - index | 0;
                    var tmp$ret$4 = Math.max(a, 8);
                    if (regionMatches(value, tmp_0, 'Infinity', 0, tmp$ret$4, true)) {
                        tmp = Companion_getInstance_10().vc_1;
                    } else {
                        tmp = parseDefaultStringFormat(value, index, hasSign, throwException);
                    }
                }
            }
        }
        var result = tmp;
        return isNegative && !equals(new Duration(result), new Duration(Companion_getInstance_10().yc_1)) ? Duration__unaryMinus_impl_x2k1y0(result) : result;
    }
    function durationOf(normalValue, unitDiscriminator) {
        var tmp = Companion_getInstance_10();
        var this_0 = shiftLeft(normalValue, 1);
        var tmp$ret$0 = add(this_0, fromInt(unitDiscriminator));
        return tmp.zc(tmp$ret$0);
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
                tmp = coerceIn_1(add(_this__u8e3s4, other), new Long(1, -1073741824), new Long(-1, 1073741823));
            }
        }
        return tmp;
    }
    function durationOfMillisNormalized(millis) {
        var tmp;
        if (compare(new Long(1108857478, -1074), millis) <= 0 ? compare(millis, new Long(-1108857478, 1073)) <= 0 : false) {
            tmp = durationOfNanos(millisToNanos(millis));
        } else {
            tmp = durationOfMillis(coerceIn_1(millis, new Long(1, -1073741824), new Long(-1, 1073741823)));
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
        return Companion_getInstance_10().zc(shiftLeft(normalNanos, 1));
    }
    function parseIsoStringFormat(value, startIndex, throwException) {
        var index = startIndex;
        if (index === value.length) {
            if (throwException) throw IllegalArgumentException_init_$Create$_0('');
            return Companion_getInstance_10().yc_1;
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
                    return Companion_getInstance_10().yc_1;
                }
                isTimeComponent = true;
                continue $l$loop;
            }
            var longStartIndex = index;
            var sign;
            var tmp0 = Companion_getInstance_11().dd_1;
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
                            return Companion_getInstance_10().yc_1;
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
                    return Companion_getInstance_10().yc_1;
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
                    return Companion_getInstance_10().yc_1;
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
                return Companion_getInstance_10().yc_1;
            } else {
                tmp_3 = tmp0_elvis_lhs;
            }
            var unit = tmp_3;
            if (!(prevUnit == null) && prevUnit.d2(unit) <= 0) {
                var message_0 = 'Unexpected order of duration components';
                if (throwException) throw IllegalArgumentException_init_$Create$_0(message_0);
                return Companion_getInstance_10().yc_1;
            }
            prevUnit = unit;
            if (unit.equals(DurationUnit_DAYS_getInstance())) {
                if (isTimeComponent) {
                    if (throwException) throw IllegalArgumentException_init_$Create$_0('');
                    return Companion_getInstance_10().yc_1;
                }
                totalMillis = multiply(numberToLong(sign), convertDurationUnitToMilliseconds(longValue, unit));
            } else {
                if (!isTimeComponent) {
                    if (throwException) throw IllegalArgumentException_init_$Create$_0('');
                    return Companion_getInstance_10().yc_1;
                }
                var this_7 = addMillisWithoutOverflow(totalMillis, multiply(numberToLong(sign), convertDurationUnitToMilliseconds(longValue, unit)));
                if (equalsLong(this_7, new Long(-16162, 2147483647))) {
                    if (throwException) throw IllegalArgumentException_init_$Create$_0('');
                    return Companion_getInstance_10().yc_1;
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
                return Companion_getInstance_10().yc_1;
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
            var tmp0 = Companion_getInstance_11().ed_1;
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
                            return Companion_getInstance_10().yc_1;
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
                    return Companion_getInstance_10().yc_1;
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
                    return Companion_getInstance_10().yc_1;
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
                return Companion_getInstance_10().yc_1;
            } else {
                tmp_3 = tmp0_elvis_lhs;
            }
            var unit = tmp_3;
            if (!(prevUnit == null) && prevUnit.d2(unit) <= 0) {
                var message_1 = 'Unexpected order of duration components';
                if (throwException) throw IllegalArgumentException_init_$Create$_0(message_1);
                return Companion_getInstance_10().yc_1;
            }
            prevUnit = unit;
            switch (unit.c2_1) {
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
                    return Companion_getInstance_10().yc_1;
                }
                totalNanos = add(totalNanos, unit.d2(DurationUnit_MINUTES_getInstance()) >= 0 && (index - fractionStartIndex | 0) > 15 ? parseFractionFallback(value, fractionStartIndex, index - get_shortNameLength(unit) | 0, unit) : fractionDigitsToNanos(fractionValue, unit));
            }
        }
        return Duration__plus_impl_yu9v8f(toDuration(totalMillis, DurationUnit_MILLISECONDS_getInstance()), toDuration(totalNanos, DurationUnit_NANOSECONDS_getInstance()));
    }
    function Companion_11() {
        Companion_instance_11 = this;
        this.dd_1 = new LongParser(new Long(-1, 1073741823), true);
        this.ed_1 = new LongParser(new Long(-1, 2147483647), false);
    }
    var Companion_instance_11;
    function Companion_getInstance_11() {
        if (Companion_instance_11 == null) new Companion_11;
        return Companion_instance_11;
    }
    function access$_get_overflowLimit__t4uhig($this) {
        return $this.fd_1;
    }
    function access$_get_allowSign__e988q3($this) {
        return $this.gd_1;
    }
    function access$_get_overflowThreshold__7yqffs($this) {
        return $this.hd_1;
    }
    function access$_get_lastDigitMax__85wg2($this) {
        return $this.id_1;
    }
    function LongParser(overflowLimit, allowSign) {
        Companion_getInstance_11();
        this.fd_1 = overflowLimit;
        this.gd_1 = allowSign;
        var tmp = this;
        var this_0 = this.fd_1;
        tmp.hd_1 = divide(this_0, fromInt(10));
        var tmp_0 = this;
        var this_1 = this.fd_1;
        tmp_0.id_1 = modulo(this_1, fromInt(10));
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
        var second = start < get_lastIndex_4(_this__u8e3s4) ? charCodeAt(_this__u8e3s4, start + 1 | 0) : _Char___init__impl__6a9atx(0);
        return first === _Char___init__impl__6a9atx(100) ? DurationUnit_DAYS_getInstance() : first === _Char___init__impl__6a9atx(104) ? DurationUnit_HOURS_getInstance() : first === _Char___init__impl__6a9atx(115) ? DurationUnit_SECONDS_getInstance() : first === _Char___init__impl__6a9atx(109) ? second === _Char___init__impl__6a9atx(115) ? DurationUnit_MILLISECONDS_getInstance() : DurationUnit_MINUTES_getInstance() : first === _Char___init__impl__6a9atx(117) ? second === _Char___init__impl__6a9atx(115) ? DurationUnit_MICROSECONDS_getInstance() : null : first === _Char___init__impl__6a9atx(110) ? second === _Char___init__impl__6a9atx(115) ? DurationUnit_NANOSECONDS_getInstance() : null : null;
    }
    function get_shortNameLength(_this__u8e3s4) {
        switch (_this__u8e3s4.c2_1) {
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
        switch (_this__u8e3s4.c2_1) {
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
        switch (_this__u8e3s4.c2_1) {
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
        switch (_this__u8e3s4.c2_1) {
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
        this.jd_1 = new Instant(new Long(342103040, -7347440), 0);
        this.kd_1 = new Instant(new Long(-90867457, 7347410), 999999999);
    }
    protoOf(Companion_12).ld = function(epochSeconds, nanosecondAdjustment) {
        var other = new Long(1e9, 0);
        var q = divide(nanosecondAdjustment, other);
        if (compare(bitwiseXor(nanosecondAdjustment, other), new Long(0, 0)) < 0 && !equalsLong(multiply(q, other), nanosecondAdjustment)) {
            var _unary__edvuaz = q;
            q = subtract(_unary__edvuaz, get_ONE());
        }
        var b = q;
        var sum = add(epochSeconds, b);
        if (compare(bitwiseXor(epochSeconds, sum), new Long(0, 0)) < 0 && compare(bitwiseXor(epochSeconds, b), new Long(0, 0)) >= 0) {
            return compare(epochSeconds, new Long(0, 0)) > 0 ? Companion_getInstance_12().kd_1 : Companion_getInstance_12().jd_1;
        }
        var seconds = sum;
        var tmp;
        if (compare(seconds, new Long(342103040, -7347440)) < 0) {
            tmp = this.jd_1;
        } else if (compare(seconds, new Long(-90867457, 7347410)) > 0) {
            tmp = this.kd_1;
        } else {
            var other_0 = new Long(1e9, 0);
            var r = modulo(nanosecondAdjustment, other_0);
            var tmp$ret$3 = add(r, bitwiseAnd(other_0, shiftRight(bitwiseAnd(bitwiseXor(r, other_0), bitwiseOr(r, negate(r))), 63)));
            var nanoseconds = convertToInt(tmp$ret$3);
            tmp = new Instant(seconds, nanoseconds);
        }
        return tmp;
    };
    protoOf(Companion_12).md = function(epochSeconds, nanosecondAdjustment) {
        return this.ld(epochSeconds, fromInt(nanosecondAdjustment));
    };
    protoOf(Companion_12).nd = function(input) {
        return parseIso(input).od();
    };
    var Companion_instance_12;
    function Companion_getInstance_12() {
        if (Companion_instance_12 == null) new Companion_12;
        return Companion_instance_12;
    }
    function Instant(epochSeconds, nanosecondsOfSecond) {
        Companion_getInstance_12();
        this.pd_1 = epochSeconds;
        this.qd_1 = nanosecondsOfSecond;
        var containsArg = this.pd_1;
        if (!(compare(new Long(342103040, -7347440), containsArg) <= 0 ? compare(containsArg, new Long(-90867457, 7347410)) <= 0 : false)) {
            var message = 'Instant exceeds minimum or maximum instant';
            throw IllegalArgumentException_init_$Create$_0(toString_1(message));
        }
    }
    protoOf(Instant).rd = function(other) {
        var s = this.pd_1.k2(other.pd_1);
        if (!(s === 0)) {
            return s;
        }
        return compareTo(this.qd_1, other.qd_1);
    };
    protoOf(Instant).d = function(other) {
        return this.rd(other instanceof Instant ? other : THROW_CCE());
    };
    protoOf(Instant).equals = function(other) {
        var tmp;
        if (this === other) {
            tmp = true;
        } else {
            var tmp_0;
            var tmp_1;
            if (other instanceof Instant) {
                tmp_1 = equalsLong(this.pd_1, other.pd_1);
            } else {
                tmp_1 = false;
            }
            if (tmp_1) {
                tmp_0 = this.qd_1 === other.qd_1;
            } else {
                tmp_0 = false;
            }
            tmp = tmp_0;
        }
        return tmp;
    };
    protoOf(Instant).hashCode = function() {
        return this.pd_1.hashCode() + imul(51, this.qd_1) | 0;
    };
    protoOf(Instant).toString = function() {
        return formatIso(this);
    };
    function formatIso(instant) {
        _init_properties_Instant_kt__2myitt();
        var this_0 = StringBuilder_init_$Create$_0();
        var ldt = Companion_instance_13.sd(instant);
        var number = ldt.td_1;
        if (abs_0(number) < 1e3) {
            var innerBuilder = StringBuilder_init_$Create$_0();
            if (number >= 0) {
                innerBuilder.q9(number + 1e4 | 0).u9(0);
            } else {
                innerBuilder.q9(number - 1e4 | 0).u9(1);
            }
            this_0.e(innerBuilder);
        } else {
            if (number >= 1e4) {
                this_0.a7(_Char___init__impl__6a9atx(43));
            }
            this_0.q9(number);
        }
        this_0.a7(_Char___init__impl__6a9atx(45));
        formatIso$appendTwoDigits(this_0, this_0, ldt.ud_1);
        this_0.a7(_Char___init__impl__6a9atx(45));
        formatIso$appendTwoDigits(this_0, this_0, ldt.vd_1);
        this_0.a7(_Char___init__impl__6a9atx(84));
        formatIso$appendTwoDigits(this_0, this_0, ldt.wd_1);
        this_0.a7(_Char___init__impl__6a9atx(58));
        formatIso$appendTwoDigits(this_0, this_0, ldt.xd_1);
        this_0.a7(_Char___init__impl__6a9atx(58));
        formatIso$appendTwoDigits(this_0, this_0, ldt.yd_1);
        if (!(ldt.zd_1 === 0)) {
            this_0.a7(_Char___init__impl__6a9atx(46));
            var zerosToStrip = 0;
            while ((ldt.zd_1 % get_POWERS_OF_TEN()[zerosToStrip + 1 | 0] | 0) === 0) {
                zerosToStrip = zerosToStrip + 1 | 0;
            }
            zerosToStrip = zerosToStrip - (zerosToStrip % 3 | 0) | 0;
            var numberToOutput = ldt.zd_1 / get_POWERS_OF_TEN()[zerosToStrip] | 0;
            this_0.z6(substring_0((numberToOutput + get_POWERS_OF_TEN()[9 - zerosToStrip | 0] | 0).toString(), 1));
        }
        this_0.a7(_Char___init__impl__6a9atx(90));
        return this_0.toString();
    }
    function Success(epochSeconds, nanosecondsOfSecond) {
        this.ae_1 = epochSeconds;
        this.be_1 = nanosecondsOfSecond;
    }
    protoOf(Success).od = function() {
        if (compare(this.ae_1, Companion_getInstance_12().jd_1.pd_1) < 0 || compare(this.ae_1, Companion_getInstance_12().kd_1.pd_1) > 0) throw new InstantFormatException('The parsed date is outside the range representable by Instant (Unix epoch second ' + this.ae_1.toString() + ')');
        return Companion_getInstance_12().md(this.ae_1, this.be_1);
    };
    function Failure(error, input) {
        this.ce_1 = error;
        this.de_1 = input;
    }
    protoOf(Failure).od = function() {
        throw new InstantFormatException(this.ce_1 + ' when parsing an Instant from "' + truncateForErrorMessage(this.de_1, 64) + '"');
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
        var y = fromInt(this_0.td_1);
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
        var other = (imul(367, this_0.ud_1) - 362 | 0) / 12 | 0;
        total = add(tmp0, fromInt(other));
        var tmp0_0 = total;
        var other_0 = this_0.vd_1 - 1 | 0;
        total = add(tmp0_0, fromInt(other_0));
        if (this_0.ud_1 > 2) {
            var _unary__edvuaz = total;
            total = subtract(_unary__edvuaz, get_ONE());
            if (!isLeapYear(this_0.td_1)) {
                var _unary__edvuaz_0 = total;
                total = subtract(_unary__edvuaz_0, get_ONE());
            }
        }
        var this_4 = total;
        var epochDays = subtract(this_4, fromInt(719528));
        var daySeconds = (imul(this_0.wd_1, 3600) + imul(this_0.xd_1, 60) | 0) + this_0.yd_1 | 0;
        var this_5 = multiply(epochDays, fromInt(86400));
        var this_6 = add(this_5, fromInt(daySeconds));
        var epochSeconds = subtract(this_6, fromInt(offsetSeconds));
        var p1 = this_0.zd_1;
        return new Success(epochSeconds, p1);
    }
    function Companion_13() {}
    protoOf(Companion_13).sd = function(instant) {
        var localSecond = instant.pd_1;
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
        return new UnboundLocalDateTime(year, month, day, hours, minutes, second, instant.qd_1);
    };
    var Companion_instance_13;
    function Companion_getInstance_13() {
        return Companion_instance_13;
    }
    function UnboundLocalDateTime(year, month, day, hour, minute, second, nanosecond) {
        this.td_1 = year;
        this.ud_1 = month;
        this.vd_1 = day;
        this.wd_1 = hour;
        this.xd_1 = minute;
        this.yd_1 = second;
        this.zd_1 = nanosecond;
    }
    protoOf(UnboundLocalDateTime).toString = function() {
        return 'UnboundLocalDateTime(' + this.td_1 + '-' + this.ud_1 + '-' + this.vd_1 + ' ' + this.wd_1 + ':' + this.xd_1 + ':' + this.yd_1 + '.' + this.zd_1 + ')';
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
            _this__u8e3s4.a7(_Char___init__impl__6a9atx(48));
        }
        $this_buildString.q9(number);
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
        return new DeepRecursiveScopeImpl(_this__u8e3s4.fe_1, value).ke();
    }
    function DeepRecursiveFunction(block) {
        this.fe_1 = block;
    }
    function DeepRecursiveScopeImpl(block, value) {
        DeepRecursiveScope.call(this);
        var tmp = this;
        tmp.ge_1 = isSuspendFunction(block, 2) ? block : THROW_CCE();
        this.he_1 = value;
        var tmp_0 = this;
        tmp_0.ie_1 = isInterface(this, Continuation) ? this : THROW_CCE();
        this.je_1 = get_UNDEFINED_RESULT();
    }
    protoOf(DeepRecursiveScopeImpl).r7 = function() {
        return EmptyCoroutineContext_getInstance();
    };
    protoOf(DeepRecursiveScopeImpl).le = function(result) {
        this.ie_1 = null;
        this.je_1 = result;
    };
    protoOf(DeepRecursiveScopeImpl).w7 = function(result) {
        return this.le(result);
    };
    protoOf(DeepRecursiveScopeImpl).ee = function(value, $completion) {
        var tmp = this;
        tmp.ie_1 = isInterface($completion, Continuation) ? $completion : THROW_CCE();
        this.he_1 = value;
        return get_COROUTINE_SUSPENDED();
    };
    protoOf(DeepRecursiveScopeImpl).ke = function() {
        $l$loop: while (true) {
            var result = this.je_1;
            var tmp0_elvis_lhs = this.ie_1;
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
                    var tmp0 = this.ge_1;
                    var param = this.he_1;
                    tmp_0 = startCoroutineUninterceptedOrReturnNonGeneratorVersion(tmp0, this, param, cont);
                } catch ($p) {
                    var tmp_1;
                    if ($p instanceof Error) {
                        var e = $p;
                        var tmp$ret$3 = _Result___init__impl__xyqfz8(createFailure(e));
                        cont.w7(tmp$ret$3);
                        continue $l$loop;
                    } else {
                        throw $p;
                    }
                }
                var r = tmp_0;
                if (!(r === get_COROUTINE_SUSPENDED())) {
                    var tmp$ret$5 = _Result___init__impl__xyqfz8(r);
                    cont.w7(tmp$ret$5);
                }
            } else {
                this.je_1 = get_UNDEFINED_RESULT();
                cont.w7(result);
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
        this.me_1 = initializer;
        this.ne_1 = UNINITIALIZED_VALUE_instance;
    }
    protoOf(UnsafeLazyImpl).q1 = function() {
        if (this.ne_1 === UNINITIALIZED_VALUE_instance) {
            this.ne_1 = ensureNotNull(this.me_1)();
            this.me_1 = null;
        }
        return this.ne_1;
    };
    protoOf(UnsafeLazyImpl).oe = function() {
        return !(this.ne_1 === UNINITIALIZED_VALUE_instance);
    };
    protoOf(UnsafeLazyImpl).toString = function() {
        return this.oe() ? toString_0(this.q1()) : 'Lazy value not initialized yet.';
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
            tmp = _Result___get_value__impl__bjfvqg($this).pe_1;
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
        this.pe_1 = exception;
    }
    protoOf(Failure_0).equals = function(other) {
        var tmp;
        if (other instanceof Failure_0) {
            tmp = equals(this.pe_1, other.pe_1);
        } else {
            tmp = false;
        }
        return tmp;
    };
    protoOf(Failure_0).hashCode = function() {
        return hashCode_0(this.pe_1);
    };
    protoOf(Failure_0).toString = function() {
        return 'Failure(' + this.pe_1.toString() + ')';
    };
    function Result__hashCode_impl_d2zufp($this) {
        return $this == null ? 0 : hashCode_0($this);
    }
    function Result__equals_impl_bxgmep($this, other) {
        if (!(other instanceof Result)) return false;
        var tmp0_other_with_cast = other.qe_1;
        if (!equals($this, tmp0_other_with_cast)) return false;
        return true;
    }
    function Result(value) {
        this.qe_1 = value;
    }
    protoOf(Result).toString = function() {
        return Result__toString_impl_yu5r8k(this.qe_1);
    };
    protoOf(Result).hashCode = function() {
        return Result__hashCode_impl_d2zufp(this.qe_1);
    };
    protoOf(Result).equals = function(other) {
        return Result__equals_impl_bxgmep(this.qe_1, other);
    };
    function throwOnFailure(_this__u8e3s4) {
        var tmp = _Result___get_value__impl__bjfvqg(_this__u8e3s4);
        if (tmp instanceof Failure_0) throw _Result___get_value__impl__bjfvqg(_this__u8e3s4).pe_1;
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
        this.ua_1 = first;
        this.va_1 = second;
    }
    protoOf(Pair).toString = function() {
        return '(' + toString_0(this.ua_1) + ', ' + toString_0(this.va_1) + ')';
    };
    protoOf(Pair).oa = function() {
        return this.ua_1;
    };
    protoOf(Pair).pa = function() {
        return this.va_1;
    };
    protoOf(Pair).hashCode = function() {
        var result = this.ua_1 == null ? 0 : hashCode_0(this.ua_1);
        result = imul(result, 31) + (this.va_1 == null ? 0 : hashCode_0(this.va_1)) | 0;
        return result;
    };
    protoOf(Pair).equals = function(other) {
        if (this === other) return true;
        if (!(other instanceof Pair)) return false;
        if (!equals(this.ua_1, other.ua_1)) return false;
        if (!equals(this.va_1, other.va_1)) return false;
        return true;
    };
    function to(_this__u8e3s4, that) {
        return new Pair(_this__u8e3s4, that);
    }
    function Triple(first, second, third) {
        this.re_1 = first;
        this.se_1 = second;
        this.te_1 = third;
    }
    protoOf(Triple).toString = function() {
        return '(' + toString_0(this.re_1) + ', ' + toString_0(this.se_1) + ', ' + toString_0(this.te_1) + ')';
    };
    protoOf(Triple).oa = function() {
        return this.re_1;
    };
    protoOf(Triple).pa = function() {
        return this.se_1;
    };
    protoOf(Triple).ue = function() {
        return this.te_1;
    };
    protoOf(Triple).hashCode = function() {
        var result = this.re_1 == null ? 0 : hashCode_0(this.re_1);
        result = imul(result, 31) + (this.se_1 == null ? 0 : hashCode_0(this.se_1)) | 0;
        result = imul(result, 31) + (this.te_1 == null ? 0 : hashCode_0(this.te_1)) | 0;
        return result;
    };
    protoOf(Triple).equals = function(other) {
        if (this === other) return true;
        if (!(other instanceof Triple)) return false;
        if (!equals(this.re_1, other.re_1)) return false;
        if (!equals(this.se_1, other.se_1)) return false;
        if (!equals(this.te_1, other.te_1)) return false;
        return true;
    };
    function Companion_15() {
        Companion_instance_15 = this;
        this.ba_1 = new Uuid(new Long(0, 0), new Long(0, 0));
        this.ca_1 = 16;
        this.da_1 = 128;
    }
    protoOf(Companion_15).ea = function(mostSignificantBits, leastSignificantBits) {
        var tmp;
        if (equalsLong(mostSignificantBits, new Long(0, 0)) && equalsLong(leastSignificantBits, new Long(0, 0))) {
            tmp = this.ba_1;
        } else {
            tmp = new Uuid(mostSignificantBits, leastSignificantBits);
        }
        return tmp;
    };
    protoOf(Companion_15).ve = function(uuidString) {
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
        this.we_1 = mostSignificantBits;
        this.xe_1 = leastSignificantBits;
    }
    protoOf(Uuid).toString = function() {
        return this.ye();
    };
    protoOf(Uuid).ye = function() {
        var bytes = new Int8Array(36);
        formatBytesInto(this.we_1, bytes, 0, 0, 4);
        var this_0 = _Char___init__impl__6a9atx(45);
        var tmp$ret$0 = Char__toInt_impl_vasixd(this_0);
        bytes[8] = toByte(tmp$ret$0);
        formatBytesInto(this.we_1, bytes, 9, 4, 6);
        var this_1 = _Char___init__impl__6a9atx(45);
        var tmp$ret$1 = Char__toInt_impl_vasixd(this_1);
        bytes[13] = toByte(tmp$ret$1);
        formatBytesInto(this.we_1, bytes, 14, 6, 8);
        var this_2 = _Char___init__impl__6a9atx(45);
        var tmp$ret$2 = Char__toInt_impl_vasixd(this_2);
        bytes[18] = toByte(tmp$ret$2);
        formatBytesInto(this.xe_1, bytes, 19, 0, 2);
        var this_3 = _Char___init__impl__6a9atx(45);
        var tmp$ret$3 = Char__toInt_impl_vasixd(this_3);
        bytes[23] = toByte(tmp$ret$3);
        formatBytesInto(this.xe_1, bytes, 24, 2, 8);
        return decodeToString(bytes);
    };
    protoOf(Uuid).equals = function(other) {
        if (this === other) return true;
        if (!(other instanceof Uuid)) return false;
        return equalsLong(this.we_1, other.we_1) && equalsLong(this.xe_1, other.xe_1);
    };
    protoOf(Uuid).ze = function(other) {
        var tmp;
        if (!equalsLong(this.we_1, other.we_1)) {
            var this_0 = this.we_1;
            var tmp0 = _ULong___init__impl__c78o9k(this_0);
            var this_1 = other.we_1;
            var other_0 = _ULong___init__impl__c78o9k(this_1);
            tmp = ulongCompare(_ULong___get_data__impl__fggpzb(tmp0), _ULong___get_data__impl__fggpzb(other_0));
        } else {
            var this_2 = this.xe_1;
            var tmp0_0 = _ULong___init__impl__c78o9k(this_2);
            var this_3 = other.xe_1;
            var other_1 = _ULong___init__impl__c78o9k(this_3);
            tmp = ulongCompare(_ULong___get_data__impl__fggpzb(tmp0_0), _ULong___get_data__impl__fggpzb(other_1));
        }
        return tmp;
    };
    protoOf(Uuid).d = function(other) {
        return this.ze(other instanceof Uuid ? other : THROW_CCE());
    };
    protoOf(Uuid).hashCode = function() {
        return bitwiseXor(this.we_1, this.xe_1).hashCode();
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
        this.af_1 = _UByte___init__impl__g9hnc4(0);
        this.bf_1 = _UByte___init__impl__g9hnc4(-1);
        this.cf_1 = 1;
        this.df_1 = 8;
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
        return UByte__compareTo_impl_5w5192($this.ef_1, other instanceof UByte ? other.ef_1 : THROW_CCE());
    }
    function UByte__toString_impl_v72jg($this) {
        return (_UByte___get_data__impl__jof9qr($this) & 255).toString();
    }
    function UByte__hashCode_impl_mmczcb($this) {
        return $this;
    }
    function UByte__equals_impl_nvqtsf($this, other) {
        if (!(other instanceof UByte)) return false;
        if (!($this === other.ef_1)) return false;
        return true;
    }
    function UByte(data) {
        Companion_getInstance_16();
        this.ef_1 = data;
    }
    protoOf(UByte).ff = function(other) {
        return UByte__compareTo_impl_5w5192(this.ef_1, other);
    };
    protoOf(UByte).d = function(other) {
        return UByte__compareTo_impl_5w5192_0(this, other);
    };
    protoOf(UByte).toString = function() {
        return UByte__toString_impl_v72jg(this.ef_1);
    };
    protoOf(UByte).hashCode = function() {
        return UByte__hashCode_impl_mmczcb(this.ef_1);
    };
    protoOf(UByte).equals = function(other) {
        return UByte__equals_impl_nvqtsf(this.ef_1, other);
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
        this.gf_1 = array;
        this.hf_1 = 0;
    }
    protoOf(Iterator).h = function() {
        return this.hf_1 < this.gf_1.length;
    };
    protoOf(Iterator).if = function() {
        var tmp;
        if (this.hf_1 < this.gf_1.length) {
            var _unary__edvuaz = this.hf_1;
            this.hf_1 = _unary__edvuaz + 1 | 0;
            var this_0 = this.gf_1[_unary__edvuaz];
            tmp = _UByte___init__impl__g9hnc4(this_0);
        } else {
            throw NoSuchElementException_init_$Create$_0(this.hf_1.toString());
        }
        return tmp;
    };
    protoOf(Iterator).i = function() {
        return new UByte(this.if());
    };
    function UByteArray__contains_impl_njh19q($this, element) {
        var tmp = _UByteArray___get_storage__impl__d4kctt($this);
        var tmp$ret$0 = _UByte___get_data__impl__jof9qr(element);
        return contains_0(tmp, tmp$ret$0);
    }
    function UByteArray__contains_impl_njh19q_0($this, element) {
        if (!(element instanceof UByte)) return false;
        return UByteArray__contains_impl_njh19q($this.jf_1, element instanceof UByte ? element.ef_1 : THROW_CCE());
    }
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
        var tmp0_other_with_cast = other.jf_1;
        if (!equals($this, tmp0_other_with_cast)) return false;
        return true;
    }
    function UByteArray(storage) {
        this.jf_1 = storage;
    }
    protoOf(UByteArray).j = function() {
        return _UByteArray___get_size__impl__h6pkdv(this.jf_1);
    };
    protoOf(UByteArray).g = function() {
        return UByteArray__iterator_impl_509y1p(this.jf_1);
    };
    protoOf(UByteArray).kf = function(element) {
        return UByteArray__contains_impl_njh19q(this.jf_1, element);
    };
    protoOf(UByteArray).m1 = function(element) {
        return UByteArray__contains_impl_njh19q_0(this, element);
    };
    protoOf(UByteArray).k = function() {
        return UByteArray__isEmpty_impl_nbfqsa(this.jf_1);
    };
    protoOf(UByteArray).toString = function() {
        return UByteArray__toString_impl_ukpl97(this.jf_1);
    };
    protoOf(UByteArray).hashCode = function() {
        return UByteArray__hashCode_impl_ip8jx2(this.jf_1);
    };
    protoOf(UByteArray).equals = function(other) {
        return UByteArray__equals_impl_roka4u(this.jf_1, other);
    };
    function _UInt___init__impl__l7qpdl(data) {
        return data;
    }
    function _UInt___get_data__impl__f0vqqw($this) {
        return $this;
    }
    function Companion_17() {
        Companion_instance_17 = this;
        this.lf_1 = _UInt___init__impl__l7qpdl(0);
        this.mf_1 = _UInt___init__impl__l7qpdl(-1);
        this.nf_1 = 4;
        this.of_1 = 32;
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
        return UInt__compareTo_impl_yacclj($this.pf_1, other instanceof UInt ? other.pf_1 : THROW_CCE());
    }
    function UInt__toString_impl_dbgl21($this) {
        return (_UInt___get_data__impl__f0vqqw($this) >>> 0).toString();
    }
    function UInt__hashCode_impl_z2mhuw($this) {
        return $this;
    }
    function UInt__equals_impl_ffdoxg($this, other) {
        if (!(other instanceof UInt)) return false;
        if (!($this === other.pf_1)) return false;
        return true;
    }
    function UInt(data) {
        Companion_getInstance_17();
        this.pf_1 = data;
    }
    protoOf(UInt).qf = function(other) {
        return UInt__compareTo_impl_yacclj(this.pf_1, other);
    };
    protoOf(UInt).d = function(other) {
        return UInt__compareTo_impl_yacclj_0(this, other);
    };
    protoOf(UInt).toString = function() {
        return UInt__toString_impl_dbgl21(this.pf_1);
    };
    protoOf(UInt).hashCode = function() {
        return UInt__hashCode_impl_z2mhuw(this.pf_1);
    };
    protoOf(UInt).equals = function(other) {
        return UInt__equals_impl_ffdoxg(this.pf_1, other);
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
        this.rf_1 = array;
        this.sf_1 = 0;
    }
    protoOf(Iterator_0).h = function() {
        return this.sf_1 < this.rf_1.length;
    };
    protoOf(Iterator_0).tf = function() {
        var tmp;
        if (this.sf_1 < this.rf_1.length) {
            var _unary__edvuaz = this.sf_1;
            this.sf_1 = _unary__edvuaz + 1 | 0;
            var this_0 = this.rf_1[_unary__edvuaz];
            tmp = _UInt___init__impl__l7qpdl(this_0);
        } else {
            throw NoSuchElementException_init_$Create$_0(this.sf_1.toString());
        }
        return tmp;
    };
    protoOf(Iterator_0).i = function() {
        return new UInt(this.tf());
    };
    function UIntArray__contains_impl_b16rzj($this, element) {
        var tmp = _UIntArray___get_storage__impl__92a0v0($this);
        var tmp$ret$0 = _UInt___get_data__impl__f0vqqw(element);
        return contains_1(tmp, tmp$ret$0);
    }
    function UIntArray__contains_impl_b16rzj_0($this, element) {
        if (!(element instanceof UInt)) return false;
        return UIntArray__contains_impl_b16rzj($this.uf_1, element instanceof UInt ? element.pf_1 : THROW_CCE());
    }
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
        var tmp0_other_with_cast = other.uf_1;
        if (!equals($this, tmp0_other_with_cast)) return false;
        return true;
    }
    function UIntArray(storage) {
        this.uf_1 = storage;
    }
    protoOf(UIntArray).j = function() {
        return _UIntArray___get_size__impl__r6l8ci(this.uf_1);
    };
    protoOf(UIntArray).g = function() {
        return UIntArray__iterator_impl_tkdv7k(this.uf_1);
    };
    protoOf(UIntArray).vf = function(element) {
        return UIntArray__contains_impl_b16rzj(this.uf_1, element);
    };
    protoOf(UIntArray).m1 = function(element) {
        return UIntArray__contains_impl_b16rzj_0(this, element);
    };
    protoOf(UIntArray).k = function() {
        return UIntArray__isEmpty_impl_vd8j4n(this.uf_1);
    };
    protoOf(UIntArray).toString = function() {
        return UIntArray__toString_impl_3zy802(this.uf_1);
    };
    protoOf(UIntArray).hashCode = function() {
        return UIntArray__hashCode_impl_hr7ost(this.uf_1);
    };
    protoOf(UIntArray).equals = function(other) {
        return UIntArray__equals_impl_flcmof(this.uf_1, other);
    };
    function _ULong___init__impl__c78o9k(data) {
        return data;
    }
    function _ULong___get_data__impl__fggpzb($this) {
        return $this;
    }
    function Companion_18() {
        Companion_instance_18 = this;
        this.wf_1 = _ULong___init__impl__c78o9k(new Long(0, 0));
        this.xf_1 = _ULong___init__impl__c78o9k(new Long(-1, -1));
        this.yf_1 = 8;
        this.zf_1 = 64;
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
        return ULong__compareTo_impl_38i7tu($this.ag_1, other instanceof ULong ? other.ag_1 : THROW_CCE());
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
        var tmp0_other_with_cast = other.ag_1;
        if (!equalsLong($this, tmp0_other_with_cast)) return false;
        return true;
    }
    function ULong(data) {
        Companion_getInstance_18();
        this.ag_1 = data;
    }
    protoOf(ULong).bg = function(other) {
        return ULong__compareTo_impl_38i7tu(this.ag_1, other);
    };
    protoOf(ULong).d = function(other) {
        return ULong__compareTo_impl_38i7tu_0(this, other);
    };
    protoOf(ULong).toString = function() {
        return ULong__toString_impl_f9au7k(this.ag_1);
    };
    protoOf(ULong).hashCode = function() {
        return ULong__hashCode_impl_6hv2lb(this.ag_1);
    };
    protoOf(ULong).equals = function(other) {
        return ULong__equals_impl_o0gnyb(this.ag_1, other);
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
        this.cg_1 = array;
        this.dg_1 = 0;
    }
    protoOf(Iterator_1).h = function() {
        return this.dg_1 < this.cg_1.length;
    };
    protoOf(Iterator_1).eg = function() {
        var tmp;
        if (this.dg_1 < this.cg_1.length) {
            var _unary__edvuaz = this.dg_1;
            this.dg_1 = _unary__edvuaz + 1 | 0;
            var this_0 = this.cg_1[_unary__edvuaz];
            tmp = _ULong___init__impl__c78o9k(this_0);
        } else {
            throw NoSuchElementException_init_$Create$_0(this.dg_1.toString());
        }
        return tmp;
    };
    protoOf(Iterator_1).i = function() {
        return new ULong(this.eg());
    };
    function ULongArray__contains_impl_v9bgai($this, element) {
        var tmp = _ULongArray___get_storage__impl__28e64j($this);
        var tmp$ret$0 = _ULong___get_data__impl__fggpzb(element);
        return contains_2(tmp, tmp$ret$0);
    }
    function ULongArray__contains_impl_v9bgai_0($this, element) {
        if (!(element instanceof ULong)) return false;
        return ULongArray__contains_impl_v9bgai($this.fg_1, element instanceof ULong ? element.ag_1 : THROW_CCE());
    }
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
        var tmp0_other_with_cast = other.fg_1;
        if (!equals($this, tmp0_other_with_cast)) return false;
        return true;
    }
    function ULongArray(storage) {
        this.fg_1 = storage;
    }
    protoOf(ULongArray).j = function() {
        return _ULongArray___get_size__impl__ju6dtr(this.fg_1);
    };
    protoOf(ULongArray).g = function() {
        return ULongArray__iterator_impl_cq4d2h(this.fg_1);
    };
    protoOf(ULongArray).gg = function(element) {
        return ULongArray__contains_impl_v9bgai(this.fg_1, element);
    };
    protoOf(ULongArray).m1 = function(element) {
        return ULongArray__contains_impl_v9bgai_0(this, element);
    };
    protoOf(ULongArray).k = function() {
        return ULongArray__isEmpty_impl_c3yngu(this.fg_1);
    };
    protoOf(ULongArray).toString = function() {
        return ULongArray__toString_impl_wqk1p5(this.fg_1);
    };
    protoOf(ULongArray).hashCode = function() {
        return ULongArray__hashCode_impl_aze4wa(this.fg_1);
    };
    protoOf(ULongArray).equals = function(other) {
        return ULongArray__equals_impl_vwitwa(this.fg_1, other);
    };
    function _UShort___init__impl__jigrne(data) {
        return data;
    }
    function _UShort___get_data__impl__g0245($this) {
        return $this;
    }
    function Companion_19() {
        Companion_instance_19 = this;
        this.hg_1 = _UShort___init__impl__jigrne(0);
        this.ig_1 = _UShort___init__impl__jigrne(-1);
        this.jg_1 = 2;
        this.kg_1 = 16;
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
        return UShort__compareTo_impl_1pfgyc($this.lg_1, other instanceof UShort ? other.lg_1 : THROW_CCE());
    }
    function UShort__toString_impl_edaoee($this) {
        return (_UShort___get_data__impl__g0245($this) & 65535).toString();
    }
    function UShort__hashCode_impl_ywngrv($this) {
        return $this;
    }
    function UShort__equals_impl_7t9pdz($this, other) {
        if (!(other instanceof UShort)) return false;
        if (!($this === other.lg_1)) return false;
        return true;
    }
    function UShort(data) {
        Companion_getInstance_19();
        this.lg_1 = data;
    }
    protoOf(UShort).mg = function(other) {
        return UShort__compareTo_impl_1pfgyc(this.lg_1, other);
    };
    protoOf(UShort).d = function(other) {
        return UShort__compareTo_impl_1pfgyc_0(this, other);
    };
    protoOf(UShort).toString = function() {
        return UShort__toString_impl_edaoee(this.lg_1);
    };
    protoOf(UShort).hashCode = function() {
        return UShort__hashCode_impl_ywngrv(this.lg_1);
    };
    protoOf(UShort).equals = function(other) {
        return UShort__equals_impl_7t9pdz(this.lg_1, other);
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
        this.ng_1 = array;
        this.og_1 = 0;
    }
    protoOf(Iterator_2).h = function() {
        return this.og_1 < this.ng_1.length;
    };
    protoOf(Iterator_2).pg = function() {
        var tmp;
        if (this.og_1 < this.ng_1.length) {
            var _unary__edvuaz = this.og_1;
            this.og_1 = _unary__edvuaz + 1 | 0;
            var this_0 = this.ng_1[_unary__edvuaz];
            tmp = _UShort___init__impl__jigrne(this_0);
        } else {
            throw NoSuchElementException_init_$Create$_0(this.og_1.toString());
        }
        return tmp;
    };
    protoOf(Iterator_2).i = function() {
        return new UShort(this.pg());
    };
    function UShortArray__contains_impl_vo7k3g($this, element) {
        var tmp = _UShortArray___get_storage__impl__t2jpv5($this);
        var tmp$ret$0 = _UShort___get_data__impl__g0245(element);
        return contains_3(tmp, tmp$ret$0);
    }
    function UShortArray__contains_impl_vo7k3g_0($this, element) {
        if (!(element instanceof UShort)) return false;
        return UShortArray__contains_impl_vo7k3g($this.qg_1, element instanceof UShort ? element.lg_1 : THROW_CCE());
    }
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
        var tmp0_other_with_cast = other.qg_1;
        if (!equals($this, tmp0_other_with_cast)) return false;
        return true;
    }
    function UShortArray(storage) {
        this.qg_1 = storage;
    }
    protoOf(UShortArray).j = function() {
        return _UShortArray___get_size__impl__jqto1b(this.qg_1);
    };
    protoOf(UShortArray).g = function() {
        return UShortArray__iterator_impl_ktpenn(this.qg_1);
    };
    protoOf(UShortArray).rg = function(element) {
        return UShortArray__contains_impl_vo7k3g(this.qg_1, element);
    };
    protoOf(UShortArray).m1 = function(element) {
        return UShortArray__contains_impl_vo7k3g_0(this, element);
    };
    protoOf(UShortArray).k = function() {
        return UShortArray__isEmpty_impl_cdd9l0(this.qg_1);
    };
    protoOf(UShortArray).toString = function() {
        return UShortArray__toString_impl_omz03z(this.qg_1);
    };
    protoOf(UShortArray).hashCode = function() {
        return UShortArray__hashCode_impl_2vt3b4(this.qg_1);
    };
    protoOf(UShortArray).equals = function(other) {
        return UShortArray__equals_impl_tyc3mk(this.qg_1, other);
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
        this.ug_1 = missingFields;
        this.vg_1 = serialName;
    }
    protoOf(MissingFieldException).wg = function(newMessage) {
        return new MissingFieldException(newMessage, this, this.ug_1, this.vg_1);
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
            var tmp0_safe_receiver_0 = _this__u8e3s4.xg(tmp0_safe_receiver);
            tmp = tmp0_safe_receiver_0 == null ? null : tmp0_safe_receiver_0.sg();
        }
        return tmp;
    }
    function get_capturedKClass(_this__u8e3s4) {
        var tmp;
        if (_this__u8e3s4 instanceof ContextDescriptor) {
            tmp = _this__u8e3s4.zg_1;
        } else {
            if (_this__u8e3s4 instanceof SerialDescriptorForNullable) {
                tmp = get_capturedKClass(_this__u8e3s4.yg_1);
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
        this.mh_1 = $this_elementDescriptors;
        this.lh_1 = $this_elementDescriptors.eh();
    }
    protoOf(elementDescriptors$1).h = function() {
        return this.lh_1 > 0;
    };
    protoOf(elementDescriptors$1).i = function() {
        var tmp = this.mh_1.eh();
        var _unary__edvuaz = this.lh_1;
        this.lh_1 = _unary__edvuaz - 1 | 0;
        return this.mh_1.jh(tmp - _unary__edvuaz | 0);
    };
    function elementDescriptors$$inlined$Iterable$1($this_elementDescriptors) {
        this.nh_1 = $this_elementDescriptors;
    }
    protoOf(elementDescriptors$$inlined$Iterable$1).g = function() {
        return new elementDescriptors$1(this.nh_1);
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
        return new SerialDescriptorImpl(serialName, kind, sdBuilder.rh_1.j(), toList(typeParameters), sdBuilder);
    }
    function ClassSerialDescriptorBuilder(serialName) {
        this.oh_1 = serialName;
        this.ph_1 = false;
        this.qh_1 = emptyList();
        this.rh_1 = ArrayList_init_$Create$();
        this.sh_1 = HashSet_init_$Create$();
        this.th_1 = ArrayList_init_$Create$();
        this.uh_1 = ArrayList_init_$Create$();
        this.vh_1 = ArrayList_init_$Create$();
    }
    protoOf(ClassSerialDescriptorBuilder).wh = function(elementName, descriptor, annotations, isOptional) {
        if (!this.sh_1.f(elementName)) {
            var message = "Element with name '" + elementName + "' is already registered in " + this.oh_1;
            throw IllegalArgumentException_init_$Create$_0(toString_1(message));
        }
        this.rh_1.f(elementName);
        this.th_1.f(descriptor);
        this.uh_1.f(annotations);
        this.vh_1.f(isOptional);
    };
    protoOf(ClassSerialDescriptorBuilder).xh = function(elementName, descriptor, annotations, isOptional, $super) {
        annotations = annotations === VOID ? emptyList() : annotations;
        isOptional = isOptional === VOID ? false : isOptional;
        var tmp;
        if ($super === VOID) {
            this.wh(elementName, descriptor, annotations, isOptional);
            tmp = Unit_instance;
        } else {
            tmp = $super.wh.call(this, elementName, descriptor, annotations, isOptional);
        }
        return tmp;
    };
    function _get__hashCode__tgwhef($this) {
        var tmp0 = $this.ji_1;
        var tmp = KProperty1;
        getPropertyCallableRef('_hashCode', 1, tmp, SerialDescriptorImpl$_get__hashCode_$ref_2v7wzp(), null);
        return tmp0.q1();
    }
    function SerialDescriptorImpl$_hashCode$delegate$lambda(this$0) {
        return function() {
            return hashCodeImpl(this$0, this$0.ii_1);
        };
    }
    function SerialDescriptorImpl$_get__hashCode_$ref_2v7wzp() {
        return constructCallableReference((function(p0) {
            return _get__hashCode__tgwhef(p0);
        }), 1, 0, 0);
    }
    function SerialDescriptorImpl(serialName, kind, elementsCount, typeParameters, builder) {
        this.yh_1 = serialName;
        this.zh_1 = kind;
        this.ai_1 = elementsCount;
        this.bi_1 = builder.qh_1;
        this.ci_1 = toHashSet(builder.rh_1);
        var tmp = this;
        var this_0 = builder.rh_1;
        tmp.di_1 = copyToArray(this_0);
        this.ei_1 = compactArray(builder.th_1);
        var tmp_0 = this;
        var this_1 = builder.uh_1;
        tmp_0.fi_1 = copyToArray(this_1);
        this.gi_1 = toBooleanArray(builder.vh_1);
        var tmp_1 = this;
        var this_2 = withIndex(this.di_1);
        var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_2, 10));
        var _iterator__ex2g4s = this_2.g();
        while (_iterator__ex2g4s.h()) {
            var item = _iterator__ex2g4s.i();
            var tmp$ret$4 = to(item.na_1, item.ma_1);
            destination.f(tmp$ret$4);
        }
        tmp_1.hi_1 = toMap(destination);
        this.ii_1 = compactArray(typeParameters);
        var tmp_2 = this;
        tmp_2.ji_1 = lazy_0(SerialDescriptorImpl$_hashCode$delegate$lambda(this));
    }
    protoOf(SerialDescriptorImpl).ah = function() {
        return this.yh_1;
    };
    protoOf(SerialDescriptorImpl).bh = function() {
        return this.zh_1;
    };
    protoOf(SerialDescriptorImpl).eh = function() {
        return this.ai_1;
    };
    protoOf(SerialDescriptorImpl).fh = function() {
        return this.bi_1;
    };
    protoOf(SerialDescriptorImpl).gh = function(index) {
        return getChecked(this.di_1, index);
    };
    protoOf(SerialDescriptorImpl).hh = function(name) {
        var tmp0_elvis_lhs = this.hi_1.t1(name);
        return tmp0_elvis_lhs == null ? -3 : tmp0_elvis_lhs;
    };
    protoOf(SerialDescriptorImpl).ih = function(index) {
        return getChecked(this.fi_1, index);
    };
    protoOf(SerialDescriptorImpl).jh = function(index) {
        return getChecked(this.ei_1, index);
    };
    protoOf(SerialDescriptorImpl).kh = function(index) {
        return getChecked_0(this.gi_1, index);
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
            if (!(this.ah() === other.ah())) {
                tmp$ret$0 = false;
                break $l$block_5;
            }
            if (!contentEquals(this.ii_1, other.ii_1)) {
                tmp$ret$0 = false;
                break $l$block_5;
            }
            if (!(this.eh() === other.eh())) {
                tmp$ret$0 = false;
                break $l$block_5;
            }
            var inductionVariable = 0;
            var last = this.eh();
            if (inductionVariable < last) do {
                var index = inductionVariable;
                inductionVariable = inductionVariable + 1 | 0;
                if (!(this.jh(index).ah() === other.jh(index).ah())) {
                    tmp$ret$0 = false;
                    break $l$block_5;
                }
                if (!equals(this.jh(index).bh(), other.jh(index).bh())) {
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
        return ensureNotNull(getKClassFromExpression(this).k8());
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
    protoOf(AbstractDecoder).ki = function() {
        throw SerializationException_init_$Create$_0(toString_1(getKClassFromExpression(this)) + " can't retrieve untyped values");
    };
    protoOf(AbstractDecoder).li = function() {
        return true;
    };
    protoOf(AbstractDecoder).mi = function() {
        return null;
    };
    protoOf(AbstractDecoder).ni = function() {
        var tmp = this.ki();
        return typeof tmp === 'boolean' ? tmp : THROW_CCE();
    };
    protoOf(AbstractDecoder).oi = function() {
        var tmp = this.ki();
        return typeof tmp === 'number' ? tmp : THROW_CCE();
    };
    protoOf(AbstractDecoder).pi = function() {
        var tmp = this.ki();
        return typeof tmp === 'number' ? tmp : THROW_CCE();
    };
    protoOf(AbstractDecoder).qi = function() {
        var tmp = this.ki();
        return typeof tmp === 'number' ? tmp : THROW_CCE();
    };
    protoOf(AbstractDecoder).ri = function() {
        var tmp = this.ki();
        return tmp instanceof Long ? tmp : THROW_CCE();
    };
    protoOf(AbstractDecoder).si = function() {
        var tmp = this.ki();
        return typeof tmp === 'number' ? tmp : THROW_CCE();
    };
    protoOf(AbstractDecoder).ti = function() {
        var tmp = this.ki();
        return typeof tmp === 'number' ? tmp : THROW_CCE();
    };
    protoOf(AbstractDecoder).ui = function() {
        var tmp = this.ki();
        return tmp instanceof Char ? tmp.a1_1 : THROW_CCE();
    };
    protoOf(AbstractDecoder).vi = function() {
        var tmp = this.ki();
        return typeof tmp === 'string' ? tmp : THROW_CCE();
    };
    protoOf(AbstractDecoder).wi = function(descriptor) {
        return this;
    };
    protoOf(AbstractDecoder).xi = function(deserializer, previousValue) {
        return this.yi(deserializer);
    };
    protoOf(AbstractDecoder).zi = function(descriptor) {
        return this;
    };
    protoOf(AbstractDecoder).aj = function(descriptor) {};
    protoOf(AbstractDecoder).bj = function(descriptor, index) {
        return this.ni();
    };
    protoOf(AbstractDecoder).cj = function(descriptor, index) {
        return this.oi();
    };
    protoOf(AbstractDecoder).dj = function(descriptor, index) {
        return this.pi();
    };
    protoOf(AbstractDecoder).ej = function(descriptor, index) {
        return this.qi();
    };
    protoOf(AbstractDecoder).fj = function(descriptor, index) {
        return this.ri();
    };
    protoOf(AbstractDecoder).gj = function(descriptor, index) {
        return this.si();
    };
    protoOf(AbstractDecoder).hj = function(descriptor, index) {
        return this.ti();
    };
    protoOf(AbstractDecoder).ij = function(descriptor, index) {
        return this.ui();
    };
    protoOf(AbstractDecoder).jj = function(descriptor, index) {
        return this.wi(descriptor.jh(index));
    };
    protoOf(AbstractDecoder).kj = function(descriptor, index, deserializer, previousValue) {
        return this.xi(deserializer, previousValue);
    };
    function Decoder() {}
    function CompositeDecoder() {}
    function AbstractPolymorphicSerializer() {}
    protoOf(AbstractPolymorphicSerializer).rj = function(decoder, klassName) {
        return decoder.mj().sj(this.qj(), klassName);
    };
    function NothingSerializer_0() {
        NothingSerializer_instance = this;
        this.tj_1 = NothingSerialDescriptor_getInstance();
    }
    protoOf(NothingSerializer_0).sg = function() {
        return this.tj_1;
    };
    protoOf(NothingSerializer_0).tg = function(decoder) {
        throw SerializationException_init_$Create$_0("'kotlin.Nothing' does not have instances");
    };
    var NothingSerializer_instance;
    function NothingSerializer_getInstance() {
        if (NothingSerializer_instance == null) new NothingSerializer_0;
        return NothingSerializer_instance;
    }
    function DurationSerializer() {
        DurationSerializer_instance = this;
        this.uj_1 = new PrimitiveSerialDescriptor_0('kotlin.time.Duration', STRING_getInstance());
    }
    protoOf(DurationSerializer).sg = function() {
        return this.uj_1;
    };
    protoOf(DurationSerializer).vj = function(decoder) {
        return Companion_getInstance_10().bd(decoder.vi());
    };
    protoOf(DurationSerializer).tg = function(decoder) {
        return new Duration(this.vj(decoder));
    };
    var DurationSerializer_instance;
    function DurationSerializer_getInstance() {
        if (DurationSerializer_instance == null) new DurationSerializer;
        return DurationSerializer_instance;
    }
    function InstantSerializer() {
        InstantSerializer_instance = this;
        this.wj_1 = new PrimitiveSerialDescriptor_0('kotlin.time.Instant', STRING_getInstance());
    }
    protoOf(InstantSerializer).sg = function() {
        return this.wj_1;
    };
    protoOf(InstantSerializer).tg = function(decoder) {
        return Companion_getInstance_12().nd(decoder.vi());
    };
    var InstantSerializer_instance;
    function InstantSerializer_getInstance() {
        if (InstantSerializer_instance == null) new InstantSerializer;
        return InstantSerializer_instance;
    }
    function UuidSerializer() {
        UuidSerializer_instance = this;
        this.xj_1 = new PrimitiveSerialDescriptor_0('kotlin.uuid.Uuid', STRING_getInstance());
    }
    protoOf(UuidSerializer).sg = function() {
        return this.xj_1;
    };
    protoOf(UuidSerializer).tg = function(decoder) {
        return Companion_getInstance_15().ve(decoder.vi());
    };
    var UuidSerializer_instance;
    function UuidSerializer_getInstance() {
        if (UuidSerializer_instance == null) new UuidSerializer;
        return UuidSerializer_instance;
    }
    function ArrayListClassDesc(elementDesc) {
        ListLikeDescriptor.call(this, elementDesc);
    }
    protoOf(ArrayListClassDesc).ah = function() {
        return 'kotlin.collections.ArrayList';
    };
    function LinkedHashMapClassDesc(keyDesc, valueDesc) {
        MapLikeDescriptor.call(this, 'kotlin.collections.LinkedHashMap', keyDesc, valueDesc);
    }
    function ListLikeDescriptor(elementDescriptor) {
        this.ak_1 = elementDescriptor;
        this.bk_1 = 1;
    }
    protoOf(ListLikeDescriptor).bh = function() {
        return LIST_getInstance();
    };
    protoOf(ListLikeDescriptor).eh = function() {
        return this.bk_1;
    };
    protoOf(ListLikeDescriptor).gh = function(index) {
        requireNonNegativeIndex(index, this.ah());
        return index.toString();
    };
    protoOf(ListLikeDescriptor).hh = function(name) {
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
    protoOf(ListLikeDescriptor).kh = function(index) {
        requireNonNegativeIndex(index, this.ah());
        return false;
    };
    protoOf(ListLikeDescriptor).ih = function(index) {
        requireNonNegativeIndex(index, this.ah());
        return emptyList();
    };
    protoOf(ListLikeDescriptor).jh = function(index) {
        requireNonNegativeIndex(index, this.ah());
        return this.ak_1;
    };
    protoOf(ListLikeDescriptor).equals = function(other) {
        if (this === other) return true;
        if (!(other instanceof ListLikeDescriptor)) return false;
        if (equals(this.ak_1, other.ak_1) && this.ah() === other.ah()) return true;
        return false;
    };
    protoOf(ListLikeDescriptor).hashCode = function() {
        return imul(hashCode_0(this.ak_1), 31) + getStringHashCode(this.ah()) | 0;
    };
    protoOf(ListLikeDescriptor).toString = function() {
        return this.ah() + '(' + toString_1(this.ak_1) + ')';
    };
    function MapLikeDescriptor(serialName, keyDescriptor, valueDescriptor) {
        this.ck_1 = serialName;
        this.dk_1 = keyDescriptor;
        this.ek_1 = valueDescriptor;
        this.fk_1 = 2;
    }
    protoOf(MapLikeDescriptor).ah = function() {
        return this.ck_1;
    };
    protoOf(MapLikeDescriptor).bh = function() {
        return MAP_getInstance();
    };
    protoOf(MapLikeDescriptor).eh = function() {
        return this.fk_1;
    };
    protoOf(MapLikeDescriptor).gh = function(index) {
        requireNonNegativeIndex(index, this.ah());
        return index.toString();
    };
    protoOf(MapLikeDescriptor).hh = function(name) {
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
    protoOf(MapLikeDescriptor).kh = function(index) {
        requireNonNegativeIndex(index, this.ah());
        return false;
    };
    protoOf(MapLikeDescriptor).ih = function(index) {
        requireNonNegativeIndex(index, this.ah());
        return emptyList();
    };
    protoOf(MapLikeDescriptor).jh = function(index) {
        requireNonNegativeIndex(index, this.ah());
        var tmp;
        switch (index % 2 | 0) {
          case 0:
            tmp = this.dk_1;
            break;

          case 1:
            tmp = this.ek_1;
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
        if (!(this.ah() === other.ah())) return false;
        if (!equals(this.dk_1, other.dk_1)) return false;
        if (!equals(this.ek_1, other.ek_1)) return false;
        return true;
    };
    protoOf(MapLikeDescriptor).hashCode = function() {
        var result = getStringHashCode(this.ah());
        result = imul(31, result) + hashCode_0(this.dk_1) | 0;
        result = imul(31, result) + hashCode_0(this.ek_1) | 0;
        return result;
    };
    protoOf(MapLikeDescriptor).toString = function() {
        return this.ah() + '(' + toString_1(this.dk_1) + ', ' + toString_1(this.ek_1) + ')';
    };
    function requireNonNegativeIndex(index, name) {
        if (index < 0) throw IndexOutOfBoundsException_init_$Create$_0('Illegal index ' + index + ', ' + name + ' expects only non-negative indices');
    }
    function PrimitiveArrayDescriptor(primitive) {
        ListLikeDescriptor.call(this, primitive);
        this.ik_1 = primitive.ah() + 'Array';
    }
    protoOf(PrimitiveArrayDescriptor).ah = function() {
        return this.ik_1;
    };
    function ArrayListSerializer(element) {
        CollectionSerializer.call(this, element);
        this.kk_1 = new ArrayListClassDesc(element.sg());
    }
    protoOf(ArrayListSerializer).sg = function() {
        return this.kk_1;
    };
    protoOf(ArrayListSerializer).lk = function(initialCapacityHint) {
        if (initialCapacityHint === -1) {
            return ArrayList_init_$Create$();
        }
        return ArrayList_init_$Create$_0(initialCapacityHint);
    };
    protoOf(ArrayListSerializer).mk = function(_this__u8e3s4) {
        return _this__u8e3s4.j();
    };
    protoOf(ArrayListSerializer).nk = function(_this__u8e3s4) {
        return this.mk(_this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE());
    };
    protoOf(ArrayListSerializer).ok = function(_this__u8e3s4) {
        return _this__u8e3s4;
    };
    protoOf(ArrayListSerializer).pk = function(_this__u8e3s4) {
        return this.ok(_this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE());
    };
    protoOf(ArrayListSerializer).qk = function(_this__u8e3s4, expectedSize) {
        if (_this__u8e3s4 instanceof ArrayList) {
            _this__u8e3s4.e4(expectedSize);
            return _this__u8e3s4;
        }
        if (expectedSize === _this__u8e3s4.j()) return ArrayList_init_$Create$_1(_this__u8e3s4);
        var this_0 = ArrayList_init_$Create$_0(expectedSize);
        this_0.q(_this__u8e3s4);
        return this_0;
    };
    protoOf(ArrayListSerializer).rk = function(_this__u8e3s4, expectedSize) {
        return this.qk((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtList) : false) ? _this__u8e3s4 : THROW_CCE(), expectedSize);
    };
    protoOf(ArrayListSerializer).sk = function(_this__u8e3s4, index, element) {
        _this__u8e3s4.l3(index, element);
    };
    protoOf(ArrayListSerializer).tk = function(_this__u8e3s4, index, element) {
        return this.sk(_this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE(), index, element);
    };
    function LinkedHashMapSerializer(kSerializer, vSerializer) {
        MapLikeSerializer.call(this, kSerializer, vSerializer);
        this.dl_1 = new LinkedHashMapClassDesc(kSerializer.sg(), vSerializer.sg());
    }
    protoOf(LinkedHashMapSerializer).sg = function() {
        return this.dl_1;
    };
    protoOf(LinkedHashMapSerializer).el = function(_this__u8e3s4) {
        return _this__u8e3s4.j();
    };
    protoOf(LinkedHashMapSerializer).fl = function(_this__u8e3s4) {
        return this.el((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtMap) : false) ? _this__u8e3s4 : THROW_CCE());
    };
    protoOf(LinkedHashMapSerializer).lk = function(initialCapacityHint) {
        if (initialCapacityHint === -1) return LinkedHashMap_init_$Create$();
        return newLinkedHashMap(initialCapacityHint);
    };
    protoOf(LinkedHashMapSerializer).gl = function(_this__u8e3s4) {
        return imul(_this__u8e3s4.j(), 2);
    };
    protoOf(LinkedHashMapSerializer).nk = function(_this__u8e3s4) {
        return this.gl(_this__u8e3s4 instanceof LinkedHashMap ? _this__u8e3s4 : THROW_CCE());
    };
    protoOf(LinkedHashMapSerializer).hl = function(_this__u8e3s4) {
        return _this__u8e3s4;
    };
    protoOf(LinkedHashMapSerializer).pk = function(_this__u8e3s4) {
        return this.hl(_this__u8e3s4 instanceof LinkedHashMap ? _this__u8e3s4 : THROW_CCE());
    };
    protoOf(LinkedHashMapSerializer).il = function(_this__u8e3s4, expectedSize) {
        if (_this__u8e3s4 instanceof LinkedHashMap) return _this__u8e3s4;
        if (expectedSize <= _this__u8e3s4.j()) return LinkedHashMap_init_$Create$_1(_this__u8e3s4);
        var this_0 = newLinkedHashMap(expectedSize);
        this_0.z1(_this__u8e3s4);
        return this_0;
    };
    protoOf(LinkedHashMapSerializer).rk = function(_this__u8e3s4, expectedSize) {
        return this.il((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, KtMap) : false) ? _this__u8e3s4 : THROW_CCE(), expectedSize);
    };
    function CollectionSerializer(element) {
        CollectionLikeSerializer.call(this, element);
    }
    protoOf(CollectionSerializer).vk = function(_this__u8e3s4) {
        return _this__u8e3s4.j();
    };
    protoOf(CollectionSerializer).fl = function(_this__u8e3s4) {
        return this.vk((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, Collection) : false) ? _this__u8e3s4 : THROW_CCE());
    };
    function MapLikeSerializer(keySerializer, valueSerializer) {
        AbstractCollectionSerializer.call(this);
        this.jl_1 = keySerializer;
        this.kl_1 = valueSerializer;
    }
    protoOf(MapLikeSerializer).ll = function(decoder, builder, startIndex, size) {
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
            this.ml(decoder, startIndex + index | 0, builder, false);
        } while (!(index === last));
    };
    protoOf(MapLikeSerializer).xk = function(decoder, builder, startIndex, size) {
        return this.ll(decoder, (!(builder == null) ? isInterface(builder, KtMutableMap) : false) ? builder : THROW_CCE(), startIndex, size);
    };
    protoOf(MapLikeSerializer).ml = function(decoder, index, builder, checkIndex) {
        var key = decoder.lj(this.sg(), index, this.jl_1);
        var tmp;
        if (checkIndex) {
            var this_0 = decoder.oj(this.sg());
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
            var tmp_2 = this.kl_1.sg().bh();
            tmp_1 = !(tmp_2 instanceof PrimitiveKind);
        } else {
            tmp_1 = false;
        }
        if (tmp_1) {
            tmp_0 = decoder.kj(this.sg(), vIndex, this.kl_1, getValue(builder, key));
        } else {
            tmp_0 = decoder.lj(this.sg(), vIndex, this.kl_1);
        }
        var value = tmp_0;
        builder.x1(key, value);
    };
    protoOf(MapLikeSerializer).yk = function(decoder, index, builder, checkIndex) {
        return this.ml(decoder, index, (!(builder == null) ? isInterface(builder, KtMutableMap) : false) ? builder : THROW_CCE(), checkIndex);
    };
    function newLinkedHashMap(expectedCapacity) {
        var capacity = estimateCapacityForHashMap(expectedCapacity);
        return LinkedHashMap_init_$Create$_0(capacity);
    }
    function CollectionLikeSerializer(elementSerializer) {
        AbstractCollectionSerializer.call(this);
        this.wk_1 = elementSerializer;
    }
    protoOf(CollectionLikeSerializer).xk = function(decoder, builder, startIndex, size) {
        if (!(size >= 0)) {
            var message = 'Size must be known in advance when using READ_ALL';
            throw IllegalArgumentException_init_$Create$_0(toString_1(message));
        }
        var inductionVariable = 0;
        if (inductionVariable < size) do {
            var index = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            this.yk(decoder, startIndex + index | 0, builder, false);
        } while (inductionVariable < size);
    };
    protoOf(CollectionLikeSerializer).yk = function(decoder, index, builder, checkIndex) {
        this.tk(builder, index, decoder.lj(this.sg(), index, this.wk_1));
    };
    function AbstractCollectionSerializer() {}
    protoOf(AbstractCollectionSerializer).al = function(decoder, previous) {
        var compositeDecoder = decoder.zi(this.sg());
        var expectedSize = compositeDecoder.pj(this.sg());
        if (!(expectedSize >= -1)) {
            var message = 'Decoded collection size should be either non-negative, or -1 (meaning, unknown). Was: ' + expectedSize;
            throw IllegalArgumentException_init_$Create$_0(toString_1(message));
        }
        var tmp;
        if (!(previous == null)) {
            tmp = this.rk(previous, this.fl(previous) + coerceAtLeast(expectedSize, 0) | 0);
        } else {
            tmp = this.lk(expectedSize);
        }
        var builder = tmp;
        var startIndex = this.nk(builder);
        if (compositeDecoder.nj()) {
            this.xk(compositeDecoder, builder, startIndex, expectedSize);
        } else {
            $l$loop: while (true) {
                var index = compositeDecoder.oj(this.sg());
                if (index === -1) break $l$loop;
                this.zk(compositeDecoder, startIndex + index | 0, builder);
            }
        }
        compositeDecoder.aj(this.sg());
        return this.pk(builder);
    };
    protoOf(AbstractCollectionSerializer).tg = function(decoder) {
        return this.al(decoder, null);
    };
    protoOf(AbstractCollectionSerializer).zk = function(decoder, index, builder, checkIndex, $super) {
        checkIndex = checkIndex === VOID ? true : checkIndex;
        var tmp;
        if ($super === VOID) {
            this.yk(decoder, index, builder, checkIndex);
            tmp = Unit_instance;
        } else {
            tmp = $super.yk.call(this, decoder, index, builder, checkIndex);
        }
        return tmp;
    };
    function PrimitiveArraySerializer(primitiveSerializer) {
        CollectionLikeSerializer.call(this, primitiveSerializer);
        this.ol_1 = new PrimitiveArrayDescriptor(primitiveSerializer.sg());
    }
    protoOf(PrimitiveArraySerializer).sg = function() {
        return this.ol_1;
    };
    protoOf(PrimitiveArraySerializer).pl = function(_this__u8e3s4) {
        return _this__u8e3s4.ql();
    };
    protoOf(PrimitiveArraySerializer).nk = function(_this__u8e3s4) {
        return this.pl(_this__u8e3s4 instanceof PrimitiveArrayBuilder ? _this__u8e3s4 : THROW_CCE());
    };
    protoOf(PrimitiveArraySerializer).rl = function(_this__u8e3s4) {
        return _this__u8e3s4.sl();
    };
    protoOf(PrimitiveArraySerializer).pk = function(_this__u8e3s4) {
        return this.rl(_this__u8e3s4 instanceof PrimitiveArrayBuilder ? _this__u8e3s4 : THROW_CCE());
    };
    protoOf(PrimitiveArraySerializer).tl = function(_this__u8e3s4, index, element) {
        var message = 'This method lead to boxing and must not be used, use Builder.append instead';
        throw IllegalStateException_init_$Create$_0(toString_1(message));
    };
    protoOf(PrimitiveArraySerializer).tk = function(_this__u8e3s4, index, element) {
        return this.tl(_this__u8e3s4 instanceof PrimitiveArrayBuilder ? _this__u8e3s4 : THROW_CCE(), index, element);
    };
    protoOf(PrimitiveArraySerializer).lk = function(initialCapacityHint) {
        if (initialCapacityHint === -1) return this.ul();
        return this.vl(initialCapacityHint);
    };
    protoOf(PrimitiveArraySerializer).tg = function(decoder) {
        return this.al(decoder, null);
    };
    function PrimitiveArrayBuilder() {}
    protoOf(PrimitiveArrayBuilder).yl = function(requiredCapacity, $super) {
        requiredCapacity = requiredCapacity === VOID ? this.ql() + 1 | 0 : requiredCapacity;
        var tmp;
        if ($super === VOID) {
            this.xl(requiredCapacity);
            tmp = Unit_instance;
        } else {
            tmp = $super.xl.call(this, requiredCapacity);
        }
        return tmp;
    };
    function Companion_20() {
        Companion_instance_20 = this;
        this.zl_1 = longArray(0);
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
            highMarks[get_lastIndex_1(highMarks)] = shiftLeft(new Long(-1, -1), elementsCount);
        }
        return highMarks;
    }
    function markHigh($this, index) {
        var slot = (index >>> 6 | 0) - 1 | 0;
        var offsetInSlot = index & 63;
        $this.dm_1[slot] = bitwiseOr($this.dm_1[slot], shiftLeft(new Long(1, 0), offsetInSlot));
    }
    function nextUnmarkedHighIndex($this) {
        var inductionVariable = 0;
        var last = $this.dm_1.length - 1 | 0;
        if (inductionVariable <= last) do {
            var slot = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var slotOffset = imul(slot + 1 | 0, 64);
            var slotMarks = $this.dm_1[slot];
            while (!equalsLong(slotMarks, new Long(-1, -1))) {
                var indexInSlot = countTrailingZeroBits(invert(slotMarks));
                slotMarks = bitwiseOr(slotMarks, shiftLeft(new Long(1, 0), indexInSlot));
                var index = slotOffset + indexInSlot | 0;
                if ($this.bm_1($this.am_1, index)) {
                    $this.dm_1[slot] = slotMarks;
                    return index;
                }
            }
            $this.dm_1[slot] = slotMarks;
        } while (inductionVariable <= last);
        return -1;
    }
    function ElementMarker(descriptor, readIfAbsent) {
        Companion_getInstance_20();
        this.am_1 = descriptor;
        this.bm_1 = readIfAbsent;
        var elementsCount = this.am_1.eh();
        if (elementsCount <= 64) {
            var tmp = this;
            var tmp_0;
            if (elementsCount === 64) {
                tmp_0 = new Long(0, 0);
            } else {
                tmp_0 = shiftLeft(new Long(-1, -1), elementsCount);
            }
            tmp.cm_1 = tmp_0;
            this.dm_1 = Companion_getInstance_20().zl_1;
        } else {
            this.cm_1 = new Long(0, 0);
            this.dm_1 = prepareHighMarksArray(this, elementsCount);
        }
    }
    protoOf(ElementMarker).em = function(index) {
        if (index < 64) {
            this.cm_1 = bitwiseOr(this.cm_1, shiftLeft(new Long(1, 0), index));
        } else {
            markHigh(this, index);
        }
    };
    protoOf(ElementMarker).fm = function() {
        var elementsCount = this.am_1.eh();
        while (!equalsLong(this.cm_1, new Long(-1, -1))) {
            var index = countTrailingZeroBits(invert(this.cm_1));
            this.cm_1 = bitwiseOr(this.cm_1, shiftLeft(new Long(1, 0), index));
            if (this.bm_1(this.am_1, index)) {
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
        this.sm_1 = true;
    }
    protoOf(InlineClassDescriptor).dh = function() {
        return this.sm_1;
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
            if (!(this.ah() === other.ah())) {
                tmp$ret$0 = false;
                break $l$block_5;
            }
            if (!(other.sm_1 && contentEquals(this.fn(), other.fn()))) {
                tmp$ret$0 = false;
                break $l$block_5;
            }
            if (!(this.eh() === other.eh())) {
                tmp$ret$0 = false;
                break $l$block_5;
            }
            var inductionVariable = 0;
            var last = this.eh();
            if (inductionVariable < last) do {
                var index = inductionVariable;
                inductionVariable = inductionVariable + 1 | 0;
                if (!(this.jh(index).ah() === other.jh(index).ah())) {
                    tmp$ret$0 = false;
                    break $l$block_5;
                }
                if (!equals(this.jh(index).bh(), other.jh(index).bh())) {
                    tmp$ret$0 = false;
                    break $l$block_5;
                }
            } while (inductionVariable < last);
            tmp$ret$0 = true;
        }
        return tmp$ret$0;
    };
    function InlinePrimitiveDescriptor$1($primitiveSerializer) {
        this.gn_1 = $primitiveSerializer;
    }
    protoOf(InlinePrimitiveDescriptor$1).hn = function() {
        return [ this.gn_1 ];
    };
    protoOf(InlinePrimitiveDescriptor$1).sg = function() {
        var message = 'unsupported';
        throw IllegalStateException_init_$Create$_0(toString_1(message));
    };
    protoOf(InlinePrimitiveDescriptor$1).tg = function(decoder) {
        var message = 'unsupported';
        throw IllegalStateException_init_$Create$_0(toString_1(message));
    };
    function missingFieldExceptionWithNewMessage(exception, message) {
        return exception.wg(message);
    }
    function error($this) {
        throw IllegalStateException_init_$Create$_0('Descriptor for type `kotlin.Nothing` does not have elements');
    }
    function NothingSerialDescriptor() {
        NothingSerialDescriptor_instance = this;
        this.jn_1 = OBJECT_getInstance();
        this.kn_1 = 'kotlin.Nothing';
    }
    protoOf(NothingSerialDescriptor).bh = function() {
        return this.jn_1;
    };
    protoOf(NothingSerialDescriptor).ah = function() {
        return this.kn_1;
    };
    protoOf(NothingSerialDescriptor).eh = function() {
        return 0;
    };
    protoOf(NothingSerialDescriptor).gh = function(index) {
        error(this);
    };
    protoOf(NothingSerialDescriptor).hh = function(name) {
        error(this);
    };
    protoOf(NothingSerialDescriptor).kh = function(index) {
        error(this);
    };
    protoOf(NothingSerialDescriptor).jh = function(index) {
        error(this);
    };
    protoOf(NothingSerialDescriptor).ih = function(index) {
        error(this);
    };
    protoOf(NothingSerialDescriptor).toString = function() {
        return 'NothingSerialDescriptor';
    };
    protoOf(NothingSerialDescriptor).equals = function(other) {
        return this === other;
    };
    protoOf(NothingSerialDescriptor).hashCode = function() {
        return getStringHashCode(this.kn_1) + imul(31, this.jn_1.hashCode()) | 0;
    };
    var NothingSerialDescriptor_instance;
    function NothingSerialDescriptor_getInstance() {
        if (NothingSerialDescriptor_instance == null) new NothingSerialDescriptor;
        return NothingSerialDescriptor_instance;
    }
    function SerialDescriptorForNullable() {}
    function ObjectSerializer$descriptor$delegate$lambda$lambda(this$0) {
        return function($this$buildSerialDescriptor) {
            $this$buildSerialDescriptor.qh_1 = this$0.mn_1;
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
            return p0.sg();
        }), 1, 0, 1);
    }
    function ObjectSerializer(serialName, objectInstance) {
        this.ln_1 = objectInstance;
        this.mn_1 = emptyList();
        var tmp = this;
        var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        tmp.nn_1 = lazy(tmp_0, ObjectSerializer$descriptor$delegate$lambda(serialName, this));
    }
    protoOf(ObjectSerializer).sg = function() {
        var tmp0 = this.nn_1;
        var tmp = KProperty1;
        getPropertyCallableRef('descriptor', 1, tmp, ObjectSerializer$_get_descriptor_$ref_7z4xb6(), null);
        return tmp0.q1();
    };
    protoOf(ObjectSerializer).tg = function(decoder) {
        var descriptor = this.sg();
        var composite = decoder.zi(descriptor);
        var tmp$ret$1;
        $l$block_0: {
            if (composite.nj()) {
                tmp$ret$1 = Unit_instance;
                break $l$block_0;
            }
            var index = composite.oj(this.sg());
            if (index === -1) {
                tmp$ret$1 = Unit_instance;
                break $l$block_0;
            } else throw SerializationException_init_$Create$_0('Unexpected index ' + index);
        }
        var result = tmp$ret$1;
        composite.aj(descriptor);
        return this.ln_1;
    };
    function get_EMPTY_DESCRIPTOR_ARRAY() {
        _init_properties_Platform_common_kt__3qzecs();
        return EMPTY_DESCRIPTOR_ARRAY;
    }
    var EMPTY_DESCRIPTOR_ARRAY;
    function compactArray(_this__u8e3s4) {
        _init_properties_Platform_common_kt__3qzecs();
        var tmp;
        if (!(_this__u8e3s4 == null || _this__u8e3s4.k())) {
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
        var tmp0 = $this.cn_1;
        var tmp = KProperty1;
        getPropertyCallableRef('childSerializers', 1, tmp, PluginGeneratedSerialDescriptor$_get_childSerializers_$ref_e7suca(), null);
        return tmp0.q1();
    }
    function _get__hashCode__tgwhef_0($this) {
        var tmp0 = $this.en_1;
        var tmp = KProperty1;
        getPropertyCallableRef('_hashCode', 1, tmp, PluginGeneratedSerialDescriptor$_get__hashCode_$ref_cmj4vz(), null);
        return tmp0.q1();
    }
    function PluginGeneratedSerialDescriptor$childSerializers$delegate$lambda(this$0) {
        return function() {
            var tmp0_safe_receiver = this$0.um_1;
            var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.hn();
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
            var tmp0_safe_receiver = this$0.um_1;
            var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.in();
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
                    var tmp$ret$2 = item.sg();
                    destination.f(tmp$ret$2);
                }
                tmp = destination;
            }
            return compactArray(tmp);
        };
    }
    function PluginGeneratedSerialDescriptor$_get_typeParameterDescriptors_$ref_jk3pka() {
        return constructCallableReference((function(p0) {
            return p0.fn();
        }), 1, 0, 3);
    }
    function PluginGeneratedSerialDescriptor$_hashCode$delegate$lambda(this$0) {
        return function() {
            return hashCodeImpl(this$0, this$0.fn());
        };
    }
    function PluginGeneratedSerialDescriptor$_get__hashCode_$ref_cmj4vz() {
        return constructCallableReference((function(p0) {
            return _get__hashCode__tgwhef_0(p0);
        }), 1, 0, 4);
    }
    function PluginGeneratedSerialDescriptor(serialName, generatedSerializer, elementsCount) {
        generatedSerializer = generatedSerializer === VOID ? null : generatedSerializer;
        this.tm_1 = serialName;
        this.um_1 = generatedSerializer;
        this.vm_1 = elementsCount;
        this.wm_1 = -1;
        var tmp = this;
        var tmp_0 = 0;
        var tmp_1 = this.vm_1;
        var tmp_2 = Array(tmp_1);
        while (tmp_0 < tmp_1) {
            tmp_2[tmp_0] = '[UNINITIALIZED]';
            tmp_0 = tmp_0 + 1 | 0;
        }
        tmp.xm_1 = tmp_2;
        var tmp_3 = this;
        var size = this.vm_1;
        tmp_3.ym_1 = Array(size);
        this.zm_1 = null;
        this.an_1 = booleanArray(this.vm_1);
        this.bn_1 = emptyMap();
        var tmp_4 = this;
        var tmp_5 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        tmp_4.cn_1 = lazy(tmp_5, PluginGeneratedSerialDescriptor$childSerializers$delegate$lambda(this));
        var tmp_6 = this;
        var tmp_7 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        tmp_6.dn_1 = lazy(tmp_7, PluginGeneratedSerialDescriptor$typeParameterDescriptors$delegate$lambda(this));
        var tmp_8 = this;
        var tmp_9 = LazyThreadSafetyMode_PUBLICATION_getInstance();
        tmp_8.en_1 = lazy(tmp_9, PluginGeneratedSerialDescriptor$_hashCode$delegate$lambda(this));
    }
    protoOf(PluginGeneratedSerialDescriptor).ah = function() {
        return this.tm_1;
    };
    protoOf(PluginGeneratedSerialDescriptor).eh = function() {
        return this.vm_1;
    };
    protoOf(PluginGeneratedSerialDescriptor).bh = function() {
        return CLASS_getInstance();
    };
    protoOf(PluginGeneratedSerialDescriptor).fh = function() {
        var tmp0_elvis_lhs = this.zm_1;
        return tmp0_elvis_lhs == null ? emptyList() : tmp0_elvis_lhs;
    };
    protoOf(PluginGeneratedSerialDescriptor).fn = function() {
        var tmp0 = this.dn_1;
        var tmp = KProperty1;
        getPropertyCallableRef('typeParameterDescriptors', 1, tmp, PluginGeneratedSerialDescriptor$_get_typeParameterDescriptors_$ref_jk3pka(), null);
        return tmp0.q1();
    };
    protoOf(PluginGeneratedSerialDescriptor).jh = function(index) {
        return getChecked(_get_childSerializers__7vnyfa(this), index).sg();
    };
    protoOf(PluginGeneratedSerialDescriptor).kh = function(index) {
        return getChecked_0(this.an_1, index);
    };
    protoOf(PluginGeneratedSerialDescriptor).ih = function(index) {
        var tmp0_elvis_lhs = getChecked(this.ym_1, index);
        return tmp0_elvis_lhs == null ? emptyList() : tmp0_elvis_lhs;
    };
    protoOf(PluginGeneratedSerialDescriptor).gh = function(index) {
        return getChecked(this.xm_1, index);
    };
    protoOf(PluginGeneratedSerialDescriptor).hh = function(name) {
        var tmp0_elvis_lhs = this.bn_1.t1(name);
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
            if (!(this.ah() === other.ah())) {
                tmp$ret$0 = false;
                break $l$block_5;
            }
            if (!contentEquals(this.fn(), other.fn())) {
                tmp$ret$0 = false;
                break $l$block_5;
            }
            if (!(this.eh() === other.eh())) {
                tmp$ret$0 = false;
                break $l$block_5;
            }
            var inductionVariable = 0;
            var last = this.eh();
            if (inductionVariable < last) do {
                var index = inductionVariable;
                inductionVariable = inductionVariable + 1 | 0;
                if (!(this.jh(index).ah() === other.jh(index).ah())) {
                    tmp$ret$0 = false;
                    break $l$block_5;
                }
                if (!equals(this.jh(index).bh(), other.jh(index).bh())) {
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
        var result = getStringHashCode(_this__u8e3s4.ah());
        result = imul(31, result) + contentHashCode(typeParams) | 0;
        var elementDescriptors = get_elementDescriptors(_this__u8e3s4);
        var accumulator = 1;
        var _iterator__ex2g4s = elementDescriptors.g();
        while (_iterator__ex2g4s.h()) {
            var element = _iterator__ex2g4s.i();
            var hash = accumulator;
            var tmp = imul(31, hash);
            var tmp0_safe_receiver = element.ah();
            var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : hashCode_0(tmp0_safe_receiver);
            accumulator = tmp + (tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs) | 0;
        }
        var namesHash = accumulator;
        var accumulator_0 = 1;
        var _iterator__ex2g4s_0 = elementDescriptors.g();
        while (_iterator__ex2g4s_0.h()) {
            var element_0 = _iterator__ex2g4s_0.i();
            var hash_0 = accumulator_0;
            var tmp_0 = imul(31, hash_0);
            var tmp0_safe_receiver_0 = element_0.bh();
            var tmp1_elvis_lhs_0 = tmp0_safe_receiver_0 == null ? null : hashCode_0(tmp0_safe_receiver_0);
            accumulator_0 = tmp_0 + (tmp1_elvis_lhs_0 == null ? 0 : tmp1_elvis_lhs_0) | 0;
        }
        var kindHash = accumulator_0;
        result = imul(31, result) + namesHash | 0;
        result = imul(31, result) + kindHash | 0;
        return result;
    }
    function toStringImpl_0(_this__u8e3s4) {
        var tmp = until(0, _this__u8e3s4.eh());
        var tmp_0 = _this__u8e3s4.ah() + '(';
        return joinToString_0(tmp, ', ', tmp_0, ')', VOID, VOID, toStringImpl$lambda(_this__u8e3s4));
    }
    function toStringImpl$lambda($this_toStringImpl) {
        return function(i) {
            return $this_toStringImpl.gh(i) + ': ' + $this_toStringImpl.jh(i).ah();
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
    protoOf(CharArraySerializer_0).qn = function(_this__u8e3s4) {
        return _this__u8e3s4.length;
    };
    protoOf(CharArraySerializer_0).fl = function(_this__u8e3s4) {
        return this.qn((!(_this__u8e3s4 == null) ? isCharArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
    };
    protoOf(CharArraySerializer_0).rn = function(_this__u8e3s4, expectedSize) {
        if (expectedSize === _this__u8e3s4.length) return CharArrayBuilder_init_$Create$(_this__u8e3s4);
        return new CharArrayBuilder(copyOf_1(_this__u8e3s4, expectedSize), _this__u8e3s4.length);
    };
    protoOf(CharArraySerializer_0).rk = function(_this__u8e3s4, expectedSize) {
        return this.rn((!(_this__u8e3s4 == null) ? isCharArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE(), expectedSize);
    };
    protoOf(CharArraySerializer_0).vl = function(size) {
        return CharArrayBuilder_init_$Create$_0(size);
    };
    protoOf(CharArraySerializer_0).ul = function() {
        return CharArrayBuilder_init_$Create$_1();
    };
    protoOf(CharArraySerializer_0).sn = function(decoder, index, builder, checkIndex) {
        builder.vn(decoder.ij(this.ol_1, index));
    };
    protoOf(CharArraySerializer_0).yk = function(decoder, index, builder, checkIndex) {
        return this.sn(decoder, index, builder instanceof CharArrayBuilder ? builder : THROW_CCE(), checkIndex);
    };
    protoOf(CharArraySerializer_0).wl = function(decoder, index, builder, checkIndex) {
        return this.sn(decoder, index, builder instanceof CharArrayBuilder ? builder : THROW_CCE(), checkIndex);
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
    protoOf(DoubleArraySerializer_0).yn = function(_this__u8e3s4) {
        return _this__u8e3s4.length;
    };
    protoOf(DoubleArraySerializer_0).fl = function(_this__u8e3s4) {
        return this.yn((!(_this__u8e3s4 == null) ? isDoubleArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
    };
    protoOf(DoubleArraySerializer_0).zn = function(_this__u8e3s4, expectedSize) {
        if (expectedSize === _this__u8e3s4.length) return DoubleArrayBuilder_init_$Create$(_this__u8e3s4);
        return new DoubleArrayBuilder(copyOf_2(_this__u8e3s4, expectedSize), _this__u8e3s4.length);
    };
    protoOf(DoubleArraySerializer_0).rk = function(_this__u8e3s4, expectedSize) {
        return this.zn((!(_this__u8e3s4 == null) ? isDoubleArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE(), expectedSize);
    };
    protoOf(DoubleArraySerializer_0).vl = function(size) {
        return DoubleArrayBuilder_init_$Create$_0(size);
    };
    protoOf(DoubleArraySerializer_0).ul = function() {
        return DoubleArrayBuilder_init_$Create$_1();
    };
    protoOf(DoubleArraySerializer_0).ao = function(decoder, index, builder, checkIndex) {
        builder.do(decoder.hj(this.ol_1, index));
    };
    protoOf(DoubleArraySerializer_0).yk = function(decoder, index, builder, checkIndex) {
        return this.ao(decoder, index, builder instanceof DoubleArrayBuilder ? builder : THROW_CCE(), checkIndex);
    };
    protoOf(DoubleArraySerializer_0).wl = function(decoder, index, builder, checkIndex) {
        return this.ao(decoder, index, builder instanceof DoubleArrayBuilder ? builder : THROW_CCE(), checkIndex);
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
    protoOf(FloatArraySerializer_0).go = function(_this__u8e3s4) {
        return _this__u8e3s4.length;
    };
    protoOf(FloatArraySerializer_0).fl = function(_this__u8e3s4) {
        return this.go((!(_this__u8e3s4 == null) ? isFloatArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
    };
    protoOf(FloatArraySerializer_0).ho = function(_this__u8e3s4, expectedSize) {
        if (expectedSize === _this__u8e3s4.length) return FloatArrayBuilder_init_$Create$(_this__u8e3s4);
        return new FloatArrayBuilder(copyOf_3(_this__u8e3s4, expectedSize), _this__u8e3s4.length);
    };
    protoOf(FloatArraySerializer_0).rk = function(_this__u8e3s4, expectedSize) {
        return this.ho((!(_this__u8e3s4 == null) ? isFloatArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE(), expectedSize);
    };
    protoOf(FloatArraySerializer_0).vl = function(size) {
        return FloatArrayBuilder_init_$Create$_0(size);
    };
    protoOf(FloatArraySerializer_0).ul = function() {
        return FloatArrayBuilder_init_$Create$_1();
    };
    protoOf(FloatArraySerializer_0).io = function(decoder, index, builder, checkIndex) {
        builder.lo(decoder.gj(this.ol_1, index));
    };
    protoOf(FloatArraySerializer_0).yk = function(decoder, index, builder, checkIndex) {
        return this.io(decoder, index, builder instanceof FloatArrayBuilder ? builder : THROW_CCE(), checkIndex);
    };
    protoOf(FloatArraySerializer_0).wl = function(decoder, index, builder, checkIndex) {
        return this.io(decoder, index, builder instanceof FloatArrayBuilder ? builder : THROW_CCE(), checkIndex);
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
    protoOf(LongArraySerializer_0).oo = function(_this__u8e3s4) {
        return _this__u8e3s4.length;
    };
    protoOf(LongArraySerializer_0).fl = function(_this__u8e3s4) {
        return this.oo((!(_this__u8e3s4 == null) ? isLongArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
    };
    protoOf(LongArraySerializer_0).po = function(_this__u8e3s4, expectedSize) {
        if (expectedSize === _this__u8e3s4.length) return LongArrayBuilder_init_$Create$(_this__u8e3s4);
        return new LongArrayBuilder(copyOf_4(_this__u8e3s4, expectedSize), _this__u8e3s4.length);
    };
    protoOf(LongArraySerializer_0).rk = function(_this__u8e3s4, expectedSize) {
        return this.po((!(_this__u8e3s4 == null) ? isLongArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE(), expectedSize);
    };
    protoOf(LongArraySerializer_0).vl = function(size) {
        return LongArrayBuilder_init_$Create$_0(size);
    };
    protoOf(LongArraySerializer_0).ul = function() {
        return LongArrayBuilder_init_$Create$_1();
    };
    protoOf(LongArraySerializer_0).qo = function(decoder, index, builder, checkIndex) {
        builder.to(decoder.fj(this.ol_1, index));
    };
    protoOf(LongArraySerializer_0).yk = function(decoder, index, builder, checkIndex) {
        return this.qo(decoder, index, builder instanceof LongArrayBuilder ? builder : THROW_CCE(), checkIndex);
    };
    protoOf(LongArraySerializer_0).wl = function(decoder, index, builder, checkIndex) {
        return this.qo(decoder, index, builder instanceof LongArrayBuilder ? builder : THROW_CCE(), checkIndex);
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
    protoOf(ULongArraySerializer_0).wo = function(_this__u8e3s4) {
        return _ULongArray___get_size__impl__ju6dtr(_this__u8e3s4);
    };
    protoOf(ULongArraySerializer_0).fl = function(_this__u8e3s4) {
        return this.wo(_this__u8e3s4 instanceof ULongArray ? _this__u8e3s4.fg_1 : THROW_CCE());
    };
    protoOf(ULongArraySerializer_0).xo = function(_this__u8e3s4, expectedSize) {
        if (expectedSize === _ULongArray___get_size__impl__ju6dtr(_this__u8e3s4)) return ULongArrayBuilder_init_$Create$(_this__u8e3s4);
        var tmp$ret$0 = _ULongArray___init__impl__twm1l3(copyOf_4(_ULongArray___get_storage__impl__28e64j(_this__u8e3s4), expectedSize));
        return new ULongArrayBuilder(tmp$ret$0, _ULongArray___get_size__impl__ju6dtr(_this__u8e3s4));
    };
    protoOf(ULongArraySerializer_0).rk = function(_this__u8e3s4, expectedSize) {
        return this.xo(_this__u8e3s4 instanceof ULongArray ? _this__u8e3s4.fg_1 : THROW_CCE(), expectedSize);
    };
    protoOf(ULongArraySerializer_0).vl = function(size) {
        return ULongArrayBuilder_init_$Create$_0(size);
    };
    protoOf(ULongArraySerializer_0).ul = function() {
        return ULongArrayBuilder_init_$Create$_1();
    };
    protoOf(ULongArraySerializer_0).yo = function(decoder, index, builder, checkIndex) {
        var this_0 = decoder.jj(this.ol_1, index).ri();
        var tmp$ret$0 = _ULong___init__impl__c78o9k(this_0);
        builder.bp(tmp$ret$0);
    };
    protoOf(ULongArraySerializer_0).yk = function(decoder, index, builder, checkIndex) {
        return this.yo(decoder, index, builder instanceof ULongArrayBuilder ? builder : THROW_CCE(), checkIndex);
    };
    protoOf(ULongArraySerializer_0).wl = function(decoder, index, builder, checkIndex) {
        return this.yo(decoder, index, builder instanceof ULongArrayBuilder ? builder : THROW_CCE(), checkIndex);
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
    protoOf(IntArraySerializer_0).ep = function(_this__u8e3s4) {
        return _this__u8e3s4.length;
    };
    protoOf(IntArraySerializer_0).fl = function(_this__u8e3s4) {
        return this.ep((!(_this__u8e3s4 == null) ? isIntArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
    };
    protoOf(IntArraySerializer_0).fp = function(_this__u8e3s4, expectedSize) {
        if (expectedSize === _this__u8e3s4.length) return IntArrayBuilder_init_$Create$(_this__u8e3s4);
        return new IntArrayBuilder(copyOf(_this__u8e3s4, expectedSize), _this__u8e3s4.length);
    };
    protoOf(IntArraySerializer_0).rk = function(_this__u8e3s4, expectedSize) {
        return this.fp((!(_this__u8e3s4 == null) ? isIntArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE(), expectedSize);
    };
    protoOf(IntArraySerializer_0).vl = function(size) {
        return IntArrayBuilder_init_$Create$_0(size);
    };
    protoOf(IntArraySerializer_0).ul = function() {
        return IntArrayBuilder_init_$Create$_1();
    };
    protoOf(IntArraySerializer_0).gp = function(decoder, index, builder, checkIndex) {
        builder.jp(decoder.ej(this.ol_1, index));
    };
    protoOf(IntArraySerializer_0).yk = function(decoder, index, builder, checkIndex) {
        return this.gp(decoder, index, builder instanceof IntArrayBuilder ? builder : THROW_CCE(), checkIndex);
    };
    protoOf(IntArraySerializer_0).wl = function(decoder, index, builder, checkIndex) {
        return this.gp(decoder, index, builder instanceof IntArrayBuilder ? builder : THROW_CCE(), checkIndex);
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
    protoOf(UIntArraySerializer_0).mp = function(_this__u8e3s4) {
        return _UIntArray___get_size__impl__r6l8ci(_this__u8e3s4);
    };
    protoOf(UIntArraySerializer_0).fl = function(_this__u8e3s4) {
        return this.mp(_this__u8e3s4 instanceof UIntArray ? _this__u8e3s4.uf_1 : THROW_CCE());
    };
    protoOf(UIntArraySerializer_0).np = function(_this__u8e3s4, expectedSize) {
        if (expectedSize === _UIntArray___get_size__impl__r6l8ci(_this__u8e3s4)) return UIntArrayBuilder_init_$Create$(_this__u8e3s4);
        var tmp$ret$0 = _UIntArray___init__impl__ghjpc6(copyOf(_UIntArray___get_storage__impl__92a0v0(_this__u8e3s4), expectedSize));
        return new UIntArrayBuilder(tmp$ret$0, _UIntArray___get_size__impl__r6l8ci(_this__u8e3s4));
    };
    protoOf(UIntArraySerializer_0).rk = function(_this__u8e3s4, expectedSize) {
        return this.np(_this__u8e3s4 instanceof UIntArray ? _this__u8e3s4.uf_1 : THROW_CCE(), expectedSize);
    };
    protoOf(UIntArraySerializer_0).vl = function(size) {
        return UIntArrayBuilder_init_$Create$_0(size);
    };
    protoOf(UIntArraySerializer_0).ul = function() {
        return UIntArrayBuilder_init_$Create$_1();
    };
    protoOf(UIntArraySerializer_0).op = function(decoder, index, builder, checkIndex) {
        var this_0 = decoder.jj(this.ol_1, index).qi();
        var tmp$ret$0 = _UInt___init__impl__l7qpdl(this_0);
        builder.rp(tmp$ret$0);
    };
    protoOf(UIntArraySerializer_0).yk = function(decoder, index, builder, checkIndex) {
        return this.op(decoder, index, builder instanceof UIntArrayBuilder ? builder : THROW_CCE(), checkIndex);
    };
    protoOf(UIntArraySerializer_0).wl = function(decoder, index, builder, checkIndex) {
        return this.op(decoder, index, builder instanceof UIntArrayBuilder ? builder : THROW_CCE(), checkIndex);
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
    protoOf(ShortArraySerializer_0).up = function(_this__u8e3s4) {
        return _this__u8e3s4.length;
    };
    protoOf(ShortArraySerializer_0).fl = function(_this__u8e3s4) {
        return this.up((!(_this__u8e3s4 == null) ? isShortArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
    };
    protoOf(ShortArraySerializer_0).vp = function(_this__u8e3s4, expectedSize) {
        if (expectedSize === _this__u8e3s4.length) return ShortArrayBuilder_init_$Create$(_this__u8e3s4);
        return new ShortArrayBuilder(copyOf_5(_this__u8e3s4, expectedSize), _this__u8e3s4.length);
    };
    protoOf(ShortArraySerializer_0).rk = function(_this__u8e3s4, expectedSize) {
        return this.vp((!(_this__u8e3s4 == null) ? isShortArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE(), expectedSize);
    };
    protoOf(ShortArraySerializer_0).vl = function(size) {
        return ShortArrayBuilder_init_$Create$_0(size);
    };
    protoOf(ShortArraySerializer_0).ul = function() {
        return ShortArrayBuilder_init_$Create$_1();
    };
    protoOf(ShortArraySerializer_0).wp = function(decoder, index, builder, checkIndex) {
        builder.zp(decoder.dj(this.ol_1, index));
    };
    protoOf(ShortArraySerializer_0).yk = function(decoder, index, builder, checkIndex) {
        return this.wp(decoder, index, builder instanceof ShortArrayBuilder ? builder : THROW_CCE(), checkIndex);
    };
    protoOf(ShortArraySerializer_0).wl = function(decoder, index, builder, checkIndex) {
        return this.wp(decoder, index, builder instanceof ShortArrayBuilder ? builder : THROW_CCE(), checkIndex);
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
    protoOf(UShortArraySerializer_0).cq = function(_this__u8e3s4) {
        return _UShortArray___get_size__impl__jqto1b(_this__u8e3s4);
    };
    protoOf(UShortArraySerializer_0).fl = function(_this__u8e3s4) {
        return this.cq(_this__u8e3s4 instanceof UShortArray ? _this__u8e3s4.qg_1 : THROW_CCE());
    };
    protoOf(UShortArraySerializer_0).dq = function(_this__u8e3s4, expectedSize) {
        if (expectedSize === _UShortArray___get_size__impl__jqto1b(_this__u8e3s4)) return UShortArrayBuilder_init_$Create$(_this__u8e3s4);
        var tmp$ret$0 = _UShortArray___init__impl__9b26ef(copyOf_5(_UShortArray___get_storage__impl__t2jpv5(_this__u8e3s4), expectedSize));
        return new UShortArrayBuilder(tmp$ret$0, _UShortArray___get_size__impl__jqto1b(_this__u8e3s4));
    };
    protoOf(UShortArraySerializer_0).rk = function(_this__u8e3s4, expectedSize) {
        return this.dq(_this__u8e3s4 instanceof UShortArray ? _this__u8e3s4.qg_1 : THROW_CCE(), expectedSize);
    };
    protoOf(UShortArraySerializer_0).vl = function(size) {
        return UShortArrayBuilder_init_$Create$_0(size);
    };
    protoOf(UShortArraySerializer_0).ul = function() {
        return UShortArrayBuilder_init_$Create$_1();
    };
    protoOf(UShortArraySerializer_0).eq = function(decoder, index, builder, checkIndex) {
        var this_0 = decoder.jj(this.ol_1, index).pi();
        var tmp$ret$0 = _UShort___init__impl__jigrne(this_0);
        builder.hq(tmp$ret$0);
    };
    protoOf(UShortArraySerializer_0).yk = function(decoder, index, builder, checkIndex) {
        return this.eq(decoder, index, builder instanceof UShortArrayBuilder ? builder : THROW_CCE(), checkIndex);
    };
    protoOf(UShortArraySerializer_0).wl = function(decoder, index, builder, checkIndex) {
        return this.eq(decoder, index, builder instanceof UShortArrayBuilder ? builder : THROW_CCE(), checkIndex);
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
    protoOf(ByteArraySerializer_0).kq = function(_this__u8e3s4) {
        return _this__u8e3s4.length;
    };
    protoOf(ByteArraySerializer_0).fl = function(_this__u8e3s4) {
        return this.kq((!(_this__u8e3s4 == null) ? isByteArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
    };
    protoOf(ByteArraySerializer_0).lq = function(_this__u8e3s4, expectedSize) {
        if (expectedSize === _this__u8e3s4.length) return ByteArrayBuilder_init_$Create$(_this__u8e3s4);
        return new ByteArrayBuilder(copyOf_6(_this__u8e3s4, expectedSize), _this__u8e3s4.length);
    };
    protoOf(ByteArraySerializer_0).rk = function(_this__u8e3s4, expectedSize) {
        return this.lq((!(_this__u8e3s4 == null) ? isByteArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE(), expectedSize);
    };
    protoOf(ByteArraySerializer_0).vl = function(size) {
        return ByteArrayBuilder_init_$Create$_0(size);
    };
    protoOf(ByteArraySerializer_0).ul = function() {
        return ByteArrayBuilder_init_$Create$_1();
    };
    protoOf(ByteArraySerializer_0).mq = function(decoder, index, builder, checkIndex) {
        builder.pq(decoder.cj(this.ol_1, index));
    };
    protoOf(ByteArraySerializer_0).yk = function(decoder, index, builder, checkIndex) {
        return this.mq(decoder, index, builder instanceof ByteArrayBuilder ? builder : THROW_CCE(), checkIndex);
    };
    protoOf(ByteArraySerializer_0).wl = function(decoder, index, builder, checkIndex) {
        return this.mq(decoder, index, builder instanceof ByteArrayBuilder ? builder : THROW_CCE(), checkIndex);
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
    protoOf(UByteArraySerializer_0).sq = function(_this__u8e3s4) {
        return _UByteArray___get_size__impl__h6pkdv(_this__u8e3s4);
    };
    protoOf(UByteArraySerializer_0).fl = function(_this__u8e3s4) {
        return this.sq(_this__u8e3s4 instanceof UByteArray ? _this__u8e3s4.jf_1 : THROW_CCE());
    };
    protoOf(UByteArraySerializer_0).tq = function(_this__u8e3s4, expectedSize) {
        if (expectedSize === _UByteArray___get_size__impl__h6pkdv(_this__u8e3s4)) return UByteArrayBuilder_init_$Create$(_this__u8e3s4);
        var tmp$ret$0 = _UByteArray___init__impl__ip4y9n(copyOf_6(_UByteArray___get_storage__impl__d4kctt(_this__u8e3s4), expectedSize));
        return new UByteArrayBuilder(tmp$ret$0, _UByteArray___get_size__impl__h6pkdv(_this__u8e3s4));
    };
    protoOf(UByteArraySerializer_0).rk = function(_this__u8e3s4, expectedSize) {
        return this.tq(_this__u8e3s4 instanceof UByteArray ? _this__u8e3s4.jf_1 : THROW_CCE(), expectedSize);
    };
    protoOf(UByteArraySerializer_0).vl = function(size) {
        return UByteArrayBuilder_init_$Create$_0(size);
    };
    protoOf(UByteArraySerializer_0).ul = function() {
        return UByteArrayBuilder_init_$Create$_1();
    };
    protoOf(UByteArraySerializer_0).uq = function(decoder, index, builder, checkIndex) {
        var this_0 = decoder.jj(this.ol_1, index).oi();
        var tmp$ret$0 = _UByte___init__impl__g9hnc4(this_0);
        builder.xq(tmp$ret$0);
    };
    protoOf(UByteArraySerializer_0).yk = function(decoder, index, builder, checkIndex) {
        return this.uq(decoder, index, builder instanceof UByteArrayBuilder ? builder : THROW_CCE(), checkIndex);
    };
    protoOf(UByteArraySerializer_0).wl = function(decoder, index, builder, checkIndex) {
        return this.uq(decoder, index, builder instanceof UByteArrayBuilder ? builder : THROW_CCE(), checkIndex);
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
    protoOf(BooleanArraySerializer_0).ar = function(_this__u8e3s4) {
        return _this__u8e3s4.length;
    };
    protoOf(BooleanArraySerializer_0).fl = function(_this__u8e3s4) {
        return this.ar((!(_this__u8e3s4 == null) ? isBooleanArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
    };
    protoOf(BooleanArraySerializer_0).br = function(_this__u8e3s4, expectedSize) {
        if (expectedSize === _this__u8e3s4.length) return BooleanArrayBuilder_init_$Create$(_this__u8e3s4);
        return new BooleanArrayBuilder(copyOf_7(_this__u8e3s4, expectedSize), _this__u8e3s4.length);
    };
    protoOf(BooleanArraySerializer_0).rk = function(_this__u8e3s4, expectedSize) {
        return this.br((!(_this__u8e3s4 == null) ? isBooleanArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE(), expectedSize);
    };
    protoOf(BooleanArraySerializer_0).vl = function(size) {
        return BooleanArrayBuilder_init_$Create$_0(size);
    };
    protoOf(BooleanArraySerializer_0).ul = function() {
        return BooleanArrayBuilder_init_$Create$_1();
    };
    protoOf(BooleanArraySerializer_0).cr = function(decoder, index, builder, checkIndex) {
        builder.fr(decoder.bj(this.ol_1, index));
    };
    protoOf(BooleanArraySerializer_0).yk = function(decoder, index, builder, checkIndex) {
        return this.cr(decoder, index, builder instanceof BooleanArrayBuilder ? builder : THROW_CCE(), checkIndex);
    };
    protoOf(BooleanArraySerializer_0).wl = function(decoder, index, builder, checkIndex) {
        return this.cr(decoder, index, builder instanceof BooleanArrayBuilder ? builder : THROW_CCE(), checkIndex);
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
        this.tn_1 = bufferWithData;
        this.un_1 = initialPosition;
    }
    protoOf(CharArrayBuilder).ql = function() {
        return this.un_1;
    };
    protoOf(CharArrayBuilder).xl = function(requiredCapacity) {
        if (this.tn_1.length < requiredCapacity) this.tn_1 = copyOf_1(this.tn_1, coerceAtLeast(requiredCapacity, imul(this.tn_1.length, 2)));
    };
    protoOf(CharArrayBuilder).vn = function(c) {
        this.yl();
        var tmp = this.tn_1;
        var _unary__edvuaz = this.un_1;
        this.un_1 = _unary__edvuaz + 1 | 0;
        tmp[_unary__edvuaz] = c;
    };
    protoOf(CharArrayBuilder).sl = function() {
        return copyOf_1(this.tn_1, this.un_1);
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
        this.bo_1 = bufferWithData;
        this.co_1 = initialPosition;
    }
    protoOf(DoubleArrayBuilder).ql = function() {
        return this.co_1;
    };
    protoOf(DoubleArrayBuilder).xl = function(requiredCapacity) {
        if (this.bo_1.length < requiredCapacity) this.bo_1 = copyOf_2(this.bo_1, coerceAtLeast(requiredCapacity, imul(this.bo_1.length, 2)));
    };
    protoOf(DoubleArrayBuilder).do = function(c) {
        this.yl();
        var tmp = this.bo_1;
        var _unary__edvuaz = this.co_1;
        this.co_1 = _unary__edvuaz + 1 | 0;
        tmp[_unary__edvuaz] = c;
    };
    protoOf(DoubleArrayBuilder).sl = function() {
        return copyOf_2(this.bo_1, this.co_1);
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
        this.jo_1 = bufferWithData;
        this.ko_1 = initialPosition;
    }
    protoOf(FloatArrayBuilder).ql = function() {
        return this.ko_1;
    };
    protoOf(FloatArrayBuilder).xl = function(requiredCapacity) {
        if (this.jo_1.length < requiredCapacity) this.jo_1 = copyOf_3(this.jo_1, coerceAtLeast(requiredCapacity, imul(this.jo_1.length, 2)));
    };
    protoOf(FloatArrayBuilder).lo = function(c) {
        this.yl();
        var tmp = this.jo_1;
        var _unary__edvuaz = this.ko_1;
        this.ko_1 = _unary__edvuaz + 1 | 0;
        tmp[_unary__edvuaz] = c;
    };
    protoOf(FloatArrayBuilder).sl = function() {
        return copyOf_3(this.jo_1, this.ko_1);
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
        this.ro_1 = bufferWithData;
        this.so_1 = initialPosition;
    }
    protoOf(LongArrayBuilder).ql = function() {
        return this.so_1;
    };
    protoOf(LongArrayBuilder).xl = function(requiredCapacity) {
        if (this.ro_1.length < requiredCapacity) this.ro_1 = copyOf_4(this.ro_1, coerceAtLeast(requiredCapacity, imul(this.ro_1.length, 2)));
    };
    protoOf(LongArrayBuilder).to = function(c) {
        this.yl();
        var tmp = this.ro_1;
        var _unary__edvuaz = this.so_1;
        this.so_1 = _unary__edvuaz + 1 | 0;
        tmp[_unary__edvuaz] = c;
    };
    protoOf(LongArrayBuilder).sl = function() {
        return copyOf_4(this.ro_1, this.so_1);
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
        this.zo_1 = bufferWithData;
        this.ap_1 = initialPosition;
    }
    protoOf(ULongArrayBuilder).ql = function() {
        return this.ap_1;
    };
    protoOf(ULongArrayBuilder).xl = function(requiredCapacity) {
        if (_ULongArray___get_size__impl__ju6dtr(this.zo_1) < requiredCapacity) {
            var tmp = this;
            var tmp0 = this.zo_1;
            var newSize = coerceAtLeast(requiredCapacity, imul(_ULongArray___get_size__impl__ju6dtr(this.zo_1), 2));
            tmp.zo_1 = _ULongArray___init__impl__twm1l3(copyOf_4(_ULongArray___get_storage__impl__28e64j(tmp0), newSize));
        }
    };
    protoOf(ULongArrayBuilder).bp = function(c) {
        this.yl();
        var tmp = this.zo_1;
        var _unary__edvuaz = this.ap_1;
        this.ap_1 = _unary__edvuaz + 1 | 0;
        ULongArray__set_impl_z19mvh(tmp, _unary__edvuaz, c);
    };
    protoOf(ULongArrayBuilder).gr = function() {
        var tmp0 = this.zo_1;
        var newSize = this.ap_1;
        return _ULongArray___init__impl__twm1l3(copyOf_4(_ULongArray___get_storage__impl__28e64j(tmp0), newSize));
    };
    protoOf(ULongArrayBuilder).sl = function() {
        return new ULongArray(this.gr());
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
        this.hp_1 = bufferWithData;
        this.ip_1 = initialPosition;
    }
    protoOf(IntArrayBuilder).ql = function() {
        return this.ip_1;
    };
    protoOf(IntArrayBuilder).xl = function(requiredCapacity) {
        if (this.hp_1.length < requiredCapacity) this.hp_1 = copyOf(this.hp_1, coerceAtLeast(requiredCapacity, imul(this.hp_1.length, 2)));
    };
    protoOf(IntArrayBuilder).jp = function(c) {
        this.yl();
        var tmp = this.hp_1;
        var _unary__edvuaz = this.ip_1;
        this.ip_1 = _unary__edvuaz + 1 | 0;
        tmp[_unary__edvuaz] = c;
    };
    protoOf(IntArrayBuilder).sl = function() {
        return copyOf(this.hp_1, this.ip_1);
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
        this.pp_1 = bufferWithData;
        this.qp_1 = initialPosition;
    }
    protoOf(UIntArrayBuilder).ql = function() {
        return this.qp_1;
    };
    protoOf(UIntArrayBuilder).xl = function(requiredCapacity) {
        if (_UIntArray___get_size__impl__r6l8ci(this.pp_1) < requiredCapacity) {
            var tmp = this;
            var tmp0 = this.pp_1;
            var newSize = coerceAtLeast(requiredCapacity, imul(_UIntArray___get_size__impl__r6l8ci(this.pp_1), 2));
            tmp.pp_1 = _UIntArray___init__impl__ghjpc6(copyOf(_UIntArray___get_storage__impl__92a0v0(tmp0), newSize));
        }
    };
    protoOf(UIntArrayBuilder).rp = function(c) {
        this.yl();
        var tmp = this.pp_1;
        var _unary__edvuaz = this.qp_1;
        this.qp_1 = _unary__edvuaz + 1 | 0;
        UIntArray__set_impl_7f2zu2(tmp, _unary__edvuaz, c);
    };
    protoOf(UIntArrayBuilder).hr = function() {
        var tmp0 = this.pp_1;
        var newSize = this.qp_1;
        return _UIntArray___init__impl__ghjpc6(copyOf(_UIntArray___get_storage__impl__92a0v0(tmp0), newSize));
    };
    protoOf(UIntArrayBuilder).sl = function() {
        return new UIntArray(this.hr());
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
        this.xp_1 = bufferWithData;
        this.yp_1 = initialPosition;
    }
    protoOf(ShortArrayBuilder).ql = function() {
        return this.yp_1;
    };
    protoOf(ShortArrayBuilder).xl = function(requiredCapacity) {
        if (this.xp_1.length < requiredCapacity) this.xp_1 = copyOf_5(this.xp_1, coerceAtLeast(requiredCapacity, imul(this.xp_1.length, 2)));
    };
    protoOf(ShortArrayBuilder).zp = function(c) {
        this.yl();
        var tmp = this.xp_1;
        var _unary__edvuaz = this.yp_1;
        this.yp_1 = _unary__edvuaz + 1 | 0;
        tmp[_unary__edvuaz] = c;
    };
    protoOf(ShortArrayBuilder).sl = function() {
        return copyOf_5(this.xp_1, this.yp_1);
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
        this.fq_1 = bufferWithData;
        this.gq_1 = initialPosition;
    }
    protoOf(UShortArrayBuilder).ql = function() {
        return this.gq_1;
    };
    protoOf(UShortArrayBuilder).xl = function(requiredCapacity) {
        if (_UShortArray___get_size__impl__jqto1b(this.fq_1) < requiredCapacity) {
            var tmp = this;
            var tmp0 = this.fq_1;
            var newSize = coerceAtLeast(requiredCapacity, imul(_UShortArray___get_size__impl__jqto1b(this.fq_1), 2));
            tmp.fq_1 = _UShortArray___init__impl__9b26ef(copyOf_5(_UShortArray___get_storage__impl__t2jpv5(tmp0), newSize));
        }
    };
    protoOf(UShortArrayBuilder).hq = function(c) {
        this.yl();
        var tmp = this.fq_1;
        var _unary__edvuaz = this.gq_1;
        this.gq_1 = _unary__edvuaz + 1 | 0;
        UShortArray__set_impl_6d8whp(tmp, _unary__edvuaz, c);
    };
    protoOf(UShortArrayBuilder).ir = function() {
        var tmp0 = this.fq_1;
        var newSize = this.gq_1;
        return _UShortArray___init__impl__9b26ef(copyOf_5(_UShortArray___get_storage__impl__t2jpv5(tmp0), newSize));
    };
    protoOf(UShortArrayBuilder).sl = function() {
        return new UShortArray(this.ir());
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
        this.nq_1 = bufferWithData;
        this.oq_1 = initialPosition;
    }
    protoOf(ByteArrayBuilder).ql = function() {
        return this.oq_1;
    };
    protoOf(ByteArrayBuilder).xl = function(requiredCapacity) {
        if (this.nq_1.length < requiredCapacity) this.nq_1 = copyOf_6(this.nq_1, coerceAtLeast(requiredCapacity, imul(this.nq_1.length, 2)));
    };
    protoOf(ByteArrayBuilder).pq = function(c) {
        this.yl();
        var tmp = this.nq_1;
        var _unary__edvuaz = this.oq_1;
        this.oq_1 = _unary__edvuaz + 1 | 0;
        tmp[_unary__edvuaz] = c;
    };
    protoOf(ByteArrayBuilder).sl = function() {
        return copyOf_6(this.nq_1, this.oq_1);
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
        this.vq_1 = bufferWithData;
        this.wq_1 = initialPosition;
    }
    protoOf(UByteArrayBuilder).ql = function() {
        return this.wq_1;
    };
    protoOf(UByteArrayBuilder).xl = function(requiredCapacity) {
        if (_UByteArray___get_size__impl__h6pkdv(this.vq_1) < requiredCapacity) {
            var tmp = this;
            var tmp0 = this.vq_1;
            var newSize = coerceAtLeast(requiredCapacity, imul(_UByteArray___get_size__impl__h6pkdv(this.vq_1), 2));
            tmp.vq_1 = _UByteArray___init__impl__ip4y9n(copyOf_6(_UByteArray___get_storage__impl__d4kctt(tmp0), newSize));
        }
    };
    protoOf(UByteArrayBuilder).xq = function(c) {
        this.yl();
        var tmp = this.vq_1;
        var _unary__edvuaz = this.wq_1;
        this.wq_1 = _unary__edvuaz + 1 | 0;
        UByteArray__set_impl_jvcicn(tmp, _unary__edvuaz, c);
    };
    protoOf(UByteArrayBuilder).jr = function() {
        var tmp0 = this.vq_1;
        var newSize = this.wq_1;
        return _UByteArray___init__impl__ip4y9n(copyOf_6(_UByteArray___get_storage__impl__d4kctt(tmp0), newSize));
    };
    protoOf(UByteArrayBuilder).sl = function() {
        return new UByteArray(this.jr());
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
        this.dr_1 = bufferWithData;
        this.er_1 = initialPosition;
    }
    protoOf(BooleanArrayBuilder).ql = function() {
        return this.er_1;
    };
    protoOf(BooleanArrayBuilder).xl = function(requiredCapacity) {
        if (this.dr_1.length < requiredCapacity) this.dr_1 = copyOf_7(this.dr_1, coerceAtLeast(requiredCapacity, imul(this.dr_1.length, 2)));
    };
    protoOf(BooleanArrayBuilder).fr = function(c) {
        this.yl();
        var tmp = this.dr_1;
        var _unary__edvuaz = this.er_1;
        this.er_1 = _unary__edvuaz + 1 | 0;
        tmp[_unary__edvuaz] = c;
    };
    protoOf(BooleanArrayBuilder).sl = function() {
        return copyOf_7(this.dr_1, this.er_1);
    };
    function get_BUILTIN_SERIALIZERS() {
        _init_properties_Primitives_kt__k0eto4();
        return BUILTIN_SERIALIZERS;
    }
    var BUILTIN_SERIALIZERS;
    function StringSerializer() {
        StringSerializer_instance = this;
        this.kr_1 = new PrimitiveSerialDescriptor_0('kotlin.String', STRING_getInstance());
    }
    protoOf(StringSerializer).sg = function() {
        return this.kr_1;
    };
    protoOf(StringSerializer).tg = function(decoder) {
        return decoder.vi();
    };
    var StringSerializer_instance;
    function StringSerializer_getInstance() {
        if (StringSerializer_instance == null) new StringSerializer;
        return StringSerializer_instance;
    }
    function error_0($this) {
        throw IllegalStateException_init_$Create$_0('Primitive descriptor ' + $this.lr_1 + ' does not have elements');
    }
    function PrimitiveSerialDescriptor_0(serialName, kind) {
        this.lr_1 = serialName;
        this.mr_1 = kind;
    }
    protoOf(PrimitiveSerialDescriptor_0).ah = function() {
        return this.lr_1;
    };
    protoOf(PrimitiveSerialDescriptor_0).bh = function() {
        return this.mr_1;
    };
    protoOf(PrimitiveSerialDescriptor_0).eh = function() {
        return 0;
    };
    protoOf(PrimitiveSerialDescriptor_0).gh = function(index) {
        error_0(this);
    };
    protoOf(PrimitiveSerialDescriptor_0).hh = function(name) {
        error_0(this);
    };
    protoOf(PrimitiveSerialDescriptor_0).kh = function(index) {
        error_0(this);
    };
    protoOf(PrimitiveSerialDescriptor_0).jh = function(index) {
        error_0(this);
    };
    protoOf(PrimitiveSerialDescriptor_0).ih = function(index) {
        error_0(this);
    };
    protoOf(PrimitiveSerialDescriptor_0).toString = function() {
        return 'PrimitiveDescriptor(' + this.lr_1 + ')';
    };
    protoOf(PrimitiveSerialDescriptor_0).equals = function(other) {
        if (this === other) return true;
        if (!(other instanceof PrimitiveSerialDescriptor_0)) return false;
        if (this.lr_1 === other.lr_1 && equals(this.mr_1, other.mr_1)) return true;
        return false;
    };
    protoOf(PrimitiveSerialDescriptor_0).hashCode = function() {
        return getStringHashCode(this.lr_1) + imul(31, this.mr_1.hashCode()) | 0;
    };
    function IntSerializer() {
        IntSerializer_instance = this;
        this.nr_1 = new PrimitiveSerialDescriptor_0('kotlin.Int', INT_getInstance());
    }
    protoOf(IntSerializer).sg = function() {
        return this.nr_1;
    };
    protoOf(IntSerializer).tg = function(decoder) {
        return decoder.qi();
    };
    var IntSerializer_instance;
    function IntSerializer_getInstance() {
        if (IntSerializer_instance == null) new IntSerializer;
        return IntSerializer_instance;
    }
    function LongSerializer() {
        LongSerializer_instance = this;
        this.or_1 = new PrimitiveSerialDescriptor_0('kotlin.Long', LONG_getInstance());
    }
    protoOf(LongSerializer).sg = function() {
        return this.or_1;
    };
    protoOf(LongSerializer).tg = function(decoder) {
        return decoder.ri();
    };
    var LongSerializer_instance;
    function LongSerializer_getInstance() {
        if (LongSerializer_instance == null) new LongSerializer;
        return LongSerializer_instance;
    }
    function ByteSerializer() {
        ByteSerializer_instance = this;
        this.pr_1 = new PrimitiveSerialDescriptor_0('kotlin.Byte', BYTE_getInstance());
    }
    protoOf(ByteSerializer).sg = function() {
        return this.pr_1;
    };
    protoOf(ByteSerializer).tg = function(decoder) {
        return decoder.oi();
    };
    var ByteSerializer_instance;
    function ByteSerializer_getInstance() {
        if (ByteSerializer_instance == null) new ByteSerializer;
        return ByteSerializer_instance;
    }
    function ShortSerializer() {
        ShortSerializer_instance = this;
        this.qr_1 = new PrimitiveSerialDescriptor_0('kotlin.Short', SHORT_getInstance());
    }
    protoOf(ShortSerializer).sg = function() {
        return this.qr_1;
    };
    protoOf(ShortSerializer).tg = function(decoder) {
        return decoder.pi();
    };
    var ShortSerializer_instance;
    function ShortSerializer_getInstance() {
        if (ShortSerializer_instance == null) new ShortSerializer;
        return ShortSerializer_instance;
    }
    function CharSerializer() {
        CharSerializer_instance = this;
        this.rr_1 = new PrimitiveSerialDescriptor_0('kotlin.Char', CHAR_getInstance());
    }
    protoOf(CharSerializer).sg = function() {
        return this.rr_1;
    };
    protoOf(CharSerializer).sr = function(decoder) {
        return decoder.ui();
    };
    protoOf(CharSerializer).tg = function(decoder) {
        return new Char(this.sr(decoder));
    };
    var CharSerializer_instance;
    function CharSerializer_getInstance() {
        if (CharSerializer_instance == null) new CharSerializer;
        return CharSerializer_instance;
    }
    function DoubleSerializer() {
        DoubleSerializer_instance = this;
        this.tr_1 = new PrimitiveSerialDescriptor_0('kotlin.Double', DOUBLE_getInstance());
    }
    protoOf(DoubleSerializer).sg = function() {
        return this.tr_1;
    };
    protoOf(DoubleSerializer).tg = function(decoder) {
        return decoder.ti();
    };
    var DoubleSerializer_instance;
    function DoubleSerializer_getInstance() {
        if (DoubleSerializer_instance == null) new DoubleSerializer;
        return DoubleSerializer_instance;
    }
    function FloatSerializer() {
        FloatSerializer_instance = this;
        this.ur_1 = new PrimitiveSerialDescriptor_0('kotlin.Float', FLOAT_getInstance());
    }
    protoOf(FloatSerializer).sg = function() {
        return this.ur_1;
    };
    protoOf(FloatSerializer).tg = function(decoder) {
        return decoder.si();
    };
    var FloatSerializer_instance;
    function FloatSerializer_getInstance() {
        if (FloatSerializer_instance == null) new FloatSerializer;
        return FloatSerializer_instance;
    }
    function BooleanSerializer() {
        BooleanSerializer_instance = this;
        this.vr_1 = new PrimitiveSerialDescriptor_0('kotlin.Boolean', BOOLEAN_getInstance());
    }
    protoOf(BooleanSerializer).sg = function() {
        return this.vr_1;
    };
    protoOf(BooleanSerializer).tg = function(decoder) {
        return decoder.ni();
    };
    var BooleanSerializer_instance;
    function BooleanSerializer_getInstance() {
        if (BooleanSerializer_instance == null) new BooleanSerializer;
        return BooleanSerializer_instance;
    }
    function UnitSerializer() {
        UnitSerializer_instance = this;
        this.wr_1 = new ObjectSerializer('kotlin.Unit', Unit_instance);
    }
    protoOf(UnitSerializer).sg = function() {
        return this.wr_1.sg();
    };
    protoOf(UnitSerializer).xr = function(decoder) {
        this.wr_1.tg(decoder);
    };
    protoOf(UnitSerializer).tg = function(decoder) {
        this.xr(decoder);
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
        var _iterator__ex2g4s = values.g();
        while (_iterator__ex2g4s.h()) {
            var primitive = _iterator__ex2g4s.i();
            var primitiveName = primitive.sg().ah();
            if (serialName === primitiveName) {
                throw IllegalArgumentException_init_$Create$_0(trimIndent('\n                The name of serial descriptor should uniquely identify associated serializer.\n                For serial name ' + serialName + ' there already exists ' + getKClassFromExpression(primitive).k8() + '.\n                Please refer to SerialDescriptor documentation for additional information.\n            '));
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
    protoOf(NamedValueDecoder).as = function(_this__u8e3s4, index) {
        return this.cs(this.bs(_this__u8e3s4, index));
    };
    protoOf(NamedValueDecoder).cs = function(nestedName) {
        var tmp0_elvis_lhs = this.fs();
        return this.gs(tmp0_elvis_lhs == null ? '' : tmp0_elvis_lhs, nestedName);
    };
    protoOf(NamedValueDecoder).bs = function(descriptor, index) {
        return descriptor.gh(index);
    };
    protoOf(NamedValueDecoder).gs = function(parentName, childName) {
        var tmp;
        if (charSequenceLength(parentName) === 0) {
            tmp = childName;
        } else {
            tmp = parentName + '.' + childName;
        }
        return tmp;
    };
    protoOf(NamedValueDecoder).hs = function() {
        return this.ds_1.k() ? '$' : joinToString_0(this.ds_1, '.', '$.');
    };
    function tagBlock($this, tag, block) {
        $this.us(tag);
        var r = block();
        if (!$this.es_1) {
            $this.vs();
        }
        $this.es_1 = false;
        return r;
    }
    function TaggedDecoder$decodeSerializableElement$lambda(this$0, $deserializer, $previousValue) {
        return function() {
            return this$0.xi($deserializer, $previousValue);
        };
    }
    function TaggedDecoder() {
        var tmp = this;
        tmp.ds_1 = ArrayList_init_$Create$();
        this.es_1 = false;
    }
    protoOf(TaggedDecoder).mj = function() {
        return EmptySerializersModule_0();
    };
    protoOf(TaggedDecoder).is = function(tag) {
        throw SerializationException_init_$Create$_0(toString_1(getKClassFromExpression(this)) + " can't retrieve untyped values");
    };
    protoOf(TaggedDecoder).js = function(tag) {
        return true;
    };
    protoOf(TaggedDecoder).ks = function(tag) {
        var tmp = this.is(tag);
        return typeof tmp === 'boolean' ? tmp : THROW_CCE();
    };
    protoOf(TaggedDecoder).ls = function(tag) {
        var tmp = this.is(tag);
        return typeof tmp === 'number' ? tmp : THROW_CCE();
    };
    protoOf(TaggedDecoder).ms = function(tag) {
        var tmp = this.is(tag);
        return typeof tmp === 'number' ? tmp : THROW_CCE();
    };
    protoOf(TaggedDecoder).ns = function(tag) {
        var tmp = this.is(tag);
        return typeof tmp === 'number' ? tmp : THROW_CCE();
    };
    protoOf(TaggedDecoder).os = function(tag) {
        var tmp = this.is(tag);
        return tmp instanceof Long ? tmp : THROW_CCE();
    };
    protoOf(TaggedDecoder).ps = function(tag) {
        var tmp = this.is(tag);
        return typeof tmp === 'number' ? tmp : THROW_CCE();
    };
    protoOf(TaggedDecoder).qs = function(tag) {
        var tmp = this.is(tag);
        return typeof tmp === 'number' ? tmp : THROW_CCE();
    };
    protoOf(TaggedDecoder).rs = function(tag) {
        var tmp = this.is(tag);
        return tmp instanceof Char ? tmp.a1_1 : THROW_CCE();
    };
    protoOf(TaggedDecoder).ss = function(tag) {
        var tmp = this.is(tag);
        return typeof tmp === 'string' ? tmp : THROW_CCE();
    };
    protoOf(TaggedDecoder).ts = function(tag, inlineDescriptor) {
        this.us(tag);
        return this;
    };
    protoOf(TaggedDecoder).xi = function(deserializer, previousValue) {
        return this.yi(deserializer);
    };
    protoOf(TaggedDecoder).wi = function(descriptor) {
        return this.ts(this.vs(), descriptor);
    };
    protoOf(TaggedDecoder).li = function() {
        var tmp0_elvis_lhs = this.fs();
        var tmp;
        if (tmp0_elvis_lhs == null) {
            return false;
        } else {
            tmp = tmp0_elvis_lhs;
        }
        var currentTag = tmp;
        return this.js(currentTag);
    };
    protoOf(TaggedDecoder).mi = function() {
        return null;
    };
    protoOf(TaggedDecoder).ni = function() {
        return this.ks(this.vs());
    };
    protoOf(TaggedDecoder).oi = function() {
        return this.ls(this.vs());
    };
    protoOf(TaggedDecoder).pi = function() {
        return this.ms(this.vs());
    };
    protoOf(TaggedDecoder).qi = function() {
        return this.ns(this.vs());
    };
    protoOf(TaggedDecoder).ri = function() {
        return this.os(this.vs());
    };
    protoOf(TaggedDecoder).si = function() {
        return this.ps(this.vs());
    };
    protoOf(TaggedDecoder).ti = function() {
        return this.qs(this.vs());
    };
    protoOf(TaggedDecoder).ui = function() {
        return this.rs(this.vs());
    };
    protoOf(TaggedDecoder).vi = function() {
        return this.ss(this.vs());
    };
    protoOf(TaggedDecoder).zi = function(descriptor) {
        return this;
    };
    protoOf(TaggedDecoder).aj = function(descriptor) {};
    protoOf(TaggedDecoder).bj = function(descriptor, index) {
        return this.ks(this.as(descriptor, index));
    };
    protoOf(TaggedDecoder).cj = function(descriptor, index) {
        return this.ls(this.as(descriptor, index));
    };
    protoOf(TaggedDecoder).dj = function(descriptor, index) {
        return this.ms(this.as(descriptor, index));
    };
    protoOf(TaggedDecoder).ej = function(descriptor, index) {
        return this.ns(this.as(descriptor, index));
    };
    protoOf(TaggedDecoder).fj = function(descriptor, index) {
        return this.os(this.as(descriptor, index));
    };
    protoOf(TaggedDecoder).gj = function(descriptor, index) {
        return this.ps(this.as(descriptor, index));
    };
    protoOf(TaggedDecoder).hj = function(descriptor, index) {
        return this.qs(this.as(descriptor, index));
    };
    protoOf(TaggedDecoder).ij = function(descriptor, index) {
        return this.rs(this.as(descriptor, index));
    };
    protoOf(TaggedDecoder).jj = function(descriptor, index) {
        return this.ts(this.as(descriptor, index), descriptor.jh(index));
    };
    protoOf(TaggedDecoder).kj = function(descriptor, index, deserializer, previousValue) {
        var tmp = this.as(descriptor, index);
        return tagBlock(this, tmp, TaggedDecoder$decodeSerializableElement$lambda(this, deserializer, previousValue));
    };
    protoOf(TaggedDecoder).fs = function() {
        return lastOrNull(this.ds_1);
    };
    protoOf(TaggedDecoder).us = function(name) {
        this.ds_1.f(name);
    };
    protoOf(TaggedDecoder).vs = function() {
        var r = this.ds_1.f3(get_lastIndex_3(this.ds_1));
        this.es_1 = true;
        return r;
    };
    function UIntSerializer() {
        UIntSerializer_instance = this;
        this.ws_1 = InlinePrimitiveDescriptor('kotlin.UInt', serializer_4(IntCompanionObject_instance));
    }
    protoOf(UIntSerializer).sg = function() {
        return this.ws_1;
    };
    protoOf(UIntSerializer).xs = function(decoder) {
        var this_0 = decoder.wi(this.ws_1).qi();
        return _UInt___init__impl__l7qpdl(this_0);
    };
    protoOf(UIntSerializer).tg = function(decoder) {
        return new UInt(this.xs(decoder));
    };
    var UIntSerializer_instance;
    function UIntSerializer_getInstance() {
        if (UIntSerializer_instance == null) new UIntSerializer;
        return UIntSerializer_instance;
    }
    function ULongSerializer() {
        ULongSerializer_instance = this;
        this.ys_1 = InlinePrimitiveDescriptor('kotlin.ULong', serializer_5(Companion_getInstance_1()));
    }
    protoOf(ULongSerializer).sg = function() {
        return this.ys_1;
    };
    protoOf(ULongSerializer).zs = function(decoder) {
        var this_0 = decoder.wi(this.ys_1).ri();
        return _ULong___init__impl__c78o9k(this_0);
    };
    protoOf(ULongSerializer).tg = function(decoder) {
        return new ULong(this.zs(decoder));
    };
    var ULongSerializer_instance;
    function ULongSerializer_getInstance() {
        if (ULongSerializer_instance == null) new ULongSerializer;
        return ULongSerializer_instance;
    }
    function UByteSerializer() {
        UByteSerializer_instance = this;
        this.at_1 = InlinePrimitiveDescriptor('kotlin.UByte', serializer_6(ByteCompanionObject_instance));
    }
    protoOf(UByteSerializer).sg = function() {
        return this.at_1;
    };
    protoOf(UByteSerializer).bt = function(decoder) {
        var this_0 = decoder.wi(this.at_1).oi();
        return _UByte___init__impl__g9hnc4(this_0);
    };
    protoOf(UByteSerializer).tg = function(decoder) {
        return new UByte(this.bt(decoder));
    };
    var UByteSerializer_instance;
    function UByteSerializer_getInstance() {
        if (UByteSerializer_instance == null) new UByteSerializer;
        return UByteSerializer_instance;
    }
    function UShortSerializer() {
        UShortSerializer_instance = this;
        this.ct_1 = InlinePrimitiveDescriptor('kotlin.UShort', serializer_7(ShortCompanionObject_instance));
    }
    protoOf(UShortSerializer).sg = function() {
        return this.ct_1;
    };
    protoOf(UShortSerializer).dt = function(decoder) {
        var this_0 = decoder.wi(this.ct_1).pi();
        return _UShort___init__impl__jigrne(this_0);
    };
    protoOf(UShortSerializer).tg = function(decoder) {
        return new UShort(this.dt(decoder));
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
    protoOf(SerializersModule).xg = function(kClass, typeArgumentsSerializers, $super) {
        typeArgumentsSerializers = typeArgumentsSerializers === VOID ? emptyList() : typeArgumentsSerializers;
        return $super === VOID ? this.et(kClass, typeArgumentsSerializers) : $super.et.call(this, kClass, typeArgumentsSerializers);
    };
    function SerialModuleImpl(class2ContextualFactory, polyBase2Serializers, polyBase2DefaultSerializerProvider, polyBase2NamedSerializers, polyBase2DefaultDeserializerProvider, hasInterfaceContextualSerializers) {
        SerializersModule.call(this);
        this.ft_1 = class2ContextualFactory;
        this.gt_1 = polyBase2Serializers;
        this.ht_1 = polyBase2DefaultSerializerProvider;
        this.it_1 = polyBase2NamedSerializers;
        this.jt_1 = polyBase2DefaultDeserializerProvider;
        this.kt_1 = hasInterfaceContextualSerializers;
    }
    protoOf(SerialModuleImpl).sj = function(baseClass, serializedClassName) {
        var tmp0_safe_receiver = this.it_1.t1(baseClass);
        var tmp;
        if (tmp0_safe_receiver == null) {
            tmp = null;
        } else {
            tmp = (isInterface(tmp0_safe_receiver, KtMap) ? tmp0_safe_receiver : THROW_CCE()).t1(serializedClassName);
        }
        var tmp_0 = tmp;
        var registered = (!(tmp_0 == null) ? isInterface(tmp_0, KSerializer) : false) ? tmp_0 : null;
        if (!(registered == null)) return registered;
        var tmp_1 = this.jt_1.t1(baseClass);
        var tmp1_safe_receiver = (!(tmp_1 == null) ? typeof tmp_1 === 'function' : false) ? tmp_1 : null;
        return tmp1_safe_receiver == null ? null : tmp1_safe_receiver(serializedClassName);
    };
    protoOf(SerialModuleImpl).et = function(kClass, typeArgumentsSerializers) {
        var tmp0_safe_receiver = this.ft_1.t1(kClass);
        var tmp = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.lt(typeArgumentsSerializers);
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
        return mapOf_0([ to(PrimitiveClasses_getInstance().d9(), serializer(StringCompanionObject_instance)), to(getKClass(Char), serializer_8(Companion_getInstance())), to(PrimitiveClasses_getInstance().g9(), CharArraySerializer()), to(PrimitiveClasses_getInstance().b9(), serializer_9(DoubleCompanionObject_instance)), to(PrimitiveClasses_getInstance().n9(), DoubleArraySerializer()), to(PrimitiveClasses_getInstance().a9(), serializer_10(FloatCompanionObject_instance)), to(PrimitiveClasses_getInstance().m9(), FloatArraySerializer()), to(PrimitiveClasses_getInstance().z8(), serializer_5(Companion_getInstance_1())), to(PrimitiveClasses_getInstance().l9(), LongArraySerializer()), to(getKClass(ULong), serializer_1(Companion_getInstance_18())), to(getKClass(ULongArray), ULongArraySerializer()), to(PrimitiveClasses_getInstance().y8(), serializer_4(IntCompanionObject_instance)), to(PrimitiveClasses_getInstance().j9(), IntArraySerializer()), to(getKClass(UInt), serializer_0(Companion_getInstance_17())), to(getKClass(UIntArray), UIntArraySerializer()), to(PrimitiveClasses_getInstance().x8(), serializer_7(ShortCompanionObject_instance)), to(PrimitiveClasses_getInstance().i9(), ShortArraySerializer()), to(getKClass(UShort), serializer_3(Companion_getInstance_19())), to(getKClass(UShortArray), UShortArraySerializer()), to(PrimitiveClasses_getInstance().w8(), serializer_6(ByteCompanionObject_instance)), to(PrimitiveClasses_getInstance().h9(), ByteArraySerializer()), to(getKClass(UByte), serializer_2(Companion_getInstance_16())), to(getKClass(UByteArray), UByteArraySerializer()), to(PrimitiveClasses_getInstance().v8(), serializer_11(BooleanCompanionObject_instance)), to(PrimitiveClasses_getInstance().f9(), BooleanArraySerializer()), to(getKClass(Unit), serializer_12(Unit_instance)), to(PrimitiveClasses_getInstance().u8(), NothingSerializer()), to(getKClass(Duration), serializer_13(Companion_getInstance_10())), to(getKClass(Instant), serializer_14(Companion_getInstance_12())), to(getKClass(Uuid), serializer_15(Companion_getInstance_15())) ]);
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
        this.mt_1 = configuration;
        this.nt_1 = serializersModule;
        this.ot_1 = new DescriptorSchemaCache;
    }
    protoOf(Json).mj = function() {
        return this.nt_1;
    };
    protoOf(Json).pt = function(deserializer, string) {
        var lexer = StringJsonLexer_0(this, string);
        var input = new StreamingJsonDecoder(this, LexerMode_OBJ_getInstance(), lexer, deserializer.sg(), null);
        var result = input.yi(deserializer);
        lexer.eu();
        return result;
    };
    protoOf(Json).qt = function(string) {
        return this.pt(JsonElementSerializer_getInstance(), string);
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
        this.fu_1 = encodeDefaults;
        this.gu_1 = ignoreUnknownKeys;
        this.hu_1 = isLenient;
        this.iu_1 = allowStructuredMapKeys;
        this.ju_1 = prettyPrint;
        this.ku_1 = explicitNulls;
        this.lu_1 = prettyPrintIndent;
        this.mu_1 = coerceInputValues;
        this.nu_1 = useArrayPolymorphism;
        this.ou_1 = classDiscriminator;
        this.pu_1 = allowSpecialFloatingPointValues;
        this.qu_1 = useAlternativeNames;
        this.ru_1 = namingStrategy;
        this.su_1 = decodeEnumsCaseInsensitive;
        this.tu_1 = allowTrailingComma;
        this.uu_1 = allowComments;
        this.vu_1 = classDiscriminatorMode;
        this.wu_1 = exceptionsWithDebugInfo;
        this.xu_1 = maxNestingDepth;
    }
    protoOf(JsonConfiguration).toString = function() {
        return 'JsonConfiguration(encodeDefaults=' + this.fu_1 + ', ignoreUnknownKeys=' + this.gu_1 + ', isLenient=' + this.hu_1 + ', ' + ('allowStructuredMapKeys=' + this.iu_1 + ', prettyPrint=' + this.ju_1 + ', explicitNulls=' + this.ku_1 + ', ') + ("prettyPrintIndent='" + this.lu_1 + "', coerceInputValues=" + this.mu_1 + ', useArrayPolymorphism=' + this.nu_1 + ', ') + ("classDiscriminator='" + this.ou_1 + "', allowSpecialFloatingPointValues=" + this.pu_1 + ', ') + ('useAlternativeNames=' + this.qu_1 + ', namingStrategy=' + toString_0(this.ru_1) + ', decodeEnumsCaseInsensitive=' + this.su_1 + ', ') + ('allowTrailingComma=' + this.tu_1 + ', allowComments=' + this.uu_1 + ', classDiscriminatorMode=' + this.vu_1.toString() + ', ') + ('exceptionsWithDebugInfo=' + this.wu_1 + ', maxNestingDepth=' + this.xu_1 + ')');
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
        this_0.a7(_Char___init__impl__6a9atx(58));
        this_0.y6(v);
        return this_0.toString();
    }
    function JsonObject(content) {
        JsonElement.call(this);
        this.av_1 = content;
    }
    protoOf(JsonObject).equals = function(other) {
        return equals(this.av_1, other);
    };
    protoOf(JsonObject).hashCode = function() {
        return hashCode_0(this.av_1);
    };
    protoOf(JsonObject).toString = function() {
        var tmp = this.av_1.w1();
        return joinToString_0(tmp, ',', '{', '}', VOID, VOID, JsonObject$toString$lambda);
    };
    protoOf(JsonObject).k = function() {
        return this.av_1.k();
    };
    protoOf(JsonObject).bv = function(key) {
        return this.av_1.r1(key);
    };
    protoOf(JsonObject).r1 = function(key) {
        if (!(!(key == null) ? typeof key === 'string' : false)) return false;
        return this.bv((!(key == null) ? typeof key === 'string' : false) ? key : THROW_CCE());
    };
    protoOf(JsonObject).cv = function(key) {
        return this.av_1.t1(key);
    };
    protoOf(JsonObject).t1 = function(key) {
        if (!(!(key == null) ? typeof key === 'string' : false)) return null;
        return this.cv((!(key == null) ? typeof key === 'string' : false) ? key : THROW_CCE());
    };
    protoOf(JsonObject).j = function() {
        return this.av_1.j();
    };
    protoOf(JsonObject).u1 = function() {
        return this.av_1.u1();
    };
    protoOf(JsonObject).v1 = function() {
        return this.av_1.v1();
    };
    protoOf(JsonObject).w1 = function() {
        return this.av_1.w1();
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
        return this.dv();
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
            tmp = _this__u8e3s4.dv();
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
        if (!contains_4(isInterface(this_0, ClosedRange) ? this_0 : THROW_CCE(), result)) return null;
        return convertToInt(result);
    }
    function get_booleanOrNull(_this__u8e3s4) {
        _init_properties_JsonElement_kt__7cbdc2();
        return toBooleanStrictOrNull(_this__u8e3s4.dv());
    }
    function Companion_24() {}
    var Companion_instance_24;
    function Companion_getInstance_24() {
        return Companion_instance_24;
    }
    function JsonArray(content) {
        JsonElement.call(this);
        this.ev_1 = content;
    }
    protoOf(JsonArray).equals = function(other) {
        return equals(this.ev_1, other);
    };
    protoOf(JsonArray).hashCode = function() {
        return hashCode_0(this.ev_1);
    };
    protoOf(JsonArray).toString = function() {
        return joinToString_0(this.ev_1, ',', '[', ']');
    };
    protoOf(JsonArray).k = function() {
        return this.ev_1.k();
    };
    protoOf(JsonArray).fv = function(element) {
        return this.ev_1.m1(element);
    };
    protoOf(JsonArray).m1 = function(element) {
        if (!(element instanceof JsonElement)) return false;
        return this.fv(element instanceof JsonElement ? element : THROW_CCE());
    };
    protoOf(JsonArray).g = function() {
        return this.ev_1.g();
    };
    protoOf(JsonArray).m = function(index) {
        return this.ev_1.m(index);
    };
    protoOf(JsonArray).gv = function(element) {
        return this.ev_1.o1(element);
    };
    protoOf(JsonArray).o1 = function(element) {
        if (!(element instanceof JsonElement)) return -1;
        return this.gv(element instanceof JsonElement ? element : THROW_CCE());
    };
    protoOf(JsonArray).r = function(index) {
        return this.ev_1.r(index);
    };
    protoOf(JsonArray).j = function() {
        return this.ev_1.j();
    };
    function JsonPrimitive_0(value) {
        _init_properties_JsonElement_kt__7cbdc2();
        if (value == null) return JsonNull_getInstance();
        return new JsonLiteral(value, false);
    }
    function JsonNull() {
        JsonNull_instance = this;
        JsonPrimitive.call(this);
        this.hv_1 = 'null';
    }
    protoOf(JsonNull).dv = function() {
        return this.hv_1;
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
    function JsonPrimitive_2(value) {
        _init_properties_JsonElement_kt__7cbdc2();
        if (value == null) return JsonNull_getInstance();
        return new JsonLiteral(value, false);
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
        return StringJsonLexer_0(Default_getInstance_0(), _this__u8e3s4.dv()).iv();
    }
    function JsonLiteral(body, isString, coerceToInlineType) {
        coerceToInlineType = coerceToInlineType === VOID ? null : coerceToInlineType;
        JsonPrimitive.call(this);
        this.jv_1 = isString;
        this.kv_1 = coerceToInlineType;
        this.lv_1 = toString_1(body);
        if (!(this.kv_1 == null)) {
            if (!this.kv_1.dh()) {
                var message = 'Failed requirement.';
                throw IllegalArgumentException_init_$Create$_0(toString_1(message));
            }
        }
    }
    protoOf(JsonLiteral).dv = function() {
        return this.lv_1;
    };
    protoOf(JsonLiteral).toString = function() {
        var tmp;
        if (this.jv_1) {
            var this_0 = StringBuilder_init_$Create$_0();
            printQuoted(this_0, this.lv_1);
            tmp = this_0.toString();
        } else {
            tmp = this.lv_1;
        }
        return tmp;
    };
    protoOf(JsonLiteral).equals = function(other) {
        if (this === other) return true;
        if (other == null || !getKClassFromExpression(this).equals(getKClassFromExpression(other))) return false;
        if (!(other instanceof JsonLiteral)) THROW_CCE();
        if (!(this.jv_1 === other.jv_1)) return false;
        if (!(this.lv_1 === other.lv_1)) return false;
        return true;
    };
    protoOf(JsonLiteral).hashCode = function() {
        var result = getBooleanHashCode(this.jv_1);
        result = imul(31, result) + getStringHashCode(this.lv_1) | 0;
        return result;
    };
    function get_float(_this__u8e3s4) {
        _init_properties_JsonElement_kt__7cbdc2();
        var this_0 = _this__u8e3s4.dv();
        return toDouble(this_0);
    }
    function get_double(_this__u8e3s4) {
        _init_properties_JsonElement_kt__7cbdc2();
        return toDouble(_this__u8e3s4.dv());
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
        tmp.mv_1 = LinkedHashMap_init_$Create$();
    }
    protoOf(JsonObjectBuilder).nv = function(key, element) {
        return this.mv_1.x1(key, element);
    };
    protoOf(JsonObjectBuilder).ov = function() {
        return new JsonObject(this.mv_1);
    };
    function put(_this__u8e3s4, key, value) {
        return _this__u8e3s4.nv(key, JsonPrimitive_1(value));
    }
    function put_0(_this__u8e3s4, key, value) {
        return _this__u8e3s4.nv(key, JsonPrimitive_0(value));
    }
    function put_1(_this__u8e3s4, key, value) {
        return _this__u8e3s4.nv(key, JsonPrimitive_2(value));
    }
    function JsonObjectDescriptor() {
        JsonObjectDescriptor_instance = this;
        this.pv_1 = MapSerializer(serializer(StringCompanionObject_instance), JsonElementSerializer_getInstance()).sg();
        this.qv_1 = 'kotlinx.serialization.json.JsonObject';
    }
    protoOf(JsonObjectDescriptor).ah = function() {
        return this.qv_1;
    };
    protoOf(JsonObjectDescriptor).gh = function(index) {
        return this.pv_1.gh(index);
    };
    protoOf(JsonObjectDescriptor).hh = function(name) {
        return this.pv_1.hh(name);
    };
    protoOf(JsonObjectDescriptor).ih = function(index) {
        return this.pv_1.ih(index);
    };
    protoOf(JsonObjectDescriptor).jh = function(index) {
        return this.pv_1.jh(index);
    };
    protoOf(JsonObjectDescriptor).kh = function(index) {
        return this.pv_1.kh(index);
    };
    protoOf(JsonObjectDescriptor).bh = function() {
        return this.pv_1.bh();
    };
    protoOf(JsonObjectDescriptor).ch = function() {
        return this.pv_1.ch();
    };
    protoOf(JsonObjectDescriptor).dh = function() {
        return this.pv_1.dh();
    };
    protoOf(JsonObjectDescriptor).eh = function() {
        return this.pv_1.eh();
    };
    protoOf(JsonObjectDescriptor).fh = function() {
        return this.pv_1.fh();
    };
    var JsonObjectDescriptor_instance;
    function JsonObjectDescriptor_getInstance() {
        if (JsonObjectDescriptor_instance == null) new JsonObjectDescriptor;
        return JsonObjectDescriptor_instance;
    }
    function JsonObjectSerializer() {
        JsonObjectSerializer_instance = this;
        this.rv_1 = JsonObjectDescriptor_getInstance();
    }
    protoOf(JsonObjectSerializer).sg = function() {
        return this.rv_1;
    };
    protoOf(JsonObjectSerializer).tg = function(decoder) {
        verify(decoder);
        return new JsonObject(MapSerializer(serializer(StringCompanionObject_instance), JsonElementSerializer_getInstance()).tg(decoder));
    };
    var JsonObjectSerializer_instance;
    function JsonObjectSerializer_getInstance() {
        if (JsonObjectSerializer_instance == null) new JsonObjectSerializer;
        return JsonObjectSerializer_instance;
    }
    function JsonPrimitiveSerializer() {
        JsonPrimitiveSerializer_instance = this;
        this.sv_1 = buildSerialDescriptor('kotlinx.serialization.json.JsonPrimitive', STRING_getInstance(), []);
    }
    protoOf(JsonPrimitiveSerializer).sg = function() {
        return this.sv_1;
    };
    protoOf(JsonPrimitiveSerializer).tg = function(decoder) {
        var jsonDecoder = asJsonDecoder(decoder);
        var result = jsonDecoder.zu();
        if (!(result instanceof JsonPrimitive)) {
            var shortMessage = 'Unexpected JSON element, expected JsonPrimitive, had ' + toString_1(getKClassFromExpression(result));
            var tmp;
            if (jsonDecoder.yu().mt_1.wu_1) {
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
        $this$buildSerialDescriptor.xh('JsonPrimitive', defer(JsonElementSerializer$descriptor$lambda$lambda));
        $this$buildSerialDescriptor.xh('JsonNull', defer(JsonElementSerializer$descriptor$lambda$lambda_0));
        $this$buildSerialDescriptor.xh('JsonLiteral', defer(JsonElementSerializer$descriptor$lambda$lambda_1));
        $this$buildSerialDescriptor.xh('JsonObject', defer(JsonElementSerializer$descriptor$lambda$lambda_2));
        $this$buildSerialDescriptor.xh('JsonArray', defer(JsonElementSerializer$descriptor$lambda$lambda_3));
        return Unit_instance;
    }
    function JsonElementSerializer$descriptor$lambda$lambda() {
        return JsonPrimitiveSerializer_getInstance().sv_1;
    }
    function JsonElementSerializer$descriptor$lambda$lambda_0() {
        return JsonNullSerializer_getInstance().tv_1;
    }
    function JsonElementSerializer$descriptor$lambda$lambda_1() {
        return JsonLiteralSerializer_getInstance().uv_1;
    }
    function JsonElementSerializer$descriptor$lambda$lambda_2() {
        return JsonObjectSerializer_getInstance().rv_1;
    }
    function JsonElementSerializer$descriptor$lambda$lambda_3() {
        return JsonArraySerializer_getInstance().vv_1;
    }
    function JsonElementSerializer() {
        JsonElementSerializer_instance = this;
        var tmp = this;
        var tmp_0 = SEALED_getInstance();
        tmp.wv_1 = buildSerialDescriptor('kotlinx.serialization.json.JsonElement', tmp_0, [], JsonElementSerializer$descriptor$lambda);
    }
    protoOf(JsonElementSerializer).sg = function() {
        return this.wv_1;
    };
    protoOf(JsonElementSerializer).tg = function(decoder) {
        var input = asJsonDecoder(decoder);
        return input.zu();
    };
    var JsonElementSerializer_instance;
    function JsonElementSerializer_getInstance() {
        if (JsonElementSerializer_instance == null) new JsonElementSerializer;
        return JsonElementSerializer_instance;
    }
    function JsonArrayDescriptor() {
        JsonArrayDescriptor_instance = this;
        this.xv_1 = ListSerializer(JsonElementSerializer_getInstance()).sg();
        this.yv_1 = 'kotlinx.serialization.json.JsonArray';
    }
    protoOf(JsonArrayDescriptor).ah = function() {
        return this.yv_1;
    };
    protoOf(JsonArrayDescriptor).gh = function(index) {
        return this.xv_1.gh(index);
    };
    protoOf(JsonArrayDescriptor).hh = function(name) {
        return this.xv_1.hh(name);
    };
    protoOf(JsonArrayDescriptor).ih = function(index) {
        return this.xv_1.ih(index);
    };
    protoOf(JsonArrayDescriptor).jh = function(index) {
        return this.xv_1.jh(index);
    };
    protoOf(JsonArrayDescriptor).kh = function(index) {
        return this.xv_1.kh(index);
    };
    protoOf(JsonArrayDescriptor).bh = function() {
        return this.xv_1.bh();
    };
    protoOf(JsonArrayDescriptor).ch = function() {
        return this.xv_1.ch();
    };
    protoOf(JsonArrayDescriptor).dh = function() {
        return this.xv_1.dh();
    };
    protoOf(JsonArrayDescriptor).eh = function() {
        return this.xv_1.eh();
    };
    protoOf(JsonArrayDescriptor).fh = function() {
        return this.xv_1.fh();
    };
    var JsonArrayDescriptor_instance;
    function JsonArrayDescriptor_getInstance() {
        if (JsonArrayDescriptor_instance == null) new JsonArrayDescriptor;
        return JsonArrayDescriptor_instance;
    }
    function JsonArraySerializer() {
        JsonArraySerializer_instance = this;
        this.vv_1 = JsonArrayDescriptor_getInstance();
    }
    protoOf(JsonArraySerializer).sg = function() {
        return this.vv_1;
    };
    protoOf(JsonArraySerializer).tg = function(decoder) {
        verify(decoder);
        return new JsonArray(ListSerializer(JsonElementSerializer_getInstance()).tg(decoder));
    };
    var JsonArraySerializer_instance;
    function JsonArraySerializer_getInstance() {
        if (JsonArraySerializer_instance == null) new JsonArraySerializer;
        return JsonArraySerializer_instance;
    }
    function JsonNullSerializer() {
        JsonNullSerializer_instance = this;
        this.tv_1 = buildSerialDescriptor('kotlinx.serialization.json.JsonNull', ENUM_getInstance(), []);
    }
    protoOf(JsonNullSerializer).sg = function() {
        return this.tv_1;
    };
    protoOf(JsonNullSerializer).tg = function(decoder) {
        verify(decoder);
        if (decoder.li()) {
            throw decodingExceptionOf("Expected 'null' literal");
        }
        decoder.mi();
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
        this.uv_1 = PrimitiveSerialDescriptor('kotlinx.serialization.json.JsonLiteral', STRING_getInstance());
    }
    protoOf(JsonLiteralSerializer).sg = function() {
        return this.uv_1;
    };
    protoOf(JsonLiteralSerializer).tg = function(decoder) {
        var jsonDecoder = asJsonDecoder(decoder);
        var result = jsonDecoder.zu();
        if (!(result instanceof JsonLiteral)) {
            var shortMessage = 'Unexpected JSON element, expected JsonLiteral, had ' + toString_1(getKClassFromExpression(result));
            var tmp;
            if (jsonDecoder.yu().mt_1.wu_1) {
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
        var tmp0 = $this.zv_1;
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
        this.zv_1 = lazy_0($deferred);
    }
    protoOf(defer$1).ah = function() {
        return _get_original__l7ku1m(this).ah();
    };
    protoOf(defer$1).bh = function() {
        return _get_original__l7ku1m(this).bh();
    };
    protoOf(defer$1).eh = function() {
        return _get_original__l7ku1m(this).eh();
    };
    protoOf(defer$1).gh = function(index) {
        return _get_original__l7ku1m(this).gh(index);
    };
    protoOf(defer$1).hh = function(name) {
        return _get_original__l7ku1m(this).hh(name);
    };
    protoOf(defer$1).ih = function(index) {
        return _get_original__l7ku1m(this).ih(index);
    };
    protoOf(defer$1).jh = function(index) {
        return _get_original__l7ku1m(this).jh(index);
    };
    protoOf(defer$1).kh = function(index) {
        return _get_original__l7ku1m(this).kh(index);
    };
    function JsonDecodingException(fullMessage, shortMessage, offset, path, input, hint, cause) {
        cause = cause === VOID ? null : cause;
        JsonException.call(this, fullMessage, cause);
        captureStack(this, JsonDecodingException);
        this.bw_1 = shortMessage;
        this.cw_1 = offset;
        this.dw_1 = path;
        this.ew_1 = input;
        this.fw_1 = hint;
    }
    function JsonException(message, cause) {
        SerializationException_init_$Init$_1(message, cause, this);
        captureStack(this, JsonException);
        this.gw_1 = message;
        delete this.message;
    }
    protoOf(JsonException).i8 = function() {
        return this.gw_1;
    };
    function JsonEncodingException(shortMessage, classSerialName, hint, cause) {
        classSerialName = classSerialName === VOID ? null : classSerialName;
        hint = hint === VOID ? null : hint;
        cause = cause === VOID ? null : cause;
        JsonException.call(this, formatEncodingException(shortMessage, hint), cause);
        captureStack(this, JsonEncodingException);
        this.iw_1 = shortMessage;
        this.jw_1 = classSerialName;
        this.kw_1 = hint;
    }
    function readIfAbsent($this, descriptor, index) {
        $this.mw_1 = !descriptor.kh(index) && descriptor.jh(index).ch();
        return $this.mw_1;
    }
    function JsonElementMarker$readIfAbsent$ref(p0) {
        return constructCallableReference((function(p0_0, p1) {
            var tmp0 = p0;
            return readIfAbsent(tmp0, p0_0, p1);
        }), 2, 0, 6, 'readIfAbsent', [ p0 ]);
    }
    function JsonElementMarker(descriptor) {
        var tmp = this;
        tmp.lw_1 = new ElementMarker(descriptor, JsonElementMarker$readIfAbsent$ref(this));
        this.mw_1 = false;
    }
    protoOf(JsonElementMarker).nw = function(index) {
        this.lw_1.em(index);
    };
    protoOf(JsonElementMarker).ow = function() {
        return this.lw_1.fm();
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
        _this__u8e3s4.pw('Trailing comma before the end of JSON ' + entity, _this__u8e3s4.au_1 - 1 | 0, "Trailing commas are non-complaint JSON and not allowed by default. Use 'allowTrailingComma = true' in 'Json {}' builder to support them.");
    }
    function throwInvalidFloatingPointDecoded(_this__u8e3s4, result) {
        _this__u8e3s4.qw(nonFiniteFpMessage(result, null), VOID, "It is possible to deserialize them using 'JsonBuilder.allowSpecialFloatingPointValues = true'");
    }
    function InvalidKeyKindException(keyDescriptor) {
        return new JsonEncodingException("Value of type '" + keyDescriptor.ah() + "' can't be used in JSON as a key in the map. " + ("It should have either primitive or enum kind, but its kind is '" + keyDescriptor.bh().toString() + "'"), keyDescriptor.ah(), "Use 'allowStructuredMapKeys = true' in 'Json {}' builder to convert such maps to [key1, value1, key2, value2,...] arrays.");
    }
    function access$nonFiniteFpMessage$tJsonExceptionsKt(value, key) {
        return nonFiniteFpMessage(value, key);
    }
    function formatDecodingException(offset, shortMessage, path, hint, input) {
        var this_0 = StringBuilder_init_$Create$_0();
        if (offset >= 0) {
            this_0.z6('Unexpected JSON token at offset ' + offset + ': ');
        }
        this_0.z6(shortMessage);
        if (!(path == null || isBlank(path))) {
            this_0.z6(' at path: ');
            this_0.z6(path);
        }
        if (!(hint == null || isBlank(hint))) {
            this_0.z6('\n' + hint);
        }
        if (!(input == null)) {
            this_0.z6('\nJSON input: ');
            this_0.z6(input);
        }
        return this_0.toString();
    }
    function nonFiniteFpMessage(value, key) {
        return 'Unexpected special floating-point value ' + toString_1(value) + (!(key == null) ? ' with key ' + key + '. ' : '. ') + 'By default, ' + 'non-finite floating point values are prohibited because they do not conform JSON specification.';
    }
    function decodingExceptionOf_0(_this__u8e3s4, shortMessage, offset, path, hint, input, cause) {
        cause = cause === VOID ? null : cause;
        var tmp;
        if (_this__u8e3s4.zt_1.wu_1) {
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
        if (json.mt_1.gu_1) {
            tmp = true;
        } else {
            var tmp0 = _this__u8e3s4.fh();
            var tmp$ret$0;
            $l$block_0: {
                var tmp_0;
                if (isInterface(tmp0, Collection)) {
                    tmp_0 = tmp0.k();
                } else {
                    tmp_0 = false;
                }
                if (tmp_0) {
                    tmp$ret$0 = false;
                    break $l$block_0;
                }
                var _iterator__ex2g4s = tmp0.g();
                while (_iterator__ex2g4s.h()) {
                    var element = _iterator__ex2g4s.i();
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
        var index = _this__u8e3s4.hh(name);
        if (!(index === -3)) return index;
        if (!json.mt_1.qu_1) return index;
        return getJsonNameIndexSlowPath(_this__u8e3s4, json, name);
    }
    function decodeCaseInsensitive(_this__u8e3s4, descriptor) {
        _init_properties_JsonNamesMap_kt__cbbp0k();
        return _this__u8e3s4.mt_1.su_1 && equals(descriptor.bh(), ENUM_getInstance());
    }
    function getJsonNameIndexSlowPath(_this__u8e3s4, json, name) {
        _init_properties_JsonNamesMap_kt__cbbp0k();
        var tmp0_elvis_lhs = deserializationNamesMap(json, _this__u8e3s4).t1(name);
        return tmp0_elvis_lhs == null ? -3 : tmp0_elvis_lhs;
    }
    function namingStrategy(_this__u8e3s4, json) {
        _init_properties_JsonNamesMap_kt__cbbp0k();
        return equals(_this__u8e3s4.bh(), CLASS_getInstance()) ? json.mt_1.ru_1 : null;
    }
    function deserializationNamesMap(_this__u8e3s4, descriptor) {
        _init_properties_JsonNamesMap_kt__cbbp0k();
        var tmp = get_schemaCache(_this__u8e3s4);
        var tmp_0 = get_JsonDeserializationNamesKey();
        return tmp.sw(descriptor, tmp_0, deserializationNamesMap$lambda(descriptor, _this__u8e3s4));
    }
    function buildDeserializationNamesMap(_this__u8e3s4, json) {
        _init_properties_JsonNamesMap_kt__cbbp0k();
        var builder = LinkedHashMap_init_$Create$();
        var useLowercaseEnums = decodeCaseInsensitive(json, _this__u8e3s4);
        var strategyForClasses = namingStrategy(_this__u8e3s4, json);
        var inductionVariable = 0;
        var last = _this__u8e3s4.eh();
        if (inductionVariable < last) do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var tmp0 = _this__u8e3s4.ih(i);
            var destination = ArrayList_init_$Create$();
            var _iterator__ex2g4s = tmp0.g();
            while (_iterator__ex2g4s.h()) {
                var element = _iterator__ex2g4s.i();
                if (element instanceof JsonNames) {
                    destination.f(element);
                }
            }
            var tmp0_safe_receiver = singleOrNull_0(destination);
            var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.tw_1;
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
                tmp_0 = _this__u8e3s4.gh(i).toLowerCase();
            } else if (!(strategyForClasses == null)) {
                tmp_0 = strategyForClasses.uw(_this__u8e3s4, i, _this__u8e3s4.gh(i));
            } else {
                tmp_0 = null;
            }
            var nameToPut = tmp_0;
            if (nameToPut == null) null; else {
                buildDeserializationNamesMap$putOrThrow(builder, _this__u8e3s4, nameToPut, i);
            }
        } while (inductionVariable < last);
        var tmp_1;
        if (builder.k()) {
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
        var entity = equals($this_buildDeserializationNamesMap.bh(), ENUM_getInstance()) ? 'enum value' : 'property';
        if ((isInterface(_this__u8e3s4, KtMap) ? _this__u8e3s4 : THROW_CCE()).r1(name)) {
            throw decodingExceptionOf("The suggested name '" + name + "' for " + entity + ' ' + $this_buildDeserializationNamesMap.gh(index) + ' is already one of the names for ' + entity + ' ' + ($this_buildDeserializationNamesMap.gh(getValue(_this__u8e3s4, name)) + ' in ' + toString_1($this_buildDeserializationNamesMap)));
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
        var newSize = imul($this.zw_1, 2);
        $this.xw_1 = copyOf_0($this.xw_1, newSize);
        var tmp = 0;
        var tmp_0 = new Int32Array(newSize);
        while (tmp < newSize) {
            tmp_0[tmp] = -1;
            tmp = tmp + 1 | 0;
        }
        var newIndices = tmp_0;
        var this_0 = $this.yw_1;
        var endIndex = this_0.length;
        var tmp_1 = this_0;
        arrayCopy(tmp_1, newIndices, 0, 0, endIndex);
        $this.yw_1 = newIndices;
    }
    function JsonPath(configuration) {
        this.vw_1 = configuration.xu_1;
        this.ww_1 = configuration.wu_1;
        var tmp = this;
        tmp.xw_1 = Array(8);
        var tmp_0 = this;
        var tmp_1 = 0;
        var tmp_2 = new Int32Array(8);
        while (tmp_1 < 8) {
            tmp_2[tmp_1] = -1;
            tmp_1 = tmp_1 + 1 | 0;
        }
        tmp_0.yw_1 = tmp_2;
        this.zw_1 = -1;
    }
    protoOf(JsonPath).ax = function(sd) {
        this.zw_1 = this.zw_1 + 1 | 0;
        var depth = this.zw_1;
        if (depth >= this.vw_1) {
            jsonTooNested(this.vw_1);
        }
        if (depth === this.xw_1.length) {
            resize(this);
        }
        this.xw_1[depth] = sd;
    };
    protoOf(JsonPath).bx = function(index) {
        this.yw_1[this.zw_1] = index;
    };
    protoOf(JsonPath).cx = function(key) {
        var tmp;
        if (!(this.yw_1[this.zw_1] === -2)) {
            this.zw_1 = this.zw_1 + 1 | 0;
            tmp = this.zw_1 === this.xw_1.length;
        } else {
            tmp = false;
        }
        if (tmp) {
            resize(this);
        }
        this.xw_1[this.zw_1] = this.ww_1 ? key : RedactedKey_instance;
        this.yw_1[this.zw_1] = -2;
    };
    protoOf(JsonPath).dx = function() {
        if (this.yw_1[this.zw_1] === -2) {
            this.xw_1[this.zw_1] = Tombstone_instance;
        }
    };
    protoOf(JsonPath).ex = function() {
        var depth = this.zw_1;
        if (this.yw_1[depth] === -2) {
            this.yw_1[depth] = -1;
            this.zw_1 = this.zw_1 - 1 | 0;
        }
        if (!(this.zw_1 === -1)) {
            this.zw_1 = this.zw_1 - 1 | 0;
        }
    };
    protoOf(JsonPath).fx = function() {
        var this_0 = StringBuilder_init_$Create$_0();
        this_0.z6('$');
        var times = this.zw_1 + 1 | 0;
        var inductionVariable = 0;
        if (inductionVariable < times) do {
            var index = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var element = this.xw_1[index];
            if (!(element == null) ? isInterface(element, SerialDescriptor) : false) {
                if (equals(element.bh(), LIST_getInstance())) {
                    if (!(this.yw_1[index] === -1)) {
                        this_0.z6('[');
                        this_0.q9(this.yw_1[index]);
                        this_0.z6(']');
                    }
                } else {
                    var idx = this.yw_1[index];
                    if (idx >= 0) {
                        this_0.z6('.');
                        this_0.z6(element.gh(idx));
                    }
                }
            } else {
                if (element === RedactedKey_instance) {
                    this_0.z6('[<debug info disabled>]');
                } else {
                    if (!(element === Tombstone_instance)) {
                        this_0.z6('[');
                        this_0.z6("'");
                        this_0.y6(element);
                        this_0.z6("'");
                        this_0.z6(']');
                    }
                }
            }
        } while (inductionVariable < times);
        return this_0.toString();
    };
    protoOf(JsonPath).toString = function() {
        return this.fx();
    };
    function classDiscriminator(_this__u8e3s4, json) {
        var _iterator__ex2g4s = _this__u8e3s4.fh().g();
        while (_iterator__ex2g4s.h()) {
            var annotation = _iterator__ex2g4s.i();
            if (annotation instanceof JsonClassDiscriminator) return annotation.gx_1;
        }
        return json.mt_1.ou_1;
    }
    function subtypeNotRegisteredMessageJson(subClassName, baseClass) {
        var scope = "in the polymorphic scope of '" + baseClass.k8() + "'";
        var tmp;
        if (subClassName == null) {
            tmp = to('Class discriminator was missing and no default serializers were registered ' + scope, null);
        } else {
            tmp = to("Serializer for subclass '" + subClassName + "' is not found " + scope, "Check if class with serial name '" + subClassName + "' exists and serializer is registered in a corresponding SerializersModule.\n" + ("To be registered automatically, class '" + subClassName + "' has to be '@Serializable', and the base class '" + baseClass.k8() + "' has to be sealed and '@Serializable'."));
        }
        return tmp;
    }
    function readObject($this) {
        var lastToken = $this.hx_1.mx(6);
        if ($this.hx_1.nx() === 4) {
            $this.hx_1.qw('Unexpected leading comma');
        }
        var result = LinkedHashMap_init_$Create$();
        $l$loop: while ($this.hx_1.ox()) {
            var key = $this.ix_1 ? $this.hx_1.qx() : $this.hx_1.px();
            $this.hx_1.mx(5);
            var element = $this.rx();
            result.x1(key, element);
            lastToken = $this.hx_1.sx();
            var tmp0_subject = lastToken;
            if (tmp0_subject !== 4) if (tmp0_subject === 7) break $l$loop; else {
                $this.hx_1.qw('Expected end of the object or comma');
            }
        }
        if (lastToken === 6) {
            $this.hx_1.mx(7);
        } else if (lastToken === 4) {
            if (!$this.jx_1) {
                invalidTrailingComma($this.hx_1);
            }
            $this.hx_1.mx(7);
        }
        return new JsonObject(result);
    }
    function readObject_0($this, $receiver, $completion) {
        var tmp = new $readObjectCOROUTINE$($this, $receiver, $completion);
        tmp.n7_1 = Unit_instance;
        tmp.o7_1 = null;
        return tmp.t7();
    }
    function readArray($this) {
        var lastToken = $this.hx_1.sx();
        if ($this.hx_1.nx() === 4) {
            $this.hx_1.qw('Unexpected leading comma');
        }
        var result = ArrayList_init_$Create$();
        while ($this.hx_1.ox()) {
            var element = $this.rx();
            result.f(element);
            lastToken = $this.hx_1.sx();
            if (!(lastToken === 4)) {
                var tmp0 = $this.hx_1;
                var condition = lastToken === 9;
                var position = tmp0.au_1;
                if (!condition) {
                    var tmp$ret$2 = 'Expected end of the array or comma';
                    tmp0.qw(tmp$ret$2, position);
                }
            }
        }
        if (lastToken === 8) {
            $this.hx_1.mx(9);
        } else if (lastToken === 4) {
            if (!$this.jx_1) {
                invalidTrailingComma($this.hx_1, 'array');
            }
            $this.hx_1.mx(9);
        }
        return new JsonArray(result);
    }
    function readValue($this, isString) {
        var tmp;
        if ($this.ix_1 || !isString) {
            tmp = $this.hx_1.qx();
        } else {
            tmp = $this.hx_1.px();
        }
        var string = tmp;
        if (!isString && string === 'null') return JsonNull_getInstance();
        return new JsonLiteral(string, isString);
    }
    function readDeepRecursive($this) {
        return invoke(new DeepRecursiveFunction(JsonTreeReader$readDeepRecursive$slambda_0($this, null)), Unit_instance);
    }
    function JsonTreeReader$readDeepRecursive$slambda(this$0, resultContinuation) {
        this.py_1 = this$0;
        CoroutineImpl.call(this, resultContinuation);
    }
    protoOf(JsonTreeReader$readDeepRecursive$slambda).uy = function($this$DeepRecursiveFunction, it, $completion) {
        var tmp = this.vy($this$DeepRecursiveFunction, it, $completion);
        tmp.n7_1 = Unit_instance;
        tmp.o7_1 = null;
        return tmp.t7();
    };
    protoOf(JsonTreeReader$readDeepRecursive$slambda).z7 = function(p1, p2, $completion) {
        var tmp = p1 instanceof DeepRecursiveScope ? p1 : THROW_CCE();
        return this.uy(tmp, p2 instanceof Unit ? p2 : THROW_CCE(), $completion);
    };
    protoOf(JsonTreeReader$readDeepRecursive$slambda).t7 = function() {
        var suspendResult = this.n7_1;
        $sm: do {
            try {
                var tmp = this.l7_1;
                switch (tmp) {
                  case 0:
                    this.m7_1 = 3;
                    var tmp0_subject = this.py_1.hx_1.nx();
                    if (tmp0_subject === 1) {
                        this.sy_1 = readValue(this.py_1, true);
                        this.l7_1 = 2;
                        continue $sm;
                    } else {
                        if (tmp0_subject === 0) {
                            this.sy_1 = readValue(this.py_1, false);
                            this.l7_1 = 2;
                            continue $sm;
                        } else {
                            if (tmp0_subject === 6) {
                                this.ty_1 = this.py_1;
                                this.ty_1.lx_1 = this.ty_1.lx_1 + 1 | 0;
                                if (this.ty_1.lx_1 >= this.ty_1.kx_1) {
                                    jsonTooNested(this.ty_1.kx_1);
                                }
                                this.l7_1 = 1;
                                suspendResult = readObject_0(this.py_1, this.qy_1, this);
                                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                                    return suspendResult;
                                }
                                continue $sm;
                            } else {
                                if (tmp0_subject === 8) {
                                    var tmp_0 = this;
                                    var this_0 = this.py_1;
                                    this_0.lx_1 = this_0.lx_1 + 1 | 0;
                                    if (this_0.lx_1 >= this_0.kx_1) {
                                        jsonTooNested(this_0.kx_1);
                                    }
                                    var result = readArray(this.py_1);
                                    this_0.lx_1 = this_0.lx_1 - 1 | 0;
                                    tmp_0.sy_1 = result;
                                    this.l7_1 = 2;
                                    continue $sm;
                                } else {
                                    var tmp_1 = this;
                                    this.py_1.hx_1.qw("Can't begin reading element, unexpected token");
                                }
                            }
                        }
                    }
                    break;

                  case 1:
                    var result_0 = suspendResult;
                    this.ty_1.lx_1 = this.ty_1.lx_1 - 1 | 0;
                    this.sy_1 = result_0;
                    this.l7_1 = 2;
                    continue $sm;

                  case 2:
                    return this.sy_1;

                  case 3:
                    throw this.o7_1;
                }
            } catch ($p) {
                var e = $p;
                if (this.m7_1 === 3) {
                    throw e;
                } else {
                    this.l7_1 = this.m7_1;
                    this.o7_1 = e;
                }
            }
        } while (true);
    };
    protoOf(JsonTreeReader$readDeepRecursive$slambda).vy = function($this$DeepRecursiveFunction, it, completion) {
        var i = new JsonTreeReader$readDeepRecursive$slambda(this.py_1, completion);
        i.qy_1 = $this$DeepRecursiveFunction;
        i.ry_1 = it;
        return i;
    };
    function JsonTreeReader$readDeepRecursive$slambda_0(this$0, resultContinuation) {
        var i = new JsonTreeReader$readDeepRecursive$slambda(this$0, resultContinuation);
        return constructCallableReference((function($this$DeepRecursiveFunction, it, $completion) {
            return i.uy($this$DeepRecursiveFunction, it, $completion);
        }), 2);
    }
    function $readObjectCOROUTINE$(_this__u8e3s4, _this__u8e3s4_0, resultContinuation) {
        CoroutineImpl.call(this, resultContinuation);
        this.by_1 = _this__u8e3s4;
        this.cy_1 = _this__u8e3s4_0;
    }
    protoOf($readObjectCOROUTINE$).t7 = function() {
        var suspendResult = this.n7_1;
        $sm: do {
            try {
                var tmp = this.l7_1;
                switch (tmp) {
                  case 0:
                    this.m7_1 = 5;
                    this.ey_1 = this.by_1;
                    this.fy_1 = this.ey_1.hx_1.mx(6);
                    if (this.ey_1.hx_1.nx() === 4) {
                        this.ey_1.hx_1.qw('Unexpected leading comma');
                    }
                    var tmp_0 = this;
                    tmp_0.dy_1 = LinkedHashMap_init_$Create$();
                    this.l7_1 = 1;
                    continue $sm;

                  case 1:
                    if (!this.ey_1.hx_1.ox()) {
                        this.l7_1 = 4;
                        continue $sm;
                    }
                    this.gy_1 = this.ey_1.ix_1 ? this.ey_1.hx_1.qx() : this.ey_1.hx_1.px();
                    this.ey_1.hx_1.mx(5);
                    this.l7_1 = 2;
                    suspendResult = this.cy_1.ee(Unit_instance, this);
                    if (suspendResult === get_COROUTINE_SUSPENDED()) {
                        return suspendResult;
                    }
                    continue $sm;

                  case 2:
                    var element = suspendResult;
                    var tmp0 = this.dy_1;
                    var key = this.gy_1;
                    tmp0.x1(key, element);
                    this.fy_1 = this.ey_1.hx_1.sx();
                    var tmp0_subject = this.fy_1;
                    if (tmp0_subject === 4) {
                        this.l7_1 = 3;
                        continue $sm;
                    } else {
                        if (tmp0_subject === 7) {
                            this.l7_1 = 4;
                            continue $sm;
                        } else {
                            this.ey_1.hx_1.qw('Expected end of the object or comma');
                        }
                    }
                    break;

                  case 3:
                    this.l7_1 = 1;
                    continue $sm;

                  case 4:
                    if (this.fy_1 === 6) {
                        this.ey_1.hx_1.mx(7);
                    } else if (this.fy_1 === 4) {
                        if (!this.ey_1.jx_1) {
                            invalidTrailingComma(this.ey_1.hx_1);
                        }
                        this.ey_1.hx_1.mx(7);
                    }
                    return new JsonObject(this.dy_1);

                  case 5:
                    throw this.o7_1;
                }
            } catch ($p) {
                var e = $p;
                if (this.m7_1 === 5) {
                    throw e;
                } else {
                    this.l7_1 = this.m7_1;
                    this.o7_1 = e;
                }
            }
        } while (true);
    };
    function JsonTreeReader(configuration, lexer) {
        this.hx_1 = lexer;
        this.ix_1 = configuration.hu_1;
        this.jx_1 = configuration.tu_1;
        this.kx_1 = configuration.xu_1;
        this.lx_1 = this.hx_1.bu_1.zw_1;
    }
    protoOf(JsonTreeReader).rx = function() {
        var token = this.hx_1.nx();
        var tmp;
        if (token === 1) {
            tmp = readValue(this, true);
        } else if (token === 0) {
            tmp = readValue(this, false);
        } else if (token === 6) {
            this.lx_1 = this.lx_1 + 1 | 0;
            if (this.lx_1 >= this.kx_1) {
                jsonTooNested(this.kx_1);
            }
            var result;
            if (this.lx_1 === 200) {
                this.lx_1 = this.lx_1 - 1 | 0;
                result = readDeepRecursive(this);
            } else {
                result = readObject(this);
                this.lx_1 = this.lx_1 - 1 | 0;
            }
            tmp = result;
        } else if (token === 8) {
            this.lx_1 = this.lx_1 + 1 | 0;
            if (this.lx_1 >= this.kx_1) {
                jsonTooNested(this.kx_1);
            }
            var result_0 = readArray(this);
            this.lx_1 = this.lx_1 - 1 | 0;
            tmp = result_0;
        } else {
            this.hx_1.qw('Cannot read Json element because of unexpected ' + tokenDescription(token));
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
        this.yy_1 = begin;
        this.zy_1 = end;
    }
    function modeFor(_this__u8e3s4, desc) {
        var tmp0_subject = desc.bh();
        var tmp;
        if (tmp0_subject instanceof PolymorphicKind) {
            tmp = LexerMode_POLY_OBJ_getInstance();
        } else {
            if (equals(tmp0_subject, LIST_getInstance())) {
                tmp = LexerMode_LIST_getInstance();
            } else {
                if (equals(tmp0_subject, MAP_getInstance())) {
                    var keyDescriptor = carrierDescriptor(desc.jh(0), _this__u8e3s4.mj());
                    var keyKind = keyDescriptor.bh();
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
                        if (_this__u8e3s4.mt_1.iu_1) {
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
        if (equals(_this__u8e3s4.bh(), CONTEXTUAL_getInstance())) {
            var tmp0_safe_receiver = getContextualDescriptor(module_0, _this__u8e3s4);
            var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : carrierDescriptor(tmp0_safe_receiver, module_0);
            tmp = tmp1_elvis_lhs == null ? _this__u8e3s4 : tmp1_elvis_lhs;
        } else if (_this__u8e3s4.dh()) {
            tmp = carrierDescriptor(_this__u8e3s4.jh(0), module_0);
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
        this.rw_1 = createMapForCache(16);
    }
    protoOf(DescriptorSchemaCache).az = function(descriptor, key, value) {
        var this_0 = this.rw_1;
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
    protoOf(DescriptorSchemaCache).sw = function(descriptor, key, defaultValue) {
        var tmp0_safe_receiver = this.bz(descriptor, key);
        if (tmp0_safe_receiver == null) null; else {
            return tmp0_safe_receiver;
        }
        var value = defaultValue();
        this.az(descriptor, key, value);
        return value;
    };
    protoOf(DescriptorSchemaCache).bz = function(descriptor, key) {
        var tmp0_safe_receiver = this.rw_1.t1(descriptor);
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
        this.cz_1 = discriminatorToSkip;
    }
    function trySkip($this, $receiver, unknownKey) {
        if ($receiver == null) return false;
        if ($receiver.cz_1 === unknownKey) {
            $receiver.cz_1 = null;
            return true;
        }
        return false;
    }
    function skipLeftoverElements($this, descriptor) {
        while (!($this.oj(descriptor) === -1)) {}
    }
    function checkLeadingComma($this) {
        if ($this.tt_1.nx() === 4) {
            $this.tt_1.qw('Unexpected leading comma');
        }
    }
    function decodeMapIndex($this) {
        var hasComma = false;
        var decodingKey = !(($this.vt_1 % 2 | 0) === 0);
        if (decodingKey) {
            if (!($this.vt_1 === -1)) {
                hasComma = $this.tt_1.ez();
            }
        } else {
            $this.tt_1.dz(_Char___init__impl__6a9atx(58));
        }
        var tmp;
        if ($this.tt_1.ox()) {
            if (decodingKey) {
                if ($this.vt_1 === -1) {
                    var tmp0 = $this.tt_1;
                    var condition = !hasComma;
                    var position = tmp0.au_1;
                    if (!condition) {
                        var tmp$ret$1 = 'Unexpected leading comma';
                        tmp0.qw(tmp$ret$1, position);
                    }
                } else {
                    var tmp0_0 = $this.tt_1;
                    var condition_0 = hasComma;
                    var position_0 = tmp0_0.au_1;
                    if (!condition_0) {
                        var tmp$ret$3 = 'Expected comma after the key-value pair';
                        tmp0_0.qw(tmp$ret$3, position_0);
                    }
                }
            }
            $this.vt_1 = $this.vt_1 + 1 | 0;
            tmp = $this.vt_1;
        } else {
            if (hasComma && !$this.rt_1.mt_1.tu_1) {
                invalidTrailingComma($this.tt_1);
            }
            tmp = -1;
        }
        return tmp;
    }
    function coerceInputValue($this, descriptor, index) {
        var tmp0 = $this.rt_1;
        var tmp$ret$0;
        $l$block_2: {
            var isOptional = descriptor.kh(index);
            var elementDescriptor = descriptor.jh(index);
            var tmp;
            if (isOptional && !elementDescriptor.ch()) {
                tmp = $this.tt_1.fz(true);
            } else {
                tmp = false;
            }
            if (tmp) {
                tmp$ret$0 = true;
                break $l$block_2;
            }
            if (equals(elementDescriptor.bh(), ENUM_getInstance())) {
                var tmp_0;
                if (elementDescriptor.ch()) {
                    tmp_0 = $this.tt_1.fz(false);
                } else {
                    tmp_0 = false;
                }
                if (tmp_0) {
                    tmp$ret$0 = false;
                    break $l$block_2;
                }
                var tmp0_elvis_lhs = $this.tt_1.gz($this.xt_1.hu_1);
                var tmp_1;
                if (tmp0_elvis_lhs == null) {
                    tmp$ret$0 = false;
                    break $l$block_2;
                } else {
                    tmp_1 = tmp0_elvis_lhs;
                }
                var enumValue = tmp_1;
                var enumIndex = getJsonNameIndex(elementDescriptor, tmp0, enumValue);
                var coerceToNull = !tmp0.mt_1.ku_1 && elementDescriptor.ch();
                if (enumIndex === -3 && (isOptional || coerceToNull)) {
                    $this.tt_1.px();
                    tmp$ret$0 = true;
                    break $l$block_2;
                }
            }
            tmp$ret$0 = false;
        }
        return tmp$ret$0;
    }
    function decodeObjectIndex($this, descriptor) {
        var hasComma = $this.tt_1.ez();
        while ($this.tt_1.ox()) {
            hasComma = false;
            var key = decodeStringKey($this);
            $this.tt_1.dz(_Char___init__impl__6a9atx(58));
            var index = getJsonNameIndex(descriptor, $this.rt_1, key);
            var tmp;
            if (!(index === -3)) {
                var tmp_0;
                if ($this.xt_1.mu_1 && coerceInputValue($this, descriptor, index)) {
                    hasComma = $this.tt_1.ez();
                    tmp_0 = false;
                } else {
                    var tmp0_safe_receiver = $this.yt_1;
                    if (tmp0_safe_receiver == null) null; else {
                        tmp0_safe_receiver.nw(index);
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
        if (hasComma && !$this.rt_1.mt_1.tu_1) {
            invalidTrailingComma($this.tt_1);
        }
        var tmp1_safe_receiver = $this.yt_1;
        var tmp2_elvis_lhs = tmp1_safe_receiver == null ? null : tmp1_safe_receiver.ow();
        return tmp2_elvis_lhs == null ? -1 : tmp2_elvis_lhs;
    }
    function handleUnknown($this, descriptor, key) {
        if (ignoreUnknownKeys(descriptor, $this.rt_1) || trySkip($this, $this.wt_1, key)) {
            $this.tt_1.iz($this.xt_1.hu_1);
        } else {
            $this.tt_1.bu_1.ex();
            $this.tt_1.hz(key);
        }
        return $this.tt_1.ez();
    }
    function decodeListIndex($this) {
        var hasComma = $this.tt_1.ez();
        var tmp;
        if ($this.tt_1.ox()) {
            if (!($this.vt_1 === -1) && !hasComma) {
                $this.tt_1.qw('Expected end of the array or comma');
            }
            $this.vt_1 = $this.vt_1 + 1 | 0;
            tmp = $this.vt_1;
        } else {
            if (hasComma && !$this.rt_1.mt_1.tu_1) {
                invalidTrailingComma($this.tt_1, 'array');
            }
            tmp = -1;
        }
        return tmp;
    }
    function decodeStringKey($this) {
        var tmp;
        if ($this.xt_1.hu_1) {
            tmp = $this.tt_1.kz();
        } else {
            tmp = $this.tt_1.jz();
        }
        return tmp;
    }
    function StreamingJsonDecoder(json, mode, lexer, descriptor, discriminatorHolder) {
        AbstractDecoder.call(this);
        this.rt_1 = json;
        this.st_1 = mode;
        this.tt_1 = lexer;
        this.ut_1 = this.rt_1.mj();
        this.vt_1 = -1;
        this.wt_1 = discriminatorHolder;
        this.xt_1 = this.rt_1.mt_1;
        this.yt_1 = this.xt_1.ku_1 ? null : new JsonElementMarker(descriptor);
    }
    protoOf(StreamingJsonDecoder).yu = function() {
        return this.rt_1;
    };
    protoOf(StreamingJsonDecoder).mj = function() {
        return this.ut_1;
    };
    protoOf(StreamingJsonDecoder).zu = function() {
        return new JsonTreeReader(this.rt_1.mt_1, this.tt_1).rx();
    };
    protoOf(StreamingJsonDecoder).yi = function(deserializer) {
        var tmp2_withExceptionHandling_this = this.tt_1.bu_1;
        var tmp3_withExceptionHandling_this = this.tt_1;
        var tmp;
        try {
            var tmp_0;
            if (!(deserializer instanceof AbstractPolymorphicSerializer)) {
                tmp_0 = true;
            } else {
                tmp_0 = this.rt_1.mt_1.nu_1;
            }
            if (tmp_0) {
                return deserializer.tg(this);
            }
            var discriminator = classDiscriminator(deserializer.sg(), this.rt_1);
            var tmp0_elvis_lhs = this.tt_1.lz(discriminator, this.xt_1.hu_1);
            var tmp_1;
            if (tmp0_elvis_lhs == null) {
                var tmp2 = isInterface(deserializer, DeserializationStrategy) ? deserializer : THROW_CCE();
                var tmp$ret$2;
                $l$block: {
                    var tmp_2;
                    if (!(tmp2 instanceof AbstractPolymorphicSerializer)) {
                        tmp_2 = true;
                    } else {
                        tmp_2 = this.yu().mt_1.nu_1;
                    }
                    if (tmp_2) {
                        tmp$ret$2 = tmp2.tg(this);
                        break $l$block;
                    }
                    var discriminator_0 = classDiscriminator(tmp2.sg(), this.yu());
                    var tmp2_0 = this.zu();
                    var serialName = tmp2.sg().ah();
                    if (!(tmp2_0 instanceof JsonObject)) {
                        var tmp2_1 = 'Expected ' + getKClass(JsonObject).k8() + ', but had ' + getKClassFromExpression(tmp2_0).k8() + ' as the serialized body of ' + serialName;
                        var path = this.tt_1.bu_1.fx();
                        var tmp_3;
                        if (this.yu().mt_1.wu_1) {
                            var tmp$ret$8 = toString_1(tmp2_0);
                            tmp_3 = toString_1(minify(tmp$ret$8));
                        } else {
                            tmp_3 = null;
                        }
                        var inputValue = tmp_3;
                        throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, tmp2_1, path, null, inputValue), tmp2_1, -1, path, inputValue, null);
                    }
                    var jsonTree = tmp2_0;
                    var tmp0_safe_receiver = jsonTree.cv(discriminator_0);
                    var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : get_jsonPrimitive(tmp0_safe_receiver);
                    var type = tmp1_safe_receiver == null ? null : get_contentOrNull(tmp1_safe_receiver);
                    var tmp_4 = tmp2.rj(this, type);
                    var actualSerializer = (!(tmp_4 == null) ? isInterface(tmp_4, DeserializationStrategy) : false) ? tmp_4 : null;
                    if (actualSerializer == null) {
                        var _destruct__k2r9zo = subtypeNotRegisteredMessageJson(type, tmp2.qj());
                        var message = _destruct__k2r9zo.oa();
                        var hint = _destruct__k2r9zo.pa();
                        var path_0 = this.tt_1.bu_1.fx();
                        var tmp_5;
                        if (this.yu().mt_1.wu_1) {
                            var tmp$ret$13 = jsonTree.toString();
                            tmp_5 = toString_1(minify(tmp$ret$13));
                        } else {
                            tmp_5 = null;
                        }
                        var inputValue_0 = tmp_5;
                        throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, message, path_0, hint, inputValue_0), message, -1, path_0, inputValue_0, hint);
                    }
                    tmp$ret$2 = readPolymorphicJson(this.yu(), discriminator_0, jsonTree, actualSerializer);
                }
                return tmp$ret$2;
            } else {
                tmp_1 = tmp0_elvis_lhs;
            }
            var type_0 = tmp_1;
            var tmp_6 = deserializer.rj(this, type_0);
            var actualSerializer_0 = (!(tmp_6 == null) ? isInterface(tmp_6, DeserializationStrategy) : false) ? tmp_6 : null;
            if (actualSerializer_0 == null) {
                var _destruct__k2r9zo_0 = subtypeNotRegisteredMessageJson(type_0, deserializer.qj());
                var message_0 = _destruct__k2r9zo_0.oa();
                var hint_0 = _destruct__k2r9zo_0.pa();
                this.tt_1.qw(message_0, VOID, hint_0);
            }
            this.wt_1 = new DiscriminatorHolder(discriminator);
            tmp = actualSerializer_0.tg(this);
        } catch ($p) {
            var tmp_7;
            if ($p instanceof MissingFieldException) {
                var e = $p;
                if (contains_5(ensureNotNull(e.message), 'at path')) throw e;
                var tmp_8 = plus_0(e.message, ' at path: ');
                var tmp$ret$14 = tmp2_withExceptionHandling_this.fx();
                throw missingFieldExceptionWithNewMessage(e, tmp_8 + tmp$ret$14);
            } else {
                if ($p instanceof SerializationException) {
                    var e_0 = $p;
                    throw e_0;
                } else {
                    if ($p instanceof Exception) {
                        var e_1 = $p;
                        var path_1 = tmp2_withExceptionHandling_this.fx();
                        var causeMessage = e_1.message;
                        var shortMessage = 'Deserialization failed because of ' + (causeMessage == null ? 'an exception' : "'" + causeMessage + "' exception") + ' in the decoder';
                        var tmp_9;
                        if (this.yu().mt_1.wu_1) {
                            var tmp$ret$19 = tmp3_withExceptionHandling_this.mz();
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
    protoOf(StreamingJsonDecoder).zi = function(descriptor) {
        var newMode = modeFor(this.rt_1, descriptor);
        this.tt_1.bu_1.ax(descriptor);
        this.tt_1.dz(newMode.yy_1);
        checkLeadingComma(this);
        var tmp;
        switch (newMode.c2_1) {
          case 1:
          case 2:
          case 3:
            tmp = new StreamingJsonDecoder(this.rt_1, newMode, this.tt_1, descriptor, this.wt_1);
            break;

          default:
            var tmp_0;
            if (this.st_1.equals(newMode) && this.rt_1.mt_1.ku_1) {
                tmp_0 = this;
            } else {
                tmp_0 = new StreamingJsonDecoder(this.rt_1, newMode, this.tt_1, descriptor, this.wt_1);
            }
            tmp = tmp_0;
            break;
        }
        return tmp;
    };
    protoOf(StreamingJsonDecoder).aj = function(descriptor) {
        if (descriptor.eh() === 0 && ignoreUnknownKeys(descriptor, this.rt_1)) {
            skipLeftoverElements(this, descriptor);
        }
        if (this.tt_1.ez() && !this.rt_1.mt_1.tu_1) {
            invalidTrailingComma(this.tt_1, '');
        }
        this.tt_1.dz(this.st_1.zy_1);
        this.tt_1.bu_1.ex();
    };
    protoOf(StreamingJsonDecoder).li = function() {
        var tmp;
        var tmp0_safe_receiver = this.yt_1;
        var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.mw_1;
        if (!(tmp1_elvis_lhs == null ? false : tmp1_elvis_lhs)) {
            tmp = !this.tt_1.nz();
        } else {
            tmp = false;
        }
        return tmp;
    };
    protoOf(StreamingJsonDecoder).mi = function() {
        return null;
    };
    protoOf(StreamingJsonDecoder).kj = function(descriptor, index, deserializer, previousValue) {
        var isMapKey = this.st_1.equals(LexerMode_MAP_getInstance()) && (index & 1) === 0;
        if (isMapKey) {
            this.tt_1.bu_1.dx();
        }
        var value = protoOf(AbstractDecoder).kj.call(this, descriptor, index, deserializer, previousValue);
        if (isMapKey) {
            this.tt_1.bu_1.cx(value);
        }
        return value;
    };
    protoOf(StreamingJsonDecoder).oj = function(descriptor) {
        var index;
        switch (this.st_1.c2_1) {
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
        if (!this.st_1.equals(LexerMode_MAP_getInstance())) {
            this.tt_1.bu_1.bx(index);
        }
        return index;
    };
    protoOf(StreamingJsonDecoder).ni = function() {
        return this.tt_1.oz();
    };
    protoOf(StreamingJsonDecoder).oi = function() {
        var value = this.tt_1.pz();
        if (!equalsLong(value, fromInt(convertToByte(value)))) {
            this.tt_1.qw("Failed to parse byte for input '" + value.toString() + "'");
        }
        return convertToByte(value);
    };
    protoOf(StreamingJsonDecoder).pi = function() {
        var value = this.tt_1.pz();
        if (!equalsLong(value, fromInt(convertToShort(value)))) {
            this.tt_1.qw("Failed to parse short for input '" + value.toString() + "'");
        }
        return convertToShort(value);
    };
    protoOf(StreamingJsonDecoder).qi = function() {
        var value = this.tt_1.pz();
        if (!equalsLong(value, fromInt(convertToInt(value)))) {
            this.tt_1.qw("Failed to parse int for input '" + value.toString() + "'");
        }
        return convertToInt(value);
    };
    protoOf(StreamingJsonDecoder).ri = function() {
        return this.tt_1.pz();
    };
    protoOf(StreamingJsonDecoder).si = function() {
        var tmp0 = this.tt_1;
        var tmp$ret$0;
        $l$block: {
            var input = tmp0.qx();
            try {
                tmp$ret$0 = toDouble(input);
                break $l$block;
            } catch ($p) {
                if ($p instanceof IllegalArgumentException) {
                    var e = $p;
                    tmp0.qw("Failed to parse type '" + 'float' + "' for input '" + input + "'");
                } else {
                    throw $p;
                }
            }
        }
        var result = tmp$ret$0;
        var specialFp = this.rt_1.mt_1.pu_1;
        if (specialFp || isFinite_0(result)) return result;
        throwInvalidFloatingPointDecoded(this.tt_1, result);
    };
    protoOf(StreamingJsonDecoder).ti = function() {
        var tmp0 = this.tt_1;
        var tmp$ret$0;
        $l$block: {
            var input = tmp0.qx();
            try {
                tmp$ret$0 = toDouble(input);
                break $l$block;
            } catch ($p) {
                if ($p instanceof IllegalArgumentException) {
                    var e = $p;
                    tmp0.qw("Failed to parse type '" + 'double' + "' for input '" + input + "'");
                } else {
                    throw $p;
                }
            }
        }
        var result = tmp$ret$0;
        var specialFp = this.rt_1.mt_1.pu_1;
        if (specialFp || isFinite(result)) return result;
        throwInvalidFloatingPointDecoded(this.tt_1, result);
    };
    protoOf(StreamingJsonDecoder).ui = function() {
        var string = this.tt_1.qx();
        if (!(string.length === 1)) {
            this.tt_1.qw("Expected single char, but got '" + string + "'");
        }
        return charCodeAt(string, 0);
    };
    protoOf(StreamingJsonDecoder).vi = function() {
        var tmp;
        if (this.xt_1.hu_1) {
            tmp = this.tt_1.kz();
        } else {
            tmp = this.tt_1.px();
        }
        return tmp;
    };
    protoOf(StreamingJsonDecoder).wi = function(descriptor) {
        return get_isUnsignedNumber(descriptor) ? new JsonDecoderForUnsignedTypes(this.tt_1, this.rt_1) : protoOf(AbstractDecoder).wi.call(this, descriptor);
    };
    function JsonDecoderForUnsignedTypes(lexer, json) {
        AbstractDecoder.call(this);
        this.qz_1 = lexer;
        this.rz_1 = json.mj();
    }
    protoOf(JsonDecoderForUnsignedTypes).mj = function() {
        return this.rz_1;
    };
    protoOf(JsonDecoderForUnsignedTypes).oj = function(descriptor) {
        var message = 'unsupported';
        throw IllegalStateException_init_$Create$_0(toString_1(message));
    };
    protoOf(JsonDecoderForUnsignedTypes).qi = function() {
        var tmp0 = this.qz_1;
        var tmp$ret$0;
        $l$block: {
            var input = tmp0.qx();
            try {
                var this_0 = toUInt(input);
                tmp$ret$0 = _UInt___get_data__impl__f0vqqw(this_0);
                break $l$block;
            } catch ($p) {
                if ($p instanceof IllegalArgumentException) {
                    var e = $p;
                    tmp0.qw("Failed to parse type '" + 'UInt' + "' for input '" + input + "'");
                } else {
                    throw $p;
                }
            }
        }
        return tmp$ret$0;
    };
    protoOf(JsonDecoderForUnsignedTypes).ri = function() {
        var tmp0 = this.qz_1;
        var tmp$ret$0;
        $l$block: {
            var input = tmp0.qx();
            try {
                var this_0 = toULong(input);
                tmp$ret$0 = _ULong___get_data__impl__fggpzb(this_0);
                break $l$block;
            } catch ($p) {
                if ($p instanceof IllegalArgumentException) {
                    var e = $p;
                    tmp0.qw("Failed to parse type '" + 'ULong' + "' for input '" + input + "'");
                } else {
                    throw $p;
                }
            }
        }
        return tmp$ret$0;
    };
    protoOf(JsonDecoderForUnsignedTypes).oi = function() {
        var tmp0 = this.qz_1;
        var tmp$ret$0;
        $l$block: {
            var input = tmp0.qx();
            try {
                var this_0 = toUByte(input);
                tmp$ret$0 = _UByte___get_data__impl__jof9qr(this_0);
                break $l$block;
            } catch ($p) {
                if ($p instanceof IllegalArgumentException) {
                    var e = $p;
                    tmp0.qw("Failed to parse type '" + 'UByte' + "' for input '" + input + "'");
                } else {
                    throw $p;
                }
            }
        }
        return tmp$ret$0;
    };
    protoOf(JsonDecoderForUnsignedTypes).pi = function() {
        var tmp0 = this.qz_1;
        var tmp$ret$0;
        $l$block: {
            var input = tmp0.qx();
            try {
                var this_0 = toUShort(input);
                tmp$ret$0 = _UShort___get_data__impl__g0245(this_0);
                break $l$block;
            } catch ($p) {
                if ($p instanceof IllegalArgumentException) {
                    var e = $p;
                    tmp0.qw("Failed to parse type '" + 'UShort' + "' for input '" + input + "'");
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
        return _this__u8e3s4.dh() && get_unsignedNumberDescriptors().m1(_this__u8e3s4);
    }
    var properties_initialized_StreamingJsonEncoder_kt_6ifwwk;
    function _init_properties_StreamingJsonEncoder_kt__pn1bsi() {
        if (!properties_initialized_StreamingJsonEncoder_kt_6ifwwk) {
            properties_initialized_StreamingJsonEncoder_kt_6ifwwk = true;
            unsignedNumberDescriptors = setOf_0([ serializer_0(Companion_getInstance_17()).sg(), serializer_1(Companion_getInstance_18()).sg(), serializer_2(Companion_getInstance_16()).sg(), serializer_3(Companion_getInstance_19()).sg() ]);
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
        _this__u8e3s4.a7(_Char___init__impl__6a9atx(34));
        var lastPos = 0;
        var inductionVariable = 0;
        var last = charSequenceLength(value) - 1 | 0;
        if (inductionVariable <= last) do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var this_0 = charCodeAt(value, i);
            var c = Char__toInt_impl_vasixd(this_0);
            if (c < get_ESCAPE_STRINGS().length && !(get_ESCAPE_STRINGS()[c] == null)) {
                _this__u8e3s4.o9(value, lastPos, i);
                _this__u8e3s4.z6(get_ESCAPE_STRINGS()[c]);
                lastPos = i + 1 | 0;
            }
        } while (inductionVariable <= last);
        if (!(lastPos === 0)) _this__u8e3s4.o9(value, lastPos, value.length); else _this__u8e3s4.z6(value);
        _this__u8e3s4.a7(_Char___init__impl__6a9atx(34));
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
        var descriptor = deserializer.sg();
        return new JsonTreeDecoder(_this__u8e3s4, element, descriptor, discriminator, descriptor).yi(deserializer);
    }
    function unparsedPrimitive($this, literal, primitive, tag) {
        var type = startsWith(primitive, 'i') ? 'an ' + primitive : 'a ' + primitive;
        var tmp2 = "Failed to parse literal '" + literal.toString() + "' as " + type + ' value';
        var path = $this.yz(tag);
        var tmp;
        if ($this.yu().mt_1.wu_1) {
            var tmp$ret$3 = toString_1($this.zz());
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
        this.uz_1 = json;
        this.vz_1 = value;
        this.wz_1 = polymorphicDiscriminator;
        this.xz_1 = this.yu().mt_1;
    }
    protoOf(AbstractJsonTreeDecoder).yu = function() {
        return this.uz_1;
    };
    protoOf(AbstractJsonTreeDecoder).q1 = function() {
        return this.vz_1;
    };
    protoOf(AbstractJsonTreeDecoder).mj = function() {
        return this.yu().mj();
    };
    protoOf(AbstractJsonTreeDecoder).zz = function() {
        var tmp0_safe_receiver = this.fs();
        var tmp;
        if (tmp0_safe_receiver == null) {
            tmp = null;
        } else {
            tmp = this.a10(tmp0_safe_receiver);
        }
        var tmp1_elvis_lhs = tmp;
        return tmp1_elvis_lhs == null ? this.q1() : tmp1_elvis_lhs;
    };
    protoOf(AbstractJsonTreeDecoder).yz = function(currentTag) {
        return this.hs() + ('.' + currentTag);
    };
    protoOf(AbstractJsonTreeDecoder).zu = function() {
        return this.zz();
    };
    protoOf(AbstractJsonTreeDecoder).yi = function(deserializer) {
        var tmp2_withExceptionHandling_this = this.zz();
        var tmp;
        try {
            var tmp$ret$2;
            $l$block: {
                var tmp_0;
                if (!(deserializer instanceof AbstractPolymorphicSerializer)) {
                    tmp_0 = true;
                } else {
                    tmp_0 = this.yu().mt_1.nu_1;
                }
                if (tmp_0) {
                    tmp$ret$2 = deserializer.tg(this);
                    break $l$block;
                }
                var discriminator = classDiscriminator(deserializer.sg(), this.yu());
                var tmp2 = this.zu();
                var serialName = deserializer.sg().ah();
                if (!(tmp2 instanceof JsonObject)) {
                    var tmp2_0 = 'Expected ' + getKClass(JsonObject).k8() + ', but had ' + getKClassFromExpression(tmp2).k8() + ' as the serialized body of ' + serialName;
                    var path = this.hs();
                    var tmp_1;
                    if (this.yu().mt_1.wu_1) {
                        var tmp$ret$8 = toString_1(tmp2);
                        tmp_1 = toString_1(minify(tmp$ret$8));
                    } else {
                        tmp_1 = null;
                    }
                    var inputValue = tmp_1;
                    throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, tmp2_0, path, null, inputValue), tmp2_0, -1, path, inputValue, null);
                }
                var jsonTree = tmp2;
                var tmp0_safe_receiver = jsonTree.cv(discriminator);
                var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : get_jsonPrimitive(tmp0_safe_receiver);
                var type = tmp1_safe_receiver == null ? null : get_contentOrNull(tmp1_safe_receiver);
                var tmp_2 = deserializer.rj(this, type);
                var actualSerializer = (!(tmp_2 == null) ? isInterface(tmp_2, DeserializationStrategy) : false) ? tmp_2 : null;
                if (actualSerializer == null) {
                    var _destruct__k2r9zo = subtypeNotRegisteredMessageJson(type, deserializer.qj());
                    var message = _destruct__k2r9zo.oa();
                    var hint = _destruct__k2r9zo.pa();
                    var path_0 = this.hs();
                    var tmp_3;
                    if (this.yu().mt_1.wu_1) {
                        var tmp$ret$13 = jsonTree.toString();
                        tmp_3 = toString_1(minify(tmp$ret$13));
                    } else {
                        tmp_3 = null;
                    }
                    var inputValue_0 = tmp_3;
                    throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, message, path_0, hint, inputValue_0), message, -1, path_0, inputValue_0, hint);
                }
                tmp$ret$2 = readPolymorphicJson(this.yu(), discriminator, jsonTree, actualSerializer);
            }
            tmp = tmp$ret$2;
        } catch ($p) {
            var tmp_4;
            if ($p instanceof MissingFieldException) {
                var e = $p;
                if (contains_5(ensureNotNull(e.message), 'at path')) throw e;
                var tmp_5 = plus_0(e.message, ' at path: ');
                var tmp$ret$14 = this.hs();
                throw missingFieldExceptionWithNewMessage(e, tmp_5 + tmp$ret$14);
            } else {
                if ($p instanceof SerializationException) {
                    var e_0 = $p;
                    throw e_0;
                } else {
                    if ($p instanceof Exception) {
                        var e_1 = $p;
                        var path_1 = this.hs();
                        var causeMessage = e_1.message;
                        var shortMessage = 'Deserialization failed because of ' + (causeMessage == null ? 'an exception' : "'" + causeMessage + "' exception") + ' in the decoder';
                        var tmp_6;
                        if (this.yu().mt_1.wu_1) {
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
    protoOf(AbstractJsonTreeDecoder).gs = function(parentName, childName) {
        return childName;
    };
    protoOf(AbstractJsonTreeDecoder).zi = function(descriptor) {
        var currentObject = this.zz();
        var tmp0_subject = descriptor.bh();
        var tmp;
        var tmp_0;
        if (equals(tmp0_subject, LIST_getInstance())) {
            tmp_0 = true;
        } else {
            tmp_0 = tmp0_subject instanceof PolymorphicKind;
        }
        if (tmp_0) {
            var tmp_1 = this.yu();
            var serialName = descriptor.ah();
            if (!(currentObject instanceof JsonArray)) {
                var tmp2 = 'Expected ' + getKClass(JsonArray).k8() + ', but had ' + getKClassFromExpression(currentObject).k8() + ' as the serialized body of ' + serialName;
                var path = this.hs();
                var tmp_2;
                if (this.yu().mt_1.wu_1) {
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
                var this_0 = this.yu();
                var keyDescriptor = carrierDescriptor(descriptor.jh(0), this_0.mj());
                var keyKind = keyDescriptor.bh();
                var tmp_3;
                var tmp_4;
                if (keyKind instanceof PrimitiveKind) {
                    tmp_4 = true;
                } else {
                    tmp_4 = equals(keyKind, ENUM_getInstance());
                }
                if (tmp_4) {
                    var tmp_5 = this.yu();
                    var serialName_0 = descriptor.ah();
                    if (!(currentObject instanceof JsonObject)) {
                        var tmp2_0 = 'Expected ' + getKClass(JsonObject).k8() + ', but had ' + getKClassFromExpression(currentObject).k8() + ' as the serialized body of ' + serialName_0;
                        var path_0 = this.hs();
                        var tmp_6;
                        if (this.yu().mt_1.wu_1) {
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
                    if (this_0.mt_1.iu_1) {
                        var tmp_7 = this.yu();
                        var serialName_1 = descriptor.ah();
                        if (!(currentObject instanceof JsonArray)) {
                            var tmp2_1 = 'Expected ' + getKClass(JsonArray).k8() + ', but had ' + getKClassFromExpression(currentObject).k8() + ' as the serialized body of ' + serialName_1;
                            var path_1 = this.hs();
                            var tmp_8;
                            if (this.yu().mt_1.wu_1) {
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
                var tmp_9 = this.yu();
                var serialName_2 = descriptor.ah();
                if (!(currentObject instanceof JsonObject)) {
                    var tmp2_2 = 'Expected ' + getKClass(JsonObject).k8() + ', but had ' + getKClassFromExpression(currentObject).k8() + ' as the serialized body of ' + serialName_2;
                    var path_2 = this.hs();
                    var tmp_10;
                    if (this.yu().mt_1.wu_1) {
                        var tmp$ret$30 = toString_1(currentObject);
                        tmp_10 = toString_1(minify(tmp$ret$30));
                    } else {
                        tmp_10 = null;
                    }
                    var inputValue_2 = tmp_10;
                    throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, tmp2_2, path_2, null, inputValue_2), tmp2_2, -1, path_2, inputValue_2, null);
                }
                tmp = new JsonTreeDecoder(tmp_9, currentObject, descriptor, this.wz_1);
            }
        }
        return tmp;
    };
    protoOf(AbstractJsonTreeDecoder).aj = function(descriptor) {};
    protoOf(AbstractJsonTreeDecoder).li = function() {
        var tmp = this.zz();
        return !(tmp instanceof JsonNull);
    };
    protoOf(AbstractJsonTreeDecoder).b10 = function(tag) {
        return !(this.a10(tag) === JsonNull_getInstance());
    };
    protoOf(AbstractJsonTreeDecoder).js = function(tag) {
        return this.b10((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
    };
    protoOf(AbstractJsonTreeDecoder).c10 = function(tag) {
        var tmp$ret$0;
        $l$block: {
            var value = this.a10(tag);
            if (!(value instanceof JsonPrimitive)) {
                var tmp2 = 'Expected ' + getKClass(JsonPrimitive).k8() + ', but had ' + getKClassFromExpression(value).k8() + ' as the serialized body of ' + 'boolean';
                var path = this.yz(tag);
                var tmp;
                if (this.yu().mt_1.wu_1) {
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
    protoOf(AbstractJsonTreeDecoder).ks = function(tag) {
        return this.c10((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
    };
    protoOf(AbstractJsonTreeDecoder).d10 = function(tag) {
        var tmp$ret$0;
        $l$block: {
            var value = this.a10(tag);
            if (!(value instanceof JsonPrimitive)) {
                var tmp2 = 'Expected ' + getKClass(JsonPrimitive).k8() + ', but had ' + getKClassFromExpression(value).k8() + ' as the serialized body of ' + 'byte';
                var path = this.yz(tag);
                var tmp;
                if (this.yu().mt_1.wu_1) {
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
                if (contains_4(isInterface(this_0, ClosedRange) ? this_0 : THROW_CCE(), result)) {
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
    protoOf(AbstractJsonTreeDecoder).ls = function(tag) {
        return this.d10((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
    };
    protoOf(AbstractJsonTreeDecoder).e10 = function(tag) {
        var tmp$ret$0;
        $l$block: {
            var value = this.a10(tag);
            if (!(value instanceof JsonPrimitive)) {
                var tmp2 = 'Expected ' + getKClass(JsonPrimitive).k8() + ', but had ' + getKClassFromExpression(value).k8() + ' as the serialized body of ' + 'short';
                var path = this.yz(tag);
                var tmp;
                if (this.yu().mt_1.wu_1) {
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
                if (contains_4(isInterface(this_0, ClosedRange) ? this_0 : THROW_CCE(), result)) {
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
    protoOf(AbstractJsonTreeDecoder).ms = function(tag) {
        return this.e10((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
    };
    protoOf(AbstractJsonTreeDecoder).f10 = function(tag) {
        var tmp$ret$0;
        $l$block: {
            var value = this.a10(tag);
            if (!(value instanceof JsonPrimitive)) {
                var tmp2 = 'Expected ' + getKClass(JsonPrimitive).k8() + ', but had ' + getKClassFromExpression(value).k8() + ' as the serialized body of ' + 'int';
                var path = this.yz(tag);
                var tmp;
                if (this.yu().mt_1.wu_1) {
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
                if (contains_4(isInterface(this_0, ClosedRange) ? this_0 : THROW_CCE(), result)) {
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
    protoOf(AbstractJsonTreeDecoder).ns = function(tag) {
        return this.f10((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
    };
    protoOf(AbstractJsonTreeDecoder).g10 = function(tag) {
        var tmp$ret$0;
        $l$block: {
            var value = this.a10(tag);
            if (!(value instanceof JsonPrimitive)) {
                var tmp2 = 'Expected ' + getKClass(JsonPrimitive).k8() + ', but had ' + getKClassFromExpression(value).k8() + ' as the serialized body of ' + 'long';
                var path = this.yz(tag);
                var tmp;
                if (this.yu().mt_1.wu_1) {
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
    protoOf(AbstractJsonTreeDecoder).os = function(tag) {
        return this.g10((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
    };
    protoOf(AbstractJsonTreeDecoder).h10 = function(tag) {
        var tmp$ret$0;
        $l$block: {
            var value = this.a10(tag);
            if (!(value instanceof JsonPrimitive)) {
                var tmp2 = 'Expected ' + getKClass(JsonPrimitive).k8() + ', but had ' + getKClassFromExpression(value).k8() + ' as the serialized body of ' + 'float';
                var path = this.yz(tag);
                var tmp;
                if (this.yu().mt_1.wu_1) {
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
        var specialFp = this.yu().mt_1.pu_1;
        if (specialFp || isFinite_0(result)) return result;
        var tmp2_0 = access$nonFiniteFpMessage$tJsonExceptionsKt(result, tag);
        var hint = "It is possible to deserialize them using 'JsonBuilder.allowSpecialFloatingPointValues = true'";
        var tmp_1;
        if (this.yu().mt_1.wu_1) {
            var tmp$ret$13 = toString_1(this.zz());
            tmp_1 = toString_1(minify(tmp$ret$13));
        } else {
            tmp_1 = null;
        }
        var inputValue_0 = tmp_1;
        throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, tmp2_0, null, hint, inputValue_0), tmp2_0, -1, null, inputValue_0, hint);
    };
    protoOf(AbstractJsonTreeDecoder).ps = function(tag) {
        return this.h10((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
    };
    protoOf(AbstractJsonTreeDecoder).i10 = function(tag) {
        var tmp$ret$0;
        $l$block: {
            var value = this.a10(tag);
            if (!(value instanceof JsonPrimitive)) {
                var tmp2 = 'Expected ' + getKClass(JsonPrimitive).k8() + ', but had ' + getKClassFromExpression(value).k8() + ' as the serialized body of ' + 'double';
                var path = this.yz(tag);
                var tmp;
                if (this.yu().mt_1.wu_1) {
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
        var specialFp = this.yu().mt_1.pu_1;
        if (specialFp || isFinite(result)) return result;
        var tmp2_0 = access$nonFiniteFpMessage$tJsonExceptionsKt(result, tag);
        var hint = "It is possible to deserialize them using 'JsonBuilder.allowSpecialFloatingPointValues = true'";
        var tmp_1;
        if (this.yu().mt_1.wu_1) {
            var tmp$ret$13 = toString_1(this.zz());
            tmp_1 = toString_1(minify(tmp$ret$13));
        } else {
            tmp_1 = null;
        }
        var inputValue_0 = tmp_1;
        throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, tmp2_0, null, hint, inputValue_0), tmp2_0, -1, null, inputValue_0, hint);
    };
    protoOf(AbstractJsonTreeDecoder).qs = function(tag) {
        return this.i10((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
    };
    protoOf(AbstractJsonTreeDecoder).j10 = function(tag) {
        var tmp$ret$0;
        $l$block: {
            var value = this.a10(tag);
            if (!(value instanceof JsonPrimitive)) {
                var tmp2 = 'Expected ' + getKClass(JsonPrimitive).k8() + ', but had ' + getKClassFromExpression(value).k8() + ' as the serialized body of ' + 'char';
                var path = this.yz(tag);
                var tmp;
                if (this.yu().mt_1.wu_1) {
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
                var tmp0_elvis_lhs = new Char(single_2(literal.dv()));
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
    protoOf(AbstractJsonTreeDecoder).rs = function(tag) {
        return this.j10((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
    };
    protoOf(AbstractJsonTreeDecoder).k10 = function(tag) {
        var value = this.a10(tag);
        if (!(value instanceof JsonPrimitive)) {
            var tmp2 = 'Expected ' + getKClass(JsonPrimitive).k8() + ', but had ' + getKClassFromExpression(value).k8() + ' as the serialized body of ' + 'string';
            var path = this.yz(tag);
            var tmp;
            if (this.yu().mt_1.wu_1) {
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
            var tmp4 = this.yz(tag);
            var hint = "Use 'coerceInputValues = true' in 'Json {}' builder to coerce nulls if property has a default value.";
            var tmp_0;
            if (this.yu().mt_1.wu_1) {
                var tmp$ret$10 = toString_1(this.zz());
                tmp_0 = toString_1(minify(tmp$ret$10));
            } else {
                tmp_0 = null;
            }
            var inputValue_0 = tmp_0;
            throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, tmp2_0, tmp4, hint, inputValue_0), tmp2_0, -1, tmp4, inputValue_0, hint);
        }
        if (!value_0.jv_1 && !this.yu().mt_1.hu_1) {
            var tmp2_1 = "String literal for value of key '" + tag + "' should be quoted";
            var tmp4_0 = this.yz(tag);
            var hint_0 = "Use 'isLenient = true' in 'Json {}' builder to accept non-compliant JSON.";
            var tmp_1;
            if (this.yu().mt_1.wu_1) {
                var tmp$ret$14 = toString_1(this.zz());
                tmp_1 = toString_1(minify(tmp$ret$14));
            } else {
                tmp_1 = null;
            }
            var inputValue_1 = tmp_1;
            throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, tmp2_1, tmp4_0, hint_0, inputValue_1), tmp2_1, -1, tmp4_0, inputValue_1, hint_0);
        }
        return value_0.lv_1;
    };
    protoOf(AbstractJsonTreeDecoder).ss = function(tag) {
        return this.k10((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
    };
    protoOf(AbstractJsonTreeDecoder).l10 = function(tag, inlineDescriptor) {
        var tmp;
        if (get_isUnsignedNumber(inlineDescriptor)) {
            var tmp_0 = this.yu();
            var tmp2 = this.a10(tag);
            var serialName = inlineDescriptor.ah();
            if (!(tmp2 instanceof JsonPrimitive)) {
                var tmp2_0 = 'Expected ' + getKClass(JsonPrimitive).k8() + ', but had ' + getKClassFromExpression(tmp2).k8() + ' as the serialized body of ' + serialName;
                var path = this.yz(tag);
                var tmp_1;
                if (this.yu().mt_1.wu_1) {
                    var tmp$ret$7 = toString_1(tmp2);
                    tmp_1 = toString_1(minify(tmp$ret$7));
                } else {
                    tmp_1 = null;
                }
                var inputValue = tmp_1;
                throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, tmp2_0, path, null, inputValue), tmp2_0, -1, path, inputValue, null);
            }
            var lexer = StringJsonLexer_0(tmp_0, tmp2.dv());
            tmp = new JsonDecoderForUnsignedTypes(lexer, this.yu());
        } else {
            tmp = protoOf(NamedValueDecoder).ts.call(this, tag, inlineDescriptor);
        }
        return tmp;
    };
    protoOf(AbstractJsonTreeDecoder).ts = function(tag, inlineDescriptor) {
        return this.l10((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), inlineDescriptor);
    };
    protoOf(AbstractJsonTreeDecoder).wi = function(descriptor) {
        return !(this.fs() == null) ? protoOf(NamedValueDecoder).wi.call(this, descriptor) : new JsonPrimitiveDecoder(this.yu(), this.q1(), this.wz_1).wi(descriptor);
    };
    function coerceInputValue_0($this, descriptor, index, element) {
        var tmp0 = $this.yu();
        var tmp$ret$0;
        $l$block_2: {
            var isOptional = descriptor.kh(index);
            var elementDescriptor = descriptor.jh(index);
            var tmp;
            if (isOptional && !elementDescriptor.ch()) {
                tmp = element instanceof JsonNull;
            } else {
                tmp = false;
            }
            if (tmp) {
                tmp$ret$0 = true;
                break $l$block_2;
            }
            if (equals(elementDescriptor.bh(), ENUM_getInstance())) {
                var tmp_0;
                if (elementDescriptor.ch()) {
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
                var coerceToNull = !tmp0.mt_1.ku_1 && elementDescriptor.ch();
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
        var tmp4 = $this.hs();
        var hint = "Use 'ignoreUnknownKeys = true' in 'Json {}' builder or '@JsonIgnoreUnknownKeys' annotation to ignore unknown keys.";
        var tmp;
        if ($this.yu().mt_1.wu_1) {
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
        this.s10_1 = value;
        this.t10_1 = polyDescriptor;
        this.u10_1 = this.q1().w1().g();
        this.v10_1 = this.xz_1.ku_1 ? null : new JsonElementMarker(descriptor);
        this.w10_1 = null;
        this.x10_1 = null;
    }
    protoOf(JsonTreeDecoder).q1 = function() {
        return this.s10_1;
    };
    protoOf(JsonTreeDecoder).oj = function(descriptor) {
        var entries = this.u10_1;
        $l$loop: while (entries.h()) {
            var entry = entries.i();
            var key = entry.p1();
            var index = getJsonNameIndex(descriptor, this.yu(), key);
            if (!(index === -3)) {
                if (this.xz_1.mu_1 && coerceInputValue_0(this, descriptor, index, entry.q1())) {
                    continue $l$loop;
                }
                var tmp0_safe_receiver = this.v10_1;
                if (tmp0_safe_receiver == null) null; else {
                    tmp0_safe_receiver.nw(index);
                }
                this.w10_1 = key;
                this.x10_1 = entry.q1();
                return index;
            }
            if (!(key === this.wz_1) && !ignoreUnknownKeys(descriptor, this.yu())) {
                throwUnknownKey(this, key);
            }
        }
        var tmp1_safe_receiver = this.v10_1;
        var tmp2_elvis_lhs = tmp1_safe_receiver == null ? null : tmp1_safe_receiver.ow();
        var markerIndex = tmp2_elvis_lhs == null ? -1 : tmp2_elvis_lhs;
        if (!(markerIndex === -1)) {
            this.w10_1 = descriptor.gh(markerIndex);
            this.x10_1 = null;
        }
        return markerIndex;
    };
    protoOf(JsonTreeDecoder).li = function() {
        var tmp;
        var tmp0_safe_receiver = this.v10_1;
        var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.mw_1;
        if (!(tmp1_elvis_lhs == null ? false : tmp1_elvis_lhs)) {
            tmp = protoOf(AbstractJsonTreeDecoder).li.call(this);
        } else {
            tmp = false;
        }
        return tmp;
    };
    protoOf(JsonTreeDecoder).bs = function(descriptor, index) {
        var tmp0_elvis_lhs = this.w10_1;
        return tmp0_elvis_lhs == null ? descriptor.gh(index) : tmp0_elvis_lhs;
    };
    protoOf(JsonTreeDecoder).a10 = function(tag) {
        var tmp0_elvis_lhs = this.x10_1;
        return tmp0_elvis_lhs == null ? getValue(this.q1(), tag) : tmp0_elvis_lhs;
    };
    protoOf(JsonTreeDecoder).zi = function(descriptor) {
        if (descriptor === this.t10_1) {
            var tmp = this.yu();
            var tmp2 = this.zz();
            var serialName = this.t10_1.ah();
            if (!(tmp2 instanceof JsonObject)) {
                var tmp2_0 = 'Expected ' + getKClass(JsonObject).k8() + ', but had ' + getKClassFromExpression(tmp2).k8() + ' as the serialized body of ' + serialName;
                var path = this.hs();
                var tmp_0;
                if (this.yu().mt_1.wu_1) {
                    var tmp$ret$6 = toString_1(tmp2);
                    tmp_0 = toString_1(minify(tmp$ret$6));
                } else {
                    tmp_0 = null;
                }
                var inputValue = tmp_0;
                throw new JsonDecodingException(access$formatDecodingException$tJsonExceptionsKt(-1, tmp2_0, path, null, inputValue), tmp2_0, -1, path, inputValue, null);
            }
            return new JsonTreeDecoder(tmp, tmp2, descriptor, this.wz_1, this.t10_1);
        }
        return protoOf(AbstractJsonTreeDecoder).zi.call(this, descriptor);
    };
    function JsonTreeListDecoder(json, value) {
        AbstractJsonTreeDecoder.call(this, json, value);
        this.e11_1 = value;
        this.f11_1 = this.e11_1.j();
        this.g11_1 = -1;
    }
    protoOf(JsonTreeListDecoder).q1 = function() {
        return this.e11_1;
    };
    protoOf(JsonTreeListDecoder).bs = function(descriptor, index) {
        return index.toString();
    };
    protoOf(JsonTreeListDecoder).a10 = function(tag) {
        return this.e11_1.m(toInt(tag));
    };
    protoOf(JsonTreeListDecoder).oj = function(descriptor) {
        while (this.g11_1 < (this.f11_1 - 1 | 0)) {
            this.g11_1 = this.g11_1 + 1 | 0;
            return this.g11_1;
        }
        return -1;
    };
    function JsonPrimitiveDecoder(json, value, polymorphicDiscriminator) {
        polymorphicDiscriminator = polymorphicDiscriminator === VOID ? null : polymorphicDiscriminator;
        AbstractJsonTreeDecoder.call(this, json, value, polymorphicDiscriminator);
        this.n11_1 = value;
        this.us('primitive');
    }
    protoOf(JsonPrimitiveDecoder).q1 = function() {
        return this.n11_1;
    };
    protoOf(JsonPrimitiveDecoder).oj = function(descriptor) {
        return 0;
    };
    protoOf(JsonPrimitiveDecoder).a10 = function(tag) {
        if (!(tag === 'primitive')) {
            var message = "This input can only handle primitives with 'primitive' tag";
            throw IllegalArgumentException_init_$Create$_0(toString_1(message));
        }
        return this.n11_1;
    };
    function JsonTreeMapDecoder(json, value, descriptor) {
        JsonTreeDecoder.call(this, json, value, descriptor);
        this.a12_1 = toList_0(value.u1());
        this.b12_1 = imul(this.a12_1.j(), 2);
        this.c12_1 = -1;
    }
    protoOf(JsonTreeMapDecoder).bs = function(descriptor, index) {
        var i = index / 2 | 0;
        return this.a12_1.m(i);
    };
    protoOf(JsonTreeMapDecoder).oj = function(descriptor) {
        while (this.c12_1 < (this.b12_1 - 1 | 0)) {
            this.c12_1 = this.c12_1 + 1 | 0;
            return this.c12_1;
        }
        return -1;
    };
    protoOf(JsonTreeMapDecoder).a10 = function(tag) {
        return (this.c12_1 % 2 | 0) === 0 ? JsonPrimitive_1(tag) : getValue(this.q1(), tag);
    };
    protoOf(JsonTreeMapDecoder).aj = function(descriptor) {};
    function appendEscape($this, lastPosition, current) {
        $this.d12(lastPosition, current);
        return appendEsc($this, current + 1 | 0);
    }
    function decodedString($this, lastPosition, currentPosition) {
        $this.d12(lastPosition, currentPosition);
        var result = $this.du_1.toString();
        $this.du_1.t9(0);
        return result;
    }
    function takePeeked($this) {
        var this_0 = ensureNotNull($this.cu_1);
        $this.cu_1 = null;
        return this_0;
    }
    function wasUnquotedString($this) {
        return !(charSequenceGet($this.mz(), $this.au_1 - 1 | 0) === _Char___init__impl__6a9atx(34));
    }
    function appendEsc($this, startPosition) {
        var currentPosition = startPosition;
        currentPosition = $this.e12(currentPosition);
        if (currentPosition === -1) {
            $this.qw('Expected escape sequence to continue, got EOF');
        }
        var tmp = $this.mz();
        var _unary__edvuaz = currentPosition;
        currentPosition = _unary__edvuaz + 1 | 0;
        var currentChar = charSequenceGet(tmp, _unary__edvuaz);
        if (currentChar === _Char___init__impl__6a9atx(117)) {
            return appendHex($this, $this.mz(), currentPosition);
        }
        var tmp$ret$0 = Char__toInt_impl_vasixd(currentChar);
        var c = escapeToChar(tmp$ret$0);
        if (c === _Char___init__impl__6a9atx(0)) {
            $this.qw("Invalid escaped char '" + toString(currentChar) + "'");
        }
        $this.du_1.a7(c);
        return currentPosition;
    }
    function appendHex($this, source, startPos) {
        if ((startPos + 4 | 0) >= charSequenceLength(source)) {
            $this.au_1 = startPos;
            $this.f12();
            if (($this.au_1 + 4 | 0) >= charSequenceLength(source)) {
                $this.qw('Unexpected EOF during unicode escape');
            }
            return appendHex($this, source, $this.au_1);
        }
        $this.du_1.a7(numberToChar((((fromHexChar($this, source, startPos) << 12) + (fromHexChar($this, source, startPos + 1 | 0) << 8) | 0) + (fromHexChar($this, source, startPos + 2 | 0) << 4) | 0) + fromHexChar($this, source, startPos + 3 | 0) | 0));
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
            $this.qw("Invalid toHexChar char '" + toString(character) + "' in unicode escape");
        }
        return tmp;
    }
    function consumeBoolean2($this, start) {
        var current = $this.e12(start);
        if (current >= charSequenceLength($this.mz()) || current === -1) {
            $this.qw('EOF');
        }
        var tmp = $this.mz();
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
                $this.qw("Expected valid boolean literal prefix, but had '" + $this.qx() + "'");
            }
        }
        return tmp_0;
    }
    function consumeBooleanLiteral($this, literalSuffix, current) {
        if ((charSequenceLength($this.mz()) - current | 0) < literalSuffix.length) {
            $this.qw('Unexpected end of boolean literal');
        }
        var inductionVariable = 0;
        var last = charSequenceLength(literalSuffix) - 1 | 0;
        if (inductionVariable <= last) do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var expected = charCodeAt(literalSuffix, i);
            var actual = charSequenceGet($this.mz(), current + i | 0);
            var tmp = Char__toInt_impl_vasixd(expected);
            if (!(tmp === (Char__toInt_impl_vasixd(actual) | 32))) {
                $this.qw("Expected valid boolean literal prefix, but had '" + $this.qx() + "'");
            }
        } while (inductionVariable <= last);
        $this.au_1 = current + literalSuffix.length | 0;
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
        this.zt_1 = configuration;
        this.au_1 = 0;
        this.bu_1 = new JsonPath(this.zt_1);
        this.cu_1 = null;
        this.du_1 = StringBuilder_init_$Create$_0();
    }
    protoOf(AbstractJsonLexer).f12 = function() {};
    protoOf(AbstractJsonLexer).ez = function() {
        var current = this.g12();
        var source = this.mz();
        if (current >= charSequenceLength(source) || current === -1) return false;
        if (charSequenceGet(source, current) === _Char___init__impl__6a9atx(44)) {
            this.au_1 = this.au_1 + 1 | 0;
            return true;
        }
        return false;
    };
    protoOf(AbstractJsonLexer).h12 = function(c) {
        return c === _Char___init__impl__6a9atx(125) || c === _Char___init__impl__6a9atx(93) || (c === _Char___init__impl__6a9atx(58) || c === _Char___init__impl__6a9atx(44)) ? false : true;
    };
    protoOf(AbstractJsonLexer).eu = function() {
        var nextToken = this.sx();
        if (!(nextToken === 10)) {
            this.qw('Expected EOF after parsing, but had ' + toString(charSequenceGet(this.mz(), this.au_1 - 1 | 0)) + ' instead');
        }
    };
    protoOf(AbstractJsonLexer).mx = function(expected) {
        var token = this.sx();
        if (!(token === expected)) {
            var expected_0 = tokenDescription(expected);
            var position = true && this.au_1 > 0 ? this.au_1 - 1 | 0 : this.au_1;
            var s = this.au_1 === charSequenceLength(this.mz()) || position < 0 ? 'EOF' : toString(charSequenceGet(this.mz(), position));
            var tmp$ret$1 = 'Expected ' + expected_0 + ", but had '" + s + "' instead";
            this.qw(tmp$ret$1, position);
        }
        return token;
    };
    protoOf(AbstractJsonLexer).i12 = function(expected) {
        if (this.au_1 > 0 && expected === _Char___init__impl__6a9atx(34)) {
            var tmp$ret$0;
            $l$block: {
                var snapshot = this.au_1;
                try {
                    this.au_1 = this.au_1 - 1 | 0;
                    tmp$ret$0 = this.qx();
                    break $l$block;
                } finally {
                    this.au_1 = snapshot;
                }
            }
            var inputLiteral = tmp$ret$0;
            if (inputLiteral === 'null') {
                this.pw("Expected string literal but 'null' literal was found", this.au_1 - 1 | 0, "Use 'coerceInputValues = true' in 'Json {}' builder to coerce nulls if property has a default value.");
            }
        }
        var expectedToken = charToTokenClass(expected);
        var expected_0 = tokenDescription(expectedToken);
        var position = true && this.au_1 > 0 ? this.au_1 - 1 | 0 : this.au_1;
        var s = this.au_1 === charSequenceLength(this.mz()) || position < 0 ? 'EOF' : toString(charSequenceGet(this.mz(), position));
        var tmp$ret$3 = 'Expected ' + expected_0 + ", but had '" + s + "' instead";
        this.qw(tmp$ret$3, position);
    };
    protoOf(AbstractJsonLexer).nx = function() {
        var source = this.mz();
        var cpos = this.au_1;
        $l$loop_0: while (true) {
            cpos = this.e12(cpos);
            if (cpos === -1) break $l$loop_0;
            var ch = charSequenceGet(source, cpos);
            if (ch === _Char___init__impl__6a9atx(32) || ch === _Char___init__impl__6a9atx(10) || ch === _Char___init__impl__6a9atx(13) || ch === _Char___init__impl__6a9atx(9)) {
                cpos = cpos + 1 | 0;
                continue $l$loop_0;
            }
            this.au_1 = cpos;
            return charToTokenClass(ch);
        }
        this.au_1 = cpos;
        return 10;
    };
    protoOf(AbstractJsonLexer).fz = function(doConsume) {
        var current = this.g12();
        current = this.e12(current);
        var len = charSequenceLength(this.mz()) - current | 0;
        if (len < 4 || current === -1) return false;
        var inductionVariable = 0;
        if (inductionVariable <= 3) do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            if (!(charCodeAt('null', i) === charSequenceGet(this.mz(), current + i | 0))) return false;
        } while (inductionVariable <= 3);
        if (len > 4 && charToTokenClass(charSequenceGet(this.mz(), current + 4 | 0)) === 0) return false;
        if (doConsume) {
            this.au_1 = current + 4 | 0;
        }
        return true;
    };
    protoOf(AbstractJsonLexer).nz = function(doConsume, $super) {
        doConsume = doConsume === VOID ? true : doConsume;
        return $super === VOID ? this.fz(doConsume) : $super.fz.call(this, doConsume);
    };
    protoOf(AbstractJsonLexer).gz = function(isLenient) {
        var token = this.nx();
        var tmp;
        if (isLenient) {
            if (!(token === 1) && !(token === 0)) return null;
            tmp = this.qx();
        } else {
            if (!(token === 1)) return null;
            tmp = this.px();
        }
        var string = tmp;
        this.cu_1 = string;
        return string;
    };
    protoOf(AbstractJsonLexer).j12 = function() {
        this.cu_1 = null;
    };
    protoOf(AbstractJsonLexer).k12 = function(startPos, endPos) {
        var this_0 = this.mz();
        return toString_1(charSequenceSubSequence(this_0, startPos, endPos));
    };
    protoOf(AbstractJsonLexer).px = function() {
        if (!(this.cu_1 == null)) {
            return takePeeked(this);
        }
        return this.jz();
    };
    protoOf(AbstractJsonLexer).consumeString2 = function(source, startPosition, current) {
        var currentPosition = current;
        var lastPosition = startPosition;
        var char = charSequenceGet(source, currentPosition);
        var usedAppend = false;
        while (!(char === _Char___init__impl__6a9atx(34))) {
            if (char === _Char___init__impl__6a9atx(92)) {
                usedAppend = true;
                currentPosition = this.e12(appendEscape(this, lastPosition, currentPosition));
                if (currentPosition === -1) {
                    this.qw('Unexpected EOF', currentPosition);
                }
                lastPosition = currentPosition;
            } else {
                currentPosition = currentPosition + 1 | 0;
                if (currentPosition >= charSequenceLength(source)) {
                    usedAppend = true;
                    this.d12(lastPosition, currentPosition);
                    currentPosition = this.e12(currentPosition);
                    if (currentPosition === -1) {
                        this.qw('Unexpected EOF', currentPosition);
                    }
                    lastPosition = currentPosition;
                }
            }
            char = charSequenceGet(source, currentPosition);
        }
        var tmp;
        if (!usedAppend) {
            tmp = this.k12(lastPosition, currentPosition);
        } else {
            tmp = decodedString(this, lastPosition, currentPosition);
        }
        var string = tmp;
        this.au_1 = currentPosition + 1 | 0;
        return string;
    };
    protoOf(AbstractJsonLexer).kz = function() {
        var result = this.qx();
        if (result === 'null' && wasUnquotedString(this)) {
            this.qw("Unexpected 'null' value instead of string literal");
        }
        return result;
    };
    protoOf(AbstractJsonLexer).qx = function() {
        if (!(this.cu_1 == null)) {
            return takePeeked(this);
        }
        var current = this.g12();
        if (current >= charSequenceLength(this.mz()) || current === -1) {
            this.qw('EOF', current);
        }
        var token = charToTokenClass(charSequenceGet(this.mz(), current));
        if (token === 1) {
            return this.px();
        }
        if (!(token === 0)) {
            this.qw('Expected beginning of the string, but got ' + toString(charSequenceGet(this.mz(), current)));
        }
        var usedAppend = false;
        while (charToTokenClass(charSequenceGet(this.mz(), current)) === 0) {
            current = current + 1 | 0;
            if (current >= charSequenceLength(this.mz())) {
                usedAppend = true;
                this.d12(this.au_1, current);
                var eof = this.e12(current);
                if (eof === -1) {
                    this.au_1 = current;
                    return decodedString(this, 0, 0);
                } else {
                    current = eof;
                }
            }
        }
        var tmp;
        if (!usedAppend) {
            tmp = this.k12(this.au_1, current);
        } else {
            tmp = decodedString(this, this.au_1, current);
        }
        var result = tmp;
        this.au_1 = current;
        return result;
    };
    protoOf(AbstractJsonLexer).d12 = function(fromIndex, toIndex) {
        this.du_1.o9(this.mz(), fromIndex, toIndex);
    };
    protoOf(AbstractJsonLexer).iz = function(allowLenientStrings) {
        var tokenStack = ArrayList_init_$Create$();
        var lastToken = this.nx();
        if (!(lastToken === 8) && !(lastToken === 6)) {
            this.qx();
            return Unit_instance;
        }
        $l$loop: while (true) {
            lastToken = this.nx();
            if (lastToken === 1) {
                if (allowLenientStrings) this.qx(); else this.jz();
                continue $l$loop;
            }
            var tmp0_subject = lastToken;
            if (tmp0_subject === 8 || tmp0_subject === 6) {
                tokenStack.f(lastToken);
            } else if (tmp0_subject === 9) {
                if (!(last(tokenStack) === 8)) {
                    this.qw('found ] instead of }');
                }
                removeLast(tokenStack);
            } else if (tmp0_subject === 7) {
                if (!(last(tokenStack) === 6)) {
                    this.qw('found } instead of ]');
                }
                removeLast(tokenStack);
            } else if (tmp0_subject === 10) {
                this.qw('Unexpected end of input due to malformed JSON during ignoring unknown keys');
            }
            this.sx();
            if (tokenStack.j() === 0) return Unit_instance;
        }
    };
    protoOf(AbstractJsonLexer).toString = function() {
        return "JsonReader(source='" + toString_1(this.mz()) + "', currentPosition=" + this.au_1 + ')';
    };
    protoOf(AbstractJsonLexer).hz = function(key) {
        var processed = this.k12(0, this.au_1);
        var lastIndexOf_0 = lastIndexOf(processed, key);
        this.pw("Encountered an unknown key '" + key + "'", lastIndexOf_0, "Use 'ignoreUnknownKeys = true' in 'Json {}' builder or '@JsonIgnoreUnknownKeys' annotation to ignore unknown keys.");
    };
    protoOf(AbstractJsonLexer).pw = function(message, position, hint) {
        throw decodingExceptionOf_0(this, message, position, this.bu_1.fx(), hint, this.mz());
    };
    protoOf(AbstractJsonLexer).qw = function(message, position, hint, $super) {
        position = position === VOID ? this.au_1 : position;
        hint = hint === VOID ? null : hint;
        return $super === VOID ? this.pw(message, position, hint) : $super.pw.call(this, message, position, hint);
    };
    protoOf(AbstractJsonLexer).pz = function() {
        var current = this.g12();
        current = this.e12(current);
        if (current >= charSequenceLength(this.mz()) || current === -1) {
            this.qw('EOF');
        }
        var tmp;
        if (charSequenceGet(this.mz(), current) === _Char___init__impl__6a9atx(34)) {
            current = current + 1 | 0;
            if (current === charSequenceLength(this.mz())) {
                this.qw('EOF');
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
        $l$loop_4: while (!(current === charSequenceLength(this.mz()))) {
            var ch = charSequenceGet(this.mz(), current);
            if ((ch === _Char___init__impl__6a9atx(101) || ch === _Char___init__impl__6a9atx(69)) && !hasExponent) {
                if (current === start) {
                    this.qw("Unexpected symbol '" + toString(ch) + "' in numeric literal", current);
                }
                isExponentPositive = true;
                hasExponent = true;
                current = current + 1 | 0;
                continue $l$loop_4;
            }
            if (ch === _Char___init__impl__6a9atx(45) && hasExponent) {
                if (current === start) {
                    this.qw("Unexpected symbol '-' in numeric literal", current);
                }
                isExponentPositive = false;
                current = current + 1 | 0;
                continue $l$loop_4;
            }
            if (ch === _Char___init__impl__6a9atx(43) && hasExponent) {
                if (current === start) {
                    this.qw("Unexpected symbol '+' in numeric literal", current);
                }
                isExponentPositive = true;
                current = current + 1 | 0;
                continue $l$loop_4;
            }
            if (ch === _Char___init__impl__6a9atx(45)) {
                if (!(current === start)) {
                    this.qw("Unexpected symbol '-' in numeric literal", current);
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
                this.qw("Unexpected symbol '" + toString(ch) + "' in numeric literal", current - 1 | 0);
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
                this.qw('Numeric value overflow');
            }
        }
        var hasChars = !(current === start);
        if (start === current || isNegative && start === (current - 1 | 0)) {
            this.qw('Expected numeric literal', current);
        }
        if (hasQuotation) {
            if (!hasChars) {
                this.qw('EOF');
            }
            if (!(charSequenceGet(this.mz(), current) === _Char___init__impl__6a9atx(34))) {
                this.qw('Expected closing quotation mark', current);
            }
            current = current + 1 | 0;
        }
        this.au_1 = current;
        if (hasExponent) {
            var doubleAccumulator = toNumber(accumulator) * consumeNumericLiteral$calculateExponent(exponentAccumulator, isExponentPositive);
            if (doubleAccumulator > toNumber(new Long(-1, 2147483647)) || doubleAccumulator < toNumber(new Long(0, -2147483648))) {
                this.qw('Numeric value overflow');
            }
            if (!(Math.floor(doubleAccumulator) === doubleAccumulator)) {
                this.qw("Can't convert " + doubleAccumulator + ' to Long');
            }
            accumulator = numberToLong(doubleAccumulator);
        }
        var tmp_0;
        if (isNegative) {
            tmp_0 = accumulator;
        } else if (!equalsLong(accumulator, new Long(0, -2147483648))) {
            tmp_0 = negate(accumulator);
        } else {
            this.qw('Numeric value overflow');
        }
        return tmp_0;
    };
    protoOf(AbstractJsonLexer).iv = function() {
        var result = this.pz();
        var next = this.sx();
        if (!(next === 10)) {
            var expected = tokenDescription(10);
            var position = true && this.au_1 > 0 ? this.au_1 - 1 | 0 : this.au_1;
            var s = this.au_1 === charSequenceLength(this.mz()) || position < 0 ? 'EOF' : toString(charSequenceGet(this.mz(), position));
            var tmp$ret$1 = "Expected input to contain a single valid number, but got '" + s + "' after it";
            this.qw(tmp$ret$1, position);
        }
        return result;
    };
    protoOf(AbstractJsonLexer).oz = function() {
        var current = this.g12();
        if (current === charSequenceLength(this.mz())) {
            this.qw('EOF');
        }
        var tmp;
        if (charSequenceGet(this.mz(), current) === _Char___init__impl__6a9atx(34)) {
            current = current + 1 | 0;
            tmp = true;
        } else {
            tmp = false;
        }
        var hasQuotation = tmp;
        var result = consumeBoolean2(this, current);
        if (hasQuotation) {
            if (this.au_1 === charSequenceLength(this.mz())) {
                this.qw('EOF');
            }
            if (!(charSequenceGet(this.mz(), this.au_1) === _Char___init__impl__6a9atx(34))) {
                this.qw('Expected closing quotation mark');
            }
            this.au_1 = this.au_1 + 1 | 0;
        }
        return result;
    };
    function charToTokenClass(c) {
        var tmp;
        if (Char__toInt_impl_vasixd(c) < 126) {
            var tmp_0 = CharMappings_getInstance().m12_1;
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
        return c < 117 ? CharMappings_getInstance().l12_1[c] : _Char___init__impl__6a9atx(0);
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
            $this.l12_1[tmp$ret$0] = numberToChar(c);
        }
    }
    function initC2ESC_0($this, c, esc) {
        var tmp$ret$0 = Char__toInt_impl_vasixd(c);
        return initC2ESC($this, tmp$ret$0, esc);
    }
    function initC2TC($this, c, cl) {
        $this.m12_1[c] = cl;
    }
    function initC2TC_0($this, c, cl) {
        var tmp$ret$0 = Char__toInt_impl_vasixd(c);
        return initC2TC($this, tmp$ret$0, cl);
    }
    function CharMappings() {
        CharMappings_instance = this;
        this.l12_1 = charArray(117);
        this.m12_1 = new Int8Array(126);
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
    protoOf(StringJsonLexerWithComments).sx = function() {
        var source = this.mz();
        var cpos = this.g12();
        if (cpos >= source.length || cpos === -1) return 10;
        this.au_1 = cpos + 1 | 0;
        return charToTokenClass(charCodeAt(source, cpos));
    };
    protoOf(StringJsonLexerWithComments).ox = function() {
        var current = this.g12();
        if (current >= this.mz().length || current === -1) return false;
        return this.h12(charCodeAt(this.mz(), current));
    };
    protoOf(StringJsonLexerWithComments).dz = function(expected) {
        var source = this.mz();
        var current = this.g12();
        if (current >= source.length || current === -1) {
            this.au_1 = -1;
            this.i12(expected);
        }
        var c = charCodeAt(source, current);
        this.au_1 = current + 1 | 0;
        if (c === expected) return Unit_instance; else {
            this.i12(expected);
        }
    };
    protoOf(StringJsonLexerWithComments).nx = function() {
        var source = this.mz();
        var cpos = this.g12();
        if (cpos >= source.length || cpos === -1) return 10;
        this.au_1 = cpos;
        return charToTokenClass(charCodeAt(source, cpos));
    };
    protoOf(StringJsonLexerWithComments).g12 = function() {
        var current = this.au_1;
        if (current === -1) return current;
        var source = this.mz();
        $l$loop_1: while (current < source.length) {
            var c = charCodeAt(source, current);
            if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9)) {
                current = current + 1 | 0;
                continue $l$loop_1;
            }
            if (c === _Char___init__impl__6a9atx(47) && (current + 1 | 0) < source.length) {
                var tmp0_subject = charCodeAt(source, current + 1 | 0);
                if (tmp0_subject === _Char___init__impl__6a9atx(47)) {
                    current = indexOf_4(source, _Char___init__impl__6a9atx(10), current + 2 | 0);
                    if (current === -1) {
                        current = source.length;
                    } else {
                        current = current + 1 | 0;
                    }
                    continue $l$loop_1;
                } else if (tmp0_subject === _Char___init__impl__6a9atx(42)) {
                    current = indexOf_5(source, '*/', current + 2 | 0);
                    if (current === -1) {
                        this.au_1 = source.length;
                        this.qw('Expected end of the block comment: "*/", but had EOF instead');
                    } else {
                        current = current + 2 | 0;
                    }
                    continue $l$loop_1;
                }
            }
            break $l$loop_1;
        }
        this.au_1 = current;
        return current;
    };
    function StringJsonLexer(source, configuration) {
        AbstractJsonLexer.call(this, configuration);
        this.y12_1 = source;
    }
    protoOf(StringJsonLexer).mz = function() {
        return this.y12_1;
    };
    protoOf(StringJsonLexer).e12 = function(position) {
        return position < this.mz().length ? position : -1;
    };
    protoOf(StringJsonLexer).sx = function() {
        var source = this.mz();
        var cpos = this.au_1;
        $l$loop: while (!(cpos === -1) && cpos < source.length) {
            var _unary__edvuaz = cpos;
            cpos = _unary__edvuaz + 1 | 0;
            var c = charCodeAt(source, _unary__edvuaz);
            if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9)) continue $l$loop;
            this.au_1 = cpos;
            return charToTokenClass(c);
        }
        this.au_1 = source.length;
        return 10;
    };
    protoOf(StringJsonLexer).ox = function() {
        var current = this.au_1;
        if (current === -1) return false;
        var source = this.mz();
        $l$loop: while (current < source.length) {
            var c = charCodeAt(source, current);
            if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9)) {
                current = current + 1 | 0;
                continue $l$loop;
            }
            this.au_1 = current;
            return this.h12(c);
        }
        this.au_1 = current;
        return false;
    };
    protoOf(StringJsonLexer).g12 = function() {
        var current = this.au_1;
        if (current === -1) return current;
        var source = this.mz();
        $l$loop: while (current < source.length) {
            var c = charCodeAt(source, current);
            if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9)) {
                current = current + 1 | 0;
            } else {
                break $l$loop;
            }
        }
        this.au_1 = current;
        return current;
    };
    protoOf(StringJsonLexer).dz = function(expected) {
        if (this.au_1 === -1) {
            this.i12(expected);
        }
        var source = this.mz();
        var cpos = this.au_1;
        $l$loop: while (cpos < source.length) {
            var _unary__edvuaz = cpos;
            cpos = _unary__edvuaz + 1 | 0;
            var c = charCodeAt(source, _unary__edvuaz);
            if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9)) continue $l$loop;
            this.au_1 = cpos;
            if (c === expected) return Unit_instance;
            this.i12(expected);
        }
        this.au_1 = -1;
        this.i12(expected);
    };
    protoOf(StringJsonLexer).jz = function() {
        this.dz(_Char___init__impl__6a9atx(34));
        var current = this.au_1;
        var closingQuote = indexOf_4(this.mz(), _Char___init__impl__6a9atx(34), current);
        if (closingQuote === -1) {
            this.qx();
            var expected = tokenDescription(1);
            var position = false && this.au_1 > 0 ? this.au_1 - 1 | 0 : this.au_1;
            var s = this.au_1 === charSequenceLength(this.mz()) || position < 0 ? 'EOF' : toString(charSequenceGet(this.mz(), position));
            var tmp$ret$1 = 'Expected ' + expected + ", but had '" + s + "' instead";
            this.qw(tmp$ret$1, position);
        }
        var inductionVariable = current;
        if (inductionVariable < closingQuote) do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            if (charCodeAt(this.mz(), i) === _Char___init__impl__6a9atx(92)) {
                return this.consumeString2(this.mz(), this.au_1, i);
            }
        } while (inductionVariable < closingQuote);
        this.au_1 = closingQuote + 1 | 0;
        return substring(this.mz(), current, closingQuote);
    };
    protoOf(StringJsonLexer).lz = function(keyToMatch, isLenient) {
        var positionSnapshot = this.au_1;
        try {
            if (!(this.sx() === 6)) return null;
            var firstKey = this.gz(isLenient);
            if (!(firstKey === keyToMatch)) return null;
            this.j12();
            if (!(this.sx() === 5)) return null;
            return this.gz(isLenient);
        } finally {
            this.au_1 = positionSnapshot;
            this.j12();
        }
    };
    function StringJsonLexer_0(json, source) {
        return !json.mt_1.uu_1 ? new StringJsonLexer(source, json.mt_1) : new StringJsonLexerWithComments(source, json.mt_1);
    }
    function get_schemaCache(_this__u8e3s4) {
        return _this__u8e3s4.ot_1;
    }
    function createMapForCache(initialCapacity) {
        return HashMap_init_$Create$_0(initialCapacity);
    }
    function Ship(cells) {
        this.z12_1 = cells;
    }
    function _get_settingOut__x7we4z($this) {
        return $this.e13_1.j() < $this.a13_1.j();
    }
    function setOut($this, player, action) {
        var tmp0_safe_receiver = action.cv('do');
        var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : get_jsonPrimitive(tmp0_safe_receiver);
        var command = tmp1_safe_receiver == null ? null : get_contentOrNull(tmp1_safe_receiver);
        if (command === 'unready') return $this.e13_1.y2(player);
        if ($this.e13_1.m1(player)) return false;
        var fleet = getValue($this.d13_1, player);
        var tmp;
        switch (command) {
          case 'place':
            tmp = place($this, fleet, action);
            break;

          case 'move':
            tmp = move($this, fleet, action);
            break;

          case 'remove':
            var tmp3_safe_receiver = action.cv('x');
            var tmp4_safe_receiver = tmp3_safe_receiver == null ? null : get_jsonPrimitive(tmp3_safe_receiver);
            var tmp5_elvis_lhs = tmp4_safe_receiver == null ? null : get_intOrNull(tmp4_safe_receiver);
            var tmp_0;
            if (tmp5_elvis_lhs == null) {
                return false;
            } else {
                tmp_0 = tmp5_elvis_lhs;
            }
            var x = tmp_0;
            var tmp6_safe_receiver = action.cv('y');
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
            fleet.a2();
            var elements = placeFleet($this, $this.b13_1);
            addAll(fleet, elements);
            tmp = true;
            break;

          case 'clear':
            var hadAny = !fleet.k();
            fleet.a2();
            tmp = hadAny;
            break;

          case 'ready':
            tmp = remaining($this, fleet).k() && $this.e13_1.f(player);
            break;

          default:
            tmp = false;
            break;
        }
        return tmp;
    }
    function place($this, fleet, action) {
        var tmp0_safe_receiver = action.cv('size');
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
        fleet.f(element);
        return true;
    }
    function move($this, fleet, action) {
        var tmp0_safe_receiver = action.cv('fromX');
        var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : get_jsonPrimitive(tmp0_safe_receiver);
        var tmp2_elvis_lhs = tmp1_safe_receiver == null ? null : get_intOrNull(tmp1_safe_receiver);
        var tmp;
        if (tmp2_elvis_lhs == null) {
            return false;
        } else {
            tmp = tmp2_elvis_lhs;
        }
        var fromX = tmp;
        var tmp3_safe_receiver = action.cv('fromY');
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
            var _iterator__ex2g4s = fleet.g();
            while (_iterator__ex2g4s.h()) {
                var element = _iterator__ex2g4s.i();
                if (element.z12_1.m1(imul(fromY, 10) + fromX | 0)) {
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
        var tmp7_elvis_lhs = cellsFor($this, minus(fleet, ship), action, ship.z12_1.j());
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
        var tmp0_safe_receiver = action.cv('x');
        var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : get_jsonPrimitive(tmp0_safe_receiver);
        var tmp2_elvis_lhs = tmp1_safe_receiver == null ? null : get_intOrNull(tmp1_safe_receiver);
        var tmp;
        if (tmp2_elvis_lhs == null) {
            return null;
        } else {
            tmp = tmp2_elvis_lhs;
        }
        var x = tmp;
        var tmp3_safe_receiver = action.cv('y');
        var tmp4_safe_receiver = tmp3_safe_receiver == null ? null : get_jsonPrimitive(tmp3_safe_receiver);
        var tmp5_elvis_lhs = tmp4_safe_receiver == null ? null : get_intOrNull(tmp4_safe_receiver);
        var tmp_0;
        if (tmp5_elvis_lhs == null) {
            return null;
        } else {
            tmp_0 = tmp5_elvis_lhs;
        }
        var y = tmp_0;
        var tmp6_safe_receiver = action.cv('across');
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
            destination.f(tmp$ret$2);
        } while (!(item === last));
        var cells = destination;
        var destination_0 = ArrayList_init_$Create$();
        var _iterator__ex2g4s = others.g();
        while (_iterator__ex2g4s.h()) {
            var element = _iterator__ex2g4s.i();
            var tmp0 = element.z12_1;
            var destination_1 = ArrayList_init_$Create$();
            var _iterator__ex2g4s_0 = tmp0.g();
            while (_iterator__ex2g4s_0.h()) {
                var element_0 = _iterator__ex2g4s_0.i();
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
                tmp_3 = cells.k();
            } else {
                tmp_3 = false;
            }
            if (tmp_3) {
                tmp$ret$9 = false;
                break $l$block_0;
            }
            var _iterator__ex2g4s_1 = cells.g();
            while (_iterator__ex2g4s_1.h()) {
                var element_1 = _iterator__ex2g4s_1.i();
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
        var this_0 = toMutableList(Companion_getInstance_25().k13_1);
        var _iterator__ex2g4s = fleet.g();
        while (_iterator__ex2g4s.h()) {
            var element = _iterator__ex2g4s.i();
            this_0.y2(element.z12_1.j());
        }
        return this_0;
    }
    function shoot($this, player, action) {
        if (!(player === $this.c13_1)) return false;
        var tmp0_safe_receiver = action.cv('x');
        var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : get_jsonPrimitive(tmp0_safe_receiver);
        var tmp2_elvis_lhs = tmp1_safe_receiver == null ? null : get_intOrNull(tmp1_safe_receiver);
        var tmp;
        if (tmp2_elvis_lhs == null) {
            return false;
        } else {
            tmp = tmp2_elvis_lhs;
        }
        var x = tmp;
        var tmp3_safe_receiver = action.cv('y');
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
        if (!getValue($this.f13_1, target).f(cell)) return false;
        var tmp0 = $this.g13_1;
        var value = getValue($this.g13_1, player) + 1 | 0;
        tmp0.x1(player, value);
        var tmp0_0 = getValue($this.d13_1, target);
        var tmp$ret$1;
        $l$block: {
            var _iterator__ex2g4s = tmp0_0.g();
            while (_iterator__ex2g4s.h()) {
                var element = _iterator__ex2g4s.i();
                if (element.z12_1.m1(cell)) {
                    tmp$ret$1 = element;
                    break $l$block;
                }
            }
            tmp$ret$1 = null;
        }
        var ship = tmp$ret$1;
        var result = ship == null ? 'miss' : getValue($this.f13_1, target).n1(ship.z12_1) ? 'sunk' : 'hit';
        if (result === 'sunk') {
            var tmp0_1 = getValue($this.f13_1, target);
            var tmp0_2 = ensureNotNull(ship).z12_1;
            var destination = ArrayList_init_$Create$();
            var _iterator__ex2g4s_0 = tmp0_2.g();
            while (_iterator__ex2g4s_0.h()) {
                var element_0 = _iterator__ex2g4s_0.i();
                var list = around($this, element_0);
                addAll(destination, list);
            }
            addAll(tmp0_1, destination);
        }
        if (ship == null) $this.c13_1 = target;
        var tmp0_3 = getValue($this.d13_1, target);
        var tmp$ret$7;
        $l$block_1: {
            var tmp_1;
            if (isInterface(tmp0_3, Collection)) {
                tmp_1 = tmp0_3.k();
            } else {
                tmp_1 = false;
            }
            if (tmp_1) {
                tmp$ret$7 = true;
                break $l$block_1;
            }
            var _iterator__ex2g4s_1 = tmp0_3.g();
            while (_iterator__ex2g4s_1.h()) {
                var element_1 = _iterator__ex2g4s_1.i();
                if (!getValue($this.f13_1, target).n1(element_1.z12_1)) {
                    tmp$ret$7 = false;
                    break $l$block_1;
                }
            }
            tmp$ret$7 = true;
        }
        if (tmp$ret$7) $this.i13_1 = player;
        var tmp_2 = $this;
        var builder = new JsonObjectBuilder;
        put(builder, 'by', player);
        put_0(builder, 'x', x);
        put_0(builder, 'y', y);
        put(builder, 'result', result);
        tmp_2.h13_1 = builder.ov();
        return true;
    }
    function firedJson($this) {
        var this_0 = $this.g13_1;
        var destination = LinkedHashMap_init_$Create$_0(mapCapacity(this_0.j()));
        var _iterator__ex2g4s = this_0.w1().g();
        while (_iterator__ex2g4s.h()) {
            var element = _iterator__ex2g4s.i();
            var tmp = element.p1();
            var tmp$ret$4 = JsonPrimitive_0(element.q1());
            destination.x1(tmp, tmp$ret$4);
        }
        return new JsonObject(destination);
    }
    function opponent($this, player) {
        var tmp0 = $this.a13_1;
        var tmp$ret$0;
        $l$block: {
            var _iterator__ex2g4s = tmp0.g();
            while (_iterator__ex2g4s.h()) {
                var element = _iterator__ex2g4s.i();
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
        var fleet = getValue($this.d13_1, owner);
        var shot = getValue($this.f13_1, owner);
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
                    var _iterator__ex2g4s = fleet.g();
                    while (_iterator__ex2g4s.h()) {
                        var element = _iterator__ex2g4s.i();
                        if (element.z12_1.m1(cell)) {
                            tmp$ret$4 = element;
                            break $l$block;
                        }
                    }
                    tmp$ret$4 = null;
                }
                var ship = tmp$ret$4;
                tmp_0[tmp_1] = !shot.m1(cell) ? !(ship == null) && showShips ? _Char___init__impl__6a9atx(83) : _Char___init__impl__6a9atx(46) : ship == null ? _Char___init__impl__6a9atx(111) : shot.n1(ship.z12_1) ? _Char___init__impl__6a9atx(35) : _Char___init__impl__6a9atx(120);
                tmp = tmp + 1 | 0;
            }
            var tmp$ret$2 = JsonPrimitive_1(concatToString(tmp_0));
            destination.f(tmp$ret$2);
        } while (!(item === last));
        return new JsonArray(destination);
    }
    function placeFleet($this, random) {
        while (true) {
            var ships = ArrayList_init_$Create$();
            var blocked = LinkedHashSet_init_$Create$();
            var _iterator__ex2g4s = Companion_getInstance_25().k13_1.g();
            $l$loop: while (_iterator__ex2g4s.h()) {
                var length = _iterator__ex2g4s.i();
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
                ships.f(element);
                var _iterator__ex2g4s_0 = cells.g();
                while (_iterator__ex2g4s_0.h()) {
                    var element_0 = _iterator__ex2g4s_0.i();
                    var elements = around($this, element_0);
                    addAll(blocked, elements);
                    blocked.f(element_0);
                }
            }
            if (ships.j() === Companion_getInstance_25().k13_1.j()) return ships;
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
                    destination_0.f(tmp0_safe_receiver);
                }
            } while (!(element_0 === last_0));
            var list = destination_0;
            addAll(destination, list);
        } while (!(element === last));
        return destination;
    }
    function Companion_25() {
        Companion_instance_25 = this;
        this.j13_1 = 10;
        this.k13_1 = listOf_0([ 4, 3, 3, 2, 2, 2, 1, 1, 1, 1 ]);
        var tmp = this;
        var this_0 = this.k13_1;
        var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_0, 10));
        var _iterator__ex2g4s = this_0.g();
        while (_iterator__ex2g4s.h()) {
            var item = _iterator__ex2g4s.i();
            var tmp$ret$2 = JsonPrimitive_0(item);
            destination.f(tmp$ret$2);
        }
        tmp.l13_1 = new JsonArray(destination);
    }
    var Companion_instance_25;
    function Companion_getInstance_25() {
        if (Companion_instance_25 == null) new Companion_25;
        return Companion_instance_25;
    }
    function BattleshipGame$setOut$lambda($y, $x) {
        return function(it) {
            return it.z12_1.m1(imul($y, 10) + $x | 0);
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
                destination.f(tmp$ret$2);
            } while (!(item === last));
            var cells = destination;
            var tmp_0;
            var tmp$ret$5;
            $l$block_0: {
                var tmp_1;
                if (isInterface(cells, Collection)) {
                    tmp_1 = cells.k();
                } else {
                    tmp_1 = false;
                }
                if (tmp_1) {
                    tmp$ret$5 = true;
                    break $l$block_0;
                }
                var _iterator__ex2g4s = cells.g();
                while (_iterator__ex2g4s.h()) {
                    var element = _iterator__ex2g4s.i();
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
        Companion_getInstance_25();
        turn = turn === VOID ? random(players, random_0) : turn;
        this.a13_1 = players;
        this.b13_1 = random_0;
        this.c13_1 = turn;
        var tmp = this;
        var this_0 = this.a13_1;
        var result = LinkedHashMap_init_$Create$_0(coerceAtLeast(mapCapacity(collectionSizeOrDefault(this_0, 10)), 16));
        var _iterator__ex2g4s = this_0.g();
        while (_iterator__ex2g4s.h()) {
            var element = _iterator__ex2g4s.i();
            var tmp$ret$2 = ArrayList_init_$Create$();
            result.x1(element, tmp$ret$2);
        }
        tmp.d13_1 = result;
        var tmp_0 = this;
        tmp_0.e13_1 = LinkedHashSet_init_$Create$();
        var tmp_1 = this;
        var this_1 = this.a13_1;
        var result_0 = LinkedHashMap_init_$Create$_0(coerceAtLeast(mapCapacity(collectionSizeOrDefault(this_1, 10)), 16));
        var _iterator__ex2g4s_0 = this_1.g();
        while (_iterator__ex2g4s_0.h()) {
            var element_0 = _iterator__ex2g4s_0.i();
            var tmp$ret$7 = LinkedHashSet_init_$Create$();
            result_0.x1(element_0, tmp$ret$7);
        }
        tmp_1.f13_1 = result_0;
        var tmp_2 = this;
        var this_2 = this.a13_1;
        var result_1 = LinkedHashMap_init_$Create$_0(coerceAtLeast(mapCapacity(collectionSizeOrDefault(this_2, 10)), 16));
        var _iterator__ex2g4s_1 = this_2.g();
        while (_iterator__ex2g4s_1.h()) {
            var element_1 = _iterator__ex2g4s_1.i();
            result_1.x1(element_1, 0);
        }
        tmp_2.g13_1 = toMutableMap(result_1);
        this.h13_1 = null;
        this.i13_1 = null;
    }
    protoOf(BattleshipGame).m13 = function() {
        return this.i13_1;
    };
    protoOf(BattleshipGame).n13 = function(player, action) {
        return !(this.i13_1 == null) ? false : _get_settingOut__x7we4z(this) ? setOut(this, player, action) : shoot(this, player, action);
    };
    protoOf(BattleshipGame).o13 = function() {
        var tmp;
        if (_get_settingOut__x7we4z(this)) {
            var builder = new JsonObjectBuilder;
            put(builder, 'game', Battleship_getInstance().p13_1);
            put(builder, 'phase', 'placing');
            builder.nv('fleet', Companion_getInstance_25().l13_1);
            var this_0 = this.a13_1;
            var result = LinkedHashMap_init_$Create$_0(coerceAtLeast(mapCapacity(collectionSizeOrDefault(this_0, 10)), 16));
            var _iterator__ex2g4s = this_0.g();
            while (_iterator__ex2g4s.h()) {
                var element = _iterator__ex2g4s.i();
                var builder_0 = new JsonObjectBuilder;
                var this_1 = getValue(this.d13_1, element);
                var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_1, 10));
                var _iterator__ex2g4s_0 = this_1.g();
                while (_iterator__ex2g4s_0.h()) {
                    var item = _iterator__ex2g4s_0.i();
                    var tmp$ret$9 = JsonPrimitive_0(item.z12_1.j());
                    destination.f(tmp$ret$9);
                }
                builder_0.nv('placed', new JsonArray(destination));
                put_1(builder_0, 'ready', this.e13_1.m1(element));
                var tmp$ret$4 = builder_0.ov();
                result.x1(element, tmp$ret$4);
            }
            builder.nv('placing', new JsonObject(result));
            tmp = builder.ov();
        } else {
            var builder_1 = new JsonObjectBuilder;
            put(builder_1, 'game', Battleship_getInstance().p13_1);
            put(builder_1, 'phase', 'playing');
            put(builder_1, 'turn', this.c13_1);
            put(builder_1, 'winner', this.i13_1);
            var tmp0_elvis_lhs = this.h13_1;
            builder_1.nv('last', tmp0_elvis_lhs == null ? JsonNull_getInstance() : tmp0_elvis_lhs);
            builder_1.nv('fleet', Companion_getInstance_25().l13_1);
            builder_1.nv('fired', firedJson(this));
            var this_2 = this.a13_1;
            var result_0 = LinkedHashMap_init_$Create$_0(coerceAtLeast(mapCapacity(collectionSizeOrDefault(this_2, 10)), 16));
            var _iterator__ex2g4s_1 = this_2.g();
            while (_iterator__ex2g4s_1.h()) {
                var element_0 = _iterator__ex2g4s_1.i();
                var tmp$ret$14 = rows(this, element_0, !(this.i13_1 == null));
                result_0.x1(element_0, tmp$ret$14);
            }
            builder_1.nv('boards', new JsonObject(result_0));
            tmp = builder_1.ov();
        }
        return tmp;
    };
    protoOf(BattleshipGame).r13 = function(player) {
        var tmp;
        if (_get_settingOut__x7we4z(this)) {
            var builder = new JsonObjectBuilder;
            var rival = opponent(this, player);
            put(builder, 'game', Battleship_getInstance().p13_1);
            put(builder, 'phase', 'placing');
            put_0(builder, 'side', this.a13_1.o1(player));
            builder.nv('fleet', Companion_getInstance_25().l13_1);
            builder.nv('own', rows(this, player, true));
            var this_0 = remaining(this, getValue(this.d13_1, player));
            var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_0, 10));
            var _iterator__ex2g4s = this_0.g();
            while (_iterator__ex2g4s.h()) {
                var item = _iterator__ex2g4s.i();
                var tmp$ret$4 = JsonPrimitive_0(item);
                destination.f(tmp$ret$4);
            }
            builder.nv('remaining', new JsonArray(destination));
            put_1(builder, 'youReady', this.e13_1.m1(player));
            put_0(builder, 'rivalPlaced', getValue(this.d13_1, rival).j());
            put_1(builder, 'rivalReady', this.e13_1.m1(rival));
            tmp = builder.ov();
        } else {
            var builder_0 = new JsonObjectBuilder;
            put(builder_0, 'game', Battleship_getInstance().p13_1);
            put(builder_0, 'phase', 'playing');
            put_0(builder_0, 'side', this.a13_1.o1(player));
            put_1(builder_0, 'yourTurn', this.i13_1 == null && this.c13_1 === player);
            put(builder_0, 'winner', this.i13_1);
            var tmp0_elvis_lhs = this.h13_1;
            builder_0.nv('last', tmp0_elvis_lhs == null ? JsonNull_getInstance() : tmp0_elvis_lhs);
            builder_0.nv('fleet', Companion_getInstance_25().l13_1);
            builder_0.nv('fired', firedJson(this));
            builder_0.nv('own', rows(this, player, true));
            builder_0.nv('target', rows(this, opponent(this, player), !(this.i13_1 == null)));
            tmp = builder_0.ov();
        }
        return tmp;
    };
    function Battleship() {
        Battleship_instance = this;
        this.p13_1 = 'battleship';
        this.q13_1 = numberRangeToNumber(2, 2);
    }
    protoOf(Battleship).u13 = function() {
        return this.p13_1;
    };
    protoOf(Battleship).v13 = function() {
        return this.q13_1;
    };
    protoOf(Battleship).w13 = function(players, random) {
        return new BattleshipGame(players, random);
    };
    var Battleship_instance;
    function Battleship_getInstance() {
        if (Battleship_instance == null) new Battleship;
        return Battleship_instance;
    }
    function Figure(id, x, y) {
        this.x13_1 = id;
        this.y13_1 = x;
        this.z13_1 = y;
        this.a14_1 = true;
        this.b14_1 = this.y13_1;
        this.c14_1 = this.z13_1;
        this.d14_1 = 0;
    }
    function Seat(figure) {
        this.e14_1 = figure;
        this.f14_1 = 0;
        this.g14_1 = 0;
        this.h14_1 = 0;
        this.i14_1 = 0;
        this.j14_1 = booleanArray(Companion_getInstance_26().f15_1.j());
        this.k14_1 = new Int32Array(Companion_getInstance_26().f15_1.j());
    }
    function startRound($this) {
        $this.n15_1 = $this.n15_1 + 1 | 0;
        var total = 26 + $this.g15_1.j() | 0;
        var ids = shuffled(until(0, total), $this.h15_1);
        var tmp = $this;
        var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(ids, 10));
        var _iterator__ex2g4s = ids.g();
        while (_iterator__ex2g4s.h()) {
            var item = _iterator__ex2g4s.i();
            var tmp$ret$2 = new Figure(item, $this.h15_1.tb(20, 1e3 - 20), $this.h15_1.tb(20, 562 - 20));
            destination.f(tmp$ret$2);
        }
        var _iterator__ex2g4s_0 = destination.g();
        while (_iterator__ex2g4s_0.h()) {
            var element = _iterator__ex2g4s_0.i();
            wander($this, element);
        }
        var tmp_0 = CrowdGame$startRound$lambda;
        var tmp$ret$8 = new sam$kotlin_Comparator$0_0(tmp_0);
        tmp.i15_1 = sortedWith(destination, tmp$ret$8);
        var picks = shuffled($this.i15_1, $this.h15_1);
        var tmp_1 = $this;
        var this_0 = withIndex_0($this.g15_1);
        var capacity = coerceAtLeast(mapCapacity(collectionSizeOrDefault(this_0, 10)), 16);
        var destination_0 = LinkedHashMap_init_$Create$_0(capacity);
        var _iterator__ex2g4s_1 = this_0.g();
        while (_iterator__ex2g4s_1.h()) {
            var element_0 = _iterator__ex2g4s_1.i();
            var i = element_0.oa();
            var player = element_0.pa();
            var pair = to(player, new Seat(picks.m(i)));
            destination_0.x1(pair.ua_1, pair.va_1);
        }
        tmp_1.j15_1 = destination_0;
        $this.o15_1 = 12e4;
        $this.p15_1 = 0;
        $this.q15_1 = null;
        $this.r15_1 = false;
        $this.l15_1.a2();
    }
    function wander($this, figure) {
        figure.d14_1 = $this.h15_1.rb(0, 2500);
        var inductionVariable = 0;
        if (inductionVariable < 12) do {
            var index = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            $l$block: {
                var dx = $this.h15_1.rb(-1, 2);
                var dy = $this.h15_1.rb(-1, 2);
                if (dx === 0 && dy === 0) {
                    break $l$block;
                }
                var length = hypot(dx, dy);
                var distance = $this.h15_1.tb(40, 320);
                var x = figure.y13_1 + dx / length * distance;
                var y = figure.z13_1 + dy / length * distance;
                if ((20 <= x ? x <= 1e3 - 20 : false) && (20 <= y ? y <= 562 - 20 : false)) {
                    figure.b14_1 = x;
                    figure.c14_1 = y;
                    return Unit_instance;
                }
            }
        } while (inductionVariable < 12);
    }
    function stab($this, player, seat) {
        if (seat.h14_1 > 0) return false;
        var me = seat.e14_1;
        var tmp0 = $this.i15_1;
        var destination = ArrayList_init_$Create$();
        var _iterator__ex2g4s = tmp0.g();
        while (_iterator__ex2g4s.h()) {
            var element = _iterator__ex2g4s.i();
            if (!(element === me) && element.a14_1) {
                destination.f(element);
            }
        }
        var tmp$ret$3;
        $l$block_0: {
            var iterator = destination.g();
            if (!iterator.h()) {
                tmp$ret$3 = null;
                break $l$block_0;
            }
            var minElem = iterator.i();
            if (!iterator.h()) {
                tmp$ret$3 = minElem;
                break $l$block_0;
            }
            var it = minElem;
            var tmp0_0 = it.y13_1 - me.y13_1;
            var y = it.z13_1 - me.z13_1;
            var minValue = hypot(tmp0_0, y);
            do {
                var e = iterator.i();
                var tmp0_1 = e.y13_1 - me.y13_1;
                var y_0 = e.z13_1 - me.z13_1;
                var v = hypot(tmp0_1, y_0);
                if (compareTo(minValue, v) > 0) {
                    minElem = e;
                    minValue = v;
                }
            } while (iterator.h());
            tmp$ret$3 = minElem;
        }
        var tmp0_safe_receiver = tmp$ret$3;
        var tmp;
        if (tmp0_safe_receiver == null) {
            tmp = null;
        } else {
            var tmp_0;
            var tmp0_2 = tmp0_safe_receiver.y13_1 - me.y13_1;
            var y_1 = tmp0_safe_receiver.z13_1 - me.z13_1;
            if (hypot(tmp0_2, y_1) <= 45) {
                tmp_0 = tmp0_safe_receiver;
            } else {
                tmp_0 = null;
            }
            tmp = tmp_0;
        }
        var target = tmp;
        if (target == null) {
            seat.h14_1 = 800;
            return true;
        }
        target.a14_1 = false;
        var tmp0_3 = $this.j15_1.w1();
        var tmp$ret$11;
        $l$block_1: {
            var _iterator__ex2g4s_0 = tmp0_3.g();
            while (_iterator__ex2g4s_0.h()) {
                var element_0 = _iterator__ex2g4s_0.i();
                if (element_0.q1().e14_1 === target) {
                    tmp$ret$11 = element_0;
                    break $l$block_1;
                }
            }
            tmp$ret$11 = null;
        }
        var victim = tmp$ret$11;
        if (victim == null) {
            seat.h14_1 = 3e3;
            seat.i14_1 = 2500;
        }
        var tmp0_4 = $this.l15_1;
        var builder = new JsonObjectBuilder;
        $this.m15_1 = $this.m15_1 + 1 | 0;
        put_0(builder, 'seq', $this.m15_1);
        put_0(builder, 'by', me.x13_1);
        put_0(builder, 'to', target.x13_1);
        put_1(builder, 'real', !(victim == null));
        put_0(builder, 'x', target.y13_1);
        put_0(builder, 'y', target.z13_1);
        var element_1 = builder.ov();
        tmp0_4.f(element_1);
        if ($this.l15_1.j() > 6) {
            $this.l15_1.f3(0);
        }
        var this_0 = $this.j15_1;
        var result = LinkedHashMap_init_$Create$();
        var _iterator__ex2g4s_1 = this_0.w1().g();
        while (_iterator__ex2g4s_1.h()) {
            var entry = _iterator__ex2g4s_1.i();
            if (entry.q1().e14_1.a14_1) {
                result.x1(entry.p1(), entry.q1());
            }
        }
        var alive = result.u1();
        if (alive.j() === 1) {
            endRound($this, single_0(alive));
        }
        return true;
    }
    function endRound($this, who) {
        $this.r15_1 = true;
        $this.q15_1 = who;
        $this.p15_1 = 5e3;
        if (!(who == null)) {
            var tmp0 = $this.k15_1;
            var value = getValue($this.k15_1, who) + 1 | 0;
            tmp0.x1(who, value);
        }
    }
    function walk($this, figure) {
        if (figure.d14_1 > 0) {
            figure.d14_1 = figure.d14_1 - 200 | 0;
            return Unit_instance;
        }
        var dx = figure.b14_1 - figure.y13_1;
        var dy = figure.c14_1 - figure.z13_1;
        var distance = hypot(dx, dy);
        var stride = 90 * 200 / 1e3;
        if (distance <= stride) {
            figure.y13_1 = figure.b14_1;
            figure.z13_1 = figure.c14_1;
            wander($this, figure);
            return Unit_instance;
        }
        figure.y13_1 = figure.y13_1 + dx / distance * stride;
        figure.z13_1 = figure.z13_1 + dy / distance * stride;
    }
    function updateSeat($this, seat) {
        var figure = seat.e14_1;
        var changed = false;
        if (seat.i14_1 > 0) {
            seat.i14_1 = seat.i14_1 - 200 | 0;
            if (seat.i14_1 <= 0) changed = true;
        }
        if (seat.h14_1 > 0) {
            seat.h14_1 = seat.h14_1 - 200 | 0;
            if (seat.h14_1 <= 0) changed = true;
        } else if (!(seat.f14_1 === 0) || !(seat.g14_1 === 0)) {
            var tmp0 = seat.f14_1;
            var y = seat.g14_1;
            var length = hypot(tmp0, y);
            var stride = 90 * 200 / 1e3;
            figure.y13_1 = coerceIn(figure.y13_1 + seat.f14_1 / length * stride, 20, 1e3 - 20);
            figure.z13_1 = coerceIn(figure.z13_1 + seat.g14_1 / length * stride, 20, 562 - 20);
        }
        var index = 0;
        var _iterator__ex2g4s = Companion_getInstance_26().f15_1.g();
        while (_iterator__ex2g4s.h()) {
            var item = _iterator__ex2g4s.i();
            var _unary__edvuaz = index;
            index = _unary__edvuaz + 1 | 0;
            var tmp0_0 = checkIndexOverflow(_unary__edvuaz);
            $l$block: {
                var x = item.oa();
                var y_0 = item.pa();
                if (seat.j14_1[tmp0_0]) {
                    break $l$block;
                }
                var tmp0_1 = figure.y13_1 - x;
                var y_1 = figure.z13_1 - y_0;
                var inside = hypot(tmp0_1, y_1) <= 50;
                var before = seat.k14_1[tmp0_0];
                seat.k14_1[tmp0_0] = inside ? before + 200 | 0 : 0;
                if (seat.k14_1[tmp0_0] >= 4e3) {
                    seat.j14_1[tmp0_0] = true;
                    seat.k14_1[tmp0_0] = 0;
                    changed = true;
                } else if (!(before === 0 === (seat.k14_1[tmp0_0] === 0)) || !((seat.k14_1[tmp0_0] / 1e3 | 0) === (before / 1e3 | 0))) changed = true;
            }
        }
        return changed;
    }
    function alivePlayers($this) {
        var this_0 = $this.j15_1;
        var result = LinkedHashMap_init_$Create$();
        var _iterator__ex2g4s = this_0.w1().g();
        while (_iterator__ex2g4s.h()) {
            var entry = _iterator__ex2g4s.i();
            if (entry.q1().e14_1.a14_1) {
                result.x1(entry.p1(), entry.q1());
            }
        }
        return result.u1();
    }
    function common($this, $receiver) {
        put($receiver, 'game', Crowd_getInstance().t15_1);
        put($receiver, 'phase', !($this.s15_1 == null) ? 'over' : $this.r15_1 ? 'between' : 'playing');
        put_0($receiver, 'round', $this.n15_1);
        put_0($receiver, 'clock', !($this.s15_1 == null) ? 0 : ($this.o15_1 + 999 | 0) / 1e3 | 0);
        var this_0 = $this.g15_1;
        var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_0, 10));
        var _iterator__ex2g4s = this_0.g();
        while (_iterator__ex2g4s.h()) {
            var item = _iterator__ex2g4s.i();
            var tmp$ret$2 = JsonPrimitive_1(item);
            destination.f(tmp$ret$2);
        }
        $receiver.nv('sides', new JsonArray(destination));
        var this_1 = $this.k15_1;
        var destination_0 = LinkedHashMap_init_$Create$_0(mapCapacity(this_1.j()));
        var _iterator__ex2g4s_0 = this_1.w1().g();
        while (_iterator__ex2g4s_0.h()) {
            var element = _iterator__ex2g4s_0.i();
            var tmp = element.p1();
            var tmp$ret$7 = JsonPrimitive_0(element.q1());
            destination_0.x1(tmp, tmp$ret$7);
        }
        $receiver.nv('points', new JsonObject(destination_0));
        put_0($receiver, 'pointsToWin', 3);
        put($receiver, 'roundWinner', $this.q15_1);
        put($receiver, 'winner', $this.s15_1);
        put_0($receiver, 'alive', alivePlayers($this).j());
    }
    function Companion_26() {
        Companion_instance_26 = this;
        this.l14_1 = 1e3;
        this.m14_1 = 562;
        this.n14_1 = 20;
        this.o14_1 = 26;
        this.p14_1 = 90;
        this.q14_1 = 45;
        this.r14_1 = 3e3;
        this.s14_1 = 800;
        this.t14_1 = 2500;
        this.u14_1 = 50;
        this.v14_1 = 4e3;
        this.w14_1 = 12e4;
        this.x14_1 = 5e3;
        this.y14_1 = 2500;
        this.z14_1 = 40;
        this.a15_1 = 320;
        this.b15_1 = 12;
        this.c15_1 = 3;
        this.d15_1 = 6;
        this.e15_1 = 200;
        this.f15_1 = listOf_0([ to(200, 130), to(800, 130), to(500, 440) ]);
    }
    var Companion_instance_26;
    function Companion_getInstance_26() {
        if (Companion_instance_26 == null) new Companion_26;
        return Companion_instance_26;
    }
    function sam$kotlin_Comparator$0_0(function_0) {
        this.v15_1 = function_0;
    }
    protoOf(sam$kotlin_Comparator$0_0).x9 = function(a, b) {
        return this.v15_1(a, b);
    };
    protoOf(sam$kotlin_Comparator$0_0).compare = function(a, b) {
        return this.x9(a, b);
    };
    protoOf(sam$kotlin_Comparator$0_0).l2 = function() {
        return this.v15_1;
    };
    protoOf(sam$kotlin_Comparator$0_0).equals = function(other) {
        var tmp;
        if (!(other == null) ? isInterface(other, Comparator) : false) {
            var tmp_0;
            if (!(other == null) ? isInterface(other, FunctionAdapter) : false) {
                tmp_0 = equals(this.l2(), other.l2());
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
        return hashCode_0(this.l2());
    };
    function CrowdGame$startRound$lambda(a, b) {
        var tmp = a.x13_1;
        var tmp$ret$2 = b.x13_1;
        return compareValues(tmp, tmp$ret$2);
    }
    function CrowdGame(players, random) {
        Companion_getInstance_26();
        this.g15_1 = players;
        this.h15_1 = random;
        var tmp = this;
        tmp.i15_1 = emptyList();
        var tmp_0 = this;
        tmp_0.j15_1 = emptyMap();
        var tmp_1 = this;
        var this_0 = this.g15_1;
        var result = LinkedHashMap_init_$Create$_0(coerceAtLeast(mapCapacity(collectionSizeOrDefault(this_0, 10)), 16));
        var _iterator__ex2g4s = this_0.g();
        while (_iterator__ex2g4s.h()) {
            var element = _iterator__ex2g4s.i();
            result.x1(element, 0);
        }
        tmp_1.k15_1 = toMutableMap(result);
        var tmp_2 = this;
        tmp_2.l15_1 = ArrayList_init_$Create$();
        this.m15_1 = 0;
        this.n15_1 = 0;
        this.o15_1 = 12e4;
        this.p15_1 = 0;
        this.q15_1 = null;
        this.r15_1 = false;
        this.s15_1 = null;
        startRound(this);
    }
    protoOf(CrowdGame).m13 = function() {
        return this.s15_1;
    };
    protoOf(CrowdGame).n13 = function(player, action) {
        var tmp0_elvis_lhs = this.j15_1.t1(player);
        var tmp;
        if (tmp0_elvis_lhs == null) {
            return false;
        } else {
            tmp = tmp0_elvis_lhs;
        }
        var seat = tmp;
        if (!(this.s15_1 == null) || this.r15_1 || !seat.e14_1.a14_1) return false;
        var tmp1_safe_receiver = action.cv('do');
        var tmp2_safe_receiver = tmp1_safe_receiver == null ? null : get_jsonPrimitive(tmp1_safe_receiver);
        var tmp_0;
        switch (tmp2_safe_receiver == null ? null : get_contentOrNull(tmp2_safe_receiver)) {
          case 'steer':
            var tmp4_safe_receiver = action.cv('dx');
            var tmp5_safe_receiver = tmp4_safe_receiver == null ? null : get_jsonPrimitive(tmp4_safe_receiver);
            var tmp6_elvis_lhs = tmp5_safe_receiver == null ? null : get_intOrNull(tmp5_safe_receiver);
            var tmp_1;
            if (tmp6_elvis_lhs == null) {
                return false;
            } else {
                tmp_1 = tmp6_elvis_lhs;
            }
            var dx = tmp_1;
            var tmp7_safe_receiver = action.cv('dy');
            var tmp8_safe_receiver = tmp7_safe_receiver == null ? null : get_jsonPrimitive(tmp7_safe_receiver);
            var tmp9_elvis_lhs = tmp8_safe_receiver == null ? null : get_intOrNull(tmp8_safe_receiver);
            var tmp_2;
            if (tmp9_elvis_lhs == null) {
                return false;
            } else {
                tmp_2 = tmp9_elvis_lhs;
            }
            var dy = tmp_2;
            if (!(-1 <= dx ? dx <= 1 : false) || !(-1 <= dy ? dy <= 1 : false)) return false;
            seat.f14_1 = dx;
            seat.g14_1 = dy;
            tmp_0 = false;
            break;

          case 'stab':
            tmp_0 = stab(this, player, seat);
            break;

          default:
            tmp_0 = false;
            break;
        }
        return tmp_0;
    };
    protoOf(CrowdGame).t13 = function() {
        if (!(this.s15_1 == null)) return Frame_NONE_getInstance();
        if (this.r15_1) {
            this.p15_1 = this.p15_1 - 200 | 0;
            if (this.p15_1 > 0) return Frame_NONE_getInstance();
            var tmp0 = this.k15_1.w1();
            var tmp$ret$0;
            $l$block: {
                var _iterator__ex2g4s = tmp0.g();
                while (_iterator__ex2g4s.h()) {
                    var element = _iterator__ex2g4s.i();
                    if (element.q1() >= 3) {
                        tmp$ret$0 = element;
                        break $l$block;
                    }
                }
                tmp$ret$0 = null;
            }
            var champion = tmp$ret$0;
            if (!(champion == null)) this.s15_1 = champion.p1(); else {
                startRound(this);
            }
            return Frame_EVERYONE_getInstance();
        }
        var second = this.o15_1 / 1e3 | 0;
        this.o15_1 = this.o15_1 - 200 | 0;
        var phonesNeedIt = !((this.o15_1 / 1e3 | 0) === second);
        var _iterator__ex2g4s_0 = this.i15_1.g();
        while (_iterator__ex2g4s_0.h()) {
            var figure = _iterator__ex2g4s_0.i();
            var tmp;
            if (figure.a14_1) {
                var tmp0_0 = this.j15_1.v1();
                var tmp$ret$2;
                $l$block_1: {
                    var tmp_0;
                    if (isInterface(tmp0_0, Collection)) {
                        tmp_0 = tmp0_0.k();
                    } else {
                        tmp_0 = false;
                    }
                    if (tmp_0) {
                        tmp$ret$2 = true;
                        break $l$block_1;
                    }
                    var _iterator__ex2g4s_1 = tmp0_0.g();
                    while (_iterator__ex2g4s_1.h()) {
                        var element_0 = _iterator__ex2g4s_1.i();
                        if (element_0.e14_1 === figure) {
                            tmp$ret$2 = false;
                            break $l$block_1;
                        }
                    }
                    tmp$ret$2 = true;
                }
                tmp = tmp$ret$2;
            } else {
                tmp = false;
            }
            if (tmp) {
                walk(this, figure);
            }
        }
        var _iterator__ex2g4s_2 = this.j15_1.v1().g();
        while (_iterator__ex2g4s_2.h()) {
            var seat = _iterator__ex2g4s_2.i();
            if (seat.e14_1.a14_1) {
                if (updateSeat(this, seat)) phonesNeedIt = true;
            }
        }
        var tmp0_1 = this.j15_1.w1();
        var tmp$ret$4;
        $l$block_3: {
            var _iterator__ex2g4s_3 = tmp0_1.g();
            while (_iterator__ex2g4s_3.h()) {
                var element_1 = _iterator__ex2g4s_3.i();
                var seat_0 = element_1.q1();
                var tmp_1;
                if (seat_0.e14_1.a14_1) {
                    var tmp0_2 = seat_0.j14_1;
                    var tmp$ret$7;
                    $l$block_2: {
                        var inductionVariable = 0;
                        var last = tmp0_2.length;
                        while (inductionVariable < last) {
                            var element_2 = tmp0_2[inductionVariable];
                            inductionVariable = inductionVariable + 1 | 0;
                            if (!element_2) {
                                tmp$ret$7 = false;
                                break $l$block_2;
                            }
                        }
                        tmp$ret$7 = true;
                    }
                    tmp_1 = tmp$ret$7;
                } else {
                    tmp_1 = false;
                }
                if (tmp_1) {
                    tmp$ret$4 = element_1;
                    break $l$block_3;
                }
            }
            tmp$ret$4 = null;
        }
        var done = tmp$ret$4;
        if (!(done == null)) {
            endRound(this, done.p1());
        } else if (this.o15_1 <= 0) {
            endRound(this, null);
        } else return phonesNeedIt ? Frame_EVERYONE_getInstance() : Frame_TV_getInstance();
        return Frame_EVERYONE_getInstance();
    };
    protoOf(CrowdGame).o13 = function() {
        var builder = new JsonObjectBuilder;
        common(this, builder);
        put_0(builder, 'width', 1e3);
        put_0(builder, 'height', 562);
        var this_0 = this.i15_1;
        var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_0, 10));
        var _iterator__ex2g4s = this_0.g();
        while (_iterator__ex2g4s.h()) {
            var item = _iterator__ex2g4s.i();
            var builder_0 = new JsonObjectBuilder;
            put_0(builder_0, 'id', item.x13_1);
            put_0(builder_0, 'x', round(item.y13_1));
            put_0(builder_0, 'y', round(item.z13_1));
            put_1(builder_0, 'alive', item.a14_1);
            var tmp$ret$4 = builder_0.ov();
            destination.f(tmp$ret$4);
        }
        builder.nv('figures', new JsonArray(destination));
        var tmp0 = this.j15_1.v1();
        var destination_0 = ArrayList_init_$Create$();
        var _iterator__ex2g4s_0 = tmp0.g();
        while (_iterator__ex2g4s_0.h()) {
            var element = _iterator__ex2g4s_0.i();
            if (element.i14_1 > 0 && element.e14_1.a14_1) {
                destination_0.f(element);
            }
        }
        var destination_1 = ArrayList_init_$Create$_0(collectionSizeOrDefault(destination_0, 10));
        var _iterator__ex2g4s_1 = destination_0.g();
        while (_iterator__ex2g4s_1.h()) {
            var item_0 = _iterator__ex2g4s_1.i();
            var tmp$ret$12 = JsonPrimitive_0(item_0.e14_1.x13_1);
            destination_1.f(tmp$ret$12);
        }
        builder.nv('revealed', new JsonArray(destination_1));
        var this_1 = Companion_getInstance_26().f15_1;
        var destination_2 = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_1, 10));
        var index = 0;
        var _iterator__ex2g4s_2 = this_1.g();
        while (_iterator__ex2g4s_2.h()) {
            var item_1 = _iterator__ex2g4s_2.i();
            var _unary__edvuaz = index;
            index = _unary__edvuaz + 1 | 0;
            var i = checkIndexOverflow(_unary__edvuaz);
            var x = item_1.oa();
            var y = item_1.pa();
            var builder_1 = new JsonObjectBuilder;
            put_0(builder_1, 'x', x);
            put_0(builder_1, 'y', y);
            put_0(builder_1, 'radius', 50);
            var tmp0_0 = this.j15_1.v1();
            var tmp$ret$18;
            $l$block_0: {
                var tmp;
                if (isInterface(tmp0_0, Collection)) {
                    tmp = tmp0_0.k();
                } else {
                    tmp = false;
                }
                if (tmp) {
                    tmp$ret$18 = false;
                    break $l$block_0;
                }
                var _iterator__ex2g4s_3 = tmp0_0.g();
                while (_iterator__ex2g4s_3.h()) {
                    var element_0 = _iterator__ex2g4s_3.i();
                    if (element_0.e14_1.a14_1 && element_0.k14_1[i] > 0) {
                        tmp$ret$18 = true;
                        break $l$block_0;
                    }
                }
                tmp$ret$18 = false;
            }
            put_1(builder_1, 'busy', tmp$ret$18);
            var tmp$ret$15 = builder_1.ov();
            destination_2.f(tmp$ret$15);
        }
        builder.nv('flags', new JsonArray(destination_2));
        builder.nv('stabs', new JsonArray(this.l15_1));
        if (this.r15_1 || !(this.s15_1 == null)) {
            var this_2 = this.j15_1;
            var destination_3 = LinkedHashMap_init_$Create$_0(mapCapacity(this_2.j()));
            var _iterator__ex2g4s_4 = this_2.w1().g();
            while (_iterator__ex2g4s_4.h()) {
                var element_1 = _iterator__ex2g4s_4.i();
                var tmp_0 = element_1.p1();
                var tmp$ret$24 = JsonPrimitive_0(element_1.q1().e14_1.x13_1);
                destination_3.x1(tmp_0, tmp$ret$24);
            }
            builder.nv('who', new JsonObject(destination_3));
        }
        return builder.ov();
    };
    protoOf(CrowdGame).r13 = function(player) {
        var builder = new JsonObjectBuilder;
        var seat = getValue(this.j15_1, player);
        common(this, builder);
        put_0(builder, 'side', this.g15_1.o1(player));
        put_1(builder, 'alive', seat.e14_1.a14_1);
        put_1(builder, 'stunned', seat.h14_1 > 0);
        var this_0 = seat.j14_1;
        var destination = ArrayList_init_$Create$_0(this_0.length);
        var inductionVariable = 0;
        var last = this_0.length;
        while (inductionVariable < last) {
            var item = this_0[inductionVariable];
            inductionVariable = inductionVariable + 1 | 0;
            var tmp$ret$4 = JsonPrimitive_2(item);
            destination.f(tmp$ret$4);
        }
        builder.nv('yourFlags', new JsonArray(destination));
        var tmp0_elvis_lhs = maxOrNull(seat.k14_1);
        put_0(builder, 'holding', tmp0_elvis_lhs == null ? 0 : tmp0_elvis_lhs);
        put_0(builder, 'flagHold', 4e3);
        return builder.ov();
    };
    function Crowd() {
        Crowd_instance = this;
        this.t15_1 = 'crowd';
        this.u15_1 = numberRangeToNumber(2, 4);
    }
    protoOf(Crowd).u13 = function() {
        return this.t15_1;
    };
    protoOf(Crowd).v13 = function() {
        return this.u15_1;
    };
    protoOf(Crowd).w13 = function(players, random) {
        return new CrowdGame(players, random);
    };
    var Crowd_instance;
    function Crowd_getInstance() {
        if (Crowd_instance == null) new Crowd;
        return Crowd_instance;
    }
    function roll($this) {
        var _iterator__ex2g4s = $this.w15_1.g();
        while (_iterator__ex2g4s.h()) {
            var player = _iterator__ex2g4s.i();
            getValue($this.y15_1, player).a2();
            var times = getValue($this.z15_1, player);
            var inductionVariable = 0;
            if (inductionVariable < times) do {
                var index = inductionVariable;
                inductionVariable = inductionVariable + 1 | 0;
                var tmp0 = getValue($this.y15_1, player);
                var element = $this.x15_1.rb(1, 7);
                tmp0.f(element);
            } while (inductionVariable < times);
            sort_0(getValue($this.y15_1, player));
        }
    }
    function total($this) {
        return sum_0($this.z15_1.v1());
    }
    function canTop($this, count, face) {
        return (2 <= face ? face <= 6 : false) && (1 <= count ? count <= total($this) : false) && (count > $this.b16_1 || count === $this.b16_1 && face > $this.c16_1);
    }
    function bid($this, player, count, face) {
        if (!canTop($this, count, face)) return false;
        $this.b16_1 = count;
        $this.c16_1 = face;
        $this.d16_1 = player;
        var tmp0 = $this.e16_1;
        var builder = new JsonObjectBuilder;
        put(builder, 'by', player);
        put_0(builder, 'count', count);
        put_0(builder, 'face', face);
        var element = builder.ov();
        tmp0.f(element);
        $this.a16_1 = following($this, player);
        $this.g16_1 = 30;
        return true;
    }
    function following($this, player) {
        var at = $this.w15_1.o1(player);
        var this_0 = numberRangeToNumber(1, $this.w15_1.j());
        var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_0, 10));
        var inductionVariable = this_0.w_1;
        var last = this_0.x_1;
        if (inductionVariable <= last) do {
            var item = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var it = item;
            var tmp$ret$2 = $this.w15_1.m((at + it | 0) % $this.w15_1.j() | 0);
            destination.f(tmp$ret$2);
        } while (!(item === last));
        var tmp$ret$3;
        $l$block: {
            var _iterator__ex2g4s = destination.g();
            while (_iterator__ex2g4s.h()) {
                var element = _iterator__ex2g4s.i();
                if (getValue($this.z15_1, element) > 0) {
                    tmp$ret$3 = element;
                    break $l$block;
                }
            }
            throw NoSuchElementException_init_$Create$_0('Collection contains no element matching the predicate.');
        }
        return tmp$ret$3;
    }
    function call($this, player, exact) {
        var claimedBy = ensureNotNull($this.d16_1);
        var tmp0 = flatten($this.y15_1.v1());
        var tmp$ret$0;
        $l$block: {
            var tmp;
            if (isInterface(tmp0, Collection)) {
                tmp = tmp0.k();
            } else {
                tmp = false;
            }
            if (tmp) {
                tmp$ret$0 = 0;
                break $l$block;
            }
            var count = 0;
            var _iterator__ex2g4s = tmp0.g();
            while (_iterator__ex2g4s.h()) {
                var element = _iterator__ex2g4s.i();
                if (element === $this.c16_1 || element === 1) {
                    count = count + 1 | 0;
                    checkCountOverflow(count);
                }
            }
            tmp$ret$0 = count;
        }
        var matching = tmp$ret$0;
        var right = exact ? matching === $this.b16_1 : matching < $this.b16_1;
        var loser = right ? exact ? null : claimedBy : player;
        var gainer = exact && right && getValue($this.z15_1, player) < 5 ? player : null;
        var tmp_0 = $this;
        var builder = new JsonObjectBuilder;
        put(builder, 'kind', exact ? 'exact' : 'doubt');
        put(builder, 'by', player);
        put(builder, 'bidder', claimedBy);
        put_0(builder, 'count', $this.b16_1);
        put_0(builder, 'face', $this.c16_1);
        put_0(builder, 'actual', matching);
        put_1(builder, 'right', right);
        put(builder, 'loser', loser);
        put(builder, 'gainer', gainer);
        var this_0 = $this.y15_1;
        var destination = LinkedHashMap_init_$Create$_0(mapCapacity(this_0.j()));
        var _iterator__ex2g4s_0 = this_0.w1().g();
        while (_iterator__ex2g4s_0.h()) {
            var element_0 = _iterator__ex2g4s_0.i();
            var tmp_1 = element_0.p1();
            var values = element_0.q1();
            var destination_0 = ArrayList_init_$Create$_0(collectionSizeOrDefault(values, 10));
            var _iterator__ex2g4s_1 = values.g();
            while (_iterator__ex2g4s_1.h()) {
                var item = _iterator__ex2g4s_1.i();
                var tmp$ret$12 = JsonPrimitive_0(item);
                destination_0.f(tmp$ret$12);
            }
            var tmp$ret$8 = new JsonArray(destination_0);
            destination.x1(tmp_1, tmp$ret$8);
        }
        builder.nv('dice', new JsonObject(destination));
        tmp_0.h16_1 = builder.ov();
        if (!(loser == null)) {
            var tmp0_0 = $this.z15_1;
            var value = getValue($this.z15_1, loser) - 1 | 0;
            tmp0_0.x1(loser, value);
        }
        if (!(gainer == null)) {
            var tmp0_1 = $this.z15_1;
            var value_0 = getValue($this.z15_1, gainer) + 1 | 0;
            tmp0_1.x1(gainer, value_0);
        }
        $this.i16_1 = !(loser == null) && getValue($this.z15_1, loser) > 0 ? loser : !(loser == null) ? following($this, loser) : player;
        var tmp_2 = $this;
        var this_1 = $this.z15_1;
        var result = LinkedHashMap_init_$Create$();
        var _iterator__ex2g4s_2 = this_1.w1().g();
        while (_iterator__ex2g4s_2.h()) {
            var entry = _iterator__ex2g4s_2.i();
            if (entry.q1() > 0) {
                result.x1(entry.p1(), entry.q1());
            }
        }
        tmp_2.j16_1 = singleOrNull(result.u1());
        $this.g16_1 = 7;
        return true;
    }
    function timeUp($this) {
        var player = $this.a16_1;
        if ($this.d16_1 == null) bid($this, player, 1, 2); else if (canTop($this, $this.b16_1, $this.c16_1 + 1 | 0)) bid($this, player, $this.b16_1, $this.c16_1 + 1 | 0); else if (canTop($this, $this.b16_1 + 1 | 0, 2)) bid($this, player, $this.b16_1 + 1 | 0, 2); else call($this, player, false);
    }
    function nextRound($this) {
        $this.h16_1 = null;
        if (!($this.j16_1 == null)) {
            $this.k16_1 = $this.j16_1;
            return Unit_instance;
        }
        $this.f16_1 = $this.f16_1 + 1 | 0;
        $this.b16_1 = 0;
        $this.c16_1 = 0;
        $this.d16_1 = null;
        $this.e16_1.a2();
        var tmp = $this;
        var tmp0_elvis_lhs = $this.i16_1;
        tmp.a16_1 = tmp0_elvis_lhs == null ? $this.a16_1 : tmp0_elvis_lhs;
        $this.i16_1 = null;
        $this.g16_1 = 30;
        roll($this);
    }
    function common_0($this, $receiver) {
        put($receiver, 'game', Dice_getInstance().l16_1);
        put($receiver, 'phase', !($this.k16_1 == null) ? 'over' : !($this.h16_1 == null) ? 'reveal' : 'bidding');
        put_0($receiver, 'round', $this.f16_1);
        put_0($receiver, 'clock', !($this.k16_1 == null) ? 0 : $this.g16_1);
        var this_0 = $this.w15_1;
        var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_0, 10));
        var _iterator__ex2g4s = this_0.g();
        while (_iterator__ex2g4s.h()) {
            var item = _iterator__ex2g4s.i();
            var tmp$ret$2 = JsonPrimitive_1(item);
            destination.f(tmp$ret$2);
        }
        $receiver.nv('sides', new JsonArray(destination));
        var this_1 = $this.z15_1;
        var destination_0 = LinkedHashMap_init_$Create$_0(mapCapacity(this_1.j()));
        var _iterator__ex2g4s_0 = this_1.w1().g();
        while (_iterator__ex2g4s_0.h()) {
            var element = _iterator__ex2g4s_0.i();
            var tmp = element.p1();
            var tmp$ret$7 = JsonPrimitive_0(element.q1());
            destination_0.x1(tmp, tmp$ret$7);
        }
        $receiver.nv('counts', new JsonObject(destination_0));
        put_0($receiver, 'total', total($this));
        put($receiver, 'turn', $this.a16_1);
        put($receiver, 'winner', $this.k16_1);
        var tmp_0;
        if ($this.d16_1 == null) {
            tmp_0 = JsonNull_getInstance();
        } else {
            var builder = new JsonObjectBuilder;
            put(builder, 'by', $this.d16_1);
            put_0(builder, 'count', $this.b16_1);
            put_0(builder, 'face', $this.c16_1);
            tmp_0 = builder.ov();
        }
        $receiver.nv('bid', tmp_0);
        $receiver.nv('history', new JsonArray($this.e16_1));
        var tmp0_elvis_lhs = $this.h16_1;
        $receiver.nv('result', tmp0_elvis_lhs == null ? JsonNull_getInstance() : tmp0_elvis_lhs);
    }
    function Companion_27() {
        this.n16_1 = 5;
        this.o16_1 = 30;
        this.p16_1 = 7;
    }
    var Companion_instance_27;
    function Companion_getInstance_27() {
        return Companion_instance_27;
    }
    function DiceGame(players, random) {
        this.w15_1 = players;
        this.x15_1 = random;
        var tmp = this;
        var this_0 = this.w15_1;
        var result = LinkedHashMap_init_$Create$_0(coerceAtLeast(mapCapacity(collectionSizeOrDefault(this_0, 10)), 16));
        var _iterator__ex2g4s = this_0.g();
        while (_iterator__ex2g4s.h()) {
            var element = _iterator__ex2g4s.i();
            var tmp$ret$2 = ArrayList_init_$Create$();
            result.x1(element, tmp$ret$2);
        }
        tmp.y15_1 = result;
        var tmp_0 = this;
        var this_1 = this.w15_1;
        var result_0 = LinkedHashMap_init_$Create$_0(coerceAtLeast(mapCapacity(collectionSizeOrDefault(this_1, 10)), 16));
        var _iterator__ex2g4s_0 = this_1.g();
        while (_iterator__ex2g4s_0.h()) {
            var element_0 = _iterator__ex2g4s_0.i();
            result_0.x1(element_0, 5);
        }
        tmp_0.z15_1 = toMutableMap(result_0);
        this.a16_1 = first(this.w15_1);
        this.b16_1 = 0;
        this.c16_1 = 0;
        this.d16_1 = null;
        var tmp_1 = this;
        tmp_1.e16_1 = ArrayList_init_$Create$();
        this.f16_1 = 1;
        this.g16_1 = 30;
        this.h16_1 = null;
        this.i16_1 = null;
        this.j16_1 = null;
        this.k16_1 = null;
        roll(this);
    }
    protoOf(DiceGame).m13 = function() {
        return this.k16_1;
    };
    protoOf(DiceGame).n13 = function(player, action) {
        if (!(player === this.a16_1) || !(this.h16_1 == null) || !(this.k16_1 == null)) return false;
        var tmp0_safe_receiver = action.cv('do');
        var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : get_jsonPrimitive(tmp0_safe_receiver);
        var tmp;
        switch (tmp1_safe_receiver == null ? null : get_contentOrNull(tmp1_safe_receiver)) {
          case 'bid':
            var tmp3_safe_receiver = action.cv('count');
            var tmp4_safe_receiver = tmp3_safe_receiver == null ? null : get_jsonPrimitive(tmp3_safe_receiver);
            var tmp5_elvis_lhs = tmp4_safe_receiver == null ? null : get_intOrNull(tmp4_safe_receiver);
            var tmp_0;
            if (tmp5_elvis_lhs == null) {
                return false;
            } else {
                tmp_0 = tmp5_elvis_lhs;
            }
            var tmp_1 = tmp_0;
            var tmp6_safe_receiver = action.cv('face');
            var tmp7_safe_receiver = tmp6_safe_receiver == null ? null : get_jsonPrimitive(tmp6_safe_receiver);
            var tmp8_elvis_lhs = tmp7_safe_receiver == null ? null : get_intOrNull(tmp7_safe_receiver);
            var tmp_2;
            if (tmp8_elvis_lhs == null) {
                return false;
            } else {
                tmp_2 = tmp8_elvis_lhs;
            }
            tmp = bid(this, player, tmp_1, tmp_2);
            break;

          case 'doubt':
            tmp = !(this.d16_1 == null) && call(this, player, false);
            break;

          case 'exact':
            tmp = !(this.d16_1 == null) && call(this, player, true);
            break;

          default:
            tmp = false;
            break;
        }
        return tmp;
    };
    protoOf(DiceGame).s13 = function() {
        if (!(this.k16_1 == null)) return false;
        this.g16_1 = this.g16_1 - 1 | 0;
        if (this.g16_1 > 0) return true;
        if (!(this.h16_1 == null)) {
            nextRound(this);
        } else {
            timeUp(this);
        }
        return true;
    };
    protoOf(DiceGame).o13 = function() {
        var builder = new JsonObjectBuilder;
        common_0(this, builder);
        return builder.ov();
    };
    protoOf(DiceGame).r13 = function(player) {
        var builder = new JsonObjectBuilder;
        common_0(this, builder);
        var this_0 = getValue(this.y15_1, player);
        var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_0, 10));
        var _iterator__ex2g4s = this_0.g();
        while (_iterator__ex2g4s.h()) {
            var item = _iterator__ex2g4s.i();
            var tmp$ret$4 = JsonPrimitive_0(item);
            destination.f(tmp$ret$4);
        }
        builder.nv('yourDice', new JsonArray(destination));
        put_1(builder, 'yourTurn', this.k16_1 == null && this.h16_1 == null && this.a16_1 === player);
        return builder.ov();
    };
    function Dice() {
        Dice_instance = this;
        this.l16_1 = 'dice';
        this.m16_1 = numberRangeToNumber(2, 6);
    }
    protoOf(Dice).u13 = function() {
        return this.l16_1;
    };
    protoOf(Dice).v13 = function() {
        return this.m16_1;
    };
    protoOf(Dice).w13 = function(players, random) {
        return new DiceGame(players, random);
    };
    var Dice_instance;
    function Dice_getInstance() {
        if (Dice_instance == null) new Dice;
        return Dice_instance;
    }
    function get_GAMES() {
        _init_properties_Game_kt__8erhxu();
        return GAMES;
    }
    var GAMES;
    function get_COMING_GAMES() {
        _init_properties_Game_kt__8erhxu();
        return COMING_GAMES;
    }
    var COMING_GAMES;
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
    function ComingGame(id, players) {
        this.q16_1 = id;
        this.r16_1 = players;
    }
    function Frame_NONE_getInstance() {
        static_init_4();
        return Frame_NONE_instance;
    }
    function Frame_TV_getInstance() {
        static_init_4();
        return Frame_TV_instance;
    }
    function Frame_EVERYONE_getInstance() {
        static_init_4();
        return Frame_EVERYONE_instance;
    }
    var properties_initialized_Game_kt_8p3p0;
    function _init_properties_Game_kt__8erhxu() {
        if (!properties_initialized_Game_kt_8p3p0) {
            properties_initialized_Game_kt_8p3p0 = true;
            GAMES = listOf_0([ Battleship_getInstance(), Siege_getInstance(), Submarine_getInstance(), Crowd_getInstance(), Dice_getInstance() ]);
            COMING_GAMES = listOf_0([ new ComingGame('durak', numberRangeToNumber(2, 6)), new ComingGame('spy', numberRangeToNumber(3, 8)) ]);
        }
    }
    function Card(id, kind) {
        this.s16_1 = id;
        this.t16_1 = kind;
        this.u16_1 = null;
    }
    function Squad(id, kind, side, hp) {
        this.v16_1 = id;
        this.w16_1 = kind;
        this.x16_1 = side;
        this.y16_1 = hp;
    }
    function draw($this, side) {
        if ($this.h17_1[side].k()) {
            var tmp0 = $this.h17_1[side];
            var elements = shuffled($this.b17_1.m(side), $this.a17_1);
            addAll(tmp0, elements);
        }
        var _unary__edvuaz = $this.r17_1;
        $this.r17_1 = _unary__edvuaz + 1 | 0;
        return new Card(_unary__edvuaz, removeLast($this.h17_1[side]));
    }
    function price($this, kind) {
        return getValue(Companion_getInstance_28().l18_1, kind);
    }
    function left($this, side) {
        var tmp = $this.g17_1[side];
        var tmp0 = $this.i17_1[side];
        var destination = ArrayList_init_$Create$();
        var _iterator__ex2g4s = tmp0.g();
        while (_iterator__ex2g4s.h()) {
            var element = _iterator__ex2g4s.i();
            if (!(element.u16_1 == null)) {
                destination.f(element);
            }
        }
        var sum = 0;
        var _iterator__ex2g4s_0 = destination.g();
        while (_iterator__ex2g4s_0.h()) {
            var element_0 = _iterator__ex2g4s_0.i();
            var tmp_0 = sum;
            sum = tmp_0 + price($this, element_0.t16_1) | 0;
        }
        return tmp - sum | 0;
    }
    function card($this, side, action) {
        var tmp0_safe_receiver = action.cv('card');
        var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : get_jsonPrimitive(tmp0_safe_receiver);
        var tmp2_elvis_lhs = tmp1_safe_receiver == null ? null : get_intOrNull(tmp1_safe_receiver);
        var tmp;
        if (tmp2_elvis_lhs == null) {
            return null;
        } else {
            tmp = tmp2_elvis_lhs;
        }
        var id = tmp;
        var tmp0 = $this.i17_1[side];
        var tmp$ret$0;
        $l$block: {
            var _iterator__ex2g4s = tmp0.g();
            while (_iterator__ex2g4s.h()) {
                var element = _iterator__ex2g4s.i();
                if (element.s16_1 === id) {
                    tmp$ret$0 = element;
                    break $l$block;
                }
            }
            tmp$ret$0 = null;
        }
        return tmp$ret$0;
    }
    function play($this, side, card, lane) {
        if (!(0 <= lane ? lane < 3 : false) || card.t16_1 === 'spy' || card.u16_1 === lane) return false;
        if (card.u16_1 == null && left($this, side) < price($this, card.t16_1)) return false;
        var tmp0 = $this.i17_1[side];
        var destination = ArrayList_init_$Create$();
        var _iterator__ex2g4s = tmp0.g();
        while (_iterator__ex2g4s.h()) {
            var element = _iterator__ex2g4s.i();
            if (!(element === card) && element.u16_1 === lane) {
                destination.f(element);
            }
        }
        var others = destination;
        switch (card.t16_1) {
          case 'ambush':
            var tmp;
            if ($this.d17_1[side][lane]) {
                tmp = true;
            } else {
                var tmp$ret$3;
                $l$block_0: {
                    var tmp_0;
                    if (isInterface(others, Collection)) {
                        tmp_0 = others.k();
                    } else {
                        tmp_0 = false;
                    }
                    if (tmp_0) {
                        tmp$ret$3 = false;
                        break $l$block_0;
                    }
                    var _iterator__ex2g4s_0 = others.g();
                    while (_iterator__ex2g4s_0.h()) {
                        var element_0 = _iterator__ex2g4s_0.i();
                        if (element_0.t16_1 === 'ambush') {
                            tmp$ret$3 = true;
                            break $l$block_0;
                        }
                    }
                    tmp$ret$3 = false;
                }
                tmp = tmp$ret$3;
            }
            if (tmp) return false;
            break;

          case 'ram':
            var tmp$ret$5;
            $l$block_2: {
                var tmp_1;
                if (isInterface(others, Collection)) {
                    tmp_1 = others.k();
                } else {
                    tmp_1 = false;
                }
                if (tmp_1) {
                    tmp$ret$5 = false;
                    break $l$block_2;
                }
                var _iterator__ex2g4s_1 = others.g();
                while (_iterator__ex2g4s_1.h()) {
                    var element_1 = _iterator__ex2g4s_1.i();
                    if (element_1.t16_1 === 'ram') {
                        tmp$ret$5 = true;
                        break $l$block_2;
                    }
                }
                tmp$ret$5 = false;
            }
            if (tmp$ret$5) return false;
            break;

          default:
            var tmp_2 = $this.c17_1[lane][side].j();
            var tmp$ret$7;
            $l$block_3: {
                var tmp_3;
                if (isInterface(others, Collection)) {
                    tmp_3 = others.k();
                } else {
                    tmp_3 = false;
                }
                if (tmp_3) {
                    tmp$ret$7 = 0;
                    break $l$block_3;
                }
                var count = 0;
                var _iterator__ex2g4s_2 = others.g();
                while (_iterator__ex2g4s_2.h()) {
                    var element_2 = _iterator__ex2g4s_2.i();
                    if (Companion_getInstance_28().i18_1.m1(element_2.t16_1)) {
                        count = count + 1 | 0;
                        checkCountOverflow(count);
                    }
                }
                tmp$ret$7 = count;
            }
            if ((tmp_2 + tmp$ret$7 | 0) >= 3) return false;
            break;
        }
        card.u16_1 = lane;
        return true;
    }
    function redraw($this, side) {
        var tmp0 = $this.i17_1[side];
        var destination = ArrayList_init_$Create$();
        var _iterator__ex2g4s = tmp0.g();
        while (_iterator__ex2g4s.h()) {
            var element = _iterator__ex2g4s.i();
            if (element.u16_1 == null) {
                destination.f(element);
            }
        }
        var free = destination;
        if (free.k() || left($this, side) < 1) return false;
        var _array__4zh2yp = $this.g17_1;
        _array__4zh2yp[side] = _array__4zh2yp[side] - 1 | 0;
        $this.i17_1[side].n3(free);
        var times = free.j();
        var inductionVariable = 0;
        if (inductionVariable < times) do {
            var index = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var tmp0_0 = $this.i17_1[side];
            var element_0 = draw($this, side);
            tmp0_0.f(element_0);
        } while (inductionVariable < times);
        return true;
    }
    function spy($this, side, card) {
        if (!(card.t16_1 === 'spy') || left($this, side) < price($this, 'spy')) return false;
        var _array__4zh2yp = $this.g17_1;
        _array__4zh2yp[side] = _array__4zh2yp[side] - price($this, 'spy') | 0;
        $this.i17_1[side].y2(card);
        var rival = $this.i17_1[1 - side | 0];
        var destination = ArrayList_init_$Create$();
        var _iterator__ex2g4s = rival.g();
        while (_iterator__ex2g4s.h()) {
            var element = _iterator__ex2g4s.i();
            if (!(element.u16_1 == null)) {
                destination.f(element);
            }
        }
        var tmp;
        if (destination.k()) {
            tmp = rival;
        } else {
            tmp = destination;
        }
        var tmp$ret$3 = tmp;
        var seen = randomOrNull(tmp$ret$3, $this.a17_1);
        var tmp0 = $this.j17_1[side];
        var builder = new JsonObjectBuilder;
        put(builder, 'kind', seen == null ? null : seen.t16_1);
        put_0(builder, 'lane', seen == null ? null : seen.u16_1);
        var element_0 = builder.ov();
        tmp0.f(element_0);
        return true;
    }
    function resolve($this) {
        var this_0 = until(0, 3);
        var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_0, 10));
        var inductionVariable = this_0.w_1;
        var last = this_0.x_1;
        if (inductionVariable <= last) do {
            var item = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var lane = item;
            var tmp$ret$2 = battle($this, lane);
            destination.f(tmp$ret$2);
        } while (!(item === last));
        var beats = destination;
        var inductionVariable_0 = 0;
        if (inductionVariable_0 <= 1) do {
            var side = inductionVariable_0;
            inductionVariable_0 = inductionVariable_0 + 1 | 0;
            $this.g17_1[side] = left($this, side);
            $this.i17_1[side].a2();
        } while (inductionVariable_0 <= 1);
        var tmp = $this;
        var destination_0 = ArrayList_init_$Create$_0(collectionSizeOrDefault(beats, 10));
        var _iterator__ex2g4s = beats.g();
        while (_iterator__ex2g4s.h()) {
            var item_0 = _iterator__ex2g4s.i();
            var destination_1 = ArrayList_init_$Create$_0(collectionSizeOrDefault(item_0, 10));
            var _iterator__ex2g4s_0 = item_0.g();
            while (_iterator__ex2g4s_0.h()) {
                var item_1 = _iterator__ex2g4s_0.i();
                var tmp$ret$8 = new JsonArray(item_1);
                destination_1.f(tmp$ret$8);
            }
            var tmp$ret$5 = new JsonArray(destination_1);
            destination_0.f(tmp$ret$5);
        }
        tmp.p17_1 = new JsonArray(destination_0);
        $this.o17_1 = true;
        var tmp_0 = $this;
        var tmp0 = until(0, 5);
        var tmp$ret$9;
        $l$block: {
            var tmp_1;
            if (isInterface(tmp0, Collection)) {
                tmp_1 = tmp0.k();
            } else {
                tmp_1 = false;
            }
            if (tmp_1) {
                tmp$ret$9 = 0;
                break $l$block;
            }
            var count = 0;
            var inductionVariable_1 = tmp0.w_1;
            var last_0 = tmp0.x_1;
            if (inductionVariable_1 <= last_0) do {
                var element = inductionVariable_1;
                inductionVariable_1 = inductionVariable_1 + 1 | 0;
                var beat = element;
                var tmp$ret$11;
                $l$block_1: {
                    var tmp_2;
                    if (isInterface(beats, Collection)) {
                        tmp_2 = beats.k();
                    } else {
                        tmp_2 = false;
                    }
                    if (tmp_2) {
                        tmp$ret$11 = false;
                        break $l$block_1;
                    }
                    var _iterator__ex2g4s_1 = beats.g();
                    while (_iterator__ex2g4s_1.h()) {
                        var element_0 = _iterator__ex2g4s_1.i();
                        if (!element_0.m(beat).k()) {
                            tmp$ret$11 = true;
                            break $l$block_1;
                        }
                    }
                    tmp$ret$11 = false;
                }
                if (tmp$ret$11) {
                    count = count + 1 | 0;
                    checkCountOverflow(count);
                }
            } while (!(element === last_0));
            tmp$ret$9 = count;
        }
        tmp_0.m17_1 = 2 + tmp$ret$9 | 0;
        $this.q17_1 = judge($this);
    }
    function battle($this, lane) {
        var list = ArrayList_init_$Create$_0(5);
        var inductionVariable = 0;
        if (inductionVariable < 5) do {
            var index = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var tmp$ret$4 = ArrayList_init_$Create$();
            list.f(tmp$ret$4);
        } while (inductionVariable < 5);
        var beats = list;
        var here = $this.c17_1[lane];
        var inductionVariable_0 = 0;
        if (inductionVariable_0 <= 1) do {
            var side = inductionVariable_0;
            inductionVariable_0 = inductionVariable_0 + 1 | 0;
            var tmp0 = $this.i17_1[side];
            var destination = ArrayList_init_$Create$();
            var _iterator__ex2g4s = tmp0.g();
            while (_iterator__ex2g4s.h()) {
                var element = _iterator__ex2g4s.i();
                if (element.u16_1 === lane) {
                    destination.f(element);
                }
            }
            var _iterator__ex2g4s_0 = destination.g();
            while (_iterator__ex2g4s_0.h()) {
                var card = _iterator__ex2g4s_0.i();
                var tmp0_subject = card.t16_1;
                if (tmp0_subject === 'ambush') {
                    $this.d17_1[side][lane] = true;
                } else if (Companion_getInstance_28().i18_1.m1(tmp0_subject)) {
                    var _unary__edvuaz = $this.r17_1;
                    $this.r17_1 = _unary__edvuaz + 1 | 0;
                    var squad = new Squad(_unary__edvuaz, card.t16_1, side, getValue(Companion_getInstance_28().j18_1, card.t16_1));
                    here[side].f(squad);
                    var tmp0_0 = beats.m(0);
                    var element_0 = event($this, 'enter', SiegeGame$battle$lambda(side, squad));
                    tmp0_0.f(element_0);
                }
            }
        } while (inductionVariable_0 <= 1);
        var inductionVariable_1 = 0;
        if (inductionVariable_1 <= 1) $l$loop: do {
            var side_0 = inductionVariable_1;
            inductionVariable_1 = inductionVariable_1 + 1 | 0;
            if (!$this.d17_1[side_0][lane] || here[1 - side_0 | 0].k()) continue $l$loop;
            $this.d17_1[side_0][lane] = false;
            var tmp0_1 = beats.m(0);
            var element_1 = event($this, 'ambush', SiegeGame$battle$lambda_0(side_0));
            tmp0_1.f(element_1);
            var _iterator__ex2g4s_1 = here[1 - side_0 | 0].g();
            while (_iterator__ex2g4s_1.h()) {
                var squad_0 = _iterator__ex2g4s_1.i();
                squad_0.y16_1 = squad_0.y16_1 - 2 | 0;
                var tmp0_2 = beats.m(0);
                var element_2 = hitEvent($this, null, squad_0, 2, false);
                tmp0_2.f(element_2);
            }
            var tmp = here[1 - side_0 | 0];
            removeAll(tmp, SiegeGame$battle$lambda_1);
        } while (inductionVariable_1 <= 1);
        var inductionVariable_2 = 1;
        if (inductionVariable_2 <= 3) $l$loop_0: do {
            var clash = inductionVariable_2;
            inductionVariable_2 = inductionVariable_2 + 1 | 0;
            var tmp$ret$13;
            $l$block: {
                var inductionVariable_3 = 0;
                var last = here.length;
                while (inductionVariable_3 < last) {
                    var element_3 = here[inductionVariable_3];
                    inductionVariable_3 = inductionVariable_3 + 1 | 0;
                    if (element_3.k()) {
                        tmp$ret$13 = true;
                        break $l$block;
                    }
                }
                tmp$ret$13 = false;
            }
            if (tmp$ret$13) break $l$loop_0;
            attack($this, here, beats.m(clash), true, clash);
            attack($this, here, beats.m(clash), false, clash);
        } while (inductionVariable_2 <= 3);
        var inductionVariable_4 = 0;
        if (inductionVariable_4 <= 1) $l$loop_1: do {
            var side_1 = inductionVariable_4;
            inductionVariable_4 = inductionVariable_4 + 1 | 0;
            var rival = 1 - side_1 | 0;
            var tmp_0;
            if (here[side_1].k()) {
                tmp_0 = true;
            } else {
                tmp_0 = !here[rival].k();
            }
            if (tmp_0) continue $l$loop_1;
            var tmp0_3 = $this.i17_1[side_1];
            var tmp$ret$16;
            $l$block_1: {
                var tmp_1;
                if (isInterface(tmp0_3, Collection)) {
                    tmp_1 = tmp0_3.k();
                } else {
                    tmp_1 = false;
                }
                if (tmp_1) {
                    tmp$ret$16 = false;
                    break $l$block_1;
                }
                var _iterator__ex2g4s_2 = tmp0_3.g();
                while (_iterator__ex2g4s_2.h()) {
                    var element_4 = _iterator__ex2g4s_2.i();
                    if (element_4.u16_1 === lane && element_4.t16_1 === 'ram') {
                        tmp$ret$16 = true;
                        break $l$block_1;
                    }
                }
                tmp$ret$16 = false;
            }
            var ram = tmp$ret$16;
            var _iterator__ex2g4s_3 = here[side_1].g();
            while (_iterator__ex2g4s_3.h()) {
                var squad_1 = _iterator__ex2g4s_3.i();
                var damage = 2;
                if (ram) {
                    ram = false;
                    var a = $this.e17_1[rival][lane];
                    var toWall = Math.min(a, 4);
                    var _array__4zh2yp = $this.e17_1[rival];
                    _array__4zh2yp[lane] = _array__4zh2yp[lane] - toWall | 0;
                }
                var tmp0_4 = $this.e17_1[rival][lane];
                var b = damage;
                var toWall_0 = Math.min(tmp0_4, b);
                var _array__4zh2yp_0 = $this.e17_1[rival];
                _array__4zh2yp_0[lane] = _array__4zh2yp_0[lane] - toWall_0 | 0;
                damage = damage - toWall_0 | 0;
                var _array__4zh2yp_1 = $this.f17_1;
                _array__4zh2yp_1[rival] = _array__4zh2yp_1[rival] - damage | 0;
                var tmp0_5 = beats.m(4);
                var element_5 = event($this, 'strike', SiegeGame$battle$lambda_2(side_1, squad_1, $this, rival, lane));
                tmp0_5.f(element_5);
            }
        } while (inductionVariable_4 <= 1);
        return beats;
    }
    function attack($this, here, beat, ranged, clash) {
        var blows = ArrayList_init_$Create$();
        var inductionVariable = 0;
        if (inductionVariable <= 1) do {
            var side = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var _iterator__ex2g4s = here[side].g();
            $l$loop_0: while (_iterator__ex2g4s.h()) {
                var squad = _iterator__ex2g4s.i();
                if (!(squad.w16_1 === 'archer' === ranged)) continue $l$loop_0;
                var enemies = here[1 - side | 0];
                var tmp$ret$1;
                $l$block: {
                    var _iterator__ex2g4s_0 = enemies.g();
                    while (_iterator__ex2g4s_0.h()) {
                        var element = _iterator__ex2g4s_0.i();
                        if (Companion_getInstance_28().k18_1.t1(squad.w16_1) === element.w16_1) {
                            tmp$ret$1 = element;
                            break $l$block;
                        }
                    }
                    tmp$ret$1 = null;
                }
                var tmp0_elvis_lhs = tmp$ret$1;
                var tmp1_elvis_lhs = tmp0_elvis_lhs == null ? firstOrNull(enemies) : tmp0_elvis_lhs;
                var tmp;
                if (tmp1_elvis_lhs == null) {
                    continue $l$loop_0;
                } else {
                    tmp = tmp1_elvis_lhs;
                }
                var target = tmp;
                var countered = Companion_getInstance_28().k18_1.t1(squad.w16_1) === target.w16_1;
                var charge = squad.w16_1 === 'horse' && clash === 1;
                var element_0 = new Triple(squad, target, (countered ? 2 : 1) + (charge ? 1 : 0) | 0);
                blows.f(element_0);
            }
        } while (inductionVariable <= 1);
        var _iterator__ex2g4s_1 = blows.g();
        while (_iterator__ex2g4s_1.h()) {
            var _destruct__k2r9zo = _iterator__ex2g4s_1.i();
            var by = _destruct__k2r9zo.oa();
            var to = _destruct__k2r9zo.pa();
            var damage = _destruct__k2r9zo.ue();
            to.y16_1 = to.y16_1 - damage | 0;
            var element_1 = hitEvent($this, by, to, damage, ranged);
            beat.f(element_1);
        }
        var inductionVariable_0 = 0;
        var last = here.length;
        while (inductionVariable_0 < last) {
            var side_0 = here[inductionVariable_0];
            inductionVariable_0 = inductionVariable_0 + 1 | 0;
            removeAll(side_0, SiegeGame$attack$lambda);
        }
    }
    function hitEvent($this, by, to, damage, ranged) {
        return event($this, 'hit', SiegeGame$hitEvent$lambda(by, to, damage, ranged));
    }
    function event($this, type, fill) {
        var builder = new JsonObjectBuilder;
        put(builder, 'e', type);
        fill(builder);
        return builder.ov();
    }
    function judge($this) {
        var tmp;
        var tmp0 = $this.f17_1;
        var tmp$ret$0;
        $l$block: {
            var inductionVariable = 0;
            var last = tmp0.length;
            while (inductionVariable < last) {
                var element = tmp0[inductionVariable];
                inductionVariable = inductionVariable + 1 | 0;
                if (element <= 0) {
                    tmp$ret$0 = false;
                    break $l$block;
                }
            }
            tmp$ret$0 = true;
        }
        if (tmp$ret$0) {
            tmp = $this.l17_1 < 8;
        } else {
            tmp = false;
        }
        if (tmp) return null;
        var tmp_0 = 0;
        var tmp_1 = new Int32Array(2);
        while (tmp_0 < 2) {
            var tmp_2 = tmp_0;
            tmp_1[tmp_2] = $this.f17_1[tmp_2] + sum($this.e17_1[tmp_2]) | 0;
            tmp_0 = tmp_0 + 1 | 0;
        }
        var strength = tmp_1;
        return !($this.f17_1[0] === $this.f17_1[1]) ? $this.z16_1.m($this.f17_1[0] > $this.f17_1[1] ? 0 : 1) : !(strength[0] === strength[1]) ? $this.z16_1.m(strength[0] > strength[1] ? 0 : 1) : 'draw';
    }
    function nextRound_0($this) {
        $this.o17_1 = false;
        if (!($this.q17_1 == null)) {
            $this.s17_1 = $this.q17_1;
            return Unit_instance;
        }
        $this.l17_1 = $this.l17_1 + 1 | 0;
        fill($this.k17_1, false);
        $this.n17_1 = false;
        $this.m17_1 = 20;
        var inductionVariable = 0;
        if (inductionVariable <= 1) do {
            var side = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var _array__4zh2yp = $this.g17_1;
            _array__4zh2yp[side] = _array__4zh2yp[side] + Companion_getInstance_28().n18($this.l17_1) | 0;
            $this.j17_1[side].a2();
            var inductionVariable_0 = 0;
            if (inductionVariable_0 < 4) do {
                var index = inductionVariable_0;
                inductionVariable_0 = inductionVariable_0 + 1 | 0;
                var tmp0 = $this.i17_1[side];
                var element = draw($this, side);
                tmp0.f(element);
            } while (inductionVariable_0 < 4);
        } while (inductionVariable <= 1);
    }
    function common_1($this, $receiver) {
        put($receiver, 'game', Siege_getInstance().o18_1);
        put($receiver, 'phase', !($this.s17_1 == null) ? 'over' : $this.o17_1 ? 'showing' : 'planning');
        put_0($receiver, 'round', $this.l17_1);
        put_0($receiver, 'rounds', 8);
        put_0($receiver, 'clock', !($this.s17_1 == null) ? 0 : $this.m17_1);
        var this_0 = $this.z16_1;
        var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_0, 10));
        var _iterator__ex2g4s = this_0.g();
        while (_iterator__ex2g4s.h()) {
            var item = _iterator__ex2g4s.i();
            var tmp$ret$2 = JsonPrimitive_1(item);
            destination.f(tmp$ret$2);
        }
        $receiver.nv('sides', new JsonArray(destination));
        var this_1 = $this.f17_1;
        var destination_0 = ArrayList_init_$Create$_0(this_1.length);
        var inductionVariable = 0;
        var last = this_1.length;
        while (inductionVariable < last) {
            var item_0 = this_1[inductionVariable];
            inductionVariable = inductionVariable + 1 | 0;
            var tmp$ret$6 = Math.max(0, item_0);
            var tmp$ret$5 = JsonPrimitive_0(tmp$ret$6);
            destination_0.f(tmp$ret$5);
        }
        $receiver.nv('towers', new JsonArray(destination_0));
        var this_2 = $this.e17_1;
        var destination_1 = ArrayList_init_$Create$_0(this_2.length);
        var inductionVariable_0 = 0;
        var last_0 = this_2.length;
        while (inductionVariable_0 < last_0) {
            var item_1 = this_2[inductionVariable_0];
            inductionVariable_0 = inductionVariable_0 + 1 | 0;
            var destination_2 = ArrayList_init_$Create$_0(item_1.length);
            var inductionVariable_1 = 0;
            var last_1 = item_1.length;
            while (inductionVariable_1 < last_1) {
                var item_2 = item_1[inductionVariable_1];
                inductionVariable_1 = inductionVariable_1 + 1 | 0;
                var tmp$ret$12 = JsonPrimitive_0(item_2);
                destination_2.f(tmp$ret$12);
            }
            var tmp$ret$9 = new JsonArray(destination_2);
            destination_1.f(tmp$ret$9);
        }
        $receiver.nv('walls', new JsonArray(destination_1));
        var this_3 = $this.k17_1;
        var destination_3 = ArrayList_init_$Create$_0(this_3.length);
        var inductionVariable_2 = 0;
        var last_2 = this_3.length;
        while (inductionVariable_2 < last_2) {
            var item_3 = this_3[inductionVariable_2];
            inductionVariable_2 = inductionVariable_2 + 1 | 0;
            var tmp$ret$15 = JsonPrimitive_2(item_3);
            destination_3.f(tmp$ret$15);
        }
        $receiver.nv('ready', new JsonArray(destination_3));
        put($receiver, 'winner', $this.s17_1);
        put_0($receiver, 'slots', 3);
        put_0($receiver, 'redrawPrice', 1);
        var this_4 = Companion_getInstance_28().l18_1;
        var destination_4 = LinkedHashMap_init_$Create$_0(mapCapacity(this_4.j()));
        var _iterator__ex2g4s_0 = this_4.w1().g();
        while (_iterator__ex2g4s_0.h()) {
            var element = _iterator__ex2g4s_0.i();
            var tmp = element.p1();
            var tmp$ret$20 = JsonPrimitive_0(element.q1());
            destination_4.x1(tmp, tmp$ret$20);
        }
        $receiver.nv('prices', new JsonObject(destination_4));
        var this_5 = until(0, 3);
        var destination_5 = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_5, 10));
        var inductionVariable_3 = this_5.w_1;
        var last_3 = this_5.x_1;
        if (inductionVariable_3 <= last_3) do {
            var item_4 = inductionVariable_3;
            inductionVariable_3 = inductionVariable_3 + 1 | 0;
            var lane = item_4;
            var this_6 = numberRangeToNumber(0, 1);
            var destination_6 = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_6, 10));
            var inductionVariable_4 = this_6.w_1;
            var last_4 = this_6.x_1;
            if (inductionVariable_4 <= last_4) do {
                var item_5 = inductionVariable_4;
                inductionVariable_4 = inductionVariable_4 + 1 | 0;
                var side = item_5;
                var this_7 = $this.c17_1[lane][side];
                var destination_7 = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_7, 10));
                var _iterator__ex2g4s_1 = this_7.g();
                while (_iterator__ex2g4s_1.h()) {
                    var item_6 = _iterator__ex2g4s_1.i();
                    var builder = new JsonObjectBuilder;
                    put_0(builder, 'id', item_6.v16_1);
                    put(builder, 'kind', item_6.w16_1);
                    put_0(builder, 'hp', item_6.y16_1);
                    var tmp$ret$29 = builder.ov();
                    destination_7.f(tmp$ret$29);
                }
                var tmp$ret$26 = new JsonArray(destination_7);
                destination_6.f(tmp$ret$26);
            } while (!(item_5 === last_4));
            var tmp$ret$23 = new JsonArray(destination_6);
            destination_5.f(tmp$ret$23);
        } while (!(item_4 === last_3));
        $receiver.nv('lanes', new JsonArray(destination_5));
        var tmp0_elvis_lhs = $this.p17_1;
        $receiver.nv('report', tmp0_elvis_lhs == null ? JsonNull_getInstance() : tmp0_elvis_lhs);
    }
    function Companion_28() {
        Companion_instance_28 = this;
        this.t17_1 = 3;
        this.u17_1 = 3;
        this.v17_1 = 4;
        this.w17_1 = 12;
        this.x17_1 = 4;
        this.y17_1 = 8;
        this.z17_1 = 2;
        this.a18_1 = 4;
        this.b18_1 = 2;
        this.c18_1 = 1;
        this.d18_1 = 3;
        this.e18_1 = 5;
        this.f18_1 = 20;
        this.g18_1 = 8;
        this.h18_1 = 2;
        this.i18_1 = setOf_0([ 'pike', 'horse', 'archer' ]);
        this.j18_1 = mapOf_0([ to('pike', 4), to('horse', 3), to('archer', 2) ]);
        this.k18_1 = mapOf_0([ to('pike', 'horse'), to('horse', 'archer'), to('archer', 'pike') ]);
        this.l18_1 = mapOf_0([ to('pike', 2), to('horse', 2), to('archer', 2), to('ram', 2), to('ambush', 2), to('spy', 1) ]);
        var tmp = this;
        var list = ArrayList_init_$Create$_0(4);
        var inductionVariable = 0;
        if (inductionVariable < 4) do {
            var index = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            list.f('pike');
        } while (inductionVariable < 4);
        var tmp_0 = list;
        var list_0 = ArrayList_init_$Create$_0(4);
        var inductionVariable_0 = 0;
        if (inductionVariable_0 < 4) do {
            var index_0 = inductionVariable_0;
            inductionVariable_0 = inductionVariable_0 + 1 | 0;
            list_0.f('horse');
        } while (inductionVariable_0 < 4);
        var tmp_1 = plus(tmp_0, list_0);
        var list_1 = ArrayList_init_$Create$_0(4);
        var inductionVariable_1 = 0;
        if (inductionVariable_1 < 4) do {
            var index_1 = inductionVariable_1;
            inductionVariable_1 = inductionVariable_1 + 1 | 0;
            list_1.f('archer');
        } while (inductionVariable_1 < 4);
        var tmp_2 = plus(tmp_1, list_1);
        var list_2 = ArrayList_init_$Create$_0(2);
        var inductionVariable_2 = 0;
        if (inductionVariable_2 < 2) do {
            var index_2 = inductionVariable_2;
            inductionVariable_2 = inductionVariable_2 + 1 | 0;
            list_2.f('ram');
        } while (inductionVariable_2 < 2);
        var tmp_3 = plus(tmp_2, list_2);
        var list_3 = ArrayList_init_$Create$_0(2);
        var inductionVariable_3 = 0;
        if (inductionVariable_3 < 2) do {
            var index_3 = inductionVariable_3;
            inductionVariable_3 = inductionVariable_3 + 1 | 0;
            list_3.f('ambush');
        } while (inductionVariable_3 < 2);
        var tmp_4 = plus(tmp_3, list_3);
        var list_4 = ArrayList_init_$Create$_0(2);
        var inductionVariable_4 = 0;
        if (inductionVariable_4 < 2) do {
            var index_4 = inductionVariable_4;
            inductionVariable_4 = inductionVariable_4 + 1 | 0;
            list_4.f('spy');
        } while (inductionVariable_4 < 2);
        tmp.m18_1 = plus(tmp_4, list_4);
    }
    protoOf(Companion_28).n18 = function(round) {
        return 4 + ((round - 1 | 0) / 2 | 0) | 0;
    };
    var Companion_instance_28;
    function Companion_getInstance_28() {
        if (Companion_instance_28 == null) new Companion_28;
        return Companion_instance_28;
    }
    function SiegeGame$battle$lambda($side, $squad) {
        return function($this$event) {
            put_0($this$event, 'side', $side);
            put_0($this$event, 'id', $squad.v16_1);
            put($this$event, 'kind', $squad.w16_1);
            put_0($this$event, 'hp', $squad.y16_1);
            return Unit_instance;
        };
    }
    function SiegeGame$battle$lambda_0($side) {
        return function($this$event) {
            put_0($this$event, 'side', $side);
            return Unit_instance;
        };
    }
    function SiegeGame$battle$lambda_1(it) {
        return it.y16_1 <= 0;
    }
    function SiegeGame$battle$lambda_2($side, $squad, this$0, $rival, $lane) {
        return function($this$event) {
            put_0($this$event, 'side', $side);
            put_0($this$event, 'id', $squad.v16_1);
            put_0($this$event, 'wall', this$0.e17_1[$rival][$lane]);
            var b = this$0.f17_1[$rival];
            var tmp$ret$0 = Math.max(0, b);
            put_0($this$event, 'tower', tmp$ret$0);
            return Unit_instance;
        };
    }
    function SiegeGame$attack$lambda(it) {
        return it.y16_1 <= 0;
    }
    function SiegeGame$hitEvent$lambda($by, $to, $damage, $ranged) {
        return function($this$event) {
            var tmp0_safe_receiver = $by;
            put_0($this$event, 'by', tmp0_safe_receiver == null ? null : tmp0_safe_receiver.v16_1);
            put_0($this$event, 'to', $to.v16_1);
            put_0($this$event, 'side', $to.x16_1);
            put_0($this$event, 'damage', $damage);
            var b = $to.y16_1;
            var tmp$ret$0 = Math.max(0, b);
            put_0($this$event, 'hp', tmp$ret$0);
            put_1($this$event, 'ranged', $ranged);
            return Unit_instance;
        };
    }
    function SiegeGame(players, random, decks) {
        Companion_getInstance_28();
        decks = decks === VOID ? listOf_0([ Companion_getInstance_28().m18_1, Companion_getInstance_28().m18_1 ]) : decks;
        this.z16_1 = players;
        this.a17_1 = random;
        this.b17_1 = decks;
        var tmp = this;
        var tmp_0 = 0;
        var tmp_1 = Array(3);
        while (tmp_0 < 3) {
            var tmp_2 = tmp_0;
            var tmp_3 = 0;
            var tmp_4 = Array(2);
            while (tmp_3 < 2) {
                tmp_4[tmp_3] = ArrayList_init_$Create$();
                tmp_3 = tmp_3 + 1 | 0;
            }
            tmp_1[tmp_2] = tmp_4;
            tmp_0 = tmp_0 + 1 | 0;
        }
        tmp.c17_1 = tmp_1;
        var tmp_5 = this;
        var tmp_6 = 0;
        var tmp_7 = Array(2);
        while (tmp_6 < 2) {
            tmp_7[tmp_6] = booleanArray(3);
            tmp_6 = tmp_6 + 1 | 0;
        }
        tmp_5.d17_1 = tmp_7;
        var tmp_8 = this;
        var tmp_9 = 0;
        var tmp_10 = Array(2);
        while (tmp_9 < 2) {
            var tmp_11 = tmp_9;
            var tmp_12 = 0;
            var tmp_13 = new Int32Array(3);
            while (tmp_12 < 3) {
                tmp_13[tmp_12] = 4;
                tmp_12 = tmp_12 + 1 | 0;
            }
            tmp_10[tmp_11] = tmp_13;
            tmp_9 = tmp_9 + 1 | 0;
        }
        tmp_8.e17_1 = tmp_10;
        var tmp_14 = this;
        var tmp_15 = 0;
        var tmp_16 = new Int32Array(2);
        while (tmp_15 < 2) {
            tmp_16[tmp_15] = 12;
            tmp_15 = tmp_15 + 1 | 0;
        }
        tmp_14.f17_1 = tmp_16;
        var tmp_17 = this;
        var tmp_18 = 0;
        var tmp_19 = new Int32Array(2);
        while (tmp_18 < 2) {
            tmp_19[tmp_18] = Companion_getInstance_28().n18(1);
            tmp_18 = tmp_18 + 1 | 0;
        }
        tmp_17.g17_1 = tmp_19;
        var tmp_20 = this;
        var tmp_21 = 0;
        var tmp_22 = Array(2);
        while (tmp_21 < 2) {
            tmp_22[tmp_21] = ArrayList_init_$Create$();
            tmp_21 = tmp_21 + 1 | 0;
        }
        tmp_20.h17_1 = tmp_22;
        var tmp_23 = this;
        var tmp_24 = 0;
        var tmp_25 = Array(2);
        while (tmp_24 < 2) {
            tmp_25[tmp_24] = ArrayList_init_$Create$();
            tmp_24 = tmp_24 + 1 | 0;
        }
        tmp_23.i17_1 = tmp_25;
        var tmp_26 = this;
        var tmp_27 = 0;
        var tmp_28 = Array(2);
        while (tmp_27 < 2) {
            tmp_28[tmp_27] = ArrayList_init_$Create$();
            tmp_27 = tmp_27 + 1 | 0;
        }
        tmp_26.j17_1 = tmp_28;
        this.k17_1 = booleanArray(2);
        this.l17_1 = 1;
        this.m17_1 = 20;
        this.n17_1 = false;
        this.o17_1 = false;
        this.p17_1 = null;
        this.q17_1 = null;
        this.r17_1 = 0;
        this.s17_1 = null;
        var inductionVariable = 0;
        if (inductionVariable <= 1) do {
            var side = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var inductionVariable_0 = 0;
            if (inductionVariable_0 < 4) do {
                var index = inductionVariable_0;
                inductionVariable_0 = inductionVariable_0 + 1 | 0;
                var tmp0 = this.i17_1[side];
                var element = draw(this, side);
                tmp0.f(element);
            } while (inductionVariable_0 < 4);
        } while (inductionVariable <= 1);
    }
    protoOf(SiegeGame).m13 = function() {
        return this.s17_1;
    };
    protoOf(SiegeGame).n13 = function(player, action) {
        var side = this.z16_1.o1(player);
        if (side < 0 || this.o17_1 || !(this.s17_1 == null)) return false;
        var tmp0_safe_receiver = action.cv('do');
        var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : get_jsonPrimitive(tmp0_safe_receiver);
        var command = tmp1_safe_receiver == null ? null : get_contentOrNull(tmp1_safe_receiver);
        if (command === 'unready') {
            if (!this.k17_1[side]) return false;
            this.k17_1[side] = false;
            return true;
        }
        if (this.k17_1[side]) return false;
        var tmp;
        switch (command) {
          case 'ready':
            this.k17_1[side] = true;
            var tmp0 = this.k17_1;
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
                resolve(this);
            } else {
                if (!this.n17_1) {
                    this.n17_1 = true;
                    var tmp_0 = this;
                    var a = this.m17_1;
                    tmp_0.m17_1 = Math.min(a, 8);
                }
            }
            tmp = true;
            break;

          case 'redraw':
            tmp = redraw(this, side);
            break;

          case 'play':
            var tmp3_elvis_lhs = card(this, side, action);
            var tmp_1;
            if (tmp3_elvis_lhs == null) {
                return false;
            } else {
                tmp_1 = tmp3_elvis_lhs;
            }
            var tmp_2 = tmp_1;
            var tmp4_safe_receiver = action.cv('lane');
            var tmp5_safe_receiver = tmp4_safe_receiver == null ? null : get_jsonPrimitive(tmp4_safe_receiver);
            var tmp6_elvis_lhs = tmp5_safe_receiver == null ? null : get_intOrNull(tmp5_safe_receiver);
            var tmp_3;
            if (tmp6_elvis_lhs == null) {
                return false;
            } else {
                tmp_3 = tmp6_elvis_lhs;
            }
            tmp = play(this, side, tmp_2, tmp_3);
            break;

          case 'unplay':
            var tmp7_elvis_lhs = card(this, side, action);
            var tmp_4;
            if (tmp7_elvis_lhs == null) {
                return false;
            } else {
                tmp_4 = tmp7_elvis_lhs;
            }
            var card_0 = tmp_4;
            if (card_0.u16_1 == null) return false;
            card_0.u16_1 = null;
            tmp = true;
            break;

          case 'spy':
            var tmp8_elvis_lhs = card(this, side, action);
            var tmp_5;
            if (tmp8_elvis_lhs == null) {
                return false;
            } else {
                tmp_5 = tmp8_elvis_lhs;
            }
            tmp = spy(this, side, tmp_5);
            break;

          default:
            tmp = false;
            break;
        }
        return tmp;
    };
    protoOf(SiegeGame).s13 = function() {
        if (!(this.s17_1 == null)) return false;
        this.m17_1 = this.m17_1 - 1 | 0;
        if (this.m17_1 > 0) return true;
        if (this.o17_1) {
            nextRound_0(this);
        } else {
            resolve(this);
        }
        return true;
    };
    protoOf(SiegeGame).o13 = function() {
        var builder = new JsonObjectBuilder;
        common_1(this, builder);
        return builder.ov();
    };
    protoOf(SiegeGame).r13 = function(player) {
        var builder = new JsonObjectBuilder;
        var side = this.z16_1.o1(player);
        common_1(this, builder);
        put_0(builder, 'side', side);
        put_0(builder, 'left', left(this, side));
        put_1(builder, 'youReady', this.k17_1[side]);
        put_1(builder, 'rivalReady', this.k17_1[1 - side | 0]);
        var this_0 = this.i17_1[side];
        var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_0, 10));
        var _iterator__ex2g4s = this_0.g();
        while (_iterator__ex2g4s.h()) {
            var item = _iterator__ex2g4s.i();
            var builder_0 = new JsonObjectBuilder;
            put_0(builder_0, 'id', item.s16_1);
            put(builder_0, 'kind', item.t16_1);
            put_0(builder_0, 'lane', item.u16_1);
            var tmp$ret$4 = builder_0.ov();
            destination.f(tmp$ret$4);
        }
        builder.nv('hand', new JsonArray(destination));
        var this_1 = this.d17_1[side];
        var destination_0 = ArrayList_init_$Create$_0(this_1.length);
        var inductionVariable = 0;
        var last = this_1.length;
        while (inductionVariable < last) {
            var item_0 = this_1[inductionVariable];
            inductionVariable = inductionVariable + 1 | 0;
            var tmp$ret$9 = JsonPrimitive_2(item_0);
            destination_0.f(tmp$ret$9);
        }
        builder.nv('ambushes', new JsonArray(destination_0));
        builder.nv('intel', new JsonArray(this.j17_1[side]));
        return builder.ov();
    };
    function Siege() {
        Siege_instance = this;
        this.o18_1 = 'siege';
        this.p18_1 = numberRangeToNumber(2, 2);
    }
    protoOf(Siege).u13 = function() {
        return this.o18_1;
    };
    protoOf(Siege).v13 = function() {
        return this.p18_1;
    };
    protoOf(Siege).w13 = function(players, random) {
        return new SiegeGame(players, random);
    };
    var Siege_instance;
    function Siege_getInstance() {
        if (Siege_instance == null) new Siege;
        return Siege_instance;
    }
    function _get_settingOut__x7we4z_0($this) {
        var tmp0 = $this.w18_1;
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
        return !tmp$ret$0;
    }
    function isWater($this, cell) {
        return charCodeAt($this.s18_1.m(cell / 12 | 0), cell % 12 | 0) === _Char___init__impl__6a9atx(46);
    }
    function cellAt($this, x, y) {
        return (0 <= x ? x < 12 : false) && (0 <= y ? y < 12 : false) ? imul(y, 12) + x | 0 : null;
    }
    function sectorOf($this, cell) {
        return imul((cell / 12 | 0) / 4 | 0, 3) + ((cell % 12 | 0) / 4 | 0) | 0;
    }
    function distance($this, a, b) {
        return abs_0((a % 12 | 0) - (b % 12 | 0) | 0) + abs_0((a / 12 | 0) - (b / 12 | 0) | 0) | 0;
    }
    function blastDistance($this, a, b) {
        var tmp0 = abs_0((a % 12 | 0) - (b % 12 | 0) | 0);
        var b_0 = abs_0((a / 12 | 0) - (b / 12 | 0) | 0);
        return Math.max(tmp0, b_0);
    }
    function step_0($this, cell, dir) {
        var tmp0_elvis_lhs = Companion_getInstance_29().v19_1.t1(dir);
        var tmp;
        if (tmp0_elvis_lhs == null) {
            return null;
        } else {
            tmp = tmp0_elvis_lhs;
        }
        var _destruct__k2r9zo = tmp;
        var dx = _destruct__k2r9zo.oa();
        var dy = _destruct__k2r9zo.pa();
        var tmp1_safe_receiver = cellAt($this, (cell % 12 | 0) + dx | 0, (cell / 12 | 0) + dy | 0);
        var tmp_0;
        if (tmp1_safe_receiver == null) {
            tmp_0 = null;
        } else {
            var tmp_1;
            if (isWater($this, tmp1_safe_receiver)) {
                tmp_1 = tmp1_safe_receiver;
            } else {
                tmp_1 = null;
            }
            tmp_0 = tmp_1;
        }
        return tmp_0;
    }
    function canMove($this, side, dir) {
        var tmp0_elvis_lhs = $this.u18_1[side];
        var tmp;
        if (tmp0_elvis_lhs == null) {
            return false;
        } else {
            tmp = tmp0_elvis_lhs;
        }
        var tmp1_elvis_lhs = step_0($this, tmp, dir);
        var tmp_0;
        if (tmp1_elvis_lhs == null) {
            return false;
        } else {
            tmp_0 = tmp1_elvis_lhs;
        }
        var to = tmp_0;
        return !$this.v18_1[side].m1(to);
    }
    function silentCells($this, side) {
        var tmp0_elvis_lhs = $this.u18_1[side];
        var tmp;
        if (tmp0_elvis_lhs == null) {
            return emptyList();
        } else {
            tmp = tmp0_elvis_lhs;
        }
        var from = tmp;
        var tmp0 = Companion_getInstance_29().v19_1.u1();
        var destination = ArrayList_init_$Create$();
        var _iterator__ex2g4s = tmp0.g();
        while (_iterator__ex2g4s.h()) {
            var element = _iterator__ex2g4s.i();
            var this_0 = ArrayList_init_$Create$();
            $l$block: {
                var at = from;
                var inductionVariable = 0;
                if (inductionVariable < 3) do {
                    var index = inductionVariable;
                    inductionVariable = inductionVariable + 1 | 0;
                    var to = step_0($this, at, element);
                    if (to == null || $this.v18_1[side].m1(to)) {
                        break $l$block;
                    }
                    this_0.f(to);
                    at = to;
                } while (inductionVariable < 3);
            }
            var list = this_0.d4();
            addAll(destination, list);
        }
        return destination;
    }
    function cellFrom($this, action) {
        var tmp0_safe_receiver = action.cv('x');
        var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : get_jsonPrimitive(tmp0_safe_receiver);
        var tmp2_elvis_lhs = tmp1_safe_receiver == null ? null : get_intOrNull(tmp1_safe_receiver);
        var tmp;
        if (tmp2_elvis_lhs == null) {
            return null;
        } else {
            tmp = tmp2_elvis_lhs;
        }
        var x = tmp;
        var tmp3_safe_receiver = action.cv('y');
        var tmp4_safe_receiver = tmp3_safe_receiver == null ? null : get_jsonPrimitive(tmp3_safe_receiver);
        var tmp5_elvis_lhs = tmp4_safe_receiver == null ? null : get_intOrNull(tmp4_safe_receiver);
        var tmp_0;
        if (tmp5_elvis_lhs == null) {
            return null;
        } else {
            tmp_0 = tmp5_elvis_lhs;
        }
        var y = tmp_0;
        return cellAt($this, x, y);
    }
    function setOut_0($this, side, command, action) {
        if (command === 'unready') {
            if (!$this.w18_1[side]) return false;
            $this.w18_1[side] = false;
            return true;
        }
        if ($this.w18_1[side]) return false;
        var tmp;
        switch (command) {
          case 'place':
            var tmp1_safe_receiver = cellFrom($this, action);
            var tmp_0;
            if (tmp1_safe_receiver == null) {
                tmp_0 = null;
            } else {
                var tmp_1;
                if (isWater($this, tmp1_safe_receiver)) {
                    tmp_1 = tmp1_safe_receiver;
                } else {
                    tmp_1 = null;
                }
                tmp_0 = tmp_1;
            }
            var tmp2_elvis_lhs = tmp_0;
            var tmp_2;
            if (tmp2_elvis_lhs == null) {
                return false;
            } else {
                tmp_2 = tmp2_elvis_lhs;
            }
            var cell = tmp_2;
            $this.u18_1[side] = cell;
            $this.v18_1[side].a2();
            $this.v18_1[side].f(cell);
            tmp = true;
            break;

          case 'random':
            var cell_0 = random($this.t18_1, $this.r18_1);
            $this.u18_1[side] = cell_0;
            $this.v18_1[side].a2();
            $this.v18_1[side].f(cell_0);
            tmp = true;
            break;

          case 'ready':
            if ($this.u18_1[side] == null) return false;
            $this.w18_1[side] = true;
            var tmp0 = $this.w18_1;
            var tmp$ret$4;
            $l$block: {
                var inductionVariable = 0;
                var last = tmp0.length;
                while (inductionVariable < last) {
                    var element = tmp0[inductionVariable];
                    inductionVariable = inductionVariable + 1 | 0;
                    if (!element) {
                        tmp$ret$4 = false;
                        break $l$block;
                    }
                }
                tmp$ret$4 = true;
            }
            if (tmp$ret$4) {
                $this.c19_1 = $this.r18_1.l(2);
                $this.f19_1 = 30;
            }
            tmp = true;
            break;

          default:
            tmp = false;
            break;
        }
        return tmp;
    }
    function move_0($this, side, dir) {
        var tmp;
        var this_0 = Companion_getInstance_29().v19_1;
        if (!(isInterface(this_0, KtMap) ? this_0 : THROW_CCE()).r1(dir)) {
            tmp = true;
        } else {
            tmp = !canMove($this, side, dir);
        }
        if (tmp) return false;
        var to = ensureNotNull(step_0($this, ensureNotNull($this.u18_1[side]), dir));
        $this.u18_1[side] = to;
        $this.v18_1[side].f(to);
        var b = $this.y18_1[side] + 1 | 0;
        var tmp$ret$3 = Math.min(6, b);
        $this.y18_1[side] = tmp$ret$3;
        var watcher = $this.a19_1[1 - side | 0];
        var destination = ArrayList_init_$Create$();
        var _iterator__ex2g4s = watcher.g();
        while (_iterator__ex2g4s.h()) {
            var element = _iterator__ex2g4s.i();
            var tmp0_safe_receiver = step_0($this, element, dir);
            if (tmp0_safe_receiver == null) null; else {
                destination.f(tmp0_safe_receiver);
            }
        }
        var moved = destination;
        watcher.a2();
        addAll(watcher, moved);
        var tmp0 = $this.b19_1;
        var element_0 = entry($this, 'move', side, SubmarineGame$move$lambda(dir));
        tmp0.f(element_0);
        afterMove($this, side);
        return true;
    }
    function afterMove($this, side) {
        if ($this.y18_1[side] >= 2) $this.d19_1 = true; else {
            endTurn($this);
        }
    }
    function silent($this, side, to) {
        if ($this.y18_1[side] < 3 || !silentCells($this, side).m1(to)) return false;
        var from = ensureNotNull($this.u18_1[side]);
        var _array__4zh2yp = $this.y18_1;
        _array__4zh2yp[side] = _array__4zh2yp[side] - 3 | 0;
        var dx = coerceIn_0((to % 12 | 0) - (from % 12 | 0) | 0, -1, 1);
        var dy = coerceIn_0((to / 12 | 0) - (from / 12 | 0) | 0, -1, 1);
        var at = from;
        while (!(at === to)) {
            at = ensureNotNull(cellAt($this, (at % 12 | 0) + dx | 0, (at / 12 | 0) + dy | 0));
            var tmp0 = $this.v18_1[side];
            var element = at;
            tmp0.f(element);
        }
        $this.u18_1[side] = to;
        var watcher = $this.a19_1[1 - side | 0];
        var destination = ArrayList_init_$Create$();
        var _iterator__ex2g4s = watcher.g();
        while (_iterator__ex2g4s.h()) {
            var element_0 = _iterator__ex2g4s.i();
            var tmp = listOf(element_0);
            var tmp0_0 = Companion_getInstance_29().v19_1.u1();
            var destination_0 = ArrayList_init_$Create$();
            var _iterator__ex2g4s_0 = tmp0_0.g();
            while (_iterator__ex2g4s_0.h()) {
                var element_1 = _iterator__ex2g4s_0.i();
                var this_0 = ArrayList_init_$Create$();
                $l$block: {
                    var cell = element_0;
                    var inductionVariable = 0;
                    if (inductionVariable < 3) do {
                        var index = inductionVariable;
                        inductionVariable = inductionVariable + 1 | 0;
                        var tmp0_elvis_lhs = step_0($this, cell, element_1);
                        var tmp_0;
                        if (tmp0_elvis_lhs == null) {
                            break $l$block;
                        } else {
                            tmp_0 = tmp0_elvis_lhs;
                        }
                        var next = tmp_0;
                        this_0.f(next);
                        cell = next;
                    } while (inductionVariable < 3);
                }
                var list = this_0.d4();
                addAll(destination_0, list);
            }
            var list_0 = plus(tmp, destination_0);
            addAll(destination, list_0);
        }
        var spread = destination;
        watcher.a2();
        addAll(watcher, spread);
        var tmp0_1 = $this.b19_1;
        var element_2 = entry($this, 'silent', side, SubmarineGame$silent$lambda);
        tmp0_1.f(element_2);
        endTurn($this);
        return true;
    }
    function surface($this, side) {
        var at = ensureNotNull($this.u18_1[side]);
        var sector = sectorOf($this, at);
        $this.v18_1[side].a2();
        $this.v18_1[side].f(at);
        var tmp = $this.a19_1[1 - side | 0];
        retainAll(tmp, SubmarineGame$surface$lambda($this, sector));
        var tmp0 = $this.b19_1;
        var element = entry($this, 'surface', side, SubmarineGame$surface$lambda_0(sector));
        tmp0.f(element);
        $this.e19_1 = true;
        endTurn($this);
    }
    function torpedo($this, side, target) {
        var from = ensureNotNull($this.u18_1[side]);
        if ($this.y18_1[side] < 3 || distance($this, from, target) > 4) return false;
        var _array__4zh2yp = $this.y18_1;
        _array__4zh2yp[side] = _array__4zh2yp[side] - 3 | 0;
        var tmp = 0;
        var tmp_0 = new Int32Array(2);
        while (tmp < 2) {
            var tmp_1 = tmp;
            switch (blastDistance($this, ensureNotNull($this.u18_1[tmp_1]), target)) {
              case 0:
                var tmp$ret$0 = 2;
                break;

              case 1:
                tmp$ret$0 = 1;
                break;

              default:
                tmp$ret$0 = 0;
                break;
            }
            tmp_0[tmp_1] = tmp$ret$0;
            tmp = tmp + 1 | 0;
        }
        var damage = tmp_0;
        var tmp_2 = $this.a19_1[1 - side | 0];
        retainAll(tmp_2, SubmarineGame$torpedo$lambda($this, target));
        var inductionVariable = 0;
        if (inductionVariable <= 1) do {
            var who = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var watcher = $this.a19_1[1 - who | 0];
            switch (damage[who]) {
              case 2:
                retainAll(watcher, SubmarineGame$torpedo$lambda_0(target));
                break;

              case 1:
                retainAll(watcher, SubmarineGame$torpedo$lambda_1($this, target));
                break;

              default:
                removeAll_0(watcher, SubmarineGame$torpedo$lambda_2($this, target));
                break;
            }
            var b = $this.x18_1[who] - damage[who] | 0;
            var tmp$ret$1 = Math.max(0, b);
            $this.x18_1[who] = tmp$ret$1;
        } while (inductionVariable <= 1);
        var tmp0 = $this.b19_1;
        var element = entry($this, 'torpedo', side, SubmarineGame$torpedo$lambda_3(target, damage));
        tmp0.f(element);
        var tmp0_0 = $this.x18_1;
        var tmp$ret$3;
        $l$block: {
            var inductionVariable_0 = 0;
            var last = tmp0_0.length;
            while (inductionVariable_0 < last) {
                var element_0 = tmp0_0[inductionVariable_0];
                inductionVariable_0 = inductionVariable_0 + 1 | 0;
                if (!(element_0 === 0)) {
                    tmp$ret$3 = false;
                    break $l$block;
                }
            }
            tmp$ret$3 = true;
        }
        if (tmp$ret$3) $this.g19_1 = 'draw'; else {
            if ($this.x18_1[0] === 0) $this.g19_1 = $this.q18_1.m(1); else {
                if ($this.x18_1[1] === 0) $this.g19_1 = $this.q18_1.m(0); else {
                    endTurn($this);
                }
            }
        }
        return true;
    }
    function useSonar($this, side) {
        if ($this.y18_1[side] < 2) return false;
        var _array__4zh2yp = $this.y18_1;
        _array__4zh2yp[side] = _array__4zh2yp[side] - 2 | 0;
        var sector = sectorOf($this, ensureNotNull($this.u18_1[1 - side | 0]));
        $this.z18_1[side] = sector;
        var tmp = $this.a19_1[side];
        retainAll(tmp, SubmarineGame$useSonar$lambda($this, sector));
        var tmp0 = $this.b19_1;
        var element = entry($this, 'sonar', side, SubmarineGame$useSonar$lambda_0);
        tmp0.f(element);
        endTurn($this);
        return true;
    }
    function endTurn($this) {
        $this.d19_1 = false;
        $this.f19_1 = 30;
        if ($this.e19_1) {
            $this.e19_1 = false;
            $this.c19_1 = 1 - $this.c19_1 | 0;
            $this.h19_1 = true;
            return Unit_instance;
        }
        if ($this.h19_1) {
            $this.h19_1 = false;
            return Unit_instance;
        }
        $this.c19_1 = 1 - $this.c19_1 | 0;
    }
    function entry($this, kind, side, fill) {
        var builder = new JsonObjectBuilder;
        put(builder, 'kind', kind);
        put_0(builder, 'side', side);
        fill(builder);
        return builder.ov();
    }
    function common_2($this, $receiver) {
        put($receiver, 'game', Submarine_getInstance().x19_1);
        put($receiver, 'phase', !($this.g19_1 == null) ? 'over' : _get_settingOut__x7we4z_0($this) ? 'placing' : 'playing');
        put_0($receiver, 'size', 12);
        put_0($receiver, 'sector', 4);
        var this_0 = $this.s18_1;
        var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_0, 10));
        var _iterator__ex2g4s = this_0.g();
        while (_iterator__ex2g4s.h()) {
            var item = _iterator__ex2g4s.i();
            var tmp$ret$2 = JsonPrimitive_1(item);
            destination.f(tmp$ret$2);
        }
        $receiver.nv('map', new JsonArray(destination));
        var this_1 = $this.q18_1;
        var destination_0 = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_1, 10));
        var _iterator__ex2g4s_0 = this_1.g();
        while (_iterator__ex2g4s_0.h()) {
            var item_0 = _iterator__ex2g4s_0.i();
            var tmp$ret$5 = JsonPrimitive_1(item_0);
            destination_0.f(tmp$ret$5);
        }
        $receiver.nv('sides', new JsonArray(destination_0));
        var this_2 = $this.x18_1;
        var destination_1 = ArrayList_init_$Create$_0(this_2.length);
        var inductionVariable = 0;
        var last = this_2.length;
        while (inductionVariable < last) {
            var item_1 = this_2[inductionVariable];
            inductionVariable = inductionVariable + 1 | 0;
            var tmp$ret$8 = JsonPrimitive_0(item_1);
            destination_1.f(tmp$ret$8);
        }
        $receiver.nv('hull', new JsonArray(destination_1));
        put_0($receiver, 'hullMax', 4);
        var this_3 = $this.w18_1;
        var destination_2 = ArrayList_init_$Create$_0(this_3.length);
        var inductionVariable_0 = 0;
        var last_0 = this_3.length;
        while (inductionVariable_0 < last_0) {
            var item_2 = this_3[inductionVariable_0];
            inductionVariable_0 = inductionVariable_0 + 1 | 0;
            var tmp$ret$11 = JsonPrimitive_2(item_2);
            destination_2.f(tmp$ret$11);
        }
        $receiver.nv('ready', new JsonArray(destination_2));
        $receiver.nv('turn', _get_settingOut__x7we4z_0($this) ? JsonNull_getInstance() : JsonPrimitive_0($this.c19_1));
        put_0($receiver, 'clock', !($this.g19_1 == null) || _get_settingOut__x7we4z_0($this) ? 0 : $this.f19_1);
        put($receiver, 'winner', $this.g19_1);
        var builder = new JsonObjectBuilder;
        put_0(builder, 'torpedo', 3);
        put_0(builder, 'sonar', 2);
        put_0(builder, 'silent', 3);
        var tmp$ret$12 = builder.ov();
        $receiver.nv('prices', tmp$ret$12);
        $receiver.nv('log', new JsonArray(takeLast($this.b19_1, 40)));
        put_0($receiver, 'logCount', $this.b19_1.j());
    }
    function Companion_29() {
        Companion_instance_29 = this;
        this.i19_1 = 12;
        this.j19_1 = 4;
        this.k19_1 = 4;
        this.l19_1 = 6;
        this.m19_1 = 3;
        this.n19_1 = 2;
        this.o19_1 = 3;
        this.p19_1 = 4;
        this.q19_1 = 3;
        this.r19_1 = 2;
        this.s19_1 = 1;
        this.t19_1 = 30;
        this.u19_1 = 40;
        this.v19_1 = mapOf_0([ to('N', to(0, -1)), to('E', to(1, 0)), to('S', to(0, 1)), to('W', to(-1, 0)) ]);
        this.w19_1 = listOf_0([ listOf_0([ '............', '..##....##..', '..#......#..', '............', '.....##.....', '.#...##...#.', '.#...##...#.', '.....##.....', '............', '..#......#..', '..##....##..', '............' ]), listOf_0([ '............', '.....#......', '.##..#...##.', '.....#......', '..#......#..', '..#..##..#..', '..#..##..#..', '..#......#..', '......#.....', '.##...#..##.', '......#.....', '............' ]) ]);
    }
    var Companion_instance_29;
    function Companion_getInstance_29() {
        if (Companion_instance_29 == null) new Companion_29;
        return Companion_instance_29;
    }
    function SubmarineGame$move$lambda($dir) {
        return function($this$entry) {
            put($this$entry, 'dir', $dir);
            return Unit_instance;
        };
    }
    function SubmarineGame$silent$lambda($this$entry) {
        return Unit_instance;
    }
    function SubmarineGame$surface$lambda(this$0, $sector) {
        return function(it) {
            return sectorOf(this$0, it) === $sector;
        };
    }
    function SubmarineGame$surface$lambda_0($sector) {
        return function($this$entry) {
            put_0($this$entry, 'sector', $sector);
            return Unit_instance;
        };
    }
    function SubmarineGame$torpedo$lambda(this$0, $target) {
        return function(it) {
            return distance(this$0, it, $target) <= 4;
        };
    }
    function SubmarineGame$torpedo$lambda_0($target) {
        return function(it) {
            return it === $target;
        };
    }
    function SubmarineGame$torpedo$lambda_1(this$0, $target) {
        return function(it) {
            return blastDistance(this$0, it, $target) === 1;
        };
    }
    function SubmarineGame$torpedo$lambda_2(this$0, $target) {
        return function(it) {
            return blastDistance(this$0, it, $target) <= 1;
        };
    }
    function SubmarineGame$torpedo$lambda_3($target, $damage) {
        return function($this$entry) {
            put_0($this$entry, 'x', $target % 12 | 0);
            put_0($this$entry, 'y', $target / 12 | 0);
            var this_0 = $damage;
            var destination = ArrayList_init_$Create$_0(this_0.length);
            var inductionVariable = 0;
            var last = this_0.length;
            while (inductionVariable < last) {
                var item = this_0[inductionVariable];
                inductionVariable = inductionVariable + 1 | 0;
                var tmp$ret$2 = JsonPrimitive_0(item);
                destination.f(tmp$ret$2);
            }
            $this$entry.nv('damage', new JsonArray(destination));
            return Unit_instance;
        };
    }
    function SubmarineGame$useSonar$lambda(this$0, $sector) {
        return function(it) {
            return sectorOf(this$0, it) === $sector;
        };
    }
    function SubmarineGame$useSonar$lambda_0($this$entry) {
        return Unit_instance;
    }
    function SubmarineGame(players, random) {
        Companion_getInstance_29();
        this.q18_1 = players;
        this.r18_1 = random;
        this.s18_1 = Companion_getInstance_29().w19_1.m(this.r18_1.l(Companion_getInstance_29().w19_1.j()));
        var tmp = this;
        var tmp0 = until(0, 144);
        var destination = ArrayList_init_$Create$();
        var inductionVariable = tmp0.w_1;
        var last = tmp0.x_1;
        if (inductionVariable <= last) do {
            var element = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var it = element;
            if (isWater(this, it)) {
                destination.f(element);
            }
        } while (!(element === last));
        tmp.t18_1 = toSet_0(destination);
        var tmp_0 = this;
        tmp_0.u18_1 = Array(2);
        var tmp_1 = this;
        var tmp_2 = 0;
        var tmp_3 = Array(2);
        while (tmp_2 < 2) {
            tmp_3[tmp_2] = ArrayList_init_$Create$();
            tmp_2 = tmp_2 + 1 | 0;
        }
        tmp_1.v18_1 = tmp_3;
        this.w18_1 = booleanArray(2);
        var tmp_4 = this;
        var tmp_5 = 0;
        var tmp_6 = new Int32Array(2);
        while (tmp_5 < 2) {
            tmp_6[tmp_5] = 4;
            tmp_5 = tmp_5 + 1 | 0;
        }
        tmp_4.x18_1 = tmp_6;
        this.y18_1 = new Int32Array(2);
        var tmp_7 = this;
        tmp_7.z18_1 = Array(2);
        var tmp_8 = this;
        var tmp_9 = 0;
        var tmp_10 = Array(2);
        while (tmp_9 < 2) {
            tmp_10[tmp_9] = toMutableSet(this.t18_1);
            tmp_9 = tmp_9 + 1 | 0;
        }
        tmp_8.a19_1 = tmp_10;
        var tmp_11 = this;
        tmp_11.b19_1 = ArrayList_init_$Create$();
        this.c19_1 = 0;
        this.d19_1 = false;
        this.e19_1 = false;
        this.f19_1 = 30;
        this.g19_1 = null;
        this.h19_1 = false;
    }
    protoOf(SubmarineGame).m13 = function() {
        return this.g19_1;
    };
    protoOf(SubmarineGame).n13 = function(player, action) {
        var side = this.q18_1.o1(player);
        if (side < 0 || !(this.g19_1 == null)) return false;
        var tmp0_safe_receiver = action.cv('do');
        var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : get_jsonPrimitive(tmp0_safe_receiver);
        var command = tmp1_safe_receiver == null ? null : get_contentOrNull(tmp1_safe_receiver);
        if (_get_settingOut__x7we4z_0(this)) return setOut_0(this, side, command, action);
        if (!(side === this.c19_1)) return false;
        var tmp;
        if (this.d19_1) {
            var tmp_0;
            switch (command) {
              case 'torpedo':
                var tmp3_elvis_lhs = cellFrom(this, action);
                var tmp_1;
                if (tmp3_elvis_lhs == null) {
                    return false;
                } else {
                    tmp_1 = tmp3_elvis_lhs;
                }
                tmp_0 = torpedo(this, side, tmp_1);
                break;

              case 'sonar':
                tmp_0 = useSonar(this, side);
                break;

              case 'end':
                endTurn(this);
                tmp_0 = true;
                break;

              default:
                tmp_0 = false;
                break;
            }
            tmp = tmp_0;
        } else {
            var tmp_2;
            switch (command) {
              case 'move':
                var tmp5_safe_receiver = action.cv('dir');
                var tmp6_safe_receiver = tmp5_safe_receiver == null ? null : get_jsonPrimitive(tmp5_safe_receiver);
                var tmp7_elvis_lhs = tmp6_safe_receiver == null ? null : get_contentOrNull(tmp6_safe_receiver);
                var tmp_3;
                if (tmp7_elvis_lhs == null) {
                    return false;
                } else {
                    tmp_3 = tmp7_elvis_lhs;
                }
                tmp_2 = move_0(this, side, tmp_3);
                break;

              case 'silent':
                var tmp8_elvis_lhs = cellFrom(this, action);
                var tmp_4;
                if (tmp8_elvis_lhs == null) {
                    return false;
                } else {
                    tmp_4 = tmp8_elvis_lhs;
                }
                tmp_2 = silent(this, side, tmp_4);
                break;

              case 'surface':
                surface(this, side);
                tmp_2 = true;
                break;

              default:
                tmp_2 = false;
                break;
            }
            tmp = tmp_2;
        }
        return tmp;
    };
    protoOf(SubmarineGame).s13 = function() {
        if (!(this.g19_1 == null) || _get_settingOut__x7we4z_0(this)) return false;
        this.f19_1 = this.f19_1 - 1 | 0;
        if (this.f19_1 > 0) return true;
        if (this.d19_1) {
            endTurn(this);
        } else {
            var tmp0 = Companion_getInstance_29().v19_1.u1();
            var destination = ArrayList_init_$Create$();
            var _iterator__ex2g4s = tmp0.g();
            while (_iterator__ex2g4s.h()) {
                var element = _iterator__ex2g4s.i();
                if (canMove(this, this.c19_1, element)) {
                    destination.f(element);
                }
            }
            var dirs = destination;
            if (dirs.k()) {
                surface(this, this.c19_1);
            } else move_0(this, this.c19_1, random(dirs, this.r18_1));
        }
        return true;
    };
    protoOf(SubmarineGame).o13 = function() {
        var builder = new JsonObjectBuilder;
        common_2(this, builder);
        if (!(this.g19_1 == null)) {
            var this_0 = this.u18_1;
            var destination = ArrayList_init_$Create$_0(this_0.length);
            var inductionVariable = 0;
            var last = this_0.length;
            while (inductionVariable < last) {
                var item = this_0[inductionVariable];
                inductionVariable = inductionVariable + 1 | 0;
                var tmp$ret$4 = JsonPrimitive_0(item);
                destination.f(tmp$ret$4);
            }
            builder.nv('positions', new JsonArray(destination));
            var this_1 = this.v18_1;
            var destination_0 = ArrayList_init_$Create$_0(this_1.length);
            var inductionVariable_0 = 0;
            var last_0 = this_1.length;
            while (inductionVariable_0 < last_0) {
                var item_0 = this_1[inductionVariable_0];
                inductionVariable_0 = inductionVariable_0 + 1 | 0;
                var destination_1 = ArrayList_init_$Create$_0(collectionSizeOrDefault(item_0, 10));
                var _iterator__ex2g4s = item_0.g();
                while (_iterator__ex2g4s.h()) {
                    var item_1 = _iterator__ex2g4s.i();
                    var tmp$ret$10 = JsonPrimitive_0(item_1);
                    destination_1.f(tmp$ret$10);
                }
                var tmp$ret$7 = new JsonArray(destination_1);
                destination_0.f(tmp$ret$7);
            }
            builder.nv('wakes', new JsonArray(destination_0));
        }
        return builder.ov();
    };
    protoOf(SubmarineGame).r13 = function(player) {
        var builder = new JsonObjectBuilder;
        var side = this.q18_1.o1(player);
        common_2(this, builder);
        put_0(builder, 'side', side);
        put_0(builder, 'position', this.u18_1[side]);
        var this_0 = this.v18_1[side];
        var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_0, 10));
        var _iterator__ex2g4s = this_0.g();
        while (_iterator__ex2g4s.h()) {
            var item = _iterator__ex2g4s.i();
            var tmp$ret$4 = JsonPrimitive_0(item);
            destination.f(tmp$ret$4);
        }
        builder.nv('wake', new JsonArray(destination));
        put_0(builder, 'energy', this.y18_1[side]);
        put_1(builder, 'youReady', this.w18_1[side]);
        put_1(builder, 'rivalReady', this.w18_1[1 - side | 0]);
        put_1(builder, 'yourTurn', !_get_settingOut__x7we4z_0(this) && this.g19_1 == null && this.c19_1 === side);
        put_1(builder, 'acting', this.d19_1 && this.c19_1 === side);
        var tmp0 = Companion_getInstance_29().v19_1.u1();
        var destination_0 = ArrayList_init_$Create$();
        var _iterator__ex2g4s_0 = tmp0.g();
        while (_iterator__ex2g4s_0.h()) {
            var element = _iterator__ex2g4s_0.i();
            if (canMove(this, side, element)) {
                destination_0.f(element);
            }
        }
        var destination_1 = ArrayList_init_$Create$_0(collectionSizeOrDefault(destination_0, 10));
        var _iterator__ex2g4s_1 = destination_0.g();
        while (_iterator__ex2g4s_1.h()) {
            var item_0 = _iterator__ex2g4s_1.i();
            var tmp$ret$10 = JsonPrimitive_1(item_0);
            destination_1.f(tmp$ret$10);
        }
        builder.nv('moves', new JsonArray(destination_1));
        var this_1 = silentCells(this, side);
        var destination_2 = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_1, 10));
        var _iterator__ex2g4s_2 = this_1.g();
        while (_iterator__ex2g4s_2.h()) {
            var item_1 = _iterator__ex2g4s_2.i();
            var tmp$ret$13 = JsonPrimitive_0(item_1);
            destination_2.f(tmp$ret$13);
        }
        builder.nv('silentCells', new JsonArray(destination_2));
        var tmp0_safe_receiver = this.u18_1[side];
        var tmp;
        if (tmp0_safe_receiver == null) {
            tmp = null;
        } else {
            var tmp0_0 = until(0, 144);
            var destination_3 = ArrayList_init_$Create$();
            var inductionVariable = tmp0_0.w_1;
            var last = tmp0_0.x_1;
            if (inductionVariable <= last) do {
                var element_0 = inductionVariable;
                inductionVariable = inductionVariable + 1 | 0;
                var it = element_0;
                if (distance(this, it, tmp0_safe_receiver) <= 4) {
                    destination_3.f(element_0);
                }
            } while (!(element_0 === last));
            tmp = destination_3;
        }
        var tmp1_elvis_lhs = tmp;
        var this_2 = tmp1_elvis_lhs == null ? emptyList() : tmp1_elvis_lhs;
        var destination_4 = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_2, 10));
        var _iterator__ex2g4s_3 = this_2.g();
        while (_iterator__ex2g4s_3.h()) {
            var item_2 = _iterator__ex2g4s_3.i();
            var tmp$ret$21 = JsonPrimitive_0(item_2);
            destination_4.f(tmp$ret$21);
        }
        builder.nv('torpedoCells', new JsonArray(destination_4));
        var this_3 = sorted(this.a19_1[side]);
        var destination_5 = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_3, 10));
        var _iterator__ex2g4s_4 = this_3.g();
        while (_iterator__ex2g4s_4.h()) {
            var item_3 = _iterator__ex2g4s_4.i();
            var tmp$ret$24 = JsonPrimitive_0(item_3);
            destination_5.f(tmp$ret$24);
        }
        builder.nv('suspects', new JsonArray(destination_5));
        put_0(builder, 'sonar', this.z18_1[side]);
        return builder.ov();
    };
    function Submarine() {
        Submarine_instance = this;
        this.x19_1 = 'submarine';
        this.y19_1 = numberRangeToNumber(2, 2);
    }
    protoOf(Submarine).u13 = function() {
        return this.x19_1;
    };
    protoOf(Submarine).v13 = function() {
        return this.y19_1;
    };
    protoOf(Submarine).w13 = function(players, random) {
        return new SubmarineGame(players, random);
    };
    var Submarine_instance;
    function Submarine_getInstance() {
        if (Submarine_instance == null) new Submarine;
        return Submarine_instance;
    }
    function Delivery(to, message) {
        this.z19_1 = to;
        this.a1a_1 = message;
    }
    protoOf(Delivery).toString = function() {
        return 'Delivery(to=' + this.z19_1 + ', message=' + this.a1a_1.toString() + ')';
    };
    protoOf(Delivery).hashCode = function() {
        var result = getStringHashCode(this.z19_1);
        result = imul(result, 31) + this.a1a_1.hashCode() | 0;
        return result;
    };
    protoOf(Delivery).equals = function(other) {
        if (this === other) return true;
        if (!(other instanceof Delivery)) return false;
        if (!(this.z19_1 === other.z19_1)) return false;
        if (!this.a1a_1.equals(other.a1a_1)) return false;
        return true;
    };
    function Player(id, name, online) {
        online = online === VOID ? true : online;
        this.b1a_1 = id;
        this.c1a_1 = name;
        this.d1a_1 = online;
    }
    function host($this) {
        var tmp0 = $this.f1a_1;
        var tmp$ret$0;
        $l$block: {
            var _iterator__ex2g4s = tmp0.g();
            while (_iterator__ex2g4s.h()) {
                var element = _iterator__ex2g4s.i();
                if (element.d1a_1) {
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
        var tmp0 = $this.f1a_1;
        var tmp$ret$4;
        $l$block: {
            var _iterator__ex2g4s = tmp0.g();
            while (_iterator__ex2g4s.h()) {
                var element = _iterator__ex2g4s.i();
                if (element.b1a_1 === id) {
                    tmp$ret$4 = element;
                    break $l$block;
                }
            }
            tmp$ret$4 = null;
        }
        var player = tmp$ret$4;
        if (!(player == null)) {
            player.c1a_1 = shown;
            player.d1a_1 = true;
        } else {
            var tmp0_0 = $this.f1a_1;
            var element_0 = new Player(id, shown);
            tmp0_0.f(element_0);
        }
        return true;
    }
    function leave($this, player) {
        $this.f1a_1.y2(player);
        if ($this.i1a_1.m1(player.b1a_1)) {
            endGame($this);
        }
        return true;
    }
    function browse($this, id) {
        if (!($this.g1a_1 == null) || id == null || id === $this.k1a_1) return false;
        var tmp;
        var tmp0 = get_GAMES();
        var tmp$ret$0;
        $l$block_0: {
            var tmp_0;
            if (isInterface(tmp0, Collection)) {
                tmp_0 = tmp0.k();
            } else {
                tmp_0 = false;
            }
            if (tmp_0) {
                tmp$ret$0 = true;
                break $l$block_0;
            }
            var _iterator__ex2g4s = tmp0.g();
            while (_iterator__ex2g4s.h()) {
                var element = _iterator__ex2g4s.i();
                if (element.u13() === id) {
                    tmp$ret$0 = false;
                    break $l$block_0;
                }
            }
            tmp$ret$0 = true;
        }
        if (tmp$ret$0) {
            var tmp0_0 = get_COMING_GAMES();
            var tmp$ret$2;
            $l$block_2: {
                var tmp_1;
                if (isInterface(tmp0_0, Collection)) {
                    tmp_1 = tmp0_0.k();
                } else {
                    tmp_1 = false;
                }
                if (tmp_1) {
                    tmp$ret$2 = true;
                    break $l$block_2;
                }
                var _iterator__ex2g4s_0 = tmp0_0.g();
                while (_iterator__ex2g4s_0.h()) {
                    var element_0 = _iterator__ex2g4s_0.i();
                    if (element_0.q16_1 === id) {
                        tmp$ret$2 = false;
                        break $l$block_2;
                    }
                }
                tmp$ret$2 = true;
            }
            tmp = tmp$ret$2;
        } else {
            tmp = false;
        }
        if (tmp) return false;
        $this.k1a_1 = id;
        return true;
    }
    function start($this, id) {
        var tmp0 = get_GAMES();
        var tmp$ret$0;
        $l$block: {
            var _iterator__ex2g4s = tmp0.g();
            while (_iterator__ex2g4s.h()) {
                var element = _iterator__ex2g4s.i();
                if (element.u13() === id) {
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
        var tmp0_0 = $this.f1a_1;
        var destination = ArrayList_init_$Create$();
        var _iterator__ex2g4s_0 = tmp0_0.g();
        while (_iterator__ex2g4s_0.h()) {
            var element_0 = _iterator__ex2g4s_0.i();
            if (element_0.d1a_1) {
                destination.f(element_0);
            }
        }
        var destination_0 = ArrayList_init_$Create$_0(collectionSizeOrDefault(destination, 10));
        var _iterator__ex2g4s_1 = destination.g();
        while (_iterator__ex2g4s_1.h()) {
            var item = _iterator__ex2g4s_1.i();
            var tmp$ret$7 = item.b1a_1;
            destination_0.f(tmp$ret$7);
        }
        var sitting = take(destination_0, kind.v13().x_1);
        var tmp_0;
        if (!($this.g1a_1 == null)) {
            tmp_0 = true;
        } else {
            var progression = kind.v13();
            var containsLower = progression.w_1;
            var containsUpper = progression.x_1;
            var containsArg = sitting.j();
            tmp_0 = !(containsLower <= containsArg ? containsArg <= containsUpper : false);
        }
        if (tmp_0) return false;
        $this.g1a_1 = kind.w13(sitting, $this.e1a_1);
        $this.h1a_1 = kind.u13();
        $this.k1a_1 = kind.u13();
        $this.i1a_1 = toSet_0(sitting);
        return true;
    }
    function rematch($this, player) {
        var tmp;
        var tmp0_safe_receiver = $this.g1a_1;
        if ((tmp0_safe_receiver == null ? null : tmp0_safe_receiver.m13()) == null) {
            tmp = true;
        } else {
            tmp = !$this.i1a_1.m1(player.b1a_1);
        }
        if (tmp) return false;
        if (!equals(player, host($this))) {
            if ($this.j1a_1 === player.b1a_1) return false;
            $this.j1a_1 = player.b1a_1;
            return true;
        }
        var tmp0 = $this.f1a_1;
        var tmp$ret$0;
        $l$block_0: {
            var tmp_0;
            if (isInterface(tmp0, Collection)) {
                tmp_0 = tmp0.k();
            } else {
                tmp_0 = false;
            }
            if (tmp_0) {
                tmp$ret$0 = false;
                break $l$block_0;
            }
            var _iterator__ex2g4s = tmp0.g();
            while (_iterator__ex2g4s.h()) {
                var element = _iterator__ex2g4s.i();
                if ($this.i1a_1.m1(element.b1a_1) && !element.d1a_1) {
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
            var _iterator__ex2g4s_0 = tmp0_0.g();
            while (_iterator__ex2g4s_0.h()) {
                var element_0 = _iterator__ex2g4s_0.i();
                if (element_0.u13() === $this.h1a_1) {
                    tmp$ret$2 = element_0;
                    break $l$block_1;
                }
            }
            throw NoSuchElementException_init_$Create$_0('Collection contains no element matching the predicate.');
        }
        tmp_1.g1a_1 = tmp$ret$2.w13(toList_0($this.i1a_1), $this.e1a_1);
        $this.j1a_1 = null;
        return true;
    }
    function endGame($this) {
        $this.g1a_1 = null;
        $this.h1a_1 = null;
        $this.i1a_1 = emptySet();
        $this.j1a_1 = null;
        return true;
    }
    function picture($this) {
        var builder = new JsonObjectBuilder;
        var this_0 = $this.f1a_1;
        var destination = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_0, 10));
        var _iterator__ex2g4s = this_0.g();
        while (_iterator__ex2g4s.h()) {
            var item = _iterator__ex2g4s.i();
            var builder_0 = new JsonObjectBuilder;
            put(builder_0, 'id', item.b1a_1);
            put(builder_0, 'name', item.c1a_1);
            put_1(builder_0, 'online', item.d1a_1);
            var tmp$ret$4 = builder_0.ov();
            destination.f(tmp$ret$4);
        }
        builder.nv('players', new JsonArray(destination));
        var tmp0_safe_receiver = host($this);
        put(builder, 'host', tmp0_safe_receiver == null ? null : tmp0_safe_receiver.b1a_1);
        var this_1 = get_GAMES();
        var destination_0 = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_1, 10));
        var _iterator__ex2g4s_0 = this_1.g();
        while (_iterator__ex2g4s_0.h()) {
            var item_0 = _iterator__ex2g4s_0.i();
            var builder_1 = new JsonObjectBuilder;
            put(builder_1, 'id', item_0.u13());
            put_0(builder_1, 'min', item_0.v13().w_1);
            put_0(builder_1, 'max', item_0.v13().x_1);
            var tmp$ret$9 = builder_1.ov();
            destination_0.f(tmp$ret$9);
        }
        var tmp = destination_0;
        var this_2 = get_COMING_GAMES();
        var destination_1 = ArrayList_init_$Create$_0(collectionSizeOrDefault(this_2, 10));
        var _iterator__ex2g4s_1 = this_2.g();
        while (_iterator__ex2g4s_1.h()) {
            var item_1 = _iterator__ex2g4s_1.i();
            var builder_2 = new JsonObjectBuilder;
            put(builder_2, 'id', item_1.q16_1);
            put_0(builder_2, 'min', item_1.r16_1.w_1);
            put_0(builder_2, 'max', item_1.r16_1.x_1);
            put_1(builder_2, 'soon', true);
            var tmp$ret$14 = builder_2.ov();
            destination_1.f(tmp$ret$14);
        }
        builder.nv('games', new JsonArray(plus(tmp, destination_1)));
        put(builder, 'browsing', $this.k1a_1);
        put(builder, 'playing', $this.h1a_1);
        put(builder, 'rematchOffer', $this.j1a_1);
        var room = builder.ov();
        var current = $this.g1a_1;
        var this_3 = ArrayList_init_$Create$();
        var tmp_0 = plus_2(room, to('type', JsonPrimitive_1('state')));
        var tmp_1;
        if (current == null) {
            tmp_1 = null;
        } else {
            tmp_1 = to('view', current.o13());
        }
        this_3.f(new Delivery('tv', new JsonObject(plus_1(tmp_0, listOfNotNull(tmp_1)))));
        var _iterator__ex2g4s_2 = $this.f1a_1.g();
        while (_iterator__ex2g4s_2.h()) {
            var player = _iterator__ex2g4s_2.i();
            var tmp_2;
            if (current == null) {
                tmp_2 = null;
            } else {
                var tmp_3;
                if ($this.i1a_1.m1(player.b1a_1)) {
                    tmp_3 = current;
                } else {
                    tmp_3 = null;
                }
                tmp_2 = tmp_3;
            }
            var tmp2_safe_receiver = tmp_2;
            var view = tmp2_safe_receiver == null ? null : tmp2_safe_receiver.r13(player.b1a_1);
            var tmp_4 = plus_2(plus_2(room, to('type', JsonPrimitive_1('state'))), to('you', JsonPrimitive_1(player.b1a_1)));
            var tmp_5;
            if (view == null) {
                tmp_5 = null;
            } else {
                tmp_5 = to('view', view);
            }
            this_3.f(new Delivery(player.b1a_1, new JsonObject(plus_1(tmp_4, listOfNotNull(tmp_5)))));
        }
        return this_3.d4();
    }
    function Companion_30() {
        this.l1a_1 = 16;
    }
    var Companion_instance_30;
    function Companion_getInstance_30() {
        return Companion_instance_30;
    }
    function Table(random) {
        random = random === VOID ? Default_getInstance() : random;
        this.e1a_1 = random;
        var tmp = this;
        tmp.f1a_1 = ArrayList_init_$Create$();
        this.g1a_1 = null;
        this.h1a_1 = null;
        this.i1a_1 = emptySet();
        this.j1a_1 = null;
        this.k1a_1 = first(get_GAMES()).u13();
    }
    protoOf(Table).m1a = function(from, text) {
        var tmp;
        try {
            var value = get_jsonObject(Default_getInstance_0().qt(text));
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
        var tmp1_safe_receiver = message.cv('type');
        var tmp2_safe_receiver = tmp1_safe_receiver == null ? null : get_jsonPrimitive(tmp1_safe_receiver);
        var type = tmp2_safe_receiver == null ? null : get_contentOrNull(tmp2_safe_receiver);
        var tmp0 = this.f1a_1;
        var tmp$ret$5;
        $l$block: {
            var _iterator__ex2g4s = tmp0.g();
            while (_iterator__ex2g4s.h()) {
                var element = _iterator__ex2g4s.i();
                if (element.b1a_1 === from) {
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
            var tmp4_safe_receiver = message.cv('name');
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
                var tmp6_safe_receiver = message.cv('game');
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
                var tmp8_safe_receiver = message.cv('game');
                var tmp9_safe_receiver = tmp8_safe_receiver == null ? null : get_jsonPrimitive(tmp8_safe_receiver);
                tmp_4 = start(this, tmp9_safe_receiver == null ? null : get_contentOrNull(tmp9_safe_receiver));
            } else {
                tmp_4 = false;
            }
            tmp_2 = tmp_4;
            break;

          case 'lobby':
            tmp_2 = equals(player, host(this)) && !(this.g1a_1 == null) && endGame(this);
            break;

          case 'rematch':
            tmp_2 = !(player == null) && rematch(this, player);
            break;

          case 'act':
            var tmp_5;
            if (!(player == null) && this.i1a_1.m1(from)) {
                var tmp10_safe_receiver = this.g1a_1;
                tmp_5 = (tmp10_safe_receiver == null ? null : tmp10_safe_receiver.n13(from, message)) === true;
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
    protoOf(Table).n1a = function(id) {
        var tmp0 = this.f1a_1;
        var tmp$ret$0;
        $l$block: {
            var _iterator__ex2g4s = tmp0.g();
            while (_iterator__ex2g4s.h()) {
                var element = _iterator__ex2g4s.i();
                if (element.b1a_1 === id) {
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
        player.d1a_1 = false;
        return picture(this);
    };
    protoOf(Table).s13 = function() {
        var tmp0_elvis_lhs = this.g1a_1;
        var tmp;
        if (tmp0_elvis_lhs == null) {
            return emptyList();
        } else {
            tmp = tmp0_elvis_lhs;
        }
        var current = tmp;
        var tmp0 = this.f1a_1;
        var tmp$ret$0;
        $l$block_0: {
            var tmp_0;
            if (isInterface(tmp0, Collection)) {
                tmp_0 = tmp0.k();
            } else {
                tmp_0 = false;
            }
            if (tmp_0) {
                tmp$ret$0 = false;
                break $l$block_0;
            }
            var _iterator__ex2g4s = tmp0.g();
            while (_iterator__ex2g4s.h()) {
                var element = _iterator__ex2g4s.i();
                if (this.i1a_1.m1(element.b1a_1) && !element.d1a_1) {
                    tmp$ret$0 = true;
                    break $l$block_0;
                }
            }
            tmp$ret$0 = false;
        }
        if (tmp$ret$0) return emptyList();
        return current.s13() ? picture(this) : emptyList();
    };
    protoOf(Table).t13 = function() {
        var tmp0_elvis_lhs = this.g1a_1;
        var tmp;
        if (tmp0_elvis_lhs == null) {
            return emptyList();
        } else {
            tmp = tmp0_elvis_lhs;
        }
        var current = tmp;
        var tmp0 = this.f1a_1;
        var tmp$ret$0;
        $l$block_0: {
            var tmp_0;
            if (isInterface(tmp0, Collection)) {
                tmp_0 = tmp0.k();
            } else {
                tmp_0 = false;
            }
            if (tmp_0) {
                tmp$ret$0 = false;
                break $l$block_0;
            }
            var _iterator__ex2g4s = tmp0.g();
            while (_iterator__ex2g4s.h()) {
                var element = _iterator__ex2g4s.i();
                if (this.i1a_1.m1(element.b1a_1) && !element.d1a_1) {
                    tmp$ret$0 = true;
                    break $l$block_0;
                }
            }
            tmp$ret$0 = false;
        }
        if (tmp$ret$0) return emptyList();
        var tmp_1;
        switch (current.t13().c2_1) {
          case 0:
            tmp_1 = emptyList();
            break;

          case 1:
            var tmp0_0 = picture(this);
            var destination = ArrayList_init_$Create$();
            var _iterator__ex2g4s_0 = tmp0_0.g();
            while (_iterator__ex2g4s_0.h()) {
                var element_0 = _iterator__ex2g4s_0.i();
                if (element_0.z19_1 === 'tv') {
                    destination.f(element_0);
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
        var _iterator__ex2g4s = deliveries.g();
        while (_iterator__ex2g4s.h()) {
            var item = _iterator__ex2g4s.i();
            var builder = new JsonObjectBuilder;
            put(builder, 'to', item.z19_1);
            builder.nv('message', item.a1a_1);
            var tmp$ret$2 = builder.ov();
            destination.f(tmp$ret$2);
        }
        return new JsonArray(destination).toString();
    }
    function Engine() {
        this.o1a_1 = new Table;
    }
    protoOf(Engine).receive = function(from, text) {
        return encode(this, this.o1a_1.m1a(from, text));
    };
    protoOf(Engine).offline = function(id) {
        return encode(this, this.o1a_1.n1a(id));
    };
    protoOf(Engine).tick = function() {
        return encode(this, this.o1a_1.s13());
    };
    protoOf(Engine).frame = function() {
        return encode(this, this.o1a_1.t13());
    };
    protoOf(InternalHashMap).e5 = containsAllEntries;
    protoOf(SerialDescriptorImpl).ch = get_isNullable;
    protoOf(SerialDescriptorImpl).dh = get_isInline;
    protoOf(AbstractDecoder).lj = decodeSerializableElement$default;
    protoOf(AbstractDecoder).yi = decodeSerializableValue;
    protoOf(AbstractDecoder).nj = decodeSequentially;
    protoOf(AbstractDecoder).pj = decodeCollectionSize;
    protoOf(ListLikeDescriptor).ch = get_isNullable;
    protoOf(ListLikeDescriptor).dh = get_isInline;
    protoOf(ListLikeDescriptor).fh = get_annotations;
    protoOf(MapLikeDescriptor).ch = get_isNullable;
    protoOf(MapLikeDescriptor).dh = get_isInline;
    protoOf(MapLikeDescriptor).fh = get_annotations;
    protoOf(PluginGeneratedSerialDescriptor).ch = get_isNullable;
    protoOf(PluginGeneratedSerialDescriptor).dh = get_isInline;
    protoOf(InlinePrimitiveDescriptor$1).in = typeParametersSerializers;
    protoOf(NothingSerialDescriptor).ch = get_isNullable;
    protoOf(NothingSerialDescriptor).dh = get_isInline;
    protoOf(NothingSerialDescriptor).fh = get_annotations;
    protoOf(PrimitiveSerialDescriptor_0).ch = get_isNullable;
    protoOf(PrimitiveSerialDescriptor_0).dh = get_isInline;
    protoOf(PrimitiveSerialDescriptor_0).fh = get_annotations;
    protoOf(TaggedDecoder).lj = decodeSerializableElement$default;
    protoOf(TaggedDecoder).yi = decodeSerializableValue;
    protoOf(TaggedDecoder).nj = decodeSequentially;
    protoOf(TaggedDecoder).pj = decodeCollectionSize;
    protoOf(defer$1).ch = get_isNullable;
    protoOf(defer$1).dh = get_isInline;
    protoOf(defer$1).fh = get_annotations;
    defineProp(protoOf(JsonException), 'message', (function() {
        return this.i8();
    }));
    protoOf(BattleshipGame).s13 = tick;
    protoOf(BattleshipGame).t13 = frame;
    protoOf(CrowdGame).s13 = tick;
    protoOf(DiceGame).t13 = frame;
    protoOf(SiegeGame).t13 = frame;
    protoOf(SubmarineGame).t13 = frame;
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
    NaturalOrderComparator_instance = new NaturalOrderComparator;
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
    Companion_instance_30 = new Companion_30;
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